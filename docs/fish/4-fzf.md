# 集成 fzf

## fzf 自动补全

安装插件 fifc:

```bash
fisher install gazorby/fifc
```

安装后默认覆盖 tab 键，用 tab 触发自动补全并用 fzf 进行选择。另外，如果选择的是文件、路径时，会调用其它工具进行预览（如用 bat 预览文件内容、chafa 预览图片），如果依赖工具不存在就 fallback，还默认提供了 `Ctrl+o` 快捷键用编辑器打开文件。

## 使用快捷键触发 fzf 搜索

:::tip[说明]

fzf.fish 当前维护不积极，issue 、PR 和 discussions 都禁用了，详见这个 [wiki](https://github.com/PatrickF1/fzf.fish/wiki)。

:::

安装插件 fzf.fish:

```bash
fisher install PatrickF1/fzf.fish
```

默认绑定以下快捷键：

| 快捷键       | 功能           |
| ------------ | -------------- |
| `Ctrl+Alt+F` | 搜索目录       |
| `Ctrl+Alt+L` | 搜索Git Log    |
| `Ctrl+Alt+S` | 搜索Git Status |
| `Ctrl+V`     | 搜索变量       |

