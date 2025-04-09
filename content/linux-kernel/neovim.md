# 使用 Neovim 阅读 Linux 内核源码

## Neovim 与 LSP

Neovim 上阅读源码，可通过 LSP 插件提供代码补全、跳转等功能，Linux 内核源码主要是 C 语言，可使用 clangd 作为 LSP Server，我用的 [LazyVim](https://www.lazyvim.org/)，直接通过 `:LazyExtras` 启用 `lang.clangd` 扩展即可。

## 生成 compile_commands.json

clangd 需要一个 `compile_commands.json` 文件来索引项目文件，该文件通常由项目中提供的工具生成，生成过程会编译项目源码。

首先需要编译一下内核（使用 clang 作为编译器）：

```bash
make CC=clang defconfig

make CC=clang

# 如果希望加快编译速度，可以用 -j 参数指定并发编译的核数，最大不超过机器总核数
# make CC=clang -j 16
```
> 强烈建议在 Linux 机器上编译。笔者尝试过在 MacOS 上编译，但遇到各种报错，比如某些依赖的头文件找不到，或者编译工具版本不兼容等（make, clang, ld），没有全部解决，就不折腾了，直接在 Linux 上编译。

如果编译成功，执行以下命令生成 `compile_commands.json`：

```bash
python3 ./scripts/clang-tools/gen_compile_commands.py
```

> 较低版本的内核（比如5.4），需使用低版本 clang，且使用 `python3 ./scripts/gen_compile_commands.py` 来生成 `compile_commands.json`。

如果你的 Neovim 本就在这台编译内核源码的 Linux 机器上，那么就可以直接用  Neovim 阅读源码了，打开源码文件后会自动索引，可实现代码跳转。

## 在其他机器上阅读源码

如果需要在其它机器上阅读源码，比如日常使用 MacOS 做开发机，那么可以按照下面的方法来做。

1. 在 Linux 机器上压缩源码文件（用 `--exclude` 参数忽略一些自动生成的但与代码阅读无关的文件）：

```bash
tar --exclude={'.git','.cache','include/config','*.cmd','*.o','*.a','*.bin','*.gz','bzImage','.tmp*','vmlinux','vmlinux.unstripped'} -zcvf linux.tar.gz linux
```

2. 将压缩后的源码文件复制到开发机上并解压。
3. 修改 `compile_commands.json`，使用工具批量替换该文件中的源码根目录的绝对路径。比如在 Linux 上源码目录是 `/data/git/linux`，而开发机的源码目录是 `/Users/roc/dev/linux`，就用工具将 `compile_commands.json` 中的 `/data/git/linux` 全部替换成 `/Users/roc/dev/linux`。
4. 做完以上操作后，就可以在开发机上通过 Neovim 阅读内核源码了。

## MacOS 注意事项：文件系统区分大小写问题

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

