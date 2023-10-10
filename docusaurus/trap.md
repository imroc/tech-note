---
sidebar_position: 42
---

# 踩过的坑

import FileBlock from '@site/src/components/FileBlock'

## 扩展 MDXComponents 默认 import 导致内存占用过高

由于文章经常会引用代码片段和多标签，就需要在 markdown 中用 `<Tab>`, `<TabItem>` 和自己实现的 `<FileBlock>` 标签，而每次都 import 比较麻烦，所以就按照 [官方文档](https://docusaurus.io/docs/markdown-features/react#mdx-component-scope) 对 `MDXComponents` 进行扩展，实现默认 import 这些标签。

新建文件 `src/theme/MDXComponents.tsx` 来扩展默认的 `MDXComponents`：

<FileBlock showLineNumbers file="MDXComponents.tsx" title="src/theme/MDXComponents.tsx">
</FileBlock>

然后就可以去除 markdown 中的 import 语句了，文档维护起来更方便，但是却引发了严重的问题，由于我的网站包含的文档数量非常多，导致在 build 的时候 node 占用内存非常高（20GB~30GB)，容易发生报错:

```txt
FATAL ERROR: Reached heap limit Allocation failed - JavaScript heap out of memory
```

并且还几乎无法使用 `npm run start` 来预览网站效果，会报错：

![](https://image-host-1251893006.cos.ap-chengdu.myqcloud.com/2023%2F10%2F10%2F20231010143950.png)

浏览器打开预览页面也无法正常查看。

所以不建议默认 import （我使用的 docusaurus 版本是 `3.0.0-beta.0`）
