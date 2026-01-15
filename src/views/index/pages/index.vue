<!-- 首页文章列表 -->
<template>
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
        <!-- 文章列表控件 -->
        <article class="buyu-card p-md border rounded shadow-sm hover:shadow-hover transition-shadow">
            <h2 class="post-title font-bold mb-md" itemprop="name headline">
                <a itemprop="url" href="" class="text-link transition-color hover:text-link-hover">
                  123
                </a>
            </h2>
            <ul class="post-meta mb-md text-muted">
                <li><i class="fa fa-calendar mr-1"></i>&nbsp;2005-1-1发布<time datetime="" itemprop="datePublished"></time></li>
                <li><i class="fa fa-commenting-o mr-1"></i>&nbsp;1评论</li>
                <li><i class="fa fa-eye mr-1"></i>1次阅读</li>
            </ul>
            <p class="card-text">23123</p>
        </article>
        <!-- 分页控件 -->
        <div class="pagination-container flex justify-center items-center gap-md mt-lg">
          
        </div>
      </div>
    </div>
  </div>
</template>