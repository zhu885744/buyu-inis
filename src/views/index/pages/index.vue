<!-- 首页文章列表 -->
<template>
  <main>
  <div class="container">
    <div class="row">
      <div class="col-mb-12 col-12">
        <!-- 搜索控件 -->
        <div class="buyu-cards gap-md">
          <div class="buyu-card p-md border rounded shadow-sm">
            <form id="search" method="post" action="" role="search" class="transition-all">
              <input type="text" id="s" name="s" class="text p-sm border rounded" placeholder="输入关键字搜索" />
            </form>
          </div>
        </div>
        <atom-post></atom-post>
      </div>
    </div>
  </div>
  </main>
</template>

<script setup>
import AtomPost from '@/comps/index/atom/post.vue'
</script>