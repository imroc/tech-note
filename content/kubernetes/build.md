# 编译

## 编译指定二进制

比如编译当前 OS 和 ARCH 的 kubectl:

```bash
make kubectl
```

编译指定指定 OS 和 ARCH 的 kubectl:

```bash
make kubectl KUBE_BUILD_PLATFORMS=linux/amd64
```

在某些动态链接库版本极低的跳板机上运行 kubectl 会报错，此时可以用静态编译，让 kubectl 不在依赖外部的动态链接库：

```bash
CGO_ENABLED=0 GOLDFLAGS="-s -w -extldflags '-static'" make kubectl KUBE_BUILD_PLATFORMS=linux/amd64
```
