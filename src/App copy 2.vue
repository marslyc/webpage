

<template>
  <div id='box1' ref="box1"></div>
  <!-- <button @click="fullScreen">全屏</button> -->
  <!-- <button @click="exitfullScreen">退出全屏</button> -->
</template>

<script setup>
import * as THREE from "three";
// 导入轨道控制器
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
// 导入动画库
import gsap from "gsap";

let box1 = ref()

// 1、创建场景
const scene = new THREE.Scene();

// 2、创建相机
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

// 设置相机位置
camera.position.set(0, 0, 10);
scene.add(camera);

// 创建球几何体
// const sphereGeometry = new THREE.SphereGeometry(3, 30, 30);
// const material = new THREE.MeshBasicMaterial({
//   color: 0xff0000,
//   wireframe: true,
// });
// const mesh = new THREE.Mesh(sphereGeometry, material);
// scene.add(mesh);
let params = {
  count: 10000,
  size: 0.1,
  radius: 5,
  branch: 10,
  color: '#ff6030',
  rotateScale: 0.3
}
let geometry = null
let material = null
let points = null
const centerColor = new THREE.Color(params.color);
const endColor = new THREE.Color(params.endColor);
let createPoints = () => {
  geometry = new THREE.BufferGeometry();

  // 设置缓冲区数组
  const positions = new Float32Array(params.count * 3);
  // 设置粒子顶点颜色
  const colors = new Float32Array(params.count * 3);
  // 设置顶点
  for (let i = 0; i < params.count; i++) {

    const branchAngel = (i % params.branch) * ((2 * Math.PI) / params.branch);
    // 当前点距离圆心的距离
    const distance = Math.random() * params.radius * Math.pow(Math.random(), 3);
    let current = i * 3

    const randomX =
      (Math.pow(Math.random() * 2 - 1, 3) * (params.radius - distance)) / 5;
    const randomY =
      (Math.pow(Math.random() * 2 - 1, 3) * (params.radius - distance)) / 5;
    const randomZ =
      (Math.pow(Math.random() * 2 - 1, 3) * (params.radius - distance)) / 5;
    positions[current] =
      Math.cos(branchAngel + distance * params.rotateScale) * distance * 0.8 +
      randomX;
    positions[current + 1] = 0 + randomY;
    positions[current + 2] =
      Math.sin(branchAngel + distance * params.rotateScale) * distance * 0.8 +
      randomZ;
    
    // 混合颜色，形成渐变色
    const mixColor = centerColor.clone();
    mixColor.lerp(endColor, distance / params.radius);

    colors[current] = mixColor.r;
    colors[current + 1] = mixColor.g;
    colors[current + 2] = mixColor.b;
  }
  geometry.setAttribute(
    "position",
    new THREE.BufferAttribute(positions, 3)
  );
  geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

 

  // 载入纹理
  const textureLoader = new THREE.TextureLoader();
  let textureSrc = new URL(`./images/textures/particles/1.png`,import.meta.url).href
  const texture = textureLoader.load(textureSrc);
  // // 设置点材质纹理
  // material.map = texture;
  // material.alphaMap = texture;
  // material.transparent = true;
  // material.depthWrite = false;
  // material.blending = THREE.AdditiveBlending;

  // 设置启动顶点颜色,否则颜色不生效
  // material.vertexColors = true;

   // 设置点材质
  material = new THREE.PointsMaterial({
    size: params.size,
    sizeAttenuation: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    map: texture,
    alphaMap: texture,
    transparent: true,
    vertexColors: true,
  });
  // pointsMaterial.size = 0.3;
  // pointsMaterial.color.set(0xfff000);
  // // 相机深度而衰减
  // pointsMaterial.sizeAttenuation = true;

  points = new THREE.Points(geometry, material);
  scene.add(points);
}

createPoints()
// let points2 = createPoints()
// let points3 = createPoints()

// 初始化渲染器
const renderer = new THREE.WebGLRenderer();
// 设置渲染的尺寸大小
renderer.setSize(window.innerWidth, window.innerHeight);
// 开启场景中的阴影贴图
renderer.shadowMap.enabled = true;
renderer.physicallyCorrectLights = true;


// 将webgl渲染的canvas内容添加到body
box1.appendChild(renderer.domElement);

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

  // points1.rotation.x = time * 0.3
  // points1.rotation.y = time * 0.5
  // points2.rotation.y = time * 0.5
  controls.update();
  renderer.render(scene, camera);
  //   渲染下一帧的时候就会调用render函数
  requestAnimationFrame(render);
}

render();

// 监听画面变化，更新渲染画面
window.addEventListener("resize", () => {

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

<style scoped>
* {
  margin: 0;
  padding: 0;
}
</style>
