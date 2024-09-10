<template>
    <div id="car" >
        <div class="container" ref="carScene"></div>
        <div class="home-content">
            <!-- <div class="home-content-title">
                <h1>汽车展示与选配</h1>
            </div> -->
            <h2>选择车身颜色</h2>
            <div class="select">
                <div
                class="select-item"
                v-for="(item, index) in colors"
                :key="index"
                @click="selectColor(index)"
                >
                <div
                    class="select-item-color"
                    :style="{ backgroundColor: item }"
                ></div>
                </div>
            </div>

            <h2>选择贴膜材质</h2>
            <div class="select">
                <div
                class="select-item-label"
                :class="{ active: activeMaterialIndex == index }"
                v-for="(item, index) in materials"
                :key="index"
                @click="selectMaterial(index)"
                >
                <div class="select-item-text">{{ item.name }}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>

import { onMounted, reactive, ref, onBeforeUnmount } from 'vue';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';


// 左侧菜单宽度
let leftMenuWIdth = document.querySelector('.left-menu').offsetWidth || 180 

let cWidth =  window.innerWidth - leftMenuWIdth
let cHeight = window.innerHeight

let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(
    75,
    cWidth / cHeight,
    0.1,
    1000
)
camera.position.set(0,2,6)
// 更新摄像头
camera.aspect = cWidth / cHeight
//   更新摄像机的投影矩阵
camera.updateProjectionMatrix()
scene.add(camera)

// let axesHelper = new THREE.AxesHelper(5)
// scene.add(axesHelper)

// 网格地面
let gridHelper = new THREE.GridHelper( 10 , 10)
gridHelper.material.opacity = 0.2;
gridHelper.material.transparent = true;
scene.add(gridHelper)


// let directionalLight = new THREE.DirectionalLight(0xffffff, 1)
// scene.add(directionalLight);
// const light = new THREE.AmbientLight(0xffffff, 0.5); // soft white light
// scene.add(light);

// let plane = new THREE.Mesh(
//     new THREE.PlaneGeometry(10, 10),
//     new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide })
// )
// scene.add(plane)

let activeMaterialIndex = ref(0)

let wheels = [];
let carBody, frontCar, hoodCar, glassCar; 
// 创建材质
let bodyMaterial = new THREE.MeshPhysicalMaterial({
    color: 0xff0000,
    metalness: 1,
    roughness: 0.5,
    clearcoat: 1,
    clearcoatRoughness: 0
})
let frontMaterial = new THREE.MeshPhysicalMaterial({
    color: 0xff0000,
    metalness: 1,
    roughness: 0.5,
    clearcoat: 1,
    clearcoatRoughness: 0
})
let hoodMaterial = new THREE.MeshPhysicalMaterial({
    color: 0xff0000,
    metalness: 1,
    roughness: 0.5,
    clearcoat: 1,
    clearcoatRoughness: 0
})
let wheelsMaterial = new THREE.MeshPhysicalMaterial({
    color: 0xff0000,
    metalness: 1,
    roughness: 0.1,
})
let glassMaterial = new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    metalness: 0,
    roughness: 0,
    transmission: 1,
    transparent: true
})

let colors = ["red", "blue", "green", "black"
// , "orange", "purple"
];

let selectColor = (index) => {
    console.log(index,'iiii')
  bodyMaterial.color.set(colors[index]);
  frontMaterial.color.set(colors[index]);
  hoodMaterial.color.set(colors[index]);
//   wheelsMaterial.color.set(colors[index]);
  // glassMaterial.color.set(colors[index]);
};

let materials = [
  { name: "水晶", value: 0 },
  { name: "磨砂", value: 1 },
];
let selectMaterial = (index) => {
    activeMaterialIndex.value = index;
    bodyMaterial.clearcoatRoughness = materials[index].value;
    frontMaterial.clearcoatRoughness = materials[index].value;
    hoodMaterial.clearcoatRoughness = materials[index].value;
};

// 添加gbl文件
let gltfLoader = new GLTFLoader()
let dracoLoader = new DRACOLoader()
dracoLoader.setDecoderPath('/draco/gltf/')
dracoLoader.setDecoderConfig({type: 'js'})
dracoLoader.preload()
gltfLoader.setDRACOLoader(dracoLoader)

// let gSrc = new URL('@/images/model/bmw01.glb', import.meta.url).href
let gSrc = new URL('@/images/model/car.glb', import.meta.url).href
gltfLoader.load(gSrc,(gltf)=> {
    let car = gltf.scene
    scene.add(car)

    car.traverse(child=> {
        if(child.isMesh) {
            console.log(child.name,'child')
        }

        // 判断是否是轮毂
        if (child.isMesh && child.name.includes("轮毂")) {
            child.material = wheelsMaterial;
            wheels.push(child);
        }

        // 判断是否是车身
        if (child.isMesh && child.name.includes('Mesh002') ) {
            carBody = child
            carBody.material = bodyMaterial
        }
        // 判断是否是前脸
        if (child.isMesh && child.name.includes("前脸")) {
            child.material = frontMaterial;
            frontCar = child;
        }
        // 判断是否是引擎盖
        if (child.isMesh && child.name.includes("引擎盖_1")) {
            child.material = hoodMaterial;
            hoodCar = child;
        }
        // 判断是否是挡风玻璃
        if (child.isMesh && child.name.includes("挡风玻璃")) {
            child.material = glassMaterial;
            glassCar = child;
        }
    })


    // let ambientLight  = new THREE.AmbientLight(0xffffff, 1)
    // scene.add(ambientLight)
},
    (xhr)=>{
        console.log(xhr.loaded / xhr.total * 100 + '% loaded')
    }
)

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

let renderer = new THREE.WebGLRenderer({antialias: true})
renderer.setSize(cWidth, cHeight)
// 开启场景中的阴影贴图
renderer.shadowMap.enabled = true;
renderer.physicallyCorrectLights = true;
renderer.setClearColor(0xcccccc, 1);
leftMenuWIdth = document.querySelector('.left-menu').offsetWidth || 180 
let resize = () => {
    cWidth = window.innerWidth - leftMenuWIdth
    cHeight = window.innerHeight
    camera.aspect = cWidth / cHeight
    camera.updateProjectionMatrix()

    renderer.setSize(cWidth, cHeight)
    renderer.setPixelRatio(window.devicePixelRatio)
}
window.addEventListener('resize', resize)

let controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true

let clock = new THREE.Clock()
let animate = ()=> {

    let time = clock.getDelta()
    
    controls.update()
    requestAnimationFrame(animate)
    renderer.render(scene, camera)
}
animate()

let carScene = ref(null)
onMounted(() => {
    carScene.value.appendChild(renderer.domElement)
})
onBeforeUnmount(()=> {
  window.removeEventListener("resize", resize);
})

</script>
<style scoped>
* {
  margin: 0;
  padding: 0;
}
.home-content {
  position: fixed;
  top: 0;
  right: 20px;
}
.select-item {
   margin-left: -10px; 
}
.select-item-color {
  width: 50px;
  height: 50px;
  border: 1px solid #ccc;
  margin: 10px;
  display: inline-block;
  cursor: pointer;
  border-radius: 10px;
}
.select-item-label {
    font-size: 16px;
    font-weight: bold;
    margin-right: 10px;
    margin-top: 10px;
    padding: 4px 10px;
    /* background: #eee; */
    border: 1px solid #86868b;
    border-radius: 5px;
    cursor: pointer;
}
.select-item-label.active {

    border: 1px solid #0071e3;
}
.select {
  display: flex;
}
</style>