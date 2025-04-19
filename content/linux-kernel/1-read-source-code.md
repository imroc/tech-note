# 利用 LSP 阅读 Linux 内核源码

## LSP 介绍

语言服务器协议（LSP）是编辑器与语言智能服务间的标准化接口，支持代码补全、跳转定义等功能，实现跨语言和工具的无缝兼容，提升开发效率，不同的编辑器和 IDE 通常都支持安装语言插件，而很多语言插件通常都基于 LSP 实现。

## 生成 compile_commands.json

Linux 内核源码主要是 C 语言，通常使用 clangd 作为 LSP Server，clangd 需要一个 `compile_commands.json` 文件来索引项目文件，该文件通常由项目中提供的工具生成，生成过程会编译项目源码。

首先需要编译一下内核（使用 clang 作为编译器）：

```bash
# 编译所有模块，避免部分代码无法跳转
make CC=clang allyesconfig

# 使用 clang 编译
make CC=clang

# 如果希望加快编译速度，可以用 -j 参数指定并发编译的核数，最大不超过机器总核数
# make CC=clang -j 16
```
> 强烈建议在 Linux 机器上编译。笔者尝试过在 MacOS 上编译，但遇到各种报错，比如某些依赖的头文件找不到，或者编译工具版本不兼容等（make, clang, ld），没有全部解决，就不折腾了，直接在 Linux 上编译。

如果编译成功，执行以下命令生成 `compile_commands.json`：

```bash
python3 ./scripts/clang-tools/gen_compile_commands.py
```

> 较低版本的内核（比如5.4），需使用低版本 clang，且使用 `python3 ./scripts/gen_compile_commands.py` 来生成 `compile_commands.json` (注意脚本路径不一样)。

## 编辑器或 IDE 安装支持 C/C++ 的 LSP 插件

接下来为你的编辑器或 IDE 安装支持 C/C++ 的 LSP 插件，我用的 Neovim，基于 [LazyVim](https://www.lazyvim.org/) 配置，直接通过 `:LazyExtras` 启用 `lang.clangd` 扩展即可，如果使用其它编辑器或 IDE 可根据自身情况自行安装 LSP 插件。

## 开始阅读源码

如果你的编辑器或 IDE 本来就在这台编译内核源码的 Linux 机器上，那么就可以直接阅读源码了，打开源码文件后会自动索引，可实现代码跳转。

以下是效果：

<video controls width="90%">
    <source src="https://image-host-1251893006.cos.ap-chengdu.myqcloud.com/videos/read-linux-kernel-use-neovim.mp4" type="video/mp4" />
</video>

## 在其他机器上阅读源码

如果需要在其它机器上阅读源码，比如日常使用 MacOS 做开发机，那么可以按照下面的方法来做。

1. 在 Linux 机器上压缩源码文件（用 `--exclude` 参数忽略一些自动生成的但与代码阅读无关的文件）：
[](2025-04-10_.md)
```bash
tar --exclude={'.git','.cache','include/config','*.cmd','*.o','*.a','*.bin','*.gz','bzImage','.tmp*','vmlinux','vmlinux.unstripped'} -zcvf linux.tar.gz linux
```
> 如果希望保留 Git 历史，可从 `--exclude` 中移除 `.git`。

2. 将压缩后的源码文件复制到开发机上并解压。
3. 修改 `compile_commands.json`，使用工具批量替换该文件中的源码根目录的绝对路径。比如在 Linux 上源码目录是 `/data/git/linux`，而开发机的源码目录是 `/Volumes/case-sensitive/linux-6.14`，就用工具将 `compile_commands.json` 中的 `/data/git/linux` 全部替换成 `/Volumes/case-sensitive/linux-6.14`，此时 `compile_commands.json` 中每个数组元素类似下面这样：
```json
{
  "command": "clang -Wp,-MMD,./..vmlinux.export.o.d -nostdinc -I./arch/x86/include -I./arch/x86/include/generated -I./include -I./include -I./arch/x86/include/uapi -I./arch/x86/include/generated/uapi -I./include/uapi -I./include/generated/uapi -include ./include/linux/compiler-version.h -include ./include/linux/kconfig.h -include ./include/linux/compiler_types.h -D__KERNEL__ --target=x86_64-linux-gnu -fintegrated-as -Werror=unknown-warning-option -Werror=ignored-optimization-argument -Werror=option-ignored -Werror=unused-command-line-argument -Werror -std=gnu11 -fshort-wchar -funsigned-char -fno-common -fno-PIE -fno-strict-aliasing -mno-sse -mno-mmx -mno-sse2 -mno-3dnow -mno-avx -fcf-protection=branch -fno-jump-tables -m64 -falign-loops=1 -mno-80387 -mno-fp-ret-in-387 -mstack-alignment=8 -mskip-rax-setup -march=x86-64 -mtune=generic -mno-red-zone -mcmodel=kernel -mstack-protector-guard-reg=gs -mstack-protector-guard-symbol=__ref_stack_chk_guard -Wno-sign-compare -fno-asynchronous-unwind-tables -mretpoline-external-thunk -mindirect-branch-cs-prefix -mfunction-return=thunk-extern -fpatchable-function-entry=16,16 -fno-delete-null-pointer-checks -O2 -fstack-protector-strong -fomit-frame-pointer -ftrivial-auto-var-init=zero -fno-stack-clash-protection -falign-functions=16 -fstrict-flex-arrays=3 -fno-strict-overflow -fno-stack-check -fno-builtin-wcslen -Wall -Wundef -Werror=implicit-function-declaration -Werror=implicit-int -Werror=return-type -Werror=strict-prototypes -Wno-format-security -Wno-trigraphs -Wno-frame-address -Wno-address-of-packed-member -Wmissing-declarations -Wmissing-prototypes -Wframe-larger-than=2048 -Wno-gnu -Wno-format-overflow-non-kprintf -Wno-format-truncation-non-kprintf -Wvla -Wno-pointer-sign -Wcast-function-type -Wimplicit-fallthrough -Werror=date-time -Werror=incompatible-pointer-types -Wenum-conversion -Wextra -Wunused -Wno-unused-but-set-variable -Wno-unused-const-variable -Wno-format-overflow -Wno-override-init -Wno-pointer-to-enum-cast -Wno-tautological-constant-out-of-range-compare -Wno-unaligned-access -Wno-enum-compare-conditional -Wno-missing-field-initializers -Wno-type-limits -Wno-shift-negative-value -Wno-enum-enum-conversion -Wno-sign-compare -Wno-unused-parameter    -DKBUILD_MODFILE='\"/.vmlinux.export\"' -DKBUILD_BASENAME='\".vmlinux.export\"' -DKBUILD_MODNAME='\".vmlinux.export\"' -D__KBUILD_MODNAME=kmod_.vmlinux.export -c -o .vmlinux.export.o .vmlinux.export.c",
  "directory": "/Volumes/case-sensitive/linux-6.14",
  "file": "/Volumes/case-sensitive/linux-6.14/.vmlinux.export.c"
},
```
4. 做完以上操作后，就可以在开发机上通过 Neovim 阅读内核源码了。

如果你看的是比较旧版本的内核（比如 5.4），那么可能还需要拷贝 clang 的 include 目录。

比如在 Linux 上编译生成的 `compile_commands.json` 中的每个数组元素类似这样：

```json
{
  "command": "clang -Wp,-MD,ipc/.msg.o.d -nostdinc -isystem /root/.linuxbrew/Cellar/llvm@12/12.0.1_1/lib/clang/12.0.1/include -I./arch/x86/include -I./arch/x86/include/generated  -I./include -I./arch/x86/include/uapi -I./arch/x86/include/generated/uapi -I./include/uapi -I./include/generated/uapi -include ./include/linux/kconfig.h -include ./include/linux/compiler_types.h -D__KERNEL__ -Qunused-arguments -Wall -Wundef -Werror=strict-prototypes -Wno-trigraphs -fno-strict-aliasing -fno-common -fshort-wchar -fno-PIE -Werror=implicit-function-declaration -Werror=implicit-int -Werror=return-type -Wno-format-security -std=gnu89 -no-integrated-as -Werror=unknown-warning-option -mno-sse -mno-mmx -mno-sse2 -mno-3dnow -mno-avx -fcf-protection=none -m64 -mno-80387 -mstack-alignment=8 -mtune=generic -mno-red-zone -mcmodel=kernel -DCONFIG_AS_CFI=1 -DCONFIG_AS_CFI_SIGNAL_FRAME=1 -DCONFIG_AS_CFI_SECTIONS=1 -DCONFIG_AS_SSSE3=1 -DCONFIG_AS_AVX=1 -DCONFIG_AS_AVX2=1 -DCONFIG_AS_AVX512=1 -DCONFIG_AS_SHA1_NI=1 -DCONFIG_AS_SHA256_NI=1 -Wno-sign-compare -fno-asynchronous-unwind-tables -mretpoline-external-thunk -fno-delete-null-pointer-checks -Wno-frame-address -Wno-address-of-packed-member -O2 -Wframe-larger-than=2048 -fstack-protector-strong -Wno-format-invalid-specifier -Wno-gnu -Wno-tautological-compare -mno-global-merge -Wno-unused-const-variable -fomit-frame-pointer -Wdeclaration-after-statement -Wvla -Wno-pointer-sign -Wno-array-bounds -fno-strict-overflow -fno-merge-all-constants -fno-stack-check -Wno-error=date-time -Werror=incompatible-pointer-types -fmacro-prefix-map=./= -Wno-initializer-overrides -Wno-format -Wno-sign-compare -Wno-format-zero-length -Wno-pointer-to-enum-cast    -DKBUILD_BASENAME='\"msg\"' -DKBUILD_MODNAME='\"msg\"' -c -o ipc/msg.o ipc/msg.c",
  "directory": "/data/git/linux",
  "file": "ipc/msg.c"
}
```

其中 `-isystem` 指定了 include 已安装的 vllm 的 clang 头文件目录，当拷贝到开发机后，也将 Linux 下的 clang 头文件目录拷过来（上面示例目录是 `/root/.linuxbrew/Cellar/llvm@12/12.0.1_1/lib/clang/12.0.1/include`）放到内核源码根目录下，可以将目录名称改为 `clang-include`，然后修改 `compile_commands.json` 中的 `-isystem` 参数为 `-isystem /Volumes/case-sensitive/linux/clang-include`（假设内核源码根目录为 `/Volumes/case-sensitive/linux`）:

```json
{
  "command": "clang -Wp,-MD,ipc/.msg.o.d -nostdinc -isystem /Volumes/case-sensitive/linux/clang-include -I./arch/x86/include -I./arch/x86/include/generated  -I./include -I./arch/x86/include/uapi -I./arch/x86/include/generated/uapi -I./include/uapi -I./include/generated/uapi -include ./include/linux/kconfig.h -include ./include/linux/compiler_types.h -D__KERNEL__ -Qunused-arguments -Wall -Wundef -Werror=strict-prototypes -Wno-trigraphs -fno-strict-aliasing -fno-common -fshort-wchar -fno-PIE -Werror=implicit-function-declaration -Werror=implicit-int -Werror=return-type -Wno-format-security -std=gnu89 -no-integrated-as -Werror=unknown-warning-option -mno-sse -mno-mmx -mno-sse2 -mno-3dnow -mno-avx -fcf-protection=none -m64 -mno-80387 -mstack-alignment=8 -mtune=generic -mno-red-zone -mcmodel=kernel -DCONFIG_AS_CFI=1 -DCONFIG_AS_CFI_SIGNAL_FRAME=1 -DCONFIG_AS_CFI_SECTIONS=1 -DCONFIG_AS_SSSE3=1 -DCONFIG_AS_AVX=1 -DCONFIG_AS_AVX2=1 -DCONFIG_AS_AVX512=1 -DCONFIG_AS_SHA1_NI=1 -DCONFIG_AS_SHA256_NI=1 -Wno-sign-compare -fno-asynchronous-unwind-tables -mretpoline-external-thunk -fno-delete-null-pointer-checks -Wno-frame-address -Wno-address-of-packed-member -O2 -Wframe-larger-than=2048 -fstack-protector-strong -Wno-format-invalid-specifier -Wno-gnu -Wno-tautological-compare -mno-global-merge -Wno-unused-const-variable -fomit-frame-pointer -Wdeclaration-after-statement -Wvla -Wno-pointer-sign -Wno-array-bounds -fno-strict-overflow -fno-merge-all-constants -fno-stack-check -Wno-error=date-time -Werror=incompatible-pointer-types -fmacro-prefix-map=./= -Wno-initializer-overrides -Wno-format -Wno-sign-compare -Wno-format-zero-length -Wno-pointer-to-enum-cast    -DKBUILD_BASENAME='\"msg\"' -DKBUILD_MODNAME='\"msg\"' -c -o ipc/msg.o ipc/msg.c",
  "directory": "/Volumes/case-sensitive/linux",
  "file": "ipc/msg.c"
}
```

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


