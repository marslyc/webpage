<template>
    <div id="map" class="mapScene" ref="mapScene"></div>
</template>

<script setup>

import { onMounted, reactive, ref, onBeforeUnmount } from 'vue';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

import { CSS2DObject, CSS2DRenderer } from 'three/examples/jsm/renderers/CSS2DRenderer.js';


import * as d3 from 'd3'


let mapScene = ref()
let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(
    90,
    window.innerWidth / window. innerHeight,
    0.1,
    100000
)
camera.position.set(0,0,100)
// 更新摄像头
camera.aspect = window.innerWidth / window.innerHeight
//   更新摄像机的投影矩阵
camera.updateProjectionMatrix()
scene.add(camera)

// let axesHelper = new THREE.AxesHelper(5)
// scene.add(axesHelper)


let directionalLight = new THREE.DirectionalLight(0xffffff, 1)
scene.add(directionalLight);
const light = new THREE.AmbientLight(0xffffff, 0.5); // soft white light
scene.add(light);


let renderer = new THREE.WebGLRenderer({antialias: true})
renderer.setSize(window.innerWidth, window.innerHeight)


let map = new THREE.Object3D()

let projection = d3.geoMercator().center([116.402, 39.915]).translate([0, 0, 0])
// 加载数据文件
let loader = new THREE.FileLoader()
let lSrc = new URL('@/images/map.json', import.meta.url).href
loader.load(lSrc, (data) => {
    
    let jsonData = JSON.parse(data)
    operationData(jsonData)

})

let lineData = []
let operationData = (jsonData) => {
    // 全国信息
    let features = jsonData.features
    features.forEach(feature => {

        // 省份
        let province = new THREE.Object3D()
        province.name = feature.properties.name
        let center = feature.properties.centroid || feature.properties.center
        let label = createLabel(center,feature.properties.name)
        if(center) {
            lineData.push(center)
        }
        
        if(label) {
            province.add(label)
        }
        

        let coordinates = feature.geometry.coordinates
        let color = "#99ff99"
        if(feature.geometry.type === 'MultiPolygon') {
            coordinates.forEach((coordinate)=> {
                coordinate.forEach((rows)=> {
                    let line = lineDraw(rows, color, projection)
                    let mesh = drawExtrudeMesh(rows, color, projection)
                    // 唯一标识
                    mesh.properties = feature.properties.name;
                    province.add(line)
                    province.add(mesh)
                })
            })
        }
        if(feature.geometry.type === 'Polygon') {
            coordinates.forEach((coordinate)=> {
                let line = lineDraw(coordinate, color, projection)
                let mesh = drawExtrudeMesh(coordinate, color, projection)
                // 唯一标识
                mesh.properties = feature.properties.name;
                province.add(line)
                province.add(mesh)
            })
        }

        map.add(province)
    });

    
    scene.add(map)


    // 添加航线
    let flyLine = createFlyline(lineData)
    // map.add(flyLine)
    // console.log(flyLine,'flyLine')

    
    // 包围盒
    // 
    // let box3 = new THREE.Box3().setFromObject(map)
    // console.log(box3,'mmmmmmmmmm')
    // let boxHelper = new THREE.Box3Helper(box3,0xff0000);
    // scene.add(boxHelper)
    // let mcenter = box3.getCenter(new THREE.Vector3())
    // console.log(mcenter,'mcenter')
    // map.position.x = map.position.x - mcenter.x
    // map.position.y = map.position.y - mcenter.y
}
// 画线
let lineDraw = (rows, color, projection) => {
    let lineGeometry = new THREE.BufferGeometry()
    let pointsArray = new Array()
    rows.forEach(row=> {
        let [x, y] = projection(row)
        pointsArray.push(new THREE.Vector3(x, -y, 3))
    })
    lineGeometry.setFromPoints(pointsArray)

    let lineColor = new THREE.Color(
        Math.random() * 0.5 + 0.5,
        Math.random() * 0.5 + 0.5,
        Math.random() * 0.5 + 0.5,
    )
    let lineMaterial = new THREE.LineBasicMaterial({
        color:lineColor
    })
    return new THREE.Line(lineGeometry,lineMaterial)

}
// 画区域
let drawExtrudeMesh = (rows, color, projection) => {
    let shape = new THREE.Shape()
    rows.forEach((row,i)=> {
        let [ x, y ] = projection(row)

        if(i === 0) {
            shape.moveTo(x, -y)
        }
        shape.lineTo(x, -y)
    })

    let geometry = new THREE.ExtrudeGeometry(shape,{
        depth: 3,
        bevelEnabled: false
    })

    let randomColor = ( Math.random() * 0.5 + 0.5) * 0x0000ff
    // let randomColor = ( Math.random() * 0.8 + 0.8) * 0x0000ff
    let material = new THREE.MeshBasicMaterial({
        color: randomColor,
        transparent: true,
        opacity: 0.5
    })
    return new THREE.Mesh(geometry,material)

}
// 添加文字
let createLabel = (row,name) => {

    if(row) {
        let [x, y] = projection(row)

        let posi = new THREE.Vector3(x * 1.0, -y* 1, 3)

        let labelDiv = document.createElement('div')
        labelDiv.style.color = "#ffffff";
        labelDiv.style.fontSize = "12px";
        labelDiv.style.textShadow = "1px 1px 2px #047cd6";
        // labelDiv.textContent = name;


        labelDiv.className = 'map-label';
        labelDiv.innerHTML = name
        // labelDiv.name = name
        let css2DObject = new CSS2DObject(labelDiv)
        css2DObject.scale.set(0.01, 0.01, 0.01);
        css2DObject.position.copy(posi)
        return css2DObject;
    }
    return;
}
// 添加航线，航线数据随机，从北京发出
let geoArr = [];
// 航线数量
let linNum = 8
// 每个航线分割点数
let pointClick = 10
let createFlyline = (lineData) => {

    let len = lineData.length
    
    let obj = lineData
    let firstPoint = obj[0]
    obj.shift()
    let result = []
    while(result.length < linNum * 2) {
        let index = Math.floor(Math.random() * len)
        if(obj[index]) {
            result.push(obj[index])
            result.push(firstPoint)
            obj.splice(index, 1)
        }
        
    }
    
    for(let i = 0; i < result.length; i += 2) {
        let [ x1, y1 ] = projection([result[i][0],result[i][1]])
        let point1 = new THREE.Vector3( x1, -y1, 5)

        let [x2, y2 ] = projection([result[i+1][0],result[i+1][1]])
        let point2 = new THREE.Vector3( x2, -y2, 5)

        // 中间点
        let minPoint = new THREE.Vector3((x1 + x2)/2, (-y1 + -x2)/2, 15)

        // 贝塞尔曲线
        let curve = new THREE.QuadraticBezierCurve3(point1,minPoint,point2)


        // scene.add(curve)
        let ppoints = curve.getPoints(pointClick)
 
        let geometry = new THREE.BufferGeometry().setFromPoints(ppoints)

        geometry.vertices = ppoints;
        // 设置顶点 colors 数组，与顶点数量和顺序保持一致。

        let col = []

        for(let i = 0;i < ppoints.length * 3; i+=3) {
            col[i] = 0;
            col[i+1] = 1;
            col[i+2] = 0;
        }

        let coll = new THREE.Float32BufferAttribute( col, 3 )
       
        geometry.setAttribute( 'color', coll);
        // geometry.colors = new Array(ppoints.length).fill(
        // // geometry.vertexColors = new Array(ppoints.length).fill(
        //     new THREE.Color(0x00ff00)
        //     // new THREE.Color(Math.random()*255, Math.random()*255, Math.random()*255)
        // );
        // geometry.attributes.color = new THREE.Color('#00ff00');

        
        geoArr.push(geometry)
        let lineMesh = new THREE.Line(
            geometry,
            new THREE.LineBasicMaterial({
                
                // vertexColors: THREE.VertexColors, // 顶点着色
                vertexColors: true, // 顶点着色
                transparent: true, // 定义此材质是否透明
                side: THREE.DoubleSide,
                opacity: 0.8,
                linewidth: 30,

                // color: 0x00ff00
            })
        )
        scene.add(lineMesh)
    }
    // let lineMesh = new THREE.Line(
    //     geoArr,
    //     new THREE.LineBasicMaterial({
    //         // vertexColors: THREE.vertexColors, // 顶点着色
    //         // transparent: true,
    //         // side: THREE.DoublessSide,
    //         // opacity: 0.8,
    //         // linewidth: 10
    //         color: 0xff0000
    //     })
    // )
    // return lineMesh;
    return geoArr;
}

// 航线动图
let timeStamp = 0;
let colorIndex = 0;
let lineAnimation = () => {
    
    // controls.update();
    let now = new Date().getTime()

    
    if(now - timeStamp > 100) {

        geoArr.forEach((item,ind) => {

            if(item) {
                // console.log(item,'iiiiiii')
                // item.colors = new Array(9)
                //         .fill(new THREE.Color('#333300'))
                //         // .fill(new THREE.Color('#ffffff'))
                //         .map((color,i)=> {
                //             // 如果分段索引和颜色索引相同，赋予指定颜色
                //             if(i == colorIndex) {
                //                 return new THREE.Color('#ffff00')
                //             }
                //             return color;
                //         })
                // 如果geometry.colors数据发生变化，colorsNeedUpdate值需要被设置为true
                
                let col = []

                for(let i = 0;i < (pointClick+1); i++) {
                    if(i == colorIndex) {
                        col.push(1)
                        col.push(1)
                        col.push(1)
                    } else {
                        col.push(0)
                        col.push(1)
                        col.push(0)
                    }
                }
                
       
                let coll = new THREE.Float32BufferAttribute( col, 3 )
            
                item.setAttribute( 'color', coll);

                item.needsUpdate = true

                colorIndex++
                if(colorIndex > linNum) {
                    colorIndex = 0
                }
            }
            
        })

        timeStamp = now
        
    }
    
}

let css2DRenderer = new CSS2DRenderer()
css2DRenderer.setSize(window.innerWidth, window.innerHeight);
css2DRenderer.domElement.style.position = 'absolute';
css2DRenderer.domElement.style.left = '0px';
css2DRenderer.domElement.style.top = '0px'
// css2DRenderer.domElement.style.background = 'red'


let canvas;
let lastPick = null;
let lastColor = null;
let onRay = (event) => {
    let pickPosition = setPickPosition(event)
    let raycaster = new THREE.Raycaster()

    raycaster.setFromCamera(pickPosition, camera)
    let intersects = raycaster.intersectObjects([map],true)
    if(intersects.length > 0) {
        if(lastPick) {
            if(lastPick.object.properties !== intersects[0].object.properties) {
                lastPick.object.material.color.set(lastColor);
                lastPick = null
            } 
        }
        if(intersects[0].object.properties) {
            lastColor = intersects[0].object.material.color.clone()
            intersects[0].object.material.color.set("red");
        }

        lastPick = intersects[0]
        
    } else {
        if(lastPick) {
            // 还原
            if(lastPick.object.properties) {
                lastPick.object.material.color.set(lastColor);
                lastPick = null;
            }
        }
    }
}
window.addEventListener("click", onRay);
// 获取鼠标在three.js 中归一化坐标
let setPickPosition = (event)=> {
    let pickPosition = { x: 0, y: 0}

    // 计算 以画布 开始为（0，0）点 的鼠标坐标
    let rect = canvas.getBoundingClientRect()
    let pos = {
        x: ((event.clientX - rect.left) * rect.width) / rect.width,
        y: ((event.clientY - rect.top) * rect.height) / rect.height
    }
    pickPosition.x = ( pos.x / canvas.width) * 2 - 1
    pickPosition.y = -( pos.y / canvas.height) * 2 + 1

    return pickPosition
}




let controls = new OrbitControls(camera, css2DRenderer.domElement)
controls.enableDamping = true

let animate = ()=> {
    controls.update()
    requestAnimationFrame(animate)
    renderer.render(scene, camera)
    css2DRenderer.render(scene, camera)
    lineAnimation()
}
animate()

let resize = () => {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()

    css2DRenderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(window.devicePixelRatio)
}
window.addEventListener('resize', resize)
onMounted(() => {
    mapScene.value.appendChild(renderer.domElement)
    mapScene.value.appendChild(css2DRenderer.domElement)
    
    canvas = renderer.domElement;

    
})
onBeforeUnmount(()=> {
  window.removeEventListener("resize", resize);
  window.removeEventListener("click", onRay);
})
</script>
<style>
.mapScene {
    position: relative;;
}
.map-label {
    color: #fff;
}
</style>