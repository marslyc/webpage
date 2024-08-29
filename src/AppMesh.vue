<!--
 * @Description: 
 * @Author: yuchao
 * @Date: 2024-07-23 15:41:49
 * @LastEditors: yuchao
 * @LastEditTime: 2024-07-29 12:28:04
-->

<template>
  <div id='box1' ref="meshScene"></div>
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

import meshsset from "./components/meshset"
import { ref, onMounted } from 'vue'

let meshScene = ref()
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
  meshScene.value.appendChild(renderer.domElement)
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


// let textureLoader = new THREE.TextureLoader()
// let doorimgSrc = new URL('./images/textures/door/color.jpg',import.meta.url).href
// let minecraftSrc = new URL('./images/textures/minecraft.png',import.meta.url).href
// let doorColorTexture = textureLoader.load(doorimgSrc)
// let texture = textureLoader.load(minecraftSrc)
// // 材质
// // 循环多个三角形
// const geometry = new THREE.BoxGeometry(1,1,1)
// const material = new THREE.MeshBasicMaterial({
//     color: '#ffff00',
//     map: doorColorTexture
//     // map: texture
// })

// const geometry = new THREE.BoxGeometry(1,1,1)
// // 材质
// const material = new THREE.MeshBasicMaterial({color: 0x00ff00})


// 创建网格
// const cube = new THREE.Mesh(geometry,material)

// let rgbeLoader = new RGBELoader()
// let regeSrc = new URL('./images/textures/hdr/002.hdr',import.meta.url).href
// rgbeLoader.loadAsync(regeSrc).then((rege)=>{
//   rege.mapping = THREE.EquirectangularReflectionMapping
//   scene.background = rege
//   scene.environment = rege
// })

// 设置cube纹理加载器
// let cubeTextureLoader = new THREE.CubeTextureLoader()
// let envMapTexture = cubeTextureLoader.load([
//   new URL('./images/textures/environmentMaps/1/px.jpg',import.meta.url).href,
//   new URL('./images/textures/environmentMaps/1/nx.jpg',import.meta.url).href,
//   new URL('./images/textures/environmentMaps/1/py.jpg',import.meta.url).href,
//   new URL('./images/textures/environmentMaps/1/ny.jpg',import.meta.url).href,
//   new URL('./images/textures/environmentMaps/1/pz.jpg',import.meta.url).href,
//   new URL('./images/textures/environmentMaps/1/nz.jpg',import.meta.url).href,
// ])
// // 给场景添加背景
// scene.background = envMapTexture
// // 给场景所有的物体添加默认的环境贴图
// scene.environment = envMapTexture;

const planeGeometry = new THREE.PlaneGeometry(10,10);
const material = new THREE.MeshStandardMaterial();
const plane = new THREE.Mesh(planeGeometry, material);
plane.position.set(0, -1, 0);
plane.rotation.x = -Math.PI / 2;
// 接收阴影
plane.receiveShadow = true;
scene.add(plane);

const cube = meshsset()
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
  cube.castShadow = true;
// 网格添加到场景
scene.add(cube)

// renderer.render(scene,camera)

// 灯光
// 环境光
let light = new THREE.AmbientLight(0xffffff, 0.5) // soft white light
scene.add(light)
// // 直线光源
// let directionalLight = new THREE.DirectionalLight(0xffffff, 0.5)
// directionalLight.position.set(5, 5, 5);
// directionalLight.castShadow = true;
// // 设置阴影贴图模糊度
// directionalLight.shadow.radius = 20;
// // 设置阴影贴图的分辨率
// directionalLight.shadow.mapSize.set(4096, 4096);
// // console.log(directionalLight.shadow);

// // 设置平行光投射相机的属性
// directionalLight.shadow.camera.near = 0.5;
// directionalLight.shadow.camera.far = 500;
// directionalLight.shadow.camera.top = 5;
// directionalLight.shadow.camera.bottom = -5;
// directionalLight.shadow.camera.left = -5;
// directionalLight.shadow.camera.right = 5;
// scene.add(directionalLight)
// 聚光灯
// let spotLight = new THREE.SpotLight(0xffffff, 0.5)
// spotLight.position.set(5, 5, 5);
// spotLight.castShadow = true;
// spotLight.intensity = 2;

// // 设置阴影贴图模糊度
// spotLight.shadow.radius = 20;
// // 设置阴影贴图的分辨率
// spotLight.shadow.mapSize.set(512, 512);

// // console.log(directionalLight.shadow);
// spotLight.target = cube;
// spotLight.angle = Math.PI / 6;
// spotLight.distance = 0;
// spotLight.penumbra = 0;
// spotLight.decay = 0;

// scene.add(spotLight)




// 点光源
let pointLight = new THREE.PointLight(0xff0000, 1)
// pointLight.position.set(5, 5, 5);
pointLight.castShadow = true;

// 设置阴影贴图模糊度
pointLight.shadow.radius = 20;
// 设置阴影贴图的分辨率
pointLight.shadow.mapSize.set(512, 512);

// pointLight.distance = 0;
// pointLight.penumbra = 0;
pointLight.decay = 0;

scene.add(pointLight)

// 创建一个小球
let smallBall = new THREE.Mesh(
  new THREE.SphereGeometry(0.1,20,20),
  new THREE.MeshBasicMaterial({ color: 0xff0000 })
)
smallBall.position.set(2, 2, 2);
// 设置透视相机的属性
smallBall.add(pointLight);
scene.add(smallBall)


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

// 全屏
// const fullScreen = () => {
//   console.log('quan[ing ]')
//   // renderer.domElement.requestFullscreen()
//   document.body.requestFullscreen()
// }
// // 退出全屏
// const exitFullScreen = () => {
//   console.log('tuichuquanping')
//   document.exitFullscreen()
// }

const gui = new GUI()
let eventObj = {
  fullScreen: function() {
    document.body.requestFullscreen()
  },
  exitFullScreen: function() {
    document.exitFullscreen()
  }
}
gui.add(eventObj,'fullScreen').name('全屏')
gui.add(eventObj,'exitFullScreen')

// 位置
// gui.add(cube.position, 'x', -5, 5).name('x位置')
// gui.add(cube.position, 'y', -5, 5).step(1).name('y位置')
gui.add(cube.position, 'z')
.min(-5)
.max(5)
.step(1)
.name('z位置')
.onChange((value) => {
  console.log(value,cube.position)
})
.onFinishChange((value) => {
  console.log('fff',value,cube.position)
})

// // 组
// let folder = gui.addFolder('立方体位置')
// folder.add(cube.position, 'x', -5, 5).name('x位置')
// folder.add(cube.position, 'y', -5, 5).step(1).name('y位置')
// // folder.add(cube.position, 'z', -5, 5).step(1).name('z位置').onchange(() => {
// //   console.log(cube.position)
// // })

// gui.add(directionalLight.shadow.camera, 'near')
// .min(0)
// .max(10)
// .step(0.1)
// .name('光照强度')
// .onChange(() => {
//     directionalLight.shadow.camera.updateProjectionMatrix();
//   });


// gui
//   .add(spotLight, "angle")
//   .min(0)
//   .max(Math.PI / 2)
//   .step(0.01);
// gui.add(spotLight, "distance").min(0).max(10).step(0.01);
// gui.add(spotLight, "penumbra").min(0).max(1).step(0.01);
// gui.add(spotLight, "decay").min(0).max(5).step(0.01);

let colorParams = {
  cubeColor: '#ff0000',
  fn: () =>{
    // gsap 动画
    gsap.to(cube.position, {
      x: 3,
      duration: 2,
      yoyo: true,
      repeat: -1,
      // ease: 'power1.inOut'
    })
  }
}
gui.addColor(colorParams, 'cubeColor').onChange((value) => {

  cube.material.color.set(value)
})
let folder = gui.addFolder('设置立方体')
folder.add(cube.material,'wireframe') // 是否线框
folder.add(colorParams, 'fn').name('立方体运动')

// 设置动画
// var animate1 = gsap.to(cube.position, {
//   x: 5,
//   duration: 5,
//   ease: "power1.inOut",
//   //   设置重复的次数，无限次循环-1
//   repeat: -1,
//   //   往返运动
//   yoyo: true,
//   //   delay，延迟2秒运动
//   delay: 2,
//   onComplete: () => {
//     console.log("动画完成");
//   },
//   onStart: () => {
//     console.log("动画开始");
//   },
// });
// 初始化添加
// gsap.to(cube.rotation, { x: 2 * Math.PI, duration: 5, ease: "power1.inOut" });

// window.addEventListener("dblclick", () => {
//   //   console.log(animate1);
//   if (animate1.isActive()) {
//     //   暂停
//     animate1.pause();
//   } else {
//     //   恢复
//     animate1.resume();
//   }
// });

// 设置时钟
let clock = new THREE.Clock()


// 渲染循环
function animate() { 
  // 时钟，一直在运行
  let time = clock.getElapsedTime()
  smallBall.position.x = Math.sin(time) * 3;
  smallBall.position.z = Math.cos(time) * 3;
  smallBall.position.y = 2 + Math.sin(time * 10) / 2;
  // 两次时间间隔
  // let deltaTime = clock.getDelta()
  // console.log(deltaTime)
  // console.log(time,'time')
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
