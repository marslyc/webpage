import * as THREE from "three";
import gsap from "gsap";

export default class FlyLine {
    constructor() {
        // 设置点
        let linePoints= [
            new THREE.Vector3(0,0,0),
            new THREE.Vector3(5,4,0),
            new THREE.Vector3(10,0,0)
        ]
        // 生成曲线
        this.lineCurve = new THREE.CatmullRomCurve3(linePoints)

        // 根据曲线生成管道几何体
        this.geometry = new THREE.TubeGeometry(
            this.lineCurve,
            100,
            0.4,
            2,
            false
        )
        // 设置材质
        let tSrc = new URL('@/images/textures/city/z_11.png',import.meta.url).href;
        let textureLoader = new THREE.TextureLoader()
        this.texture = textureLoader.load(tSrc)
        this.texture.repeat.set(1,2)
        this.texture.wrapS = THREE.RepeatWrapping
        this.texture.wrapT = THREE.MirroredRepeatWrapping
        // 4/创建飞线物体
        this.material = new THREE.MeshBasicMaterial({
            map: this.texture,
            transparent: true,
        })
        this.mesh = new THREE.Mesh(this.geometry,this.material)

        // 5/创建飞线的动画
        gsap.to(this.texture.offset, {
            x: -1,
            duration: 1,
            repeat: -1,
            ease: 'none'
        })
    }
}