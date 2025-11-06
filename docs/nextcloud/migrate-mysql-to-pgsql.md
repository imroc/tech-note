# 迁移MySQL到PostgreSQL

## 准备PostgreSQL

确保 PostgreSQL 安装部署好，为 nextcloud 创建用户和数据库:

```bash
CREATE USER nextcloud WITH PASSWORD '123456';
CREATE DATABASE nextcloud WITH OWNER nextcloud TEMPLATE template0 ENCODING 'UTF8';
GRANT ALL PRIVILEGES ON DATABASE nextcloud TO nextcloud;
```

## 迁移

```bash
su - www-data
php occ db:convert-type --all-apps --password="123456" pgsql nextcloud pgsql-postgresql.db nextcloud
```

## 踩坑一：This account is currently not available.

登录 www-data 用户报错：

```bash
$ su - www-data
This account is currently not available.
```

需修改 `/etc/passwd`，将这个:

```txt
www-data:x:33:33:www-data:/var/www:/usr/sbin/nologin
```

改成:

```txt
www-data:x:33:33:www-data:/var/www:/bin/bash
```

## 踩坑二: This command is temporarily disabled

```bash
$ php occ db:convert-type --all-apps --password="123456" pgsql nextcloud pgsql-postgresql.db nextcloud

Warning: Failed to set memory limit to 0 bytes (Current memory usage is 2097152 bytes) in Unknown on line 0
The current PHP memory limit is below the recommended value of 512MB.

In ConvertType.php line 183:

  This command is temporarily disabled (until the next maintenance release).


db:convert-type [--port PORT] [--password PASSWORD] [--clear-schema] [--all-apps] [--chunk-size CHUNK-SIZE] [--] <type> <username> <hostname> <database>
```
相关 issue:
- https://github.com/linuxserver/docker-nextcloud/issues/441
- https://github.com/nextcloud/server/issues/45257

如何解决？暂时无解，所以我只是将 MySQL 迁移到了 MariaDB（为了减少内存占用），因为这两者对于 NextCloud 来说都是一样的，只需要手动迁移下数据即可。

迁移方法：
1. 通过 mysql 命令导出数据库。
2. 通过 mariadb 命令导入数据库，可能会遇到字符集问题，搜索下解决即可。

## 参考资料

-  [Nextcloud migrate to PostgreSQL](https://blog.jeanbruenn.info/2022/11/25/nextcloud-migrate-to-postgresql/)
