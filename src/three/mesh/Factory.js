import * as THREE from "three";

import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import { CSS3DObject } from "three/examples/jsm/renderers/CSS3DRenderer";
import cameraModule from "../cameraFactory";
import gsap from "gsap";
import eventHub from "@/utils/eventHub";
import fragmentShader from "@/components/shader/fighter/fragment.glsl";
import vertexShader from "@/components/shader/fighter/vertex.glsl";

class createFactory {
    constructor(scene) {
        let gltfLoader = new GLTFLoader();
        let dracoLoader = new DRACOLoader();
        dracoLoader.setDecoderPath("/draco/");
        dracoLoader.setDecoderConfig({ type: "js"})
        dracoLoader.preload();
        gltfLoader.setDRACOLoader(dracoLoader)

        this.scene = scene;
        this.floor1Group;
        this.floor2Group;
        this.wallGroup;
        this.floor2Tags = [];
        let array = ["小型会议室", "核心科技室", "科技展台", "设计总监办公室"];

        let gSrc2 = new URL("@/images/model/floor2.glb", import.meta.url).href;
        gltfLoader.load(gSrc2, (gltf) => {
            this.floor2Group = gltf.scene
            // 更改材质
            gltf.scene.traverse(child=> {
                if (child.isMesh) {
                    child.material.emissiveIntensity = 15;
                    // child.receiveShadow = true;
                    // child.castShadow = true;
                }
                if(array.indexOf(child.name) != -1) {
                    let css3dObject = this.createTag(child)
                    this.floor2Tags.push(css3dObject);
                    this.floor2Group.add(css3dObject)
                }

            })

            scene.add(this.floor2Group)

        })

        let fSrc = new URL("@/images/model/Fighter1.glb", import.meta.url).href;
        gltfLoader.load(fSrc, (gltf) =>{
            this.fighterGroup = gltf.scene;
            scene.add(this.fighterGroup)
            this.fighterGroup.position.set(3, 42, 68);
            this.fighterGroup.traverse(child=> {
                if(child.isMesh) {
                    child.material.emissiveIntensity = 15;
                    child.position2 = child.position.clone()
                }
            })
            
            this.mouse = new THREE.Vector2();
            this.raycaster = new THREE.Raycaster();
            // 监听点击
            window.addEventListener('click', (event) => {
                event.mesh = this;
                // 将鼠标位置归一化为设备坐标。x 和 y 方向的取值范围是 (-1 to +1)
                this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
                this.mouse.y = -((event.clientY / window.innerHeight) * 2 - 1);

                //通过摄像机和鼠标位置更新射线
                this.raycaster.setFromCamera(this.mouse, cameraModule.activeCamera);

                //进行检测
                const intersects = this.raycaster.intersectObject(this.fighterGroup);
                if (intersects.length > 0) {
                    console.log('点击了飞机')
                }
            })
            
            
        })
        this.initEvent();
    }

    update(time) {
        if (this.mixer) {
            this.mixer.update(time);
        }
    }
    createTag(object3d) {
        // 创建各个区域的元素
        const element = document.createElement("div");
        element.className = "elementTag";
        element.innerHTML = `
        <div class="elementContent">
            <h3>${object3d.name}</h3>
            <p>温度：30℃</p>
            <p>湿度：40%</p>
        </div>
        `;

        const objectCSS3D = new CSS3DObject(element);
        objectCSS3D.position.copy(object3d.position);
        objectCSS3D.scale.set(0.2, 0.2, 0.2);
        return objectCSS3D;
    }

    
    initEvent() {
        eventHub.on('flatFighter',()=> {
            let positions = []
            for (var i = 0; i < 5; i++) {
                for (var j = 0; j < 5; j++) {
                  positions.push(new THREE.Vector3(i * 2 - 2, j * 2 - 2, 0));
                }
              }
            let n = 0
            this.fighterGroup.traverse(child=> {
                if(child.isMesh) {
                    // child.position.copy(positions[n].multiplyScalar(20))
                    positions[n].multiplyScalar(10);
                    
                    gsap.to(child.position,{
                        x: "+=" + positions[n].x,
                        y: "+=" + positions[n].y,
                        z: "+=" + positions[n].z,
                        duration: 1,
                    })
                    n++;
                }
            })
        })
        eventHub.on('recoverFighter',()=> {
            this.fighterGroup.traverse(child=> {
                if(child.isMesh) {

                    gsap.to(child.position,{
                        x: child.position2.x,
                        y: child.position2.y,
                        z: child.position2.z,
                        duration: 1,
                    })
                }
            })
        })
        eventHub.on('pointsFighter',()=> {
            this.createPoints(this.fighterGroup)
        })
        eventHub.on("pointsBlast", () => {
            this.pointsBlast();
        });
        eventHub.on("pointsBack", () => {
            this.pointsBack();
        });
    }
    createPoints(object3d) {
        if (!this.fighterPointsGroup) {
          this.fighterPointsGroup = this.transformPoints(object3d);
          this.scene.add(this.fighterPointsGroup);
        }
      }
      transformPoints(object3d) {
        // 创建纹理图像
        let tSrc = new URL("@/images/textures/particles/1.png", import.meta.url).href;
        const texture = new THREE.TextureLoader().load(tSrc);
        const group = new THREE.Group();
    
        function createPoints(object3d, newObject3d) {
          if (object3d.children.length > 0) {
            object3d.children.forEach((child) => {
              if (child.isMesh) {
                // 随机生成颜色
                const color = new THREE.Color(
                  Math.random(),
                  Math.random(),
                  Math.random()
                );
                // const material = new THREE.PointsMaterial({
                //   size: 0.1,
                //   color: color,
                //   map: texture,
                //   blending: THREE.AdditiveBlending,
                //   transparent: true,
                //   depthTest: false,
                // });
    
                const material = new THREE.ShaderMaterial({
                  uniforms: {
                    uColor: { value: color },
                    uTexture: { value: texture },
                    uTime: {
                      value: 0,
                    },
                  },
                  vertexShader: vertexShader,
                  fragmentShader: fragmentShader,
                  blending: THREE.AdditiveBlending,
                  transparent: true,
                  depthTest: false,
                });
                const points = new THREE.Points(child.geometry, material);
                points.position.copy(child.position);
                points.rotation.copy(child.rotation);
                points.scale.copy(child.scale);
                newObject3d.add(points);
                createPoints(child, points);
              }
            });
          }
        }
    
        createPoints(object3d, group);
        // object3d.traverse((child) => {
        //   if (child.isMesh) {
        //     const points = child.geometry.attributes.position.array;
        //     const geometry = new THREE.BufferGeometry();
        //     geometry.setAttribute(
        //       "position",
        //       new THREE.Float32BufferAttribute(points, 3)
        //     );
    
        //     // 随机生成颜色
        //     const color = new THREE.Color(
        //       Math.random(),
        //       Math.random(),
        //       Math.random()
        //     );
        //     const material = new THREE.PointsMaterial({
        //       size: 0.1,
        //       color: color,
        //     });
        //     const pointsMesh = new THREE.Points(geometry, material);
        //     pointsMesh.position.copy(child.position);
        //     pointsMesh.rotation.copy(child.rotation);
        //     pointsMesh.scale.copy(child.scale);
        //     group.add(pointsMesh);
        //   }
        // });
        return group;
      }

    pointsBlast(){
        this.fighterPointsGroup.traverse((child)=>{
            if(child.isPoints) {
   
                let randomPositionArray = new Float32Array(
                    child.geometry.attributes.position.count * 3
                )
                for(let i = 0; i < child.geometry.attributes.position.count; i++) {
                    randomPositionArray[i * 3 + 0] = (Math.random() * 2 - 1) * 10;
                    randomPositionArray[i * 3 + 1] = (Math.random() * 2 - 1) * 10;
                    randomPositionArray[i * 3 + 2] = (Math.random() * 2 - 1) * 10;
                }
                child.geometry.setAttribute(
                    'aPosition',
                    new THREE.BufferAttribute(randomPositionArray,3)
                )
                gsap.to(child.material.uniforms.uTime,{
                    value: 10,
                    duration: 5,
                })
            }
        })
        
    }

    pointsBack() {
        this.fighterPointsGroup.traverse((child)=>{
            if(child.isPoints) {
                gsap.to(child.material.uniforms.uTime,{
                    value: 0,
                    duration: 5,
                })
            }
        })
    }
    
}

export default createFactory;
