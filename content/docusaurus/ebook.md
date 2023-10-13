---
sidebar_position: 50
---

# 使用 docusaurus 构建开源电子书

import FileBlock from '@site/src/components/FileBlock';

## 创建电子书

```bash npm2yarn
npx create-docusaurus@next kubernetes-guide classic --typescript
```

## 安装依赖

```bash npm2yarn
npm install --save docusaurus-plugin-sass sass @giscus/react raw-loader path-browserify flexanalytics/plugin-image-zoom @docusaurus/plugin-ideal-image@next @docusaurus/plugin-pwa@next
```

## 自定义样式

将 `src/css/custom.css` 重命名为 `src/css/custom.scss`，覆盖为以下内容：

<FileBlock showLineNumbers file="@site/src/css/custom.scss" title="src/css/custom.scss" />

## 清理不需要的文件

因为是电子书，不需要默认的首页，也不需要博客页面，直接用电子书作为首页。很多默认生成的文件是不需要的，可以删除：

```bash
rm -rf src/components/HomepageFeatures
rm -rf src/pages/*
rm -rf blog
rm -rf docs
rm -rf static/img/*
rm sidebars.js
```

## 创建自定义组件

### giscus 评论组件

<FileBlock showLineNumbers file="@site/src/components/Comment.tsx" title="src/components/Comment.tsx" />

### 增强代码块 FileBlock

<FileBlock showLineNumbers file="@site/src/components/FileBlock.tsx" title="src/components/FileBlock.tsx" />
