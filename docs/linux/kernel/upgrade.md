# 升级内核

## CentOS/RHEL/TencentOS 升级官方内核

CentOS/RHEL/TencentOS 这些发行版均使用 yum 包管理器，都有官方维护的内核，可通过下面的命令查看当前可安装的内核版本：

```bash
$ yum list kernel --showduplicates
已安装的软件包
kernel.x86_64                                         6.6.30-5.tl4                                             @System
可安装的软件包
kernel.x86_64                                         6.6.70-25.7.tl4                                          BaseOS
kernel.x86_64                                         6.6.70-25.11.tl4                                         BaseOS
kernel.x86_64                                         6.6.80-26.tl4                                            BaseOS
kernel.x86_64                                         6.6.80-29.tl4                                            BaseOS
kernel.x86_64                                         6.6.88-31.tl4                                            BaseOS
kernel.x86_64                                         6.6.88-32.tl4                                            BaseOS
kernel.x86_64                                         6.6.88-32.3.tl4                                          BaseOS
kernel.x86_64                                         6.6.92-34.tl4                                            BaseOS
kernel.x86_64                                         6.6.92-34.1.tl4                                          BaseOS
```

升级内核：

```bash
# 升级指定内核版本
$ yum update kernel-6.6.92-34.1.tl4
# 升级到最新内核版本
# yum update kernel
```

升级完后重启：

```bash
reboot
```

## Ubuntu 升级官方内核

Ubuntu 发行版使用 apt 包管理器，有官方维护的内核，可通过下面的命令查看当前可安装的内核版本：

```bash
$ apt list linux-image-generic -a
linux-image-generic/noble-updates 6.8.0-63.66 amd64 [可从该版本升级：6.8.0-39.39]
linux-image-generic/now 6.8.0-39.39 amd64 [已安装，可升级至：6.8.0-63.66]
linux-image-generic/noble 6.8.0-31.31 amd64
```

升级内核：

```bash
# 升级指定内核版本
$ apt install linux-image-generic=6.8.0-63.66
# 升级到最新内核版本
# apt upgrade linux-image-generic
```

升级完后重启：

```bash
reboot
```
