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


## 哪里可以查具体内核事件列表？

可以通过 `bpftrace` 工具查询所有的内核跟踪点：

```bash
# 查询所有内核插桩和跟踪点
$ sudo bpftrace -l

# 使用通配符查询所有的系统调用跟踪点
$ sudo bpftrace -l 'tracepoint:syscalls:*'

# 使用通配符查询所有名字包含"execve"的跟踪点
$ sudo bpftrace -l '*execve*'
```

另外，Linux 内核通过虚拟文件 `/proc/kallsyms` 动态暴露所有可追踪的符号（函数名、全局变量）:

```bash
# 1. 查看内核所有可 hook 函数名及内存地址 (需 root 权限)
sudo cat /proc/kallsyms

# 2. 过滤特定模块的函数 (例如 tcp 相关)
sudo grep tcp /proc/kallsyms | awk '{print $3}'

# 3. 直接搜索目标函数 (示例：查看所有 open 相关函数)
sudo grep '\<open' /proc/kallsyms
```

输出内容：

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

## 如何查看内核函数的定义？

### 通过内核调试文件系统查看

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

### 通过 bpftrace 查看

```bash
$ sudo bpftrace -lv tracepoint:syscalls:sys_enter_execve
tracepoint:syscalls:sys_enter_execve
    int __syscall_nr
    const char * filename
    const char *const * argv
    const char *const * envp
```

## 如何选要 hook 的内核事件？

内核函数(kprobe)是不稳定的 API，而跟踪点（tracepoint）是稳定的 API，因此建议如果两者都有的情况下，优先选用 tracepoint。

比如要监控进程的创建，而进程的创建通常需要 `fork()` 和 `execve()`，假设我们通过 eBPF 来 hook `execve()`，先用 bpftrace 查询下相关的内核事件：

```bash
$ sudo bpftrace -l '*execve*'
kfunc:vmlinux:__ia32_compat_sys_execve
kfunc:vmlinux:__ia32_compat_sys_execveat
kfunc:vmlinux:__ia32_sys_execve
kfunc:vmlinux:__ia32_sys_execveat
kfunc:vmlinux:__x64_sys_execve
kfunc:vmlinux:__x64_sys_execveat
kfunc:vmlinux:audit_log_execve_info
kfunc:vmlinux:bprm_execve
kfunc:vmlinux:kernel_execve
kfunc:vmlinux:sched_mm_cid_after_execve
kfunc:vmlinux:sched_mm_cid_before_execve
kprobe:__ia32_compat_sys_execve
kprobe:__ia32_compat_sys_execveat
kprobe:__ia32_sys_execve
kprobe:__ia32_sys_execveat
kprobe:__x64_sys_execve
kprobe:__x64_sys_execveat
kprobe:audit_log_execve_info
kprobe:bprm_execve
kprobe:do_execveat_common.isra.0
kprobe:kernel_execve
kprobe:sched_mm_cid_after_execve
kprobe:sched_mm_cid_before_execve
tracepoint:syscalls:sys_enter_execve
tracepoint:syscalls:sys_enter_execveat
tracepoint:syscalls:sys_exit_execve
tracepoint:syscalls:sys_exit_execveat
```

kprobe 和 tracepoint 都有相关内核事件，我们可以选 `tracepoint:syscalls:sys_enter_execve` 这个稳定的跟踪点 API 来进行 hook。
