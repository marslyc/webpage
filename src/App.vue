<!--
 * @Description: 
 * @Author: yuchao
 * @Date: 2024-08-01 15:44:57
 * @LastEditors: yuchao
 * @LastEditTime: 2024-08-07 19:28:47
-->


<template>
  <div class="app-container">
    <LeftMenu></LeftMenu>
    <router-view class="right-content"></router-view>
  </div>
  
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import LeftMenu from '@/views/LeftMenu.vue';
// import Stats from 'three/examples/jsm/libs/stats.module.js';    
// let stats = new Stats();
// stats.domElement.style.position = 'absolute';
// stats.domElement.style.top = '0px';
// const animate = () => {
//   stats.update();
//   requestAnimationFrame(animate);
// }
// onMounted(() => {
//   animate()
// })

// document.body.appendChild(stats.dom);
</script>
<style>

* {
  margin: 0;
  padding: 0;
}
html{
  font-size:calc(100vw / 19.2);
}
body{
  font-size: 16px;
}
.app-container {
  display: flex;
  height: 100vh;
}

.right-content {
  flex: 1;
  overflow: hidden;
}

.cssrender {
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  pointer-events: none;
}

.elementTag {
  position: relative;
  left: -30px;
  top: 20px;
}
.elementTag::before {
  content: "";
  display: block;
  position: absolute;
  width: 100px;
  height: 1px;
  background: rgb(127 177 255 / 75%);
  bottom: 0;
  right: -100px;
  transform-origin: 0 0;
  transform: rotate(30deg);
}
.elementTag::after {
  content: "";
  display: block;
  position: absolute;
  width: 20px;
  height: 20px;
  background: rgb(127 177 255 / 75%);
  bottom: -65px;
  right: -105px;
  border-radius: 50%;
}

.elementContent {
  background-color: rgb(20 143 221 / 68%);
  box-shadow: 0px 0px 12px rgb(0 128 255 / 75%);
  border: 1px solid rgb(127 177 255 / 75%);
  padding: 20px;

  color: #efefef;
}

.elementContent h1 {
  font-size: 20px;
  font-weight: bold;
  margin: 15px 0;
  color: #efefef;
}
</style>
