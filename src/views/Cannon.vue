<template>
    <div id="bone" ref="cannonScene"></div>
</template>

<script setup>
// import renderer from '@/components/Cannon.js'
import { onMounted, reactive, ref, onBeforeUnmount } from 'vue';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

import gsap from 'gsap';

import * as CANNON from 'cannon-es'
import CannonDebug from 'cannon-es-debugger'

// 左侧菜单宽度
let leftMenuWIdth = document.querySelector('.left-menu').offsetWidth || 180 

let cWidth =  window.innerWidth - leftMenuWIdth
let cHeight = window.innerHeight

// 目标：认识pointes
let cannonScene = ref(null)
// 1、创建场景
const scene = new THREE.Scene();

// 2、创建相机
const camera = new THREE.PerspectiveCamera(
  75,
  cWidth / cHeight,
  0.1,
  300
);

// 设置相机位置
camera.position.set(0, 0, 18);
scene.add(camera);

let cubeArr = []
let cubeWorldMaterial = new CANNON.Material("cube")
function createCube() {
    // 创建立方体
    let cubeGeomentry = new THREE.BoxGeometry(1,1,1)
    let cubeMaterial = new THREE.MeshStandardMaterial()
    let cube = new THREE.Mesh(cubeGeomentry,cubeMaterial)
    cube.castShadow = true
    scene.add(cube)
  
    
    // 创建物理小球形状
    let cubeShape = new CANNON.Box(new CANNON.Vec3(0.5,0.5,0.5))
    // let cubeWorldMaterial = new CANNON.Material("cube")
  
    // 创建物理世界的物体
    let cubeBody = new CANNON.Body({
      // 形状
      shape: cubeShape,
      // 位置
      position: new CANNON.Vec3(0,0,0),
      // 质量
      mass: 1,
      // 材质
      material: cubeWorldMaterial
    })
    world.addBody(cubeBody)
    // 添加外力
    cubeBody.applyLocalForce(
      new CANNON.Vec3(300,0,0), //添加的力的大小和方向
      new CANNON.Vec3(0,0,0) //施加的力所在的位置
    
    )
  
    // 添加监听碰撞事件
    // function HitEvent(e) {
    //   // 获取碰撞的强度
    //   let impactStrength = e.contact.getImpactVelocityAlongNormal()
    //   //  hitSound.play()
    //   if (impactStrength > 2) {
    //     //   重新从零开始播放
    //     hitSound.currentTime = 0;
    //     hitSound.volume = impactStrength / 12;
  
    //     hitSound.play();
    //   }
    // }
    // cubeBody.addEventListener('collide',HitEvent)
  
    cubeArr.push({
      mesh: cube,
      body: cubeBody
    })
  }
  
  // 
  window.addEventListener("click", createCube);

// 创建球
let sphereGeomentry = new THREE.SphereGeometry(1,20,20)
let sphereMaterial = new THREE.MeshStandardMaterial()
let sphere = new THREE.Mesh(sphereGeomentry,sphereMaterial)
sphere.castShadow = true
scene.add(sphere)

// 创建平面
let floor = new THREE.Mesh(
  new THREE.PlaneGeometry(20,20),
  new THREE.MeshStandardMaterial({
    side:THREE.DoubleSide
  })
)

floor.rotation.x = Math.PI / 2
floor.position.set(0,-5,0)
floor.receiveShadow = true
scene.add(floor)


// 创建物理世界
let world= new CANNON.World()
world.gravity.set(0,-9.8,0)
// 创建物理小球形状
let sphereShape = new CANNON.Sphere(1)
let sphereWorldMaterial = new CANNON.Material("sphere")

// 创建物理世界的物体
let sphereBody = new CANNON.Body({
  // 形状
  shape: sphereShape,
  // 位置
  position: new CANNON.Vec3(0,0,0),
  // 质量
  mass: 1,
  // 材质
  material: sphereWorldMaterial
})
world.addBody(sphereBody)


// 创建击打声音
//  let mp3Src = new URL(`@/images/metalHit.mp3`,import.meta.url).href
// const hitSound = new Audio(mp3Src);
// // 添加监听碰撞事件
// function HitEvent(e) {
//    // 获取碰撞的强度
//    let impactStrength = e.contact.getImpactVelocityAlongNormal()
//   //  hitSound.play()
//   if (impactStrength > 2) {
//     //   重新从零开始播放
//     hitSound.currentTime = 0;
//     hitSound.play();
//   }
// }
// sphereBody.addEventListener('collide',HitEvent)



// 物理世界创建地面
let floorShape = new CANNON.Plane()
let floorBody = new CANNON.Body()
let floorMaterial = new CANNON.Material('floor')
floorBody.material = floorMaterial
// 设置质量
// 当质量为0的时候，可以使得物体保持不动
floorBody.mass = 0
// 添加图形
floorBody.addShape(floorShape)
floorBody.position.set(0,-5,0)
// 旋转地面的位置
floorBody.quaternion.setFromAxisAngle(new CANNON.Vec3(1,0,0), -Math.PI / 2)
world.addBody(floorBody)


// 设置2种材质碰撞的参数
const defaultContactMaterial = new CANNON.ContactMaterial(
  // sphereMaterial,
  sphereWorldMaterial,
  floorMaterial,
  {
    //   摩擦力
    friction: 0.1,
    // 弹性
    restitution: 0.7,
  }
);

// 讲材料的关联设置添加的物理世界
world.addContactMaterial(defaultContactMaterial);

// 设置碰撞默认材料，
world.defaultContactMaterial = defaultContactMaterial

let cannonDebug = new CannonDebug(scene, world)

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
renderer.setSize(cWidth, cHeight);
renderer.shadowMap.enabled = true


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
  // 两帧之间的时间差
  let deltaTime = clock.getDelta();
  // 更新物理引擎里世界的物体
  world.step( 1 / 120, deltaTime)
  // 将物理世界的位置复制到three的物体上
  sphere.position.copy(sphereBody.position)

  cannonDebug.update()
  // 将物理世界的位置复制到three的物体上
  cubeArr.forEach(item=> {
    item.mesh.position.copy(item.body.position)
    item.mesh.quaternion.copy(item.body.quaternion)
  })

  controls.update();
  renderer.render(scene, camera);
  //   渲染下一帧的时候就会调用render函数
  requestAnimationFrame(render);
}

render();


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
window.addEventListener("resize", resize);
  


onMounted(() => {
    cannonScene.value.appendChild(renderer.domElement)
})
onBeforeUnmount(()=> {
  window.removeEventListener("resize", resize);
  window.removeEventListener("click", createCube);
})



</script>