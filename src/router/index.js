import cache from '{src}/utils/cache'
import utils from '{src}/utils/utils'
import axios from '{src}/utils/request'
import { useCommStore } from '{src}/store/comm'
import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  { path: '/', redirect: '/index' },

  // 首页（name 改为中文）
  {
    path: '/index',
    name: '首页',
    component: () => import('../views/index/pages/index.vue')
  },

  // 404页面（name 改为中文）
  {
    path: '/404',
    name: '404页面',
    component: () => import('../views/index/pages/404.vue')
  },

  // 搜索页面
  {
    path: '/search',
    name: '搜索页面',
    component: () => import('../views/index/pages/search.vue')
  },

  // 归档列表页
  {
    path: '/archives',
    name: '归档列表',
    component: () => import('../views/index/pages/archives.vue')
  },

  // 文章详情页
  {
    path: '/article/:id',
    name: '文章详情',
    component: () => import('../views/index/pages/article[id].vue'),
    props: true
  },

  // 友链页
  {
    path: '/friends',
    name: '友链页面',
    component: () => import('../views/index/pages/friends.vue')
  },

  // 独立页面
  {
    path: '/page/:id',
    name: '独立页面',
    component: () => import('../views/index/pages/page[id].vue'),
    props: true
  },

  { path: '/:pathMatch(.*)*', redirect: '/404' }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router