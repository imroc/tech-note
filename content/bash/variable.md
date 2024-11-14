# 变量

## 默认值

优先来自指定环境变量,如果环境变量不存在,则使用指定默认值:


```bash
assets_path="${XRAY_LOCATION_ASSET:-/data/xray/assets}"
```
