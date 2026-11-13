import * as THREE from 'three'
function initScene(){var dead=false;
var st=document.getElementById('stage'),cv=document.getElementById('gl');
if(!st){if(st)st.style.display='none';return}
try{
var reduce=matchMedia('(prefers-reduced-motion:reduce)').matches;
var R=new THREE.WebGLRenderer({canvas:cv,alpha:true,antialias:true});R.setPixelRatio(Math.min(devicePixelRatio,2));
var S=new THREE.Scene(),C=new THREE.PerspectiveCamera(35,1,.1,100);
S.add(new THREE.AmbientLight(0xffffff,.85));var dl=new THREE.DirectionalLight(0xffffff,.65);dl.position.set(5,10,7);S.add(dl);
var G=new THREE.Group();S.add(G);
var NAVY=0x0E2552,BLUE=0x2455D9,SOFT=0x8DB4F5,ACC=0x0EA5C6,XS=[-1.8,0,1.8],ZS=[-.6,.5,-.3];
var L=[['Clients','React, TypeScript'],['API services','FastAPI, Fastify, REST'],['AI layer','LLMs, RAG, voice agents'],['Workers','queues, n8n, WebSockets'],['Data','PostgreSQL, Redis, Qdrant']];
function label(a,b){var c=document.createElement('canvas'),x=c.getContext('2d');c.width=640;c.height=96;x.textBaseline='middle';
x.font='700 34px "Schibsted Grotesk",Arial,sans-serif';x.fillStyle='#0F1B33';x.fillText(a,0,30);
x.font='400 25px "Schibsted Grotesk",Arial,sans-serif';x.fillStyle='#54648A';x.fillText(b,0,68);
var s=new THREE.Sprite(new THREE.SpriteMaterial({map:new THREE.CanvasTexture(c),transparent:true,opacity:0,depthTest:false}));
s.scale.set(3.6,.54,1);s.center.set(0,.5);s.position.set(3.4,.2,0);return s}
var layers=[],i,k;
L.forEach(function(l,k){var y=2.7-k*1.35,g=new THREE.Group(),sm=new THREE.MeshStandardMaterial({color:0xDCE9FF,transparent:true,opacity:0,roughness:.9}),
slab=new THREE.Mesh(new THREE.BoxGeometry(6,.12,3.4),sm),em=new THREE.LineBasicMaterial({color:NAVY,transparent:true,opacity:0});
g.add(slab,new THREE.LineSegments(new THREE.EdgesGeometry(slab.geometry),em));
var cubes=[];for(var i=0;i<3;i++){var cm=new THREE.MeshStandardMaterial({color:k===2?NAVY:(i===1?BLUE:SOFT),transparent:true,opacity:0,roughness:.5}),c=new THREE.Mesh(new THREE.BoxGeometry(.9,.5,.9),cm);c.position.set(XS[i],.06,ZS[i]);g.add(c);cubes.push(c)}
var lb=label(l[0],l[1]);g.add(lb);g.position.y=y;G.add(g);layers.push({g:g,y:y,sm:sm,em:em,cubes:cubes,lb:lb,ai:k===2})});
var conns=[],pos=[];
for(k=0;k<4;k++)for(i=0;i<3;i++)[i,(i+1)%3].forEach(function(j,n){if(n===1&&i===2)return;var a=new THREE.Vector3(XS[i],2.7-k*1.35+.31,ZS[i]),b=new THREE.Vector3(XS[j],2.7-(k+1)*1.35+.31,ZS[j]);conns.push([a,b]);pos.push(a.x,a.y,a.z,b.x,b.y,b.z)});
var lg=new THREE.BufferGeometry();lg.setAttribute('position',new THREE.Float32BufferAttribute(pos,3));
var lm=new THREE.LineBasicMaterial({color:NAVY,transparent:true,opacity:0});G.add(new THREE.LineSegments(lg,lm));
var pk=[],pm=new THREE.MeshBasicMaterial({color:ACC,transparent:true,opacity:0}),pg=new THREE.SphereGeometry(.11,12,12);
for(i=0;i<18;i++){var m=new THREE.Mesh(pg,pm);G.add(m);pk.push({m:m,c:conns[Math.floor(Math.random()*conns.length)],t:Math.random(),v:.35+Math.random()*.5,d:Math.random()<.5?1:-1})}
var mx=0,tx=0,vis=true,dist=19;
st.addEventListener('pointermove',function(e){var r=st.getBoundingClientRect();mx=(e.clientX-r.left)/r.width-.5});
if('IntersectionObserver' in window)new IntersectionObserver(function(en){vis=en[0].isIntersecting}).observe(st);
function size(){var w=st.clientWidth,h=st.clientHeight;R.setSize(w,h,false);C.aspect=w/h;dist=19/Math.min(1,(w/h)/1.3);C.position.set(0,dist*.2,dist);C.lookAt(0,-.1,0);C.updateProjectionMatrix()}
addEventListener('resize',size);if(window.ResizeObserver)new ResizeObserver(size).observe(st);size();
function cl(x){return x<0?0:x>1?1:x}function eo(x){return 1-Math.pow(1-cl(x),3)}
var t0=performance.now(),last=0;
function frame(now){if(dead)return;var t=reduce?9:(now-t0)/1000,dt=Math.min(.05,t-last);last=t;
if(vis){tx+=(mx-tx)*.05;
layers.forEach(function(l,k){var e=eo((t-.2-k*.28)/1);l.g.position.y=l.y+(1-e)*4;l.sm.opacity=.92*e;l.em.opacity=.55*e;l.lb.material.opacity=cl((t-.9-k*.28)/.5);
l.cubes.forEach(function(c,i){var e2=eo((t-.7-k*.28-i*.12)/.5),sc=Math.max(.01,e2)*(l.ai&&!reduce?1+.12*Math.sin(t*2.2+i):1);c.scale.y=sc;c.position.y=.06+.25*sc;c.material.opacity=e2})});
lm.opacity=.4*cl((t-2)/.8);pm.opacity=cl((t-2.2)/.6);
pk.forEach(function(p){if(!reduce)p.t+=dt*p.v*p.d;if(p.t>1||p.t<0){p.c=conns[Math.floor(Math.random()*conns.length)];p.t=p.d>0?0:1}p.m.position.lerpVectors(p.c[0],p.c[1],p.t)});
G.rotation.y=-.55+(reduce?0:Math.sin(t*.3)*.2)+tx*.45;
R.render(S,C)}
if(!reduce)requestAnimationFrame(frame)}
requestAnimationFrame(frame);
}catch(e){st.style.display='none'}

return function(){dead=true;try{removeEventListener('resize',size);R.dispose()}catch(e){}}}



export { initScene }
