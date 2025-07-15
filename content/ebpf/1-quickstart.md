# 快速入门

## eBPF 的本质是什么？

Linux 内核提供的一种动态 hook 机制，可以将自定义代码逻辑 hook 到指定内核事件上，当内核触发该事件时就会调用相应的自定义代码逻辑。

## 有哪些内核事件类型?

想要用 eBPF 在指定内核事件上 hook 自定义代码逻辑，首先要知道内核支持哪些事件，大概有以下集中类型的事件：

- 系统调用
- 网络包到达
- 函数调用
- 定时器

更多详情参考 [附录：hook 内核事件](appendix/hook-events)。

## eBPF 程序运行的原理是什么？

1. 编写 C 语言 eBPF 程序。
2. 用 LLVM 把 eBPF 程序编译为 BPF 字节码。
3. 通过 [bpf 系统调用](https://man7.org/linux/man-pages/man2/bpf.2.html) 加载 BPF 字节码到内核。
4. 内核验证并运行 BPF 字节码，并把相应的状态保存到 BPF 映射中（map）。
5. 用户态程序读取 BPF 映射并做相应的处理。

![](https://image-host-1251893006.cos.ap-chengdu.myqcloud.com/2025%2F07%2F10%2F20250710140201.png)

从上面可以看出，一个完整的 eBPF 程序通常分为用户态和内核态两部分：用户态负责 eBPF 程序的加载、事件绑定以及 eBPF 程序运行结果的汇总输出；内核态运行在 eBPF 虚拟机中，负责定制和控制系统的运行状态；内核态的 eBPF 程序通过 BPF 映射（Map）用户态程序交互（更多详情参考 [附录：BPF 映射](appendix/bpf-map)）。

> 为什么不直接都在内核态完成所有操作？因为内核要确保 eBPF 代码执行的安全性，会有许多限制，所以 eBPF 代码一般不会包含业务逻辑，只用于获取相应内核事件相关的关键数据。业务逻辑会通过用户态程序实现，比如用 python, golang, rust 等语言写的用户态程序获取 C 语言写的 eBPF 内核态程序返回的数据，然后用户态程序拿到数据后再做相应的业务逻辑处理。

## bpf 系统调用

[bpf 系统调用](https://man7.org/linux/man-pages/man2/bpf.2.html) 是 eBPF 用户态程序与内核交互的接口，可通过 `man bpf` 查看说明，系统调用的格式如下：

```c
#include <linux/bpf.h>

int bpf(int cmd, union bpf_attr *attr, unsigned int size);
```

- `cmd`: 操作命令，比如 `BPF_PROG_LOAD` 就是加载 eBPF 程序。
- `attr`: 操作命令对应的属性。
- `size`: 属性的大小。

不同版本的内核所支持的 BPF 命令是不同的，在内核头文件 `include/uapi/linux/bpf.h` 中的 `bpf_cmd` 定义就是对应内核版本支持的 BPF 操作命令，在 `v6.14` 内核已支持 38 个指令：

```c
enum bpf_cmd {
	BPF_MAP_CREATE,
	BPF_MAP_LOOKUP_ELEM,
	BPF_MAP_UPDATE_ELEM,
	BPF_MAP_DELETE_ELEM,
	BPF_MAP_GET_NEXT_KEY,
	BPF_PROG_LOAD,
	BPF_OBJ_PIN,
	BPF_OBJ_GET,
	BPF_PROG_ATTACH,
	BPF_PROG_DETACH,
	BPF_PROG_TEST_RUN,
	BPF_PROG_RUN = BPF_PROG_TEST_RUN,
	BPF_PROG_GET_NEXT_ID,
	BPF_MAP_GET_NEXT_ID,
	BPF_PROG_GET_FD_BY_ID,
	BPF_MAP_GET_FD_BY_ID,
	BPF_OBJ_GET_INFO_BY_FD,
	BPF_PROG_QUERY,
	BPF_RAW_TRACEPOINT_OPEN,
	BPF_BTF_LOAD,
	BPF_BTF_GET_FD_BY_ID,
	BPF_TASK_FD_QUERY,
	BPF_MAP_LOOKUP_AND_DELETE_ELEM,
	BPF_MAP_FREEZE,
	BPF_BTF_GET_NEXT_ID,
	BPF_MAP_LOOKUP_BATCH,
	BPF_MAP_LOOKUP_AND_DELETE_BATCH,
	BPF_MAP_UPDATE_BATCH,
	BPF_MAP_DELETE_BATCH,
	BPF_LINK_CREATE,
	BPF_LINK_UPDATE,
	BPF_LINK_GET_FD_BY_ID,
	BPF_LINK_GET_NEXT_ID,
	BPF_ENABLE_STATS,
	BPF_ITER_CREATE,
	BPF_LINK_DETACH,
	BPF_PROG_BIND_MAP,
	BPF_TOKEN_CREATE,
};
```

## 如何开发 eBPF 程序？

eBPF 程序分为两部分：
1. 内核态 eBPF 程序：只能用 C 编写，编译后生成 BPF 字节码，需通过 bpf 系统调用加载到内核指定 hook 点并并运行。
2. 用户态程序：可以用任何语言编写，主要负责将内核态 eBPF 程序加载到内核并运行，然后通过 BPF 映射读取内核态 eBPF 程序输出的数据，最后做相应的业务逻辑处理。

- 对于 1，bcc 提供了一些 C 语言库函数来简化开发，但依赖内核头文件和 LLVM，较新版本的 linux 内核中添加了 [tools/lib/bpf](https://github.com/torvalds/linux/tree/v6.15/tools/lib/bpf)，抽取成了 [libbpf](https://github.com/libbpf/libbpf)，可用于开发 eBPF 程序所引用的 C 语言工具库函数。现在，基本上大多内核态 eBPF 程序都使用 libbpf 来开发了。
- 对于 2，bcc 提供了一些 Python 语言前端，[cilium/ebpf](https://github.com/cilium/ebpf) 提供了 Go 语言前端。

## 有哪些常见的开发方式？

### BCC

通常我们都会借助 [BCC](https://github.com/iovisor/bcc) 来开发 eBPF 程序，它给我们提供了一个抽象，不需要开发者关心 eBPF 程序的编译、加载、运行等细节。具体而言，开发者用 C 编写内核态 eBPF 程序获取相应内核事件的数据，然后用 Python 编写内核态程序读取这些数据并做相应的业务逻辑处理。

使用 bcc 开发的 eBPF 程序的运行条件是：安装 LLVM 和内核头文件。

### bpftrace

如果只想通过简单的脚本来分析或定位内核相关问题，通常使用 bpftrace 来搞定，它基于 bcc，提供类似 awk 的脚本语言，可实现一行命令完成复杂的内核追踪分析。

使用 bpftrace 运行 eBPF 程序的条件是：安装 bcc 以及 bcc 依赖的 LLVM 和内核头文件。

### libbpf

libbpf 是从内核中抽离出来的标准库，用它开发的 eBPF 程序可以直接分发执行，这样就不需要每台机器都安装 LLVM 和内核头文件了。

基于 libbpf 开发的 eBPF 程序的运行条件是：内核开启 BTF 特性，需要非常较新的发行版才会默认开启（如 RHEL 8.2+ 和 Ubuntu 20.10+ 等）。

## 如何选择开发方式？

不管用哪种开发方式，它们的流程都是先找出跟踪点，然后在 eBPF 部分获取想要的数据并保存到 BPF 映射中，最后在用户空间程序中读取 BPF 映射的内容并输出出来。

实际应用中，这几种开发方式有不同使用场景：
- bpftrace: 通常用在快速排查和定位系统上，它支持用单行脚本的方式来快速开发并执行一个 eBPF 程序。
- BCC: 通常用在开发复杂的 eBPF 程序中，它内置的各种小工具也是目前应用最为广泛的 eBPF 小程序。
- libbpf: 是从内核中抽离出来的标准库，用它开发的 eBPF 程序可以直接分发执行，不再需要在每台机器上都安装 LLVM 和内核头文件。
