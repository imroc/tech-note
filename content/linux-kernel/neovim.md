# 使用 Neovim 阅读 Linux 内核源码

## Neovim 与 LSP

Neovim 上阅读源码，可通过 LSP 插件提供代码补全、跳转等功能，Linux 内核源码主要是 C 语言，可使用 clangd 作为 LSP Server，我用的 [LazyVim](https://www.lazyvim.org/)，直接通过 `:LazyExtras` 启用 `lang.clangd` 扩展即可。

## MacOS 注意事项

### 文件系统区分大小写问题

linux 内核源码有些文件名是大写的，而 MacOS 默认文件系统是不区分大小写的，所以在 MacOS 上克隆 linux 内核源码时可能会有报错：

![](https://image-host-1251893006.cos.ap-chengdu.myqcloud.com/2025%2F04%2F09%2F20250409132338.png)

解决办法：新建一个不区分大小写的分区，然后克隆源码到该分区。

以下是操作步骤：

1. 打开**磁盘工具**，在卷宗上点**分区**：

![](https://image-host-1251893006.cos.ap-chengdu.myqcloud.com/2025%2F04%2F09%2F20250409133114.png)

2. 点击"+"号：

![](https://image-host-1251893006.cos.ap-chengdu.myqcloud.com/2025%2F04%2F09%2F20250409133235.png)

3. 点击**添加分区**：

![](https://image-host-1251893006.cos.ap-chengdu.myqcloud.com/2025%2F04%2F09%2F20250409133429.png)

4. **容量**根据需求填写，格式选带**区分大小写**的：

![](https://image-host-1251893006.cos.ap-chengdu.myqcloud.com/2025%2F04%2F09%2F20250409133727.png)

5. 点击**应用**，再点击**分区**：

![](https://image-host-1251893006.cos.ap-chengdu.myqcloud.com/2025%2F04%2F09%2F20250409133853.png)

6. 点**继续**：

![](https://image-host-1251893006.cos.ap-chengdu.myqcloud.com/2025%2F04%2F09%2F20250409134031.png)

7. 等待分区完成。

8. 在新分区上克隆源码：

```bash
cd /Volumes/case-sensitive
git clone https://github.com/torvalds/linux.git
```

9. （可选）将新分区下的 linux 源码软链到用户目录下（方便源码统一管理，比如所有 git 源码都放到 `~/dev` 下）：

```bash
ln -s /Volumes/case-sensitive/linux ~/dev/linux
```

### 安装 clang/clangd

macOS 自带有 clang 和 clangd，但是版本比较低，可以用 brew 安装最新版：

```bash
brew install llvm
```
