# 以远程分支为准强制覆盖本地分支

## 场景

如果有人对某个分支做了 `git push --force` 这样的强制覆盖操作，导致历史 commit 被修改或删除，其它人就无法直接 `git pull` 来更新代码了。

## 解决方案

```bash
# 1. 首先拉取远程最新状态
git fetch origin

# 2. 重置本地分支到远程分支
git reset --hard origin/main
```
