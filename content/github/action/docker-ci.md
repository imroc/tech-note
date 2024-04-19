# 自动构建并 Push Docker 镜像

## Github Action

为项目添加 GitHub Action，在 `.github/workflows` 下新增 yaml（如 `docker-ci.yaml`）：

```txt
.github
└── workflows
    ├── docker-ci.yaml
```

内容 (注意高龄部分的替换)：

<FileBlock file="github-action/docker-ci.yaml" showLineNumbers showFileName />
