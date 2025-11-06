# 数据库备份

## 克隆数据库

将 `db1` 克隆到 `db2`:

```bash
mysqldump -uroot -p db1 > dump.sql
mysqladmin -uroot -p create db2
mysql -u root -p db2 < dump.sql
```
