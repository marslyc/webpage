import{S as j,r as T,X as D,k as y,G as M,M as h,B as V,e as Y,a as F,D as v,g as X,H as B,U as H,Z as q,W as N,R as U,V as Z,l as $}from"./three.module-BUZdne6h.js";import{g as d}from"./index-DjKJqAo0.js";import{_ as J,r as K,o as Q,c as ee,a as te,p as oe,e as ae,b as t}from"./index-CvBKhgFj.js";const S=u=>(oe("data-v-82a20ca2"),u=u(),ae(),u),ne=S(()=>t("div",{class:"page page0"},[t("h1",null,"Ray投射光线"),t("h3",null,"THREE.Raycaster实现3d交互效果")],-1)),re=S(()=>t("div",{class:"page page1"},[t("h1",null,"THREE.BufferGeometry！"),t("h3",null,"应用打造酷炫的三角形")],-1)),ie=S(()=>t("div",{class:"page page2"},[t("h1",null,"活泼点光源"),t("h3",null,"点光源围绕照亮小球")],-1)),se=[ne,re,ie],de={__name:"Webpage",setup(u){let G=K();const l=new j,o=new T(75,window.innerWidth/window.innerHeight,.1,3e3);o.position.set(0,0,18),l.add(o);let I=new D(2,2,2),W=new y({wireframe:!0});new y({color:"#ff0000"});let w=new M;for(let e=0;e<5;e++)for(let r=0;r<5;r++)for(let s=0;s<5;s++){let g=new h(I,W);g.position.set(e*2-4,r*2-4,s*2-4),w.add(g)}w.position.set(0,0,-5),l.add(w);let p=new M;for(let e=0;e<50;e++){let r=new V,s=new Float32Array(9);for(let x=0;x<9;x++)s[x]=Math.random()*10-5;r.setAttribute("position",new Y(s,3));let g=new F(Math.random(),Math.random(),Math.random());const A=new y({color:g,side:v,transparent:!0,opacity:.5});let O=new h(r,A);p.add(O)}p.position.set(0,-30,0),l.add(p);let a=new M;const E=new X(20,20),R=new B,m=new h(E,R);m.position.set(0,-1,0),m.rotation.x=-Math.PI/2,m.receiveShadow=!0,a.add(m);const z=new H(1,20,20),L=new B({side:v}),b=new h(z,L);b.castShadow=!0,a.add(b);let i=new q(16711680,1);i.castShadow=!0,i.shadow.radius=20,i.shadow.mapSize.set(512,512),i.decay=0,a.add(i);let c=new h(new H(.1,20,20),new y({color:16711680}));c.position.set(2,2,2),c.add(i),a.add(c),a.position.set(0,-60,0),l.add(a);let k=[w,p,a];const n=new N({alpha:!0});n.setSize(window.innerWidth,window.innerHeight),n.shadowMap.enabled=!0,n.physicallyCorrectLights=!0,Q(()=>{G.value.appendChild(n.domElement)});const C=new $;d.to(w.rotation,{x:"+="+Math.PI*2,y:"+="+Math.PI*2,duration:5,ease:"power1.inOut",repeat:-1}),d.to(p.rotation,{x:"-="+Math.PI*2,z:"+="+Math.PI*2,duration:12,ease:"power2.inOut",repeat:-1}),d.to(c.position,{x:-3,duration:6,ease:"power2.inOut",repeat:-1,yoyo:!0}),d.to(c.position,{y:0,duration:.5,ease:"power2.inOut",repeat:-1,yoyo:!0}),new U;let _=new Z;window.addEventListener("mousemove",e=>{_.x=e.clientX/window.innerWidth-.5,_.y=-(e.clientY/window.innerHeight)-.5});function P(){let e=C.getDelta();o.position.y=-(window.scrollY/window.innerHeight)*30,o.position.x+=(_.x*10-o.position.x)*e*5,n.render(l,o),requestAnimationFrame(P)}P(),window.addEventListener("resize",()=>{o.aspect=window.innerWidth/window.innerHeight,o.updateProjectionMatrix(),n.setSize(window.innerWidth,window.innerHeight),n.setPixelRatio(window.devicePixelRatio)});let f=0;return window.addEventListener("scroll",()=>{let e=Math.round(window.scrollY/window.innerHeight);e!==f&&(f=e,d.to(k[f].rotation,{z:"+="+Math.PI*2,duration:1,ease:"power1.inOut"}),d.fromTo(`.page${f} h1`,{x:-300},{x:0,rotate:"+=360",duration:1}))}),(e,r)=>(te(),ee("div",{id:"box1",ref_key:"pageScene",ref:G},se,512))}},ce=J(de,[["__scopeId","data-v-82a20ca2"]]);export{ce as default};
