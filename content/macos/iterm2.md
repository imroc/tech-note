# iTerm2

## 允许应用访问粘贴板

如果希望 tmux 中，或者在 tmux 中的 neovim 复制的文本能同步到系统粘贴板，且终端使用的是 iTerm2，需要勾选此选项：

![](https://image-host-1251893006.cos.ap-chengdu.myqcloud.com/2023%2F10%2F14%2F20231014185718.png)

> 如果使用的是 wezterm，默认不需要额外设置。

## 让 Alt 键生效

有些终端应用会使用 Alt 键作为快捷键，比如 zellij, neovim 等，而 iTerm2 默认不将 Option 键映射为 Alt 键，需要在 `Settings-Profiles-Default-Keys` 中，将 `Left Option Key` 和 `Right Option Key` 选到 `Esc+`：

![](https://image-host-1251893006.cos.ap-chengdu.myqcloud.com/2024%2F09%2F05%2F20240905113402.png)
