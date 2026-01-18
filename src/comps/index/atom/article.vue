<template>
    <main id="main" class="transition-all">
  <div class="container">
    <div class="row">
      <div class="col-mb-12 col-12">
        <div class="buyu-cards gap-md mt-md">
          <article class="buyu-card p-lg border rounded shadow-sm">
            <h2 class="post-title font-bold mb-md" itemprop="name headline">
              文章标题
            </h2>
            <ul class="post-meta mb-md text-muted">
              <li>文章创建日期</li>
              <li>评论数量</li>
              <li>阅读次数</li>
            </ul>
            <div class="post-content" itemprop="articleBody">
              文章内容
            </div>
            <div class="post-button flex justify-center gap-sm mt-lg">
             
                <button class="post-bth p-sm border rounded transition hover:bg-neutral-100" id="like" data-cid="<?php $this->cid(); ?>" data-like-url="<?php echo Helper::options()->index; ?>?action=like" data-get-like-url="<?php echo Helper::options()->index; ?>?action=get_like">
                  <i class="fa fa-thumbs-up mr-1"></i>&nbsp;点赞 <span id="like-count">0</span>
                </button>
             
                <button class="post-bth p-sm border rounded transition hover:bg-neutral-100" onclick="showReward()">
                  <i class="fa fa-heart"></i>&nbsp;打赏
                </button>
              <button class="post-bth p-sm border rounded transition hover:bg-neutral-100" id="share" data-title="<?php echo htmlspecialchars($this->title); ?>" data-url="<?php echo htmlspecialchars($this->permalink); ?>">
               <i class="fa fa-share-alt mr-1"></i>&nbsp;分享
              </button>
            </div>
          </article>
        </div>
      </div>
    </div>
  </div>
</main>
</template>