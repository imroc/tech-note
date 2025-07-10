# 使用 bcc 开发和运行 eBPF 程序

## 如何运行基于 bcc 开发的 eBPF 程序？

首先需要使用 Linux，然后用发行版自带的包管理器安装必要的依赖包（不用第三方包管理器，比如 homebrew，因为 eBPF 的依赖与当前发行版内核息息相关，第三方包管理器无法适配）。

用 yum 的发行版(REHL、TencentOS)：

```bash
sudo yum install bcc-tools bcc-devel libbpf-devel llvm clang elfutils-libelf-devel
```


用 apt 的发行版 (ubuntu)：

```bash
sudo apt-get install -y  make clang llvm libelf-dev libbpf-dev bpfcc-tools libbpfcc-dev linux-tools-$(uname -r) linux-headers-$(uname -r)
```


