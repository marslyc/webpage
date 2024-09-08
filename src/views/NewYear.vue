<template>
    <div id="bone" ref="boneScene"></div>
</template>

<script setup>

import { onMounted, reactive, ref, onBeforeUnmount } from 'vue';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';

  
import gsap from 'gsap';

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




let material;
// 加载模型
let dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath("/draco/");
const loader = new GLTFLoader();
loader.setDRACOLoader(dracoLoader);
let nySrc = new URL("@/images/model/newyear.glb", import.meta.url).href;
loader.load(nySrc, function (gltf) {
    console.log(gltf);

    let text = gltf.scene.children[0];

    scene.add(text);

    let geometry = text.geometry;
    const position = geometry.attributes.position;
    const vertexCount = position.count;
    const triangleCount = vertexCount / 3;

    const randomDirections = [];
    const randomStrengths = [];

    for (let i = 0; i < triangleCount; i++) {
        const dir = new THREE.Vector3(
        Math.random() * 2 - 1,
        Math.random() * 2 - 1,
        Math.random() * 2 - 1
        )
        .normalize()
        .toArray();

        console.log(dir);
        randomDirections.push(dir[0], dir[1], dir[2]);
        const str = Math.random();
        randomStrengths.push(str, str, str);
    }

    const randomDirectionsAttribute = new THREE.Float32BufferAttribute(
        new Float32Array(randomDirections),
        3
    );

    geometry.setAttribute("randomDirection", randomDirectionsAttribute);
    const randomStrengthsAttribute = new THREE.Float32BufferAttribute(
        new Float32Array(randomStrengths),
        1
    );
    geometry.setAttribute("randomStrength", randomStrengthsAttribute);

    // 定义着色器材质
    material = new THREE.ShaderMaterial({
        uniforms: {
            time: { value: 1 },
        },
        vertexShader: `
        attribute vec3 randomDirection;
        attribute float randomStrength;
        uniform float time;
        varying vec3 vPosition;

        void main() {
            vPosition = position;
            vec3 pos = position.xyz;
            pos += randomDirection * randomStrength * time;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(pos.xyz, 1.0);
        }
        `,
        fragmentShader: `
        varying vec3 vPosition;
        void main() {
            vec3 color = normalize(vPosition)*0.5+0.5;
            color.z = color.z*3.0;
            gl_FragColor = vec4(color,1.0);
        }
        `,
        side: THREE.DoubleSide,
        transparent: true,
    });
    text.material = material;
});

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

let resize = () => {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()

    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(window.devicePixelRatio)
}
window.addEventListener('resize', resize)

let controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true

let clock = new THREE.Clock()
let animate = ()=> {

    let time = clock.getDelta()
    if(mixer) {
        mixer.update(time)
    }
    
    controls.update()
    requestAnimationFrame(animate)
    renderer.render(scene, camera)
}
animate()

let boneScene = ref(null)
onMounted(() => {
    boneScene.value.appendChild(renderer.domElement)
})
onBeforeUnmount(()=> {
  window.removeEventListener("resize", resize);
})

</script>