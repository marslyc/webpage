<template>
    <div id="bone" ref="" class="boxx">
        
        <div class="box-main">
            <!-- <canvas id="c" class="box-c" ref="canvasScene"></canvas> -->
            <div ref="colorScene" class="box-color">vnm</div>
            <div ref="carScene" class="box-car">fdhfd</div>
            <div ref="boneScene" class="box-bone">gfds</div>
            <div ref="b1Scene" class="box-bone">gjd</div>
            <div ref="b2Scene" class="box-bone">gjh</div>
            <div ref="b3Scene" class="box-bone">khk</div>
        </div>
        
    </div>
</template>

<script setup>

import { onMounted, reactive, ref, onBeforeUnmount, compile } from 'vue';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
//每个场景控制器
import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls.js';
  
import gsap from 'gsap';
// import { scene, cameraFun, renderer  } from '../utils/initSet';

let canvasScene = ref(null)
let colorScene = ref(null)
let carScene = ref(null)
let boneScene = ref(null)
let b2Scene = ref(null)
let b3Scene = ref(null)




onMounted(() => {
    let sceneElements = []
    let addScene = (elem, fn) => {
        const ctx = document.createElement('canvas').getContext('2d');
        elem.appendChild(ctx.canvas)
        // sceneElements.push({elem, fn})
        sceneElements.push({elem, fn, ctx})

    }
    let makeScene = (elem) => {
        let scene = new THREE.Scene();
        scene.background = new THREE.Color(0xff0000);

        let camera = new THREE.PerspectiveCamera(
            45,
            // window.innerWidth / window. innerHeight,
            // cWidth / cHeight,
            2,
            0.1,
            5
        )
        camera.position.set(0,1,2)
        camera.lookAt(0, 0, 0);

        
        scene.add(camera)

        let controls = new TrackballControls(camera, elem)
        controls.noZoom = true;
        controls.noPan = true;

        let axesHelper = new THREE.AxesHelper(5)
        scene.add(axesHelper)


        const color = 0xFFFFFF;
        const intensity = 1;
        const light = new THREE.DirectionalLight(color, intensity);
        light.position.set(-1, 2, 4);
        camera.add(light);

        return { scene, camera, elem , controls}
    }

    let setupScene1 = () => {
        let { scene, camera, elem ,controls } = makeScene(colorScene.value)
        const material = new THREE.LineBasicMaterial({
            linewidth: 2,
            vertexColors: true
        });
        // 创建空几何体
        let curve = new THREE.QuadraticBezierCurve3(
            new THREE.Vector3(10,10,0),
            new THREE.Vector3(-10,-10,0),
            new THREE.Vector3(5,-10,0),
        )
        let points = curve.getPoints(3)
        let pos = []
        points.forEach(item=> {
            pos.push(item.x,item.y,item.z)
        })
        const geometry = new THREE.BufferGeometry().setFromPoints( points );
        let col = [1, 0, 0,  0, 1, 0,  0, 0, 1,   1, 1, 0 ]
        let coll = new THREE.Float32BufferAttribute( col, 3 )
        geometry.setAttribute( 'color', coll);

        const mesh = new THREE.Line(geometry, material);
        // sceneInfo.scene.add(mesh);
        // sceneInfo.mesh = mesh
        scene.add(mesh);

        addScene(elem, (time,rect)=> {
            camera.aspect = rect.width / rect.height;
            camera.updateProjectionMatrix();
            controls.handleResize()
            controls.update()
            renderer.render(scene, camera)
        })
        // return sceneInfo;
    }
    let setupScene2 = () => {
        // let sceneInfo = makeScene(carScene.value)
        let { scene, camera, elem, controls } = makeScene(carScene.value)
        const geometry = new THREE.BoxGeometry(1, 1, 1);
        const material = new THREE.MeshPhongMaterial({color: 'red'});
        const mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh);
        // sceneInfo.mesh = mesh;
        // return sceneInfo;
        addScene(elem, (time,rect)=> {
            camera.aspect = rect.width / rect.height;
            camera.updateProjectionMatrix();
            controls.handleResize()
            controls.update()
            renderer.render(scene, camera)
        })
    }
    
    // const sceneInfo1 = setupScene1();
    // const sceneInfo2 = setupScene2();
    // const canvas = document.querySelector('#c');
    const canvas = document.createElement('canvas');
    let renderer = new THREE.WebGLRenderer(
        {  antialias: true, 
            canvas, 
            alpha: true
        }
    )
    renderer.setScissorTest(true)
    // renderer.setSize(window.innerWidth, window.innerHeight)
    // renderer.setSize(cWidth, cHeight)
    // 开启场景中的阴影贴图
    // renderer.shadowMap.enabled = true;
    // renderer.physicallyCorrectLights = true;
    // renderer.setClearColor(0xcccccc, 1);

    let renderSceneInfo = (sceneInfo)=> {
        let { scene, camera, elem }  = sceneInfo;
        let { left, right, top, bottom, width, height } = elem.getBoundingClientRect();
        // console.log(left, right, top, bottom, width, height,elem,'eeee')


        // 185 503 5 306 318 301 
        // 513 831 5 306 318 301


        // let rect = elem.getBoundingClientRect()
        let isOffscreen = 
            bottom < 0 ||
            top > renderer.domElement.clientHeight ||
            right < 0 ||
            left > renderer.domElement.clientWidth;

        // console.log(elem,renderer.domElement, top,'isOffscreen')
        // console.log(elem,right,renderer.domElement.clientWidth,'isOffscreen1111')
        if(isOffscreen) return;

        camera.aspect = width / height;
        camera.updateProjectionMatrix();

        // let canvasRect = canvasScene.value.getBoundingClientRect();
        // console.log(canvasRect.height,bottom,'canvasRect')
        let positiveYUpBottom = height - bottom + 640
        renderer.setScissor(left - 180, positiveYUpBottom, width, height);
        renderer.setViewport(left - 180 , positiveYUpBottom, width, height);
        // console.log(left, positiveYUpBottom, width, height,'445')
        renderer.render(scene, camera)

        // console.log(renderer,scene, camera, elem)
    }

    let resizeRendererToDisplaySize = (renderer)=> {

        const canvas = renderer.domElement;

        const width = canvas.clientWidth;

        const height = canvas.clientHeight;

        const needResize = canvas.width !== width || canvas.height !== height;

        if (needResize) {

            renderer.setSize(width, height, false);

        }

        return needResize;

    }


// let cWidth = colorScene.value.clientWidth
// console.log(cWidth,'twid')
// let cHeight = 400;
// let scene = new THREE.Scene();
// let camera = cameraFun(cWidth,cHeight)
// new THREE.PerspectiveCamera(
//     90,
//     // window.innerWidth / window. innerHeight,
//     cWidth / cHeight,
//     0.1,
//     100000
// )
// camera.position.set(0,2,2)
// 更新摄像头
// camera.aspect = window.innerWidth / window.innerHeight
// camera.aspect = cWidth / cHeight
//   更新摄像机的投影矩阵
// camera.updateProjectionMatrix()
// scene.add(camera)

// let axesHelper = new THREE.AxesHelper(5)
// scene.add(axesHelper)




       

// 创建一个金属球添加到场景中
// const geometry = new THREE.SphereGeometry(1, 32, 32);
// const material1 = new THREE.MeshStandardMaterial({
//   color: 0xffffff,
//   metalness: 0.5,
// });
// const sphere = new THREE.Mesh(geometry, material1);
// sphere.position.set(-2, 0, 0);
// scene.add(sphere);




// let resize = () => {

//     // camera.aspect = window.innerWidth / window.innerHeight
//     // camera.aspect = cWidth / cHeight
//     camera.updateProjectionMatrix()

//     renderer.setSize(window.innerWidth, window.innerHeight)
//     // renderer.setSize(cWidth, cHeight)
//     renderer.setPixelRatio(window.devicePixelRatio)
// }
// window.addEventListener('resize', resize)

// let controls = new OrbitControls(camera, renderer.domElement)
// controls.enableDamping = true



let clock = new THREE.Clock()
let maxScrollY = 0

setupScene1()
setupScene2()

// let scrollY = 0
// let boxx = document.querySelector('.boxx')
// let doxMain = document.querySelector('.box-main')

// console.log(boxx.getBoundingClientRect(),doxMain.getBoundingClientRect(),)
// let maxY = doxMain.getBoundingClientRect().height - boxx.getBoundingClientRect().height
// boxx.addEventListener('scroll', (e) => {
   
//     scrollY = e.target.scrollTop
//     // console.log(scrollY,maxY,'ppppppp')
// })
// console.log(sceneElements,'sceneElements')
let animate = ()=> {

// console.log(renderer.domElement.style,'render')
    let time = clock.getDelta()
    // if(mixer) {
    //     mixer.update(time)
    // }
    // let doxMain = document.querySelector('.boxx')
    // let scrollY = doxMain.getBoundingClientRect()
    // console.log(doxMain.target,scrollY)
    // maxScrollY = scrollY
    
    // console.log(scrollY,transform)
    // if(scrollY > maxY) {
    //     scrollY = maxY
    // }
    // if(scrollY < maxY) {
        // console.log(scrollY,maxY,'yyyyyyyy')
        // const transform = `translateY(${scrollY}px)`;
        // renderer.domElement.style.transform = transform;
        // renderer.domElement.style.position = 'absolute';
        // console.log(renderer.domElement,'ssss')
    // }
    

    // resizeRendererToDisplaySize(renderer);
    // let clearColor = new THREE.Color(0xffffff);
    // renderer.setScissorTest(false);
    // renderer.setClearColor(clearColor, 0);
    // renderer.clear(true, true);
    // renderer.setScissorTest(true);

    
    for( let { elem, fn, ctx } of sceneElements) {

        console.log(elem, ctx,'cccc')
        const rect = elem.getBoundingClientRect();
        const {left, right, top, bottom, width, height} = rect;
        
        const rendererCanvas = renderer.domElement;
        // console.log(rendererCanvas.width,rendererCanvas.height,'lllll')
        let pLeft = left - 180
        let wWidth = window.innerWidth - 180
        const isOffscreen =
        bottom < 0 ||
        // top > renderer.domElement.clientHeight ||
        top > window.innerHeight ||
        right < 0 ||
        pLeft > wWidth;
 
        if (!isOffscreen) {
            // const positiveYUpBottom = renderer.domElement.clientHeight - bottom;
            // renderer.setScissor(pLeft, positiveYUpBottom, width, height);
            // renderer.setViewport(pLeft, positiveYUpBottom, width, height);
            if(rendererCanvas.width < width || rendererCanvas.height < height){
                renderer.setSize(width, height,false)
            }
            if(ctx.canvas.width !== width || ctx.canvas.height !== height) {
                ctx.canvas.width = width;
                ctx.canvas.height = height;
            }
            renderer.setScissor(0, 0, width, height);
            renderer.setViewport(0, 0, width, height);

            fn(time, rect);

            ctx.globalCompositeOperation = 'copy';
            ctx.drawImage(
                rendererCanvas,
                0, rendererCanvas.height - height, width, height,
                0, 0, width, height
            )
        }
    }

    // renderSceneInfo(sceneInfo1)
    // renderSceneInfo(sceneInfo2)
    // controls.update()
    requestAnimationFrame(animate)
    // renderer.render(scene, camera)
}
animate()


// onMounted(() => {
    // colorScene.value.appendChild(renderer.domElement)
    // carScene.value.appendChild(renderer.domElement)
    // boneScene.value.appendChild(renderer.domElement)
})
// onBeforeUnmount(()=> {
//   window.removeEventListener("resize", resize);
// })

</script>
<style scoped>
.boxx {
    position: relative;
    overflow: auto;
}

.box-main {
    position: relative;
    /* background: #fff; */
    display: flex;
    flex-wrap: wrap;
}
/* #c {
    position: absolute;
    top: 0;
    left: 0;
    background: red;
    width: 100%;
    height: 100%;
    display: block;
    z-index: -1;
} */
canvas {
  width: 100%;
  height: 100%;
  display: block;
}

.box-main div {
    /* width: 400px;
    height: 300px; */
    display: inline-block;
    min-width: 300px;
    min-height: 300px;
    flex: 1 0 0;
    /* background: #eee; */
    margin: 5px;
    border: 1px solid black;
}
</style>