# hook 内核事件

## eBPF 程序可以 hook 到哪些内核事件？

上面 hello world 中的 `b.attach_kprobe(event="do_sys_openat2", fn_name="hello_world")` 表示将 eBPF 程序 hook 到 `do_sys_openat2` 这个内核函数的调用上，每次这个内核函数被调用时就会回调一下 `hello.c` 中的 `hello_world` 函数。

这种内核函数的 hook 方式称为 kprobe，除此之外，还有其他几种 hook 方式，下面用表格列举一下：

| hook 类型  | hook 方式      | 回调时机                       | bcc attach 入口       | 性能开销 |
| :--------- | :------------- | :----------------------------- | :-------------------- | :------- |
| 内核函数   | kprobe         | 内核空间函数调用开始           | attach_kprobe         | 极低     |
| 内核函数   | kretprobe      | 内核空间函数调用结束           | attach_kretprobe      | 极低     |
| 内核跟踪点 | tracepoint     | 内核跟踪点被执行               | attach_tracepoint     | 一般     |
| 内核跟踪点 | raw_tracepoint | 内核跟踪点被执行（不解析参数） | attach_raw_tracepoint | 低       |
| 网络接口   | xdp            | 网络接口收发数据包             | attach_xdp            | 极低     |
| 用户函数   | uprobe         | 用户空间函数调用开始           | attach_uprobe         | 极低     |
| 用户函数   | uretprobe      | 用户空间函数调用结束           | attach_uretprobe      | 极低     |
| 网卡       | raw_socket     | 网卡收包                       | attach_raw_socket     | 极低     |


## 有哪些内核函数可以 hook？

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

