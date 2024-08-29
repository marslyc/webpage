/*
 * @Description: 
 * @Author: yuchao
 * @Date: 2024-07-23 15:41:49
 * @LastEditors: yuchao
 * @LastEditTime: 2024-08-07 18:45:27
 */
import { createApp } from 'vue'
import router from './router/index.js'
import './style.css'
import App from './App.vue'

createApp(App).use(router).mount('#app')
