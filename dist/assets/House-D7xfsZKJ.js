import{S as X,r as q,T as G,i as L,j as Y,V as w,k as R,D as j,M as K,X as N,R as Q,W as Z,v as $,l as ee}from"./three.module-BUZdne6h.js";import{O as te}from"./OrbitControls-UBkTBaol.js";import{_ as re,r as ae,o as se,c as ie,a as ne}from"./index-CvBKhgFj.js";const oe={__name:"House",setup(le){let u=ae();const n=new X,r=new q(75,window.innerWidth/window.innerHeight,.1,3e3);r.position.set(0,0,10),n.add(r);let M=new URL("/assets/20_l-BWNKBldi.jpg",import.meta.url).href,U=new URL("/assets/20_r-BSvortp2.jpg",import.meta.url).href,W=new URL("/assets/20_u-Be5zSVWU.jpg",import.meta.url).href,y=new URL("/assets/20_d-CjXWa_s1.jpg",import.meta.url).href,B=new URL("/assets/20_b-DDJA0iWA.jpg",import.meta.url).href,D=new URL("/assets/20_f-DVi-PIsT.jpg",import.meta.url).href,k=new URL("/assets/23_l-pFDxaF4B.jpg",import.meta.url).href,v=new URL("/assets/23_r-D2-WvijP.jpg",import.meta.url).href,C=new URL("/assets/23_u-CA7TW5ay.jpg",import.meta.url).href,H=new URL("/assets/23_d-k5JbYsZ7.jpg",import.meta.url).href,E=new URL("/assets/23_b-DRBJQe-4.jpg",import.meta.url).href,P=new URL("/assets/23_f-BDM6kSTd.jpg",import.meta.url).href,o=new G,h,T=new URL("@/images/textures/city/door.png",import.meta.url).href,A=o.load(T),f=new L({map:A}),I=new URL("/assets/alarm-MfChgUgh.png",import.meta.url).href,z=o.load(I),F=new L({map:z});h=f;let e=new Y(h);e.position.set(2,0,20),e.scale.set(2,2,2),n.add(e);let g=[],p=[];[M,U,W,y,B,D].forEach((a,s)=>{let i=o.load(a);(s==2||s==3)&&(i.rotation=Math.PI,i.center=new w(.5,.5));let c=new R({map:i,side:j,transparent:!0});p.push(c)});let _=[];[k,v,C,H,E,P].forEach((a,s)=>{let i=o.load(a);(s==2||s==3)&&(i.rotation=Math.PI,i.center=new w(.5,.5));let c=new R({map:i,side:j,transparent:!0});_.push(c)}),g=p;let l=new K(new N(40,40,40),g);l.geometry.scale(5,5,-5),n.add(l);let V=document.querySelector(".left-menu").offsetWidth,m="room",S=new Q,d=new w;window.addEventListener("click",a=>{d.x=(a.clientX-V)/window.innerWidth*2-1,d.y=-(a.clientY/window.innerHeight)*2+1,S.setFromCamera(d,r),S.intersectObject(e).length>0&&(m=="room"?(l.material=_,e.material=F,e.position.set(-30,0,0),m="bedroom"):m=="bedroom"&&(l.material=p,e.material=f,e.position.set(2,0,20),m="room"))});const t=new Z;t.setSize(window.innerWidth,window.innerHeight),t.shadowMap.enabled=!0,t.physicallyCorrectLights=!0,se(()=>{u.value.appendChild(t.domElement)});const b=new te(r,t.domElement);b.enableDamping=!0;const J=new $(5);n.add(J);const O=new ee;function x(){O.getElapsedTime(),b.update(),t.render(n,r),requestAnimationFrame(x)}return x(),window.addEventListener("resize",()=>{r.aspect=window.innerWidth/window.innerHeight,r.updateProjectionMatrix(),t.setSize(window.innerWidth,window.innerHeight),t.setPixelRatio(window.devicePixelRatio)}),(a,s)=>(ne(),ie("div",{id:"box1",ref_key:"house",ref:u},null,512))}},ue=re(oe,[["__scopeId","data-v-2df5d48d"]]);export{ue as default};
