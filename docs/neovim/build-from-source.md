# 从源码安装

## 场景

有时希望使用新的特性但还没有 release 版本，这时可以考虑从源码安装。


## MacOS

首先确保前置依赖已安装：

```bash
brew install ninja cmake gettext curl git
```

然后执行以下命令编译：

```bash
make CMAKE_INSTALL_PREFIX=$HOME/.local/bin/nvim install
```
