# eBPF 代码分析

## 代码目录

eBPF C 代码在 `bpf` 目录下，包含以下代码文件：
- `bpf_alignchecker.c`: 
- `bpf_host.c`: 
- `bpf_lxc.c`: 
- `bpf_network.c`: 
- `bpf_overlay.c`: 
- `bpf_probes.c`: 
- `bpf_sock.c`: 
- `bpf_sock_term.c`: 
- `bpf_wireguard.c`: 
- `bpf_xdp.c`: 

## 内核函数

## bpf_lxc.c

- `TAIL_CT_LOOKUP4/TAIL_CT_LOOKUP6`: 定义一个名为 NAME 的函数并指定尾调用 ID 号，该函数中会判断当前数据包是否命中 conntrack 且符合 `CONDITION`，如果都满足，则会调用另一个名为 `TARGET_NAME` 的函数（尾调用 ID 为 `TAEGET_ID`）。
