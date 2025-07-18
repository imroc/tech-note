# clickhouse SQL 语言

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
SHOW TABLES FROM default;
-- SELECT name FROM system.tables WHERE database = 'default';
```

## 查询表结构

```sql
DESCRIBE table_name;
```
