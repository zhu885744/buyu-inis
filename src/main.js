// src/main.js
import { createApp } from 'vue'
import App from '@/App.vue'
import router from '@/router' 
import { createPinia } from 'pinia'

// 导入样式文件
import '@/assets/css/buyu.mode.css'
import '@/assets/css/buyu.style.css'

// 导入 socket
import socket from '@/utils/socket'

// API 导入路径
import API from '@/api'

// 创建 Vue 应用实例
const app = createApp(App)

// 定义socket全局属性
app.provide('socket', socket)

// 创建 Pinia 实例并挂载
const pinia = createPinia()
app.use(pinia)

// 挂载全局属性
app.config.globalProperties.$api = API

// 挂载路由
app.use(router)

// 挂载应用到 DOM
app.mount('#app')