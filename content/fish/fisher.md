---
sidebar_position: 20
---

# 安装 fisher 插件管理器

## 概述

[fisher](https://github.com/jorgebucaran/fisher) 是 fish shell 的插件管理器，下面介绍如何安装和使用。

## 设置 fisher 目录

fisher 默认会将插件和自身安装在 `$HOME/.config/fish` 下，与我们的自定义配置混在一起，维护起来不太方便，建议是将 fisher  以及安装的插件都放在单独的子目录下，下面介绍设置方法。

1. 创建目录 `$HOME/.config/fish/plugins`:
  ```bash
  mkdir -p $HOME/.config/fish/plugins
  ```

2. 创建文件 `$HOME/.config/fish/conf.d/fisher.fish`:
  ```bash
  set -g fisher_path ~/.config/fish/plugins
  
  set fish_complete_path $fish_complete_path[1] $fisher_path/completions $fish_complete_path[2..]
  set fish_function_path $fish_function_path[1] $fisher_path/functions $fish_function_path[2..]
  
  for file in $fisher_path/conf.d/*.fish
      source $file 2>/dev/null
  end
  ```

## 安装

前面的步骤完成后，新建一个终端，然后再执行下面的命令安装 fisher:

```bash
curl -sL https://raw.githubusercontent.com/jorgebucaran/fisher/main/functions/fisher.fish | source && fisher install jorgebucaran/fisher
```

一切正常的话，fisher 已经将自己安装在了 `$HOME/.config/fish/plugins` 目录下面。

## 使用 fisher 管理插件

fisher 安装好后，就可以使用 fisher 命令来安装、卸载、升级、查询插件了，可通过以下命令查看用法：

```bash
fisher --help
```
