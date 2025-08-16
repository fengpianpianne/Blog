# Astro Blog Starter

一个带 MDX、Tailwind、RSS、Sitemap、Pagefind（离线搜索）和 Giscus 评论的极简个人博客脚手架。

## 功能
- Astro + MDX 内容集合（`src/content/posts`）
- 列表页、文章详情页、标签页、搜索页
- RSS（/rss.xml）与站点地图（sitemap）
- Pagefind 离线搜索（构建后自动生成）
- 评论：默认 Giscus，可切换 Waline（`src/components/Waline.astro`）
- SEO：canonical、OpenGraph/Twitter、文章 JSON-LD（已内置）
- PWA：manifest + service worker（基础缓存）
- GitHub Actions 示例工作流（CI 构建）

## 本地开发
> 如果在提交时看到 WSL/bash 相关错误（如 execvpe(/bin/bash) failed），这是本地 Git 钩子残留导致。解决：删除本地仓库的 .git/hooks/pre-commit 或执行 `git config --unset core.hooksPath`，然后重新提交。仓库已移除 Husky 钩子，不会再自动生成。
> 如果出现 “File astro/tsconfigs/strict not found”，本项目已改为使用本地 tsconfig.base.json，确保无需依赖外部预设。请执行 `npm install` 保证依赖完整。
```bash
npm install
npm run dev    # 启动：http://localhost:4321
```

## 构建与搜索索引
```bash
npm run build      # 生成静态站点到 dist/
npm run postbuild  # 构建 Pagefind 索引（dist/pagefind/*）
```
> 提示：`npm run build` 后可直接执行 `npm run postbuild`，`/search` 页面会加载 Pagefind UI。开发模式下（`npm run dev`）搜索不可用。

## PWA（可选）
- 已内置 `/manifest.webmanifest` 与 `/sw.js`，并在 `BaseLayout.astro` 注册了 service worker（生产环境生效）
- 基础策略：缓存站点框架与静态资源；可按需扩展 precache 列表和缓存策略

## 切换为 Waline 评论（可选）
- 步骤：
  1. 在 `src/pages/posts/[...slug].astro` 中，将 `<Giscus />` 替换为：
     ```astro
     ---
     import Waline from '@/components/Waline.astro';
     ---
     <Waline serverURL="https://你的-waline-服务地址" />
     ```
  2. 或直接在该文件顶部替换 Giscus 的 import 与组件引用
  3. Waline 服务端可自托管（Vercel/Cloudflare/自建），参考官方文档

## 配置站点域名
在 `astro.config.mjs` 中将 `site` 设置为你的真实域名（例如 `https://blog.example.com`），便于 RSS、Sitemap 与绝对链接正确生成。

## 配置 Giscus 评论
编辑 `src/components/Giscus.astro` 中的 `data-repo`、`data-repo-id`、`data-category`、`data-category-id` 等；这些字段可在 Giscus 配置向导中获取。

## 部署
- Vercel/Netlify/Cloudflare Pages：连接仓库，一键部署
- 阿里云 OSS + CDN：将 `dist/` 上传至存储桶，配置 CDN 与自定义域名

## 目录结构

> 提示：已新增 `src/components/TOC.astro`（目录）并在文章页展示目录、阅读时长与上一篇/下一篇导航。
```
src/
  components/
  content/
    posts/
    config.ts
  layouts/
  pages/
    index.astro
    posts/[...slug].astro
    tags/[tag].astro
    tags/index.astro
    rss.xml.ts
    search.astro
  styles/
public/
```

## 许可
MIT
