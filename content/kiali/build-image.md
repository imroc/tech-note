# 编译 kiali 镜像

## 编译前端代码

编译前端代码对 node 版本有要求，比如 `v1.70` 的 kiali 依赖 node 14，可以用 docker 镜像来编译，首先用 `node:14` 这个镜像来启动一个临时用于编译的容器，将 kiali 项目目录挂载进去：

```bash
docker run --rm -it -v $PWD:/source node:14 bash
```

在容器内编译前端代码：

```bash
cd /source/frontend
yarn && yarn build
```

## 编译二进制

前端代码编译完成后退出编译容器，在 kiali 项目目录里编译二进制文件：

```bash
make build
```

## 编译镜像

```bash
export CONTAINER_NAME=imroc/kiali
make container-build-kiali
```

## 重新 tag

```bash
docker tag quay.io/kiali/kiali:dev imroc/kiali:dev
```

需要测试的话就自行 push 并替换kiali镜像。

## 注意事项

新版 istio  的 `15014:/debug/endpointz`  接口有 breaking change，导致 kiali 报错:

```txt
"Cannot load the graph: json: cannot unmarshal object into Go value of type []*kubernetes.RegistryEndpoint"
```

issue: https://github.com/kiali/kiali/issues/6510

解决：编译最新版 kiali （还没 release）

相关PR: https://github.com/kiali/kiali/pull/6629

