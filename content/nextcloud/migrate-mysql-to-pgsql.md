# 迁移MySQL到PostgreSQL

## 准备PostgreSQL

确保 PostgreSQL 安装部署好，为 nextcloud 创建用户和数据库:

```bash
CREATE USER nextcloud WITH PASSWORD '123456';
CREATE DATABASE nextcloud WITH OWNER nextcloud TEMPLATE template0 ENCODING 'UTF8';
GRANT ALL PRIVILEGES ON DATABASE nextcloud TO nextcloud;
```

## 参考资料

-  [Nextcloud migrate to PostgreSQL](https://blog.jeanbruenn.info/2022/11/25/nextcloud-migrate-to-postgresql/)
