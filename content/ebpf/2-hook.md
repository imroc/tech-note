# hook 内核事件

## 内核函数

Linux 内核通过虚拟文件 `/proc/kallsyms` 动态暴露所有可追踪的符号（函数名、全局变量）:

```txt
ffffffff813eae90 t do_sys_openat2
ffffffffa05ef110 t nf_conntrack_in      [nf_conntrack]
ffffffffa0636050 t nf_nat_masquerade_ipv4       [nf_nat]
```

格式：`<地址> <类型> <符号名> [模块名]`

其中符号名即为内核中符号名称，部分符号（函数名）可用于 `kprobe` 或 `kretprobe` 的内核事件 hook 点。

其它：
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

