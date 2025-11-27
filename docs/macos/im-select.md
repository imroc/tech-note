# 自动切换输入法工具

## 概述

借用一些工具可以实现在 Vim/Neovim 或者 VsCode 的 Vim 模式中自动切换输入法。

场景：在插入模式下输入中文，按 Esc 后进入 Normal 模式，此时自动切换到英文输入法，以便让在 Normal 模式下的操作生效，比如 hjkl 移动光标；当再次进入插入模式时，又自动切换回上次在插入模式下的中文输入法，可以直接继续写中文。

## 工具列表

-  [im-select](https://github.com/daipeihust/im-select)：最开始的自动切换项目，但对 CJKV（中文/日文/韩文 /越南文）输入源的切换不可靠。
-  [macism](https://github.com/laishulu/macism)：解决了 im-select 的 CJKV 切换问题，但通过 brew 安装的最新版存在窗口焦点丢失的问题，参考 [这个 issue](https://github.com/laishulu/macism/issues/25)。
-  [ims-mac](https://github.com/LuSrackhall/ims-mac) ：没有 macism 窗口失焦的问题，但存在 im-select 的 CJKV 切换问题。

## 我是怎么选择的？

我使用了 macism，不使用最新版，因为最新版存在窗口焦点丢失的问题，手动编译 v3.0.8 版本可以解决这个问题，但美中不足的是有时会出现输入法切换了但中英文没切换的情况，等待 macism 未来能在新版中解决窗口失焦问题。


## Neovim 配置

`lazy.nvim` 配置示例：

```lua
{
  "keaising/im-select.nvim",
  lazy = false,
  opts = {
    default_im_select = "com.apple.keylayout.ABC",
    default_command = "macism",
  },
}
```

## VSCode 的 Vim 插件配置

```json
  // The input method for your normal mode, find more information [here](https://github.com/VSCodeVim/Vim#input-method).
  "vim.autoSwitchInputMethod.defaultIM": "com.apple.keylayout.ABC",
  // If enabled, the input method switches automatically when the mode changes.
  "vim.autoSwitchInputMethod.enable": true,
  // The shell command to get current input method.
  "vim.autoSwitchInputMethod.obtainIMCmd": "/opt/homebrew/bin/macism",
  // The shell command to switch input method.
  "vim.autoSwitchInputMethod.switchIMCmd": "/opt/homebrew/bin/macism {im}",
```
