# 概览

## 源码目录结构

- bpf: eBPF 内核态程序源码，处理收发包路径相关 C 代码（该目录下执行 make gen_compile_commands 可生成 clangd 索引代码时需要的 `compile_commands.json`，需在 linux 环境下执行，且依赖 llvm、clang、bear 等工具）。
- daemon: cilium-agent 相关代码，cilium 的数据面。
- operator: cilium-operator 相关代码，cilium-agent 的控制面。
- cilium-cli: cilium-cli 命令行工具相关代码。
- cilium-dbg: cilium-dbg 调试工具相关代码。
- clustermesh-apiserver: clustermesh-apiserver 相关代码，ServiceMesh 能力的控制面。
- plugins: 容器网络插件，主要是 cilium-cni 插件。
- pkg: 项目依赖的各种包，可被多个组件共享。

## 阅读 C 语言 eBPF 源码

### 生成 compile_commands.json

cilium 的 bpf 目录中 Makefile 提供了 `gen_compile_commands` 指令，用于生成 `compile_commands.json` 文件，该文件用于 clangd LSP 索引 C 语言 eBPF 程序：

```bash
cd bpf
make gen_compile_commands
```

:::tip[说明]

安装的 llvm 版本需要与 [cilium llvm 基础镜像](https://github.com/cilium/image-tools/blob/master/images/llvm/Dockerfile) 中的 llvm 版本一致，否则可能出现报错的情况。

笔者当前分析的 cilium 最新版本是 1.18.2，llvm 基础镜像中的 llvm 版本是 19.x，而通过 brew 安装的 llvm 最新版本是 20.x，所以通过 brew 安装 llvm 时需指定下版本：

```bash
brew install llvm@19
# 如果已经有 20.x 的 llvm 安装，通过一下方式 llvm 的软链接指向 19.x 的版本
# brew unlink llvm
# brew link llvm@19
```

:::

然后在基于 clangd 作为 C/C++ 语言 LSP 的 IED/编辑器中就可以愉快的阅读 eBPF 程序代码了：

![](https://image-host-1251893006.cos.ap-chengdu.myqcloud.com/2025%2F07%2F16%2F20250716105406.gif)

### eBPF 程序函数入口

cilium 中所有要挂载到内核的 eBPF 程序的函数，都会在函数名上面打一个 `__section_entry` 宏的标记，这个宏是给编译器看的，让编译器在编译 eBPF 程序字节码时，将标记的函数放入指定 ELF 段的位置，后续通过系统调用加载 eBPF 程序时，指定对应的 ELF 段位置作为运行入口。

所有的入口函数都是以 `cil_` 开头，cil 是 cilium 的简写。

### eBPF Map 数据结构

与 eBPF 程序函数入口的定义类似，所有的 eBPF Map 数据结构的定义，都会在结构体名上面打一个 `__section_maps_btf` 宏的标记，让编译器在编译 eBPF 程序字节码时，将标记的 Map 结构体放入指定 ELF 段的位置。

## 阅读 Go 源码

cilium 项目非常庞大，主要使用 Go 语言，为了便于开发和维护，cilium 基于 uber 的 [dig](https://github.com/uber-go/dig) 开发了 [hive](https://github.com/cilium/hive) 依赖注入框架，类似 uber 的 [fx](https://github.com/uber-go/fx)，专门用于将 cilium 项目 Go 代码进行模块化开发和维护。

关于 hive 的一些原理介绍：
- 每个功能模块抽象成 Cell 对象，而 Cell 对象也可以是包含许多子 Cell 的特殊 Cell，用 `cell.Module` 可以将许多 Cell 组合成一个 Cell。
- 每个最小粒度的 Cell 可以是一个要运行的函数（用 `cell.Invoke` 注入），也可以是需要解析的启动参数（用 `cell.Config` 注入）和初始化对象的函数（用 `cell.Provide` 注入）。
- 所有功能模块的入口，分布在各个包下面的 `cells.go` 和 `cell.go` 文件中。
  - `cells.go`: 一般通过 `cell.Module` 将许多 Cell 组合成一个 Cell，即表示一个大模块，其中包含许多小模块。
  - `cell.go`: 一般是包含最小粒度的全局 Cell 对象，用于被 `cells.go` 中的 `cell.Module` 引用，组合到大模块中去。

然后，cilium 还有部分仍未完全 hive 化，还在逐步迁移中。

## cilium-agent 源码解析

### 入口

- `daemon/main.go`: 程序启动入口。
- `daemon/cmd/cells.go`: cilium-agent 所有模块的索引。目前，cilium 大部分代码均已使用 hive 做了模块化，但 cilium-agent 的 daemon 部分逻辑暂未完全适配，这个文件中中的 `daemonCell` 就是将 daemon 还未 hive 化的启动代码包装成 hive 的 cell 对象。

### eBPF 程序加载流程

首先是 eBPF Map 的初始化，大部分在 `pkg/datapath/cells.go` 中，各种 Map 的初始化都 hive 化了，用 cell 对象包装。还有部分未 hive 化的 Map 的初始化代码放在 `daemon/cmd/datapath.go#initMaps` 中，这部分应该主要处理特殊场景和遗留功能，因硬件交互和条件逻辑不适合抽象。这是架构演进过程中的过渡状态，未来可能统一。

然后是 eBPF 程序的动态编译与加载，在 `pkg/datapath/cells.go` 中引用：
1. `loader.Cell`: 动态编译加载 eBPF 程序的工具(eBPF 加载器)。
2. `orchestrator.Cell`：编排器，其中 `orchestrator.ReloadDatapath` 会调用上面的加载器，加载 eBPF 程序。
3. `pkg/endpoint/events.go` Endpoint 事件会触发 Endpoint 执行 `regenerate`，最终会调用 `orchestrator.ReloadDatapath` 加载 eBPF 程序。

## FAQ

### 为什么 cilium 要动态编译 eBPF 程序？

内核 eBPF 子系统提供了 CO-RE 的特性，可以实现一次编译到处运行，为什么 cilium 不直接在编译 cilium-agent 镜像的时候，就直接用 clang 将 eBPF 程序编译为字节码，然后编译 Go 程序时用 embed 特性直接字节码嵌入到 Go 的二进制，在 Go 代码里直接通过系统调用将 eBPF 字节码提交给内核去加载和运行呢？（毕竟 cilium 自家开源了 [ebpf-go](https://github.com/cilium/ebpf)  就是利用这个原理实现用 Go 语言编写 eBPF 程序并编译成二进制实现一次编译到处运行的）

答案是：cilium-agent 需要根据运行环境（CPU、内核情况等），动态的生成 ebpf 代码，所以不能提前编译。

未来演进：社区已经发现内核5.2以上支持了只读 map 特性，可以将运行时环境的配置信息传到这个只读 map 中去，然后 eBPF 程序在运行的时候读取 map 中的配置，根据配置来决定是否进行某些操作，这样就可以在编译镜像的时候就将 eBPF 字节码编译好并嵌入到 Go 程序中，实现一次编译到处运行（CO-RE），镜像中也不再需要 clang、LLVM 这些东西了，既可以给镜像瘦身，又可以降低启动时的资源占用（启动时无需动态编译了）。具体参考 [Background](https://docs.cilium.io/en/latest/contributing/development/datapath_config/#background)。

## 参考资料

- [Cilium datapath梳理](https://rexrock.github.io/post/cilium2/)
- [Cilium eBPF实现机制源码分析](https://www.cnxct.com/how-does-cilium-use-ebpf-with-go-and-c/)
