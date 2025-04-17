# 网络发送

## 概述

进程向外发送数据，通常通过系统调用 `sendto` 来实现，下面基于 Linux 6.14 的代码来分析一下 `sendto` 的实现。

## 系统调用入口

`net/socket.c` 中定义了 `sendto` 的系统调用： 

![](https://image-host-1251893006.cos.ap-chengdu.myqcloud.com/2025%2F04%2F17%2F20250417173734.png)

跳转 `__sys_sendto`，走到 `__sock_sendmsg`:

![](https://image-host-1251893006.cos.ap-chengdu.myqcloud.com/2025%2F04%2F17%2F20250417173946.png)

继续走到 `sock_sendmsg_nosec`:

![](https://image-host-1251893006.cos.ap-chengdu.myqcloud.com/2025%2F04%2F17%2F20250417174046.png)

接着会调用数据包对应协议的 `sendmsg` 函数进入网络协议栈:

![](https://image-host-1251893006.cos.ap-chengdu.myqcloud.com/2025%2F04%2F17%2F20250417174153.png)

## 传输层

看下 `sendmsg` 的实现，在 `net/ipv4/af_inet.c`  中可以看到 IPv4 的 stream 类型实现对应的是 `inet_sendmsg` 函数:

![](https://image-host-1251893006.cos.ap-chengdu.myqcloud.com/2025%2F04%2F17%2F20250417174851.png)

继续往下看，`inet_sendmsg` 会调用 `sk->sk_prot->sendmsg` 发包：

![](https://image-host-1251893006.cos.ap-chengdu.myqcloud.com/2025%2F04%2F17%2F20250417175151.png)

TCP 协议的情况下，会使用 `tcp_sendmsg` 这个函数，从 `net/ipv4/tcp_ipv4.c` 中 `tcp_prot` 的赋值可以看出：

![](https://image-host-1251893006.cos.ap-chengdu.myqcloud.com/2025%2F04%2F17%2F20250417175430.png)
