# yum/dnf 包管理器

## 说明

yum/dnf 是 RPM 包管理器，dnf 是 yum 的替代品，兼容 yum 的命令行参数和语法，但功能更强大，性能更好。

本文中使用 yum 作为示例，也可以将 yum 替代为 dnf 使用。

## 搜索软件包

```bash
$ yum search python3
============================ 名称 精准匹配：python3 ============================
python3.x86_64 : Python 3.11 interpreter
========================== 名称 和 概况 匹配：python3 ==========================
boost-python3.x86_64 : Run-time component of boost python library for Python3
libcap-ng-python3.x86_64 : Python3 bindings for libcap-ng library
...
```

## 安装软件包

```bash
yum install python3
```

## 卸载软件包

```bash
yum remove python3
```

## 查询软件包详细信息

```bash
$ yum info python3
可安装的软件包
名称         : python3
版本         : 3.11.6
发布         : 18.tl4
架构         : x86_64
大小         : 26 k
源           : python3.11-3.11.6-18.tl4.src.rpm
仓库         : BaseOS
概况         : Python 3.11 interpreter
URL          : https://www.python.org/
协议         : Python-2.0.1
描述         : Python is a great object-oriented, interpreted, and interactive programming
             : language. It is often compared (favorably of course :-) ) to Lisp, Tcl,
             : Perl, Ruby, C#, Visual Basic, Visual Fox Pro, Scheme or Java... and it's
             : much more fun.
             :
             : Python combines remarkable power with very clear syntax. It has modules,
             : classes, exceptions, very high level dynamic data types, and dynamic typing.
             : There are interfaces to many system calls and libraries, as well as to various
             : windowing systems. New built-in modules are easily written in C or C++ (or
             : other languages, depending on the chosen implementation). Python is also
             : usable as an extension language for applications written in other languages
             : that need easy-to-use scripting or automation interfaces.
             :
             : This package contains the Python3 interpreter.
```

## 查询软件包可用版本

```bash
$ yum list python3 --showduplicates
已安装的软件包
python3.x86_64                                                  3.11.6-2.tl4                                                   @System
可安装的软件包
python3.x86_64                                                  3.11.6-16.tl4                                                  BaseOS
python3.x86_64                                                  3.11.6-17.tl4                                                  BaseOS
python3.x86_64                                                  3.11.6-18.tl4                                                  BaseOS
```

## 查询软件包的依赖

```bash
$ yum deplist python3
package: python3-3.11.6-16.tl4.x86_64
  dependency: libc.so.6(GLIBC_2.34)(64bit)
   provider: glibc-2.38-33.tl4.x86_64
  dependency: libpython3.11.so.1.0()(64bit)
   provider: python3-libs-3.11.6-18.tl4.x86_64
  dependency: python3-libs = 3.11.6-16.tl4
   provider: python3-libs-3.11.6-16.tl4.x86_64
  dependency: rtld(GNU_HASH)
   provider: glibc-2.38-33.tl4.x86_64

package: python3-3.11.6-17.tl4.x86_64
  dependency: libc.so.6(GLIBC_2.34)(64bit)
   provider: glibc-2.38-33.tl4.x86_64
  dependency: libpython3.11.so.1.0()(64bit)
   provider: python3-libs-3.11.6-18.tl4.x86_64
  dependency: python3-libs = 3.11.6-17.tl4
   provider: python3-libs-3.11.6-17.tl4.x86_64
  dependency: rtld(GNU_HASH)
   provider: glibc-2.38-33.tl4.x86_64

package: python3-3.11.6-18.tl4.x86_64
  dependency: libc.so.6(GLIBC_2.34)(64bit)
   provider: glibc-2.38-33.tl4.x86_64
  dependency: libpython3.11.so.1.0()(64bit)
   provider: python3-libs-3.11.6-18.tl4.x86_64
  dependency: python3-libs = 3.11.6-18.tl4
   provider: python3-libs-3.11.6-18.tl4.x86_64
  dependency: rtld(GNU_HASH)
   provider: glibc-2.38-33.tl4.x86_64
```

## 查看软件源列表

```bash
$ yum repolist
仓库 id                                                   仓库名称
AppStream                                                 TencentOS Server 4 - AppStream
BaseOS                                                    TencentOS Server 4 - BaseOS
EPOL                                                      Extra Packages for TencentOS Server 4 - EPOL
extras                                                    TencentOS Server 4 - extras
rancher-k3s-common-stable                                 Rancher K3s Common (stable)
```
