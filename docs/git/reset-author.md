# 修改 Git 历史中的 author

## 概述

本文介绍 Git 修改历史 commit 中 author 的方法。

## Git 命令修改 author 方法

如果只是最新一条的 commit 的 author，只需一条命令：

```bash
git commit --amend --author 'roc <roc@imroc.cc>'
```

> 注意修改 author 为自己的。

如果要修改的 commit 不是最新一条，可使用 git rebase 来改。

1. 先 rebase -i 一下，edit 指定 commit：

```bash
git rebase -i HEAD~1
```
> 如果不是修改最新 commit，可根据情况改下 `-i` 参数。

2. 然后修改 author:

```bash
git commit --amend --author 'roc <roc@imroc.cc>'
```

3. 最后完成 rebase:

```bash
git rebase --continue
```

![](https://image-host-1251893006.cos.ap-chengdu.myqcloud.com/gif/reset-author-in-git.gif)
## LazyGit 修改 author 方法

选中 commit 后按 `a` 弹出选项，选择 `Reset author`:

![](https://image-host-1251893006.cos.ap-chengdu.myqcloud.com/gif/reset-author-in-lazygit.gif)
