import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import gsap from "gsap";
import cameraModule from "../cameraPark";
import eventHub from "@/utils/eventHub";
import { camelize } from "vue";

export default class Park {
    constructor(scene) {
        this.scene = scene;

        this.loader = new GLTFLoader();
        const dracoLoader = new DRACOLoader();

        dracoLoader.setDecoderPath('/draco/gltf/');
        
        this.loader.setDRACOLoader(dracoLoader);
        let gSrc = new URL("@/images/model/city4.glb", import.meta.url).href;
        this.loader.load(gSrc, (gltf) => {

            scene.add(gltf.scene)
            // 更改材质
            this.gltf = gltf
            gltf.scene.traverse(item=> {
            
                if(item.name == '汽车园区轨迹') {

                    let line = item
                    line.visible = false
                    let points = []
                    for(let i = line.geometry.attributes.position.count - 1;i>=0 ;i--) {
                        points.push(
                            new THREE.Vector3(
                                line.geometry.attributes.position.getX(i),
                                line.geometry.attributes.position.getY(i),
                                line.geometry.attributes.position.getZ(i),
                            )
                        )
                    }

                    this.curve = new THREE.CatmullRomCurve3(points)
                    this.curveprogress = 0
                    this.carAnimation()

                }

                if(item.name == 'redcar') {

                    this.redcar = item;
                }
            })

            gltf.cameras.forEach((camera) => {
                cameraModule.add(camera.name,camera)
            })

        })
    }
    update(time) {
       if(this.mixer) {
        this.mixer.update(time)
       } 
    }
    carAnimation() {
        gsap.to(this, {
            curveprogress: 0.999,
            duration: 30,
            repeat: -1,
            onUpdate: () => {
                let point = this.curve.getPoint(this.curveprogress)
                this.redcar.position.set(point.x,point.y,point.z)
                if(this.curveprogress + 0.001 < 1) {
                    let point = this.curve.getPoint(this.curveprogress + 0.001)
                    this.redcar.lookAt(point)
                }
                
            } 
        })
    }
}


