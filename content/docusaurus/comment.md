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

## 隐藏评论

对于不需要启用评论的文章，在 markdown 文件前面加上 `hide_comment: true` 即可，示例：

```markdown title="intro.md"
---
hide_comment: true
---
```
