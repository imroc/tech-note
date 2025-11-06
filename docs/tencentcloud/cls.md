# 腾讯云 CLS

## 根据访问日志计算 QPS

```sql
select histogram(cast(__TIMESTAMP__ as timestamp),interval 1 second) as time, count(*) as "QPS" group by time order by time desc limit 10000
```

![](https://image-host-1251893006.cos.ap-chengdu.myqcloud.com/2024%2F05%2F16%2F20240516112905.png)

> 参考 https://cloud.tencent.com/developer/article/2253792
