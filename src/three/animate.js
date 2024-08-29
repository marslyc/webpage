
import * as THREE from "three";
import renderer from "./renderer"
import scene from "./scene"
import camera from "./camera"
import controls from "./controls"
const clock = new THREE.Clock()
function animate(t) {
    controls.update()
    const time = clock.getElapsedTime()
    requestAnimationFrame( animate)
    
    renderer.render(scene, camera)
}

export default animate;