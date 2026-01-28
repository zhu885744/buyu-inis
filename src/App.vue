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

  // 追加配置
globalThis.inis = {
  api: { uri: '', key: '' },
  cache: 10,
  lazy_time : 500,
  token_name: import.meta.env.VITE_TOKEN_NAME,
  ...globalThis.inis,
  version   : import.meta.env.VITE_VERSION,
}

import channel from '@/utils/channel'

const item = new channel('theme')

item.on((data) => {
  console.log('主题更新：', data)
})
</script>