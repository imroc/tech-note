# rsync

## 深度拷贝目录

将源目录中的内容，原封不动递归拷贝到目的目录，用 `-a` 参数:

```bash
rsync -av /path/to/src/ /path/to/dest/
```

如果不想覆盖目标目录中有同名文件，可以用 `--ignore-existing`：

```bash
rsync -av --ignore-existing /path/to/src/ /path/to/dest/
```

如果要删除目的目录中多余的文件（即源目录中不存在的文件），完全以源目录的内容为准，可以用 `--delete`:

```bash
rsync -av --delete /path/to/src/ /path/to/dest/
```

## 拷贝时排除指定目录

用 `--exclude` 参数:

```bash
rsync -av --exclude tmp /path/to/src/ /path/to/dest/
```

:::tip

`--exclude` 指定的目录是源目录的相对路径，`tmp` 意思就是排除 `/path/to/src/tmp` 这个目录。

:::

可以有多个 `--exclude` 表示排除多个目录，如果要排除的目录数量非常多，可以将目录列表写到文件中：

```bash
$ cat exclude-list.txt
some/subdir/linuxconfig
some/other/dir
exampledir
```

然后用 `--exclude-from` 来排除：

```bash
rsync -av --exclude-from='exclude-list.txt' /path/to/src/ /path/to/dest/
```

## 踩过的坑

### 目标目录不要是源目录的父目录

如果源目录是目标目录的子目录，拷贝的结果可能不符预期。

比如：

```bash
rsync -av /path/to/parent/sub/ /path/to/parent/
```

一个典型的场景是在编译 dockerfile 时，按照文件系统目录结构准备了各种配置文件：

```txt
config
├── etc
│   ├── nerdctl
│   │   └── nerdctl.toml
│   ├── rc.local
│   └── ssh
│       ├── ssh_host_ecdsa_key
│       ├── ssh_host_ecdsa_key.pub
│       ├── ssh_host_ed25519_key
│       ├── ssh_host_ed25519_key.pub
│       ├── ssh_host_rsa_key
│       ├── ssh_host_rsa_key.pub
│       └── sshd_config
├── lib
│   └── systemd
│       └── system
│           └── rc-local.service
```

希望将所有配置用 rsync 一次性拷贝到根目录下：

```dockerfile title="Dockerfile"
COPY ./config /config
RUN rsync -av /config/ /
```

:::warning

结果将会是镜像内很多原有的很多文件被删除。

:::
