---
sidebar_position: 20
---

# 添加 giscus 评论功能

## 安装依赖

```bash npm2yarn
npm install --save @giscus/react
```

## 创建评论组件

```ts title="src/components/comment/index.tsx" showLineNumbers
import React from 'react'
import { useColorMode } from '@docusaurus/theme-common'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
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
}

export default function Comment(): JSX.Element {
  const { i18n } = useDocusaurusContext()

  // merge default config
  const giscus = { ...defaultConfig }

  const path = useLocation().pathname.replace(/^\/|\/$/g, '');
  const firstSlashIndex = path.indexOf('/');
  var topPath: string = ""
  var subPath: string = ""
  if (firstSlashIndex !== -1) {
    topPath = path.substring(0, firstSlashIndex)
    subPath = path.substring(firstSlashIndex + 1)
  } else {
    topPath = path
    subPath = "index"
  }

  switch (topPath) {
    case "kubernetes":
      giscus.repo = 'imroc/kubernetes-guide'
      giscus.repoId = 'R_kgDOG-4vhA'
      giscus.category = 'General'
      giscus.categoryId = 'DIC_kwDOG-4vhM4COPpN'
      break;
    case "istio":
      giscus.repo = 'imroc/istio-guide'
      giscus.repoId = 'R_kgDOHFP9XQ'
      giscus.category = 'General'
      giscus.categoryId = 'DIC_kwDOHFP9Xc4COUDN'
      break;
  }

  if (!giscus.repo) {
    return ('')
  }

  if (!giscus.repo || !giscus.repoId || !giscus.categoryId) {
    throw new Error(
      'You must provide `repo`, `repoId`, and `categoryId` to `themeConfig.giscus`.',
    )
  }

  giscus.term = subPath
  giscus.theme =
    useColorMode().colorMode === 'dark' ? 'transparent_dark' : 'light'
  giscus.lang = i18n.currentLocale

  return (
    <BrowserOnly fallback={<div>Loading Comments...</div>}>
      {() => <Giscus {...giscus} />}
    </BrowserOnly>
  )
}
```

## 文档页面支持评论

### swizzle DocItem

```bash npm2yarn
npm run swizzle @docusaurus/theme-classic DocItem/Layout -- --eject --typescript
```

### 修改 DocItem

修改以下自动生成的源码文件（高亮的行为增加的内容）:

```ts title="src/theme/DocItem/Layout/index.tsx" showLineNumbers
import React from 'react';
import clsx from 'clsx';
import { useWindowSize } from '@docusaurus/theme-common';
import { useDoc } from '@docusaurus/theme-common/internal';
import DocItemPaginator from '@theme/DocItem/Paginator';
import DocVersionBanner from '@theme/DocVersionBanner';
import DocVersionBadge from '@theme/DocVersionBadge';
import DocItemFooter from '@theme/DocItem/Footer';
import DocItemTOCMobile from '@theme/DocItem/TOC/Mobile';
import DocItemTOCDesktop from '@theme/DocItem/TOC/Desktop';
import DocItemContent from '@theme/DocItem/Content';
import DocBreadcrumbs from '@theme/DocBreadcrumbs';
import type { Props } from '@theme/DocItem/Layout';

import styles from './styles.module.css';
// highlight-add-line
import Comment from '../../../components/comment';

/**
 * Decide if the toc should be rendered, on mobile or desktop viewports
 */
function useDocTOC() {
  const { frontMatter, toc } = useDoc();
  const windowSize = useWindowSize();

  const hidden = frontMatter.hide_table_of_contents;
  const canRender = !hidden && toc.length > 0;

  const mobile = canRender ? <DocItemTOCMobile /> : undefined;

  const desktop =
    canRender && (windowSize === 'desktop' || windowSize === 'ssr') ? (
      <DocItemTOCDesktop />
    ) : undefined;

  return {
    hidden,
    mobile,
    desktop,
  };
}

export default function DocItemLayout({ children }: Props): JSX.Element {
  const docTOC = useDocTOC();
  // highlight-add-start
  const { frontMatter } = useDoc();
  const { hide_comment: hideComment } = frontMatter;
  // highlight-add-end
  return (
    <div className="row">
      <div className={clsx('col', !docTOC.hidden && styles.docItemCol)}>
        <DocVersionBanner />
        <div className={styles.docItemContainer}>
          <article>
            <DocBreadcrumbs />
            <DocVersionBadge />
            {docTOC.mobile}
            <DocItemContent>{children}</DocItemContent>
            <DocItemFooter />
          </article>
          <DocItemPaginator />
        </div>
        // highlight-add-line
        {!hideComment && <Comment />}
      </div>
      {docTOC.desktop && <div className="col col--3">{docTOC.desktop}</div>}
    </div>
  );
}
```

## 隐藏评论

对于不需要启用评论的文章，在 markdown 文件前面加上 `hide_comment: true` 即可，示例：

```markdown title="intro.md"
---
hide_comment: true
---
```
