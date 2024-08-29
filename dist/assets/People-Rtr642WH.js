import{S as H,r as B,T as P,H as w,_ as U,$ as k,C as E,g as G,M as N,q as W,W as A,v as D,l as J}from"./three.module-BUZdne6h.js";import{O as F}from"./OrbitControls-UBkTBaol.js";import{G as O}from"./GLTFLoader-DwfIB8W0.js";import{r as q,o as X,c as I,a as Z}from"./index-E0VyOJT8.js";const re={__name:"People",setup($){let m=q();const t=new H,a=new B(75,window.innerWidth/window.innerHeight,.1,50);a.position.set(0,0,10),t.add(a);let g=new URL("/assets/color-lrtiHrXO.jpg",import.meta.url).href,x=new URL("/assets/normal-CeJmrFHk.jpg",import.meta.url).href,s=new P,h=s.load(g),S=s.load(x),o={uTime:{value:0}},d=new w({map:h,normalMap:S});d.onBeforeCompile=e=>{e.uniforms.uTime=o.uTime,e.vertexShader=e.vertexShader.replace("#include <common>",`
    #include <common>
    mat2 rotate2d(float _angle){
      return mat2(cos(_angle),-sin(_angle),
                  sin(_angle),cos(_angle));
    }
    uniform float uTime;
    `),e.vertexShader=e.vertexShader.replace("#include <beginnormal_vertex>",`
    #include <beginnormal_vertex>
    float angle = sin(position.y+uTime) *0.5;
    // float angle = position.y *0.5;
    mat2 rotateMatrix = rotate2d(angle);
    
    objectNormal.xz = rotateMatrix * objectNormal.xz;
    `),e.vertexShader=e.vertexShader.replace("#include <begin_vertex>",`
    #include <begin_vertex>
    // float angle = PI;
    // float angle = transformed.y *0.5;
    // mat2 rotateMatrix = rotate2d(angle);
    transformed.xz = rotateMatrix * transformed.xz;
    `)};let c=new U({depthPacking:k});c.onBeforeCompile=e=>{e.uniforms.uTime=o.uTime,e.vertexShader=e.vertexShader.replace("#include <common>",`
    #include <common>
    mat2 rotate2d(float _angle){
      return mat2(cos(_angle),-sin(_angle),
                  sin(_angle),cos(_angle));
    }
    uniform float uTime;
    `),e.vertexShader=e.vertexShader.replace("#include <begin_vertex>",`
    #include <begin_vertex>
    // float angle = transformed.y *0.5;
    float angle = sin(transformed.y+uTime) *0.5;
    mat2 rotateMatrix = rotate2d(angle);
    transformed.xz = rotateMatrix * transformed.xz;
    `)};let v=new URL("/assets/LeePerrySmith-BMNXvrc1.glb",import.meta.url).href;new O().load(v,e=>{let n=e.scene.children[0];n.material=d,n.castShadow=!0,n.customDepthMaterial=c,t.add(n)});let _=new URL("/assets/px-B_mJEnHZ.jpg",import.meta.url).href,L=new URL("/assets/nx-B2jA2_bj.jpg",import.meta.url).href,M=new URL("/assets/py-BAJs89dn.jpg",import.meta.url).href,b=new URL("/assets/ny-Cwwt0CJa.jpg",import.meta.url).href,T=new URL("/assets/pz-CxN-nNoH.jpg",import.meta.url).href,R=new URL("/assets/nz-BR32y5g7.jpg",import.meta.url).href,p=new E().load([_,L,M,b,T,R]);t.background=p,t.environment=p;let j=new G(20,20),y=new w,i=new N(j,y);i.position.set(0,0,-6),i.receiveShadow=!0,t.add(i);let l=new W("#ffffff",1);l.castShadow=!0,l.position.set(0,0,200),t.add(l);const r=new A({});r.setSize(window.innerWidth,window.innerHeight),r.shadowMap.enabled=!0,X(()=>{m.value.appendChild(r.domElement)});const u=new F(a,r.domElement);u.enableDamping=!0;const C=new D(5);t.add(C),window.addEventListener("resize",()=>{a.aspect=window.innerWidth/window.innerHeight,a.updateProjectionMatrix(),r.setSize(window.innerWidth,window.innerHeight),r.setPixelRatio(window.devicePixelRatio)});const z=new J;function f(){let e=z.getElapsedTime();o.uTime.value=e,u.update(),r.render(t,a),requestAnimationFrame(f)}return f(),(e,n)=>(Z(),I("div",{id:"box1",ref_key:"peopleScene",ref:m},null,512))}};export{re as default};
