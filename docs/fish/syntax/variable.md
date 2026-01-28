# 变量

## 目录变量

```bash
# 获取相对目录的绝对路径（推荐）
set ROOT_DIR (realpath (dirname (status --current-filename))/..)
# 类似 bash 的写法
set ROOT_DIR (cd (dirname (status --current-filename))/.. && pwd -P)

# 获取当前目录的绝对路径
set CURRENT_DIR (realpath (dirname (status --current-filename)))
```
