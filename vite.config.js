/*
 * @Description: 
 * @Author: yuchao
 * @Date: 2024-07-23 15:41:49
 * @LastEditors: yuchao
 * @LastEditTime: 2024-08-07 18:33:59
 */
// IIS 发布时，MIME类型中 可能没有 .glb,引起报错，可以添加扩展全部扩展：扩展名输入.*  ，类型输入application/octet-stream
// 或者单独添加某一个类型
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import glsl from 'vite-plugin-glsl'

import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(),glsl()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  },
  
  assetsInclude:['**/*.hdr','**/*.glb'],
  server: {
    port: 9528
  }
})
