---
sidebar_position: 10
---
# 安装 fish shell

## MacOS

使用 brew 安装：

```bash
brew install fish
```

将 fish shell 添加到 `/etc/shells` 中：

```bash
sudo vi /etc/shells
```

粘贴下面一行：

```txt
/opt/homebrew/bin/fish
```

然后将 fish 设置为默认 shell:

```bash
chsh -s /opt/homebrew/bin/fish
```

## Ubuntu

使用 apt 安装：

```bash
sudo apt install fish
```

然后将 fish 设置为默认 shell:

```bash
chsh -s /usr/bin/fish
```
