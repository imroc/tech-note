---
sidebar_position: 45
---

# 扩展 MDXComponents 默认 import

## 背景

由于文章经常会引用代码片段和多标签，就需要在 markdown 中用 `<Tab>`, `<TabItem>` 和自己实现的 `<FileBlock>` 标签，而每次都 import 比较麻烦，所以就按照 [官方文档](https://docusaurus.io/docs/markdown-features/react#mdx-component-scope) 对 `MDXComponents` 进行扩展，实现默认 import 这些标签。

## 创建 MDXComponents

新建文件 `src/theme/MDXComponents.tsx` 来扩展默认的 `MDXComponents`：

<FileBlock showLineNumbers file="MDXComponents.tsx" title="src/theme/MDXComponents.tsx" />

## 使用

创建好后，在 markdown 中就可以直接使用常用默认导入的标签了，不需要显式 import，文档就变得更简洁了，维护起来更方便。已经 import 了的 markdown 文件可以移除 import 语句。

## 副作用

默认 import 虽然带来了便利，但在预览或编译文档时也会多消耗一些内存，当你的文档数量非常多时，可能导致 build 时占用内存过高而：

```txt
FATAL ERROR: Reached heap limit Allocation failed - JavaScript heap out of memory
```

使用 `npm run start` 来预览网站效果时报错而无法正常预览：

![](https://image-host-1251893006.cos.ap-chengdu.myqcloud.com/2023%2F10%2F10%2F20231010143950.png)

## 最佳实践

一般建议将单个 docusaurus 站点的文档数量放太多，可以拆分成多个站点，然后放到网站的某个子路径对外展示，比如我的网站是分成了以下几个 docusaurus 站点：
1. https://imroc.cc (https://github.com/imroc/imroc.cc): 个人主页+博客。
2. https://imroc.cc/kubernetes (https://github.com/imroc/kubernetes-guide): 《Kubernetes 实践指南》电子书。
3. https://imroc.cc/istio (https://github.com/imroc/istio-guide): 《istio 实践指南》电子书。
4. https://imroc.cc/note (https://github.com/imroc/tech-note): 《技术笔记》电子书。

这样既能节约算力资源，又能加快编译时间，还可以利用本文的技巧来默认 import 常用标签。
