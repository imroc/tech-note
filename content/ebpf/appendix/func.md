# eBPF 辅助函数
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

## eBPF 程序是如何调用到内核辅助函数的？

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
