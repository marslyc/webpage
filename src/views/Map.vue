<template>
    <div id="map" ref="mapScene"></div>
</template>

<script setup>

import { onMounted, reactive, ref, render } from 'vue';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import Stats from 'three/examples/jsm/libs/stats.module.js';
import * as d3 from 'd3'

let stats = new Stats();
// document.body.appendChild(stats.dom)

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

let axesHelper = new THREE.AxesHelper(5)
scene.add(axesHelper)


let directionalLight = new THREE.DirectionalLight(0xffffff, 1)
scene.add(directionalLight);
const light = new THREE.AmbientLight(0xffffff, 0.5); // soft white light
scene.add(light);


let renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()

    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(window.devicePixelRatio)
})

let controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true


let animate = ()=> {
    controls.update()
    stats.update()
    requestAnimationFrame(animate)
    renderer.render(scene, camera)
}
animate()

let map = new THREE.Object3D()

let projection = d3.geoMercator().center([116.402, 39.915]).translate([0, 0, 0])
// 加载数据文件
let loader = new THREE.FileLoader()
let lSrc = new URL('@/images/map.json', import.meta.url).href
loader.load(lSrc, (data) => {
    
    let jsonData = JSON.parse(data)
    operationData(jsonData)

})

let operationData = (jsonData) => {
    // 全国信息
    let features = jsonData.features
    features.forEach(feature => {
        // 省份
        let province = new THREE.Object3D()
        province.name = feature.properties.name
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
}
let lineDraw = (rows, color, projection) => {
    let lineGeometry = new THREE.BufferGeometry()
    let pointsArray = new Array()
    rows.forEach(row=> {
        let [x, y] = projection(row)
        pointsArray.push(new THREE.Vector3(x, -y, 5))
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
        depth: 6,
        bevelEnabled: false
    })

    let randomColor = ( Math.random() * 0.5 + 0.5) * 0xffffff
    let material = new THREE.MeshBasicMaterial({
        color: randomColor,
        transparent: true,
        opacity: 0.5
    })
    return new THREE.Mesh(geometry,material)

}
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

onMounted(() => {
    mapScene.value.appendChild(renderer.domElement)
    canvas = renderer.domElement;
})

</script>