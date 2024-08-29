

<template>
  <div id='box1' ref="waterScene"></div>
</template>

<script setup>
import * as THREE from "three";
// 导入轨道控制器
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
// 监听设置
import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min.js'
// 导入动画库
import gsap from "gsap";


import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

// 导入water
import { Water } from "three/examples/jsm/objects/Water2";


import basicVertaxShader from './components/shader/water/vertex.glsl'
import basicFragmentShader from './components/shader/water/fragment.glsl'
// const gui = new GUI()
import { ref, onMounted } from 'vue'

let waterScene = ref()
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





let rgbSrc = new URL('./images/050.hdr',import.meta.url).href


// 加载场景背景
const rgbeLoader = new RGBELoader();
rgbeLoader.loadAsync(rgbSrc).then((texture) => {
  texture.mapping = THREE.EquirectangularReflectionMapping;
  scene.background = texture;
  // scene.environment = texture;
});

// 浴缸
let ygSrc = new URL('./images/model/yugang.glb',import.meta.url).href
let waterSrc = new URL('./images/textures/water/Water_1_M_Normal.jpg',import.meta.url).href
let waterTextureLoader = new THREE.TextureLoader()
let waterTexture = waterTextureLoader.load(waterSrc,
  function (texture) {
    texture.wrapS = THREE.RepeatWrapping
    texture.wrapT = THREE.RepeatWrapping
  }
)
let gltfLoader = new GLTFLoader()
gltfLoader.load(ygSrc,(gltf)=> {

  let yugang = gltf.scene.children[0]
  yugang.material.side = THREE.DoubleSide
  const waterGeometry = gltf.scene.children[1].geometry;

  const water = new Water(waterGeometry, {
    color: "#ffffff",
    scale: 1,
    flowDirection: new THREE.Vector2(1, 1),
    textureHeight: 1024,
    textureWidth: 1024,
    // waterNormals: waterTexture,
    normalMap0: waterTexture,
    normalMap1: waterTexture,

  });

  scene.add(water);
  scene.add(yugang)
})

// let waterSrc = new URL('./images/textures/water/Water_1_M_Flow.jpg',import.meta.url).href

// const water = new Water(new THREE.PlaneGeometry(1, 1, 1024, 1024), {
//   color: "#ff0000",
//   scale: 1,
//   flowDirection: new THREE.Vector2(1, 1),
//   textureHeight: 1024,
//   textureWidth: 1024,
//   // waterNormals: waterTexture,
//   normalMap0: waterTexture,
//   normalMap1: waterTexture,
//   sunDirection: new THREE.Vector3(),
//   sunColor: 0xffffff,
//   waterColor: 0x001e0f,
//   distortionScale: 3.7,
//   // fog: scene.fog !== undefined,
// });
// water.rotation.x = -Math.PI / 2;

// scene.add(water);


// let plane = new THREE.Mesh(
//   new THREE.PlaneGeometry(1, 1, 1024, 1024),
//   // shaderMaterial
//   new THREE.MeshBasicMaterial({
//     color: 0xffff00
//   })
// )

// plane.rotation.x = -Math.PI / 2
// scene.add(plane)
// 图片
// let imgSrc = new URL('./images/2k.hdr',import.meta.url).href

// let rgbeloader = new RGBELoader()
// rgbeloader.loadAsync(imgSrc).then((texture) => {
//   texture.mapping = THREE.EquirectangularReflectionMapping
//   scene.background = texture
//   scene.environment = texture
// })




// 灯光
// 环境光
// let ambientLight  = new THREE.AmbientLight(0xffffff, 0.5)
// scene.add(ambientLight)
// // 平行光
// let directionaLight = new THREE.DirectionalLight(0xffffff, 0.5)
// // 阴影
// // directionaLight.castShadow = true
// scene.add(directionaLight)
const ambientLight = new THREE.AmbientLight( 0xe7e7e7, 1.2 );
scene.add( ambientLight );

const directionalLight = new THREE.DirectionalLight( 0xffffff, 2 );
directionalLight.position.set( - 1, 1, 1 );
scene.add( directionalLight );


// 初始化渲染器
const renderer = new THREE.WebGLRenderer({
  alpha: true,
});
// 设置渲染的尺寸大小{}
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true


onMounted(()=> {
  waterScene.value.appendChild(renderer.domElement);
})

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
  // water.material.uniforms['time'].value += 1.0 / 60.0; // 每帧更新时间参数

  // 更新水面材质的变换
  // water.material.uniforms[ 'time' ].value += 0.05;
  // water.renderOrder = 1; // 确保水面在其他物体之后渲染

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

<style>

* {
  margin: 0;
  padding: 0;
}
body {
  background-color: rgb(36, 58, 66);
}


</style>
