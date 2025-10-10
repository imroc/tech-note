# eBPF 代码分析

## 代码目录

eBPF C 代码在 `bpf` 目录下，包含以下代码文件：
- `bpf_alignchecker.c`: TODO
- `bpf_host.c`: TODO
- `bpf_lxc.c`: TODO
- `bpf_network.c`: TODO
- `bpf_overlay.c`: TODO
- `bpf_probes.c`: TODO
- `bpf_sock.c`: TODO
- `bpf_sock_term.c`: TODO
- `bpf_wireguard.c`: TODO
- `bpf_xdp.c`: TODO

另外还 include 了一些辅助函数和宏，在 `bpf/include` 目录下：

- `bpf/include/bpf`: 一些 cilium 专用的辅助函数和宏。
- `bpf/include/linux`:  一些 linux 内核中的数据结构、常量和枚举类型。
## cilium 辅助宏和函数

### bpf/include/bpf/helpers.h

- BPF_FUNC: 用于声明 bpf 辅助函数的宏，传入的 NAME 为内核支持的 [Helper functions](https://docs.ebpf.io/linux/helper-function/) 名称减去 `bpf_` 前缀，在 cilium 的 ebpf C 代码中就直接使用该名称作为函数名称进行调用。
- BPF_FUNC_REMAP: 用于将一颗 bpf 辅助函数的名称映射到另一个名称，在 cilium 的 ebpf C 代码中就可以使用新的名称进行调用，用于提升代码可读性。

## bpf_lxc.c

- `TAIL_CT_LOOKUP4/TAIL_CT_LOOKUP6`: 定义一个名为 NAME 的函数并指定尾调用 ID 号，该函数中会判断当前数据包是否命中 conntrack 且符合 `CONDITION`，如果都满足，则会调用另一个名为 `TARGET_NAME` 的函数（尾调用 ID 为 `TAEGET_ID`）。
