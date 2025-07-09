# 循环

## 循环指定次数

```bash
for i in {1..5}; do
  echo "loop $i"
done
```

## 死循环

```bash
while true; do
  echo "loop: $(date)"
done
```

或者：

```bash
while :
do
  echo "loop: $(date)"
done
```
