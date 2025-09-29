# eBPF 辅助函数

## eBPF 辅助函数介绍

内核为 eBPF 程序提供了一些可调用的辅助函数，这些函数的 API 有稳定性保障，不会随着内核版本的变化而变化。

更多介绍参考 [Helper functions](https://docs.ebpf.io/linux/helper-function/)。

## 查询当前内核可用辅助函数列表

可以通过 `bpftool feature probe` 来查询各类 eBPF 程序可以调用的辅助函数，比如 `kprobe`:

```bash
$ bpftool feature probe
...
eBPF helpers supported for program type kprobe:
        - bpf_map_lookup_elem
        - bpf_map_update_elem
        - bpf_map_delete_elem
        - bpf_probe_read
        - bpf_ktime_get_ns
        - bpf_get_prandom_u32
        - bpf_get_smp_processor_id
        - bpf_tail_call
        - bpf_get_current_pid_tgid
        - bpf_get_current_uid_gid
        - bpf_get_current_comm
        - bpf_perf_event_read
        - bpf_perf_event_output
        - bpf_get_stackid
        - bpf_get_current_task
        - bpf_current_task_under_cgroup
        - bpf_get_numa_node_id
        - bpf_probe_read_str
        - bpf_perf_event_read_value
        - bpf_override_return
        - bpf_get_stack
        - bpf_get_current_cgroup_id
        - bpf_map_push_elem
        - bpf_map_pop_elem
        - bpf_map_peek_elem
        - bpf_spin_lock
        - bpf_spin_unlock
        - bpf_strtol
        - bpf_strtoul
        - bpf_send_signal
        - bpf_probe_read_user
        - bpf_probe_read_kernel
        - bpf_probe_read_user_str
        - bpf_probe_read_kernel_str
        - bpf_send_signal_thread
        - bpf_jiffies64
        - bpf_get_ns_current_pid_tgid
        - bpf_get_current_ancestor_cgroup_id
        - bpf_ktime_get_boot_ns
        - bpf_ringbuf_output
        - bpf_ringbuf_reserve
        - bpf_ringbuf_submit
        - bpf_ringbuf_discard
        - bpf_ringbuf_query
        - bpf_get_task_stack
        - bpf_copy_from_user
        - bpf_snprintf_btf
        - bpf_per_cpu_ptr
        - bpf_this_cpu_ptr
        - bpf_task_storage_get
        - bpf_task_storage_delete
        - bpf_get_current_task_btf
        - bpf_for_each_map_elem
        - bpf_snprintf
        - bpf_timer_init
        - bpf_timer_set_callback
        - bpf_timer_start
        - bpf_timer_cancel
        - bpf_get_func_ip
        - bpf_get_attach_cookie
        - bpf_task_pt_regs
        - bpf_get_branch_snapshot
        - bpf_find_vma
        - bpf_loop
        - bpf_strncmp
        - bpf_copy_from_user_task
        - bpf_kptr_xchg
        - bpf_map_lookup_percpu_elem
        - bpf_dynptr_from_mem
        - bpf_ringbuf_reserve_dynptr
        - bpf_ringbuf_submit_dynptr
        - bpf_ringbuf_discard_dynptr
        - bpf_dynptr_read
        - bpf_dynptr_write
        - bpf_dynptr_data
        - bpf_ktime_get_tai_ns
        - bpf_user_ringbuf_drain
        - bpf_cgrp_storage_get
        - bpf_cgrp_storage_delete
...
```

辅助函数的具体定义可以通过 `man bpf-helpers` 查看，或者参考内核头文件 [include/uapi/linux/bpf.h](https://github.com/torvalds/linux/blob/v6.15/include/uapi/linux/bpf.h#L1847) 中的注释。

## 定义 BPF 辅助函数的宏

在内核代码 `include/linux/filter.h` 中，提供了定义 BPF 辅助函数的宏：

```c
#define BPF_CALL_0(name, ...)	BPF_CALL_x(0, __NOATTR, name, __VA_ARGS__)
#define BPF_CALL_1(name, ...)	BPF_CALL_x(1, __NOATTR, name, __VA_ARGS__)
#define BPF_CALL_2(name, ...)	BPF_CALL_x(2, __NOATTR, name, __VA_ARGS__)
#define BPF_CALL_3(name, ...)	BPF_CALL_x(3, __NOATTR, name, __VA_ARGS__)
#define BPF_CALL_4(name, ...)	BPF_CALL_x(4, __NOATTR, name, __VA_ARGS__)
#define BPF_CALL_5(name, ...)	BPF_CALL_x(5, __NOATTR, name, __VA_ARGS__)
```

- 末尾数字 n 代表接收 n 个参数。
- name 定义辅助函数的名称。

## 定义 BPF 辅助函数

以 `bpf_redirect_peer` 为例，通过 `BPF_CALL_2` 定义名为 `bpf_redirect_peer` 的辅助函数，并存储在 `bpf_redirect_peer_proto`：

```c title="net/core/filter.c"
BPF_CALL_2(bpf_redirect_peer, u32, ifindex, u64, flags)
{
	struct bpf_redirect_info *ri = bpf_net_ctx_get_ri();

	if (unlikely(flags))
		return TC_ACT_SHOT;

	ri->flags = BPF_F_PEER;
	ri->tgt_index = ifindex;

	return TC_ACT_REDIRECT;
}

static const struct bpf_func_proto bpf_redirect_peer_proto = {
	.func           = bpf_redirect_peer,
	.gpl_only       = false,
	.ret_type       = RET_INTEGER,
	.arg1_type      = ARG_ANYTHING,
	.arg2_type      = ARG_ANYTHING,
};
```

BPF 编译时，验证器就会将要调用的辅助函数 ID 替换成实际要调用的内核函数。

对于 `bpf_redirect_peer` 来说，通过 `tc_cls_act_func_proto` 可以通过辅助函数 ID 找到对应的 `bpf_func_proto`:

```c
static const struct bpf_func_proto *
tc_cls_act_func_proto(enum bpf_func_id func_id, const struct bpf_prog *prog)
{
	switch (func_id) {
  // ...
	case BPF_FUNC_redirect_peer:
		return &bpf_redirect_peer_proto;
  // ...
}
```

这里的 `BPF_FUNC_redirect_peer` 就是辅助函数的 ID（常量）。

## BPF 辅助函数与 ID 列表

BPF 辅助函数列表在 `include/uapi/linux/bpf.h` 这里定义。

通过 `___BPF_FUNC_MAPPER` 定义了辅助函数名称和对应的 ID：

```c
#define ___BPF_FUNC_MAPPER(FN, ctx...)			\
	FN(unspec, 0, ##ctx)				\
	FN(map_lookup_elem, 1, ##ctx)			\
  // ...
	FN(cgrp_storage_delete, 211, ##ctx)		\
```

通过 `__BPF_ENUM_FN` 这个临时宏，将辅助函数列表展开到枚举 `bpf_func_id` 中：

```c
/* integer value in 'imm' field of BPF_CALL instruction selects which helper
 * function eBPF program intends to call
 */
#define __BPF_ENUM_FN(x, y) BPF_FUNC_ ## x = y,
enum bpf_func_id {
	___BPF_FUNC_MAPPER(__BPF_ENUM_FN)
	__BPF_FUNC_MAX_ID,
};
#undef __BPF_ENUM_FN
```

展开后的效果：

```bash
enum bpf_func_id {
	BPF_FUNC_unspec = 0,
	...
  BPF_FUNC_redirect_peer = 155,
	...
};
```


## BPF 程序入口

当 eBPF 程序 hook 到内核后，会等待事件触发其执行，以 XDP 为例，事件触发的代码调用流程：

```bash
netif_receive_skb()
    ↓
__netif_receive_skb()
    ↓
do_xdp_generic(dev->xdp_prog, &skb)
    ↓
netif_receive_generic_xdp()
    ↓
bpf_prog_run_xdp(xdp_prog, &xdp)
```

看下 `bpf_prog_run_xdp` 的实现：

```c title="include/net/xdp.h" showLineNumbers
static __always_inline u32 bpf_prog_run_xdp(const struct bpf_prog *prog,
					    struct xdp_buff *xdp)
{
  // ...
	u32 act = __bpf_prog_run(prog, xdp, BPF_DISPATCHER_FUNC(xdp));
  // ...
}
```

eBPF 程序的执行最终会走到 `__bpf_prog_run` 函数，进一步会调用 `prog->bpf_func`：

```c
static __always_inline u32 __bpf_prog_run(const struct bpf_prog *prog,
					  const void *ctx,
					  bpf_dispatcher_fn dfunc)
{
	u32 ret;

	if (static_branch_unlikely(&bpf_stats_enabled_key)) {
    // ...
		ret = dfunc(ctx, prog->insnsi, prog->bpf_func);
    // ...
	} else {
		ret = dfunc(ctx, prog->insnsi, prog->bpf_func);
	}
	return ret;
```

eBPF 程序有两种执行模式：
1. JIT：此时 `prog->bpf_func` 指向的是编译好的机器码，会直接将机器码提交给 CPU 执行。
2. 解释器：此时 `prog->bpf_func` 指向的是解释器函数，会走到 `___bpf_prog_run`(三条下划线)。

一般使用的是 JIT 模式，性能更好，但由于这里是直接提交机器码给 CPU 执行了，我们不方便从源码分析 eBPF 程序的执行流程，下面以解释器模式继续分析。

解释器模式下，eBPF 程序最终会执行到 `___bpf_prog_run` 函数：

```c title="kernel/bpf/core.c" showLineNumbers
static u64 ___bpf_prog_run(u64 *regs, const struct bpf_insn *insn)
{
  // ...
	JMP_CALL:
		/* Function call scratches BPF_R1-BPF_R5 registers,
		 * preserves BPF_R6-BPF_R9, and stores return value
		 * into BPF_R0.
		 */
		BPF_R0 = (__bpf_call_base + insn->imm)(BPF_R1, BPF_R2, BPF_R3,
						       BPF_R4, BPF_R5);
		CONT;
  // ...
}
```

该函数会运行 eBPF 程序，执行 eBPF 程序中所有的指令（通过 goto 遍历指令），当执行到 `JMP_CALL` 时，表示要调用内核辅助函数了，最终会调用到 `(__bpf_call_base + insn->imm)` 函数。

`__bpf_call_base` 是 eBPF 辅助函数的基础偏移量，而 `insn->imm` 是辅助函数的 ID，通过这种方式可以实现不同内核版本都能以相同方式调用到指定辅助函数（辅助函数地址是相对的）。
