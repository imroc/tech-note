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

## 配置 lrzsz

1. 安装 lrzsz。

```bash
brew install lrzsz
```

2. 写入脚本文件 `/usr/local/bin/iterm2-recv-zmodem.sh`。

```bash title="/usr/local/bin/iterm2-recv-zmodem.sh"
#!/bin/bash
# Author: Matt Mastracci (matthew@mastracci.com)
# AppleScript from http://stackoverflow.com/questions/4309087/cancel-button-on-osascript-in-a-bash-script
# licensed under cc-wiki with attribution required
# Remainder of script public domain

osascript -e 'tell application "iTerm2" to version' >/dev/null 2>&1 && NAME=iTerm2 || NAME=iTerm
if [[ $NAME = "iTerm" ]]; then
  FILE=$(osascript -e 'tell application "iTerm" to activate' -e 'tell application "iTerm" to set thefile to choose folder with prompt "Choose a folder to place received files in"' -e "do shell script (\"echo \"&(quoted form of POSIX path of thefile as Unicode text)&\"\")")
else
  FILE=$(osascript -e 'tell application "iTerm2" to activate' -e 'tell application "iTerm2" to set thefile to choose folder with prompt "Choose a folder to place received files in"' -e "do shell script (\"echo \"&(quoted form of POSIX path of thefile as Unicode text)&\"\")")
fi

if [[ $FILE = "" ]]; then
  echo Cancelled.
  # Send ZModem cancel
  echo -e \\x18\\x18\\x18\\x18\\x18
  sleep 1
  echo
  echo \# Cancelled transfer
else
  cd "$FILE"
  /opt/homebrew/bin/rz --rename --escape --binary --bufsize 4096
  sleep 1
  echo
  echo
  echo \# Sent \-\> $FILE
fi
```

3. 写入脚本文件 `/usr/local/bin/iterm2-send-zmodem.sh`。

```bash title="/usr/local/bin/iterm2-send-zmodem.sh"
#!/bin/bash
# Author: Matt Mastracci (matthew@mastracci.com)
# AppleScript from http://stackoverflow.com/questions/4309087/cancel-button-on-osascript-in-a-bash-script
# licensed under cc-wiki with attribution required
# Remainder of script public domain

osascript -e 'tell application "iTerm2" to version' >/dev/null 2>&1 && NAME=iTerm2 || NAME=iTerm
if [[ $NAME = "iTerm" ]]; then
  FILE=$(osascript -e 'tell application "iTerm" to activate' -e 'tell application "iTerm" to set thefile to choose file with prompt "Choose a file to send"' -e "do shell script (\"echo \"&(quoted form of POSIX path of thefile as Unicode text)&\"\")")
else
  FILE=$(osascript -e 'tell application "iTerm2" to activate' -e 'tell application "iTerm2" to set thefile to choose file with prompt "Choose a file to send"' -e "do shell script (\"echo \"&(quoted form of POSIX path of thefile as Unicode text)&\"\")")
fi
if [[ $FILE = "" ]]; then
  echo Cancelled.
  # Send ZModem cancel
  echo -e \\x18\\x18\\x18\\x18\\x18
  sleep 1
  echo
  echo \# Cancelled transfer
else
  /opt/homebrew/bin/sz "$FILE" --escape --binary --bufsize 4096
  sleep 1
  echo
  echo \# Received "$FILE"
fi
```

4. 赋予权限。

```bash
sudo chmod 777 /usr/local/bin/iterm2-*
```

5. 点击 iTerm2 的设置界面 `Perference` -> `Profiles` -> `Default` -> `Advanced` -> `Triggers` 的 `Edit` 按钮。

![](https://image-host-1251893006.cos.ap-chengdu.myqcloud.com/2024%2F10%2F21%2F20241021163242.png)

6. 按照以下内容配置。

```txt
Regular expression: rz waiting to receive.\*\*B0100
            Action: Run Silent Coprocess
        Parameters: /usr/local/bin/iterm2-send-zmodem.sh
           Instant: checked

Regular expression: \*\*B00000000000000
            Action: Run Silent Coprocess
        Parameters: /usr/local/bin/iterm2-recv-zmodem.sh
           Instant: checked
```

![](https://image-host-1251893006.cos.ap-chengdu.myqcloud.com/2024%2F10%2F21%2F20241021163330.png)

7. 搞定！可通过 `rz` 和 `sz` 命令测试（无需重启 iTerm2）。


## iTerm2 配置与美化

- [iTerm2 配置与美化-自定义配置和优化教程（上）](https://icloudnative.io/posts/customize-iterm2-1/)
