# 透明代理

## nftables 规则

<FileBlock showLineNumbers title="nftables.conf" file="soft-route/nftables.conf" />

* 本机发出的包和转发内网其它设备的包都统一用策略路由拦截，使用 tproxy 将包重定向到透明代理监听的端口。
* 不拦截内网和保留网段的流量。
* 不拦截公网主动进来的流量。
* 不拦截来自公网的回包。
* 不拦截透明代理自身的包（使用进程 skgid 匹配，需让代理以特定 gid 启动）。
* 不拦截目标 IP 是本机 IP 的包（避免无限回环）。
