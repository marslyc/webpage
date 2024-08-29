import{S as u,r as f,f as P,D as x,u as M,W as y,s as C,l as _}from"./three.module-BUZdne6h.js";import{O as S}from"./OrbitControls-UBkTBaol.js";import{g as L}from"./index-DjKJqAo0.js";import{R as b}from"./RGBELoader-C_APSFo0.js";import{G as E}from"./GLTFLoader-DwfIB8W0.js";import{r as R,o as z,c as k,a as F}from"./index-E0VyOJT8.js";var W=`precision lowp float;

varying vec4 vPosition;
varying vec4 gPosition;

void main(){

    vec4 modelPosition = modelMatrix * vec4( position, 1.0 );

    vPosition = modelPosition;
    gPosition = vec4( position, 1.0 );
    gl_Position = projectionMatrix * viewMatrix * modelPosition ;
}`,A=`precision lowp float;
varying vec4 vPosition;
varying vec4 gPosition;
void main(){
    vec4 redColor = vec4(1.0,0.0,0.0,1.0);
    vec4 yellowColor = vec4(1.0,1.0,0.5,1.0);

    vec4 mixColor = mix(yellowColor, redColor, gPosition.y/3.0);
    

    if(gl_FrontFacing) {
        gl_FragColor = vec4(mixColor.xyz - ((vPosition.y-20.0)/80.0 - 0.1), 1.0);
    } else {
        gl_FragColor = vec4(mixColor.xyz, 1.0);
    }
}`;const U={__name:"Light",setup(D){let l=R();const t=new u,o=new f(90,window.innerWidth/window.innerHeight,.1,1e3);o.position.set(0,0,6),t.add(o);let c=new P({vertexShader:W,fragmentShader:A,side:x}),m=new URL("/assets/2k-CzDr2HGN.hdr",import.meta.url).href;new b().loadAsync(m).then(n=>{n.mapping=M,t.background=n,t.environment=n});let d=null,g=new URL("/assets/flyLight-zDy0P3lX.glb",import.meta.url).href;new E().load(g,n=>{d=n.scene.children[0],d.material=c;for(let r=0;r<150;r++){let a=n.scene.clone(!0),w=(Math.random()-.5)*300,h=(Math.random()-.5)*300,v=Math.random()*60+25;a.position.set(w,v,h),t.add(a),L.to(a.rotation,{y:"+="+Math.random()*20,yoyo:!0,duration:5+Math.random()*10,repeat:-1})}});const e=new y({alpha:!0});e.setSize(window.innerWidth,window.innerHeight),e.shadowMap.enabled=!0,e.outputEncoding=void 0,e.toneMapping=C,e.toneMappingExposure=.4,z(()=>{l.value.appendChild(e.domElement)});const i=new S(o,e.domElement);i.enableDamping=!0,i.autoRotate=!0,i.autoRotateSpeed=.5,i.maxPolarAngle=Math.PI/3*2,i.minPolarAngle=Math.PI/3*2;const p=new _;function s(){p.getElapsedTime(),i.update(),e.render(t,o),requestAnimationFrame(s)}return s(),window.addEventListener("resize",()=>{o.aspect=window.innerWidth/window.innerHeight,o.updateProjectionMatrix(),e.setSize(window.innerWidth,window.innerHeight),e.setPixelRatio(window.devicePixelRatio)}),(n,r)=>(F(),k("div",{id:"box1",ref_key:"light",ref:l},null,512))}};export{U as default};
