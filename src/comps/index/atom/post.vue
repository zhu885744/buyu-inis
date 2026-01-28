<template>
  <!-- 文章列表控件 -->
  <div v-if="state.article.load" class="buyu-cards gap-md mt-md"><div class="buyu-card">加载中...</div></div>
  <div v-else-if="state.article.list.length === 0" class="buyu-cards gap-md mt-md"><div class="buyu-card">暂无文章</div></div>
  <div class="buyu-cards gap-md mt-md">
    <article 
      v-for="item in sortedArticleList"
      :key="item.id" 
      class="buyu-card p-md border rounded shadow-sm hover:shadow-hover transition-shadow mb-4"
    >
      <h2 class="post-title font-bold mb-md" itemprop="name headline">
        <a 
          itemprop="url" 
          href="" 
          class="text-link transition-color hover:text-link-hover" 
          @click.prevent="goToArticleDetail(item.id)"
        >
          <span v-if="item.top === 1" style="color: rgb(255 0 0);">[置顶]</span>
          {{ item.title }}
        </a>
      </h2>
      <ul class="post-meta mb-md text-muted">
        <li><i class="fa fa-calendar mr-1"></i>{{ utils.natureTime(item.create_time) }} </li>
        <li><i class="fa fa-commenting-o mr-1"></i>{{ item.result?.comment?.count || 0 }} 评论</li>
        <li><i class="fa fa-eye mr-1"></i>{{ item.views || 0 }} 次阅读</li>
      </ul>
      <!-- 文章摘要，限制150字 -->
      <p class="card-text">{{ truncateText(item.content || '', 150) }}</p>
    </article>
  </div>
</template>

<script setup>
import utils from '@/utils/utils'
import axios from '@/utils/request'
import { reactive, onMounted, computed } from 'vue'  // 新增computed
import { useRouter } from 'vue-router'

const router = useRouter()

const state = reactive({
  // 文章列表
  article: {
    list: [],
    order: 'top desc, update_time desc', // 核心：置顶优先 + 最新更新优先
    load: false
  },
  // 分页
  page: {
    code: 1,    // 当前页码
    limit: 100,   // 每页条数
    total: 1    // 总页数
  },
  item: {
    sort: 'top desc, update_time desc' // 排序选项默认值
  }
})

// 文本截断函数：限制最大长度，超出部分加省略号
const truncateText = (text, maxLength) => {
  const plainText = text.replace(/<[^>]+>/g, '') // 去除HTML标签
  return plainText.length <= maxLength 
    ? plainText 
    : plainText.substring(0, maxLength) + '...'
}

// 【核心】计算属性：兜底排序，确保置顶文章在最顶部
const sortedArticleList = computed(() => {
  // 深拷贝避免修改原数组
  const list = JSON.parse(JSON.stringify(state.article.list))
  // 排序规则：top=1 排最前，其余按update_time降序
  return list.sort((a, b) => {
    // 置顶优先级最高
    if (a.top === 1 && b.top !== 1) return -1
    if (a.top !== 1 && b.top === 1) return 1
    // 非置顶文章按更新时间降序（最新的在前）
    return b.update_time - a.update_time
  })
})

const method = {
  // 初始化 - 获取文章数据
  init: async (page = state.page.code) => {
    state.article.load = true
    try {
      const params = {
        page: page,
        limit: state.page.limit,
        order: state.article.order,
        where: 'audit = 1'
      }
      // 1. 增加axios响应拦截兜底（或直接校验响应）
      const response = await axios.get('/api/article/all', { params })
      // 2. 校验响应是否存在、是否为对象
      const res = response.data || {} 
      // 3. 兜底赋值，避免res.data为undefined/null
      state.article.list = res.data || []
      state.page.total = res.page || 1
      state.page.code = parseInt(page)
    } catch (error) {
      console.error('获取文章列表失败：', error)
      // 异常时强制兜底空数组
      state.article.list = []
      state.page.total = 1
      state.page.code = 1
    } finally {
      state.article.load = false
    }
  },
  // 切换页码
  changePage: (page) => {
    if (page < 1 || page > state.page.total) return
    method.init(page)
    window.scrollTo(0, 0) // 滚动到顶部
  },
  // 处理排序变更
  handleSortChange: () => {
    state.article.order = state.item.sort
    method.init(1) // 排序变更后重置到第一页
  },
  // 跳转到文章详情页
  goToArticleDetail: (id) => {
    router.push(`/article/${id}`)
  },
  // 刷新文章列表
  refresh: () => {
    method.init(state.page.code)
  }
}

// 页面挂载时初始化数据
onMounted(() => {
  method.init(state.page.code)
})
</script>

<style scoped>
/* 可选：美化分页按钮样式 */
.pagination-btn {
  cursor: pointer;
  background: #fff;
}
.pagination-btn:disabled {
  cursor: not-allowed;
  color: #999;
  border-color: #ddd;
}
.pagination-current {
  min-width: 60px;
  text-align: center;
}
</style>