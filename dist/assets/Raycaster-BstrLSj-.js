import{S as g,r as x,U as M,H as S,k as W,M as H,W as L,v,p as R,q as k,R as C,V as E}from"./three.module-BUZdne6h.js";import{O as j}from"./OrbitControls-UBkTBaol.js";import{_ as z,r as A,o as P,c as q,a as B}from"./index-CvBKhgFj.js";const G={__name:"Raycaster",setup(O){let c=A();const i=new g,t=new x(75,window.innerWidth/window.innerHeight,.1,300);t.position.set(0,0,12),i.add(t);let h=new M(.5,16,16),p=new S({color:"#ffffff"}),u=new W({color:"#ff0000"}),l=[];for(let n=-2;n<2;n++)for(let r=-2;r<2;r++)for(let s=-2;s<2;s++){let d=new H(h,p);d.position.set(n+.5,r+.5,s+.5),i.add(d),l.push(d)}const e=new L;e.setSize(window.innerWidth,window.innerHeight),e.shadowMap.enabled=!0,e.physicallyCorrectLights=!0,P(()=>{c.value.appendChild(e.domElement)});const w=new j(t,e.domElement);w.enableDamping=!0;const _=new v(5);i.add(_);function f(){w.update(),e.render(i,t),requestAnimationFrame(f)}f();let y=new R(16777215,.5);i.add(y);let a=new k("#ffffff",1);a.castShadow=!0,a.position.set(0,0,200),i.add(a);let b=document.querySelector(".left-menu").offsetWidth,m=new C,o=new E;return window.addEventListener("click",n=>{o.x=(n.clientX-b)/window.innerWidth*2-1,o.y=-(n.clientY/window.innerHeight)*2+1,m.setFromCamera(o,t);let r=m.intersectObjects(l);r[0]&&(r[0].object.material=u)}),window.addEventListener("resize",()=>{t.aspect=window.innerWidth/window.innerHeight,t.updateProjectionMatrix(),e.setSize(window.innerWidth,window.innerHeight),e.setPixelRatio(window.devicePixelRatio)}),(n,r)=>(B(),q("div",{id:"box1",ref_key:"raycasterScene",ref:c},null,512))}},V=z(G,[["__scopeId","data-v-96b5ccfd"]]);export{V as default};
