# 搜索

## 向 algolia 申请免费爬虫

申请入口: https://docsearch.algolia.com/apply

:::info
切记邮箱要用你 algolia 账号所关联的邮箱！
:::

申请成功后会收到邮件，最重要的信息是 `appId`, `apiKey` 和 `indexName`:

![](https://image-host-1251893006.cos.ap-chengdu.myqcloud.com/2023%2F09%2F28%2F20230928113546.png)

然后登陆你的 algolia 账号，如果邮箱跟你申请爬虫时的邮箱一致，不出意外的话会收到如下邀请提示:

![](https://image-host-1251893006.cos.ap-chengdu.myqcloud.com/2023%2F09%2F28%2F20230928113932.png)

接受后，在 Application 里就会多出一个了：

![](https://image-host-1251893006.cos.ap-chengdu.myqcloud.com/2023%2F09%2F28%2F20230928114123.png)

## 配置爬虫运行周期

默认一周爬一次，这个间隔太久了，最低可以调到一天一次，参考 [官方文档 schedule 参数说明](https://www.algolia.com/doc/tools/crawler/apis/configuration/schedule/)

![](https://image-host-1251893006.cos.ap-chengdu.myqcloud.com/2023%2F09%2F28%2F20230928115027.png)

下面我们来修改 schedule 配置。

登陆 [爬虫管理页](https://crawler.algolia.com/)，进入 algolia 自动为我们创建的免费爬虫:

![](https://image-host-1251893006.cos.ap-chengdu.myqcloud.com/2023%2F09%2F28%2F20230928114551.png)

点击 `Editor`:

![](https://image-host-1251893006.cos.ap-chengdu.myqcloud.com/2023%2F09%2F28%2F20230928114640.png)

修改 `schedule`:

![](https://image-host-1251893006.cos.ap-chengdu.myqcloud.com/2023%2F09%2F28%2F20230928114912.png)

## 手动触发爬虫

点进具体爬虫的页面，点右上角 `Restart crawling` 可以手动触发爬虫:

![](https://image-host-1251893006.cos.ap-chengdu.myqcloud.com/2023%2F09%2F28%2F20230928115651.png)

## 参考资料

* [Docusaurus Search](https://docusaurus.io/docs/search)
