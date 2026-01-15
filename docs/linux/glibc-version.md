# 查看 gblic 版本的方法

## 使用 ldd 命令

如果有 ldd 命令，可以用 `ldd --version` 查看 gblic 版本:

```bash
$ ldd --version
ldd (GNU libc) 2.17
Copyright (C) 2012 Free Software Foundation, Inc.
This is free software; see the source for copying conditions.  There is NO
warranty; not even for MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
Written by Roland McGrath and Ulrich Drepper.
```

## 查看 libc.so 软链指向的文件名称

```bash
$ ls -l /lib64/libc.so.6
lrwxrwxrwx 1 root root 12 May  7  2021 /lib64/libc.so.6 -> libc-2.17.so
```

## 查看 libc.so 文件内容

首先找到 libc.so 文件：

```bash
# 安装了 find 命令可直接搜索文件所在路径
find / -name "libc.so*" -type f 2>/dev/null

# 如果有 ldconfig 命令可查看系统中所有动态库文件，同时也能看到所在目录
ldconfig -v 2>/dev/nul
```

常见路径：

- `/lib64`
- `/lib/x86_64-linux-gnu/libc.so.6`

效果示例：

> 输出的最高版本号为当前 libc 的版本号。

```bash
$ strings /lib64/libc.so.6 | grep GLIBC
GLIBC_2.2.5
GLIBC_2.2.6
GLIBC_2.3
GLIBC_2.3.2
GLIBC_2.3.3
GLIBC_2.3.4
GLIBC_2.4
GLIBC_2.5
GLIBC_2.6
GLIBC_2.7
GLIBC_2.8
GLIBC_2.9
GLIBC_2.10
GLIBC_2.11
GLIBC_2.12
GLIBC_2.13
GLIBC_2.14
GLIBC_2.15
GLIBC_2.16
GLIBC_2.17

$ strings /lib/x86_64-linux-gnu/libc.so.6 | grep GLIBC
GLIBC_2.2.5
GLIBC_2.2.6
GLIBC_2.3
GLIBC_2.3.2
GLIBC_2.3.3
GLIBC_2.3.4
GLIBC_2.4
GLIBC_2.5
GLIBC_2.6
GLIBC_2.7
GLIBC_2.8
GLIBC_2.9
GLIBC_2.10
GLIBC_2.11
GLIBC_2.12
GLIBC_2.13
GLIBC_2.14
GLIBC_2.15
GLIBC_2.16
GLIBC_2.17
GLIBC_2.18
GLIBC_2.22
GLIBC_2.23
GLIBC_2.24
GLIBC_2.25
GLIBC_2.26
GLIBC_2.27
GLIBC_2.28
GLIBC_2.29
GLIBC_2.30
GLIBC_2.31
GLIBC_2.32
GLIBC_2.33
GLIBC_2.34
GLIBC_2.35
GLIBC_2.36
GLIBC_2.38
GLIBC_2.39
GNU C Library (Ubuntu GLIBC 2.39-0ubuntu8.4) stable release version 2.39.
```

## 参考资料

- [Linux系统中glibc版本号的查看方法](https://cloud.baidu.com/article/3295137)
