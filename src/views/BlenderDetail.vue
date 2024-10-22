<template>
    <div id='box1' ref="modelScene"></div>
</template>

<script setup>
import * as THREE from "three";
// 导入轨道控制器
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
// 导入动画库
import gsap from "gsap";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';

import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useRoute } from 'vue-router'
// 左侧菜单宽度
let leftMenuWIdth = document.querySelector('.left-menu').offsetWidth || 180

let cWidth = window.innerWidth - leftMenuWIdth
let cHeight = window.innerHeight

let modelScene = ref()
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


// 添加gbl文件
let gltfLoader = new GLTFLoader()
let dracoLoader = new DRACOLoader()
dracoLoader.setDecoderPath('/draco/gltf/')
dracoLoader.setDecoderConfig({ type: 'js' })
dracoLoader.preload()
gltfLoader.setDRACOLoader(dracoLoader)

let gSrc = new URL('@/images/blender/fasciaGun.glb', import.meta.url).href
let routes = useRoute()
let path = routes.params.id
switch (path) {
    case 'fasciaGun':
        gSrc = new URL('@/images/model/fasciaGun.glb', import.meta.url).href
        break;
    case 'pot':
        gSrc = new URL('@/images/blender/pot.glb', import.meta.url).href
        break;
    default:
        gSrc = ''
}
console.log(routes.params.id)
// let gSrc = new URL('@/images/model/bmw01.glb', import.meta.url).href
// let gSrc = new URL('@/images/blender/fasciaGun.glb', import.meta.url).href
// let gSrc = new URL(path, import.meta.url).href
gltfLoader.load(gSrc, (gltf) => {
    let blenderModel = gltf.scene
    // car.position.set(0.3, -1.4, 0)
    let gd = blenderModel.getObjectByName('锅底')
    gd.traverse((child) => {
        if (child.isMesh) {
            console.log(child,'child')
            // child.material = new THREE.MeshBasicMaterial({ color: 0x000000 }
            child.material = new THREE.MeshStandardMaterial({
                color: 0xffffff,
                metalness: 0.9,
                roughness: 0.1
            })
        }
    })
// console.log(blenderModel,gd,'1111111111')
    scene.add(blenderModel)

},
    (xhr) => {
        console.log(xhr.loaded / xhr.total * 100 + '% loaded')
    }
)




// 初始化渲染器
const renderer = new THREE.WebGLRenderer({antialias: true});
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
let ambientLight = new THREE.AmbientLight(0xffffff, 5)
scene.add(ambientLight)
// 平行光
// let directionaLight = new THREE.DirectionalLight('#ffffff', 1)
// // 阴影
// directionaLight.castShadow = true
// directionaLight.position.set(0, 0, 200)
// scene.add(directionaLight)

 // 添加灯光
 const light1 = new THREE.DirectionalLight(0xffffff, 1);
  light1.position.set(0, 0, 10);
  scene.add(light1);
  const light2 = new THREE.DirectionalLight(0xffffff, 1);
  light2.position.set(0, 0, -10);
  scene.add(light2);
  const light3 = new THREE.DirectionalLight(0xffffff, 1);
  light3.position.set(10, 0, 0);
  scene.add(light3);
  const light4 = new THREE.DirectionalLight(0xffffff, 1);
  light4.position.set(-10, 0, 0);
  scene.add(light4);
  const light5 = new THREE.DirectionalLight(0xffffff, 1);
  light5.position.set(0, 10, 0);
  scene.add(light5);
  const light6 = new THREE.DirectionalLight(0xffffff, 0.3);
  light6.position.set(5, 10, 0);
  scene.add(light6);
  const light7 = new THREE.DirectionalLight(0xffffff, 0.3);
  light7.position.set(0, 10, 5);
  scene.add(light7);
  const light8 = new THREE.DirectionalLight(0xffffff, 0.3);
  light8.position.set(0, 10, -5);
  scene.add(light8);
  const light9 = new THREE.DirectionalLight(0xffffff, 0.3);
  light9.position.set(-5, 10, 0);
  scene.add(light9);


renderer.setClearColor(0x00eeee,0.5)
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

onMounted(() => {
    modelScene.value.appendChild(renderer.domElement);
})
onBeforeUnmount(() => {
    window.removeEventListener("resize", resize);

})

</script>

<style scoped>
* {
    margin: 0;
    padding: 0;
}
</style>