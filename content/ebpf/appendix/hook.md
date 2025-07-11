# hook 内核事件

## eBPF 程序可以 hook 到哪些内核事件？

上面 hello world 中的 `b.attach_kprobe(event="do_sys_openat2", fn_name="hello_world")` 表示将 eBPF 程序 hook 到 `do_sys_openat2` 这个内核函数的调用上，每次这个内核函数被调用时就会回调一下 `hello.c` 中的 `hello_world` 函数。

这种内核函数的 hook 方式称为 kprobe，除此之外，还有其他几种 hook 方式，下面用表格列举一下：

| hook 类型  | eBPF 程序类型  | 回调时机                       | bcc attach 入口       | 性能开销 |
| :--------- | :------------- | :----------------------------- | :-------------------- | :------- |
| 内核函数   | kprobe         | 内核空间函数调用开始           | attach_kprobe         | 极低     |
| 内核函数   | kretprobe      | 内核空间函数调用结束           | attach_kretprobe      | 极低     |
| 内核跟踪点 | tracepoint     | 内核跟踪点被执行               | attach_tracepoint     | 一般     |
| 内核跟踪点 | raw_tracepoint | 内核跟踪点被执行（不解析参数） | attach_raw_tracepoint | 低       |
| 网络接口   | xdp            | 网络接口收发数据包             | attach_xdp            | 极低     |
| 用户函数   | uprobe         | 用户空间函数调用开始           | attach_uprobe         | 极低     |
| 用户函数   | uretprobe      | 用户空间函数调用结束           | attach_uretprobe      | 极低     |
| 网卡       | raw_socket     | 网卡收包                       | attach_raw_socket     | 极低     |


## 有哪些内核函数可以被 hook？

Linux 内核通过虚拟文件 `/proc/kallsyms` 动态暴露所有可追踪的符号（函数名、全局变量）:

```txt
ffffffff813eae90 t do_sys_openat2
ffffffffa05ef110 t nf_conntrack_in      [nf_conntrack]
ffffffffa0636050 t nf_nat_masquerade_ipv4       [nf_nat]
```

格式：`<地址> <类型> <符号名> [模块名]`

其中【符号名】即为内核中符号名称，【类型】为 `T/t` 的就是内核函数，可用于 `kprobe` 或 `kretprobe` 的内核事件 hook 点。

各字段的详细解释：
- 地址：内核函数内存地址，这个是动态的，每台机器都不一样。
- 模块名：内核模块名称，如果为空则表示核心内核函数。
- 类型：
  - `T/t`：全局/局部函数(text)，都可以用于 `kprobe` 的 hook点，优先选 `T`。
  - `D/d`: 全局/局部数据(data)。
  - `R/r`: 只读数据 (rodata)。
  - `W/w`: 弱引用符号 (weak)。
  - `U`: 未定义符号 (undefined)。

```bash
# 1. 查看内核所有可 hook 函数名及内存地址 (需 root 权限)
sudo cat /proc/kallsyms

# 2. 过滤特定模块的函数 (例如 tcp 相关)
sudo grep tcp /proc/kallsyms | awk '{print $3}'

# 3. 直接搜索目标函数 (示例：查看所有 open 相关函数)
sudo grep '\<open' /proc/kallsyms
```

## 如何查看内核函数的定义？

`/sys/kernel/debug` 挂载了内核调试文件系统，还向用户空间提供了内核调试所需的基本信息，如内核符号列表、跟踪点、函数跟踪（ftrace）状态以及参数格式等。

比如查询 `execve` 系统调用的参数格式：

```bash
$ sudo cat /sys/kernel/debug/tracing/events/syscalls/sys_enter_execve/format

name: sys_enter_execve
ID: 747
format:
        field:unsigned short common_type;       offset:0;       size:2; signed:0;
        field:unsigned char common_flags;       offset:2;       size:1; signed:0;
        field:unsigned char common_preempt_count;       offset:3;       size:1; signed:0;
        field:int common_pid;   offset:4;       size:4; signed:1;

        field:int __syscall_nr; offset:8;       size:4; signed:1;
        field:const char * filename;    offset:16;      size:8; signed:0;
        field:const char *const * argv; offset:24;      size:8; signed:0;
        field:const char *const * envp; offset:32;      size:8; signed:0;

print fmt: "filename: 0x%08lx, argv: 0x%08lx, envp: 0x%08lx", ((unsigned long)(REC->filename)), ((unsigned long)(REC->argv)), ((unsigned long)(REC->envp))
```

这个目录如果没有自动挂载，可通过下面命令挂载：

```bash
sudo mount -t debugfs debugfs /sys/kernel/debug
```

> eBPF 程序的执行也依赖于这个调试文件系统。

## eBPF 程序可以调用哪些辅助函数？

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
