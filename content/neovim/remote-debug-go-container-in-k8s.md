# 使用 neovim 远程调试 k8s 容器内的 golang 应用

## 概述

云原生时代，大量应用使用容器化部署在 k8s 内，且使用 golang 编程语言开发的应用越来越多。在开发过程中，如何调试容器内的 golang 应用呢？本文将介绍如何使用 neovim 远程调试 k8s 容器内的 golang 应用。

## 什么情况下需要远程调试？

复现一些 bug 需要一定的复现条件，且应用之间还有依赖，不方便直接在本地调试，此时最好的方式是直接调试 k8s 容器里正在运行中的 go 进程。

## neovim 依赖插件

确保 [nvim-dap](https://github.com/mfussenegger/nvim-dap) 插件安装好。

由于不需要在本地启动调试服务，所以不需要安装 [nvim-dap-go](https://github.com/leoluz/nvim-dap-go)。

## neovim 配置

```lua
local dap = require("dap")
dap.adapters.dapserver = {
  type = "server",
  host = "127.0.0.1",
  port = 40000,
}
local resolved_path = vim.fn.getcwd() .. "/debug-roc/launch.json"
if not vim.loop.fs_stat(resolved_path) then
  return
end
require("dap.ext.vscode").load_launchjs(resolved_path, { server = { "go" } })
```

以上配置仅供参考，可根据实际需求进行修改，相关解释：

* 加载并解析 vscode 格式的 `launch.json` 文件来配置项目的调试信息，配置文件默认路径是项目下的 `.vscode/launch.json`，我这里改成了 `debug-roc/launch.json` 路径。
* `nvim-dap` 插件作为 dap client，需要连接 dap server 进行调试，我这里固定将 server 地址设置为 `127.0.0.1:40000`。
* `load_launchjs` 传入的 server 列表是哪些文件类型需要解析 `launch.json` 配置（执行 `:DapContinue` 命令弹出的调试选项列表将包含解析到的调试配置）。

##  编译 delve

调试 go 应用需要使用 [delve](https://github.com/go-delve/delve) ，这里我们需要编译一个 dlv 二进制，用于在容器内启动调试服务。

```bash
GOOS=linux GOARCH=amd64 CGO_ENABLED=0 go build -ldflags '-extldflags "-static"'
```

> 这里使用的是静态编译，确保编译出来的二进制不依赖于容器内的动态库，避免因环境依赖问题导致 dlv 无法启动。

然后将编译出来的 dlv 二进制拷贝到正在运行的容器内：

```bash
kubectl cp -c <CONTAINER> ./dlv <POD>:/dlv
```

## 编译容器镜像的注意事项

1. 尽量使容器内 go 应用二进制和 dlv 二进制使用相同 go 版本进行编译，避免出现一些版本不兼容问题。
2. 确保容器内的 go 应用在 go build 时没有加上 `-trimpath` 参数，否则下的断点不起作用。
3. 确保容器内的 go 应用二进制是由 neovim 所在机器上的 go 命令编译，否则下的断点不起作用。

有些项目 Dockerfile 使用多阶段构建，不依赖本机的 go 命令进行编译，这种情况使得第 3 点条件无法满足，可以考虑在专门为调试新增一个 Dockerfile，使用本机 go 命令编译二进制，然后用 COPY 指令将其拷贝到镜像内。

## 启动 delve

使用 kubectl 启动 delve，作为 dap server 监听一个端口：

```bash
kubectl exec -it -c <CONTAINER> <POD>  -- /dlv dap -l 0.0.0.0:40000
```

如果怕因 kubectl 断开导致 delve 也退出，可以先 exec 进去然后使用 `nohup` 命令启动 dlv (依赖容器内包含 nohup 命令)：

```bash
kubectl exec -it -c <CONTAINER> <POD> -- sh
nohup /dlv dap -l 0.0.0.0:40000 &
```

## 端口转发

使用 kubectl 进行端口转发，将 delve 监听的端口转发到本地：

```bash
kubectl port-forward pod/<POD> 40000:40000
```

## 配置 launch.json

根据 neovim 的 dap 相关配置，在相应路径下新增调试配置文件（默认是 `.vscode/launch.json`，我使用的是 `debug-roc/launch.json`）:

```json showLineNumbers title="launch.json"
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "dapserver",
      "request": "attach",
      "name": "Debug Go (Attach to Remote Process)",
      "mode": "local",
      "processId": 1
    }
  ]
}
```

* `type` 与 `dap.adapters` 下新增的 adapter 字段名对应。
* `mode` 为 local 是指相对于 dap server 的本地调试，这里 dap server 是 dlv，是远程部署在容器的，而目标调试进程相对于 dlv 来说就是本机进程。
* `processId` 是目标调试进程的 pid，这里是 1，因为一般容器内的应用是以 1 号进程启动的，如有不同可根据实际情况调整。

## 开始调试

使用 neovim 打开 go 项目，在需要下断点的地方执行 `:DapToggleBreakpoint` 命令，然后执行 `:DapContinue` 选择调试配置，选到这里配置的 `Debug Go (Attach to Remote Process)`，然后调试就开始了，想办法按照复现条件触发一下，让进程逻辑走到断点处，然后就可以停在断点处进行调试了。
