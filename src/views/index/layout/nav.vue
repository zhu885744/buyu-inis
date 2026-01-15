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
                <a href="" class="logo site-logo" title="">
                    buyu-inis
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
                        <a href="" class="site-nav__link" title="首页">
                            首页
                        </a>
                    </li>
                    <!-- 分类下拉菜单：动态获取分类 -->
                    <li class="site-nav__item has-dropdown">
                        <a href="#" class="site-nav__link" title="分类">
                            分类
                        </a>
                        <!-- 分类下拉列表 -->
                        <ul class="dropdown site-nav__dropdown" aria-label="分类列表">
                            <li class="site-nav__dropdown-item">
                                <a href="" class="site-nav__dropdown-link" title="">
                                    分类一
                                </a>
                            </li>
                        </ul>
                    </li>
                
                    <li class="site-nav__item">
                        <a href="" class="site-nav__link" title="">
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
import { useRouter } from 'vue-router'
const router = useRouter()

const goToArticle = (id) => {
  // 方式1：路径跳转
  router.push(`/article/${id}`)
  // 方式2：命名路由跳转（更推荐，路径变化时只需改路由配置）
  // router.push({ name: 'Article', params: { id } })
}
</script>