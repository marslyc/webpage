/*
 * @Description: 
 * @Author: yuchao
 * @Date: 2024-08-07 20:01:11
 * @LastEditors: yuchao
 * @LastEditTime: 2024-08-07 20:05:52
 */
import cameraModule from "./cameraFactory"
import rendererModule from "./rendererFactory";

// 更新摄像头
cameraModule.activeCamera.aspect = window.innerWidth / window.innerHeight;
//   更新摄像机的投影矩阵
cameraModule.activeCamera.updateProjectionMatrix();

window.addEventListener('resize', () => {
  // 更新摄像头
  cameraModule.activeCamera.aspect = window.innerWidth / window.innerHeight;
  //   更新摄像机的投影矩阵
  cameraModule.activeCamera.updateProjectionMatrix();

  //   更新渲染器
  rendererModule.renderer.setSize(window.innerWidth, window.innerHeight);
  //   设置渲染器的像素比例
  rendererModule.renderer.setPixelRatio(window.devicePixelRatio);
  // 更新cssrender
  rendererModule.css3drender.setSize(window.innerWidth, window.innerHeight);
})