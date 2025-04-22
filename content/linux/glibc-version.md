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
```

或者：

```bash
$ strings /lib64/ld-linux-x86-64.so.2 | grep GLIBC
GLIBC_2.2.5
GLIBC_2.3
GLIBC_2.4
GLIBC_2.34
GLIBC_2.35
GLIBC_2.2.5
ld.so (Ubuntu GLIBC 2.39-0ubuntu8.4) stable release version 2.39.
```
