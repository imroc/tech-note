# 使用 docusaurus 构建开源电子书

## 创建电子书

```bash npm2yarn
npx create-docusaurus@next kubernetes-guide classic --typescript
```

## 安装依赖

```bash npm2yarn
npm install --save docusaurus-plugin-sass sass @giscus/react raw-loader path-browserify flexanalytics/plugin-image-zoom @docusaurus/plugin-ideal-image@next @docusaurus/plugin-pwa@next
```

## 自定义样式

将 `src/css/custom.css` 重命名为 `src/css/custom.scss`，贴入以下内容：

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

## 启用 giscus 评论

`src/components/Comment.tsx`:

```ts
import React from 'react'
import { useThemeConfig, useColorMode } from '@docusaurus/theme-common'
import BrowserOnly from '@docusaurus/BrowserOnly'
import Giscus, { GiscusProps } from '@giscus/react'
import { useLocation } from '@docusaurus/router';

const defaultConfig: Partial<GiscusProps> = {
  id: 'comments',
  mapping: 'specific',
  reactionsEnabled: '1',
  emitMetadata: '0',
  inputPosition: 'top',
  loading: 'lazy',
  strict: '0',
  lang: 'zh-CN',
}

export default function Comment(): JSX.Element {
  const themeConfig = useThemeConfig()

  // merge default config
  const giscus = { ...defaultConfig, ...themeConfig.giscus }

  if (!giscus.repo || !giscus.repoId || !giscus.categoryId) {
    throw new Error(
      'You must provide `repo`, `repoId`, and `categoryId` to `themeConfig.giscus`.',
    )
  }

  const path = useLocation().pathname.replace(/^\/|\/$/g, '');
  const firstSlashIndex = path.indexOf('/');
  var subPath: string = ""
  if (firstSlashIndex !== -1) {
    subPath = path.substring(firstSlashIndex + 1)
  } else {
    subPath = "index"
  }

  giscus.term = subPath
  giscus.theme =
    useColorMode().colorMode === 'dark' ? 'transparent_dark' : 'light'

  return (
    <BrowserOnly fallback={<div>评论加载中...</div>}>
      {() => <Giscus {...giscus} />}
    </BrowserOnly>
  )
}
```

```js
  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      giscus: {
        repo: 'imroc/kubernetes-guide',
        repoId: 'R_kgDOG-4vhA',
        category: 'General',
        categoryId: 'DIC_kwDOG-4vhM4COPpN',
      },
```

## 增强代码块 FileBlock

 `src/components/FileBlock.tsx`：

<FileBlock showLineNumbers file="@site/src/components/FileBlock.tsx" title="src/components/FileBlock.tsx" />
