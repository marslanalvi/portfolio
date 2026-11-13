import { useEffect, useRef } from "react";
import { SK } from "./data.js";

/*
  BrainStage v2: interactive 3D neural brain (canvas, no dependencies).

  - Cortex (two folded hemispheres) + cerebellum + brain stem, linked as a network.
  - Pulses of light travel the network; each skill is a hub node.
  - Guided tour: the brain turns to each skill in turn, bursts with signals,
    and highlights the matching row in the skills list next to it.
  - Hover/click a label, drag to rotate, or use arrow keys when focused.
  - Adapts to light/dark text colour, pauses off-screen, honours reduced motion.
*/

const CORTEX = 175;
const CEREBELLUM = 30;
const STEM = 8;
const K = 3;
const PULSES = 54;
const HUBS = Math.min(SK.length, 8);
const CYCLE_MS = 4200;
const PAUSE_AFTER_USER_MS = 8000;

const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const ease = (t) => 1 - Math.pow(1 - clamp(t, 0, 1), 3);
const wrapAngle = (a) => Math.atan2(Math.sin(a), Math.cos(a));

function mulberry(seed) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function sphereDir(rand) {
  const u = rand() * 2 - 1;
  const th = rand() * Math.PI * 2;
  const s = Math.sqrt(1 - u * u);
  return [s * Math.cos(th), u, s * Math.sin(th)];
}

function buildBrain() {
  const rand = mulberry(11);
  const nodes = [];
  const near = (x, y, z, min) =>
    nodes.some((n) => (n.x - x) ** 2 + (n.y - y) ** 2 + (n.z - z) ** 2 < min);
  const add = (x, y, z, region) =>
    nodes.push({ x, y, z, region, glow: 0, born: rand() * 1.1, hue: 0 });

  // cortex: folded, two hemispheres with a central gap
  let count = 0,
    guard = 0;
  while (count < CORTEX && guard++ < 30000) {
    let [x, y, z] = sphereDir(rand);
    x *= 0.95;
    y *= y < 0 ? 0.55 : 0.8;
    z *= 1.2;
    const fold = 1 + 0.09 * Math.sin(6 * x + 3 * y) * Math.sin(5 * z + 2 * x);
    const shell = 0.72 + 0.28 * Math.sqrt(rand());
    x *= fold * shell;
    y *= fold * shell;
    z *= fold * shell;
    const side = x >= 0 ? 1 : -1;
    x = side * (Math.abs(x) * 0.92 + 0.07);
    if (!near(x, y, z, 0.017)) {
      add(x, y, z, 0);
      count++;
    }
  }

  // cerebellum: small ridged lobe at the back-bottom
  count = 0;
  guard = 0;
  while (count < CEREBELLUM && guard++ < 10000) {
    const [dx, dy, dz] = sphereDir(rand);
    const x = dx * 0.55;
    const y = -0.62 + dy * 0.26 + 0.015 * Math.sin(16 * dy);
    const z = -0.8 + dz * 0.34;
    if (!near(x, y, z, 0.008)) {
      add(x, y, z, 1);
      count++;
    }
  }

  // brain stem
  for (let i = 0; i < STEM; i++) {
    const t = i / (STEM - 1);
    add((rand() - 0.5) * 0.08, -0.42 - t * 0.6, -0.12 - t * 0.28, 2);
  }

  nodes.forEach((n) => {
    n.hue = 185 + clamp((n.y + 0.9) / 1.7, 0, 1) * 95; // cyan -> violet
  });

  // network links
  const seen = new Set();
  const edges = [];
  const adj = nodes.map(() => []);
  nodes.forEach((n, i) => {
    const sorted = nodes
      .map((m, j) => ({
        j,
        d: (n.x - m.x) ** 2 + (n.y - m.y) ** 2 + (n.z - m.z) ** 2,
      }))
      .filter((o) => o.j !== i)
      .sort((a, b) => a.d - b.d)
      .slice(0, K)
      .filter((o, idx) => idx === 0 || o.d < 0.1);
    sorted.forEach(({ j }) => {
      const key = i < j ? i + "-" + j : j + "-" + i;
      if (seen.has(key)) return;
      seen.add(key);
      edges.push([i, j]);
      adj[i].push(j);
      adj[j].push(i);
    });
  });

  // skill hubs: well spread cortex nodes (farthest-point sampling)
  let first = 0;
  nodes.forEach((n, i) => {
    if (n.region === 0 && n.z > nodes[first].z) first = i;
  });
  const hubs = [first];
  while (hubs.length < HUBS) {
    let best = -1,
      bestD = -1;
    nodes.forEach((n, i) => {
      if (n.region !== 0 || hubs.includes(i)) return;
      let dMin = Infinity;
      hubs.forEach((h) => {
        const m = nodes[h];
        dMin = Math.min(
          dMin,
          (n.x - m.x) ** 2 + (n.y - m.y) ** 2 + (n.z - m.z) ** 2,
        );
      });
      if (dMin > bestD) {
        bestD = dMin;
        best = i;
      }
    });
    hubs.push(best);
  }
  // order hubs around the head so the tour sweeps smoothly
  hubs.sort(
    (a, b) =>
      Math.atan2(nodes[a].x, nodes[a].z) - Math.atan2(nodes[b].x, nodes[b].z),
  );

  return { nodes, edges, adj, hubs, rand };
}

export default function BrainStage() {
  const wrapRef = useRef(null);
  const canvasRef = useRef(null);
  const liveRef = useRef(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    const live = liveRef.current;
    const ctx = canvas.getContext("2d");
    const { nodes, edges, adj, hubs, rand } = buildBrain();
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    // list rows next to the brain that we highlight in sync
    const group = wrap.closest(".skills-wrap");
    const dts = group ? [...group.querySelectorAll(".skills-list dt")] : [];
    const dds = group ? [...group.querySelectorAll(".skills-list dd")] : [];

    let w = 0,
      h = 0,
      dpr = 1,
      scale = 100;
    let yaw = 0.5,
      pitch = 0.15,
      velYaw = 0.15;
    let targetYaw = null,
      targetPitch = 0.15;
    let dragging = false,
      moved = 0,
      lastX = 0,
      lastY = 0;
    let userUntil = 0,
      lastCycle = performance.now();
    let active = 0,
      activeAt = performance.now(),
      hover = -1;
    let visible = true,
      raf = 0,
      last = performance.now();
    const start = performance.now();
    let theme = { dark: true, fg: "235,240,255" };
    let themeAt = -9999;
    const hubPos = hubs.map(() => ({ px: 0, py: 0, d: 0 }));

    const pulses = Array.from({ length: PULSES }, () => {
      const from = Math.floor(rand() * nodes.length);
      const to = adj[from][Math.floor(rand() * adj[from].length)];
      return { from, to, t: rand(), speed: 0.35 + rand() * 0.5 };
    });
    const labelOf = new Map();
    hubs.forEach((n, i) => labelOf.set(n, SK[i][0]));

    function readTheme(now) {
      if (now - themeAt < 1000) return;
      themeAt = now;
      const m = getComputedStyle(wrap).color.match(/[\d.]+/g) || [
        235, 240, 255,
      ];
      const [r, g, b] = m.map(Number);
      theme = {
        dark: (0.299 * r + 0.587 * g + 0.114 * b) / 255 > 0.55,
        fg: `${r},${g},${b}`,
      };
    }

    function mark(i) {
      dts.forEach((el, j) => el.classList.toggle("on", j === i));
      dds.forEach((el, j) => el.classList.toggle("on", j === i));
      if (live) live.textContent = `${SK[i][0]}: ${SK[i][1]}`;
    }

    function burst(i) {
      for (let k = 0; k < 12; k++) {
        const p = pulses[k];
        p.from = i;
        p.to = adj[i][k % adj[i].length];
        p.t = 0;
        p.speed = 0.9 + rand() * 0.6;
      }
    }

    function select(i, byUser) {
      active = ((i % HUBS) + HUBS) % HUBS;
      const n = nodes[hubs[active]];
      const r = Math.hypot(n.x, n.z);
      targetYaw = Math.atan2(-n.x, n.z);
      targetPitch = clamp(Math.atan2(n.y, r), -0.45, 0.45);
      n.glow = 1;
      activeAt = performance.now();
      lastCycle = activeAt;
      if (byUser) userUntil = activeAt + PAUSE_AFTER_USER_MS;
      burst(hubs[active]);
      mark(active);
      if (reduced) {
        yaw = targetYaw;
        pitch = targetPitch;
        draw(performance.now());
      }
    }

    function resize() {
      const r = wrap.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = r.width;
      h = r.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      scale = Math.min(w, h) * 0.33;
      draw(performance.now());
    }

    function project(n, cy, sy, cp, sp) {
      const x1 = n.x * cy + n.z * sy;
      const z1 = -n.x * sy + n.z * cy;
      const y2 = n.y * cp - z1 * sp;
      const z2 = n.y * sp + z1 * cp;
      const f = 3.4 / (3.4 - z2);
      return {
        px: w / 2 + x1 * f * scale,
        py: h / 2 - y2 * f * scale,
        f,
        d: clamp((z2 + 1.4) / 2.8, 0, 1),
      };
    }

    function draw(now) {
      readTheme(now);
      const { dark, fg } = theme;
      const L = dark ? 66 : 42;
      const age = (now - start) / 1000;
      ctx.clearRect(0, 0, w, h);
      ctx.globalCompositeOperation = "source-over";

      const cy = Math.cos(yaw),
        sy = Math.sin(yaw);
      const cp = Math.cos(pitch),
        sp = Math.sin(pitch);
      const P = nodes.map((n) => {
        const p = project(n, cy, sy, cp, sp);
        p.app = reduced ? 1 : ease((age - n.born) / 0.9);
        return p;
      });
      hubs.forEach((n, i) => {
        hubPos[i] = P[n];
      });

      // backdrop glow
      const g = ctx.createRadialGradient(
        w / 2,
        h / 2,
        0,
        w / 2,
        h / 2,
        scale * 1.6,
      );
      g.addColorStop(
        0,
        dark ? "rgba(110,130,255,0.16)" : "rgba(110,130,255,0.10)",
      );
      g.addColorStop(1, "rgba(110,130,255,0)");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, w, h);

      // links
      ctx.lineWidth = 1;
      for (const [a, b] of edges) {
        const pa = P[a],
          pb = P[b];
        const vis = Math.min(pa.app, pb.app);
        if (vis <= 0) continue;
        const d = (pa.d + pb.d) / 2;
        const lit = Math.max(nodes[a].glow, nodes[b].glow);
        ctx.strokeStyle = `hsla(${nodes[a].hue},80%,${L}%,${(0.05 + d * 0.2 + lit * 0.35) * vis})`;
        ctx.beginPath();
        ctx.moveTo(pa.px, pa.py);
        ctx.lineTo(pb.px, pb.py);
        ctx.stroke();
      }

      // pulses with short trails
      if (dark) ctx.globalCompositeOperation = "lighter";
      for (const p of pulses) {
        const a = P[p.from],
          b = P[p.to];
        const x = a.px + (b.px - a.px) * p.t;
        const y = a.py + (b.py - a.py) * p.t;
        const t0 = Math.max(0, p.t - 0.2);
        const x0 = a.px + (b.px - a.px) * t0;
        const y0 = a.py + (b.py - a.py) * t0;
        const d = a.d + (b.d - a.d) * p.t;
        const hue = nodes[p.from].hue;
        ctx.strokeStyle = `hsla(${hue},100%,${dark ? 75 : 45}%,${0.15 + d * 0.4})`;
        ctx.lineWidth = 1.6;
        ctx.beginPath();
        ctx.moveTo(x0, y0);
        ctx.lineTo(x, y);
        ctx.stroke();
        ctx.fillStyle = `hsla(${hue},100%,${dark ? 82 : 42}%,${0.4 + d * 0.6})`;
        ctx.beginPath();
        ctx.arc(x, y, 1.4 + d * 1.8, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalCompositeOperation = "source-over";

      // nodes, back to front
      const order = P.map((_, i) => i).sort((i, j) => P[i].d - P[j].d);
      for (const i of order) {
        const n = nodes[i],
          p = P[i];
        if (p.app <= 0) continue;
        const hub = labelOf.has(i);
        const r = (hub ? 3.6 : 1.5 + n.glow * 2) * (0.7 + p.f * 0.3) * p.app;
        ctx.fillStyle = `hsla(${n.hue},90%,${L + n.glow * 22}%,${(0.35 + p.d * 0.65) * p.app})`;
        ctx.beginPath();
        ctx.arc(p.px, p.py, r, 0, Math.PI * 2);
        ctx.fill();
        if (n.glow > 0.05 || hub) {
          ctx.strokeStyle = `hsla(${n.hue},100%,${L + 10}%,${(hub ? 0.28 : n.glow * 0.5) * p.d})`;
          ctx.beginPath();
          ctx.arc(p.px, p.py, r + 3 + n.glow * 4, 0, Math.PI * 2);
          ctx.stroke();
        }
      }

      // expanding ring on the active skill
      {
        const p = hubPos[active];
        const k = ((now - activeAt) / 1400) % 1;
        ctx.strokeStyle = `hsla(${nodes[hubs[active]].hue},100%,${L + 8}%,${(1 - k) * 0.7})`;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(p.px, p.py, 7 + k * 26, 0, Math.PI * 2);
        ctx.stroke();
      }

      // labels
      const fs = clamp(w / 30, 11, 14);
      ctx.font = `600 ${fs}px system-ui, -apple-system, sans-serif`;
      ctx.textBaseline = "middle";
      hubs.forEach((n, i) => {
        const p = hubPos[i];
        const on = i === active || i === hover;
        if (p.d < (on ? 0.25 : 0.5)) return;
        const a = on ? 1 : (p.d - 0.5) * 1.6;
        const text = SK[i][0];
        const tw = ctx.measureText(text).width;
        let x = p.px + 12;
        if (x + tw + 14 > w - 4) x = p.px - 12 - tw - 10;
        if (on) {
          const hue = nodes[n].hue;
          ctx.fillStyle = dark
            ? "rgba(8,10,26,0.82)"
            : "rgba(255,255,255,0.92)";
          ctx.strokeStyle = `hsla(${hue},90%,${L}%,0.9)`;
          ctx.lineWidth = 1;
          const rx = x - 6,
            ry = p.py - fs * 0.85,
            rw = tw + 12,
            rh = fs * 1.7;
          ctx.beginPath();
          if (ctx.roundRect) ctx.roundRect(rx, ry, rw, rh, rh / 2);
          else ctx.rect(rx, ry, rw, rh);
          ctx.fill();
          ctx.stroke();
          ctx.fillStyle = `rgba(${fg},1)`;
        } else {
          ctx.fillStyle = `rgba(${fg},${0.6 * a})`;
        }
        ctx.fillText(text, x, p.py);
      });
    }

    function tick(now) {
      raf = requestAnimationFrame(tick);
      if (!visible) {
        last = now;
        lastCycle = now;
        return;
      }
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;

      // guided tour
      if (!dragging && now > userUntil && now - lastCycle > CYCLE_MS)
        select(active + 1, false);

      if (dragging) {
        // user is steering
      } else if (targetYaw !== null) {
        const sway = Math.sin(now / 1700) * 0.1;
        yaw += wrapAngle(targetYaw + sway - yaw) * Math.min(1, dt * 2.4);
        pitch += (targetPitch - pitch) * Math.min(1, dt * 2.4);
      } else {
        velYaw += (0.15 - velYaw) * Math.min(1, dt * 1.2);
        yaw += velYaw * dt;
        pitch += (0.15 - pitch) * Math.min(1, dt * 0.8);
      }

      for (const n of nodes) n.glow = Math.max(0, n.glow - dt * 1.3);
      for (const p of pulses) {
        p.t += p.speed * dt;
        if (p.t >= 1) {
          nodes[p.to].glow = 1;
          const nx = adj[p.to];
          p.from = p.to;
          p.to = nx[Math.floor(rand() * nx.length)];
          p.t = 0;
        }
      }
      draw(now);
    }

    // ---------- interaction ----------
    const pickHub = (e) => {
      const r = canvas.getBoundingClientRect();
      const mx = e.clientX - r.left,
        my = e.clientY - r.top;
      let best = -1,
        bd = 28;
      hubPos.forEach((p, i) => {
        if (p.d < 0.3) return;
        const d = Math.hypot(p.px - mx, p.py - my);
        if (d < bd) {
          bd = d;
          best = i;
        }
      });
      return best;
    };
    const setCursor = () => {
      canvas.style.cursor = dragging
        ? "grabbing"
        : hover >= 0
          ? "pointer"
          : "grab";
    };
    const down = (e) => {
      dragging = true;
      moved = 0;
      lastX = e.clientX;
      lastY = e.clientY;
      canvas.setPointerCapture(e.pointerId);
      setCursor();
    };
    const move = (e) => {
      if (dragging) {
        const dx = e.clientX - lastX,
          dy = e.clientY - lastY;
        lastX = e.clientX;
        lastY = e.clientY;
        moved += Math.abs(dx) + Math.abs(dy);
        if (moved > 4) {
          targetYaw = null;
          userUntil = performance.now() + PAUSE_AFTER_USER_MS;
        }
        yaw += dx * 0.008;
        pitch = clamp(pitch + dy * 0.006, -0.9, 0.9);
        velYaw = clamp(dx * 0.4, -4, 4);
        if (reduced) draw(performance.now());
      } else {
        const hv = pickHub(e);
        if (hv !== hover) {
          hover = hv;
          setCursor();
          if (reduced) draw(performance.now());
        }
      }
    };
    const up = (e) => {
      const wasClick = dragging && moved < 5;
      dragging = false;
      if (wasClick) {
        const i = pickHub(e);
        if (i >= 0) select(i, true);
      }
      setCursor();
    };
    const leave = () => {
      hover = -1;
      setCursor();
    };
    const key = (e) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        e.preventDefault();
        select(active + 1, true);
      }
      if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        e.preventDefault();
        select(active - 1, true);
      }
    };

    canvas.addEventListener("pointerdown", down);
    canvas.addEventListener("pointermove", move);
    canvas.addEventListener("pointerup", up);
    canvas.addEventListener("pointercancel", up);
    canvas.addEventListener("pointerleave", leave);
    canvas.addEventListener("keydown", key);

    // hovering a skill in the list drives the brain animation too
    const listHandlers = [];
    [dts, dds].forEach((els) =>
      els.forEach((el, i) => {
        const fn = () => {
          if (i !== active) select(i, true);
        };
        el.addEventListener("mouseenter", fn);
        listHandlers.push([el, fn]);
      }),
    );

    const ro = new ResizeObserver(resize);
    ro.observe(wrap);
    const io = new IntersectionObserver(([en]) => {
      visible = en.isIntersecting;
    });
    io.observe(wrap);

    select(0, false);
    resize();
    if (!reduced) raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      canvas.removeEventListener("pointerdown", down);
      canvas.removeEventListener("pointermove", move);
      canvas.removeEventListener("pointerup", up);
      canvas.removeEventListener("pointercancel", up);
      canvas.removeEventListener("pointerleave", leave);
      canvas.removeEventListener("keydown", key);
      listHandlers.forEach(([el, fn]) => el.removeEventListener("mouseenter", fn));
      dts.forEach((el) => el.classList.remove("on"));
      dds.forEach((el) => el.classList.remove("on"));
    };
  }, []);

  return (
    <div className="brain-wrap">
      <div className="brain" ref={wrapRef}>
        <canvas
          ref={canvasRef}
          tabIndex={0}
          role="img"
          aria-label="Interactive 3D neural network shaped like a brain, labeled with my skill areas. Drag to rotate, click a label, or use the arrow keys to move between skills."
        />
      </div>
      <p className="brain-hint">Drag to rotate · click a label to explore</p>
      <span className="sr-only" aria-live="polite" ref={liveRef} />
    </div>
  );
}
