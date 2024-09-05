# iTerm2：MacOS 下使用最广泛的终端模拟器

## 概述

iTerm2 只支持 MacOS，但也是 MacOS 下用的最多的终端模拟器，很成熟，根据本人的使用经验，它的渲染效果比其它终端模拟器都要好（与 Alaricity、WezTerm 等对比过），不管是中文还是英文，不管是自带显示器还是外接显示器，都能很好的渲染。相比之下，WezTerm 的中文渲染效果在外接显示器下就比较差，粗体也显示的很细，中英文混合时有时会显得比较挤。Alaricity 显示还行，但输入中文时，标点符号无法输入中文的标点。

## 允许应用访问粘贴板

如果希望 tmux 中，或者在 tmux 中的 neovim 复制的文本能同步到系统粘贴板，且终端使用的是 iTerm2，需要勾选此选项：

![](https://image-host-1251893006.cos.ap-chengdu.myqcloud.com/2023%2F10%2F14%2F20231014185718.png)

> 如果使用的是 wezterm，默认不需要额外设置。

## 让 Alt 键生效

有些运行在终端里的应用会使用 Alt 键作为快捷键，比如 zellij, neovim 等，而 iTerm2 默认不将 Option 键映射为 Alt 键，需要在 `Settings-Profiles-Default-Keys` 中，将 `Left Option Key` 和 `Right Option Key` 选到 `Esc+`：

![](https://image-host-1251893006.cos.ap-chengdu.myqcloud.com/2024%2F09%2F05%2F20240905113402.png)

## 改变主题

默认主题显示的颜色太浅，有时候看起来有点吃力，可修改成其它 color scheme，在 [这里](https://iterm2colorschemes.com/) 下载需要的 color scheme，比如我下载的是 `tokyonight`，跟我的 Neovim 里的主题一致。

下载好后在 `Settings-Profiles-Default-Colors` 中，点击 `Color Presets`，选择 `Import`，选择下载好的 `tokyonight.itermcolors` 文件进行导入：

![](https://image-host-1251893006.cos.ap-chengdu.myqcloud.com/2024%2F09%2F05%2F20240905140508.png)

导入后在 `Color Presets` 里选择 `tokyonight` 即可。
