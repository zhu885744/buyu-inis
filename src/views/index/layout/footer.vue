<!-- 页脚组件 -->
<template>
  <footer id="footer" class="footer mt-md">
    <!-- 版权信息行 -->
    <div class="footer__content">
      <div class="footer__item">
        Copyright © {{ state.year.start }} ~ {{ state.year.end }} {{ state.site.struct?.title || 'buyu-inis' }} 版权所有
      </div>
      <div class="footer__item">
        <a :href="state.site.struct?.copy?.link" target="_blank" class="icpnum">{{ state.site.struct?.copy?.code || '请在后台填写备案号' }}</a>
      </div>
      <div class="footer__item">
        <a :href="state.site.struct?.police?.link" target="_blank" class="icpnum">{{ state.site.struct?.police?.code || '请在后台填写公安备案备案号' }}</a>
      </div>
      <div class="footer__item" aria-label="技术支持">
        <span>Powered by </span>
        <a href="https://github.com/zhu885744/inisv1" target="_blank" rel="noopener noreferrer" class="footer__tech-link" title="inisv1">
          inis v{{ state.version.system }}
        </a>
        <span> | Theme by </span>
        <a href="https://github.com/zhu885744/buyu-inis" target="_blank" rel="noopener noreferrer" class="footer__tech-link" title="buyu-inis">
          buyu-inis v{{ state.version.theme }}
        </a>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { reactive, onMounted, watch } from 'vue'
import utils from '@/utils/utils'
import cache from '@/utils/cache'
import axios from '@/utils/request'

// 读取环境变量中的版本号和缓存配置
const VITE_VERSION = import.meta.env.VITE_VERSION // 读取 VITE_VERSION
const CACHE_DURATION = 10 * 60 * 1000 // 10分钟缓存（如果需要自定义）

const state = reactive({
    year: {
        start: null,
        end  : new Date().getFullYear()
    },
    site: {
        show: false,
        struct: {
            copy: {}
        }
    },
    version: {
        theme: VITE_VERSION, 
        system: '1.0.0',
    },
})

const method = {
    // 获取站点信息
    site: async () => {
        const cacheName = 'site-info'
        if (cache.has(cacheName)) {
            state.site.struct = cache.get(cacheName)
            return
        }
        const { code, data } = await axios.get('/api/config/one', {
            params: { key: 'SITE_INFO' } 
        })
        if (code !== 200) return
        state.site.struct = data.json

        cache.set(cacheName, data.json, CACHE_DURATION)
    },
    // 获取系统版本
    version: async () => {
        const cacheName = 'system-version-local'
        if (cache.has(cacheName)) {
            state.version.system = cache.get(cacheName)
            return
        }

        const { code, data } = await axios.get('/dev/info/version')
        if (code !== 200) return
        state.version.system = data?.inis

        cache.set(cacheName, data?.inis, CACHE_DURATION)
    },
    // 时间戳转年份方法
    year: (timestamp = Math.round(new Date() / 1000)) => {
        const milliseconds = parseInt(timestamp) * 1000
        const date = new Date(milliseconds)
        return date.getFullYear()
    }
}

onMounted(async () => {
    await method.site()
    await method.version()
})

watch(() => state.site.struct, (value) => {
    state.site.show = !utils.is.empty(value)
})

watch(() => state.site.struct, (value) => {
    if (!utils.is.empty(value?.date)) state.year.start = method.year(value?.date)
})
</script>