# Cilium 源码阅读

## 源码目录结构

- bpf: eBPF 内核态程序源码，处理收发包路径相关 C 代码（该目录下执行 make gen_compile_commands 可生成 clangd 索引代码时需要的 `compile_commands.json`，需在 linux 环境下执行，且依赖 llvm、clang、bear 等工具）。
- daemon: cilium-agent 相关代码。

## 阅读 C 语言 eBPF 源码

### 生成 `compile_commands.json`

cilium 的 bpf 目录中 Makefile 提供了 `gen_compile_commands` 指令，用于生成 `compile_commands.json` 文件，该文件用于 clangd LSP 索引 C 语言 eBPF 程序：

```bash
cd bpf
make gen_compile_commands
```

然后在基于 clangd 作为 C/C++ 语言 LSP 的 IED/编辑器中就可以愉快的阅读 eBPF 程序代码了：

![](https://image-host-1251893006.cos.ap-chengdu.myqcloud.com/2025%2F07%2F16%2F20250716105406.gif)

## 阅读 Go 源码

cilium 项目非常庞大，主要使用 Go 语言，为了便于开发和维护，cilium 基于 uber 的 [dig](https://github.com/uber-go/dig) 开发了 [hive](https://github.com/cilium/hive) 依赖注入框架，类似 uber 的 [fx](https://github.com/uber-go/fx)，专门用于将 cilium 项目 Go 代码进行模块化开发和维护。

关于 hive 的一些原理介绍：
- 每个功能模块抽象成 Cell 对象，而 Cell 对象也可以是包含许多子 Cell 的特殊 Cell，用 `cell.Module` 可以将许多 Cell 组合成一个 Cell。
- 每个最小粒度的 Cell 可以是一个要运行的函数（用 `cell.Invoke` 注入），也可以是需要解析的启动参数（用 `cell.Config` 注入）和初始化对象的函数（用 `cell.Provide` 注入）。
- 所有功能模块的入口，分布在各个包下面的 `cells.go` 和 `cell.go` 文件中。
  - `cells.go`: 一般通过 `cell.Module` 将许多 Cell 组合成一个 Cell，即表示一个大模块，其中包含许多小模块。
  - `cell.go`: 一般是包含最小粒度的全局 Cell 对象，用于被 `cells.go` 中的 `cell.Module` 引用，组合到大模块中去。

## cilium-agent 源码解析

- daemon/main.go: 程序启动入口。


## 参考资料

- [Cilium datapath梳理](https://rexrock.github.io/post/cilium2/)
- [Cilium eBPF实现机制源码分析](https://www.cnxct.com/how-does-cilium-use-ebpf-with-go-and-c/)
