/*
 * @Description: 
 * @Author: yuchao
 * @Date: 2024-08-07 20:01:11
 * @LastEditors: yuchao
 * @LastEditTime: 2024-08-07 20:05:52
 */
import cameraModule from "./cameraPark"
import renderer from "./rendererPark";

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
  renderer.setSize(window.innerWidth, window.innerHeight);
  //   设置渲染器的像素比例
  renderer.setPixelRatio(window.devicePixelRatio);
})