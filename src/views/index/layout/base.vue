<template>

    <!-- 顶部导航栏 -->
    <i-nav></i-nav>

    <router-view></router-view>

    <!-- 页脚 -->
    <i-footer></i-footer>

</template>

<script setup>
import iNav from './views/index/layout/nav.vue'
import iFooter from './views/index/layout/footer.vue'
</script>