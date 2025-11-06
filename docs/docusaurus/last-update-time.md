# 自动生成文章上次修改时间

## 前提：git clone 不加 --depth

自动生成文档的上次更新时间以来 git 历史，如果在编译文档时，克隆仓库用的浅克隆，可能无法从 git 历史中正确获取 md 文件上次修改时间。

如果使用 CI 自动构建文档，确保在 `git clone` 时不要加 `--depth` 参数避免浅克隆。

## showLastUpdateTime 置为 true

为 blog 或 docs 打开 `showLastUpdateTime`，以下是分别是在 presets 和 plugins 的配置方式：

<Tabs>
  <TabItem value="presets" label="presets">
    <FileBlock file="docusaurus-config/last-update-time-presets.ts" title="docusaurus.config.ts" showLineNumbers />
  </TabItem>
  <TabItem value="plugins" label="plugins">
    <FileBlock file="docusaurus-config/last-update-time-plugins.ts" title="docusaurus.config.ts" showLineNumbers />
  </TabItem>
</Tabs>

