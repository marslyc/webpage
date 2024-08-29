<!--
 * @Description: 
 * @Author: yuchao
 * @Date: 2024-07-23 15:41:49
 * @LastEditors: yuchao
 * @LastEditTime: 2024-07-29 14:54:46
-->

<template>
  <div id='box1'></div>
  <!-- <button @click="fullScreen">全屏</button> -->
  <!-- <button @click="exitfullScreen">退出全屏</button> -->
</template>

<script setup>
import * as THREE from 'three'
// 导入轨道控制器
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
// 监听设置
import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min.js'
import { onMounted } from 'vue'
// 动画库
import { gsap } from 'gsap'
import { RGBELoader } from 'three/examples/jsm/Addons.js'

// import meshsset from "./components/meshset"
import pointset from "./components/pointset"
// 创建场景
const scene = new THREE.Scene()

// 创建 透视相机
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth/window.innerHeight,
  0.1,
  1000
)
camera.position.set(0, 0, 10);
// camera.position.z = 3
// camera.position.y = 1
// camera.position.x = 1

camera.lookAt(0,0,0)

// 创建渲染器
const renderer = new THREE.WebGLRenderer()
// 渲染器大小
renderer.setSize(window.innerWidth,window.innerHeight)

// 开启场景中的阴影贴图
renderer.shadowMap.enabled = true;
renderer.physicallyCorrectLights = true;

// 将渲染器添加到页面
onMounted(()=> {
document.getElementById('box1').appendChild(renderer.domElement)
})

// 坐标辅助器 
const axesHelper = new THREE.AxesHelper(5)
scene.add(axesHelper)

//  轨道控制器，滑动，缩放
const controls = new OrbitControls(camera,renderer.domElement)
// 设置控制器的惯性
controls.enableDamping = true
// 设置阻尼系数
controls.dampingFactor = 0.1
// 设置控制器的自动旋转
// controls.autoRotate = true
// 设置控制器的自动旋转速度
// controls.autoRotateSpeed = 0.5


let sphereGeometry = new THREE.SphereGeometry(3, 30, 30)
let pointsMaterial = new THREE.PointsMaterial()
pointsMaterial.size = 0.1
pointsMaterial.color.set(0xfff000)
// 相机深度而衰减
pointsMaterial.sizeAttenuation = true;

  // 载入纹理
const textureLoader = new THREE.TextureLoader();
let textureSrc = new URL('./images/textures/particles/1.png',import.meta.url).href
const texture = textureLoader.load(textureSrc);
// // 设置点材质纹理
pointsMaterial.map = texture;
// pointsMaterial.alphaMap = texture;
// pointsMaterial.transparent = true;
// pointsMaterial.depthWrite = false;
// pointsMaterial.blending = THREE.AdditiveBlending;

const cube = new THREE.Points(sphereGeometry, pointsMaterial);
// const cube = pointset()
// const cube = meshsset()
// cube.position.x = 1
// // 位置
// cube.position.set(1,0,0)
// // 放大比例
// cube.scale.set(2,2,2)
// 旋转
// cube.rotation.set(0,0,Math.PI/4)
// cube.rotation.x = Math.PI/4

// cube.position.set(0, -1, 0);
// cube.rotation.x = -Math.PI / 2;
// // 接收阴影
// cube.receiveShadow = true;
  // 投射阴影
  // cube.castShadow = true;
// 网格添加到场景
scene.add(cube)

// renderer.render(scene,camera)

// 灯光
// 环境光
let light = new THREE.AmbientLight(0xffffff, 0.5) // soft white light
scene.add(light)




window.addEventListener('resize', ()=> {
  // 更新渲染器
  renderer.setSize(window.innerWidth,window.innerHeight)

  // 设置渲染器的像素比
  renderer.setPixelRatio(window.devicePixelRatio)
  // 重置相机宽高比
  camera.aspect = window.innerWidth/window.innerHeight
  // 更新相机投影矩阵
  camera.updateProjectionMatrix()
})


// 设置时钟
// let clock = new THREE.Clock()


// 渲染循环
function animate() { 
  // 时钟，一直在运行
  // let time = clock.getElapsedTime()

  // 两次时间间隔
  // let deltaTime = clock.getDelta()

  // let t = time % 5;
  // cube.position.x = t * 1;

  requestAnimationFrame(animate); 
  // 添加立方体的旋转动画
  // cube.rotation.x += 0.01; 
  // cube.rotation.y += 0.01;
  
  controls.update();
  renderer.render(scene, camera); 
} 
animate();

</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}
</style>
