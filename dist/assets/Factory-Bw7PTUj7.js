import{c as b,t as I,Q,O as j,S as Y,u as Z,q as $,r as ee,W as te,s as ne,V as se,R as ie,T as re,G as oe,e as ae,a as le,f as ce,A as de,P as ue,l as pe}from"./three.module-BUZdne6h.js";import{R as he}from"./RGBELoader-C_APSFo0.js";import{e as p,a as me}from"./eventHub-DmsUuzo6.js";import{O as fe}from"./OrbitControls-UBkTBaol.js";import"./init-CHV9EL4j.js";import{G as ve}from"./GLTFLoader-DwfIB8W0.js";import{D as ge}from"./DRACOLoader-DJwBgP83.js";import{g as G}from"./index-DjKJqAo0.js";import{r as D,o as ye,a as F,c as R,b as r,F as we,_ as _e,u as B,p as Ce,e as xe,f as U}from"./index-CvBKhgFj.js";const V=new b,Se=new Q,N=new b;class Ae extends j{constructor(t=document.createElement("div")){super(),this.isCSS3DObject=!0,this.element=t,this.element.style.position="absolute",this.element.style.pointerEvents="auto",this.element.style.userSelect="none",this.element.setAttribute("draggable",!1),this.addEventListener("removed",function(){this.traverse(function(s){s.element instanceof Element&&s.element.parentNode!==null&&s.element.parentNode.removeChild(s.element)})})}copy(t,s){return super.copy(t,s),this.element=t.element.cloneNode(!0),this}}const g=new I,Me=new I;class Be{constructor(t={}){const s=this;let a,c,h,v;const u={camera:{style:""},objects:new WeakMap},o=t.element!==void 0?t.element:document.createElement("div");o.style.overflow="hidden",this.domElement=o;const d=document.createElement("div");d.style.transformOrigin="0 0",d.style.pointerEvents="none",o.appendChild(d);const y=document.createElement("div");y.style.transformStyle="preserve-3d",d.appendChild(y),this.getSize=function(){return{width:a,height:c}},this.render=function(i,e){const m=e.projectionMatrix.elements[5]*v;e.view&&e.view.enabled?(d.style.transform=`translate( ${-e.view.offsetX*(a/e.view.width)}px, ${-e.view.offsetY*(c/e.view.height)}px )`,d.style.transform+=`scale( ${e.view.fullWidth/e.view.width}, ${e.view.fullHeight/e.view.height} )`):d.style.transform="",i.matrixWorldAutoUpdate===!0&&i.updateMatrixWorld(),e.parent===null&&e.matrixWorldAutoUpdate===!0&&e.updateMatrixWorld();let P,w;e.isOrthographicCamera&&(P=-(e.right+e.left)/2,w=(e.top+e.bottom)/2);const _=e.view&&e.view.enabled?e.view.height/e.view.fullHeight:1,x=e.isOrthographicCamera?`scale( ${_} )scale(`+m+")translate("+n(P)+"px,"+n(w)+"px)"+T(e.matrixWorldInverse):`scale( ${_} )translateZ(`+m+"px)"+T(e.matrixWorldInverse),M=(e.isPerspectiveCamera?"perspective("+m+"px) ":"")+x+"translate("+h+"px,"+v+"px)";u.camera.style!==M&&(y.style.transform=M,u.camera.style=M),z(i,i,e)},this.setSize=function(i,e){a=i,c=e,h=a/2,v=c/2,o.style.width=i+"px",o.style.height=e+"px",d.style.width=i+"px",d.style.height=e+"px",y.style.width=i+"px",y.style.height=e+"px"};function n(i){return Math.abs(i)<1e-10?0:i}function T(i){const e=i.elements;return"matrix3d("+n(e[0])+","+n(-e[1])+","+n(e[2])+","+n(e[3])+","+n(e[4])+","+n(-e[5])+","+n(e[6])+","+n(e[7])+","+n(e[8])+","+n(-e[9])+","+n(e[10])+","+n(e[11])+","+n(e[12])+","+n(-e[13])+","+n(e[14])+","+n(e[15])+")"}function W(i){const e=i.elements;return"translate(-50%,-50%)"+("matrix3d("+n(e[0])+","+n(e[1])+","+n(e[2])+","+n(e[3])+","+n(-e[4])+","+n(-e[5])+","+n(-e[6])+","+n(-e[7])+","+n(e[8])+","+n(e[9])+","+n(e[10])+","+n(e[11])+","+n(e[12])+","+n(e[13])+","+n(e[14])+","+n(e[15])+")")}function H(i){i.isCSS3DObject&&(i.element.style.display="none");for(let e=0,m=i.children.length;e<m;e++)H(i.children[e])}function z(i,e,m,P){if(i.visible===!1){H(i);return}if(i.isCSS3DObject){const w=i.layers.test(m.layers)===!0,_=i.element;if(_.style.display=w===!0?"":"none",w===!0){i.onBeforeRender(s,e,m);let x;i.isCSS3DSprite?(g.copy(m.matrixWorldInverse),g.transpose(),i.rotation2D!==0&&g.multiply(Me.makeRotationZ(i.rotation2D)),i.matrixWorld.decompose(V,Se,N),g.setPosition(V),g.scale(N),g.elements[3]=0,g.elements[7]=0,g.elements[11]=0,g.elements[15]=1,x=W(g)):x=W(i.matrixWorld);const O=u.objects.get(i);if(O===void 0||O.style!==x){_.style.transform=x;const M={style:x};u.objects.set(i,M)}_.parentNode!==y&&y.appendChild(_),i.onAfterRender(s,e,m)}}for(let w=0,_=i.children.length;w<_;w++)z(i.children[w],e,m)}}}let C=new Y,Ee=new he,Ge=new URL("/assets/2k-CzDr2HGN.hdr",import.meta.url).href;Ee.loadAsync(Ge).then(l=>{l.mapping=Z,C.background=l,C.environment=l});const q=new $(16777215,1);q.position.set(10,100,10);C.add(q);let L=new ee(75,window.innerWidth/window.innerHeight,.1,1e5);L.position.set(100,100,300);class Pe{constructor(){this.activeCamera=L,this.cameraCollect={default:L},p.on("toggleCamera",t=>{this.setActiveCamera(t)})}addCamera(t,s){this.cameraCollect[t]=s}setActiveCamera(t){this.activeCamera=this.cameraCollect[t]}}const A=new Pe;let E=new te({antialias:!0,physicallyCorrectLights:!0,logarithmicDepthBuffer:!0});E.setSize(window.innerWidth,window.innerHeight);E.shadowMap.enabled=!0;E.toneMapping=ne;E.toneMappingExposure=.8;const X=new Be;X.setSize(window.innerWidth,window.innerHeight);const S={renderer:E,css3drender:X},J=new fe(A.activeCamera,S.renderer.domElement);J.enableDamping=!0;class Oe{constructor(){this.controls=J}}const De=new Oe;var Le=`uniform sampler2D uTexture;
uniform vec3 uColor;
void main(){
    vec4 uTextureColor = texture2D(uTexture, gl_PointCoord);
    gl_FragColor = vec4(uColor, uTextureColor.x);
}`,ke=`attribute vec3 aPosition; 
uniform float uTime;
void main(){
    vec4 currentPosition = modelMatrix * vec4(position, 1.0);
    vec3 direction = aPosition - currentPosition.xyz;
    

    vec3 targetPosition = currentPosition.xyz + direction * 0.1 * uTime;
    vec4 vPosition = viewMatrix * vec4(targetPosition, 1.0);
    gl_Position = projectionMatrix*vPosition;
    
    gl_PointSize = -100.0/vPosition.z;
}`;class be{constructor(t){let s=new ve,a=new ge;a.setDecoderPath("/draco/"),a.setDecoderConfig({type:"js"}),a.preload(),s.setDRACOLoader(a),this.scene=t,this.floor1Group,this.floor2Group,this.wallGroup,this.floor2Tags=[];let c=["小型会议室","核心科技室","科技展台","设计总监办公室"],h=new URL("/assets/floor2-qUgHYOA0.glb",import.meta.url).href;s.load(h,u=>{this.floor2Group=u.scene,u.scene.traverse(o=>{if(o.isMesh&&(o.material.emissiveIntensity=15),c.indexOf(o.name)!=-1){let d=this.createTag(o);this.floor2Tags.push(d),this.floor2Group.add(d)}}),t.add(this.floor2Group)});let v=new URL("/assets/Fighter1-CSGuFXbK.glb",import.meta.url).href;s.load(v,u=>{this.fighterGroup=u.scene,t.add(this.fighterGroup),this.fighterGroup.position.set(3,42,68),this.fighterGroup.traverse(o=>{o.isMesh&&(o.material.emissiveIntensity=15,o.position2=o.position.clone())}),this.mouse=new se,this.raycaster=new ie,window.addEventListener("click",o=>{o.mesh=this,this.mouse.x=o.clientX/window.innerWidth*2-1,this.mouse.y=-(o.clientY/window.innerHeight*2-1),this.raycaster.setFromCamera(this.mouse,A.activeCamera),this.raycaster.intersectObject(this.fighterGroup).length>0&&console.log("点击了飞机")})}),this.initEvent()}update(t){this.mixer&&this.mixer.update(t)}createTag(t){const s=document.createElement("div");s.className="elementTag",s.innerHTML=`
        <div class="elementContent">
            <h3>${t.name}</h3>
            <p>温度：30℃</p>
            <p>湿度：40%</p>
        </div>
        `;const a=new Ae(s);return a.position.copy(t.position),a.scale.set(.2,.2,.2),a}initEvent(){p.on("flatFighter",()=>{let t=[];for(var s=0;s<5;s++)for(var a=0;a<5;a++)t.push(new b(s*2-2,a*2-2,0));let c=0;this.fighterGroup.traverse(h=>{h.isMesh&&(t[c].multiplyScalar(10),G.to(h.position,{x:"+="+t[c].x,y:"+="+t[c].y,z:"+="+t[c].z,duration:1}),c++)})}),p.on("recoverFighter",()=>{this.fighterGroup.traverse(t=>{t.isMesh&&G.to(t.position,{x:t.position2.x,y:t.position2.y,z:t.position2.z,duration:1})})}),p.on("pointsFighter",()=>{this.createPoints(this.fighterGroup)}),p.on("pointsBlast",()=>{this.pointsBlast()}),p.on("pointsBack",()=>{this.pointsBack()})}createPoints(t){this.fighterPointsGroup||(this.fighterPointsGroup=this.transformPoints(t),this.scene.add(this.fighterPointsGroup))}transformPoints(t){let s=new URL("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADgAAAA4CAMAAACfWMssAAAAq1BMVEUAAAAGBgYLCwsQEBAYGBggICAcHBwUFBQnJyckJCQxMTHh4eHa2to+Pj7q6urKysqqqqouLi7n5+fk5ORiYmLt7e3X19fR0dG9vb25ubmenp6MjIx/f39HR0c6OjpdXV3v7+97e3tPT08rKys2NjbOzs7Dw8O0tLSWlpaSkpJ3d3d1dXVvb29sbGxbW1tXV1dUVFRMTExERERBQUGgoKA1NTXx8fHc3NyhoaGopjlnAAAB/ElEQVRIx+3WyZKbMBAG4CQTh1UGgcy+BIz3fZuZ93+ytBuqL4JiHF3nP/nyVbeMpNaP77yen5T/UJRX2C/KVympNwzZLzBCmkZ4jLYMjfYbAz+IjrgnA/GnyxMjlaTkNFSTLmi1To44VIahQwwDrSRlB+WAAeLchHAOGCgUHZTkgM3NpmC36/XGioc5B0pywL21jjcsr0/Hsjye6pw1vJVtt30Q1ofOLPKzOOyqLKt2B3HOCxOlBhKhXLBz7FLus3Sd3O/JOs325YV1EktKEBudTMDVYpsm7iqOonjlJulW1CixWYD9BXVeXES1ceOlswjDhbOM3U0lLgXXqaRcEJwxb/Jyu3EjJwxsSBA6kbvZlnkzh2axpAyxoMnO+xRcYFsYOwCZ7s+sLSlB6vSRiyyJneDD8n3P833rI3DiJBP5g3rtWSJ0WtSH1F2GtuV7U4jnW3a4dNNDXUCvtEh5iZydduuVEzzdDPKUgbNa706M0yJ7oG7ejlUSL6DgdPYXMptCyUWcVMebqQ9ADeG1zO4RdOoBfH8H6EGv0T0rrwg1ZTjeqie1qvDnKHyOsQ3g9WwAhS2nssnVjxUdZGPwIFPB8avj87Pv6lC4rEavRyGGr0f1C1keASZGGgEKQ0dpzKkPVnmUA8BIo1zh8aD0XFF/IKk/yciS+s7L+QfFrE8fdgvs9QAAAABJRU5ErkJggg==",import.meta.url).href;const a=new re().load(s),c=new oe;function h(v,u){v.children.length>0&&v.children.forEach(o=>{if(o.isMesh){const d=new le(Math.random(),Math.random(),Math.random()),y=new ce({uniforms:{uColor:{value:d},uTexture:{value:a},uTime:{value:0}},vertexShader:ke,fragmentShader:Le,blending:de,transparent:!0,depthTest:!1}),n=new ue(o.geometry,y);n.position.copy(o.position),n.rotation.copy(o.rotation),n.scale.copy(o.scale),u.add(n),h(o,n)}})}return h(t,c),c}pointsBlast(){this.fighterPointsGroup.traverse(t=>{if(t.isPoints){let s=new Float32Array(t.geometry.attributes.position.count*3);for(let a=0;a<t.geometry.attributes.position.count;a++)s[a*3+0]=(Math.random()*2-1)*10,s[a*3+1]=(Math.random()*2-1)*10,s[a*3+2]=(Math.random()*2-1)*10;t.geometry.setAttribute("aPosition",new ae(s,3)),G.to(t.material.uniforms.uTime,{value:10,duration:5})}})}pointsBack(){this.fighterPointsGroup.traverse(t=>{t.isPoints&&G.to(t.material.uniforms.uTime,{value:0,duration:5})})}}let k;const Fe=()=>(k=new be(C),k);function Re(l){k.update(l)}const Te=new pe;function K(l,t){let s=Te.getDelta();De.controls.update(),l(s),requestAnimationFrame(()=>{K(l)}),S.renderer.render(C,A.activeCamera),S.css3drender.render(C,A.activeCamera)}p.on("toggleCamera",()=>{});const We={__name:"FactoryScene",setup(l){let t=D(null),s=D(null);return C.add(A.activeCamera),C.add(me),Fe(),S.renderer.render(C,A.activeCamera),ye(()=>{t.value.appendChild(S.renderer.domElement),t.value.appendChild(S.renderer.domElement),s.value.appendChild(S.css3drender.domElement),K(Re)}),(a,c)=>(F(),R(we,null,[r("div",{class:"scene",ref_key:"sceneDiv",ref:t},null,512),r("div",{class:"cssrender",ref_key:"cssrenderScene",ref:s},null,512)],64))}},f=l=>(Ce("data-v-11aaa50a"),l=l(),xe(),l),He={id:"bigScreen"},ze=f(()=>r("div",{class:"header"},"超宇智慧工厂系统管理平台",-1)),Ue={class:"main"},Ve={class:"right"},Ne=["src"],Ie=f(()=>r("span",null," 展开飞机 ",-1)),qe=f(()=>r("div",{class:"footerBorder"},null,-1)),Xe=["src"],Je=f(()=>r("span",null," 恢复飞机 ",-1)),Ke=f(()=>r("div",{class:"footerBorder"},null,-1)),Qe=["src"],je=f(()=>r("span",null," 粒子特效 ",-1)),Ye=f(()=>r("div",{class:"footerBorder"},null,-1)),Ze=["src"],$e=f(()=>r("span",null," 粒子爆炸 ",-1)),et=f(()=>r("div",{class:"footerBorder"},null,-1)),tt=["src"],nt=f(()=>r("span",null," 粒子复原 ",-1)),st=f(()=>r("div",{class:"footerBorder"},null,-1)),it={__name:"BigScreenFactory",setup(l){let t=new URL("/assets/bar-LCN0kkKR.svg",import.meta.url).href,s=D(null);p.on("spriteClick",o=>{s.value=o.i});const a=()=>{p.emit("flatFighter")},c=()=>{p.emit("recoverFighter")},h=()=>{p.emit("pointsFighter")},v=()=>{p.emit("pointsBlast")},u=()=>{p.emit("pointsBack")};return(o,d)=>(F(),R("div",He,[ze,r("div",Ue,[r("div",Ve,[r("div",{class:"cityEvent",onClick:a},[r("h3",null,[r("img",{class:"icon",src:B(t),alt:""},null,8,Ne),Ie]),qe]),r("div",{class:"cityEvent",onClick:c},[r("h3",null,[r("img",{class:"icon",src:B(t),alt:""},null,8,Xe),Je]),Ke]),r("div",{class:"cityEvent",onClick:h},[r("h3",null,[r("img",{class:"icon",src:B(t),alt:""},null,8,Qe),je]),Ye]),r("div",{class:"cityEvent",onClick:v},[r("h3",null,[r("img",{class:"icon",src:B(t),alt:""},null,8,Ze),$e]),et]),r("div",{class:"cityEvent",onClick:u},[r("h3",null,[r("img",{class:"icon",src:B(t),alt:""},null,8,tt),nt]),st])])])]))}},rt=_e(it,[["__scopeId","data-v-11aaa50a"]]),ft={__name:"Factory",setup(l){return(t,s)=>(F(),R("div",null,[U(We),U(rt)]))}};export{ft as default};
