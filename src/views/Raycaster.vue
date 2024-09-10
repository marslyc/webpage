

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
// 左侧菜单宽度
let leftMenuWIdth = document.querySelector('.left-menu').offsetWidth || 180 

let cWidth =  window.innerWidth - leftMenuWIdth
let cHeight = window.innerHeight

let raycasterScene = ref()
// 目标：认识pointes

// 1、创建场景
const scene = new THREE.Scene();

// 2、创建相机
const camera = new THREE.PerspectiveCamera(
  75,
  cWidth / cHeight,
  0.1,
  100
);

// 设置相机位置
camera.position.set(0, 0, 12);
scene.add(camera);


// 创建box
// let boxGeometry = new THREE.BoxGeometry(1,1,1)
let sphereGeometry = new THREE.SphereGeometry(0.5, 16, 16)

let material = new THREE.MeshPhongMaterial({
  // wireframe: true,
  color: 0xffffff
})
let redMaterial = new THREE.MeshBasicMaterial({
  color: '#ff0000'
})

let white = new THREE.Color(0xffffff)

let amount = 4
let count = Math.pow(amount, 3);
let meshs = new THREE.InstancedMesh(sphereGeometry,material, count)

let index = 0
let offset = (amount - 1) / 2
// 转换矩阵
let matrix = new THREE.Matrix4()

let cubeArr = [];
for(let i = 0;i< amount;i++) {
  for(let j = 0;j< amount;j++) {
    for(let z = 0;z< amount;z++) {
      matrix.setPosition( offset - i, offset - j , offset - z)  // -1.5 - 1.5

      meshs.setMatrixAt(index, matrix)
      meshs.setColorAt(index, white)
      index = index + 1
      // let cube = new THREE.Mesh(sphereGeometry,material)
      // cube.position.set(i + 0.5,j + 0.5,z +0.5)
      // scene.add(cube)
      // cubeArr.push(cube)
    }
  }
}
scene.add(meshs)


// 初始化渲染器
const renderer = new THREE.WebGLRenderer();
// 设置渲染的尺寸大小
renderer.setSize(cWidth, cHeight);
// 开启场景中的阴影贴图
renderer.shadowMap.enabled = true;
renderer.physicallyCorrectLights = true;


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


// 投射光线
let raycaster = new THREE.Raycaster()
let mouse = new THREE.Vector2()
let clickHandler = (event)=> {

  mouse.x = ((event.clientX- leftMenuWIdth) / cWidth) * 2 - 1
  mouse.y = -(event.clientY / cHeight) * 2 + 1
  raycaster.setFromCamera(mouse, camera)
  let result = raycaster.intersectObject(meshs)

  if(result[0]) {

    let instanceId = result[0].instanceId
    meshs.setColorAt(instanceId,new THREE.Color(0xff0000))
    meshs.instanceColor.needsUpdate = true
    // result[0].object.material = redMaterial
  }
  // result.forEach(item=> {
  //   item.object.material = redMaterial
  // })
}
window.addEventListener('click', clickHandler)
// renderer.setClearColor(0xeeeeee,0.5)
let resize = () => {
  cWidth =  window.innerWidth - leftMenuWIdth
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
