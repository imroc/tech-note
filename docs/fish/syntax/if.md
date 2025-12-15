# 判断

## 判断命令是否存在

```bash
if not command -sq kubecolor
    echo "kubecolor not installed"
else
    echo "kubecolor installed"
end
```

## 判断字符串是否为空

```bash
if test -z "$str"
    echo "str is empty"
else
    echo "str is not empty"
end
```

## 判断字符串是否不为空

```bash
if test -n "$str"
    echo "str is not empty"
else
    echo "str is empty"
end
```

## 判断变量是否存在

```bash
if set -q _flag_n
    echo "\$_flag_n is $_flag_n"
else
    echo "\$_flag_n is not set"
end
```
