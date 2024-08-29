import * as THREE from "three";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader.js";
let scene = new THREE.Scene();
// let src1 = new URL('@/images/textures/city/1.jpg', import.meta.url).href;
// let src2 = new URL('@/images/textures/city/2.jpg', import.meta.url).href;
// let src3 = new URL('@/images/textures/city/3.jpg', import.meta.url).href;
// let src4 = new URL('@/images/textures/city/4.jpg', import.meta.url).href;
// let src5 = new URL('@/images/textures/city/5.jpg', import.meta.url).href;
// let src6 = new URL('@/images/textures/city/6.jpg', import.meta.url).href;
// let texture = new THREE.CubeTextureLoader().load([src1, src2, src3, src4, src5, src6])
// scene.background = texture;
// scene.environment = texture;

// let hdrLoader = new RGBELoader();
// let hSrc = new URL('@/images/023.hdr', import.meta.url).href;
// hdrLoader.loadAsync(hSrc).then((texture) => {
//     texture.mapping = THREE.EquirectangularReflectionMapping
//     scene.background = texture;
//     scene.environment = texture;
// })

let ambintLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambintLight);

let light = new THREE.DirectionalLight(0xffffff,5)
light.position.set(10, 100, 10);
scene.add(light)
export default scene;