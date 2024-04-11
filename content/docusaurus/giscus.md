---
sidebar_position: 20
---

# 添加 giscus 评论功能

## 安装依赖

```bash npm2yarn
npm install --save @giscus/react
```

## 创建评论组件

<FileBlock showLineNumbers title="src/components/Comment.tsx" file="@site/src/components/Comment.tsx" />

## 是否需要支持隐藏评论？

在让页面支持评论功能之前，先确定下，是否需要支持隐藏评论。

因为需要通过 [swizzling](https://docusaurus.io/docs/swizzling) 的方式修改页面将评论功能嵌入进去。如果需要隐藏评论就需要通过 `eject` 的方式完全自定义页面以便拿到页面的 metadata 来判断是否要隐藏评论；而如果不需要隐藏评论，就只需要使用 `wrap` 的方式对页面进行跟轻量的修改。

两者都需要修改文档页面组件，有一定的侵入性，但 `eject` 方式相比 `wrap` 方式侵入性更大，在升级 docusaurus 的时候，前者更容易出现兼容性问题，如果出现不兼容就需要按照下文的方式重新 swizzle 并修改代码。

最佳实践是：如果不需要隐藏评论这种功能，就用 `wrap` 方式修改页面组件。

## 不支持隐藏的评论

本人就是使用的这种方式，因为没有隐藏评论的需求，也避免升级 docusaurus 时出现兼容性问题，下面介绍具体操作步骤。

### 文档页面启用评论

文档页面由 docusaurus 的 `DocItem/Layout` 组件渲染，下面是自定义方法。

1. swizzle `DocItem`：

```bash npm2yarn
npm run swizzle @docusaurus/theme-classic DocItem/Layout -- --wrap --typescript
```

2. 修改以下自动生成的源码文件（高亮的行是增加的内容）:

<FileBlock showLineNumbers title="src/theme/DocItem/Layout/index.tsx" file="@site/src/theme/DocItem/Layout/index.tsx" />

### 文档目录页面启用评论

所谓文档目录页面就是自动生成的目录页面 (`category`)，没有对应的 markdown 文件，这种页面是由 docusaurus 的 `DocCategoryGeneratedIndexPage` 渲染的，下面是自定义方法。

1. swizzle `DocCategoryGeneratedIndexPage`:

```bash npm2yarn
npm run swizzle @docusaurus/theme-classic DocCategoryGeneratedIndexPage -- --wrap --typescript
```

2. 修改以下自动生成的源码文件（高亮的行是增加的内容）:

<FileBlock showLineNumbers title="src/theme/DocCategoryGeneratedIndexPage/index.tsx" file="@site/src/theme/DocCategoryGeneratedIndexPage/index.tsx" />

## 支持隐藏的评论

如果有隐藏评论的需求，就需要对页面做更深度的自定义，使用 `eject` 方式将页面组件源码弹出到 `theme` 下，基于源码进行修改。

### 文档页面支持评论

1. swizzle `DocItem`:

```bash npm2yarn
npm run swizzle @docusaurus/theme-classic DocItem/Layout -- --eject --typescript
```

2. 修改以下自动生成的源码文件（高亮的行是增加的内容）:

<FileBlock showLineNumbers title="src/theme/DocItem/Layout/index.tsx" file="theme/docitem-eject-giscus.tsx" />

大功告成！

对于不需要启用评论的文章，在 markdown 文件前面加上 `hide_comment: true` 即可，示例：

```markdown title="intro.md"
---
hide_comment: true
---
```

### 其它页面支持评论

对于文档目录页面如何判断是否隐藏评论，思路与文档页面类似，拿到目录(`category`)相关的 metadata，判断 `hide_comment` 的值来决定是否隐藏评论；对于首页，如果需要评论，就固定 import 并在文末使用 `<Comment />` 标签即可，如果不需要则不需要做什么。

但本文没用此方案，所以也没有深入研究，有需要的可参考这里说的思路进行实现。

## 配置 giscus

准备一个 GitHub 仓库（如果是 docusaurus 构建的开源站点，通常用存放网站源码仓库），在设置里启用 Discussions:

![](https://image-host-1251893006.cos.ap-chengdu.myqcloud.com/2024%2F01%2F25%2F20240125203425.png)

然后进入 [giscus 官网网站](https://giscus.app/zh-CN)，输入 GitHub 仓库和 Discussion 分类（通常用 General）:

![](https://image-host-1251893006.cos.ap-chengdu.myqcloud.com/2024%2F01%2F25%2F20240125203710.png)

下面会自动生成 giscus 配置所需的关系 ID 信息：

![](https://image-host-1251893006.cos.ap-chengdu.myqcloud.com/2024%2F01%2F25%2F20240125203848.png)

将其贴在 docsite 配置文件中：

```ts
  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // giscus 评论功能
      // highlight-start
      giscus: {
        repo: '***************',
        repoId: '************',
        category: 'General',
        categoryId: '********************',
      },
      // highlight-end

```

然后就会自动启用评论了。

## 评论数据迁移

### 更换文档路径

如果文档的路径更换了，需要同步修改下对应 Discussion 中的 SHA1 Hash 值（可使用 SHA-1 在线工具进行计算，比如 [SHA-1 hash calculator](https://xorbin.com/tools/sha1-hash-calculator)）：

![](https://image-host-1251893006.cos.ap-chengdu.myqcloud.com/2024%2F04%2F10%2F20240410194023.png)

> 当然对应的 URL 和路径标题最好也同步改下，但这个在精确匹配的模式下不是必须的。

### 更换 GitHub 仓库

有时候需要将文档迁移到新的 GitHub 仓库，比如内容积累太多，需要将部分内容拆分到其它的仓库中。

这时可以将已有的评论对应的 Discussion 迁移到新的仓库中：

![](https://image-host-1251893006.cos.ap-chengdu.myqcloud.com/2024%2F04%2F10%2F20240410194441.png)

> 记得同步修改下新的 SHA1 Hash。
