# 使用 libbpf 开发 eBPF

## 前提条件

相比 bcc 和 bpftrace，用 libbpf 开发的 eBPF 的依赖最少，只需内核启用 BTF 特性即可（编译内核时开启 `CONFIG_DEBUG_INFO_BTF=y` 和 `CONFIG_DEBUG_INFO=y` 这两个编译选项，较新的发行版都默认开启了的），运行不依赖 LLVM 和内核头文件，可直接在不同机器上运行。

查看当前内核是否启用 BTF 相关编译选项的方法：

```bash
$ cat /boot/config-* | grep -E 'CONFIG_DEBUG_INFO=|CONFIG_DEBUG_INFO_BTF='

CONFIG_DEBUG_INFO=y
CONFIG_DEBUG_INFO_BTF=y
```

## 导出内核头文件

```bash
sudo bpftool btf dump file /sys/kernel/btf/vmlinux format c > vmlinux.h
```

## 开发内核态 eBPF 程序

如 [execsnoop.bpf.c](https://github.com/feiskyer/ebpf-apps/blob/main/bpf-apps/execsnoop.bpf.c)。

## 编译并生成脚手架头文件

使用 clang 和 bpftool 将其编译成 BPF 字节码，然后再生成其脚手架头文件  execsnoop.skel.h （注意，脚手架头文件的名字一般定义为  `<程序名>.skel.h`）：

```bash
clang -g -O2 -target bpf -D__TARGET_ARCH_x86_64 -I/usr/include/x86_64-linux-gnu -I. -c execsnoop.bpf.c -o execsnoop.bpf.o
bpftool gen skeleton execsnoop.bpf.o > execsnoop.skel.h
```

> 脚手架头文件会放到 `execsnoop.skel.h` 中，这个头文件包含了 BPF 字节码和相关的管理函数。

## 开发用户态程序

有了 eBPF 内核态程序，我们还需要用用户态程序来完成 eBPF 程序的加载、挂载到跟踪点以及通过 BPF 映射获取和打印执行结果等几个步骤，bcc 通常是用 python 来写用户态程序，libbpf 我们通常用 C 来写用户态程序，如 [execsnoop.c](https://github.com/feiskyer/ebpf-apps/blob/main/bpf-apps/execsnoop.c)。

然后将其编译为可执行文件：

```bash
clang -g -O2 -Wall -I . -c execsnoop.c -o execsnoop.o
clang -Wall -O2 -g execsnoop.o -static -lbpf -lelf -lz -o execsnoop
```

最后执行：

```bash
$ sudo ./execsnoop
COMM             PID    RET ARGS
sh               276871   0 /bin/sh -c which ps
which            276872   0 /usr/bin/which ps
```
