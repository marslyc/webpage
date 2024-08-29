<template>
    <div id="bigScreen">
    <div class="header">超宇智慧园区系统管理平台</div>
    <div class="main">
      <div class="left">
        <!-- <div class="cityEvent">
          <h3>
            <span>热气球控制</span>
          </h3>
          <h1 @click="toggleAction(0)">
            <img class="icon" :src="imgSrc" alt="" />
            <span>设置热气球以横穿园区的动画显示</span>
          </h1>
          <h1 @click="toggleAction(1)">
            <img class="icon" :src="imgSrc" alt="" />
            <span>设置热气球以环绕园区进行运动</span>
          </h1>

          <div class="footerBorder"></div>
        </div> -->

        <div class="cityEvent">
          <h3>
            <span>相机控制</span>
          </h3>
          <h1 @click="toggleCamera('default')">
            <img class="icon" :src="imgSrc" alt="" />
            <span>默认的相机视角</span>
          </h1>
          <h1 @click="toggleCamera('carcamera_Orientation')">
            <img class="icon" :src="imgSrc" alt="" />
            <span>设置相机追随汽车导览园区</span>
          </h1>
          <h1 @click="toggleCamera('rightcamera_Orientation')">
            <img class="icon" :src="imgSrc" alt="" />
            <span>查看汽车司机视角</span>
          </h1>

          <div class="footerBorder"></div>
        </div>
      </div>
      <div class="right">
        <div class="cityEvent list">
          <h3>
            <span>切换园区观览模式</span>
          </h3>
          <ul>
            <li @click="toggleControls('Orbit')">
              <h1>
                <div>
                  <img class="icon" :src="imgSrc" alt="" />
                  <span> 轨道观览 </span>
                </div>
              </h1>
              <p>可以锁定目标建筑和园区进行轨道式360°查看</p>
            </li>
            <li @click="toggleControls('Fly')">
              <h1>
                <div>
                  <img class="icon" :src="imgSrc" alt="" />
                  <span> 飞行观览 </span>
                </div>
              </h1>
              <p>可以使用飞行模式进行园区进行观览</p>
            </li>
            <li @click="toggleControls('FirstPerson')">
              <h1>
                <div>
                  <img class="icon" :src="imgSrc" alt="" />
                  <span> 第一人称 </span>
                </div>
              </h1>
              <p>可以使用第一人称模式进行园区进行观览</p>
            </li>
          </ul>

          <div class="footerBorder"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import eventHub from '@/utils/eventHub'
import { ref } from 'vue';

let imgSrc = new URL("@/images/assets/bg/bar.svg",import.meta.url).href

// let currentActive = ref(null)


// const toFixInt = (num) => {
//   return num.toFixed(0);
// };
// eventHub.on("spriteClick", (data) => {
//   currentActive.value = data.i;
// });

// const toggleAction = (i) => {
//   eventHub.emit("actionClick", i);
// };

const toggleCamera = (name) => {
  eventHub.emit("toggleCamera", name);
};

const toggleControls = (name) => {

  eventHub.emit("toggleControls", name);
};
</script>
<style scoped>
#bigScreen {
  width: 100vw;
  height: 100vh;
  position: fixed;
  z-index: 100;
  padding-left: 180px;
  left: 0;
  top: 0;
  pointer-events: none;
  display: flex;
  flex-direction: column;
}
.header {
  width: 16.2rem;
  height: 1rem;
  background-image: url(@/images/assets/bg/title.png);
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  text-align: center;
  color: rgb(226, 226, 255);
  font-size: 0.4rem;
}
.main {
  flex: 1;
  width: 16.2rem;
  display: flex;
  justify-content: space-between;
  /* background: red; */
}
.left {
  width: 4rem;
  /* background-color: rgb(255,255,255,0.5); */
  background-image: url(@/images/assets/bg/line_img.png);
  background-repeat: no-repeat;
  background-size: contain;
  background-position: right center;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0.4rem 0;
}

.right {
  width: 4rem;
  /* background-color: rgb(255,255,255,0.5); */
  background-image: url(@/images/assets/bg/line_img.png);
  background-repeat: no-repeat;
  background-size: contain;
  background-position: left center;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0.4rem 0;
}
.cityEvent {
  position: relative;
  width: 3.5rem;
  /* height: 3rem; */
  margin-bottom: 0.5rem;
  background-image: url(@/images/assets/bg/bg_img03.png);
  background-repeat: repeat;
  pointer-events: auto;
}

.cityEvent::before {
  width: 0.4rem;
  height: 0.4rem;
  position: absolute;
  left: 0;
  top: 0;
  border-top: 4px solid rgb(34, 133, 247);
  border-left: 4px solid rgb(34, 133, 247);
  content: "";
  display: block;
}

.cityEvent::after {
  width: 0.4rem;
  height: 0.4rem;
  position: absolute;
  right: 0;
  top: 0;
  border-top: 4px solid rgb(34, 133, 247);
  border-right: 4px solid rgb(34, 133, 247);
  content: "";
  display: block;
}
.footerBorder {
  position: absolute;
  bottom: 0;
  bottom: 0;
  width: 3.5rem;
  height: 0.4rem;
}
.footerBorder::before {
  width: 0.4rem;
  height: 0.4rem;
  position: absolute;
  left: 0;
  top: 0;
  border-bottom: 4px solid rgb(34, 133, 247);
  border-left: 4px solid rgb(34, 133, 247);
  content: "";
  display: block;
}

.footerBorder::after {
  width: 0.4rem;
  height: 0.4rem;
  position: absolute;
  right: 0;
  top: 0;
  border-bottom: 4px solid rgb(34, 133, 247);
  border-right: 4px solid rgb(34, 133, 247);
  content: "";
  display: block;
}

.icon {
  width: 40px;
  height: 40px;
}

h1 {
  color: #fff;
  display: flex;
  align-items: center;
  padding: 0 0.3rem 0.3rem;
  justify-content: space-between;
  font-size: 0.3rem;
}
h3 {
  color: #fff;
  display: flex;
  align-items: center;
  padding: 0.3rem 0.3rem;
}

h1 > div {
  display: flex;
  align-items: center;
}
h1 span.time {
  font-size: 0.2rem;
  font-weight: normal;
}

.cityEvent li > p {
  color: #eee;
  padding: 0rem 0.3rem 0.3rem;
}
.list h1 {
  padding: 0.1rem 0.3rem;
}
.cityEvent.list ul {
  pointer-events: auto;
  cursor: pointer;
}

.cityEvent li.active h1 {
  color: red;
}
.cityEvent li.active p {
  color: red;
}

ul,
li {
  list-style: none;
}
</style>