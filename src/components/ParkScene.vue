

<template>
  <div class="scene" ref="sceneDiv"></div>
</template>
  
<script setup>
import * as THREE from "three";
import gsap from "gsap";
// 导入gui对象
// import gui from "@/three/gui";
// 导入场景
import scene from "@/three/scenePark";
// 导入相机
import cameraModule from "@/three/cameraPark";
// 导入控制器
import controls from "@/three/controlsPark";
// 导入辅助坐标轴
import axesHelper from "@/three/axesHelper";
// 导入渲染器
import renderer from "@/three/rendererPark";
// 初始化调整屏幕
import "@/three/initPark";
// 导入添加物体函数
import createMeshPark from "@/three/createMeshPark";
// 导入每一帧的执行函数
import animate from "@/three/animatePark";

import { onMounted, ref, watch } from "vue";
import eventHub from '@/utils/eventHub'


let sceneDiv = ref(null);
scene.add(cameraModule.activeCamera);
scene.add(axesHelper);

createMeshPark()


onMounted(() => {
  sceneDiv.value.appendChild(renderer.domElement);
  animate();
});


</script>
  
<style scoped>
/* .scene {
  width: 100vw;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 100;
} */
</style>
  