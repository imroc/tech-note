# eBPF 程序类型

## 有哪些 eBPF 程序类型？

不同的 eBPF 程序类型可以 hook 的内核事件不同，要搞清楚能 hook 哪些内核事件之前，需要先了解一下 eBPF 程序类型。

在内核头文件 [include/uapi/linux/bpf.h](https://github.com/torvalds/linux/blob/v6.15/include/uapi/linux/bpf.h#L1027) 中 `bpf_prog_type` 定义了所有 eBPF 程序类型:

```c
enum bpf_prog_type {
	BPF_PROG_TYPE_UNSPEC,
	BPF_PROG_TYPE_SOCKET_FILTER,
	BPF_PROG_TYPE_KPROBE,
	BPF_PROG_TYPE_SCHED_CLS,
	BPF_PROG_TYPE_SCHED_ACT,
	BPF_PROG_TYPE_TRACEPOINT,
	BPF_PROG_TYPE_XDP,
	BPF_PROG_TYPE_PERF_EVENT,
	BPF_PROG_TYPE_CGROUP_SKB,
	BPF_PROG_TYPE_CGROUP_SOCK,
	BPF_PROG_TYPE_LWT_IN,
	BPF_PROG_TYPE_LWT_OUT,
	BPF_PROG_TYPE_LWT_XMIT,
	BPF_PROG_TYPE_SOCK_OPS,
	BPF_PROG_TYPE_SK_SKB,
	BPF_PROG_TYPE_CGROUP_DEVICE,
	BPF_PROG_TYPE_SK_MSG,
	BPF_PROG_TYPE_RAW_TRACEPOINT,
	BPF_PROG_TYPE_CGROUP_SOCK_ADDR,
	BPF_PROG_TYPE_LWT_SEG6LOCAL,
	BPF_PROG_TYPE_LIRC_MODE2,
	BPF_PROG_TYPE_SK_REUSEPORT,
	BPF_PROG_TYPE_FLOW_DISSECTOR,
	BPF_PROG_TYPE_CGROUP_SYSCTL,
	BPF_PROG_TYPE_RAW_TRACEPOINT_WRITABLE,
	BPF_PROG_TYPE_CGROUP_SOCKOPT,
	BPF_PROG_TYPE_TRACING,
	BPF_PROG_TYPE_STRUCT_OPS,
	BPF_PROG_TYPE_EXT,
	BPF_PROG_TYPE_LSM,
	BPF_PROG_TYPE_SK_LOOKUP,
	BPF_PROG_TYPE_SYSCALL, /* a program that can execute syscalls */
	BPF_PROG_TYPE_NETFILTER,
};
```

> `BPF_PROG_TYPE_UNSPEC` 表示未定义的类型。

一般一个内核不会支持所有的类型，不同的内核版本和编译配置选项所支持的 eBPF 程序类型列表也不一样，可以通过下面命令查询当前内核支持的 eBPF 程序类型：

```bash
bpftool feature probe | grep program_type
```

输出类似如下：

```txt
eBPF program_type socket_filter is available
eBPF program_type kprobe is available
eBPF program_type sched_cls is available
eBPF program_type sched_act is available
eBPF program_type tracepoint is available
eBPF program_type xdp is available
eBPF program_type perf_event is available
eBPF program_type cgroup_skb is available
eBPF program_type cgroup_sock is available
eBPF program_type lwt_in is available
eBPF program_type lwt_out is available
eBPF program_type lwt_xmit is available
eBPF program_type sock_ops is available
eBPF program_type sk_skb is available
eBPF program_type cgroup_device is available
eBPF program_type sk_msg is available
eBPF program_type raw_tracepoint is available
eBPF program_type cgroup_sock_addr is available
eBPF program_type lwt_seg6local is available
eBPF program_type lirc_mode2 is NOT available
eBPF program_type sk_reuseport is available
eBPF program_type flow_dissector is available
eBPF program_type cgroup_sysctl is available
eBPF program_type raw_tracepoint_writable is available
eBPF program_type cgroup_sockopt is available
eBPF program_type tracing is available
eBPF program_type struct_ops is available
eBPF program_type ext is available
eBPF program_type lsm is available
eBPF program_type sk_lookup is available
eBPF program_type syscall is available
eBPF program_type netfilter is available
```

根据具体功能和应用场景的不同，这些程序类型大致可以划分为三类：
- 第一类是跟踪，即从内核和程序的运行状态中提取跟踪信息，来了解当前系统正在发生什么。
- 第二类是网络，即对网络数据包进行过滤和处理，以便了解和控制网络数据包的收发过程。
- 第三类是除跟踪和网络之外的其他类型，包括安全控制、BPF 扩展等等。

## 跟踪类

跟踪类 eBPF 程序主要用于从系统中提取跟踪信息，进而为监控、排错、性能优化等提供数据支撑。

KPROBE、TRACEPOINT 以及 PERF_EVENT 都是最常用的 eBPF 程序类型，大量应用于监控跟踪、性能优化以及调试排错等场景中。bcc 工具集中的大部分工具都属于这个类型。

## 网络类

网络类 eBPF 程序主要用于对网络数据包进行过滤和处理，进而实现网络的观测、过滤、流量控制以及性能优化等各种丰富的功能。

根据事件触发位置的不同，网络类 eBPF 程序又可以分为：
1. XDP（eXpress Data Path，高速数据路径）程序：网络驱动程序刚刚收到数据包时触发执行，它只是在内核协议栈之前处理数据包，仅支持网卡收包。
2. TC（Traffic Control，流量控制）程序。同时支持网卡收包和发包。对于接收的网络包，TC 程序在网卡接收（GRO）之后、协议栈处理（包括 IP 层处理和 iptables 等）之前执行；对于发送的网络包，TC 程序在协议栈处理（包括 IP 层处理和 iptables 等）之后、数据包发送到网卡队列（GSO）之前执行。另外，TC 程序可以直接获取内核解析后的网络报文数据结构sk_buff（XDP 则是 xdp_buff）。
3. 套接字程序。用于过滤、观测或重定向套接字网络包。
4. cgroup 程序。用于对 cgroup 内所有进程的网络过滤、套接字选项以及转发等进行动态控制，它最典型的应用场景是对容器中运行的多个进程进行网络控制。
