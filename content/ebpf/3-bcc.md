# 使用 bcc 开发和运行 eBPF 程序

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

# 2. 定义 eBPF 程序，加载内核态部分的 C 语言代码
b = BPF(src_file="hello.c")

# 3. hook eBPF 程序到指定的内核事件
b.attach_kprobe(event="do_sys_openat2", fn_name="hello_world")

# 4. 打印内核 trace 输出（/sys/kernel/debug/tracing/trace_pipe，bpf_trace_printk 函数会输出到这里）
b.trace_print()
```

最后执行 `python3 hello.py` 运行 eBPF 程序，就可以看到相应的调试输出。

## 参考资料

- [bcc Reference Guide](https://github.com/iovisor/bcc/blob/master/docs/reference_guide.md)

