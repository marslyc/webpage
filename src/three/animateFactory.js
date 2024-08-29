
import * as THREE from "three";
import rendererModule from "./rendererFactory"
import scene from "./sceneFactory"
import cameraModule from "./cameraFactory"
import controlModule from "./controlsFactory"
import eventHub from "@/utils/eventHub";
const clock = new THREE.Clock()
function animate(updateMesh,factory) {
    
    // const time = clock.getElapsedTime()
    let delta = clock.getDelta()
    // controlModule.controls.update(delta)
    controlModule.controls.update()
    // 更新物体
    updateMesh(delta);
    requestAnimationFrame( ()=> {
        animate(updateMesh,factory)
    })
    
    rendererModule.renderer.render(scene, cameraModule.activeCamera)
    rendererModule.css3drender.render(scene, cameraModule.activeCamera)
}

let cameraName = "main";

eventHub.on("toggleCamera", () => {

  if (cameraName === "main") {
    cameraName = "carCamera";
  } else {
    cameraName = "main";
  }
});

export default animate;