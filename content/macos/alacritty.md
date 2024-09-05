# Alacritty：一款 Rust 写的跨平台终端模拟器

## 概述

Alacritty 是一款跨平台的终端模拟器，支持 Linux、macOS 和 Windows，在各个开源的终端模拟器中，它的 star 数量相对较多。

* 开源地址：https://github.com/alacritty/alacritty
* 官网网站：https://alacritty.org/

## 在 MacOS 下让 Alt 键生效

有些运行在终端里的应用会使用 Alt 键作为快捷键，比如 zellij, neovim 等，而 Alacritty 默认不将 Option 键映射为 Alt 键，需要在 `alacritty.toml` 中做如下配置：

```toml showLineNubmers title="alacritty.toml"
[window]
option_as_alt = "Both"
```
