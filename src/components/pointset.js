import * as THREE from 'three'

let pointset = function(){

  let sphereGeometry = new THREE.SphereGeometry(3, 30, 30)
  let pointsMaterial = new THREE.PointsMaterial()
  pointsMaterial.size = 0.1
  pointsMaterial.color.set(0xfff000)
  // 相机深度而衰减
  pointsMaterial.sizeAttenuation = true;

  // 载入纹理
const textureLoader = new THREE.TextureLoader();
let textureSrc = new URL('../images/textures/particles/1.png',import.meta.url).href
const texture = textureLoader.load(textureSrc);
// // 设置点材质纹理
pointsMaterial.map = texture;
// pointsMaterial.alphaMap = texture;
// pointsMaterial.transparent = true;
// pointsMaterial.depthWrite = false;
// pointsMaterial.blending = THREE.AdditiveBlending;

  return new THREE.Points(sphereGeometry,pointsMaterial)

}

export default pointset;