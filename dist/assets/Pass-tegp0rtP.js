import{ae as H,M as O,B as Q,Y as S,f as b,a4 as W,V as R,a2 as N,a3 as G,af as V,l as P,a as T,S as J,r as q,T as K,C as I,q as X,W as Y,s as Z,v as $}from"./three.module-BUZdne6h.js";import{O as ee}from"./OrbitControls-UBkTBaol.js";import{g as te}from"./lil-gui.module.min-Bc0DeA9g.js";import{G as se}from"./GLTFLoader-DwfIB8W0.js";import{r as ie,o as re,c as ae,a as oe}from"./index-CvBKhgFj.js";class p{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}}const ne=new H(-1,1,1,-1,0,1);class le extends Q{constructor(){super(),this.setAttribute("position",new S([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new S([0,2,0,0,2,0],2))}}const he=new le;class fe{constructor(e){this._mesh=new O(he,e)}dispose(){this._mesh.geometry.dispose()}render(e){e.render(this._mesh,ne)}get material(){return this._mesh.material}set material(e){this._mesh.material=e}}const ce={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform float opacity;

		uniform sampler2D tDiffuse;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );
			gl_FragColor = opacity * texel;


		}`};class v extends p{constructor(e,t){super(),this.textureID=t!==void 0?t:"tDiffuse",e instanceof b?(this.uniforms=e.uniforms,this.material=e):e&&(this.uniforms=W.clone(e.uniforms),this.material=new b({name:e.name!==void 0?e.name:"unspecified",defines:Object.assign({},e.defines),uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader})),this.fsQuad=new fe(this.material)}render(e,t,r){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=r.texture),this.fsQuad.material=this.material,this.renderToScreen?(e.setRenderTarget(null),this.fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this.fsQuad.render(e))}dispose(){this.material.dispose(),this.fsQuad.dispose()}}class L extends p{constructor(e,t){super(),this.scene=e,this.camera=t,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(e,t,r){const i=e.getContext(),s=e.state;s.buffers.color.setMask(!1),s.buffers.depth.setMask(!1),s.buffers.color.setLocked(!0),s.buffers.depth.setLocked(!0);let a,o;this.inverse?(a=0,o=1):(a=1,o=0),s.buffers.stencil.setTest(!0),s.buffers.stencil.setOp(i.REPLACE,i.REPLACE,i.REPLACE),s.buffers.stencil.setFunc(i.ALWAYS,a,4294967295),s.buffers.stencil.setClear(o),s.buffers.stencil.setLocked(!0),e.setRenderTarget(r),this.clear&&e.clear(),e.render(this.scene,this.camera),e.setRenderTarget(t),this.clear&&e.clear(),e.render(this.scene,this.camera),s.buffers.color.setLocked(!1),s.buffers.depth.setLocked(!1),s.buffers.color.setMask(!0),s.buffers.depth.setMask(!0),s.buffers.stencil.setLocked(!1),s.buffers.stencil.setFunc(i.EQUAL,1,4294967295),s.buffers.stencil.setOp(i.KEEP,i.KEEP,i.KEEP),s.buffers.stencil.setLocked(!0)}}class ue extends p{constructor(){super(),this.needsSwap=!1}render(e){e.state.buffers.stencil.setLocked(!1),e.state.buffers.stencil.setTest(!1)}}class de{constructor(e,t){if(this.renderer=e,this._pixelRatio=e.getPixelRatio(),t===void 0){const r=e.getSize(new R);this._width=r.width,this._height=r.height,t=new N(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:G}),t.texture.name="EffectComposer.rt1"}else this._width=t.width,this._height=t.height;this.renderTarget1=t,this.renderTarget2=t.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new v(ce),this.copyPass.material.blending=V,this.clock=new P}swapBuffers(){const e=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=e}addPass(e){this.passes.push(e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(e,t){this.passes.splice(t,0,e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(e){const t=this.passes.indexOf(e);t!==-1&&this.passes.splice(t,1)}isLastEnabledPass(e){for(let t=e+1;t<this.passes.length;t++)if(this.passes[t].enabled)return!1;return!0}render(e){e===void 0&&(e=this.clock.getDelta());const t=this.renderer.getRenderTarget();let r=!1;for(let i=0,s=this.passes.length;i<s;i++){const a=this.passes[i];if(a.enabled!==!1){if(a.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(i),a.render(this.renderer,this.writeBuffer,this.readBuffer,e,r),a.needsSwap){if(r){const o=this.renderer.getContext(),u=this.renderer.state.buffers.stencil;u.setFunc(o.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,e),u.setFunc(o.EQUAL,1,4294967295)}this.swapBuffers()}L!==void 0&&(a instanceof L?r=!0:a instanceof ue&&(r=!1))}}this.renderer.setRenderTarget(t)}reset(e){if(e===void 0){const t=this.renderer.getSize(new R);this._pixelRatio=this.renderer.getPixelRatio(),this._width=t.width,this._height=t.height,e=this.renderTarget1.clone(),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=e,this.renderTarget2=e.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(e,t){this._width=e,this._height=t;const r=this._width*this._pixelRatio,i=this._height*this._pixelRatio;this.renderTarget1.setSize(r,i),this.renderTarget2.setSize(r,i);for(let s=0;s<this.passes.length;s++)this.passes[s].setSize(r,i)}setPixelRatio(e){this._pixelRatio=e,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}}class pe extends p{constructor(e,t,r=null,i=null,s=null){super(),this.scene=e,this.camera=t,this.overrideMaterial=r,this.clearColor=i,this.clearAlpha=s,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this._oldClearColor=new T}render(e,t,r){const i=e.autoClear;e.autoClear=!1;let s,a;this.overrideMaterial!==null&&(a=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(e.getClearColor(this._oldClearColor),e.setClearColor(this.clearColor,e.getClearAlpha())),this.clearAlpha!==null&&(s=e.getClearAlpha(),e.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&e.clearDepth(),e.setRenderTarget(this.renderToScreen?null:r),this.clear===!0&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),e.render(this.scene,this.camera),this.clearColor!==null&&e.setClearColor(this._oldClearColor),this.clearAlpha!==null&&e.setClearAlpha(s),this.overrideMaterial!==null&&(this.scene.overrideMaterial=a),e.autoClear=i}}const Se={__name:"Pass",setup(h){let e=ie();const t=new te,r=new J,i=new q(75,window.innerWidth/window.innerHeight,.1,50);i.position.set(0,0,10),r.add(i);let s=new URL("/assets/color-lrtiHrXO.jpg",import.meta.url).href,a=new URL("/assets/normal-CeJmrFHk.jpg",import.meta.url).href,o=new K;o.load(s),o.load(a);let u=new URL("/assets/DamagedHelmet-CG24Xl3p.gltf",import.meta.url).href;new se().load(u,n=>{let _=n.scene.children[0];r.add(_)});let M=new URL("/assets/px-B_mJEnHZ.jpg",import.meta.url).href,U=new URL("/assets/nx-B2jA2_bj.jpg",import.meta.url).href,D=new URL("/assets/py-BAJs89dn.jpg",import.meta.url).href,E=new URL("/assets/ny-Cwwt0CJa.jpg",import.meta.url).href,y=new URL("/assets/pz-CxN-nNoH.jpg",import.meta.url).href,A=new URL("/assets/nz-BR32y5g7.jpg",import.meta.url).href,w=new I().load([M,U,D,E,y,A]);r.background=w,r.environment=w;let m=new X("#ffffff",1);m.castShadow=!0,m.position.set(0,0,200),r.add(m);const l=new Y({});l.setSize(window.innerWidth,window.innerHeight),l.shadowMap.enabled=!0,l.toneMapping=Z,l.toneMappingExposure=1,re(()=>{e.value.appendChild(l.domElement)});const x=new ee(i,l.domElement);x.enableDamping=!0;const B=new $(5);r.add(B);let c=new de(l);c.setSize(window.innerWidth,window.innerHeight);let k=new pe(r,i);c.addPass(k);let f={r:0,g:0,b:0},d=new v({uniforms:{tDiffuse:{value:null},uColor:{value:new T(f.r,f.g,f.b)}},vertexShader:`
    varying vec2 vUv;

    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    
    }
  `,fragmentShader:`
    varying vec2 vUv;
    uniform sampler2D tDiffuse;
    uniform vec3 uColor;
    void main() {
      vec4 color = texture2D(tDiffuse, vUv);
      color.xyz += uColor;
      gl_FragColor = vec4(color);
      
      // gl_FragColor = vec4(vUv,0.0,1.0);
    }
  `});c.addPass(d),t.add(f,"r").min(-1).max(1).step(.01).onChange(n=>{d.uniforms.uColor.value.r=n}),t.add(f,"g").min(-1).max(1).step(.01).onChange(n=>{d.uniforms.uColor.value.g=n}),t.add(f,"b").min(-1).max(1).step(.01).onChange(n=>{d.uniforms.uColor.value.b=n});let z=new URL("/assets/interfaceNormalMap-COCmqaCQ.png",import.meta.url).href,F=o.load(z),g=new v({uniforms:{tDiffuse:{value:null},uNormalMap:{value:null},uTime:{value:0}},vertexShader:`
    varying vec2 vUv;

    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    
    }
  `,fragmentShader:`
    varying vec2 vUv;
    uniform sampler2D tDiffuse;
    uniform sampler2D uNormalMap;
    uniform float uTime;
    void main() {

      vec2 newUv = vUv;
      newUv += sin(newUv.x *10.0 + uTime*0.5) * 0.03;
      vec4 color = texture2D(tDiffuse, newUv);
      vec4 normalColor = texture2D(uNormalMap, vUv);
      // 设置光线的角度
      vec3 lightDirection = normalize(vec3(-5,5,2)) ;

      float lightness = clamp(dot(normalColor.xyz,lightDirection),0.0,1.0) ;
      color.xyz += lightness;
      // gl_FragColor = vec4(normalColor);
      gl_FragColor = vec4(color);
    }
  `});g.uniforms.uNormalMap.value=F,c.addPass(g),window.addEventListener("resize",()=>{i.aspect=window.innerWidth/window.innerHeight,i.updateProjectionMatrix(),l.setSize(window.innerWidth,window.innerHeight),l.setPixelRatio(window.devicePixelRatio)});const j=new P;function C(){let n=j.getElapsedTime();g.uniforms.uTime.value=n,x.update(),c.render(),requestAnimationFrame(C)}return C(),(n,_)=>(oe(),ae("div",{id:"box1",ref_key:"pass",ref:e},null,512))}};export{Se as default};
