# apt 包管理器

## 搜索软件包

```bash
$ apt search docker-ce-cli
docker-ce-cli/noble 5:28.0.4-1~ubuntu.24.04~noble amd64 [可从该版本升级：5:27.3.1-1~ubuntu.24.04~noble]
  Docker CLI: the open-source application container engine
```

## 安装软件包

```bash
apt install docker-ce-cli
```

静默安装（禁止交互式确认，适合在 Dockerfile 中使用）：

```bash
DEBIAN_FRONTEND=noninteractive  apt install -y docker-ce-cli
```

## 卸载软件包

```bash
apt remove docker-ce-cli
```

## 查询软件包详细信息

```bash
$ apt show docker-ce-cli
Package: docker-ce-cli
Version: 5:28.0.4-1~ubuntu.24.04~noble
Priority: optional
Section: admin
Source: docker-ce
Maintainer: Docker <support@docker.com>
Installed-Size: 43.5 MB
Depends: libc6 (>= 2.34)
Recommends: docker-buildx-plugin, docker-compose-plugin
Conflicts: docker (<< 1.5~), docker-engine, docker.io
Breaks: docker-ce (<< 5:0)
Replaces: docker-ce (<< 5:0)
Homepage: https://www.docker.com
Download-Size: 15.8 MB
APT-Sources: https://download.docker.com/linux/ubuntu noble/stable amd64 Packages
Description: Docker CLI: the open-source application container engine
 Docker is a product for you to build, ship and run any application as a
 lightweight container
 .
 Docker containers are both hardware-agnostic and platform-agnostic. This means
 they can run anywhere, from your laptop to the largest cloud compute instance and
 everything in between - and they don't require you to use a particular
 language, framework or packaging system. That makes them great building blocks
 for deploying and scaling web apps, databases, and backend services without
 depending on a particular stack or provider.
```

## 查询软件包可用版本

给 list 子命令加 `-a` 参数，即可列出所有版本：

```bash
$ apt list -a docker-ce-cli
docker-ce-cli/noble 5:28.0.4-1~ubuntu.24.04~noble amd64 [可从该版本升级：5:27.3.1-1~ubuntu.24.04~noble]
docker-ce-cli/noble 5:28.0.3-1~ubuntu.24.04~noble amd64
docker-ce-cli/noble 5:28.0.2-1~ubuntu.24.04~noble amd64
docker-ce-cli/noble 5:28.0.1-1~ubuntu.24.04~noble amd64
docker-ce-cli/noble 5:28.0.0-1~ubuntu.24.04~noble amd64
docker-ce-cli/noble 5:27.5.1-1~ubuntu.24.04~noble amd64
docker-ce-cli/noble 5:27.5.0-1~ubuntu.24.04~noble amd64
docker-ce-cli/noble 5:27.4.1-1~ubuntu.24.04~noble amd64
docker-ce-cli/noble 5:27.4.0-1~ubuntu.24.04~noble amd64
docker-ce-cli/noble,now 5:27.3.1-1~ubuntu.24.04~noble amd64 [已安装，可升级至：5:28.0.4-1~ubuntu.24.04~noble]
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
docker-ce-cli/noble 5:26.1.1-1~ubuntu.24.04~noble amd64
docker-ce-cli/noble 5:26.1.0-1~ubuntu.24.04~noble amd64
docker-ce-cli/noble 5:26.0.2-1~ubuntu.24.04~noble amd64
docker-ce-cli/noble 5:26.0.1-1~ubuntu.24.04~noble amd64
docker-ce-cli/noble 5:26.0.0-1~ubuntu.24.04~noble amd64
```

## 查询软件包的依赖

`apt show` 的输出本身就包含了软件包的依赖信息。
