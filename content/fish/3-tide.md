# 安装 tide

## 什么是 tide

[tide](https://github.com/IlanCosman/tide) 可以理解为 fish shell 中最漂亮的一个主题，类似 zsh 中的 [Powerlevel10k](https://github.com/romkatv/powerlevel10k)。

## 使用 fisher 安装 tide

使用 fisher 安装 tide:

```bash
fisher install IlanCosman/tide@v6
```

## 配置 tide

安装好 tide 后，需要配置一下，执行下面的命令:

```bash
tide configure
```

## 小技巧：移除不需要的 prompt item

可使用 tide 的函数 `_tide_find_and_remove` 将不需要的 prompt items 移除，比如下面将移除 tide 的 context 提示:

```bash
_tide_find_and_remove context tide_right_prompt_items
```

> context 中包含 SSH 登录的注解信息，有点占地方，而且对于本人来说用处不大，所以将其移除不展示。
