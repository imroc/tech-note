# 压缩历史

## 场景

如果 Git 历史太太，可能超过 Git 仓库托管平台的限制（比如 Gitee 限制是单个仓库上限是 1024M），此时如果 Git 历史不是很重要可以尝试压缩历史来减少 Git 仓库大小。

## 方法

1. 执行以下命令:

```bash
git rebase -i --root
```

2. 将需要压缩的 Git 历史从 pick 改为 squash 或 s。比如将所有 commit 压缩为一个 commit，就只保留第一个 pick，后面都改为 squash。

3. 保存并退出，等待压缩完成。

4. 强制推送：

```bash
git push --force
```

5. 在 Git 仓库托管平台触发 GC（比如 gitee 是在仓库的 `管理-仓库设置-存储库 GC` 这个地方触发），触发后会将没有被使用的对象和资源进行删除或压缩。
