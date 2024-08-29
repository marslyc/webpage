import * as THREE from "three";
import gsap from "gsap";
import vertex from '@/components/shader/flyLine/vertex.glsl'
import fragment from '@/components/shader/flyLine/fragment.glsl'

export default class FlyLineShader {
    constructor(position = { x: 4, z: 2 }, color = 0x00ffff) {
        // 设置点
        let linePoints= [
            new THREE.Vector3(0,0,0),
            new THREE.Vector3(position.x / 2,4,position.z / 2),
            new THREE.Vector3(position.x,0,position.z)
        ]
        // 生成曲线
        this.lineCurve = new THREE.CatmullRomCurve3(linePoints)

        let points = this.lineCurve.getPoints(1000)
        // 创建几何顶点
        this.geometry = new THREE.BufferGeometry().setFromPoints(points)


        // 给每一个顶点设置属性
        let aSizeArray = new Float32Array(points.length)
        for (let i = 0; i < aSizeArray.length; i++) {
            aSizeArray[i] = i
        }

        // 设置几何体顶点属性
        this.geometry.setAttribute(
            'aSize',
            new THREE.BufferAttribute(aSizeArray,1)
        )

        // 3/设置着色器材质
        this.shaderMaterial = new THREE.ShaderMaterial({
            uniforms: {
                uTime: { 
                    value: 0
                },
                uColor: {
                    value: new THREE.Color(color),
                },
                uLength: {
                    value: points.length,
                },
            },
            vertexShader: vertex,
            fragmentShader: fragment,
            transparent: true,
            depthWrite: false,
            blending: THREE.AdditiveBlending,
        })

        this.mesh = new THREE.Points(this.geometry,this.shaderMaterial);

        // 5/创建飞线的动画
        gsap.to(this.shaderMaterial.uniforms.uTime, {
            value: 1000,
            duration: 2,
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