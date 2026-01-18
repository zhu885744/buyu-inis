<!-- 导航栏组件 -->
<template>
    <!-- 顶部导航栏 -->
    <header id="header" class="header">
        <div class="container">
            <!-- 导航容器 -->
            <nav class="nav-wrapper">
                <!-- 汉堡菜单：移动端触发按钮，优先加载 -->
                <button class="menu-toggle" id="menuToggle" aria-label="侧边导航" title="侧边导航">
                    <i class="fa fa-bars" aria-hidden="true"></i>
                </button>
                <!-- 站点Logo -->
                <a href="/" class="logo site-logo" title="logo">
                    {{ state.site.struct?.title || 'buyu-inis' }}
                </a>
                <!-- 主导航菜单：桌面端默认显示，移动端隐藏 -->
                <ul class="main-menu site-nav" id="mainMenu" aria-label="主导航">
                    <!-- 移动端侧边栏标题：仅移动端显示 -->
                    <li class="sidebar-title site-nav__sidebar-title">
                        <span class="sidebar-title__main"></span>
                        <span class="sidebar-title__desc"></span>
                    </li>
                    <!-- 首页导航项 -->
                    <li class="site-nav__item">
                        <a href="/" class="site-nav__link" title="首页">
                            首页
                        </a>
                    </li>
                    <!-- 分类下拉菜单：动态获取分类 -->
                    <li class="site-nav__item has-dropdown" v-if="state.categories.list && state.categories.list.length">
                        <a href="#" class="site-nav__link" title="分类">
                            分类
                        </a>
                        <!-- 分类下拉列表 -->
                        <ul class="dropdown site-nav__dropdown" aria-label="分类列表">
                            <li class="site-nav__dropdown-item" v-for="category in state.categories.list" :key="category.id || category.key">
                                <a :href="`/category/${category.key || category.id}`" class="site-nav__dropdown-link" :title="category.name">
                                    {{ category.name || '未命名分类' }}
                                </a>
                            </li>
                        </ul>
                    </li>
                    <!-- 分类数据为空时显示提示 -->
                    <li class="site-nav__item" v-else>
                        <a href="#" class="site-nav__link" title="分类">
                            分类（暂无数据）
                        </a>
                    </li>

                    <!-- 独立页面：基于接口返回数据动态渲染 -->
                    <li class="site-nav__item" v-for="page in state.pages.list" :key="page.id">
                        <a :href="`/page/${page.key}`" class="site-nav__link" :title="page.title">
                            {{ page.title }}
                        </a>
                    </li>
                    <!-- 无数据时的兜底显示 -->
                    <li class="site-nav__item" v-if="!state.pages.list.length">
                        <a href="#" class="site-nav__link" title="独立页面">
                            独立页面
                        </a>
                    </li>
                </ul>
            
                <!-- 浅色深色模式切换按钮 -->
                <button id="theme-toggle" class="theme-toggle-btn" aria-label="切换深色/浅色模式">
                    <i class="fa fa-sun-o light-icon" aria-hidden="true"></i>
                    <i class="fa fa-moon-o dark-icon" aria-hidden="true"></i>
                </button>
            </nav>
        </div>
    </header>
</template>

<script setup>
import { reactive, onMounted } from 'vue'
import axios from 'axios'

// 缓存工具
const cache = {
    has(key) {
        return !!localStorage.getItem(key)
    },
    get(key) {
        const val = localStorage.getItem(key)
        return val ? JSON.parse(val) : null
    },
    set(key, val) {
        localStorage.setItem(key, JSON.stringify(val))
    },
    remove(key) {
        localStorage.removeItem(key)
    }
}
const CACHE_DURATION = 3600 * 1000 // 缓存1小时

// 响应式状态
const state = reactive({
    site: {
        struct: {}
    },
    pages: {
        list: [] // 独立页面列表
    },
    categories: {
        list: [] // 文章分类列表
    }
})

const method = {
    // 获取站点信息
    site: async () => {
        const cacheName = 'site-info'
        if (cache.has(cacheName)) {
            state.site.struct = cache.get(cacheName)
            return
        }
        try {
            const { code, data } = await axios.get('/api/config/one', {
                params: { key: 'SITE_INFO' } 
            })
            if (code === 200) {
                state.site.struct = data.json || {}
                cache.set(cacheName, data.json)
            }
        } catch (err) {
            console.error('获取站点信息失败：', err)
        }
    },
    // 获取独立页面列表
    pages: async () => {
      const cacheName = 'pages-list'
      // 缓存有效期判断（原缓存逻辑未判断过期时间，补充）
      const cacheTimeKey = 'pages-list-time'
      const cacheTime = cache.get(cacheTimeKey)
      if (cache.has(cacheName) && cacheTime && Date.now() - cacheTime < CACHE_DURATION) {
        state.pages.list = cache.get(cacheName)
        return
      }
      try {
        const params = {
          page: 1,
          limit: 20,
          order: 'create_time desc',
          field: 'id,title,key,json,audit,delete_time',
          where: 'audit=1',
          onlyTrashed: false,
          withTrashed: false
        }
        const response = await axios.get('/api/pages/all', { params })
        const data = response.data
        console.log('【pages原始数据】', data)

        if (data?.data && Array.isArray(data.data)) {
          // 优化过滤逻辑
          const validPages = data.data.filter(page => {
            const deleteTime = String(page.delete_time || '0')
            const isNotDeleted = deleteTime === '0' || deleteTime === '' || deleteTime === 'null'
            const audit = String(page.audit || '1')
            const isAudited = audit === '1' || audit === '' || audit === 'null'
            // 排除空标题/空key的无效数据
            const hasValidInfo = page.title || page.key
            return isNotDeleted && isAudited && hasValidInfo
          })
          state.pages.list = validPages
          // 缓存数据+缓存时间
          cache.set(cacheName, validPages)
          cache.set(cacheTimeKey, Date.now())
        } else {
          state.pages.list = []
        }
          } catch (err) {
            console.error('获取独立页面失败：', err)
            state.pages.list = []
        }
    },
    // 获取文章分类列表（核心修复）
    categories: async () => {
        const cacheName = 'categories-list'
        // 调试用：生产环境注释
        // cache.remove(cacheName)
        
        if (cache.has(cacheName)) {
            state.categories.list = cache.get(cacheName)
            console.log('分类数据来自缓存：', state.categories.list)
            return
        }
        try {
            const apiUrl = '/api/article-group/all' 
            console.log('请求分类接口：', apiUrl)
            
            const params = {
                page: 1, 
                limit: 10,
                order: 'create_time desc', 
                field: 'id,name,key,parent_id,delete_time,audit', 
                where: 'audit=1', 
                onlyTrashed: false, 
                withTrashed: false
            }
            const response = await axios.get(apiUrl, { params })
            // 后端all方法直接返回 {data: [], count: number, page: number}，无code字段
            const data = response.data
            console.log('分类接口返回原始数据：', data)
            
            // 修复：不再判断code，直接检查data是否存在
            if (data?.data && Array.isArray(data.data)) {
                // 修复：兼容audit为null的情况（接口返回audit: null）
                const validCates = data.data.filter(cate => {
                    const isNotDeleted = cate.delete_time === 0 || cate.delete_time === null || !cate.delete_time
                    const isAudited = cate.audit === 1 || cate.audit === '1' || cate.audit === null || !cate.audit
                    return isNotDeleted && isAudited
                })
                // 标准化分类数据格式
                state.categories.list = validCates.map(cate => ({
                    id: cate.id || '',
                    key: cate.key || '',
                    name: cate.name || cate.title || '未命名分类',
                    parent_id: cate.parent_id || 0
                }))
                cache.set(cacheName, state.categories.list)
                console.log('分类数据处理后：', state.categories.list)
            } else {
                console.warn('分类接口返回数据格式异常：', data)
                state.categories.list = []
            }
        } catch (err) {
            console.error('获取文章分类失败：', err)
            state.categories.list = []
            // 调试用测试数据：生产环境注释
            // state.categories.list = [{ id: 1, name: '测试分类1', key: 'test1' }, { id: 2, name: '测试分类2', key: 'test2' }]
        }
    }
}

// 组件挂载时加载数据
onMounted(async () => {
    // 按顺序加载
    await method.categories()
    await Promise.all([
        method.site(),
        method.pages()
    ])
    console.log('挂载完成后分类数据：', state.categories.list)
})
</script>