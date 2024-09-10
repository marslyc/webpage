

<template>
  <div id='box1' ref="raycasterScene"></div>
</template>

<script setup>
import * as THREE from "three";
// 导入轨道控制器
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
// 导入动画库
import gsap from "gsap";

import { ref ,onMounted, onBeforeUnmount } from 'vue'

let raycasterScene = ref()
// 目标：认识pointes

// 1、创建场景
const scene = new THREE.Scene();

// 2、创建相机
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  100
);

// 设置相机位置
camera.position.set(0, 0, 12);
scene.add(camera);


// 创建box
// let boxGeometry = new THREE.BoxGeometry(1,1,1)
let sphereGeometry = new THREE.SphereGeometry(0.5, 16, 16)

let material = new THREE.MeshStandardMaterial({
  // wireframe: true,
  color: '#ffffff'
})
let redMaterial = new THREE.MeshBasicMaterial({
  color: '#ff0000'
})
let cubeArr = [];
for(let i = -2;i< 2;i++) {
  for(let j = -2;j< 2;j++) {
    for(let z = -2;z< 2;z++) {
      let cube = new THREE.Mesh(sphereGeometry,material)
      cube.position.set(i + 0.5,j + 0.5,z +0.5)
      scene.add(cube)
      cubeArr.push(cube)
    }
  }
}


// 初始化渲染器
const renderer = new THREE.WebGLRenderer();
// 设置渲染的尺寸大小
renderer.setSize(window.innerWidth, window.innerHeight);
// 开启场景中的阴影贴图
renderer.shadowMap.enabled = true;
renderer.physicallyCorrectLights = true;

console.log(renderer.info,'rrr')

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
  // let time = clock.getElapsedTime();


  controls.update();
  renderer.render(scene, camera);
  //   渲染下一帧的时候就会调用render函数
  requestAnimationFrame(render);
}

render();

// 环境光
let ambientLight  = new THREE.AmbientLight(0xffffff, 0.5)
scene.add(ambientLight)
// 平行光
let directionaLight = new THREE.DirectionalLight('#ffffff', 1)
// 阴影
directionaLight.castShadow = true
directionaLight.position.set(0,0,200)
scene.add(directionaLight)

// 左侧菜单宽度
let leftMenuWIdth = document.querySelector('.left-menu').offsetWidth


// 投射光线
let raycaster = new THREE.Raycaster()
let mouse = new THREE.Vector2()

let clickHandler = (event)=> {
  mouse.x = ((event.clientX- leftMenuWIdth) / window.innerWidth) * 2 - 1
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1
  raycaster.setFromCamera(mouse, camera)
  let result = raycaster.intersectObjects(cubeArr)

  if(result[0]) {
    result[0].object.material = redMaterial
  }
  // result.forEach(item=> {
  //   item.object.material = redMaterial
  // })
}
window.addEventListener('click', clickHandler)
let resize = () => {
  // 更新摄像头
  camera.aspect = window.innerWidth / window.innerHeight;
  //   更新摄像机的投影矩阵
  camera.updateProjectionMatrix();

  //   更新渲染器
  renderer.setSize(window.innerWidth, window.innerHeight);
  //   设置渲染器的像素比
  renderer.setPixelRatio(window.devicePixelRatio);
}
// 监听画面变化，更新渲染画面
window.addEventListener("resize", resize);

onMounted(()=> {
  raycasterScene.value.appendChild(renderer.domElement);
})
onBeforeUnmount(()=> {
  window.removeEventListener("resize", resize);
  window.removeEventListener("click", clickHandler);
})

</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}
</style>
