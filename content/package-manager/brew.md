# homebrew 包管理器

## 搜索软件包

```bash
$ brew search llvm
==> Formulae
cargo-llvm-cov          llvm@13                 llvm@17                 wllvm
cargo-llvm-lines        llvm@14                 llvm@18                 llm
llvm ✔                  llvm@15                 llvm@19
llvm@12                 llvm@16                 spirv-llvm-translator

```

## 安装软件包

```bash
brew install llvm
```

## 卸载软件包

```bash
brew uninstall llvm
```

## 查询软件包详细信息

```bash
$ brew info llvm
==> llvm: stable 20.1.7 (bottled), HEAD [keg-only]
Next-gen compiler infrastructure
https://llvm.org/
Installed
/opt/homebrew/Cellar/llvm/20.1.2 (9,417 files, 1.6GB)
  Poured from bottle using the formulae.brew.sh API on 2025-04-09 at 13:06:26
From: https://github.com/Homebrew/homebrew-core/blob/HEAD/Formula/l/llvm.rb
License: Apache-2.0 WITH LLVM-exception
==> Dependencies
Build: cmake ✘, ninja ✘, swig ✘
Required: python@3.13 ✘, xz ✔, z3 ✘, zstd ✔
==> Options
--HEAD
        Install HEAD version
==> Caveats
CLANG_CONFIG_FILE_SYSTEM_DIR: /opt/homebrew/etc/clang
CLANG_CONFIG_FILE_USER_DIR:   ~/.config/clang

LLD is now provided in a separate formula:
  brew install lld

Using `clang`, `clang++`, etc., requires a CLT installation at `/Library/Developer/CommandLineTools`.
If you don't want to install the CLT, you can write appropriate configuration files pointing to your
SDK at ~/.config/clang.

To use the bundled libunwind please use the following LDFLAGS:
  LDFLAGS="-L/opt/homebrew/opt/llvm/lib/unwind -lunwind"

To use the bundled libc++ please use the following LDFLAGS:
  LDFLAGS="-L/opt/homebrew/opt/llvm/lib/c++ -L/opt/homebrew/opt/llvm/lib/unwind -lunwind"

NOTE: You probably want to use the libunwind and libc++ provided by macOS unless you know what you're doing.

llvm is keg-only, which means it was not symlinked into /opt/homebrew,
because macOS already provides this software and installing another version in
parallel can cause all kinds of trouble.
==> Analytics
install: 75,046 (30 days), 233,944 (90 days), 848,738 (365 days)
install-on-request: 29,338 (30 days), 108,597 (90 days), 417,583 (365 days)
```

## 查询软件包可用版本

```bash
$ brew search llvm@
==> Formulae
llvm@12  llvm@13  llvm@14  llvm@15  llvm@16  llvm@17  llvm@18  llvm@19  llvm ✔   llm      wllvm
```
