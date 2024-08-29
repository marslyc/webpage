/*
 * @Description: 
 * @Author: yuchao
 * @Date: 2024-08-07 20:01:11
 * @LastEditors: yuchao
 * @LastEditTime: 2024-08-07 20:05:52
 */
import camera from "./camera"
import renderer from "./renderer";

// 更新摄像头
camera.aspect = window.innerWidth / window.innerHeight;
//   更新摄像机的投影矩阵
camera.updateProjectionMatrix();

window.addEventListener('resize', () => {
  // 更新摄像头
  camera.aspect = window.innerWidth / window.innerHeight;
  //   更新摄像机的投影矩阵
  camera.updateProjectionMatrix();

  //   更新渲染器
  renderer.setSize(window.innerWidth, window.innerHeight);
  //   设置渲染器的像素比例
  renderer.setPixelRatio(window.devicePixelRatio);
})