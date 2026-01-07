# 变量

## 默认值

优先来自指定环境变量，如果环境变量不存在，则使用指定默认值：

```bash
assets_path="${XRAY_LOCATION_ASSET:-/data/xray/assets}"
```

## 关于变量

```bash
# 当前目录
CURRENT_DIR=$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd -P)

# 根据当前脚本文件的相对路径获取根目录的绝对路径
ROOT_DIR=$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd -P)

# 进入指定目录（比如需要在指定目录下运行命令，可 cd 到指定目录）
cd "${ROOT_DIR}" || return
```
