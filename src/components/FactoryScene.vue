

<template>
  <div class="scene" ref="sceneDiv"></div>
  <div class="cssrender" ref="cssrenderScene"></div>
</template>
  
<script setup>
import * as THREE from "three";
import gsap from "gsap";
// 导入gui对象
// import gui from "@/three/gui";
// 导入场景
import scene from "@/three/sceneFactory";
// 导入物体
// 导入相机
import cameraModule from "@/three/cameraFactory";
// 导入控制器
import controlsModule from "@/three/controlsFactory";
// 导入辅助坐标轴
import axesHelper from "@/three/axesHelper";
// 导入渲染器
import rendererModule from "@/three/rendererFactory";
// 初始化调整屏幕
import "@/three/init";
// 导入添加物体函数
import createMesh from "@/three/createMeshFactory"  ;
import { updateMesh } from "@/three/createMeshFactory";
// 导入每一帧的执行函数
import animate from "@/three/animateFactory";
// import AlarmSprite from "@/three/mesh/AlarmSprite";
// import LightWall from "@/three/mesh/LightWall";
// import FlyLineShader from "@/three/mesh/FlyLineShader";
// import LightRadar from "@/three/mesh/LightRadar";

import { onMounted, ref, watch } from "vue";
import eventHub from '@/utils/eventHub'


let sceneDiv = ref(null);
let cssrenderScene = ref(null)
scene.add(cameraModule.activeCamera);
scene.add(axesHelper);

let factory = createMesh()


rendererModule.renderer.render(scene, cameraModule.activeCamera);

onMounted(() => {
  sceneDiv.value.appendChild(rendererModule.renderer.domElement);
  sceneDiv.value.appendChild(rendererModule.renderer.domElement);
  cssrenderScene.value.appendChild(rendererModule.css3drender.domElement);
  animate(updateMesh,factory);
});


</script>
  
  <style>
/* .scene {
  width: 100vw;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 100;
} */
</style>
  