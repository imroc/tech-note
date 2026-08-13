# 自动构建并 Push Docker 镜像

通过 GitHub Actions 自动构建多平台 Docker 镜像并推送到 Docker Hub，支持 `master` 分支打 `latest`、`v*` tag 打 semver 版本号，PR 只构建不推送用于校验。

## 创建 Secret

在项目设置中创建 `DOCKERHUB_USERNAME` 和 `DOCKERHUB_TOKEN` 这两个 Secret（用于 push 镜像，分别表示 Docker Hub 的账号和 token）：

![](https://image-host-1251893006.cos.ap-chengdu.myqcloud.com/2024%2F04%2F19%2F20240419124326.png)

## 配置 Workflow

在 `.github/workflows` 下新增 yaml（如 `docker-image.yml`）：

```txt
.github
└── workflows
    └── docker-image.yml
```

内容（注意高亮部分的替换）：

<FileBlock file="github-action/docker-ci.yaml" title=".github/workflows/docker-image.yml" showLineNumbers />

## Tag 策略

| 触发事件 | 推送的 tag |
| -------- | ---------- |
| push `master` | `latest` |
| push tag `v1.2.3` | `1.2.3` + `1.2` + `1` |
| PR | 不推送，仅校验构建 |

`docker/metadata-action` 的 `type=semver` 会自动从 `v1.2.3` 这类 tag 生成 `1.2.3` / `1.2` / `1` 三层版本号；`type=raw` + `enable` 表达式让 `latest` 只在 `master` 分支时生成。

## 多平台说明

单 job 里通过 `platforms` 一次列出所有平台，`docker/build-push-action` 会自动构建各平台并合并成 manifest list 推送，无需手动合并（`matrix` + 手动 `imagetools create` 仅在平台数量多或单平台构建特别耗时时才值得）。

### 关键：Go 项目必须原生交叉编译

如果你的 Dockerfile 里用 `go build` 且没有指定 `GOOS`/`GOARCH`，buildx 会对非本机架构（如 `s390x`/`ppc64le`）用 QEMU 完整模拟运行整个构建，耗时可能从几分钟暴涨到几十分钟。

Go 项目应这样写 Dockerfile，让每个平台都在 native 上交叉编译：

```dockerfile
FROM --platform=$BUILDPLATFORM golang:1.26-alpine AS build

RUN apk add --no-cache git
WORKDIR /workspace

COPY go.mod .
COPY go.sum .
RUN go mod download

COPY . .

ARG TARGETOS
ARG TARGETARCH
RUN CGO_ENABLED=0 GOOS=$TARGETOS GOARCH=$TARGETARCH go build -o webhook -ldflags '-w -extldflags "-static"' .

FROM alpine:3.21
RUN apk add --no-cache ca-certificates
COPY --from=build /workspace/webhook /usr/local/bin/webhook
ENTRYPOINT ["webhook"]
```

关键点：`FROM --platform=$BUILDPLATFORM` 让构建阶段始终跑在 native 架构上，`GOOS=$TARGETOS GOARCH=$TARGETARCH` 由 buildx 自动注入目标架构，Go 交叉编译几乎是原生的速度。

## 进阶：Matrix 方案（平台多或需按架构分流）

当需要覆盖 `arm/v6`、`arm/v7`、`386` 等更多平台，或单个平台构建特别耗时想并行时，可用 matrix 每个平台一个 job，最后手动合并 manifest list。参考 [imroc/image-porter 的 docker-ci.yml](https://github.com/imroc/image-porter/blob/main/.github/workflows/docker-ci.yml)。

其核心差异：`strategy.matrix.platform` 拆分 → 每个 job 用 `build-push-action` 构建单平台并导出 digest → 上传 artifact → 单独 `merge` job 用 `docker buildx imagetools create` 合并成 manifest list。

## 常见坑

* **基础镜像 tag 不存在**：升级 Go/基础镜像版本时，先确认 Docker Hub 上该 tag 真实存在（如 `golang:1.26-alpine3.21` 不存在，应改用 `golang:1.26-alpine`）。
* **Node 版本 deprecation 告警**：GitHub 托管 runner 默认 Node 版本升级后，旧版 action（`actions/checkout@v4`、`docker/*-action@v5/v6` 等）会告警但仍可运行，后续可逐步升级 action 版本。
