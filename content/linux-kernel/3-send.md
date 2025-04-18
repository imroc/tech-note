# 梳理网络数据包发送的代码流程

## 概述

进程向外发送数据，通常通过系统调用 `sendto` 来实现，下面基于 Linux 6.14 的代码来分析一下 `sendto` 的实现。

## 系统调用入口

代码流程：

```c
SYSCALL_DEFINE6(sendto, ...) // 声明系统调用 (net/socket.c)
|
+-- __sys_sendto(...) // 系统调用入口
    |
    +-- __sock_sendmsg(...) // 进入协议栈
         |
         +-- sock_sendmsg_nosec(...)
            |
            +-- sk->ops->sendmsg // 丢给传输层处理
```

`net/socket.c` 中定义了 `sendto` 的系统调用： 

![](https://image-host-1251893006.cos.ap-chengdu.myqcloud.com/2025%2F04%2F17%2F20250417173734.png)

跳转 `__sys_sendto`，走到 `__sock_sendmsg`:

![](https://image-host-1251893006.cos.ap-chengdu.myqcloud.com/2025%2F04%2F17%2F20250417173946.png)

继续走到 `sock_sendmsg_nosec`:

![](https://image-host-1251893006.cos.ap-chengdu.myqcloud.com/2025%2F04%2F17%2F20250417174046.png)

接着会调用数据包对应协议的 `sendmsg` 函数将包丢给传输层处理:

![](https://image-host-1251893006.cos.ap-chengdu.myqcloud.com/2025%2F04%2F17%2F20250417174153.png)

## 传输层

代码流程

```c
inet_sendmsg(...) // 传输层入口 (net/ipv4/af_inet.c) 对应系统调用函数中的 sk->ops->sendmsg
|
+-- tcp_sendmsg(...) // 对应 sk->sk_prot->sendmsg(sock->sk, msg, size)  -- net/ipv4/tcp.c
    |
    +-- tcp_sendmsg_locked(...)
        |
        +-- tcp_push(...)
            |
            +-- __tcp_push_pending_frames(...)
                |
                +-- tcp_write_xmit(...)
                    |
                    +-- tcp_transmit_skb(...)
                        |
                        +-- __tcp_transmit_skb(...) 
                            |
                            +-- icsk->icsk_af_ops->queue_xmit // 丢给 IP 层 处理
```

看下 `sendmsg` 的实现，在 `net/ipv4/af_inet.c`  中可以看到 IPv4 的 stream 类型实现对应的是 `inet_sendmsg` 函数:

![](https://image-host-1251893006.cos.ap-chengdu.myqcloud.com/2025%2F04%2F17%2F20250417174851.png)

继续往下看，`inet_sendmsg` 会调用 `sk->sk_prot->sendmsg` 发包：

![](https://image-host-1251893006.cos.ap-chengdu.myqcloud.com/2025%2F04%2F17%2F20250417175151.png)

TCP 协议的情况下，会使用 `tcp_sendmsg` 这个函数，从 `net/ipv4/tcp_ipv4.c` 中 `tcp_prot` 的赋值可以看出：

![](https://image-host-1251893006.cos.ap-chengdu.myqcloud.com/2025%2F04%2F17%2F20250417175430.png)

继续调用 `tcp_sendmsg_locked`:

![](https://image-host-1251893006.cos.ap-chengdu.myqcloud.com/2025%2F04%2F18%2F20250418093112.png)

再调用 `tcp_push`:

![](https://image-host-1251893006.cos.ap-chengdu.myqcloud.com/2025%2F04%2F18%2F20250418110636.png)

底部调用 `__tcp_push_pending_frames`:

![](https://image-host-1251893006.cos.ap-chengdu.myqcloud.com/2025%2F04%2F18%2F20250418110801.png)

继续调用 `tcp_write_xmit`:

![](https://image-host-1251893006.cos.ap-chengdu.myqcloud.com/2025%2F04%2F18%2F20250418105519.png)

再调用 `tcp_transmit_skb` 和 `__tcp_transmit_skb`:

![](https://image-host-1251893006.cos.ap-chengdu.myqcloud.com/2025%2F04%2F18%2F20250418105627.png)

走到 `icsk->icsk_af_ops->queue_xmit`，将包丢给 IP 层处理:

![](https://image-host-1251893006.cos.ap-chengdu.myqcloud.com/2025%2F04%2F18%2F20250418105916.png)

## 网络层（IP 层）

```c
ip_queue_xmit(...) // IP 层入口（net/ipv4/ip_output.c），对应传输层中 icsk->icsk_af_ops->queue_xmit 的函数引用
|
+-- __ip_queue_xmit(...)
    |
    +-- ip_local_out(...)
         |
         +-- __ip_local_out(...)
         |   |
         |   +-- nf_hook(NFPROTO_IPV4, NF_INET_LOCAL_OUT, ...) // 调用 OUTPUT 链钩子函数
         |
         +-- dst_output(...)
             |
             +-- ip_outpout(...) // 对应 skb_dst(skb)->output (net/ipv4/ip_output.c)
                 |
                 +-- NF_HOOK_COND(NFPROTO_IPV4, NF_INET_POST_ROUTING, ... , ip_finish_output, ...) // 调用 POSTROUTING 链钩子函数，如果没丢包会继续调用 ip_finish_output
```

传输层中 `icsk->icsk_af_ops->queue_xmit` 的函数引用的 IPv4 实现在 `net/ipv4/tcp_ipv4.c` 中有声明，是 `ip_queue_xmit` 这个函数：

![](https://image-host-1251893006.cos.ap-chengdu.myqcloud.com/2025%2F04%2F18%2F20250418111701.png)

进入这个函数，它直接调用 `__ip_queue_xmit`:

![](https://image-host-1251893006.cos.ap-chengdu.myqcloud.com/2025%2F04%2F18%2F20250418111833.png)

走到 `ip_local_out`:

![](https://image-host-1251893006.cos.ap-chengdu.myqcloud.com/2025%2F04%2F18%2F20250418112531.png)

先调用 `__ip_local_out`，再调用 `dst_output`:

![](https://image-host-1251893006.cos.ap-chengdu.myqcloud.com/2025%2F04%2F18%2F20250418113057.png)

其中 `__ip_local_out` 会通过 `nf_hook` 调用 OUTPUT 链的钩子函数：

![](https://image-host-1251893006.cos.ap-chengdu.myqcloud.com/2025%2F04%2F18%2F20250418115710.png)

如果没丢包，继续走到 `dst_output` 调用 `skb_dst(skb)->output`:

![](https://image-host-1251893006.cos.ap-chengdu.myqcloud.com/2025%2F04%2F18%2F20250418115847.png)

这个 `outpout` 函数实际对应 `ip_outpout` 函数，里面会调用 POSTROUTING 链的钩子函数，如果没丢包会继续调用 `ip_finish_output`：

![](https://image-host-1251893006.cos.ap-chengdu.myqcloud.com/2025%2F04%2F18%2F20250418122048.png)
