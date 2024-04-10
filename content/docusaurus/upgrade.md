---
date: 2024-04-10 19:40
---

# 升级版本

## 升级 Docusaurus 版本

在执行 `npm run start` 时，会自动检测 Docusaurus 是否有新版本可用，如果有会提示升级命令：

![](https://image-host-1251893006.cos.ap-chengdu.myqcloud.com/2024%2F04%2F08%2F20240408204828.png)

## 升级其它依赖包的版本

查看有哪些包可以升级：

```bash
$ npm outdated
Package               Current  Wanted  Latest  Location                           Depended by
@giscus/react           2.3.0   2.4.0   3.0.0  node_modules/@giscus/react         my-doc
@mdx-js/react           3.0.0   3.0.1   3.0.1  node_modules/@mdx-js/react         my-doc
clsx                    1.2.1   1.2.1   2.1.0  node_modules/clsx                  my-doc
prism-react-renderer    2.3.0   2.3.1   2.3.1  node_modules/prism-react-renderer  my-doc
sass                   1.69.5  1.74.1  1.74.1  node_modules/sass                  my-doc
typescript              5.2.2   5.2.2   5.4.4  node_modules/typescript            my-doc
```

然后安装 latest 版本：

```bash
npm i @giscus@react@latest clsx@latest ...
```

## 一键升级所有包

确保 `npm-check` 已安装：

```bash
npm install -g npm-check
```

然后使用 `npm-check -u` 并按 `a` 选择所有包进行安装：

![](https://image-host-1251893006.cos.ap-chengdu.myqcloud.com/2024%2F04%2F09%2F20240409162834.png)
