<template>
    <div id="bone" ref="" class="boxx">
        
        <div class="box-main">
            <canvas id="c" class="box-c" ref="canvasScene"></canvas>
            <div ref="colorScene" class="box-color">顶点颜色渲染</div>
            <div ref="carScene" class="box-car">网格模型</div>
            <div ref="sphereScene" class="box-bone">球缓冲体</div>
            <div ref="b1Scene" class="box-bone">纹理贴图</div>
            <div ref="b2Scene" class="box-bone">模型加载</div>
            <div ref="b3Scene" class="box-bone">自定义</div>
        </div>
        
    </div>
</template>

<script setup>

import { onMounted, reactive, ref, onBeforeUnmount, compile, watch, watchEffect } from 'vue';
import * as THREE from 'three';

import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
//每个场景控制器
import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls.js';
// 导入FontLoader
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";
// 导入TextGeometry
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";
import gsap from 'gsap';


let canvasScene = ref(null)
let colorScene = ref(null)
let carScene = ref(null)
let sphereScene = ref(null)
let b1Scene = ref(null)
let b2Scene = ref(null)
let b3Scene = ref(null)

let maxY = 0
let resize = () => {
    let boxx = document.querySelector('.boxx')
    maxY = boxx.scrollHeight - boxx.clientHeight
    // console.log(boxx.clientHeight,boxx.scrollHeight,'sssrrrr')
}


onMounted(() => {
    let sceneElements = []
    let addScene = (elem, fn) => {
        sceneElements.push({elem, fn})
    }
    let makeScene = (elem) => {
        let scene = new THREE.Scene();
        // scene.background = new THREE.Color(0xff0000);

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

        let axesHelper = new THREE.AxesHelper(0.5)
        scene.add(axesHelper)

        

        const color = 0xFFFFFF;
        const intensity = 1;

        let amLight = new THREE.AmbientLight(color, intensity);
        scene.add(amLight)
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
            new THREE.Vector3(0.5,0.5,0),
            new THREE.Vector3(-0.5,-1,0),
            new THREE.Vector3(1,-0.5,0),
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
            // console.log(time,'time')
            camera.aspect = rect.width / rect.height;
            camera.updateProjectionMatrix();
            controls.handleResize()
            controls.update()
            // mesh.rotation.y = time * 0.1
            // mesh.rotation.y = -Math.PI / 2 * time;
            renderer.render(scene, camera)
        })
        // return sceneInfo;
    }
    let setupScene2 = () => {
        // let sceneInfo = makeScene(carScene.value)
        let { scene, camera, elem, controls } = makeScene(carScene.value)
        const geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
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
            mesh.rotation.y += 0.01;
            renderer.render(scene, camera)
        })
    }
    let setupScene3 = () => {
        let { scene, camera, elem, controls } = makeScene(sphereScene.value)
       // 创建一个球添加到场景中
        const geometry = new THREE.SphereGeometry(0.5, 7, 4, 0.8, Math.PI);
        
        // const material1 = new THREE.MeshStandardMaterial({
        const material1 = new THREE.MeshPhysicalMaterial({
            wireframe: true,
            color: 0x0000ff ,
            side: THREE.DoubleSide,
            // metalness: 0.5, // 金属度
            // roughness: 0.2, //粗糙度
            // envMapIntensity: 1.0 // 环境光强度，1.0表示正常
            // emissive:"#ff0000",
            //     emissiveIntensity:0.5,
        });
        const mesh = new THREE.Mesh(geometry, material1);
        mesh.position.set(0, 0, 0);
        scene.add(mesh);
        addScene(elem, (time,rect)=> {
            camera.aspect = rect.width / rect.height;
            camera.updateProjectionMatrix();
            controls.handleResize()
            controls.update()
            renderer.render(scene, camera)
        })
    }
    let setupScene4 = () => {
        let { scene, camera, elem, controls } = makeScene(b1Scene.value)
       // 创建一个金属球添加到场景中
       let mSrc = new URL('@/images/textures/planets/earth_atmos_2048.jpg',import.meta.url).href
        let sSrc = new URL('@/images/textures/planets/earth_specular_2048.jpg',import.meta.url).href
        let nSrc = new URL('@/images/textures/planets/earth_normal_2048.jpg',import.meta.url).href
        let textureLoader = new THREE.TextureLoader();
        const earthGeometry = new THREE.SphereGeometry(0.5, 32, 32);
        const earthMaterial = new THREE.MeshPhongMaterial({
            specular: 0x333333,
            shininess: 5,
            map: textureLoader.load(mSrc),
            specularMap: textureLoader.load(sSrc),
            normalMap: textureLoader.load(nSrc),
            normalScale: new THREE.Vector2(0.85, 0.85),
        });
    
        let mesh = new THREE.Mesh(earthGeometry, earthMaterial);
        // earth.rotation.y = Math.PI;
        scene.add(mesh);
        addScene(elem, (time,rect)=> {
            camera.aspect = rect.width / rect.height;
            camera.updateProjectionMatrix();
            controls.handleResize()
            controls.update()
            mesh.rotation.y += 0.01;
            renderer.render(scene, camera)
        })
    }
    let setupScene5 = () => {
        // let sceneInfo = makeScene(carScene.value)
        let { scene, camera, elem, controls } = makeScene(b2Scene.value)
        camera.position.set(2, 1, 0);

        const loader = new THREE.TextureLoader();
        let bgSrc = new URL("@/images/050.jpg", import.meta.url).href;
        const bgTexture = loader.load(bgSrc);
        bgTexture.mapping = THREE.EquirectangularRefractionMapping;

        scene.background = bgTexture;
        scene.environment = bgTexture;
        // 加载小熊模型
        const gltfLoader = new GLTFLoader();
        let lineSrc = new URL("@/images/model/lion.gltf", import.meta.url).href;
        gltfLoader.load(lineSrc, (gltf) => {
            // console.log(gltf,'gltfff');
            const model = gltf.scene.children[0];
            model.material = new THREE.MeshPhongMaterial({
                color: 0xffffff,
                envMap: bgTexture,
                refractionRatio: 0.7,
                reflectivity: 0.99,
            });

            scene.add(model);
        });
        addScene(elem, (time,rect)=> {
            camera.aspect = rect.width / rect.height;
            camera.updateProjectionMatrix();
            controls.handleResize()
            controls.update()
            renderer.render(scene, camera)
        })
    }
    // let setupScene6 = () => {
    //     // let sceneInfo = makeScene(carScene.value)
    //     let { scene, camera, elem, controls } = makeScene(b3Scene.value)
        // camera.position.set(2, 1, 0);
        // 加载字体
        // const loader = new FontLoader();
        // let fontSrc = new URL('@/images/fonts/FangSong_Regular.json', import.meta.url).href
        // loader.load(fontSrc, (font) => {
        //     console.log(font,'ffffffffffff')
        //     const geometry = new TextGeometry("新年快乐", {
        //         font: font, // 字体
        //         size: 80, // 字体大小
        //         depth: 5, // 字体厚度
        //         curveSegments: 12, // 曲线分段数
        //         bevelEnabled: true, // 是否启用斜角
        //         bevelThickness: 10, // 斜角厚度
        //         bevelSize: 2, // 斜角大小
        //         bevelSegments: 5, // 斜角分段数
        //     });
        //     geometry.center();
        //     // 设置字体材质
        //     const material = new THREE.MeshPhysicalMaterial({
        //         color: 0xeeeeff,
        //         roughness: 0,
        //         reflectivity: 1,
        //         thickness: 80,
        //         ior: 1.5,
        //         transmission: 1,
        //         side: THREE.DoubleSide,
        //         emissive: 0xffeeff,
        //         emissiveIntensity: 0.1,
        //     });
        //     // 创建字体
        //     const mesh = new THREE.Mesh(geometry, material);
        //     scene.add(mesh);
        // });
        

    //     addScene(elem, (time,rect)=> {
    //         camera.aspect = rect.width / rect.height;
    //         camera.updateProjectionMatrix();
    //         controls.handleResize()
    //         controls.update()
    //         renderer.render(scene, camera)
    //     })
    // }
    
    // const sceneInfo1 = setupScene1();
    // const sceneInfo2 = setupScene2();
    const canvas = document.querySelector('#c');
    let renderer = new THREE.WebGLRenderer(
        {  antialias: true, 
            canvas, 
            alpha: true
        }
    )
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

setupScene1()
setupScene2()
setupScene3()
setupScene4()
setupScene5()
// setupScene6()

// 获取滚动条所在元素
let boxx = document.querySelector('.boxx')
maxY = boxx.scrollHeight - boxx.clientHeight
// let resize = () => {
//     let boxx = document.querySelector('.boxx')
//     maxY = boxx.scrollHeight - boxx.clientHeight
//     // console.log(boxx.clientHeight,boxx.scrollHeight,'sssrrrr')
// }
window.addEventListener("resize", resize);

let scrollY = 0
let bScroll = (e) => {
    
    scrollY = e.target.scrollTop
    if(scrollY < maxY) {
        let boxMain = document.querySelector('.box-main')
        let bheight = boxMain.clientHeight

        const transform = `translateY(${scrollY}px)`;
        let caDom = document.querySelector('#c')
        caDom.style.position = 'absolute';
        caDom.style.transform = transform;
        caDom.style.height = (bheight -scrollY)  + 'px';

    }
}
boxx.addEventListener('scroll', bScroll)

// let boxColor = document.querySelector('.box-color')
// let boxMain = document.querySelector('.box-main')
// let bheight = boxMain.clientHeight

let animate = ()=> {

    let time = clock.getDelta()

    // let doxMain = document.querySelector('.boxx')
    // let scrollY = doxMain.getBoundingClientRect()


    // if(scrollY && lastScrollY != scrollY && scrollY < maxY) {
    //     console.log(scrollY,maxY,renderer.domElement.style,'yyyyyyyy')
    //     const transform = `translateY(${scrollY}px)`;
    //     let caDom = document.querySelector('#c')
    //     // caDom.style.transform = transform;
    //     caDom.style.position = 'absolute';
    //     // // renderer.domElement.style.top = - scrollY + 'px';
    //     // caDom.style.background = 'green'
    //     // caDom.style.height = '100%'
    //     console.log(caDom.style.height,'ssss')
    
    // console.log(-boxColor.getBoundingClientRect().y + 5,maxY,'222222222222')
    // let scoY = -boxColor.getBoundingClientRect().y + 5

    
    // let scrollY = doxMain.getBoundingClientRect()
    // console.log(doxMain.target,'6666666')
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


    //     // renderer.domElement.style.transform = transform;
    //     // renderer.domElement.style.position = 'absolute';
    //     // // renderer.domElement.style.top = - scrollY + 'px';
    //     // renderer.domElement.style.background = 'green'
    //     // renderer.domElement.style.height = '100%'
    //     // console.log(renderer.domElement.style.height,'ssss')
    // }
    // if(scoY < maxY) {
    //     console.log(scoY,maxY,bheight,'yyyyyyyy33333333333')
    //     const transform = `translateY(${scoY}px)`;
    //     renderer.domElement.style.transform = transform;
    //     renderer.domElement.height = (bheight - scoY)  + 'px';
    // } else {

    // }
    


    resizeRendererToDisplaySize(renderer);
    let clearColor = new THREE.Color(0xffffff);
    renderer.setScissorTest(false);
    renderer.setClearColor(clearColor, 0);
    renderer.clear(true, true);
    renderer.setScissorTest(true);

    
    for( let { elem, fn } of sceneElements) {
        const rect = elem.getBoundingClientRect();
        const {left, right, top, bottom, width, height} = rect;
        // console.log(left,renderer.domElement.clientWidth,'lllll')
        let pLeft = left - 180
        const isOffscreen =
        bottom < 0 ||
        top > renderer.domElement.clientHeight ||
        right < 0 ||
        pLeft > renderer.domElement.clientWidth;
 
        if (!isOffscreen) {
            const positiveYUpBottom = renderer.domElement.clientHeight - bottom;
            renderer.setScissor(pLeft, positiveYUpBottom, width, height);
            renderer.setViewport(pLeft, positiveYUpBottom, width, height);
        
            fn(time, rect);
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
    // sphereScene.value.appendChild(renderer.domElement)
})
onBeforeUnmount(()=> {
  window.removeEventListener("resize", resize);
//   window.addEventListener("resize", resize);
})

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
#c {
    position: absolute;
    top: 0;
    left: 0;
    /* background: red; */
    width: 100%;
    height: 100%;
    display: block;
    z-index: -1;
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