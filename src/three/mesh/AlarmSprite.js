import * as THREE from "three";
import camera from "@/three/camera";

export default class AlarmSprite {
    constructor( type = '电力' , position = {x: -1.8,z:3},color = 0xffffff) {

        let textureLoader = new THREE.TextureLoader();
        let typeObj = {
            火警: new URL("@/images/textures/city/tag/fire.png",import.meta.url).href,
            治安: new URL("@/images/textures/city/tag/jingcha.png",import.meta.url).href,
            电力: new URL("@/images/textures/city/tag/e.png",import.meta.url).href,
        }

        let map = textureLoader.load(typeObj[type])
        this.material = new THREE.SpriteMaterial({
            map: map,
            color: color,
            transparent: true,
            depthTest: false,
        })


        this.mesh = new THREE.Sprite(this.material);
        // 设置位置
        this.mesh.position.set(position.x, 3.5, position.z);

        // 封装点击事件
        this.fns = [];
        // 创建射线
        this.raycaster = new THREE.Raycaster();
        this.mouse = new THREE.Vector2();

        window.addEventListener('click', (event) => {
            this.mouse.x = (event.clientX / window.innerWidth) * 2 -1
            this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1
            this.raycaster.setFromCamera(this.mouse, camera)

            event.mesh = this.mesh;
            event.alarm = this;

            let intersects = this.raycaster.intersectObject(this.mesh)
            if(intersects.length > 0) {
                this.fns.forEach(fn => {
                    fn(event)
                })
            }
        })
    }

    onClick(fn) {
        this.fns.push(fn)
    }
    remove() {
        this.mesh.remove();
        this.mesh.removeFromParent();
        this.mesh.geometry.dispose();
        this.mesh.material.dispose();
    }
}