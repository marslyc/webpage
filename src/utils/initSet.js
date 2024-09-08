import * as THREE from 'three';

let scene = new THREE.Scene();
let cameraFun = (cWidth = window.innerWidth, cHeight= window.innerHeight) => {
    return new THREE.PerspectiveCamera(
        90,
        // window.innerWidth / window. innerHeight,
        cWidth / cHeight,
        0.1,
        10000
    )
}

// camera.position.set(0,2,2)
// 更新摄像头
// camera.aspect = window.innerWidth / window.innerHeight
// camera.aspect = cWidth / cHeight
//   更新摄像机的投影矩阵
// camera.updateProjectionMatrix()
// scene.add(camera)

let axesHelper = new THREE.AxesHelper(5)
// scene.add(axesHelper)

let renderer = new THREE.WebGLRenderer()

export {
    scene,
    cameraFun,
    renderer
}