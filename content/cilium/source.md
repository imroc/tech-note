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
