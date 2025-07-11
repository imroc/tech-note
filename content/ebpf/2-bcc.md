# 使用 bcc 开发 eBPF

## 需要安装哪些依赖？

### bcc 工具集

首先要安装有 bcc 工具集，它是用 bcc 写好的问题定位分析工具，参考 [tools 目录](https://github.com/iovisor/bcc/tree/master/tools)。

谁来这个不是运行 bcc 开发的 eBPF 程序的必备条件，但安装这个工具集的其它依赖包中包含了运行 bcc 开发的 eBPF 程序所需的关键依赖：bash、pytyon3、libbpf、bcc 相关 python 包等。

Ubuntu 中对应的包名是 bpfcc-tools，TencentOS/REHL 中对应的包名是 bcc-tools。

### bcc 相关动态链接库

bcc 相关的动态链接库也是需要安装的。

Ubuntu 中对应的包名是 libbpfcc-dev，TencentOS/REHL 中对应的包名是 bcc-devel。

### libbpf 相关头文件

Ubuntu 中对应的包名是 libbpf-dev，TencentOS/REHL 中对应的包名是 libbpf-devel。

### clang 与 LLVM

bcc 会调用 clang 编译 eBPF 的 C 代码，LLVM 作为 clang 的后端，它们都需要安装。

Ubuntu 和 TencentOS/REHL 中对应的包名都是 clang、llvm。

## 如何运行基于 bcc 开发的 eBPF 程序？

首先需要使用 Linux，然后用发行版自带的包管理器安装必要的依赖包（不用第三方包管理器，比如 homebrew，因为 eBPF 的依赖与当前发行版内核息息相关，第三方包管理器无法适配）。

REHL、TencentOS：

```bash
sudo yum install bcc-tools bcc-devel libbpf-devel llvm clang elfutils-libelf-devel
```

Ubuntu：

```bash
sudo apt-get install -y  make clang llvm libelf-dev libbpf-dev bpfcc-tools libbpfcc-dev linux-tools-$(uname -r) linux-headers-$(uname -r)
```

## hello world

我们来写一个简单的 hello world eBPF 程序，首先写内核态部分的 C 语言代码：

```c title="hello.c"
int hello_world(void *ctx)
{
    bpf_trace_printk("Hello, World!");
    return 0;
}
```

再写用户态部分的 Python 语言代码：

```python
#!/usr/bin/env python3

# 1.导入 bcc 包
from bcc import BPF

# 2. 定义 eBPF 程序，加载内核态部分的 eBPF C 语言代码
b = BPF(src_file="hello.c")

# 3. hook eBPF 程序到指定的内核事件
b.attach_kprobe(event="do_sys_openat2", fn_name="hello_world")

# 4. 打印内核 trace 输出（/sys/kernel/debug/tracing/trace_pipe，bpf_trace_printk 函数会输出到这里）
b.trace_print()
```

最后执行 `python3 hello.py` 运行 eBPF 程序，就可以看到相应的调试输出。

## 参考资料

- [bcc Reference Guide](https://github.com/iovisor/bcc/blob/master/docs/reference_guide.md)

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
