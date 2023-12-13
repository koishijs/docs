# @koishijs/plugin-server-temp

::: warning
使用此插件需要你将 Koishi [部署到公网](../../manual/recipe/server.md) (通常你还需要准备一个公网域名)。
:::

@koishijs/plugin-server-temp 实现了一个临时文件服务。

## 配置项

### config.path

- 类型: `string`
- 默认值: `'/temp'`

服务器监听的路径。

### config.selfUrl

- 类型: `string`
- 默认值: [`ctx.server.config.selfUrl`](./server.md#config-selfurl)

服务暴露在公网的地址。

### config.maxAge

- 类型: `number`
- 默认值: `Time.minute * 5`

文件的最大有效时间。
