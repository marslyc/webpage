

<template>
  <div id='box1' ref="wanderScene"></div>
</template>

<script setup>
import * as THREE from "three";
// 导入轨道控制器
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
// 导入动画库
import gsap from "gsap";

import { ref ,onMounted, onUnmounted } from 'vue'

let wanderScene = ref()

// 1、创建场景
const scene = new THREE.Scene();

// 2、创建相机
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  3000
);

// 设置相机位置
camera.position.set(0, 2, 10);
scene.add(camera);

// 创建球几何体
// const sphereGeometry = new THREE.SphereGeometry(3, 30, 30);
// const material = new THREE.MeshBasicMaterial({
//   color: 0xff0000,
//   wireframe: true,
// });
// const mesh = new THREE.Mesh(sphereGeometry, material);
// scene.add(mesh);

let planeGeometry = new THREE.PlaneGeometry(1000,1000)
let planeMaterial = new THREE.MeshStandardMaterial({
  color: 0xffffff
})
let plane = new THREE.Mesh(planeGeometry,planeMaterial)
plane.rotation.x = -Math.PI / 2
plane.receiveShadow = true
scene.add(plane)

// const planeGeometry = new THREE.PlaneGeometry( 200, 200, 32, 32 );
// const planeMaterial = new THREE.MeshStandardMaterial( { color: 0x00ff00 } )
// const plane = new THREE.Mesh( planeGeometry, planeMaterial );
// plane.receiveShadow = true;
// scene.add( plane );

let randomG = (min, max)=> {
  return Math.floor(Math.random() * (max - min)) + min
}

for (let i = 0; i < 100; i++) {
  let wid = randomG(2,5)
  let hei = randomG(2,5)
  let boxGeometry = new THREE.BoxGeometry(wid,wid,hei)
  let boxMaterial = new THREE.MeshStandardMaterial({
    color: 0xff0000
  })
  let box = new THREE.Mesh(boxGeometry,boxMaterial)
  box.position.set(randomG(-100,100),hei / 2,randomG(-100,100))
  box.castShadow = true
  scene.add(box)
}

let mixer
let gSrc = new URL('@/images//model/RobotExpressive.glb', import.meta.url).href

// let textureLoader = new THREE.TextureLoader()
// textureLoader.load(gSrc,(texture)=> {
//   texture.mapping = THREE.EquirectangularReflectionMapping
// 全部动画
let animationObj = {}
let player;

let gltfLoader = new GLTFLoader()
gltfLoader.load(gSrc,(gltf)=> {

  player = gltf.scene
  scene.add(gltf.scene)
  let animations = gltf.animations
  mixer = new THREE.AnimationMixer(gltf.scene)

  animations.forEach((animation,i)=> {

    let actions = mixer.clipAction(animation)

    animationObj[animation.name] = actions

    // if(animation.name == 'Running') {
    //   actions.play()
    // }
  })

  // 阴影
  player.traverse(chile=> {
    chile.castShadow = true
  })
})


// 初始化渲染器
const renderer = new THREE.WebGLRenderer();
// 设置渲染的尺寸大小
renderer.setSize(window.innerWidth, window.innerHeight);
// 开启场景中的阴影贴图
renderer.shadowMap.enabled = true;

renderer.physicallyCorrectLights = true;


// 创建轨道控制器
const controls = new OrbitControls(camera, renderer.domElement);
// 设置控制器阻尼，让控制器更有真实效果,必须在动画循环里调用.update()。
controls.enableDamping = true;

// 添加坐标轴辅助器
const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

let ambientLight  = new THREE.AmbientLight(0xffffff, 1)
scene.add(ambientLight)
// 平行光
let directionaLight = new THREE.DirectionalLight(0xffffff, 1)
// 阴影
directionaLight.castShadow = true;
directionaLight.position.set(50, 25, 10);
scene.add(directionaLight)

// 切换动作
// 当前动画
let currentAnimation = null
// 上一个动画
let preAnimation = null
let changeAnimation = (name, time= 0.2)=> {
  preAnimation = currentAnimation
  currentAnimation = animationObj[name]
  if(preAnimation != currentAnimation) {
    preAnimation && preAnimation.fadeOut(time)
    currentAnimation && currentAnimation.reset().fadeIn(time).play()
  }
}
// 是否在跳起
let isJumping = false
//  是否 AI跳舞
let isDanceing = false
let keyPressObj = {}
let updateAnimation = ()=> {
  if(isDanceing) return
  if(isJumping) return
  if(keyPressObj['keyw'] && keyPressObj['shiftleft'] ||
    keyPressObj['keya'] && keyPressObj['shiftleft']  ||
    keyPressObj['keys'] && keyPressObj['shiftleft']  ||
    keyPressObj['keyd'] && keyPressObj['shiftleft']  
  ){
    changeAnimation('Running')
  }else if (keyPressObj['keyw'] ||
    keyPressObj['keya'] ||
    keyPressObj['keys'] ||
    keyPressObj['keyd'] 
  ){
    changeAnimation('Walking')
  } else {
    changeAnimation('Idle')
    // changeAnimation('Dance')
    
  }
}
let animateDuration = (name)=> {
  let action = animationObj[name]
  let clip = action.getClip()
  if(action && clip) {
    return clip.duration;
  }
  return 0
}

window.addEventListener('keydown', (event)=> {

  let key = event.code.toLocaleLowerCase()
  if(key == 'space' && !isJumping) {
    isJumping = true
    changeAnimation('Jump')
  }
  if(key == 'keyj' && !isDanceing) {
    isDanceing = true
    changeAnimation('Dance')
  }
  if(key == 'keyk' && isDanceing) {
    isDanceing = false
  }
  keyPressObj[key] = true
  
})
window.addEventListener('keyup', (event)=> {
  let key = event.code.toLocaleLowerCase()
  if(key == 'space' && isJumping) {
    setTimeout(()=>{
      isJumping = false
    },animateDuration('Jump') * 800)
    
  }
  keyPressObj[key] = false
})

// 更新朝向
let upDateLookAt = ()=> {
  let cameraDirection = new THREE.Vector3()
  camera.getWorldDirection(cameraDirection)
  // console.log(cameraDirection,'cameraDirection')
  let lookAtDirection = new THREE.Vector3()
  let velocity = new THREE.Vector3(0,0,0.06)
  let originalLength = velocity.length()
  if(keyPressObj['keyw']) {
    lookAtDirection.set(
      player.position.x + cameraDirection.x,
      player.position.y,
      player.position.z + cameraDirection.z,
    )
    player.lookAt(lookAtDirection)
    // 向前运动
    cameraDirection.y = 0
    // 单位话向量
    cameraDirection.normalize()
    cameraDirection.setLength(originalLength)
    player.position.add(cameraDirection)
  } else if(keyPressObj['keys']) {
    lookAtDirection.set(
      player.position.x - cameraDirection.x,
      player.position.y,
      player.position.z - cameraDirection.z,
    )
    player.lookAt(lookAtDirection)
    // 向后运动
    cameraDirection.y = 0
    // 归一化向量
    cameraDirection.normalize()
    cameraDirection.setLength(originalLength)
    player.position.sub(cameraDirection)
  } else if(keyPressObj['keya']) {
    let leftDirection = new THREE.Vector3(
      -cameraDirection.z,
      0,
      cameraDirection.x
    )
    lookAtDirection.set(
      player.position.x - leftDirection.x,
      player.position.y,
      player.position.z - leftDirection.z,
    )
    player.lookAt(lookAtDirection)
    // 向左运动
    leftDirection.setLength(originalLength)
    player.position.add(leftDirection.negate())
  } else if(keyPressObj['keyd']) {
    let rightDirection = new THREE.Vector3(
      cameraDirection.z,
      0,
      -cameraDirection.x
    )
    lookAtDirection.set(
      player.position.x - rightDirection.x,
      player.position.y,
      player.position.z - rightDirection.z,
    )
    player.lookAt(lookAtDirection)
    // 向右运动
    rightDirection.setLength(originalLength)
    player.position.add(rightDirection.negate())
  }
    


  

}


// 设置时钟
const clock = new THREE.Clock();

function render() {
  // let time = clock.getElapsedTime();
  let time = clock.getDelta();
  if(mixer) {
    mixer.update(time)
    updateAnimation()
  }
  upDateLookAt()
  controls.update();
  // 使用渲染器，通过相机将场景渲染进来
  renderer.render(scene, camera);
  //   渲染下一帧的时候就会调用render函数
  requestAnimationFrame(render);
}

render();

let upDateSize = () => {
   //   console.log("画面变化了");
  // 更新摄像头
  camera.aspect = window.innerWidth / window.innerHeight;
  //   更新摄像机的投影矩阵
  camera.updateProjectionMatrix();

  //   更新渲染器
  renderer.setSize(window.innerWidth, window.innerHeight);
  //   设置渲染器的像素比
  renderer.setPixelRatio(window.devicePixelRatio);
}

onMounted(()=> {
  wanderScene.value.appendChild(renderer.domElement);
})
onUnmounted(()=> {
  window.removeEventListener("resize", upDateSize);
})

// 监听画面变化，更新渲染画面
window.addEventListener("resize", upDateSize);


</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}
</style>
