# 自动切换输入法工具

## 概述

借用一些工具可以实现在 Vim/Neovim 中自动切换输入法。

场景：在插入模式下输入中文，按 Esc 后进入 Normal 模式，此时自动切换到英文输入法，以便让在 Normal 模式下的操作生效，比如 hjkl 移动光标；当再次进入插入模式时，又自动切换回上次在插入模式下的中文输入法，可以直接继续写中文。

## 工具列表

-  [im-select](https://github.com/daipeihust/im-select)：最开始的自动切换项目，但对 CJKV（中文/日文/韩文 /越南文）输入源的切换不可靠。
-  [macism](https://github.com/laishulu/macism)：解决了 im-select 的 CJKV 切换问题，但通过 brew 安装的最新版存在窗口焦点丢失的问题，参考 [这个 issue](https://github.com/laishulu/macism/issues/25)。
-  [ims-mac](https://github.com/LuSrackhall/ims-mac) ：没有 macism 和 im-select 的问题。

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
