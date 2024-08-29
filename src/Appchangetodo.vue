<!--
 * @Description: 
 * @Author: yuchao
 * @Date: 2024-08-01 15:44:57
 * @LastEditors: yuchao
 * @LastEditTime: 2024-08-06 17:37:08
-->


<template>
  <div id='box1'></div>
</template>

<script setup>
import * as THREE from "three";
import { DRACOLoader, RGBELoader } from "three/examples/jsm/Addons.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

// 在vite.config中配置后可引入.hdr 文件，否则无法解析
// import lSrc from '@/images/textures/038.hdr'
import { nextTick, onMounted } from "vue";


let scene,camera,renderer;

let clock = new THREE.Clock()
let textureLoader = new THREE.TextureLoader()


init()
animate()


function init() {


  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.set(0, 5, -10);

  scene = new THREE.Scene();
  scene.add(camera)


  const dirLight = new THREE.DirectionalLight(0xffffff);
  dirLight.position.set(0, 0, 1);
  scene.add(dirLight);
  // const light = new THREE.AmbientLight(0xffffff, 0.5); // soft white light
  // scene.add(light);

  const axesHelper = new THREE.AxesHelper( 5 );
  scene.add( axesHelper );

  //添加hdr环境纹理
  let lSrc = new URL('./images/textures/038.hdr',import.meta.url).href
  let loader = new RGBELoader()
  loader.load(lSrc,(texture)=> {
    texture.mapping = THREE.EquirectangularReflectionMapping
    scene.environment = texture
    scene.background = texture
  })

  let params = {
    value0: 0,
    value1: 0,
  };
  // 加载压缩的glb模型

  let gltfLoader = new GLTFLoader()
  let dracoLoader = new DRACOLoader()
  let dSrc = new URL('./images/draco/gltf/',import.meta.url).href
  dracoLoader.setDecoderPath(dSrc)
  dracoLoader.setDecoderConfig({ type: 'js'})
  dracoLoader.preload()
  gltfLoader.setDRACOLoader(dracoLoader)
  let mixer;
  let stem, petal, stem1,petal1,stem2,petal2
  let gSrc = new URL('./images/draco/gltf/',import.meta.url).href
  gltfLoader.load(gSrc,(gltf)=> {
    gltf.scene.traverse((item)=> {

    })
  })
  

  

  renderer = new THREE.WebGLRenderer();
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.minDistance = 5;
  controls.maxDistance = 100;


  window.addEventListener("resize", onWindowResize);
}
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;

  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);

}

function animate() {
  requestAnimationFrame(animate);

  const elapsed = clock.getElapsedTime();


  // const intersects = raycaster.intersectObjects(scene.children,true)
  

  renderer.render(scene, camera);
}


</script>

<style>

* {
  margin: 0;
  padding: 0;
}


</style>
