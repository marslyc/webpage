import * as THREE from "three";
import scene from "../scene";

import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import modifyCityMaterial from "../modify/modifyCityMaterial";
import MeshLine from "./MeshLine";
import FlyLine from "./FlyLine";
import FlyLineShader from "./FlyLineShader";
import LightRadar from "./LightRadar";
import LightWall from "./LightWall";
import AlarmSprite from "./AlarmSprite";
const createCity = () => {
    let gltf = new GLTFLoader();
    let gSrc = new URL("@/images/model/city.glb", import.meta.url).href;
    gltf.load(gSrc, (gltf) => {

        // 更改材质
        gltf.scene.traverse(item=> {

            if(item.type == "Mesh") {
                let cityMaterial = new THREE.MeshBasicMaterial(
                    {
                        color: new THREE.Color(0x0c0e33)
                    }
                )
                item.material = cityMaterial
                modifyCityMaterial(item)
                // 给建筑物添加边框
                if(item.name == 'Layerbuildings') {
                    let meshLine = new MeshLine(item.geometry)
                    let size = item.scale.x
                    meshLine.mesh.scale.set(size,size,size)
                    scene.add(meshLine.mesh)
                }
            }
        })

        scene.add(gltf.scene)

        // 添加飞线
        // let flyLine = new FlyLine()
        // scene.add(flyLine.mesh)

        // 添加着色器飞线
        // let flyLineShader = new FlyLineShader()
        // scene.add(flyLineShader.mesh)

        // 添加雷达
        // const lightRadar = new LightRadar();
        // scene.add(lightRadar.mesh);

        // 添加光墙
        // const lightWall = new LightWall();
        // scene.add(lightWall.mesh);

        // 添加警告标识
        // const alarmSprite = new AlarmSprite();
        // scene.add(alarmSprite.mesh);
        // alarmSprite.onClick(function (e) {
        //     console.log("警告", e);
        // });
    })
}

export default createCity;
