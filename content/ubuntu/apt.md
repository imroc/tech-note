# apt 包管理器

## 查询指定软件包所有版本

给 list 子命令加 `-a` 参数，即可列出所有版本：

```bash
$ apt list docker-ce-cli -a
正在列表... 完成
docker-ce-cli/noble 5:27.3.1-1~ubuntu.24.04~noble amd64 [可从该版本升级：5:26.1.1-1~ubuntu.24.04~noble]
docker-ce-cli/noble 5:27.3.0-1~ubuntu.24.04~noble amd64
docker-ce-cli/noble 5:27.2.1-1~ubuntu.24.04~noble amd64
docker-ce-cli/noble 5:27.2.0-1~ubuntu.24.04~noble amd64
docker-ce-cli/noble 5:27.1.2-1~ubuntu.24.04~noble amd64
docker-ce-cli/noble 5:27.1.1-1~ubuntu.24.04~noble amd64
docker-ce-cli/noble 5:27.1.0-1~ubuntu.24.04~noble amd64
docker-ce-cli/noble 5:27.0.3-1~ubuntu.24.04~noble amd64
docker-ce-cli/noble 5:27.0.2-1~ubuntu.24.04~noble amd64
docker-ce-cli/noble 5:27.0.1-1~ubuntu.24.04~noble amd64
docker-ce-cli/noble 5:26.1.4-1~ubuntu.24.04~noble amd64
docker-ce-cli/noble 5:26.1.3-1~ubuntu.24.04~noble amd64
docker-ce-cli/noble 5:26.1.2-1~ubuntu.24.04~noble amd64
docker-ce-cli/noble,now 5:26.1.1-1~ubuntu.24.04~noble amd64 [已安装，可升级至：5:27.3.1-1~ubuntu.24.04~noble]
docker-ce-cli/noble 5:26.1.0-1~ubuntu.24.04~noble amd64
docker-ce-cli/noble 5:26.0.2-1~ubuntu.24.04~noble amd64
docker-ce-cli/noble 5:26.0.1-1~ubuntu.24.04~noble amd64
docker-ce-cli/noble 5:26.0.0-1~ubuntu.24.04~noble amd64
```
