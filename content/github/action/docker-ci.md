# 自动构建并 Push Docker 镜像

## 创建 Secret

在项目设置中创建 `DOCKERHUB_USERNAME` 和 `DOCKERHUB_PASSWORD` 这两个 Secret（用于 push 镜像，分别表示 dockerhub 的账号的 token）：

![](https://image-host-1251893006.cos.ap-chengdu.myqcloud.com/2024%2F04%2F19%2F20240419124326.png)

## 配置 Workflow

为项目添加 GitHub Action，在 `.github/workflows` 下新增 yaml（如 `docker-ci.yaml`）：

```txt
.github
└── workflows
    ├── docker-ci.yaml
```

内容 (注意高龄部分的替换)：

<FileBlock file="github-action/docker-ci.yaml" title=".github/workflows/docker-ci.yaml" showLineNumbers />
