# 用户管理

## 创建用户

```bash
useradd --create-home --shell /bin/bash -u 1001 --user-group roc
echo "roc ALL=(ALL) NOPASSWD:ALL" >>/etc/sudoers

- 创建 `roc` 用户并自动创建相应 HOME 目录。
- 并赋予 sudo 权限。
- 执行 sudo 时无需输入密码。
- 设置默认登录 shell 为 `/bin/bash`。
```

## 删除用户

```bash
userdel <username>
```

## 修改默认 shell

```bash
chsh -s /bin/bash <username>
```
