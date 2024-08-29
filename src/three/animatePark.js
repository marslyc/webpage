
import * as THREE from "three";
import renderer from "./rendererPark"
import scene from "./scenePark"
import cameraModule from "./cameraPark"
import controlsModule from "./controlsPark"
import { updateMesh } from './createMeshPark';
const clock = new THREE.Clock()
function animate(t) {
    
    const time = clock.getDelta()
    controlsModule.controls.update(time)
    updateMesh(time)
    requestAnimationFrame( animate)
    
    renderer.render(scene, cameraModule.activeCamera)
}

export default animate;