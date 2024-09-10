

<template>
  <div id='box1' ref="house"></div>
</template>

<script setup>
import * as THREE from "three";
// 导入轨道控制器
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader";
import { onMounted, ref, onUnmounted } from "vue"; 
// 导入动画库
import gsap from "gsap";

// 左侧菜单宽度
let leftMenuWIdth = document.querySelector('.left-menu').offsetWidth || 180 

let cWidth =  window.innerWidth - leftMenuWIdth
let cHeight = window.innerHeight

let house = ref()
// 1、创建场景
const scene = new THREE.Scene();

// 2、创建相机
const camera = new THREE.PerspectiveCamera(
  75,
  cWidth / cHeight,
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


let lSrc = new URL('@/images/house/bedroom/20_l.jpg', import.meta.url).href
let rSrc = new URL('@/images/house/bedroom/20_r.jpg', import.meta.url).href

let uSrc = new URL('@/images/house/bedroom/20_u.jpg', import.meta.url).href
let dSrc = new URL('@/images/house/bedroom/20_d.jpg', import.meta.url).href

let bSrc = new URL('@/images/house/bedroom/20_b.jpg', import.meta.url).href
let fSrc = new URL('@/images/house/bedroom/20_f.jpg', import.meta.url).href


let lbSrc = new URL('@/images/house/bedroom/23_l.jpg', import.meta.url).href
let rbSrc = new URL('@/images/house/bedroom/23_r.jpg', import.meta.url).href
let ubSrc = new URL('@/images/house/bedroom/23_u.jpg', import.meta.url).href
let dbSrc = new URL('@/images/house/bedroom/23_d.jpg', import.meta.url).href
let bbSrc = new URL('@/images/house/bedroom/23_b.jpg', import.meta.url).href
let fbSrc = new URL('@/images/house/bedroom/23_f.jpg', import.meta.url).href


let textureLoader = new THREE.TextureLoader()

// 精灵图
let spriteMaterial;
let spriteSrc1 = new URL('@/images/house/enter.png', import.meta.url).href
let texture = textureLoader.load(spriteSrc1)
let spriteMaterial1 = new THREE.SpriteMaterial({
  map:texture
})


let spriteSrc2 = new URL('@/images/house/enter.png', import.meta.url).href
let stexture2 = textureLoader.load(spriteSrc2)
let spriteMaterial2 = new THREE.SpriteMaterial({
  map:stexture2,
  // transparent: true,
  // depthTest: false,
})

spriteMaterial = spriteMaterial1

let sprite = new THREE.Sprite(spriteMaterial)
sprite.position.set(15, 1, 20)
sprite.scale.set(2,2,2)

scene.add(sprite)


let materials = []
let materials1 = []

let maps = [lSrc, rSrc, uSrc,  dSrc, bSrc, fSrc]
maps.forEach((item,i)=> {
  let texture = textureLoader.load(item)
  if(i == 2 || i == 3) {
    texture.rotation = Math.PI
    texture.center = new THREE.Vector2(0.5, 0.5)
  }
  let material = new THREE.MeshBasicMaterial({
    map: texture,
    side: THREE.DoubleSide,
    transparent: true
  })
  materials1.push(material)
})

let materials2 = []
let mapsb = [lbSrc, rbSrc, ubSrc,  dbSrc, bbSrc, fbSrc]
mapsb.forEach((item,i)=> {
  let texture = textureLoader.load(item)
  if(i == 2 || i == 3) {
    texture.rotation = Math.PI
    texture.center = new THREE.Vector2(0.5, 0.5)
  }
  let material = new THREE.MeshBasicMaterial({
    map: texture,
    side: THREE.DoubleSide,
    transparent: true
  })
  materials2.push(material)
})


materials = materials1

let box = new THREE.Mesh(
  new THREE.BoxGeometry(60, 60, 60),
  materials
)
box.geometry.scale(1,1,-1)
scene.add(box)

// 左侧菜单宽度
// let leftMenuWIdth = document.querySelector('.left-menu').offsetWidth


let roomtype = 'room'
let raycaster = new THREE.Raycaster()
let mouse = new THREE.Vector2()

let clickHandler = (event)=> {
  // mouse.x = (event.clientX / window.innerWidth) * 2 - 1
  // 当有左侧菜单时
  mouse.x = ((event.clientX - leftMenuWIdth) / cWidth) * 2 - 1
  mouse.y = -(event.clientY / cHeight) * 2 + 1

  raycaster.setFromCamera(mouse, camera)
  let intersects = raycaster.intersectObject(sprite)
  if(intersects.length > 0) {

    if(roomtype == 'room') {
      box.material = materials2
      sprite.material = spriteMaterial2
      sprite.position.set(-25, 1, 2)
      roomtype = 'bedroom'
    } else if(roomtype == 'bedroom') {
      box.material = materials1
      sprite.material = spriteMaterial1
      sprite.position.set(15, 1, 20)
      roomtype = 'room'
    }
    
  }
}
window.addEventListener('click', clickHandler )


// let rSrc = new URL('@/images/house/Living.hdr', import.meta.url).href

// let shapeGeometry = new THREE.SphereGeometry(5, 32, 32)

// let loader = new RGBELoader()
// loader.load(rSrc,(texture)=> {
//   let material = new THREE.MeshBasicMaterial({
//     map: texture
//   })
//   let sphere = new THREE.Mesh(shapeGeometry,material)
//   sphere.geometry.scale(1, 1, -1);
//   scene.add(sphere)
// })




// 初始化渲染器
const renderer = new THREE.WebGLRenderer();
// 设置渲染的尺寸大小
renderer.setSize(cWidth, cHeight);
// 开启场景中的阴影贴图
renderer.shadowMap.enabled = true;
renderer.physicallyCorrectLights = true;

onMounted(() => {
  house.value.appendChild(renderer.domElement);
})


// // 使用渲染器，通过相机将场景渲染进来
// renderer.render(scene, camera);

// 创建轨道控制器
const controls = new OrbitControls(camera, renderer.domElement);
// 设置控制器阻尼，让控制器更有真实效果,必须在动画循环里调用.update()。
controls.enableDamping = true;

// 添加坐标轴辅助器
// const axesHelper = new THREE.AxesHelper(5);
// scene.add(axesHelper);
// 设置时钟
const clock = new THREE.Clock();

function render() {
  let time = clock.getElapsedTime();

  controls.update();
  renderer.render(scene, camera);
  //   渲染下一帧的时候就会调用render函数
  requestAnimationFrame(render);
}

render();
leftMenuWIdth = document.querySelector('.left-menu').offsetWidth || 180 
let resize = () => {
  cWidth = window.innerWidth - leftMenuWIdth
  cHeight = window.innerHeight
  // 更新摄像头
  camera.aspect = cWidth / cHeight;
  //   更新摄像机的投影矩阵
  camera.updateProjectionMatrix();

  //   更新渲染器
  renderer.setSize(cWidth, cHeight);
  //   设置渲染器的像素比
  renderer.setPixelRatio(window.devicePixelRatio);
}

// 监听画面变化，更新渲染画面
window.addEventListener("resize", resize);
onUnmounted(() => {
  window.removeEventListener("resize", resize)
  window.removeEventListener('click', clickHandler )
})


</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}
</style>
