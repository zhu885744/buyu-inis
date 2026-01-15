import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path' // 需引入 path 模块

export default defineConfig({
  plugins: [vue()],
  resolve: {
    // 配置路径别名
    alias: {
      // 配置 {src} 别名指向 src 目录
      '{src}': path.resolve(__dirname, 'src'),
      // 可选：配置 @ 别名（Vue 项目常用）
      '@': path.resolve(__dirname, 'src')
    }
  }
})