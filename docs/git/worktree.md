# Git Worktree

## 添加

```bash
# 添加 test 分支到 ../test 目录
git worktree add ../test
# 添加 test-1 分支到 ../test 目录
git worktree add ../test test-1
# 添加 origin 下的 test/test-1 分支到 ../test 目录
git worktree add ../test origin/test/test-1
# 基于当前分支创建 test 分支，并添加该分支到 worktree，目录为 ../test
git worktree add -b test ../test
```

## 查询

```bash
$ git worktree list
/data/git/linux/master                         379f604cc3dc [master]
/data/git/linux/tencentos-lts-5.4.119-20.0009  edc9e113fa37 [linux-5.4/lts/5.4.119-20.0009]
/data/git/linux/tencentos-lts-5.4.241-30.0017  79059974d91f [linux-5.4/lts/5.4.241-30.0017]
/data/git/linux/v6.15                          379f604cc3dc [heads/v6.15]
```

## 删除

```bash
# 删除 worktree 中指定目录
git worktree remove ../test
```
