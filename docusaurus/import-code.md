---
sidebar_position: 42
---

# 导入代码文件

## 背景

有些时候需要引用一个代码文件，而不是直接在 markdown 中写代码。比如内容很多，如果都直接写到 markdown 文件中的话，维护起来很麻烦。

## Docusaurus 官方方案

Docusaurus 官方提供了 [Importing code snippets](https://docusaurus.io/docs/markdown-features/react#importing-code-snippets) 的方法，就是 import `CodeBlock` 标签，再通过 `raw-loader` 将源文件内容读取成字符串传给 `CodeBlock` 标签。虽然能实现将代码文件导入成代码块，但对于我来说并不完美，因为我的很多文档中有大量的示例代码文件，而且很多内容都很多，用官方的这种方式会搞的满屏的 import 和变量传递，写起来麻烦不说，还巨丑。

## 基于 CodeBlock 实现 FileBlock

由于官方方案存在的缺陷，我决定扩展出一个更好的方案：

1. 所有标签无需显式 import。
2. 使用 `FileBlock` 标签导入代码文件，可指定代码文件路径，无需显式读取和传递文件内容。

### 安装依赖

```bash npm2yarn
npm install --save raw-loader path-browserify
```

### 创建 FileBlock 组件

新建文件 `src/components/FileBlock.tsx`：

<FileBlock showLineNumbers file="FileBlock.tsx" title="src/components/FileBlock.tsx">
</FileBlock>

### 扩展 MDXComponents

新建文件 `src/theme/MDXComponents.tsx` 来扩展默认的 `MDXComponents`：

<FileBlock showLineNumbers file="MDXComponents.tsx" title="src/theme/MDXComponents.tsx">
</FileBlock>
