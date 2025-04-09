# 使用 Neovim 阅读 Linux 内核源码

## Neovim 与 LSP

Neovim 上阅读源码，可通过 LSP 插件提供代码补全、跳转等功能，Linux 内核源码主要是 C 语言，可使用 clangd 作为 LSP Server，我用的 [LazyVim](https://www.lazyvim.org/)，直接通过 `:LazyExtras` 启用 `lang.clangd` 扩展即可。

## 生成 compile_commands.json

clangd 需要一个 `compile_commands.json` 文件来索引项目文件，该文件通常由项目中提供的工具生成，生成过程会编译项目源码。

首先编译一下：

```bash
make CC=clang defconfig

make CC=clang
```

如果编译成功，执行以下命令生成 `compile_commands.json`：

```bash
python3 ./scripts/clang-tools/gen_compile_commands.py
```

如果编译报错，请参考后面的注意事项。

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

### 安装高版本 make

高版本内核对 make 版本要求较高，macOS 自带的 make 可能会满足不了要求而报错：

```bash
$ make CC=clang defconfig
Makefile:15: *** GNU Make >= 4.0 is required. Your Make version is 3.81.  Stop.
```

可通过 brew 安装高版本的 make：

```bash
brew install make
```

安装后默认需使用 `gmake` 命令而不是 `make`，如：

```bash
gmake CC=clang defconfig
```

> 你也可以将 `/opt/homebrew/opt/make/libexec/gnubin` 加入 `$PATH` 中，并且保证优先级比系统自带 make 命令所在的路径高，这样就可以直接使用 `make` 命令了。

### 安装高版本 clang/clangd

macOS 自带的 clang 和 clangd 版本比较低，可以用 brew 安装 llvm，里面带了 clang 和 clangd：

```bash
brew install llvm
```

### 安装高版本 ld

macOS 也有自带的 ld（linker），但会导致失败：

```bash
$ gmake CC=clang defconfig
*** Default configuration is based on 'defconfig'
ld: unknown option: --version
ld: unknown linker
scripts/Kconfig.include:57: Sorry, this linker is not supported.
gmake[2]: *** [scripts/kconfig/Makefile:95: defconfig] Error 1
gmake[1]: *** [/Volumes/case-sensitive/linux/Makefile:734: defconfig] Error 2
gmake: *** [Makefile:251: __sub-make] Error 2
```

可以通过 brew 安装 lld（llvm 的 linker）：

```bash
brew install lld
```

将其软链到某个目录，确保这个目录在 `$PATH` 中且优先于系统自带的 ld 所在的目录（`/usr/bin`）：
