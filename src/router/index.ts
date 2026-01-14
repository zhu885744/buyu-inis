// src/router/index.ts
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

// 定义路由规则（RouteRecordRaw 是 TypeScript 类型，约束路由格式）
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    // 示例：导入首页组件（根据你的实际组件路径修改）
    component: () => import('./views/index/pages/index.vue') 
  }
]

// 创建路由实例
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL), // 适配 Vue CLI/Vite 环境
  routes
})

// 关键：使用 export default 导出（解决默认导出缺失的核心）
export default router