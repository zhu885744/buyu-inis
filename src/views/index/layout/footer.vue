<!-- 页脚组件 -->
<template>
  <footer id="footer" class="footer mt-md">
    <!-- 版权信息行 -->
    <div class="footer-row" style="display: flex; flex-wrap: wrap; justify-content: center; align-items: center; gap: 12px; font-size: 12px;">
      <div class="footer__item">
        Copyright © {{ state.year.start }} ~ {{ state.year.end }} buyu-inis 版权所有
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
import utils from '{src}/utils/utils'
import cache from '{src}/utils/cache'
import axios from '{src}/utils/request'

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
        theme: inis.version,
        system: '1.0.0',
    },
})

const method = {
    // 获取站点信息
    site: async () => {

        // 缓存名称
        const cacheName = 'site-info'

        if (cache.has(cacheName)) {
            state.site.struct = cache.get(cacheName)
            return
        }

        // 缓存不存在
        const { code, data } = await axios.get('/api/config/one', {
            key: 'SITE_INFO',
        })

        if (code !== 200) return

        state.site.struct = data.json
        // 缓存10分钟 - 防止频繁请求
        cache.set(cacheName, data.json, inis.cache)
    },
    // 获取系统版本
    version: async () => {

        // 缓存名称
        const cacheName = 'system-version-local'

        if (cache.has(cacheName)) {
            state.version.system = cache.get(cacheName)
            return
        }

        // 缓存不存在
        const { code, data } = await axios.get('/dev/info/version')

        if (code !== 200) return

        state.version.system = data?.inis
        // 缓存10分钟 - 防止频繁请求
        cache.set(cacheName, data?.inis, inis.cache)
    },
    // 给一个时间戳，返回年份
    year: (timestamp = Math.round(new Date() / 1000)) => {

        // 将时间戳转换为毫秒数
        const milliseconds = parseInt(timestamp) * 1000
        // 创建一个新的Date对象，并传入毫秒数
        const date = new Date(milliseconds)

        // 使用Date对象的getFullYear方法获取年份
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