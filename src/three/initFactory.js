/*
 * @Description: 
 * @Author: yuchao
 * @Date: 2024-08-07 20:01:11
 * @LastEditors: yuchao
 * @LastEditTime: 2024-08-07 20:05:52
 */
import cameraModule from "./cameraFactory"
import rendererModule from "./rendererFactory";

let leftMenuWidth = document.querySelector(".left-menu").offsetWidth || 180
let cWidth = window.innerWidth - leftMenuWidth
let cHeight = window.innerHeight

// 更新摄像头
cameraModule.activeCamera.aspect = cWidth / cHeight;
//   更新摄像机的投影矩阵
cameraModule.activeCamera.updateProjectionMatrix();

window.addEventListener('resize', () => {
  // 更新摄像头
  cameraModule.activeCamera.aspect = cWidth / cHeight;
  //   更新摄像机的投影矩阵
  cameraModule.activeCamera.updateProjectionMatrix();

  //   更新渲染器
  rendererModule.renderer.setSize(cWidth, cHeight);
  //   设置渲染器的像素比例
  rendererModule.renderer.setPixelRatio(window.devicePixelRatio);
  // 更新cssrender
  rendererModule.css3drender.setSize(cWidth, cHeight);
})