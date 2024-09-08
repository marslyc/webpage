

<template>
  <div id='box1' ref="wanderScene"></div>
</template>

<script setup>
import * as THREE from "three";
// 导入轨道控制器
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Octree } from 'three/addons/math/Octree.js';
import { OctreeHelper } from 'three/addons/helpers/OctreeHelper.js';
// 导入动画库
import gsap from "gsap";

import { ref ,onMounted, onUnmounted, onBeforeUnmount  } from 'vue'
import { Capsule } from "three/examples/jsm/Addons.js";

let wanderScene = ref()

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
camera.position.set(0, 5, 10);
// scene.add(camera);
// 创建后置相机
const backCamera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

// 设置相机位置
backCamera.position.set(0, 5, -10);

// 初始化渲染器
const renderer = new THREE.WebGLRenderer();
// 设置渲染的尺寸大小
renderer.setSize(window.innerWidth, window.innerHeight);
// 开启场景中的阴影贴图
renderer.shadowMap.enabled = true;

renderer.physicallyCorrectLights = true;


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
// 创建轨道控制器
// const controls = new OrbitControls(camera, renderer.domElement);
// // 设置控制器阻尼，让控制器更有真实效果,必须在动画循环里调用.update()。
// controls.enableDamping = true;


// 创建一个碰撞组。地形组
let group = new THREE.Group()
let planeGeometry = new THREE.PlaneGeometry(1000,1000)
let planeMaterial = new THREE.MeshStandardMaterial({
  color: 0xffffff
})
let plane = new THREE.Mesh(planeGeometry,planeMaterial)
plane.rotation.x = -Math.PI / 2
plane.receiveShadow = true
group.add(plane)

// const planeGeometry = new THREE.PlaneGeometry( 200, 200, 32, 32 );
// const planeMaterial = new THREE.MeshStandardMaterial( { color: 0x00ff00 } )
// const plane = new THREE.Mesh( planeGeometry, planeMaterial );
// plane.receiveShadow = true;
// scene.add( plane );


let randomizeMatrix = function () {
  const position = new THREE.Vector3();
  const quaternion = new THREE.Quaternion();
  const scale = new THREE.Vector3();

  return function ( matrix ) {

    position.x = Math.random() * 40 - 20;
    position.y = Math.random() * 40 - 20;
    position.z = Math.random() * 40 - 20;

    quaternion.random();

    scale.x = scale.y = scale.z = Math.random() * 1;

    matrix.compose( position, quaternion, scale );

  };
}

let randomG = (min, max)=> {
  return Math.floor(Math.random() * (max - min)) + min
}
//   let wid = randomG(2,5)
//   let hei = randomG(2,5)
// let boxGeometry = new THREE.BoxGeometry(2,3,4)
  
// let boxMaterial = new THREE.MeshStandardMaterial({
//   color: 0xff0000
// })
// const matrix = new THREE.Matrix4();
// const mesh = new THREE.InstancedMesh( boxGeometry, boxMaterial, 100 );

// for ( let i = 0; i < 100; i ++ ) {

//   randomizeMatrix( matrix );
//   console.log(matrix,'matrix')
//   mesh.setMatrixAt( i, matrix );

// }
// mesh.instanceMatrix.needsUpdate = true
// scene.add( mesh );


// let insMesh = new THREE.InstancedMesh(boxGeometry,boxMaterial,100)
// insMesh.instanceMatrix.needsUpdate = true
// for (let i = 0; i < insMesh.count; i++) {
//   insMesh.setMatrixAt(i)
// }
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
  group.add(box)
}

// group.add(insMesh)

scene.add(group)
// 八叉树，碰撞检测
const worldOctree = new Octree(); 
worldOctree.fromGraphNode(group)

// 创建胶囊体，用于碰撞检测
let playerCollider = new Capsule(
  new THREE.Vector3(0, 0.35, 0),
  new THREE.Vector3(0, 1.35, 0),
  0.35
)
// scene.add(playerCollider)
// console.log(playerCollider.getCenter(new THREE.Vector3()),'playerCollider')

// 创建球胶囊
// const geometry = new THREE.CapsuleGeometry( 0.35, 1, 4, 8 ); 
// const material = new THREE.MeshBasicMaterial( {color: 0xff0000} ); 
// const capsule = new THREE.Mesh( geometry, material ); 
const capsule = new THREE.Object3D()
capsule.position.set(0, 0, 0)
scene.add( capsule );

// 将相机设置为胶囊的子元素
camera.position.set(0, 2, -5)
camera.lookAt(capsule.position)
backCamera.position.set(0, 2, 5)
backCamera.lookAt(capsule.position)
// controls.target = capsule.position
let capsuleBody = new THREE.Object3D()

capsuleBody.add(camera)
capsuleBody.add(backCamera)
capsule.add(capsuleBody)

// let planeGeometry = new THREE.PlaneGeometry(1.5,1.5)
// let planeMaterial = new THREE.MeshStandardMaterial({
//   color: 0x000000,
//   side: THREE.DoubleSide
// })
// let plane = new THREE.Mesh(planeGeometry,planeMaterial)
// capsule.add(plane)


let activeCamera = camera;

// 重力
let gravity = -9.8
// 玩家速度：
let playerVelocity = new THREE.Vector3(0,0,0)
// 玩家的方向向量
let playerDirection = new THREE.Vector3(0,0,0)

// 玩家是否在地面
let playerOnFloor = false


// let collosionObj;
// let glSrc = new URL( '@/images/model/collision-world.glb',import.meta.url).href;
// const loader = new GLTFLoader();

// loader.load( glSrc, ( gltf ) => {

//   scene.add( gltf.scene );
//   collosionObj = gltf.scene
//   collosionObj.position.set(0,1.7,0)
//   console.log(collosionObj,'collosionObj')
//   worldOctree.fromGraphNode( gltf.scene );

//   gltf.scene.traverse( child => {

//     if ( child.isMesh ) {

//       child.castShadow = true;
//       child.receiveShadow = true;

//       if ( child.material.map ) {

//         child.material.map.anisotropy = 4;

//       }

//     }

//   } );
// })
//   const helper = new OctreeHelper( worldOctree );
//   helper.visible = false;
//   scene.add( helper );

//   // const gui = new GUI( { width: 200 } );
//   // gui.add( { debug: false }, 'debug' )
//   //   .onChange( function ( value ) {

//   //     helper.visible = value;

//   //   } );

// } );

// 添加半球光源
let hemisphereLight = new THREE.HemisphereLight(0xffffff, 0x444444,1);
// hemisphereLight.position.set(0, 20, 0);
scene.add(hemisphereLight);

// 动作混合器
let mixer = null;
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
  gltf.scene.scale.set(0.5,0.5,0.5)
  gltf.scene.position.set(0,-0.95,0)
  // scene.add(gltf.scene)
  capsule.add(gltf.scene)
  
  let animations = gltf.animations
  mixer = new THREE.AnimationMixer(gltf.scene)

  animations.forEach((animation,i)=> {

    let actions = mixer.clipAction(animation)

    animationObj[animation.name] = actions

    if(animation.name == 'Idle' || animation.name == 'Running' || animation.name == 'Walking' || animation.name == 'Dance') {
      animationObj[animation.name].clampWhenFinished = false
      animationObj[animation.name].loop = THREE.LoopRepeat
      
    } else {
      animationObj[animation.name].clampWhenFinished = false
      animationObj[animation.name].loop = THREE.LoopOnce
    }
  })
// console.log(animationObj,'animationObj')
  // 阴影
  gltf.scene.traverse(chile=> {
    chile.castShadow = true
  })
})




// 切换动作
// 当前动画
let currentAnimation = null
// 上一个动画
let preAnimation = null
let changeAnimation = (name, time = 0.3)=> {

  preAnimation = currentAnimation
  currentAnimation = animationObj[name]
  if(preAnimation != currentAnimation) {
    preAnimation && preAnimation.fadeOut(time)
    currentAnimation && currentAnimation
    .reset()
    .setEffectiveTimeScale(1)
    .setEffectiveWeight(1)
    .fadeIn(time)
    .play()
  }
}
// 是否在跳起
let isJumping = false
//  是否 AI跳舞
let isDanceing = false

// 是否挥手
let isWaving= false
let keyPressObj = {}
let isKeyDown = false
let updateAnimation = ()=> {
  if(isDanceing) return
  if(isJumping) return
  if(isWaving) return
  // if(keyPressObj['keyw'] && keyPressObj['shiftleft'] ||
  //   keyPressObj['keya'] && keyPressObj['shiftleft']  ||
  //   keyPressObj['keys'] && keyPressObj['shiftleft']  ||
  //   keyPressObj['keyd'] && keyPressObj['shiftleft']  
  // ){
  //   changeAnimation('Running')
  // }else 
  // if (keyPressObj['keyw'] ||
  //   keyPressObj['keya'] ||
  //   keyPressObj['keys'] ||
  //   keyPressObj['keyd'] 
  // ){
  //   changeAnimation('Walking')
  // } 
  // else 
  // if (keyPressObj['keyt']){
  //   changeAnimation('Wave',3)
  // }
  // else {
  //   changeAnimation('Idle')

  // }
}
let animateDuration = (name)=> {
  let action = animationObj[name]
  let clip = action.getClip()
  if(action && clip) {
    return clip.duration;
  }
  return 0
}

let keydownHandler = (event)=> {

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
  if(key == 'keyt' && !isWaving) {
    isWaving = true
    changeAnimation('Wave')
  }
  keyPressObj[key] = true
  isKeyDown = true
}
let keyupHandler = (event)=> {
  let key = event.code.toLocaleLowerCase()
  if(key == 'space' && isJumping) {
    setTimeout(()=>{
      isJumping = false
    },animateDuration('Jump') * 800)
    
  }
  keyPressObj[key] = false
  isKeyDown = false
  // 切换前后相机
  if(key == 'keyv') {
    activeCamera = activeCamera == camera ? backCamera : camera
  }
  // 打招呼
  if(key == 'keyt' && isWaving) {
    setTimeout(()=>{
      isWaving = false
    },animateDuration('Wave') * 800)
    
  }
}
let mousemoveHandler = (event)=> {
  capsule.rotation.y -= event.movementX * 0.003
  capsuleBody.rotation.x += event.movementY * 0.003
  if(capsuleBody.rotation.x > Math.PI / 8) {
    capsuleBody.rotation.x = Math.PI / 8
  } else if(capsuleBody.rotation.x < -Math.PI / 8) {
    capsuleBody.rotation.x = -Math.PI / 8
  }
}
let mousedownHandler = (event)=> {
  let element = wanderScene.value

  element.requestPointerLock = element.requestPointerLock || element.mozRequestPointerLock || element.webkitRequestPointerLock;
  if(element.requestPointerLock) {
    element.requestPointerLock()
  }
  // wanderScene.value.requestPointerLock()
}

// 更新朝向
let controlsPlayer = (delateTime)=> {
  let cameraDirection = new THREE.Vector3()
  // camera.getWorldDirection(cameraDirection)
  capsule.getWorldDirection(cameraDirection)
  // console.log(cameraDirection,'cameraDirection')
  let lookAtDirection = new THREE.Vector3()
  let velocity = new THREE.Vector3(0,0,0.06)
  let originalLength = velocity.length()
  if(keyPressObj['keyw']) {
    // lookAtDirection.set(
    //   capsule.position.x + cameraDirection.x,
    //   capsule.position.y,
    //   capsule.position.z + cameraDirection.z,
    // )
    // console.log(capsule.position,'capsule')
    // capsule.lookAt(lookAtDirection)
    // // 向前运动
    // cameraDirection.y = 0
    // // 单位话向量
    // cameraDirection.normalize()
    // cameraDirection.setLength(originalLength)
    // capsule.position.add(cameraDirection)
    playerDirection.z = 1
    let capsuleFront = new THREE.Vector3(0,0,0)
    // camera.getWorldDirection(cameraDirection)
    capsule.getWorldDirection(capsuleFront)
    // console.log(capsuleFront,'capsuleFront')
    playerVelocity.add(capsuleFront.multiplyScalar(delateTime))
    // console.log(playerVelocity,'playerVelocity')
  } else if(keyPressObj['keys']) {
    // lookAtDirection.set(
    //   player.position.x - cameraDirection.x,
    //   player.position.y,
    //   player.position.z - cameraDirection.z,
    // )
    // player.lookAt(lookAtDirection)
    // // 向后运动
    // cameraDirection.y = 0
    // // 归一化向量
    // cameraDirection.normalize()
    // cameraDirection.setLength(originalLength)
    // player.position.sub(cameraDirection)

    playerDirection.z = 1
    let capsuleFront = new THREE.Vector3(0,0,0)
    capsule.getWorldDirection(capsuleFront)
    
    playerVelocity.add(capsuleFront.multiplyScalar(-delateTime))
  } else if(keyPressObj['keya']) {
    // let leftDirection = new THREE.Vector3(
    //   -cameraDirection.z,
    //   0,
    //   cameraDirection.x
    // )
    // lookAtDirection.set(
    //   player.position.x - leftDirection.x,
    //   player.position.y,
    //   player.position.z - leftDirection.z,
    // )
    // player.lookAt(lookAtDirection)
    // // 向左运动
    // leftDirection.setLength(originalLength)
    // player.position.add(leftDirection.negate())
    playerDirection.z = 1
    let capsuleFront = new THREE.Vector3(0,0,0)
    capsule.getWorldDirection(capsuleFront)
    // 侧面 求叉积， 则获得垂直方向
    capsuleFront.cross(capsule.up)
    playerVelocity.add(capsuleFront.multiplyScalar(-delateTime))
  } else if(keyPressObj['keyd']) {
    // let rightDirection = new THREE.Vector3(
    //   cameraDirection.z,
    //   0,
    //   -cameraDirection.x
    // )
    // lookAtDirection.set(
    //   player.position.x - rightDirection.x,
    //   player.position.y,
    //   player.position.z - rightDirection.z,
    // )
    // player.lookAt(lookAtDirection)
    // // 向右运动
    // rightDirection.setLength(originalLength)
    // player.position.add(rightDirection.negate())
    playerDirection.z = 1
    let capsuleFront = new THREE.Vector3(0,0,0)
    capsule.getWorldDirection(capsuleFront)
    // 侧面 求叉积， 则获得垂直方向
    capsuleFront.cross(capsule.up)
    playerVelocity.add(capsuleFront.multiplyScalar(delateTime))
  } 

  if(keyPressObj['space']) {
    playerVelocity.y = 5
  }


}

// 碰撞检测
let playerCollisions = ()=> {
  let result = worldOctree.capsuleIntersect(playerCollider)
  // console.log(result)
  playerOnFloor = false
  if(result) {
    playerOnFloor = result.normal.y > 0
  //  console.log(playerOnFloor,'playerOnFloor')
    playerCollider.translate(result.normal.multiplyScalar(result.depth))

  }
}

// 更新玩家，胶囊
let updatePlayer = (deltaTime) => {
  let damping = -0.5
  if(playerOnFloor) {
    playerVelocity.y = 0
    if(!isKeyDown) {
      playerVelocity.addScaledVector(playerVelocity, damping)
    }
    
  } else {
    playerVelocity.y += gravity * deltaTime
  }
  
  // 玩家移动的距离
  let moveDirection = playerVelocity.clone().multiplyScalar(deltaTime)
  // console.log(moveDirection,'moveDirection')
  playerCollider.translate(moveDirection)
  // console.log(playerCollider)
  // capsule.position.set(0, 0.85, 0)
  // 将胶囊的位置进行设置
  playerCollider.getCenter(capsule.position)

  // 碰撞检测
  playerCollisions()

  // 设置动作改变
  let absData = Math.abs(playerVelocity.x)+ Math.abs(playerVelocity.z)
  // console.log(Math.abs(playerVelocity.x),Math.abs(playerVelocity.z),absData,'absDataabsData')
  
  if( absData > 0.1 && absData <= 5) {
    changeAnimation('Walking')
  } else if( absData > 5) {
    changeAnimation('Running')
  }
   else {
    if(!isDanceing && !isWaving) {
      changeAnimation('Idle')
    }
  }

}

// 重置状态
let resetPlayer = () => {
  if(capsule.position.y < -20) {
    playerCollider.start.set(0,2.35,0),
    playerCollider.end.set(0,3.35,0)
    playerCollider.radius = 0.35
    playerVelocity.set(0,0,0)
    playerDirection.set(0,0,0)
  }
}

// 设置时钟
const clock = new THREE.Clock();



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
  window.addEventListener('keydown', keydownHandler)
  window.addEventListener('keyup', keyupHandler)
  wanderScene.value.addEventListener('mousemove', mousemoveHandler)
  // 鼠标按下后鼠标锁定
  wanderScene.value.addEventListener('mousedown', mousedownHandler)

  // 监听画面变化，更新渲染画面
  window.addEventListener("resize", upDateSize);
})
onBeforeUnmount(()=> {
  window.removeEventListener("resize", upDateSize);
  window.removeEventListener('keydown', keydownHandler)
  window.removeEventListener('keyup', keyupHandler)
  wanderScene.value.removeEventListener('mousemove', mousemoveHandler)
  // 鼠标按下后鼠标锁定
  wanderScene.value.removeEventListener('mousedown', ()=> {
    
    let element = wanderScene.value
    element.exitPointerLock = document.exitPointerLock || document.mozExitPointerLock || document.webkitExitPointerLock;
    if(element.exitPointerLock) {
      element.exitPointerLock()
    }
  })
})




function render() {
  // let time = clock.getElapsedTime();
  let time = clock.getDelta()

  // 控制玩家方向
  controlsPlayer(time)
  // 更新胶囊位置
  updatePlayer(time)
  // 重置
  resetPlayer()
  if(mixer) {
    mixer.update(time)
    updateAnimation()
  }
  
  // controls.update();
  // 使用渲染器，通过相机将场景渲染进来
  renderer.render(scene, activeCamera);
  //   渲染下一帧的时候就会调用render函数
  requestAnimationFrame(render);
}

render();

</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}
</style>
