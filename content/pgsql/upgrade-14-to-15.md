# 升级 PostgreSQL 14 到 15

## 使用 14 的旧数据启动 15 报错

15 启动日志报错 `database files are incompatible with server`：

```log
postgresql 03:58:06.35
postgresql 03:58:06.36 Welcome to the Bitnami postgresql container
postgresql 03:58:06.36 Subscribe to project updates by watching https://github.com/bitnami/containers
postgresql 03:58:06.36 Submit issues and feature requests at https://github.com/bitnami/containers/issues
postgresql 03:58:06.36
postgresql 03:58:06.37 INFO  ==> ** Starting PostgreSQL setup **
postgresql 03:58:06.38 INFO  ==> Validating settings in POSTGRESQL_* env vars..
postgresql 03:58:06.39 INFO  ==> Loading custom pre-init scripts...
postgresql 03:58:06.39 INFO  ==> Initializing PostgreSQL database...
postgresql 03:58:06.40 INFO  ==> pg_hba.conf file not detected. Generating it...
postgresql 03:58:06.40 INFO  ==> Generating local authentication configuration
postgresql 03:58:06.42 INFO  ==> Deploying PostgreSQL with persisted data...
postgresql 03:58:06.43 INFO  ==> Configuring replication parameters
postgresql 03:58:06.44 INFO  ==> Configuring fsync
postgresql 03:58:06.45 INFO  ==> Configuring synchronous_replication
postgresql 03:58:06.47 INFO  ==> Loading custom scripts...
postgresql 03:58:06.47 INFO  ==> Enabling remote connections
postgresql 03:58:06.48 INFO  ==> ** PostgreSQL setup finished! **
                                                                                                                                                                                                                                                                                                                                                                                                
postgresql 03:58:06.50 INFO  ==> ** Starting PostgreSQL **
2024-11-12 03:58:06.515 GMT [1] FATAL:  database files are incompatible with server
2024-11-12 03:58:06.515 GMT [1] DETAIL:  The data directory was initialized by PostgreSQL version 14, which is not compatible with this version 15.4.
```
