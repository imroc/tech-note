# 系统调用

## 系统调用列表

`arch` 目录下的 `tbl` 文件保存了各种处理器架构下的系统调用映射表：

![](https://image-host-1251893006.cos.ap-chengdu.myqcloud.com/2025%2F04%2F17%2F20250417135728.png)

比如最常见的 `x86` 架构下的系统调用列表在 `arch/x86/entry/syscalls/syscall_64.tbl` 这个文件中：

![](https://image-host-1251893006.cos.ap-chengdu.myqcloud.com/2025%2F04%2F17%2F20250417140006.png)

第 1 列是系统调用号，是系统调用的唯一标识，不同处理器下可能不一样，第 3 列就是系统调用名称。

## 如何查看系统调用的实现函数？

以进程发包的 `sendto` 系统调用为例：

![](https://image-host-1251893006.cos.ap-chengdu.myqcloud.com/2025%2F04%2F17%2F20250417142733.png)

所有系统调用的实现函数通过宏 `SYSCALL_DEFINEx` 来定义，`x` 标识函数接收的参数个数，支持 1 到 6 个参数:

```c
#define SYSCALL_DEFINE1(name, ...) SYSCALL_DEFINEx(1, _##name, __VA_ARGS__)
#define SYSCALL_DEFINE2(name, ...) SYSCALL_DEFINEx(2, _##name, __VA_ARGS__)
#define SYSCALL_DEFINE3(name, ...) SYSCALL_DEFINEx(3, _##name, __VA_ARGS__)
#define SYSCALL_DEFINE4(name, ...) SYSCALL_DEFINEx(4, _##name, __VA_ARGS__)
#define SYSCALL_DEFINE5(name, ...) SYSCALL_DEFINEx(5, _##name, __VA_ARGS__)
#define SYSCALL_DEFINE6(name, ...) SYSCALL_DEFINEx(6, _##name, __VA_ARGS__)
```

这系列的宏第一个传入的参数就是系统调用名称，可以通过正则搜索系统调用函数，比如用 `SYSCALL_DEFINE.*\(sendto` 搜索 `sendto` 系统调用的实现函数：

![](https://image-host-1251893006.cos.ap-chengdu.myqcloud.com/2025%2F04%2F17%2F20250417143624.png)

跳转到宏定义的位置：

![](https://image-host-1251893006.cos.ap-chengdu.myqcloud.com/2025%2F04%2F17%2F20250417144107.png)

然后继续跳转里面真正的实现函数就可以看到系统调用的具体实现逻辑了。
