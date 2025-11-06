# clickhouse-client 用法

## 登录指定数据库

```bash
clickhouse-client --host=$HOST --port=$PORT --user=$USER --password=$PASSWORD -d $DATABASE
```


## 一键查询

加 --query 参数：

```bash
clickhouse-client --host=$HOST --port=$PORT --user=$USER --password=$PASSWORD -d $DATABASE --query="select * from test"
```
