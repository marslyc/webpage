import{M as B,r as O,a as C,a0 as L,c as S,t as k,a1 as F,a2 as Q,a3 as X,f as z,a4 as j,Q as te,V as re,T as Y,a5 as ae,z as D,l as G,B as N,e as T,A as V,P as I,a6 as q,a7 as $,a8 as oe,S as ne,u as ie,g as le,W as se,s as ue}from"./three.module-BUZdne6h.js";import{O as ce}from"./OrbitControls-UBkTBaol.js";import{R as de}from"./RGBELoader-C_APSFo0.js";import{G as fe}from"./GLTFLoader-DwfIB8W0.js";import{r as me,o as pe,g as ve,c as he,a as we}from"./index-E0VyOJT8.js";class U extends B{constructor(u,e={}){super(u),this.isReflector=!0,this.type="Reflector",this.camera=new O;const a=this,_=e.color!==void 0?new C(e.color):new C(8355711),P=e.textureWidth||512,b=e.textureHeight||512,W=e.clipBias||0,c=e.shader||U.ReflectorShader,R=e.multisample!==void 0?e.multisample:4,n=new L,f=new S,o=new S,v=new S,g=new k,d=new S(0,0,-1),l=new F,m=new S,p=new S,t=new F,s=new k,r=this.camera,w=new Q(P,b,{samples:R,type:X}),x=new z({name:c.name!==void 0?c.name:"unspecified",uniforms:j.clone(c.uniforms),fragmentShader:c.fragmentShader,vertexShader:c.vertexShader});x.uniforms.tDiffuse.value=w.texture,x.uniforms.color.value=_,x.uniforms.textureMatrix.value=s,this.material=x,this.onBeforeRender=function(i,y,h){if(o.setFromMatrixPosition(a.matrixWorld),v.setFromMatrixPosition(h.matrixWorld),g.extractRotation(a.matrixWorld),f.set(0,0,1),f.applyMatrix4(g),m.subVectors(o,v),m.dot(f)>0)return;m.reflect(f).negate(),m.add(o),g.extractRotation(h.matrixWorld),d.set(0,0,-1),d.applyMatrix4(g),d.add(v),p.subVectors(o,d),p.reflect(f).negate(),p.add(o),r.position.copy(m),r.up.set(0,1,0),r.up.applyMatrix4(g),r.up.reflect(f),r.lookAt(p),r.far=h.far,r.updateMatrixWorld(),r.projectionMatrix.copy(h.projectionMatrix),s.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),s.multiply(r.projectionMatrix),s.multiply(r.matrixWorldInverse),s.multiply(a.matrixWorld),n.setFromNormalAndCoplanarPoint(f,o),n.applyMatrix4(r.matrixWorldInverse),l.set(n.normal.x,n.normal.y,n.normal.z,n.constant);const M=r.projectionMatrix;t.x=(Math.sign(l.x)+M.elements[8])/M.elements[0],t.y=(Math.sign(l.y)+M.elements[9])/M.elements[5],t.z=-1,t.w=(1+M.elements[10])/M.elements[14],l.multiplyScalar(2/l.dot(t)),M.elements[2]=l.x,M.elements[6]=l.y,M.elements[10]=l.z+1-W,M.elements[14]=l.w,a.visible=!1;const K=i.getRenderTarget(),Z=i.xr.enabled,ee=i.shadowMap.autoUpdate;i.xr.enabled=!1,i.shadowMap.autoUpdate=!1,i.setRenderTarget(w),i.state.buffers.depth.setMask(!0),i.autoClear===!1&&i.clear(),i.render(y,r),i.xr.enabled=Z,i.shadowMap.autoUpdate=ee,i.setRenderTarget(K);const H=h.viewport;H!==void 0&&i.state.viewport(H),a.visible=!0},this.getRenderTarget=function(){return w},this.dispose=function(){w.dispose(),a.material.dispose()}}}U.ReflectorShader={name:"ReflectorShader",uniforms:{color:{value:null},tDiffuse:{value:null},textureMatrix:{value:null}},vertexShader:`
		uniform mat4 textureMatrix;
		varying vec4 vUv;

		#include <common>
		#include <logdepthbuf_pars_vertex>

		void main() {

			vUv = textureMatrix * vec4( position, 1.0 );

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

			#include <logdepthbuf_vertex>

		}`,fragmentShader:`
		uniform vec3 color;
		uniform sampler2D tDiffuse;
		varying vec4 vUv;

		#include <logdepthbuf_pars_fragment>

		float blendOverlay( float base, float blend ) {

			return( base < 0.5 ? ( 2.0 * base * blend ) : ( 1.0 - 2.0 * ( 1.0 - base ) * ( 1.0 - blend ) ) );

		}

		vec3 blendOverlay( vec3 base, vec3 blend ) {

			return vec3( blendOverlay( base.r, blend.r ), blendOverlay( base.g, blend.g ), blendOverlay( base.b, blend.b ) );

		}

		void main() {

			#include <logdepthbuf_fragment>

			vec4 base = texture2DProj( tDiffuse, vUv );
			gl_FragColor = vec4( blendOverlay( base.rgb, color ), 1.0 );

			#include <tonemapping_fragment>
			#include <colorspace_fragment>

		}`};class A extends B{constructor(u,e={}){super(u),this.isRefractor=!0,this.type="Refractor",this.camera=new O;const a=this,_=e.color!==void 0?new C(e.color):new C(8355711),P=e.textureWidth||512,b=e.textureHeight||512,W=e.clipBias||0,c=e.shader||A.RefractorShader,R=e.multisample!==void 0?e.multisample:4,n=this.camera;n.matrixAutoUpdate=!1,n.userData.refractor=!0;const f=new L,o=new k,v=new Q(P,b,{samples:R,type:X});this.material=new z({name:c.name!==void 0?c.name:"unspecified",uniforms:j.clone(c.uniforms),vertexShader:c.vertexShader,fragmentShader:c.fragmentShader,transparent:!0}),this.material.uniforms.color.value=_,this.material.uniforms.tDiffuse.value=v.texture,this.material.uniforms.textureMatrix.value=o;const g=function(){const t=new S,s=new S,r=new k,w=new S,x=new S;return function(y){return t.setFromMatrixPosition(a.matrixWorld),s.setFromMatrixPosition(y.matrixWorld),w.subVectors(t,s),r.extractRotation(a.matrixWorld),x.set(0,0,1),x.applyMatrix4(r),w.dot(x)<0}}(),d=function(){const t=new S,s=new S,r=new te,w=new S;return function(){a.matrixWorld.decompose(s,r,w),t.set(0,0,1).applyQuaternion(r).normalize(),t.negate(),f.setFromNormalAndCoplanarPoint(t,s)}}(),l=function(){const t=new L,s=new F,r=new F;return function(x){n.matrixWorld.copy(x.matrixWorld),n.matrixWorldInverse.copy(n.matrixWorld).invert(),n.projectionMatrix.copy(x.projectionMatrix),n.far=x.far,t.copy(f),t.applyMatrix4(n.matrixWorldInverse),s.set(t.normal.x,t.normal.y,t.normal.z,t.constant);const i=n.projectionMatrix;r.x=(Math.sign(s.x)+i.elements[8])/i.elements[0],r.y=(Math.sign(s.y)+i.elements[9])/i.elements[5],r.z=-1,r.w=(1+i.elements[10])/i.elements[14],s.multiplyScalar(2/s.dot(r)),i.elements[2]=s.x,i.elements[6]=s.y,i.elements[10]=s.z+1-W,i.elements[14]=s.w}}();function m(t){o.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),o.multiply(t.projectionMatrix),o.multiply(t.matrixWorldInverse),o.multiply(a.matrixWorld)}function p(t,s,r){a.visible=!1;const w=t.getRenderTarget(),x=t.xr.enabled,i=t.shadowMap.autoUpdate;t.xr.enabled=!1,t.shadowMap.autoUpdate=!1,t.setRenderTarget(v),t.autoClear===!1&&t.clear(),t.render(s,n),t.xr.enabled=x,t.shadowMap.autoUpdate=i,t.setRenderTarget(w);const y=r.viewport;y!==void 0&&t.state.viewport(y),a.visible=!0}this.onBeforeRender=function(t,s,r){r.userData.refractor!==!0&&g(r)&&(d(),m(r),l(r),p(t,s,r))},this.getRenderTarget=function(){return v},this.dispose=function(){v.dispose(),a.material.dispose()}}}A.RefractorShader={name:"RefractorShader",uniforms:{color:{value:null},tDiffuse:{value:null},textureMatrix:{value:null}},vertexShader:`

		uniform mat4 textureMatrix;

		varying vec4 vUv;

		void main() {

			vUv = textureMatrix * vec4( position, 1.0 );
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform vec3 color;
		uniform sampler2D tDiffuse;

		varying vec4 vUv;

		float blendOverlay( float base, float blend ) {

			return( base < 0.5 ? ( 2.0 * base * blend ) : ( 1.0 - 2.0 * ( 1.0 - base ) * ( 1.0 - blend ) ) );

		}

		vec3 blendOverlay( vec3 base, vec3 blend ) {

			return vec3( blendOverlay( base.r, blend.r ), blendOverlay( base.g, blend.g ), blendOverlay( base.b, blend.b ) );

		}

		void main() {

			vec4 base = texture2DProj( tDiffuse, vUv );
			gl_FragColor = vec4( blendOverlay( base.rgb, color ), 1.0 );

			#include <tonemapping_fragment>
			#include <colorspace_fragment>

		}`};class E extends B{constructor(u,e={}){super(u),this.isWater=!0,this.type="Water";const a=this,_=e.color!==void 0?new C(e.color):new C(16777215),P=e.textureWidth!==void 0?e.textureWidth:512,b=e.textureHeight!==void 0?e.textureHeight:512,W=e.clipBias!==void 0?e.clipBias:0,c=e.flowDirection!==void 0?e.flowDirection:new re(1,0),R=e.flowSpeed!==void 0?e.flowSpeed:.03,n=e.reflectivity!==void 0?e.reflectivity:.02,f=e.scale!==void 0?e.scale:1,o=e.shader!==void 0?e.shader:E.WaterShader,v=new Y,g=e.flowMap||void 0,d=e.normalMap0||v.load("textures/water/Water_1_M_Normal.jpg"),l=e.normalMap1||v.load("textures/water/Water_2_M_Normal.jpg"),m=.15,p=m*.5,t=new k,s=new G;if(U===void 0){console.error("THREE.Water: Required component Reflector not found.");return}if(A===void 0){console.error("THREE.Water: Required component Refractor not found.");return}const r=new U(u,{textureWidth:P,textureHeight:b,clipBias:W}),w=new A(u,{textureWidth:P,textureHeight:b,clipBias:W});r.matrixAutoUpdate=!1,w.matrixAutoUpdate=!1,this.material=new z({name:o.name,uniforms:j.merge([ae.fog,o.uniforms]),vertexShader:o.vertexShader,fragmentShader:o.fragmentShader,transparent:!0,fog:!0}),g!==void 0?(this.material.defines.USE_FLOWMAP="",this.material.uniforms.tFlowMap={type:"t",value:g}):this.material.uniforms.flowDirection={type:"v2",value:c},d.wrapS=d.wrapT=D,l.wrapS=l.wrapT=D,this.material.uniforms.tReflectionMap.value=r.getRenderTarget().texture,this.material.uniforms.tRefractionMap.value=w.getRenderTarget().texture,this.material.uniforms.tNormalMap0.value=d,this.material.uniforms.tNormalMap1.value=l,this.material.uniforms.color.value=_,this.material.uniforms.reflectivity.value=n,this.material.uniforms.textureMatrix.value=t,this.material.uniforms.config.value.x=0,this.material.uniforms.config.value.y=p,this.material.uniforms.config.value.z=p,this.material.uniforms.config.value.w=f;function x(y){t.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),t.multiply(y.projectionMatrix),t.multiply(y.matrixWorldInverse),t.multiply(a.matrixWorld)}function i(){const y=s.getDelta(),h=a.material.uniforms.config;h.value.x+=R*y,h.value.y=h.value.x+p,h.value.x>=m?(h.value.x=0,h.value.y=p):h.value.y>=m&&(h.value.y=h.value.y-m)}this.onBeforeRender=function(y,h,M){x(M),i(),a.visible=!1,r.matrixWorld.copy(a.matrixWorld),w.matrixWorld.copy(a.matrixWorld),r.onBeforeRender(y,h,M),w.onBeforeRender(y,h,M),a.visible=!0}}}E.WaterShader={name:"WaterShader",uniforms:{color:{type:"c",value:null},reflectivity:{type:"f",value:0},tReflectionMap:{type:"t",value:null},tRefractionMap:{type:"t",value:null},tNormalMap0:{type:"t",value:null},tNormalMap1:{type:"t",value:null},textureMatrix:{type:"m4",value:null},config:{type:"v4",value:new F}},vertexShader:`

		#include <common>
		#include <fog_pars_vertex>
		#include <logdepthbuf_pars_vertex>

		uniform mat4 textureMatrix;

		varying vec4 vCoord;
		varying vec2 vUv;
		varying vec3 vToEye;

		void main() {

			vUv = uv;
			vCoord = textureMatrix * vec4( position, 1.0 );

			vec4 worldPosition = modelMatrix * vec4( position, 1.0 );
			vToEye = cameraPosition - worldPosition.xyz;

			vec4 mvPosition =  viewMatrix * worldPosition; // used in fog_vertex
			gl_Position = projectionMatrix * mvPosition;

			#include <logdepthbuf_vertex>
			#include <fog_vertex>

		}`,fragmentShader:`

		#include <common>
		#include <fog_pars_fragment>
		#include <logdepthbuf_pars_fragment>

		uniform sampler2D tReflectionMap;
		uniform sampler2D tRefractionMap;
		uniform sampler2D tNormalMap0;
		uniform sampler2D tNormalMap1;

		#ifdef USE_FLOWMAP
			uniform sampler2D tFlowMap;
		#else
			uniform vec2 flowDirection;
		#endif

		uniform vec3 color;
		uniform float reflectivity;
		uniform vec4 config;

		varying vec4 vCoord;
		varying vec2 vUv;
		varying vec3 vToEye;

		void main() {

			#include <logdepthbuf_fragment>

			float flowMapOffset0 = config.x;
			float flowMapOffset1 = config.y;
			float halfCycle = config.z;
			float scale = config.w;

			vec3 toEye = normalize( vToEye );

			// determine flow direction
			vec2 flow;
			#ifdef USE_FLOWMAP
				flow = texture2D( tFlowMap, vUv ).rg * 2.0 - 1.0;
			#else
				flow = flowDirection;
			#endif
			flow.x *= - 1.0;

			// sample normal maps (distort uvs with flowdata)
			vec4 normalColor0 = texture2D( tNormalMap0, ( vUv * scale ) + flow * flowMapOffset0 );
			vec4 normalColor1 = texture2D( tNormalMap1, ( vUv * scale ) + flow * flowMapOffset1 );

			// linear interpolate to get the final normal color
			float flowLerp = abs( halfCycle - flowMapOffset0 ) / halfCycle;
			vec4 normalColor = mix( normalColor0, normalColor1, flowLerp );

			// calculate normal vector
			vec3 normal = normalize( vec3( normalColor.r * 2.0 - 1.0, normalColor.b,  normalColor.g * 2.0 - 1.0 ) );

			// calculate the fresnel term to blend reflection and refraction maps
			float theta = max( dot( toEye, normal ), 0.0 );
			float reflectance = reflectivity + ( 1.0 - reflectivity ) * pow( ( 1.0 - theta ), 5.0 );

			// calculate final uv coords
			vec3 coord = vCoord.xyz / vCoord.w;
			vec2 uv = coord.xy + coord.z * normal.xz * 0.05;

			vec4 reflectColor = texture2D( tReflectionMap, vec2( 1.0 - uv.x, uv.y ) );
			vec4 refractColor = texture2D( tRefractionMap, uv );

			// multiply water color with the mix of both textures
			gl_FragColor = vec4( color, 1.0 ) * mix( refractColor, reflectColor, reflectance );

			#include <tonemapping_fragment>
			#include <colorspace_fragment>
			#include <fog_fragment>

		}`};const xe="/assets/pow1-BkBe1rSI.ogg",ge="/assets/pow2-1bKeuoO6.ogg",ye="/assets/pow3-DrP0a6Go.ogg",Me="/assets/pow4-Bw5YJinH.ogg";var be=`void main(){

    
    
    float distanceToCenter = distance(gl_PointCoord,vec2(0.5));
    float strength = distanceToCenter * 2.0;
    strength = 1.0 - strength;
    strength = pow(strength, 1.5);

    gl_FragColor = vec4(1.0, 1.0, 0.0, strength);
}`,Se=`attribute vec3 aStep;
uniform float uTime;
uniform float uSize;

void main(){
    vec4 modelPosition = modelMatrix * vec4( position, 1.0 ) ;
    modelPosition.xyz += aStep * uTime;

    vec4 viewPosition = viewMatrix * modelPosition ;
    gl_Position = projectionMatrix * viewPosition ;

    gl_PointSize = uSize ;
}`,_e=`uniform vec3 uColor;
void main(){

    
    
    float distanceToCenter = distance(gl_PointCoord,vec2(0.5));
    float strength = distanceToCenter * 2.0;
    strength = 1.0 - strength;
    strength = pow(strength, 1.5);

    gl_FragColor = vec4(uColor, strength);
}`,Pe=`attribute float aScale;
attribute vec3 aRandom;

uniform float uTime;
uniform float uSize;

void main(){
    vec4 modelPosition = modelMatrix * vec4( position, 1.0 ) ;

    
    modelPosition.xyz += aRandom * uTime * 10.0;

    vec4 viewPosition = viewMatrix * modelPosition ;
    gl_Position = projectionMatrix * viewPosition ;

    gl_PointSize = uSize * aScale - (uTime*20.0);
}`;class We{constructor(u,e,a={x:0,y:0,z:0}){this.color=new C(u),this.startGeometry=new N;let _=new Float32Array(3);_[0]=a.x,_[1]=a.y,_[2]=a.z,this.startGeometry.setAttribute("position",new T(_,3));let P=new Float32Array(3);P[0]=e.x-a.x,P[1]=e.y-a.y,P[2]=e.z-a.z,this.startGeometry.setAttribute("aStep",new T(P,3)),this.startMaterial=new z({vertexShader:Se,fragmentShader:be,transparent:!0,blending:V,depthWrite:!1,uniforms:{uTime:{value:0},uSize:{value:20},uColor:{value:this.color}}}),this.startPoint=new I(this.startGeometry,this.startMaterial),this.clock=new G,this.fireworkGeometry=new N,this.fireworkCount=180+Math.floor(Math.random()*180);let b=new Float32Array(this.fireworkCount*3),W=new Float32Array(this.fireworkCount),c=new Float32Array(this.fireworkCount*3);for(let o=0;o<this.fireworkCount;o++){b[o*3+0]=e.x,b[o*3+1]=e.y,b[o*3+2]=e.z,W[o]=Math.random();let v=Math.random()*2*Math.PI,g=Math.random()*2*Math.PI,d=Math.random();c[o*3+0]=d*Math.sin(v)+d*Math.sin(g),c[o*3+1]=d*Math.cos(v)+d*Math.cos(g),c[o*3+2]=d*Math.sin(v)+d*Math.cos(g)}this.fireworkGeometry.setAttribute("position",new T(b,3)),this.fireworkGeometry.setAttribute("aScale",new T(W,1)),this.fireworkGeometry.setAttribute("aRandom",new T(c,3)),this.fireworkMaterial=new z({uniforms:{uTime:{value:0},uSize:{value:0},uColor:{value:this.color}},transparent:!0,blending:V,depthWrite:!1,vertexShader:Pe,fragmentShader:_e}),this.fireworks=new I(this.fireworkGeometry,this.fireworkMaterial),this.linstener=new q,this.linstener1=new q,this.sound=new $(this.linstener),this.sendSound=new $(this.linstener1);let R=new URL(Object.assign({"../images/audio/pow1.ogg":xe,"../images/audio/pow2.ogg":ge,"../images/audio/pow3.ogg":ye,"../images/audio/pow4.ogg":Me})[`../images/audio/pow${Math.floor(Math.random()*4)+1}.ogg`],import.meta.url).href,n=new oe;n.load(R,o=>{this.sound.setBuffer(o),this.sound.setLoop(!1),this.sound.setVolume(1)});let f=new URL("/assets/send-5yaiuhZt.mp3",import.meta.url).href;n.load(f,o=>{this.sendSound.setBuffer(o),this.sendSound.setLoop(!1),this.sendSound.setVolume(1)})}addScene(u,e){u.add(this.startPoint),u.add(this.fireworks),this.scene=u}update(){let u=this.clock.getElapsedTime();if(u>.2&&u<1)!this.sendSound.isPlaying&&!this.sendSoundplay&&(this.sendSound.play(),this.sendSoundplay=!0),this.startMaterial.uniforms.uTime.value=u,this.startMaterial.uniforms.uSize.value=20;else if(u>.2){let e=u-1;if(this.startMaterial.uniforms.uSize.value=0,this.startPoint.clear(),this.startGeometry.dispose(),this.startMaterial.dispose(),!this.sound.isPlaying&&!this.play&&(this.sound.play(),this.play=!0),this.fireworkMaterial.uniforms.uSize.value=20,this.fireworkMaterial.uniforms.uTime.value=e,e>5)return this.fireworkMaterial.uniforms.uSize.value=0,this.fireworks.clear(),this.fireworkGeometry.dispose(),this.fireworkMaterial.dispose(),this.scene.remove(this.fireworks),this.scene.remove(this.startPoint),"remove"}}}const ze={__name:"Firework",setup(J){let u=me();const e=new ne,a=new O(90,window.innerWidth/window.innerHeight,.1,1e3);a.position.set(0,10,20),e.add(a);let _=new URL("/assets/2k-CzDr2HGN.hdr",import.meta.url).href;new de().loadAsync(_).then(l=>{l.mapping=ie,e.background=l,e.environment=l});let b=new URL("/assets/Water_1_M_Normal-DV-NIPW-.jpg",import.meta.url).href,W=new Y().load(b,l=>{l.wrapS=D,l.wrapT=D}),c=new URL("/assets/newyears_min-CuqMyziT.glb",import.meta.url).href;new fe().load(c,l=>{e.add(l.scene);let m=new le(100,100),p=new E(m,{scale:4,textureHeight:1024,textureWidth:1024,normalMap1:W});p.position.y=1,p.rotation.x=-Math.PI/2,e.add(p)});const n=new se({alpha:!0});n.setSize(window.innerWidth,window.innerHeight),n.outputEncoding=void 0,n.toneMapping=ue,n.toneMappingExposure=.4,pe(()=>{u.value.appendChild(n.domElement)});const f=new ce(a,n.domElement);f.enableDamping=!0,f.autoRotate=!0,f.autoRotateSpeed=.5;let o=[],v=()=>{let l=`hsl(${Math.floor(Math.random()*360)}, 100%, 80%)`,m={x:(Math.random()-.5)*40,z:(Math.random()-.5)*40,y:3+Math.random()*15},p=new We(l,m);p.addScene(e,a),o.push(p)};window.addEventListener("click",v),ve(()=>{window.removeEventListener("click",v)}),window.addEventListener("resize",()=>{a.aspect=window.innerWidth/window.innerHeight,a.updateProjectionMatrix(),n.setSize(window.innerWidth,window.innerHeight),n.setPixelRatio(window.devicePixelRatio)});const g=new G;function d(){g.getElapsedTime(),f.update(),o.forEach((l,m)=>{l.update()=="remove"&&o.splice(m,1)}),n.render(e,a),requestAnimationFrame(d)}return d(),(l,m)=>(we(),he("div",{id:"box1",ref_key:"fireWork",ref:u},null,512))}};export{ze as default};
