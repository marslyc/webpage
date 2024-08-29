import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';

import Stats from 'three/examples/jsm/libs/stats.module.js';    
import gsap from 'gsap';
let stats = new Stats();
// document.body.appendChild(stats.dom)

let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(
    90,
    window.innerWidth / window. innerHeight,
    0.1,
    100000
)
camera.position.set(0,2,2)
// 更新摄像头
camera.aspect = window.innerWidth / window.innerHeight
//   更新摄像机的投影矩阵
camera.updateProjectionMatrix()
scene.add(camera)

let axesHelper = new THREE.AxesHelper(5)
scene.add(axesHelper)


// let directionalLight = new THREE.DirectionalLight(0xffffff, 1)
// scene.add(directionalLight);
// const light = new THREE.AmbientLight(0xffffff, 0.5); // soft white light
// scene.add(light);

// let plane = new THREE.Mesh(
//     new THREE.PlaneGeometry(10, 10),
//     new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide })
// )
// scene.add(plane)

let rgbeLoader = new RGBELoader()
// let rSrc = new URL('@/images/textures/038.hdr', import.meta.url).href
let rSrc = new URL('@/images/textures/Dosch-Space_0026_4k.hdr', import.meta.url).href

rgbeLoader.load(rSrc,(texture) => {
    texture.mapping = THREE.EquirectangularReflectionMapping
    scene.background = texture
    scene.environment = texture
})

let cSrc = new URL('@/images/textures/cloth_pos.png', import.meta.url).href
let cnSrc = new URL('@/images/textures/cloth_norm.png', import.meta.url).href
let textureLoader = new THREE.TextureLoader()
let texture = textureLoader.load(cSrc)
let normalMap = textureLoader.load(cnSrc)
texture.wrapS = THREE.RepeatWrapping;
texture.wrapT = THREE.RepeatWrapping;
texture.repeat.set(0.2, 0.2);
normalMap.wrapS = THREE.RepeatWrapping;
normalMap.wrapT = THREE.RepeatWrapping;
normalMap.repeat.set(0.2, 0.2);
texture.offset.set(0, 0);

gsap.to(texture.offset, {
  x: 3,
  y: 1,
  duration: 1,
  repeat: -1,
  onUpdate: function () {
    texture.needsUpdate = true;
  },
});


let mixer;
// 添加gbl文件
let gltfLoader = new GLTFLoader()
let dracoLoader = new DRACOLoader()
dracoLoader.setDecoderPath('/draco/gltf/')
dracoLoader.setDecoderConfig({type: 'js'})
dracoLoader.preload()
gltfLoader.setDRACOLoader(dracoLoader)
// let gSrc = new URL('@/images/model/min.glb', import.meta.url).href
let gSrc = new URL('@/images/model/jianshen-min.glb', import.meta.url).href
gltfLoader.load(gSrc,(gltf)=> {
    scene.add(gltf.scene)

    gltf.scene.traverse(child=> {

        // if(child.name == 'Body') {
        //     child.material = new THREE.MeshStandardMaterial({
        //         color: 0xffffff
        //     })
        // }
        // if (child.name == "Floor") {
        //     // child.material = new THREE.MeshStandardMaterial({
        //     //     color: 0xffffff,
        //     // });
        // }
        if (child.isMesh) {
            // child.material.depthWrite = true
            // child.material.normalScale = new THREE.Vector2(1,1)
            // child.material.side = THREE.FrontSide;
            // child.material.transparent = false;
            // child.material.vertexColors = false;
            child.material = new THREE.MeshStandardMaterial({
                map: texture,
                normalMap: normalMap, 
                side: THREE.DoubleSide,
                transparent: true,
                blending: THREE.AdditiveBlending,
                depthWrite: false,
                emissiveMap: texture
            })
        }
    })

    mixer = new THREE.AnimationMixer(gltf.scene)
    let actions = mixer.clipAction(gltf.animations[0])
    actions.play()
    actions.timeScale = 2;

    // let ambientLight  = new THREE.AmbientLight(0xffffff, 1)
    // scene.add(ambientLight)
    // 添加平行光;
    const light = new THREE.DirectionalLight(0xffffff, 2);
    light.position.set(0, 100, 100);
    scene.add(light);
},
(xhr)=>{
    console.log(xhr.loaded / xhr.total * 100 + '% loaded')
}
)

// 创建一个金属球添加到场景中
// const geometry = new THREE.SphereGeometry(1, 32, 32);
// const material1 = new THREE.MeshStandardMaterial({
//   color: 0xffffff,
//   metalness: 0.5,
// });
// const sphere = new THREE.Mesh(geometry, material1);
// sphere.position.set(-2, 0, 0);
// scene.add(sphere);


let renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
// 开启场景中的阴影贴图
renderer.shadowMap.enabled = true;
renderer.physicallyCorrectLights = true;
renderer.setClearColor(0xcccccc, 1);

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()

    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(window.devicePixelRatio)
})

let controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true

let clock = new THREE.Clock()
let animate = ()=> {

    let time = clock.getDelta()
    if(mixer) {
        mixer.update(time)
    }
    
    controls.update()
    stats.update()
    requestAnimationFrame(animate)
    renderer.render(scene, camera)
}
animate()

export default renderer

