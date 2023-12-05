# Plugin Manager (Market)

## 配置项

### search.endpoint

- 类型: `string`

用于搜索插件市场的网址。默认跟随当前的 npm registry。

::: tip
一个规范的 [npm registry](https://github.com/npm/registry/blob/master/docs/REGISTRY-API.md) 服务器会包含搜索功能。但并不是所有 npm 镜像都支持了搜索 API (例如 <https://registry.npmmirror.com>)。如果你使用了不支持搜索的镜像，请设置此项，否则插件市场将无法显示。

你可以填入我们的官方镜像：<https://registry.koishi.chat/index.json>。
:::

### search.timeout

- 类型: `number`
- 默认值: `30000`

搜索插件市场的最长时间，单位为毫秒。

### registry.endpoint

- 类型: `string`

用于搜索版本信息的网址。默认跟随当前的 npm registry。

### registry.timeout

- 类型: `string`

搜索版本信息的最长时间，单位为毫秒。
