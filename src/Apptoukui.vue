

<template>
  <div id='box1'>
  </div>
  <!-- <button @click="fullScreen">全屏</button> -->
  <!-- <button @click="exitfullScreen">退出全屏</button> -->
</template>

<script setup>
import * as THREE from "three";
// 导入轨道控制器
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
// 监听设置
import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min.js'
// 导入动画库
import gsap from "gsap";

import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

import basicVertaxShader from './components/shader/flylight/vertex.glsl'
import basicFragmentShader from './components/shader/flylight/fragment.glsl'

// 导入后期效果合成器
import {EffectComposer} from 'three/examples/jsm/postprocessing/EffectComposer';
import {RenderPass} from 'three/examples/jsm/postprocessing/RenderPass';
import {DotScreenPass} from 'three/examples/jsm/postprocessing/DotScreenPass';
import {SMAAPass} from 'three/examples/jsm/postprocessing/SMAAPass'
import {SSAARenderPass} from 'three/examples/jsm/postprocessing/SSAARenderPass'
import {GlitchPass} from 'three/examples/jsm/postprocessing/GlitchPass'
import {UnrealBloomPass} from 'three/examples/jsm/postprocessing/UnrealBloomPass'
import {ShaderPass} from 'three/examples/jsm/postprocessing/ShaderPass'


const gui = new GUI()
// 1、创建场景
const scene = new THREE.Scene();

// 2、创建相机
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  50
);

// 设置相机位置
camera.position.set(0, 0, 10);
scene.add(camera);





// 模型纹理
let mapSrc = new URL('./images/model/LeePerrySmith/color.jpg',import.meta.url).href
let normalSrc = new URL('./images/model/LeePerrySmith/normal.jpg',import.meta.url).href
let textureLoader= new THREE.TextureLoader()
let textureMap = textureLoader.load(mapSrc)
let textureNormal = textureLoader.load(normalSrc)


// let custUniform = {
//   uTime: {
//     value: 0
//   }
// }
// let material = new THREE.MeshStandardMaterial({
//   map: textureMap,
//   normalMap: textureNormal

// })
// material.onBeforeCompile = (shader) => {

//   shader.uniforms.uTime = custUniform.uTime

//   shader.vertexShader = shader.vertexShader.replace(
//     '#include <common>',
//     `
//     #include <common>
//     mat2 rotate2d(float _angle){
//       return mat2(cos(_angle),-sin(_angle),
//                   sin(_angle),cos(_angle));
//     }
//     uniform float uTime;
//     `
//   )
//   shader.vertexShader = shader.vertexShader.replace(
//     '#include <beginnormal_vertex>',
//     `
//     #include <beginnormal_vertex>
//     float angle = sin(position.y+uTime) *0.5;
//     // float angle = position.y *0.5;
//     mat2 rotateMatrix = rotate2d(angle);
    
//     objectNormal.xz = rotateMatrix * objectNormal.xz;
//     `
//   )
//   shader.vertexShader = shader.vertexShader.replace(
//     '#include <begin_vertex>',
//     `
//     #include <begin_vertex>
//     // float angle = PI;
//     // float angle = transformed.y *0.5;
//     // mat2 rotateMatrix = rotate2d(angle);
//     transformed.xz = rotateMatrix * transformed.xz;
//     `
//   )
 
// }

// 加载模型
let modelSrc = new URL('./images/model/DamagedHelmet/glTF/DamagedHelmet.gltf',import.meta.url).href

let gltfLoader = new GLTFLoader()
gltfLoader.load(modelSrc, (gltf)=> {

  let mesh = gltf.scene.children[0]
  // mesh.material = material
  // mesh.castShadow = true
  scene.add(mesh)
})


// 创建环境wenli
let e1Src = new URL('./images/textures/environmentMaps/0/px.jpg',import.meta.url).href
let e2Src = new URL('./images/textures/environmentMaps/0/nx.jpg',import.meta.url).href
let e3Src = new URL('./images/textures/environmentMaps/0/py.jpg',import.meta.url).href
let e4Src = new URL('./images/textures/environmentMaps/0/ny.jpg',import.meta.url).href
let e5Src = new URL('./images/textures/environmentMaps/0/pz.jpg',import.meta.url).href
let e6Src = new URL('./images/textures/environmentMaps/0/nz.jpg',import.meta.url).href
let cubeTextureLoader = new THREE.CubeTextureLoader()
let envMapTexture = cubeTextureLoader.load([
  e1Src,e2Src,e3Src,e4Src,e5Src,e6Src
])

scene.background = envMapTexture
scene.environment = envMapTexture

// 背景板
// let planeGeometry = new THREE.PlaneGeometry(20,20)
// let basicMaterial = new THREE.MeshStandardMaterial()
// let plane = new THREE.Mesh(planeGeometry,basicMaterial)
// plane.position.set(0,0,-6)
// plane.receiveShadow = true
// scene.add(plane)

// let planeGeometry = new THREE.PlaneGeometry(1,1,64,64)
// let basicMaterial = new THREE.MeshBasicMaterial({
//   color: 0x00ff00,
//   side: THREE.DoubleSide,
//   // transparent: true,
//   // opacity: 0.5

// })
// let basicUniform = {
//   uTime: {
//     value: 0
//   }
// }
// basicMaterial.onBeforeCompile =(shader, randerer)=> {
//   console.log(shader.vertexShader)
//   // console.log(shader.fragmentShader)
//   shader.uniforms.uTime = basicUniform.uTime

//   shader.vertexShader = shader.vertexShader.replace(
//     `#include <common>`,
//     `#include <common>
//       uniform float uTime;
//     `
//   )
//   shader.vertexShader = shader.vertexShader.replace(
//     '#include <begin_vertex>',
//     `
//     #include <begin_vertex>
//     transformed.x += sin(uTime) * 2.0;
//     transformed.z += cos(uTime) * 2.0;
//     `
//   )

// }
// let plane = new THREE.Mesh(planeGeometry,basicMaterial)

// scene.add(plane)


// 灯光
// 环境光
// let ambientLight  = new THREE.AmbientLight(0xffffff, 0.5)
// scene.add(ambientLight)
// 平行光
let directionaLight = new THREE.DirectionalLight('#ffffff', 1)
// 阴影
directionaLight.castShadow = true
directionaLight.position.set(0,0,200)
scene.add(directionaLight)


// 初始化渲染器
const renderer = new THREE.WebGLRenderer({
  // alpha: true,
});
// 设置渲染的尺寸大小{}
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true

renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1;

// renderer.outputEncoding = THREE.sRGBEncoding;
// renderer.toneMapping = THREE.ACESFilmicToneMapping;
// renderer.toneMapping = THREE.LinearToneMapping;
// renderer.toneMapping = THREE.ReinhardToneMapping;
// renderer.toneMapping = THREE.CineonToneMapping;
// renderer.toneMappingExposure = 0.4;

// console.log(renderer);
// 将webgl渲染的canvas内容添加到body
document.body.appendChild(renderer.domElement);

// // 使用渲染器，通过相机将场景渲染进来
// renderer.render(scene, camera);

// 创建轨道控制器
const controls = new OrbitControls(camera, renderer.domElement);
// 设置控制器阻尼，让控制器更有真实效果,必须在动画循环里调用.update()。
controls.enableDamping = true;

// 设置自动旋转
// controls.autoRotate = true;
// controls.autoRotateSpeed = 0.5;
// controls.maxPolarAngle = (Math.PI / 3) * 2;
// controls.minPolarAngle = (Math.PI / 3) * 2;

// 添加坐标轴辅助器
const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);


let effectComposer = new EffectComposer(renderer) 
effectComposer.setSize(window.innerWidth, window.innerHeight)


let renderPass = new RenderPass(scene,camera)
effectComposer.addPass(renderPass)


// 点效果
// let dotScreenPass = new DotScreenPass()
// dotScreenPass.enabled = false;
// effectComposer.addPass(dotScreenPass)
// 抗锯齿
// let sMAAPass = new SMAAPass()
// effectComposer.addPass(sMAAPass)


// let sSAARenderPass = new SSAARenderPass()
// effectComposer.addPass(sSAARenderPass)

// 发光效果
// const unrealBloomPass = new UnrealBloomPass();
// effectComposer.addPass(unrealBloomPass)
// // unrealBloomPass.exposure = 0.2
// unrealBloomPass.strength = 1;
// unrealBloomPass.radius = 0;
// unrealBloomPass.threshold = 1;
// gui.add(renderer,'toneMappingExposure').min(0).max(2).step(0.01)
// gui.add(unrealBloomPass,'strength').min(0).max(2).step(0.01)
// gui.add(unrealBloomPass,'radius').min(0).max(2).step(0.01)
// gui.add(unrealBloomPass,'threshold').min(0).max(2).step(0.01)

// 屏幕闪动
// const glitchPass = new GlitchPass();
// effectComposer.addPass(glitchPass)

let colorParams = {
  r: 0,
  g: 0,
  b: 0
}
let shaderpass= new ShaderPass({
  uniforms: {
    tDiffuse: {
      value: null
    },
    uColor: {
      value: new THREE.Color(colorParams.r,colorParams.g,colorParams.b)
    }
  },
  vertexShader: `
    varying vec2 vUv;

    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    
    }
  `,
  fragmentShader: `
    varying vec2 vUv;
    uniform sampler2D tDiffuse;
    uniform vec3 uColor;
    void main() {
      vec4 color = texture2D(tDiffuse, vUv);
      color.xyz += uColor;
      gl_FragColor = vec4(color);
      
      // gl_FragColor = vec4(vUv,0.0,1.0);
    }
  `,
  
})

effectComposer.addPass(shaderpass)
gui.add(colorParams,'r').min(-1).max(1).step(0.01).onChange((value)=>{
  shaderpass.uniforms.uColor.value.r = value;
});
gui.add(colorParams,'g').min(-1).max(1).step(0.01).onChange((value)=>{
  shaderpass.uniforms.uColor.value.g = value;
});
gui.add(colorParams,'b').min(-1).max(1).step(0.01).onChange((value)=>{
  shaderpass.uniforms.uColor.value.b = value;
});

let nSrc= new URL('./images/textures/interfaceNormalMap.png', import.meta.url).href;
let nTexture = textureLoader.load(nSrc);
let textpass= new ShaderPass({
  uniforms: {
    tDiffuse: {
      value: null
    },
    uNormalMap:{
      value:null
    },
    uTime:{
      value:0
    }
  },
  vertexShader: `
    varying vec2 vUv;

    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    
    }
  `,
  fragmentShader: `
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
  `,
  
})

textpass.uniforms.uNormalMap.value = nTexture;
effectComposer.addPass(textpass)



// 监听画面变化，更新渲染画面
window.addEventListener("resize", () => {
  //   console.log("画面变化了");
  // 更新摄像头
  camera.aspect = window.innerWidth / window.innerHeight;
  //   更新摄像机的投影矩阵
  camera.updateProjectionMatrix();

  //   更新渲染器
  renderer.setSize(window.innerWidth, window.innerHeight);
  //   设置渲染器的像素比
  renderer.setPixelRatio(window.devicePixelRatio);
});

// 设置时钟
const clock = new THREE.Clock();


function render() {
  let time = clock.getElapsedTime();
  // 两帧之间的时间差
  // let deltaTime = clock.getDelta();
  // basicUniform.uTime.value = time
  // custUniform.uTime.value = time
  textpass.uniforms.uTime.value  = time
  controls.update();

  // renderer.render(scene, camera);
  effectComposer.render()
  //   渲染下一帧的时候就会调用render函数
  requestAnimationFrame(render);
}

render();


</script>

<style>

* {
  margin: 0;
  padding: 0;
}



</style>
