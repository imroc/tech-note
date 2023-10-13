---
sidebar_position: 40
---

# 添加 algolia 搜索功能

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

## 配置爬虫

algolia 爬虫运行需要配置，默认的配置可能不太使用 docusaurus，可以使用 algolia 官方针对 docusaurus 的配置模版进行配置：

* [docusaurus v3 模版](https://docsearch.algolia.com/docs/templates/#docusaurus-v3-template)
* [docusaurus v2 模版](https://docsearch.algolia.com/docs/templates/#docusaurus-v2-template)

根据自己当前使用的 docusaurus 版本选取配置模板，然后替换模板中的全大写的值，然后按照下面的方法替换 algolia 爬虫配置。

登陆 [爬虫管理页](https://crawler.algolia.com/)，进入 algolia 自动为我们创建的免费爬虫:

![](https://image-host-1251893006.cos.ap-chengdu.myqcloud.com/2023%2F09%2F28%2F20230928114551.png)

点击 `Editor`:

![](https://image-host-1251893006.cos.ap-chengdu.myqcloud.com/2023%2F09%2F28%2F20230928114640.png)

然后替换配置内容再点击 `Save` 即可。

## 配置爬虫运行周期

默认一周爬一次，这个间隔太久了，最低可以调到一天一次，参考 [官方文档 schedule 参数说明](https://www.algolia.com/doc/tools/crawler/apis/configuration/schedule/)

![](https://image-host-1251893006.cos.ap-chengdu.myqcloud.com/2023%2F09%2F28%2F20230928115027.png)

可以按照前面的方法修改 algolia 爬虫配置，只需改 `schedule` 配置:

![](https://image-host-1251893006.cos.ap-chengdu.myqcloud.com/2023%2F09%2F28%2F20230928114912.png)

## 手动触发爬虫

点进具体爬虫的页面，点右上角 `Restart crawling` 可以手动触发爬虫:

![](https://image-host-1251893006.cos.ap-chengdu.myqcloud.com/2023%2F09%2F28%2F20230928115651.png)


## 页面启用 algolia 搜索

将邮件中收到的 api key 信息填入配置:


```js title="docusaurus.config.js"
themeConfig: {
    algolia: {
      apiKey: "***********",
      appId: "***********",
      indexName: "*****",
    },
}
```

## 参考资料

* [Docusaurus Search](https://docusaurus.io/docs/search)
