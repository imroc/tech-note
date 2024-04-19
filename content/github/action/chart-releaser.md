# 自动发布 Chart 并托管到 Github Pages

## 项目结构

在仓库根目录下创建 `charts` 目录，然后在该目录下开发所需要的 chart，如：

```txt
.
├── charts
│   └── mychart
│       ├── Chart.yaml
│       ├── templates
│       │   ├── deployment.yaml
│       │   ├── _helpers.tpl
│       │   └── service.yaml
│       └── values.yaml
```

## 准备 gh-pages 分支

创建 gh-pages 分支并 push 到 github 仓库：

```bash
git checkout --orphan gh-pages # 创建 gh-pages 空分支
touch README.md
git add README.md
git push origin -u gh-pages
```

## Github Action

为项目添加 GitHub Action，在 `.github/workflows` 下新增 yaml（如 `helm-release.yaml`）：

```txt
.github
└── workflows
    ├── docker-ci.yaml
    └── helm-release.yaml
```

<FileBlock file="github-action/helm-release.yaml" title=".github/workflows/helm-release.yaml" showLineNumbers />

:::tip

1. `GITHUB_TOKEN` 这个 Secret 是 Github 为项目自动生成的，无需手动添加。
2. `Configure Git` 中是 Github Action 提交 chart 到 `gh-pages` 分支时所用到的 Git 用户信息，可根据情况自行修改。

:::

## 遇到过的问题

* 第一次提交不会发布 chart，因为它会对比历史来发现 chart 是否有变更，第一次提交无法对比，也不会发布 chart。

## 参考资料

* [Helm官方文档：Chart发布操作用以自动化GitHub的页面Chart](https://helm.sh/zh/docs/howto/chart_releaser_action/) 
* [chart-releaser-action 项目地址](https://github.com/helm/chart-releaser-action)
