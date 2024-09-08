

<template>
    <div id='box1' ref="pageScene" class="pageScene">
      
      <div class="page page0">
        <h1>魔方与投射光线</h1>
        <h3>THREE.Raycaster实现3d交互效果</h3>
      </div>
      <div class="page page1">
        <h1>酷炫三角形</h1>
        <h3>应用打造酷炫的三角形</h3>
      </div>
      <div class="page page2">
        <h1>点光源</h1>
        <h3>点光源围绕照亮小球</h3>
      </div>
      <!-- <div ref="pageScene" class="pageScene"></div> -->
    </div>
  </template>
  
  <script setup>
  import * as THREE from "three";
  // 导入轨道控制器
  import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
  // 导入动画库
  import gsap from "gsap";
  import { ref ,onMounted, onUnmounted} from "vue";

  let pageScene = ref(null)
  
  // 1、创建场景
  const scene = new THREE.Scene();
  
  // 2、创建相机
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    300
  );
  
  // 设置相机位置
  camera.position.set(0, 0, 18);
  scene.add(camera);
  
  
  // 创建box
  let boxGeometry = new THREE.BoxGeometry(2,2,2)
  
  let material = new THREE.MeshBasicMaterial({
    wireframe: true,
  })
  let redMaterial = new THREE.MeshBasicMaterial({
    color: '#ff0000'
  })
  let cubeArr = [];
  let cubeGroup = new THREE.Group()
  for(let i = 0;i< 5;i++) {
    for(let j = 0;j< 5;j++) {
      for(let z = 0;z< 5;z++) {
        let cube = new THREE.Mesh(boxGeometry,material)
        cube.position.set(i * 2 - 4, j * 2 - 4, z * 2 - 4);
        cubeGroup.add(cube)
        cubeArr.push(cube)
      }
    }
  }
  cubeGroup.position.set(0,-4,0)
  scene.add(cubeGroup)
  
  let sjxGroup = new THREE.Group()
  
  for(let i = 0; i < 50; i++){
      let mlgeometry = new THREE.BufferGeometry()
      let positionArray = new Float32Array(9)
      for(let j = 0; j < 9; j++){
          positionArray[j] = Math.random() * 10 - 5
      }
      mlgeometry.setAttribute('position',new THREE.BufferAttribute(positionArray,3))
      let mlcolors = new THREE.Color(Math.random(),Math.random(),Math.random())
      const mlmaterial = new THREE.MeshBasicMaterial({
      color: mlcolors,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.5
      })
      let mlcube = new THREE.Mesh(mlgeometry,mlmaterial)
      sjxGroup.add(mlcube)
  }
  sjxGroup.position.set(0, -34, 0);
  scene.add(sjxGroup)
  
  
  // 弹跳小球
  let smallBallGroup = new THREE.Group()
  // 平面
  const planeGeometry = new THREE.PlaneGeometry(20,20);
  const sbmaterial = new THREE.MeshStandardMaterial();
  const plane = new THREE.Mesh(planeGeometry, sbmaterial);
  plane.position.set(0, -1, 0);
  plane.rotation.x = -Math.PI / 2;
  // 接收阴影
  plane.receiveShadow = true;
  smallBallGroup.add(plane);
  
  const sphereGeometry = new THREE.SphereGeometry(1, 20, 20);
  const spherematerial = new THREE.MeshStandardMaterial({
    side: THREE.DoubleSide,
  });
  const sphere = new THREE.Mesh(sphereGeometry, spherematerial);
  // 投射阴影
  sphere.castShadow = true;
  
  smallBallGroup.add(sphere);
  
  // 点光源
  let pointLight = new THREE.PointLight(0xff0000, 1)
  // pointLight.position.set(5, 5, 5);
  pointLight.castShadow = true;
  
  // 设置阴影贴图模糊度
  pointLight.shadow.radius = 20;
  // 设置阴影贴图的分辨率
  pointLight.shadow.mapSize.set(512, 512);
  
  // pointLight.distance = 0;
  // pointLight.penumbra = 0;
  pointLight.decay = 0;
  
  smallBallGroup.add(pointLight)
  
  // 创建一个小球
  let smallBall = new THREE.Mesh(
    new THREE.SphereGeometry(0.1,20,20),
    new THREE.MeshBasicMaterial({ color: 0xff0000 })
  )
  smallBall.position.set(2, 2, 2);
 
  smallBall.add(pointLight);
  smallBallGroup.add(smallBall)
  
  
  smallBallGroup.position.set(0, -64, 0);
  scene.add(smallBallGroup);
  
  let arrGroup = [cubeGroup, sjxGroup, smallBallGroup];
  // 初始化渲染器
  const renderer = new THREE.WebGLRenderer({
    alpha: true,
  });
  // 设置渲染的尺寸大小{}
  renderer.setSize(window.innerWidth, window.innerHeight);
  // 开启场景中的阴影贴图
  renderer.shadowMap.enabled = true;
  renderer.physicallyCorrectLights = true;
  
  
  
  // // 使用渲染器，通过相机将场景渲染进来
  // renderer.render(scene, camera);
  
  // 创建轨道控制器
  // const controls = new OrbitControls(camera, renderer.domElement);
  // // 设置控制器阻尼，让控制器更有真实效果,必须在动画循环里调用.update()。
  // controls.enableDamping = true;
  
  // 添加坐标轴辅助器
  // const axesHelper = new THREE.AxesHelper(5);
  // scene.add(axesHelper);
  // 设置时钟
  const clock = new THREE.Clock();
  
  gsap.to(cubeGroup.rotation, {
    x: "+=" + Math.PI * 2,
    y: "+=" + Math.PI * 2,
    duration: 5,
    ease: 'power1.inOut',
    repeat: -1,
  })
  gsap.to(sjxGroup.rotation, {
    x: "-=" + Math.PI * 2,
    z: "+=" + Math.PI * 2,
    duration: 12,
    ease: "power2.inOut",
    repeat: -1,
  });
  gsap.to(smallBall.position, {
    x: -3,
    duration: 6,
    ease: "power2.inOut",
    repeat: -1,
    yoyo: true,
  });
  gsap.to(smallBall.position, {
    y: 0,
    duration: 0.5,
    ease: "power2.inOut",
    repeat: -1,
    yoyo: true,
  });
  // gsap.to(smallBall.position, {
  //   z: 0,
  //   duration: 0.5,
  //   ease: "power2.inOut",
  //   repeat: -1,
  //   yoyo: true,
  // });
  
  // 投射光线
  let raycaster = new THREE.Raycaster()
  let mouse = new THREE.Vector2()
  let clickHandler = (event) => {
    mouse.x = ((event.clientX - 180) / window.innerWidth) * 2 - 1
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1

    raycaster.setFromCamera(mouse, camera)
    let result = raycaster.intersectObjects(cubeArr)

    if(result[0]) {
      result[0].object.material = redMaterial
    }
    // result.forEach(item=> {
    //   item.object.material = redMaterial
    // })
  }
  window.addEventListener('click',clickHandler)
  let mousemoveHandler = (event) => {
    mouse.x = (event.clientX / window.innerWidth) - 0.5
    mouse.y = -(event.clientY / window.innerHeight) - 0.5
  
  }
  window.addEventListener('mousemove', mousemoveHandler)
  let scrollY = 0
  function render() {
    // let time = clock.getElapsedTime();
    let deltaTime = clock.getDelta();
    // sjxGroup.rotation.x = time *0.4;
    // sjxGroup.rotation.y = time *0.5;
  
    // smallBall.position.x = Math.sin(time) * 3;
    // smallBall.position.z = Math.cos(time) * 3;
    // smallBall.position.y = 2 + Math.sin(time * 10) / 2;
    // smallBallGroup.rotation.z = Math.sin(time) * 0.05;
    // smallBallGroup.rotation.x = Math.sin(time) * 0.05;
  
    camera.position.y = -(scrollY / window.innerHeight) *30
    camera.position.x += (mouse.x * 10 - camera.position.x) * deltaTime * 5;

    // controls.update();
    renderer.render(scene, camera);
    //   渲染下一帧的时候就会调用render函数
    requestAnimationFrame(render);
  }
  // 设置当前页
  let currentPage = 0
  let scrollHandler = (event) => {
    let domEL = document.querySelector('.right-content')

    scrollY = - document.querySelector('.page0').getBoundingClientRect().top
      let newPage = Math.round(scrollY / window.innerHeight)
      if(newPage !== currentPage) {
        currentPage = newPage

        gsap.to(arrGroup[currentPage].rotation, {
          z: "+=" + Math.PI * 2,
          duration: 1,
          ease: "power1.inOut"
        })
    
        // gsap.to(`.page${currentPage} h1`, {
        //   rotate: "+=360",
        //   duration: 1,
        // });
        gsap.fromTo(
          `.page${currentPage} h1`,
          { x: -300 },
          { x: 0, rotate: "+=360", duration: 1 }
        );
      }
  }
  onMounted(()=> {
    pageScene.value.appendChild(renderer.domElement);
    render();

    
    // 监听滚动
    
    let domEL = document.querySelector('.right-content')

    domEL.addEventListener('scroll',scrollHandler)
    // window.addEventListener('scroll',scrollHandler)
  
  })
  onUnmounted(()=> {

    let domEL = document.querySelector('.right-content')
    domEL.removeEventListener('scroll',scrollHandler)

    window.removeEventListener('click',clickHandler)
    window.removeEventListener('mousemove', mousemoveHandler)
    window.removeEventListener("resize", resizeHandler);
  })
  let resizeHandler = () => {

    // 更新摄像头
    camera.aspect = window.innerWidth / window.innerHeight;
    //   更新摄像机的投影矩阵
    camera.updateProjectionMatrix();
  
    //   更新渲染器
    renderer.setSize(window.innerWidth, window.innerHeight);
    //   设置渲染器的像素比
    renderer.setPixelRatio(window.devicePixelRatio);
  }
  // 监听画面变化，更新渲染画面
  window.addEventListener("resize", resizeHandler);
 
  
  
  </script>
  
  <style >
 * {
  margin: 0;
  padding: 0;
}
#box1 {
  background-color: rgb(36, 58, 66) !important;
  overflow: auto;
  position: relative;
}
/* .pageScene {
  overflow: auto;
  position: absolute;
  height: 300vh;
  top: 0;
  left: 0;
} */
canvas {
  position: fixed;
  left: 180px;
  top: 0;
}
.page {
  height: 100vh;
  display: flex;
  color: #fff;
  flex-direction: column;
  /* justify-content: center; */
  align-items: center;
  position: relative;
  z-index: 10;
}
.page h1 {
  margin: 60px;
  font-size: 40px;
}

.page h3 {
  font-size: 30px;
}
::-webkit-scrollbar {
  display: none;
}

  
  </style>
  