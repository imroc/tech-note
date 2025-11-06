# 为已有 commit 追加签名 (Signed-off-by)

为最新 commit 追加 Signed-off-by：

```bash
git commit --amend --no-edit -s
```

为指定 commit 到 HEAD 的所有 commit 追加 Signed-off-by （不包含这个指定 commit）：

```bash
git rebase --exec 'git commit --amend --no-edit -n -s' -i  6b875eefa162fefb493b7be1bb5680d4328e5088
```

> 替换 commit id。
