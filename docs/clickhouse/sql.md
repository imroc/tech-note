# clickhouse SQL 语法

## 查询有哪些数据库

```sql
SHOW DATABASES;
-- SELECT name FROM system.databases;
```

## 切换到指定数据库

```sql
USE database_name;
```

## 查询有哪些表

```sql
SHOW TABLES; -- 查询当前 db 有哪些表
SHOW TABLES FROM default; -- 查询指定 db 有哪些表
-- SELECT name FROM system.tables WHERE database = 'default';
```

## 查询表结构

```sql
DESCRIBE table_name;
```
