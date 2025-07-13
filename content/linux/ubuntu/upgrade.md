# 升级发行版版本

## 升级配置

在配置文件 `/etc/update-manager/release-upgrades` 中可以配置是否允许升级到非 LTS（长期维护）版本：

```toml showLineNumbers title="/etc/update-manager/release-upgrades"
# Default behavior for the release upgrader.

[DEFAULT]
# Default prompting and upgrade behavior, valid options:
#
#  never  - Never check for, or allow upgrading to, a new release.
#  normal - Check to see if a new release is available.  If more than one new
#           release is found, the release upgrader will attempt to upgrade to
#           the supported release that immediately succeeds the
#           currently-running release.
#  lts    - Check to see if a new LTS release is available.  The upgrader
#           will attempt to upgrade to the first LTS release available after
#           the currently-running one.  Note that if this option is used and
#           the currently-running release is not itself an LTS release the
#           upgrader will assume prompt was meant to be normal.
# highlight-next-line
Prompt=lts
```

如果改成 `normal` 表示允许升级到非 LTS 版本。

## 升级操作

执行以下操作来升级 Ubuntu 版本：

```bash
sudo apt update
sudo apt-get dist-upgrade
sudo do-release-upgrade
```

:::tip

如果刚发布不久，执行 `do-release-upgrade` 可能会提示没有更新可用，因为可能只是对增量安装发布了，存量升级还不行，这时如果想要提前升级，可以加个 `-d`，即 `do-release-upgrade -d`。

:::

重启后才能生效：

```bash
reboot
```

##  参考资料

* Ubuntu 官方升级指引文档: https://ubuntu.com/server/docs/how-to-upgrade-your-release
* Ubuntu 各发新版的生命周期: https://wiki.ubuntu.com/Releases
