
import * as THREE from "three";
let camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  // 设置相机位置
// object3d具有position，属性是1个3维的向量
camera.position.set(5, 10, 15);

export default camera;