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

## 文档页面支持评论

### swizzle DocItem

```bash npm2yarn
npm run swizzle @docusaurus/theme-classic DocItem/Layout -- --eject --typescript
```

### 修改 DocItem

修改以下自动生成的源码文件（高亮的行为增加的内容）:

<FileBlock showLineNumbers title="src/theme/DocItem/Layout/index.tsx" file="@site/src/theme/DocItem/Layout/index.tsx" />

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

## 隐藏评论

对于不需要启用评论的文章，在 markdown 文件前面加上 `hide_comment: true` 即可，示例：

```markdown title="intro.md"
---
hide_comment: true
---
```

## 评论迁移

### 更换路径

如果文档的路径更换了，需要同步修改下对应 Discussion 中的 SHA1 Hash 值（可使用 SHA-1 在线工具进行计算，比如 [SHA-1 hash calculator](https://xorbin.com/tools/sha1-hash-calculator)）：

![](https://image-host-1251893006.cos.ap-chengdu.myqcloud.com/2024%2F04%2F10%2F20240410194023.png)

> 当然对应的 URL 和路径标题最好也同步改下，但这个在精确匹配的模式下不是必须的。

### 更换 GitHub 仓库

有时候需要将文档迁移到新的 GitHub 仓库，比如内容积累太多，需要将部分内容拆分到其它的仓库中。

这时可以将已有的评论对应的 Discussion 迁移到新的仓库中：

![](https://image-host-1251893006.cos.ap-chengdu.myqcloud.com/2024%2F04%2F10%2F20240410194441.png)

> 记得同步修改下新的 SHA1 Hash。
