---
sidebar_position: 42
---

# 创建 FileBlock 自定义组件

## 背景

有些时候需要引用一个代码文件，而不是直接在 markdown 中写代码。比如内容很多，如果都直接写到 markdown 文件中的话，维护起来很麻烦。

## Docusaurus 官方方案

Docusaurus 官方提供了 [Importing code snippets](https://docusaurus.io/docs/markdown-features/react#importing-code-snippets) 的方法，就是 import `CodeBlock` 标签，再通过 `raw-loader` 将源文件内容读取成字符串传给 `CodeBlock` 标签。虽然能实现将代码文件导入成代码块，但对于我来说并不完美，因为我的很多文档中有大量的示例代码文件，而且很多内容都很多，用官方的这种方式会搞的满屏的 import 和变量传递，写起来麻烦不说，还巨丑。

## 基于 CodeBlock 实现 FileBlock

由于官方方案存在的缺陷，我决定扩展出一个更好的方案：
1. 使用 `FileBlock` 标签导入代码文件，可指定代码文件路径，无需显式读取和传递文件内容。
2. 可根据文件后缀自动识别语言类型进行语法高亮渲染。
3. 可选显示文件名，也可以手动设置文件名。

## 安装依赖

```bash npm2yarn
npm install --save raw-loader path-browserify
```

## 创建 FileBlock 组件

新建文件 `src/components/FileBlock.tsx`：

<FileBlock showLineNumbers file="@site/src/components/FileBlock.tsx" title="src/components/FileBlock.tsx" />

## 扩展 MDXComponents

新建文件 `src/theme/MDXComponents.tsx` 来扩展默认的 `MDXComponents`：

<FileBlock showLineNumbers file="MDXComponents.tsx" title="src/theme/MDXComponents.tsx" />

## 配置插件

存放到 `codeblock` 目录下的所有文件用于代码文件的导入，不单独渲染页面，配置 `plugin-content-docs` 插件在生成页面时忽略该目录下的文件：

```js showLineNumbers title="docusaurus.config.js"
  plugins: [
    [
      '@docusaurus/plugin-content-docs',
      /** @type {import('@docusaurus/plugin-content-docs').PluginOptions} */
      ({
        id: 'note',
        path: 'note',
        // highlight-next-line
        exclude: ['codeblock/**'],
        routeBasePath: '/note',
        sidebarPath: require.resolve('./note/sidebars.js'),
        remarkPlugins: [
          [require('@docusaurus/remark-plugin-npm2yarn'), { sync: true }],
        ],
        editUrl: ({ docPath }) =>
          `https://github.com/imroc/imroc.cc/edit/master/note/${docPath}`,
      }),
    ],
  ]
```

## 在 markdown 中使用 FileBlock 引用代码文件

<Tabs>

  <TabItem value="file" label="指定代码文件路径">
    <Tabs>
      <TabItem value="md-file" label="markdown 写法">
        ````md
        <FileBlock file="demo/hello.go" />
        ````
      </TabItem>
      <TabItem value="demo-file" label="效果">
        <FileBlock file="demo/hello.go" />
      </TabItem>
    </Tabs>
  </TabItem>

  <TabItem value="showLineNumbers" label="显示行号">
    <Tabs>
      <TabItem value="md-showLineNumbers" label="markdown 写法">
        ````md
        <FileBlock showLineNumbers file="demo/hello.go" />
        ````
      </TabItem>
      <TabItem value="demo-showLineNumbers" label="效果">
        <FileBlock showLineNumbers  file="demo/hello.go" />
      </TabItem>
    </Tabs>
  </TabItem>

  <TabItem value="showFileName" label="显示文件名">
    <Tabs>
      <TabItem value="md-showFileName" label="markdown 写法">
        ````md
        <FileBlock showFileName file="demo/hello.go" />
        ````
      </TabItem>
      <TabItem value="demo-showFileName" label="效果">
        <FileBlock showFileName file="demo/hello.go" />
      </TabItem>
    </Tabs>
  </TabItem>

  <TabItem value="title" label="手动指定文件名">
    <Tabs>
      <TabItem value="md-title" label="markdown 写法">
        ````md
        <FileBlock file="demo/hello.go" title="main.go" />
        ````
      </TabItem>
      <TabItem value="demo-title" label="效果">
        <FileBlock file="demo/hello.go" title="main.go" />
      </TabItem>
    </Tabs>
  </TabItem>

</Tabs>

## 结合 Tab 与 TabItem 实现多标签代码块

import MultiTab from '@site/codeblock/demo/multi-tab.md';

<Tabs>
  <TabItem value="md" label="markdown 写法">
    <FileBlock file="demo/multi-tab.md" />
  </TabItem>
  <TabItem value="demo" label="效果">
    <MultiTab />
  </TabItem>
</Tabs>
