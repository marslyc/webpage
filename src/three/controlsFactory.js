import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import cameraModule from "./cameraFactory";
import rendererModule from "./rendererFactory";
import eventHub from "@/utils/eventHub";

// 初始化控制器
const controls = new OrbitControls(cameraModule.activeCamera, rendererModule.renderer.domElement);
// 设置控制器阻尼
controls.enableDamping = true;
// 设置自动旋转
// controls.autoRotate = true;

class ControlModule {
    constructor() {
        this.controls = controls;
    }
}

export default new ControlModule();