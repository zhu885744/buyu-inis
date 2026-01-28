## inis **buyu** 单栏主题
基于 Vue 3 + js + Vite 开发的 inis 单栏博客模版<br />
用户交流群：[点击加入](https://qm.qq.com/q/Yxs7ezX5mY)<br />
主题宗旨：简洁、简洁、还是简洁！

## 特点和功能


## 项目目录结构
```

```

## 开发
```
# 拉取代码
git clone https://github.com/zhu885744/buyu-inis.git

# 切换至项目目录
cd buyu-inis

# 安装依赖
npm Install

# 开启本地服务器
npm run dev
```
## 打包
```
# 当你准备将应用发布到生产环境时，请运行：
npm run build
```

## 关键注意点（必看！）
1.开发环境
本地运行 `npm run dev` 时，Vue 内置的开发服务器会自动处理 `history` 模式的路由重定向，无需额外配置，直接访问 `http://localhost:8080/search` 等路径即可，不会有 `/#/`。

2.生产环境（核心！否则刷新页面 404）
部署到服务器时，必须配置后端重定向规则，确保所有路由请求都指向 index.html，以下是主流服务器的配置示例：
Nginx 配置
找到你的 Nginx 站点配置文件（如 `/etc/nginx/conf.d/your-site.conf）`，添加核心重定向规则：
```
server {
  listen 80;
  server_name 你的域名; # 如：zhuxu.asia
  root /usr/share/nginx/html; # 前端打包后的dist目录路径
  index index.html;

  # 核心：匹配所有路由，优先访问文件/目录，否则重定向到index.html
  location / {
    try_files $uri $uri/ /index.html;
  }

  # 可选：禁止访问隐藏文件（如.git）
  location ~ /\.git {
    deny all;
  }
}
```
配置后重启 Nginx：`nginx -s reload`