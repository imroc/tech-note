# 编译 kiali 镜像

## 编译前端代码

首先进入 kiali 项目目录，编译前端代码：

```bash
yarn && yarn build
```

## 编译二进制

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

