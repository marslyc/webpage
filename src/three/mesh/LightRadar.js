import * as THREE from "three";
import gsap from "gsap";
import vertex from '@/components/shader/lightRadar/vertex.glsl'
import fragment from '@/components/shader/lightRadar/fragment.glsl'

export default class FlyLineShader {
    constructor(radius = 2, position = { x: 0, z: 0 },color = 0xff0000) {

        // 创建几何
        this.geometry = new THREE.PlaneGeometry(radius,radius)

        // 3/设置着色器材质
        this.material = new THREE.ShaderMaterial({
            uniforms: {
                uTime: { 
                    value: 0
                },
                uColor: {
                    value: new THREE.Color(color),
                }
            },
            vertexShader: vertex,
            fragmentShader: fragment,
            transparent: true,
            side: THREE.DoubleSide
        })

        this.mesh = new THREE.Mesh(this.geometry,this.material);
        
        this.mesh.position.set(position.x, 1, position.z);
        this.mesh.rotation.x = -Math.PI / 2;
        // 5/创建飞线的动画
        gsap.to(this.material.uniforms.uTime, {
            value: 1,
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