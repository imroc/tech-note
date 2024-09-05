# im-select: Vim/Neovim 自动切换输入法

## 概述

使用 [im-select](https://github.com/daipeihust/im-select) 可以实现在 Vim/Neovim 中自动切换输入法。

场景：在插入模式下输入中文，按 Esc 后进入 Normal 模式，此时自动切换到英文输入法，以便让在 Normal 模式下的操作生效，比如 hjkl 移动光标；当再次进入插入模式时，又自动切换回上次在插入模式下的中文输入法，可以直接继续写中文。

## 安装

```bash
brew tap daipeihust/tap
brew install im-select
```

## Neovim 配置

`lazy.nvim` 配置示例：

```lua
{
  "keaising/im-select.nvim",
  lazy = false,
  opts = {
    default_im_select = "com.apple.keylayout.ABC",
    default_command = "im-select",
  },
}
```

## VSCode 的 Vim 插件配置

```jsonc
  // The input method for your normal mode, find more information [here](https://github.com/VSCodeVim/Vim#input-method).
  "vim.autoSwitchInputMethod.defaultIM": "com.apple.keylayout.ABC",
  // If enabled, the input method switches automatically when the mode changes.
  "vim.autoSwitchInputMethod.enable": true,
  // The shell command to get current input method.
  "vim.autoSwitchInputMethod.obtainIMCmd": "/opt/homebrew/bin/im-select",
  // The shell command to switch input method.
  "vim.autoSwitchInputMethod.switchIMCmd": "/opt/homebrew/bin/im-select {im}",
```
