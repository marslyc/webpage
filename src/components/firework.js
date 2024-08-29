/*
 * @Description: 
 * @Author: yuchao
 * @Date: 2024-08-01 18:29:58
 * @LastEditors: yuchao
 * @LastEditTime: 2024-08-02 18:50:17
 */
import * as THREE from 'three';
import startPointFragment from '../components/shader/startpoint/fragment.glsl';
import startPointVertex from '../components/shader/startpoint/vertex.glsl';
import fireworkFragment from '../components/shader/firework/fragment.glsl';
import fireworkVertex from '../components/shader/firework/vertex.glsl';

export default class Firework {
    constructor(color,to,from={x:0,y:0,z:0}) {

        this.color = new THREE.Color(color);
        // 开始位置
        this.startGeometry = new THREE.BufferGeometry();
        let startPositionArray = new Float32Array(3);
        startPositionArray[0] = from.x
        startPositionArray[1] = from.y
        startPositionArray[2] = from.z

        this.startGeometry.setAttribute(
            'position', 
            new THREE.BufferAttribute(startPositionArray,3)
        )

        let astepArray = new Float32Array(3)
        astepArray[0] = to.x - from.x
        astepArray[1] = to.y - from.y
        astepArray[2] = to.z - from.z
        this.startGeometry.setAttribute(
            'aStep',
            new THREE.BufferAttribute(astepArray,3)
        )

        this.startMaterial = new THREE.ShaderMaterial({
            vertexShader: startPointVertex,
            fragmentShader: startPointFragment,
            transparent: true,
            blending: THREE.AdditiveBlending,
            depthWrite: false,
            uniforms: {
                uTime: {
                    value: 0
                },
                uSize: {
                    value: 20.0
                },
                uColor: { 
                    value: this.color 
                },
            }
        })

        // 创建点
        this.startPoint = new THREE.Points(this.startGeometry,this.startMaterial)
        // 开始计时
        this.clock = new THREE.Clock()

        // 创建爆炸烟花
        this.fireworkGeometry = new THREE.BufferGeometry()
        this.fireworkCount = 180 + Math.floor(Math.random() *180);
        let positionFireworkArray = new Float32Array(this.fireworkCount * 3);
        let scaleFireArray = new Float32Array(this.fireworkCount)
        let directionArray = new Float32Array(this.fireworkCount * 3)
        for(let i=0;i<this.fireworkCount;i++) {
            // 开始时位置
            positionFireworkArray[i * 3 + 0] = to.x;
            positionFireworkArray[i * 3 + 1] = to.y;
            positionFireworkArray[i * 3 + 2] = to.z;

            // 初始化大小
            scaleFireArray[i] = Math.random()

            // 向四周发射的角度
            let theta = Math.random() * 2 * Math.PI;
            let beta = Math.random() * 2 * Math.PI;
            let r = Math.random();

            directionArray[i * 3 + 0] = r*Math.sin(theta) +r*Math.sin(beta)
            directionArray[i * 3 + 1] = r*Math.cos(theta) +r*Math.cos(beta)
            directionArray[i * 3 + 2] = r*Math.sin(theta) +r*Math.cos(beta)
        }
        this.fireworkGeometry.setAttribute(
            'position',
            new THREE.BufferAttribute(positionFireworkArray,3)
        )

        this.fireworkGeometry.setAttribute(
            'aScale',
            new THREE.BufferAttribute(scaleFireArray,1)
        )

        this.fireworkGeometry.setAttribute(
            'aRandom',
            new THREE.BufferAttribute(directionArray,3)
        )

        this.fireworkMaterial = new THREE.ShaderMaterial({
            uniforms: {
                uTime: {
                    value: 0
                },
                uSize: {
                    value: 0
                },
                uColor: { 
                    value: this.color 
                },
            },
            transparent: true,
            blending: THREE.AdditiveBlending,
            depthWrite:  false,
            vertexShader: fireworkVertex,
            fragmentShader: fireworkFragment
        })
        this.fireworks = new THREE.Points(
            this.fireworkGeometry,
            this.fireworkMaterial
        )

        // 创建音频
        this.linstener = new THREE.AudioListener();
        this.linstener1 = new THREE.AudioListener();
        this.sound = new THREE.Audio(this.linstener)
        this.sendSound = new THREE.Audio(this.linstener1)

        // 音频加载
        let audioSrc = new URL(`../images/audio/pow${Math.floor(Math.random() * 4) + 1}.ogg`,import.meta.url).href;
        let audioLoader = new THREE.AudioLoader();
        audioLoader.load(
            audioSrc,
            (buffer)=> {
                this.sound.setBuffer(buffer)
                this.sound .setLoop(false)
                this.sound.setVolume(1)
            }
        )
        let audioSendSrc = new URL(`../images/audio/send.mp3`,import.meta.url).href;
        audioLoader.load(
            audioSendSrc,
            (buffer)=> {
                this.sendSound.setBuffer(buffer)
                this.sendSound .setLoop(false)
                this.sendSound.setVolume(1)
            }
        )

    }
    //   添加到场景
    addScene(scene,camera) {
        scene.add(this.startPoint)
        scene.add(this.fireworks)
        this.scene = scene;
    }
    update() {
        let elapsedTime = this.clock.getElapsedTime()
        if(elapsedTime > 0.2 && elapsedTime < 1) {
            if(!this.sendSound.isPlaying && !this.sendSoundplay) {
                this.sendSound.play();
                this.sendSoundplay = true;
            }
            this.startMaterial.uniforms.uTime.value = elapsedTime
            this.startMaterial.uniforms.uSize.value = 20.0

        } else if(elapsedTime > 0.2){
            let time = elapsedTime - 1;
           
            // 元素消失
            this.startMaterial.uniforms.uSize.value = 0
            this.startPoint.clear();
            this.startGeometry.dispose();
            this.startMaterial.dispose();

            if(!this.sound.isPlaying &&  !this.play) {
                this.sound.play();
                this.play = true;
            }

            // 设置烟花显示
            this.fireworkMaterial.uniforms.uSize.value = 20
            this.fireworkMaterial.uniforms.uTime.value = time
            if(time > 5) {
                this.fireworkMaterial.uniforms.uSize.value = 0;
                this.fireworks.clear();
                this.fireworkGeometry.dispose();
                this.fireworkMaterial.dispose();
                this.scene.remove(this.fireworks)
                this.scene.remove(this.startPoint)
                return 'remove';
            }
        }
        
    }
}