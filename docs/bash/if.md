# 判断
## 判断目录是否存在

```bash
if [ -d "$dir" ]; then
  echo "directory $dir exists"
else
  echo "directory $dir does not exist"
fi
```

## 判断文件是否存在

 ```bash
if [ -f "$file" ]; then
  echo "file $file exists"
else
  echo "file $file does not exist"
fi
 
 ```

## 判断命令是否存在

```bash
if ! command -v jq &>/dev/null; then
  echo "jq not installed"
  exit 1
fi
```

## 判断命令是否执行成功

```bash
if mount bpffs /sys/fs/bpf -t bpf 2>/dev/null; then
  echo "mount bpffs success"
fi
```

