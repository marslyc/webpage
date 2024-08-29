import * as THREE from "three";
import gsap from "gsap";
import vertex from '@/components/shader/lightWall/vertex.glsl'
import fragment from '@/components/shader/lightWall/fragment.glsl'

export default class LightWall {
    constructor(
        radius = 5, 
        length = 2,
        position = { x: 0, z: 0 },
        color = 0xff0000
    ) {

        // 创建几何
        this.geometry = new THREE.CylinderGeometry(
            radius,
            radius,
            2,
            32,
            1,
            true
        )

        // 3/设置着色器材质
        this.material = new THREE.ShaderMaterial({
            vertexShader: vertex,
            fragmentShader: fragment,
            transparent: true,
            side: THREE.DoubleSide
        })

        this.mesh = new THREE.Mesh(this.geometry,this.material);
        
        this.mesh.position.set(position.x, 1, position.z);1

        this.mesh.geometry.computeBoundingBox();

        let { min, max } = this.mesh.geometry.boundingBox;
        // 获取物体的高度差
        let uHeight = max.y - min.y
        this.material.uniforms.uHeight = {
            value: uHeight
        }

        // 光墙动画
        gsap.to(this.mesh.scale, {
            x: length,
            z: length,
            duration: 1,
            repeat: -1,
            ease: "none",
          });
    }
    remove() {
        this.mesh.remove();
        this.mesh.removeFromParent();
        this.mesh.geometry.dispose();
        this.mesh.material.dispose();
      }
}