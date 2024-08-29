import * as THREE from "three";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader.js";

let scene = new THREE.Scene();
let rgbeLoader = new RGBELoader();
let rsrc = new URL('@/images/2k.hdr', import.meta.url).href;
rgbeLoader.loadAsync(rsrc).then((texture) => {
    texture.mapping = THREE.EquirectangularReflectionMapping;
    scene.background = texture;
    scene.environment = texture;
})

const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(10, 100, 10);
scene.add(light);

export default scene;