# 常见问题

## Error: No libbfd support

- 现象：执行 bpftool 报错：

```bash
$ bpftool prog dump jited id 2
Error: No libbfd support
```

- 原因：发行版自带的 bpftool 默认不支持 libbfd。
- 解决：从源码安装 bpftool。
