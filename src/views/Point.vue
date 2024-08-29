

<template>
  <div id='box1' ref="pointScene"></div>
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


import basicVertexShader from '@/components/shader/point/vertex.glsl'
import basicFragmentShader from '@/components/shader/point/fragment.glsl'
// const gui = new GUI() 

import { ref ,onMounted } from 'vue'

let pointScene = ref()
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
camera.position.set(0, 0, 2);
scene.add(camera);

// 点
// let geometry = new THREE.BufferGeometry()
// let positions = new Float32Array([
//   0,0,0
// ])
// geometry.setAttribute('position', new THREE.BufferAttribute(positions,3))


// let meterial = new THREE.PointsMaterial({
//   color: 0xff0000,
//   size: 10,
//   sizeAttenuation: true,
// });

let t1Src = new URL('@/images/textures/particles/9.png',import.meta.url).href
let t2Src = new URL('@/images/textures/particles/10.png',import.meta.url).href
let t3Src = new URL('@/images/textures/particles/11.png',import.meta.url).href
let textureLoader = new THREE.TextureLoader()
let texture = textureLoader.load(t1Src)
let texture1 = textureLoader.load(t2Src)
let texture2 = textureLoader.load(t3Src)

let geometry=null;
let  points=null;

// 设置星系的参数
const params = {
  count: 1000,
  size: 0.1,
  radius: 5,
  branches: 4,
  spin: 0.5,
  color: "#ff6030",
  outColor: "#1b3984",
};

// GalaxyColor
let galaxyColor = new THREE.Color(params.color);
let outGalaxyColor = new THREE.Color(params.outColor);
let material;
const generateGalaxy = () => {
  // 如果已经存在这些顶点，那么先释放内存，在删除顶点数据
  if (points !== null) {
    geometry.dispose();
    material.dispose();
    scene.remove(points);
  }
  // 生成顶点几何
  geometry = new THREE.BufferGeometry();
  //   随机生成位置
  const positions = new Float32Array(params.count * 3);
  const colors = new Float32Array(params.count * 3);

  const scales = new Float32Array(params.count);

  //图案属性
  const imgIndex = new Float32Array(params.count)

  //   循环生成点
  for (let i = 0; i < params.count; i++) {
    const current = i * 3;

    // 计算分支的角度 = (计算当前的点在第几个分支)*(2*Math.PI/多少个分支)
    const branchAngel =
      (i % params.branches) * ((2 * Math.PI) / params.branches);

    const radius = Math.random() * params.radius;
    // 距离圆心越远，旋转的度数就越大
    // const spinAngle = radius * params.spin;

    // 随机设置x/y/z偏移值
    const randomX =
      Math.pow(Math.random() * 2 - 1, 3) * 0.5 * (params.radius - radius) * 0.3;
    const randomY =
      Math.pow(Math.random() * 2 - 1, 3) * 0.5 * (params.radius - radius) * 0.3;
    const randomZ =
      Math.pow(Math.random() * 2 - 1, 3) * 0.5 * (params.radius - radius) * 0.3;

    // 设置当前点x值坐标
    positions[current] = Math.cos(branchAngel) * radius + randomX;
    // 设置当前点y值坐标
    positions[current + 1] = randomY;
    // 设置当前点z值坐标
    positions[current + 2] = Math.sin(branchAngel) * radius + randomZ;

    const mixColor = galaxyColor.clone();
    mixColor.lerp(outGalaxyColor, radius / params.radius);

    //   设置颜色
    colors[current] = mixColor.r;
    colors[current + 1] = mixColor.g;
    colors[current + 2] = mixColor.b;



    // 顶点的大小
    scales[current] = Math.random();

    // 根据索引值设置不同的图案；
    imgIndex[current] = i%3 ;
  }
  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
  geometry.setAttribute("aScale", new THREE.BufferAttribute(scales, 1));
  geometry.setAttribute("imgIndex", new THREE.BufferAttribute(imgIndex, 1));

  //   设置点材质
  //   material = new THREE.PointsMaterial({
  //     color: new THREE.Color(0xffffff),
  //     size: params.size,
  //     sizeAttenuation: true,
  //     depthWrite: false,
  //     blending: THREE.AdditiveBlending,
  //     map: particlesTexture,
  //     alphaMap: particlesTexture,
  //     transparent: true,
  //     vertexColors: true,
  //   });

  //   设置点的着色器材质
  material = new THREE.ShaderMaterial({
    vertexShader: basicVertexShader,
    fragmentShader: basicFragmentShader,
    
    transparent: true,
    vertexColors: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    uniforms: {
      uTime: {
        value: 0,
      },
      uTexture:{
        value:texture
      },
      uTexture1:{
        value:texture1
      },
      uTexture2:{
        value:texture2
      },
      uTime:{
        value:0
      },
      uColor:{
        value:galaxyColor
      }

    },
  });

  //   生成点
  points = new THREE.Points(geometry, material);
  scene.add(points);
}

  
generateGalaxy()


// 点着色器材质
// meterial = new THREE.ShaderMaterial({
//   vertexShader: basicVertexShader,
//   fragmentShader: basicFragmentShader,
//   transparent: true,
//   uniforms: {
//     uTexture: {
//       value: texture
//     }
//   }
// })

// let point = new THREE.Points(geometry, meterial)
// scene.add(point)


// 加载场景背景
// const rgbeLoader = new RGBELoader();
// rgbeLoader.loadAsync(rgbSrc).then((texture) => {
//   texture.mapping = THREE.EquirectangularReflectionMapping;
//   scene.background = texture;
//   // scene.environment = texture;
// });





// 灯光
// 环境光
// let ambientLight  = new THREE.AmbientLight(0xffffff, 0.5)
// scene.add(ambientLight)
// // 平行光
// let directionaLight = new THREE.DirectionalLight(0xffffff, 0.5)
// // 阴影
// // directionaLight.castShadow = true
// scene.add(directionaLight)


// 初始化渲染器
const renderer = new THREE.WebGLRenderer({
  alpha: true,
});
// 设置渲染的尺寸大小{}
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true

onMounted(()=> {
  pointScene.value.appendChild(renderer.domElement);
})

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
  material.uniforms.uTime.value = time
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
