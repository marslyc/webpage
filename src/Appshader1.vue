

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

import * as CANNON from 'cannon-es'

// import basicVertaxShader from './components/shader/basic/vertex.glsl'
// import basicVertaxShader from './components/shader/raw/vertex.glsl'
import basicVertaxShader from './components/shader/deep/vertex.glsl'
// import basicFragmentShader from './components/shader/basic/fragment.glsl'
// import basicFragmentShader from './components/shader/raw/fragment.glsl'
import basicFragmentShader from './components/shader/deep/fragment.glsl'
// const gui = new GUI()
// 1、创建场景
const scene = new THREE.Scene();

// 2、创建相机
const camera = new THREE.PerspectiveCamera(
  90,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

// 设置相机位置
camera.position.set(0, 0, 2);
scene.add(camera);



// 创建平面
// let floorMaterial = new THREE.MeshBasicMaterial({color: "#00ffff"})
// 着色器
// let shaderMaterial = new THREE.ShaderMaterial({
//   // 顶点着色器
//   vertexShader: basicVertaxShader,
//   // 片元着色器
//   fragmentShader: basicFragmentShader
// })

// 图片
let flagSrc = new URL('./images/ca.jpeg',import.meta.url).href

let params = {
  uScale: 0.1,
  uFrequency:10
}
// 创建原始着色器材质
let shaderMaterial = new THREE.RawShaderMaterial({
  // 顶点着色器
  vertexShader: basicVertaxShader,
  // 片元着色器
  fragmentShader: basicFragmentShader,
  // wireframe: true,
  side: THREE.DoubleSide,
  transparent: true,
  uniforms: {
    uColor: {
      value: new THREE.Color("purple"),
    },
    // 波浪的频率
    uFrequency: {
      value: params.uFrequency,
    },
    // 波浪的幅度
    uScale: {
      value: params.uScale,
    },
    uTime: {
      value: 0
    },
    uFlag: {
      value: new THREE.TextureLoader().load(flagSrc)
    }
  }
})


// gui
//   .add(params, "uFrequency")
//   .min(0)
//   .max(50)
//   .step(0.1)
//   .onChange((value) => {
//     shaderMaterial.uniforms.uFrequency.value = value;
//   });
// gui
//   .add(params, "uScale")
//   .min(0)
//   .max(1)
//   .step(0.01)
//   .onChange((value) => {
//     shaderMaterial.uniforms.uScale.value = value;
//   });


let floor = new THREE.Mesh(
  new THREE.PlaneGeometry(1,1,64,64),
  // floorMaterial
  shaderMaterial
)

// floor.rotation.x = Math.PI / 2
// floor.position.set(0,-5,0)
floor.receiveShadow = true
scene.add(floor)




// 灯光
// 环境光
let ambientLight  = new THREE.AmbientLight(0xffffff, 0.5)
scene.add(ambientLight)
// 平行光
let directionaLight = new THREE.DirectionalLight(0xffffff, 0.5)
// 阴影
directionaLight.castShadow = true
scene.add(directionaLight)


// 初始化渲染器
const renderer = new THREE.WebGLRenderer({
  alpha: true,
});
// 设置渲染的尺寸大小{}
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true

// console.log(renderer);
// 将webgl渲染的canvas内容添加到body
document.body.appendChild(renderer.domElement);

// // 使用渲染器，通过相机将场景渲染进来
// renderer.render(scene, camera);

// 创建轨道控制器
const controls = new OrbitControls(camera, renderer.domElement);
// 设置控制器阻尼，让控制器更有真实效果,必须在动画循环里调用.update()。
controls.enableDamping = true;

// 添加坐标轴辅助器
const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);
// 设置时钟
const clock = new THREE.Clock();


function render() {
  let time = clock.getElapsedTime();
  // 两帧之间的时间差
  // let deltaTime = clock.getDelta();
  shaderMaterial.uniforms.uTime.value = time
  controls.update();
  renderer.render(scene, camera);
  //   渲染下一帧的时候就会调用render函数
  requestAnimationFrame(render);
}

render();



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


</script>

<style>

* {
  margin: 0;
  padding: 0;
}
body {
  background-color: rgb(36, 58, 66);
}


</style>
