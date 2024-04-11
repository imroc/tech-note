# 使用 picgo 上传图片

## 安装 picgo

```bash
npm install picgo -g
```

## 配置 picgo

配置文件在 `~/.picgo/config.json`，具体配置方法参考 [官方文档](https://picgo.github.io/PicGo-Core-Doc/zh/guide/config.html)。

下面展示图床使用腾讯云 COS 的配置示例：

```json
{
  "picBed": {
    "uploader": "tcyun",
    "current": "tcyun",
    "tcyun": {
      "version": "v5",
      "secretId": "************************************",
      "secretKey": "********************************",
      "bucket": "image-host-1251893006",
      "appId": "1251893006",
      "area": "ap-chengdu",
      "path": "",
      "customUrl": "",
      "options": ""
    }
  }
}
```

## 使用 super-prefix 插件

很多时候我们希望上传的图片使用的文件名和路径要根据当前时间自动生成，可以使用 picgo 的 super-prefix 插件来做。

1. 安装插件：

```bash
picgo install super-prefix
```

2. 配置插件（高亮部分）：

```jsonc showLineNumbers
  {
  "picBed": {
    "uploader": "tcyun",
    "current": "tcyun",
    "tcyun": {
      "version": "v5",
      "secretId": "************************************",
      "secretKey": "********************************",
      "bucket": "image-host-1251893006",
      "appId": "1251893006",
      "area": "ap-chengdu",
      "path": "",
      "customUrl": "",
      "options": ""
    }
  },
  // highlight-add-start
  "picgoPlugins": {
    "picgo-plugin-super-prefix": true
  },
  "picgo-plugin-super-prefix": {
    "prefixFormat": "YYYY/MM/DD/",
    "fileFormat": "YYYYMMDDHHmmss"
  }
  // highlight-add-end
}
```

## 使用 picgo 命令测试上传

1. 任意截个图到剪贴板。
2. 执行 `picgo u` 将剪贴板的图片上传到图床。
    ```bash
    $ picgo u
    [PicGo INFO]: Before transform
    [PicGo INFO]: Transforming... Current transformer is [path]
    [PicGo INFO]: Before upload
    [PicGo INFO]: beforeUploadPlugins: super-prefix running
    [PicGo INFO]: Uploading... Current uploader is [tcyun]
    [PicGo SUCCESS]:
    https://image-host-1251893006.cos.ap-chengdu.myqcloud.com/2024%2F04%2F11%2F20240411155444.png
    ```

:::tip

当你看到 `PicGo SUCCESS` 说明上传成功，你也可以进入图床里检查下文件是否存在。

:::

## 安装 nvim-picgo 插件

我用的 [LazyVim](https://github.com/LazyVim/LazyVim)，以下是我的插件配置：

```lua
{
  "askfiy/nvim-picgo",
  keys = {
    { "<localleader>i", "<cmd>UploadClipboard<CR>", ft = "markdown", desc = "Insert Picture (Picgo)" },
  },
  config = function()
    require("nvim-picgo").setup()
  end,
}
```
:::tip

`<localleader>` 我用的 `,`，在 markdown 类型的文件中，使用 `,i` 可自动将剪贴板中的截图自动上传到图床，并自动成 markdown 图片链接，直接粘贴到文件中即可。

:::
