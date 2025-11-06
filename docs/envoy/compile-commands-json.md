# 生成 compile_commands.json

## 背景

`compile_commands.json` 是 clangd 用来索引项目代码的文件，用于代码跳转，代码补全，代码重构等功能。许多 IDE 和编辑器使用基于 clangd 的 LSP 来支持 C/C++ 项目，envoy 是基于 C++ 的大型项目，想要对 envoy 源码进行索引，就需要先生成 `compile_commands.json`，本文介绍如何生成。

## 编译 envoy

修改 `bazel/repositories_extra.bzl`，将 `ignore_root_user_error = False` 改为 `ignore_root_user_error = True`:

```bzl
def envoy_dependencies_extra(
        python_version = PYTHON_VERSION,
        ignore_root_user_error = True):
```

启动 envoy 的 编译容器一次:

```bash
./ci/run_envoy_docker.sh bash
```

然后退出容器，用刚启动的容器对应的镜像再手动拉起一个容器：

```bash
docker run --rm -it -v /data:/data envoyproxy/envoy-build-ubuntu:41c5a05d708972d703661b702a63ef5060125c33 bash
```

> 注意替换镜像的 tag

> 我将源码存放到 `/data` 数据盘目录，避免占用系统盘空间。

进入项目目录，执行编译:

```bash
bazel build envoy 
```

> 不加 `-c opt` 编译来优化编译，加快编译速度，耐心等待几小时

## 生成compile_commands.json

```bash
TEST_TMPDIR=/tmp ./tools/gen_compilation_database.py
```

> 执行完后在项目根目录会生成 `compile_commands.json`，用于 clangd 对项目代码进行索引，这样才能正常跳转代码。

## 解决 unknown argument

查看代码时，第一行可能会报 `unknown argument: xxx` 之类的错，解决方法是在项目根目录创建 `.clangd` 文件，加入以下内容：

```yaml
CompileFlags:
  Add: -Wno-unknown-warning-option
  Remove: [-m*, -f*]
```

## 其它

清理cache:

```bash
bazel clean --expunge
```
