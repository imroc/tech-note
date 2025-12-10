# 使用 mycli 执行 SQL

## 打包镜像

```dockerfile
FROM ubuntu:24.04

RUN apt update -y

RUN DEBIAN_FRONTEND=noninteractive apt install -y tzdata locales && \
  ln -fs /usr/share/zoneinfo/Asia/Shanghai /etc/localtime && \
  dpkg-reconfigure -f noninteractive tzdata && \
  locale-gen zh_CN.UTF-8 && \
  update-locale LANG=zh_CN.UTF-8

RUN DEBIAN_FRONTEND=noninteractive apt install -y mycli less

RUN apt-get clean autoclean && \
  apt-get autoremove --yes && \
  rm -rf /var/lib/{apt,dpkg,cache,log}/

CMD [ "sleep", "infinity" ]
```

## 导出 CSV

使用 mycli 登录数据库后，在 SQL 交互界面执行：

```bash
\T csv ; \o /tmp/export.csv ; SELECT * FROM t_table LIMIT 3
```

或者直接用 mycli 命令导出 CSV：

```bash
mycli -u user -p password -D database --csv -e "SELECT * FROM t_table LIMIT 3" > /tmp/export.csv
```
