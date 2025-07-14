# 调试方法

## 打印调试内容

调用打印函数:

```c
bpf_trace_printk("Hello, World!");
```

查看输出内容：

```bash
tail -f /sys/kernel/debug/tracing/trace_pipe
# cat /sys/kernel/debug/tracing/trace_pipe
```

## 调试内核函数调用栈

### 使用 bpftrace 打印调用栈

在 btftrace 脚本中个，有个名为 `kstack` 内置变量，保存了内核调用栈，使用方法示例：

```bash
sudo bpftrace -e 'kprobe:kfree_skb /comm=="curl"/ {printf("kstack: %s\n", kstack);}'
```

### 根据函数偏移快速定位源码

安装 [faddr2line](https://github.com/torvalds/linux/blob/master/scripts/faddr2line) 脚本，这个脚本还依赖：
1. 需安装有调试信息的内核文件，一般名字为 vmlinux。
2. 系统中需要安装 awk、readelf、addr2line、size、nm 等命令。(这些都包含在 [binutils](https://www.gnu.org/software/binutils/) 中了，可通过 yum/apt 等工具直接安装)。

对于 1，Ubuntu 安装方法：

```bash
codename=$(lsb_release -cs)
sudo tee /etc/apt/sources.list.d/ddebs.list << EOF
deb http://ddebs.ubuntu.com/ ${codename}      main restricted universe multiverse
deb http://ddebs.ubuntu.com/ ${codename}-updates  main restricted universe multiverse
EOF
sudo apt-get install -y ubuntu-dbgsym-keyring
sudo apt-get update
sudo apt-get install -y linux-image-$(uname -r)-dbgsym
```

TencentOS/RHEL 安装方法：

```bash
sudo debuginfo-install kernel-$(uname -r)
```

安装好后，调试文件会放在 `/usr/lib/debug`  (TencentOS/RHEL) 目录下，验证方法：

```bash
$ find /usr/lib/debug/ -name 'vmlinux*'

/usr/lib/debug/usr/lib/modules/6.6.30-5.tl4.x86_64/vmlinux
```
