import * as THREE from "three";

let renderer = new THREE.WebGLRenderer({
    // 抗锯齿
    antialias: true,

    logarithmicDepthBuffer: true,
    physicallyCorrectLights: true,
});



// 设置渲染尺寸大小
renderer.setSize(window.innerWidth, window.innerHeight);
// 分辨路
// renderer.setPixelRatio(window.devicePixelRatio);

// 开启阴影
renderer.shadowMap.enabled = true;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.5;

export default renderer;