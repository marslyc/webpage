

<template>
    <div id='box1' ref="light"></div>
  </template>
  
  <script setup>
  import * as THREE from "three";
  // 导入轨道控制器
  import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
  // 监听设置
  import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min.js'
  // 导入动画库
  import gsap from "gsap";
  
  import * as CANNON from 'cannon-es'
  import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader'
  import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
  
  import basicVertaxShader from '@/components/shader/flylight/vertex.glsl'
  import basicFragmentShader from '@/components/shader/flylight/fragment.glsl'
  // const gui = new GUI()
  import { ref ,onMounted } from 'vue'

  let light = ref()
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
  camera.position.set(0, 0, 6);
  scene.add(camera);
  
  
  let params = {}
  // 创建原始着色器材质
  let shaderMaterial = new THREE.ShaderMaterial({
    // 顶点着色器
    vertexShader: basicVertaxShader,
    // 片元着色器
    fragmentShader: basicFragmentShader,
    // wireframe: true,
    side: THREE.DoubleSide,
    // transparent: true,
  
  })
  
  // 图片
  let imgSrc = new URL('@/images/2k.hdr',import.meta.url).href
  
  let rgbeloader = new RGBELoader()
  rgbeloader.loadAsync(imgSrc).then((texture) => {
    texture.mapping = THREE.EquirectangularReflectionMapping
    scene.background = texture
    scene.environment = texture
  })
  
  
  let lightBox = null
  let gltfSrc = new URL('@/images/model/flyLight.glb',import.meta.url).href
  let gltfLoader = new GLTFLoader()
  gltfLoader.load(gltfSrc,(gltf)=> {
    // console.log(gltf)
    // scene.add(gltf.scene)
    lightBox = gltf.scene.children[0];
    lightBox.material = shaderMaterial
  
    for(let i=0;i<150;i++) {
      let light = gltf.scene.clone(true)
      let x = (Math.random() - 0.5) * 300
      let z = (Math.random() - 0.5) * 300
      let y = Math.random() * 60 + 25
      light.position.set(x,y,z)
      scene.add(light)
  
      // gsap.to(
      //   light.rotation,
      //   {
      //     y: Math.PI * 2,
      //     duration: 10,
      //     repeat: -1,
      //     // ease: 'none'
      //   }
      // )
      gsap.to(
        light.rotation,
        {
          // z: "+=" + Math.random() * 5,
          y: "+=" + Math.random() * 20,
          yoyo: true,
          duration: 5 + Math.random() * 10,
          repeat: -1,
        }
      )
    }
  })
  
  
  
  
  // 灯光
  // 环境光
  // let ambientLight  = new THREE.AmbientLight(0xffffff, 0.5)
  // scene.add(ambientLight)
  // // 平行光
  // let directionaLight = new THREE.DirectionalLight(0xffffff, 0.5)
  // // 阴影
  // directionaLight.castShadow = true
  // scene.add(directionaLight)
  
  
  // 初始化渲染器
  const renderer = new THREE.WebGLRenderer({
    alpha: true,
  });
  // 设置渲染的尺寸大小{}
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.shadowMap.enabled = true
  
  renderer.outputEncoding = THREE.sRGBEncoding;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  // renderer.toneMapping = THREE.LinearToneMapping;
  // renderer.toneMapping = THREE.ReinhardToneMapping;
  // renderer.toneMapping = THREE.CineonToneMapping;
  renderer.toneMappingExposure = 0.4;
  

  onMounted(()=> {
    light.value.appendChild(renderer.domElement);
  })
  
  // // 使用渲染器，通过相机将场景渲染进来
  // renderer.render(scene, camera);
  
  // 创建轨道控制器
  const controls = new OrbitControls(camera, renderer.domElement);
  // 设置控制器阻尼，让控制器更有真实效果,必须在动画循环里调用.update()。
  controls.enableDamping = true;
  
  // 设置自动旋转
  controls.autoRotate = true;
  controls.autoRotateSpeed = 0.5;
  controls.maxPolarAngle = (Math.PI / 3) * 2;
  controls.minPolarAngle = (Math.PI / 3) * 2;
  
  // 添加坐标轴辅助器
  // const axesHelper = new THREE.AxesHelper(5);
  // scene.add(axesHelper);
  // 设置时钟
  const clock = new THREE.Clock();
  
  
  function render() {
    let time = clock.getElapsedTime();
    // 两帧之间的时间差
    // let deltaTime = clock.getDelta();
  
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
sss  