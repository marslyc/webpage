
<template>
    <div id='box1' class="earthScene" ref="earthScene"></div>
  </template>
  
  <script setup>
  import * as THREE from "three";
  import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
  import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
  import { ref, onMounted, onUnmounted } from "vue";
  
  import { CSS2DObject, CSS2DRenderer } from "three/examples/jsm/renderers/CSS2DRenderer.js"; 
  // 左侧菜单宽度
  let leftMenuWIdth = document.querySelector('.left-menu').offsetWidth || 180 

  let cWidth =  window.innerWidth - leftMenuWIdth
  let cHeight = window.innerHeight

  let earthScene = ref(null)
  let scene,camera,renderer,labelRenderer;
  
  let clock = new THREE.Clock()
  let textureLoader = new THREE.TextureLoader()
  
  
  let moon;
  let earth;
  let chinaPosition;
  let chinaLabel;
  let chinaDiv;
  let curve;
  let raycaster = new THREE.Raycaster()
  
  init()
  animate()
  
  
  function init() {
    const EARTH_RADIUS = 1;
    const MOON_RADIUS = 0.27;
  
    camera = new THREE.PerspectiveCamera(
      45,
      cWidth / cHeight,
      0.1,
      200
    );
    camera.position.set(0, 5, -10);
  
    scene = new THREE.Scene();
  
    const dirLight = new THREE.DirectionalLight(0xffffff);
    dirLight.position.set(0, 0, 1);
    scene.add(dirLight);
    const light = new THREE.AmbientLight(0xffffff, 1); // soft white light
    scene.add(light);
  
    // const axesHelper = new THREE.AxesHelper( 5 );
    // scene.add( axesHelper );
  
    //
  
      // 创建地球
    let mSrc = new URL('@/images/textures/planets/earth_atmos_2048.jpg',import.meta.url).href
    let sSrc = new URL('@/images/textures/planets/earth_specular_2048.jpg',import.meta.url).href
    let nSrc = new URL('@/images/textures/planets/earth_normal_2048.jpg',import.meta.url).href
  
    const earthGeometry = new THREE.SphereGeometry(EARTH_RADIUS, 16, 16);
    const earthMaterial = new THREE.MeshPhongMaterial({
      specular: 0x333333,
      shininess: 5,
      map: textureLoader.load(mSrc),
      specularMap: textureLoader.load(sSrc),
      normalMap: textureLoader.load(nSrc),
      normalScale: new THREE.Vector2(0.85, 0.85),
    });
  
    earth = new THREE.Mesh(earthGeometry, earthMaterial);
    // earth.rotation.y = Math.PI;
    scene.add(earth);
  
    
    let nmSrc = new URL('@/images/textures/planets/moon_1024.jpg',import.meta.url).href
    const moonGeometry = new THREE.SphereGeometry(MOON_RADIUS, 16, 16);
    const moonMaterial = new THREE.MeshPhongMaterial({
      shininess: 5,
      map: textureLoader.load(nmSrc),
    });
    moon = new THREE.Mesh(moonGeometry, moonMaterial);
    scene.add(moon);
  
  
    // 根据点创建曲线
    curve = new THREE.CatmullRomCurve3(
      [
        new THREE.Vector3(-3, 2, -3),
        new THREE.Vector3(-3, 3, -3),
        new THREE.Vector3(0, 0, 5),
        new THREE.Vector3(3, -5, 3),
        new THREE.Vector3(5, 0, 5),
      ],
      true
    )
  
    // 在曲线里，getPoints获取51个点
    let points = curve.getPoints(50)
  
    let geometry = new THREE.BufferGeometry().setFromPoints(points)
    let material = new THREE.LineBasicMaterial({ color: 0xffffff })
    let curveObject = new THREE.Line(geometry,material)
    scene.add(curveObject)
  
    // 添加提示标签
    const earthDiv = document.createElement('div');
    earthDiv.className = "label";
    earthDiv.innerHTML = "地球";
    const earthLabel = new CSS2DObject(earthDiv);
    earthLabel.position.set(0,1,0);
    earth.add(earthLabel);
  
    // 中国
    const chinaDiv = document.createElement('div');
    chinaDiv.className = "label1";
    chinaDiv.innerHTML = "中国";
    chinaLabel = new CSS2DObject(chinaDiv);
    chinaLabel.position.set(-0.3,0.5,-0.9);
    earth.add(chinaLabel);

  
    const moonDiv = document.createElement('div');
    moonDiv.className = "label";
    moonDiv.innerHTML = "月球";
    const moonLabel = new CSS2DObject(moonDiv);
    moonLabel.position.set(0,0.3,0);
    moon.add(moonLabel);
  
  
    // 实例化css2d的渲染器
    labelRenderer = new CSS2DRenderer();
    labelRenderer.setSize(cWidth, cHeight);
    // document.body.appendChild(labelRenderer.domElement)
    labelRenderer.domElement.style.position = 'absolute';
    labelRenderer.domElement.style.top = '0px';
    labelRenderer.domElement.style.left = '0px';
    labelRenderer.domElement.style.zIndex = '10';
    // labelRenderer.domElement.style.color = '#ffffff';
  
  
  
  
    renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(cWidth, cHeight);

    onMounted(()=> {
      // 先注释
      earthScene.value.appendChild(labelRenderer.domElement)
      earthScene.value.appendChild(renderer.domElement);
    })
    
  
    const controls = new OrbitControls(camera, labelRenderer.domElement);
    controls.minDistance = 5;
    controls.maxDistance = 100;

    leftMenuWIdth = document.querySelector('.left-menu').offsetWidth || 180 
    window.addEventListener("resize", onWindowResize);
    onUnmounted(()=> {
      window.removeEventListener("resize", onWindowResize);
    })
  }
  function onWindowResize() {
    cWidth = window.innerWidth - leftMenuWIdth
    cHeight = window.innerHeight
    camera.aspect = cWidth / cHeight;
  
    camera.updateProjectionMatrix();
  
    renderer.setSize(cWidth, cHeight);
    labelRenderer.setSize(cWidth, cHeight);
  }
  
  function animate() {
    requestAnimationFrame(animate);
  
    const elapsed = clock.getElapsedTime();
  
    // 月球绕着地球旋转
    // moon.position.set(Math.sin(elapsed) * 5, 0, Math.cos(elapsed) * 5);
  
    const chinaPosition = chinaLabel.position.clone();
    // 计算出标签跟摄像机的距离
    const labelDistance = chinaPosition.distanceTo(camera.position);
    // 检测射线的碰撞
    // chinaLabel.position
    // 向量(坐标)从世界空间投影到相机的标准化设备坐标 (NDC) 空间。
    chinaPosition.project(camera);
    raycaster.setFromCamera(chinaPosition,camera);
  
    const intersects = raycaster.intersectObjects(scene.children,true)

    
    // 如果没有碰撞到任何物体，那么让标签显示
    if(intersects.length == 0){
      chinaLabel.element.classList.add('visible');
      
    }else{
      // if(labelDistance)
      const minDistance = intersects[0].distance;

      if(minDistance<labelDistance){
        chinaLabel.element.classList.remove('visible');
      }else{
        chinaLabel.element.classList.add('visible');
      }
      
    }
  
    const time = elapsed/10%1;
    const point = curve.getPoint(time);

    moon.position.copy(point);
    // camera.position.copy(point)
    // camera.lookAt(earth.position)
    // 标签渲染器渲染
    labelRenderer.render(scene,camera);
  
    renderer.render(scene, camera);
  }
  
  
  </script>
  
  <style>
  
  * {
    margin: 0;
    padding: 0;
  }
  .earthScene {
    position: relative;;
  }
  
  .label{
    color: #fff;
    /* font-size: 1rem; */
  }
  
  .label1{
    color: #fff;
    display: none;
    /* font-size: 1rem; */
  }
  
  
  
  .label1.visible{
    display: block;
  }
  
  
  </style>
  