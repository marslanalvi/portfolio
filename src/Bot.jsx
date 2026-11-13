import { useEffect, useRef, useState } from 'react'
import { answer, GREET, Q } from './data.js'

const reduce = matchMedia('(prefers-reduced-motion:reduce)').matches

function Wave({ on }) {
  const ref = useRef(null)
  const onRef = useRef(on)
  onRef.current = on
  useEffect(() => {
    if (reduce) return
    let id
    const bars = ref.current.children
    const loop = (now) => {
      const t = now / 1000, a = onRef.current ? 1 : 0.06
      for (let k = 0; k < bars.length; k++)
        bars[k].style.height = (3 + a * Math.abs(Math.sin(t * 7 + k * 0.6)) * Math.abs(Math.cos(t * 2.4 + k * 0.25)) * 26).toFixed(1) + 'px'
      id = requestAnimationFrame(loop)
    }
    id = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(id)
  }, [])
  return <div className="wv" ref={ref} aria-hidden="true">{Array.from({ length: 28 }, (_, k) => <i key={k} />)}</div>
}

export default function Bot() {
  const [msgs, setMsgs] = useState([{ r: 'bot', t: GREET }])
  const [val, setVal] = useState('')
  const [busy, setBusy] = useState(false)
  const live = useRef(true), timer = useRef(), box = useRef(), auto = useRef(true)

  useEffect(() => () => { live.current = false; clearInterval(timer.current) }, [])
  useEffect(() => { if (box.current) box.current.scrollTop = box.current.scrollHeight }, [msgs])

  function send(q) {
    q = q.trim()
    if (!q) return
    setBusy(true); setVal('')
    const res = answer(q)
    setMsgs((m) => [...m, { r: 'me', t: q }, { r: 'bot', t: '', typing: true }])
    setTimeout(() => {
      if (!live.current) return
      let n = 0
      const put = (x) => setMsgs((m) => { const c = m.slice(); c[c.length - 1] = { r: 'bot', t: x, src: res.src }; return c })
      if (reduce) { put(res.t); setBusy(false); return }
      timer.current = setInterval(() => {
        n += 2; put(res.t.slice(0, n))
        if (n >= res.t.length) { clearInterval(timer.current); setBusy(false) }
      }, 22)
    }, 450)
  }

  useEffect(() => {
    if (reduce) return
    let ty
    const to = setTimeout(() => {
      if (!auto.current) return
      const q = Q[0]; let n = 0
      ty = setInterval(() => {
        if (!auto.current || !live.current) { clearInterval(ty); return }
        setVal(q.slice(0, ++n))
        if (n >= q.length) { clearInterval(ty); setTimeout(() => { if (auto.current && live.current) send(q) }, 350) }
      }, 38)
    }, 1600)
    return () => { clearTimeout(to); clearInterval(ty) }
  }, [])

  return (
    <div className="chat">
      <div className="chh">
        <span className="av">MA</span>
        <div><b>Muhammad Arslan</b><small>AI assistant that answers from my CV</small></div>
        <Wave on={busy} />
      </div>
      <div className="msgs" ref={box} aria-live="polite">
        {msgs.map((m, i) => (
          <div className={'msg ' + m.r} key={i}>
            {m.r === 'bot' && <span className="av">MA</span>}
            <div className="bub">
              {m.typing ? <span className="dots"><i /><i /><i /></span> : m.t}
              {m.src && (
                <div className="srcs">
                  {m.src.map((s, j) => <span className="src" key={j}><span>{s[0]}</span><i><b style={{ width: s[1] + '%' }} /></i></span>)}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="cin">
        <div className="chips">
          {Q.map((q) => <button type="button" key={q} disabled={busy} onClick={() => { auto.current = false; send(q) }}>{q}</button>)}
        </div>
        <form className="q" onSubmit={(e) => { e.preventDefault(); auto.current = false; if (!busy) send(val) }}>
          <input type="text" value={val} onChange={(e) => setVal(e.target.value)} onFocus={() => { auto.current = false }} placeholder="Ask me anything about my work" aria-label="Your question" autoComplete="off" />
          <button type="submit" disabled={busy}>Send</button>
        </form>
        <p className="note">Matches your words against passages from my CV. It only answers from what’s written there.</p>
      </div>
    </div>
  )
}
