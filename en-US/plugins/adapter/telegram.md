# @koishijs/plugin-adapter-telegram

## 接入方法

1. 搜索 @botfather（有个官方认证的符号）并进入聊天界面
2. After entering `start`, a menu will appear. You can use commands to configure your bot here.
3. To create a bot, click `/newbot` and follow the instructions to finish the process of creation.
4. 使用 `/setprivacy` 开启 Privacy Mode（不然机器人只能收到特定消息）
5. 创建完毕后，你会获得一个 token（请注意不要泄露），将其作为机器人配置项即可使用

参考文档：<https://core.telegram.org/bots>

::: tip
如果启动机器人后发现收不到不带 `/` 的消息，这很可能是由于 Privacy Mode 未开启。如果开启后仍然收不到消息，请尝试将机器人从群组中移除后重新加入。
:::

## 机器人选项

### options.protocol

- 可选值: server, polling

要使用的协议类型。

### options.token

- 类型: `string`

机器人账户的令牌。

### options.endpoint

- 类型: `string`
- 默认值: `'https://api.telegram.org'`

要连接的服务器地址。

### options.proxyAgent

- 类型: `string`
- 默认值: [`app.config.request.proxyAgent`](../../api/core/app.md#options-request-proxyagent)

请求时默认使用的网络代理。

### options.files.endpoint

- 类型: `string`
- 默认值: [`options.endpoint`](#options-bots-endpoint)

文件请求的终结点。

### options.files.local

- 类型: `boolean`
- 默认值: `false`

是否启用 [Telegram Bot API](https://github.com/tdlib/telegram-bot-api) 本地模式。

## 适配器选项

### options.path

- 类型：`string`
- 默认值：`'/telegram'`

服务器监听的路径。

### options.selfUrl

- 类型：`string`

Koishi 服务暴露在公网的地址，会覆盖 [`app.config.selfUrl`](../../api/core/app.md#options-selfurl) 的值。
