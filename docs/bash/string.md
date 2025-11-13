# 字符串

## 保持多行字符串到文件

```bash
cat > ca-csr.json <<EOF
{
  "CN": "Kubernetes",
  "key": {
    "algo": "rsa",
    "size": 2048
  },
  "names": [
    {
      "C": "CN",
      "ST": "SiChuan",
      "L": "ChengDu",
      "O": "Kubernetes",
      "OU": "CA"
    }
  ]
}
EOF
```

## 多行字符串传入其它命令的标准输入
```bash
cat <<EOF | kubectl apply -f -
apiVersion: v1
kind: ConfigMap
metadata:
  name: hello
data:
  hello: world
EOF
```

```bash
unshare --mount --pid --fork bash <<EOF
echo "hello world"
EOF
```
