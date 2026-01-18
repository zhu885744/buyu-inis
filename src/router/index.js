import cache from '@/utils/cache'
import utils from '@/utils/utils'
import axios from '@/utils/request'
import { useCommStore } from '@/store/comm'
import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'

// 定义基础路由规则
const routes = [
  // 首页
  {
    path: '/',
    name: '首页',
    component: () => import('@/views/index/pages/index.vue')
  },

  // 搜索页面
  {
    path: '/search',
    name: '搜索页面',
    component: () => import('@/views/index/pages/search.vue')
  },

  // 归档列表页
  {
    path: '/file',
    name: '归档列表',
    component: () => import('@/views/index/pages/file.vue')
  },

  // 文章详情页
  {
    path: '/archives/:id',
    name: '文章详情',
    component: () => import('@/views/index/pages/archives[id].vue'),
    props: true
  },

  // 友链页
  {
    path: '/friends',
    name: '友链页面',
    component: () => import('@/views/index/pages/friends.vue')
  },

  // 独立页面
  {
    path: '/page/:id',
    name: '独立页面',
    component: () => import('@/views/index/pages/page[id].vue'),
    props: true
  },

  // 404 兜底路由（必须放在最后！）
  {
    path: '/:pathMatch(.*)*', // 匹配所有未定义的路由
    name: 'NotFound',
    component: () => import('@/views/error.vue'), // 404页面组件路径
    meta: {
      title: '页面不存在' // 可选：设置404页面标题
    }
  }
]

// 2. 路由配置参数（可根据环境调整）
const base = '/'
const mode = 'history'

// 3. 创建路由实例（避免重复定义router）
const router = createRouter({
  base: base,
  history: mode === 'history' ? createWebHistory(base) : createWebHashHistory(base),
  routes: routes
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title || to.name || '网站名称'
  next()
})

// 导出路由实例
export default router