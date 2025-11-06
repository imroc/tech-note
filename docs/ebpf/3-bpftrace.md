# 使用 bpftrace 开发 eBPF

## 哪里查看 bpftrace 参考手册？

可以通过 `man bpftrace` 查看，或者在 github 上查看 [bpftrace(8) Manual Page](https://github.com/bpftrace/bpftrace/blob/master/man/adoc/bpftrace.adoc)。

## 常用 bpftrace 脚本

### 监控进程创建

```bash
bpftrace -e 'tracepoint:syscalls:sys_enter_execve,tracepoint:syscalls:sys_enter_execveat { printf("%-6d %-8s", pid, comm); join(args->argv);}'
```

### 监控 bash 命令执行

```bash
bpftrace -e 'uretprobe:/usr/bin/bash:readline { printf("User %d executed \"%s\" command\n", uid, str(retval)); }'
```
