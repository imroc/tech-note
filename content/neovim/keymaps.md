# 快捷键

## 编辑器

| 快捷键      | 描述                 | 
| ----------- | -------------------- | 
| `<leader>.` | 退出                 |
| `<leader>X` | 强制退出(不提示保存) |
| `<leader>;` | 保存文件             |

## 查找

| 快捷键            | 描述                                           | 
| ----------------- | ---------------------------------------------- | 
| `<leader><space>` | 找文件(如果是git项目，则排除git管理之外的文件) |
| `<leader>ff`      | 找文件(从当前文件的 root dir 找)               |
| `<leader>fF`      | 找文件(从 cwd 找)                              |
| `gf`              | 找文件(在 neotree 中聚焦的目录下找) |

## 搜索

| 快捷键       | 描述                                        | 
| ------------ | ------------------------------------------- | 
| `<leader>/`  | 搜文本 (从当前文件的 root dir 找)           |
| `<leader>sg` | 搜文本 (从当前文件的 root dir 找)           |
| `<leader>sG` | 搜文本 (从 cwd 找)                          |
| `<leader>sA` | 搜文本 (使用参数)                           |
| `<leader>sk` | 搜快捷键                                    |
| `gs`         | 搜文本(在 neotree 中聚焦的目录下)           |
| `gS`         | 搜文本(在 neotree 中聚焦的目录下且使用参数) |

## 标签(Tab)

| 快捷键           | 描述              | 
| ---------------- | ----------------- | 
| `<leader>'`      | 删除当前 tab      |
| `<leader><Tab>o` | 打开 tab 选择列表 |

## Git

| 快捷键       | 描述                                              | 
| ------------ | ------------------------------------------------- | 
| `<leader>gh` | Git History                                       |
| `<leader>gf` | Git History (当前文件)                            |
| `<leader>gs` | Git Status (用 telescope 列出有改动的文件)        |
| `<leader>gS` | Git Status (用 Diffview 查看有改动的文件)         |
| `<leader>gd` | Git Diff (用 Diffview 查看当前文件的改动)         |
| `<leader>gd` | Toggle Git Diff (用 Git Signs 查看当前文件的改动) |
| `<leader>gt` | 打开 tig (root dir)                               |
| `<leader>gT` | 打开 tig (cwd)                                    |
| `<leader>gg` | 打开 lazygit (root dir)                           |
| `<leader>gG` | 打开 lazygit (cwd)                                |
| `<leader>gx` | 关闭 Diffview                                     |
| `<leader>ge` | 打开 Git Explorer                                 |
| `<leader>gH` | 打开 GitHub 菜单                                  |
| `<leader>gb` | 显示当前文件中所有行的 Git Blame                  |

## Markdown

| 快捷键           | 描述                     | 
| ---------------- | ------------------------ | 
| `<localleader>f` | 格式化当前表格           |
| `<localleader>p` | 浏览器预览或关闭当前文档 |
| `<localleader>l` | 粘贴链接                 |

## K8S

| 快捷键 | 描述    | 
| ------ | ------- | 
| `gk`   | 打开k9s |

## Diffview

| 快捷键       | 描述               | 
| ------------ | ------------------ | 
| `]c`         | 下一个改动         |
| `<M-.>`      | 下一个改动         |
| `[c`         | 上一个改动         |
| `<M-,>`      | 上一个改动         |
| `zR`         | 展开所有未改动的行 |
| `zM`         | 隐藏所有为改动的行 |
| `<leader>gx` | 关闭 Diffview      |
| `gf`         | 跳转到文件         |

## 终端(Terminal)

| 快捷键  |  描述                         |
| ------- | ----------------------------- |
| `<M-u>` | 终端进入 Normal 模式          |
| `<C-/>` | 打开终端(root dir)            |
| `gt`    | 打开终端(当前文件的 root dir) |
| `gT`    | 打开终端(当前文件目录)        |

## 窗口

| 快捷键        | 描述           |
| ------------- | -------------- |
| `<leader>\|`  | 窗口左右分割   |
| `<leader>w\|` | 窗口左右分割   |
| `<leader>-`   | 窗口上下分割   |
| `<leader>w-`  | 窗口上下分割   |
| `<leader>wd`  | 删除窗口       |
| `<leader>ww`  | 切换到其它窗口 |

## Tab

| 快捷键           | 描述           |
| ---------------- | -------------- |
| `<leader>>`      | 下一个标签页   |
| `<leader><`      | 上一个标签页   |
| `<leader><Tab>o` | 选择标签页打开 |
| `<leader>'`      | 关闭标签页     |
| `<leader><Tab>d` | 关闭标签页     |

## Buffer

| 快捷键       | 描述                      |
| ------------ | ------------------------- |
| `<leader>bb` | 切换到另一个 buffer       |
| `<leader>bd` | 删除 Buffer               |
| `<leader>bp` | 对 Buffer 标记/取消标记   |
| `<leader>bP` | 删除所有没打标记的 Buffer |
| `<leader>bo` | 删除所有其它 Buffer       |
| `<leader>o`  | 删除所有其它 Buffer       |
| `<leader>bl` | 删除所有左边的 Buffer     |
| `<leader>br` | 删除所有右边的 Buffer     |
| `<leader>,`         | 跳转到指定 buffer         |

## Debug

| 快捷键       | 描述               |
| ------------ | ------------------ |
| `<leader>du` | 打开调试UI         |
| `<leader>dc` | 开始调试(Continue) |
| `<M-L>`      | Step Into          |
| `<M-H>`      | Step Out           |
| `<M-J>`      | Step Over          |
| `<M-K>`      | Continue           |

## 书签(Bookmark)

| 快捷键      | 描述                |
| ----------- | ------------------- |
| `<M-m>`     | 打开/关闭书签选择页 |
| `<leader>B` | 添加当前行到书签    |
