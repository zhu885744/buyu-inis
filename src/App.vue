<template>
  <!-- 全局导航栏 -->
  <i-nav></i-nav>
  <!-- 路由内容：不同页面切换这里的内容 -->
  <router-view></router-view>
  <!-- 全局底部页脚 -->
  <i-footer></i-footer>
</template>

<script setup>
  import iNav from '@/views/index/layout/nav.vue'
  import iFooter from '@/views/index/layout/footer.vue'
</script>