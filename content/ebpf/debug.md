# 调试方法

## 打印调试内容

调用打印函数:

```c
bpf_trace_printk("Hello, World!");
```

查看输出内容：

```bash
tail -f /sys/kernel/debug/tracing/trace_pipe
```
