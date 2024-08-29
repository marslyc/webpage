import{S as I,r as O,g as j,H as M,M as _,X as B,I as J,W as T,v as q,p as F,q as U,c as m,l as V}from"./three.module-BUZdne6h.js";import{O as X}from"./OrbitControls-UBkTBaol.js";import{G as K}from"./GLTFLoader-DwfIB8W0.js";import{_ as N,r as Q,o as Y,h as Z,c as $,a as ee}from"./index-CvBKhgFj.js";const te={__name:"Wander",setup(ne){let z=Q();const r=new I,l=new O(75,window.innerWidth/window.innerHeight,.1,3e3);l.position.set(0,2,10),r.add(l);let D=new j(1e3,1e3),S=new M({color:16777215}),k=new _(D,S);k.rotation.x=-Math.PI/2,k.receiveShadow=!0,r.add(k);let u=(e,t)=>Math.floor(Math.random()*(t-e))+e;for(let e=0;e<100;e++){let t=u(2,5),a=u(2,5),d=new B(t,t,a),o=new M({color:16711680}),L=new _(d,o);L.position.set(u(-100,100),a/2,u(-100,100)),L.castShadow=!0,r.add(L)}let h,W=new URL("/assets/RobotExpressive-BhJ5TM2m.glb",import.meta.url).href,x={},n;new K().load(W,e=>{n=e.scene,r.add(e.scene);let t=e.animations;h=new J(e.scene),t.forEach((a,d)=>{let o=h.clipAction(a);x[a.name]=o}),n.traverse(a=>{a.castShadow=!0})});const s=new T;s.setSize(window.innerWidth,window.innerHeight),s.shadowMap.enabled=!0,s.physicallyCorrectLights=!0;const b=new X(l,s.domElement);b.enableDamping=!0;const E=new q(5);r.add(E);let C=new F(16777215,1);r.add(C);let g=new U(16777215,1);g.castShadow=!0,g.position.set(50,25,10),r.add(g);let c=null,y=null,f=(e,t=.2)=>{y=c,c=x[e],y!=c&&(y&&y.fadeOut(t),c&&c.reset().fadeIn(t).play())},p=!1,w=!1,i={},G=()=>{w||p||(i.keyw&&i.shiftleft||i.keya&&i.shiftleft||i.keys&&i.shiftleft||i.keyd&&i.shiftleft?f("Running"):i.keyw||i.keya||i.keys||i.keyd?f("Walking"):f("Idle"))},H=e=>{let t=x[e],a=t.getClip();return t&&a?a.duration:0};window.addEventListener("keydown",e=>{let t=e.code.toLocaleLowerCase();t=="space"&&!p&&(p=!0,f("Jump")),t=="keyj"&&!w&&(w=!0,f("Dance")),t=="keyk"&&w&&(w=!1),i[t]=!0}),window.addEventListener("keyup",e=>{let t=e.code.toLocaleLowerCase();t=="space"&&p&&setTimeout(()=>{p=!1},H("Jump")*800),i[t]=!1});let P=()=>{let e=new m;l.getWorldDirection(e);let t=new m,d=new m(0,0,.06).length();if(i.keyw)t.set(n.position.x+e.x,n.position.y,n.position.z+e.z),n.lookAt(t),e.y=0,e.normalize(),e.setLength(d),n.position.add(e);else if(i.keys)t.set(n.position.x-e.x,n.position.y,n.position.z-e.z),n.lookAt(t),e.y=0,e.normalize(),e.setLength(d),n.position.sub(e);else if(i.keya){let o=new m(-e.z,0,e.x);t.set(n.position.x-o.x,n.position.y,n.position.z-o.z),n.lookAt(t),o.setLength(d),n.position.add(o.negate())}else if(i.keyd){let o=new m(e.z,0,-e.x);t.set(n.position.x-o.x,n.position.y,n.position.z-o.z),n.lookAt(t),o.setLength(d),n.position.add(o.negate())}};const R=new V;function v(){let e=R.getDelta();h&&(h.update(e),G()),P(),b.update(),s.render(r,l),requestAnimationFrame(v)}v();let A=()=>{l.aspect=window.innerWidth/window.innerHeight,l.updateProjectionMatrix(),s.setSize(window.innerWidth,window.innerHeight),s.setPixelRatio(window.devicePixelRatio)};return Y(()=>{z.value.appendChild(s.domElement)}),Z(()=>{window.removeEventListener("resize",A)}),window.addEventListener("resize",A),(e,t)=>(ee(),$("div",{id:"box1",ref_key:"wanderScene",ref:z},null,512))}},le=N(te,[["__scopeId","data-v-abc5a052"]]);export{le as default};
