# @koishijs/plugin-adapter-discord

## 接入方法

1. 前往 [https://discord.com/developers/applications](https://discord.com/developers/applications)，登录账号创建一个应用
2. 点击「Bot」并创建一个新的机器人，保存这个页面中的 token（请注意不要泄露）
3. 要将机器人拉进你的服务器，点击「OAuth2」，并在网址生成器中勾选 Bot 和机器人所需要的权限
4. 打开生成的链接，选择你具有管理权限的服务器，就成功把机器人添加进去了
5. 将上面的 token 作为机器人配置项即可使用

## 配置项

包括全部的 [`WsClient`](../../api/core/adapter.md#类：adapter-wsclient) 选项和下列额外选项：

### options.token

- 类型: `string`

机器人账户的令牌。

### options.endpoint

- 类型: `string`
- 默认值: `'https://discord.com/api/v8'`

要连接的服务器地址。

### options.proxyAgent

- 类型: `string`
- 默认值: [`app.config.request.proxyAgent`](../../api/core/app.md#options-request-proxyagent)

请求时默认使用的网络代理。

### options.gateway

- 类型: `string`
- 默认值: `'wss://gateway.discord.gg/?v=8&encoding=json'`

要连接的 WebSocket 网关。

### options.intents

- 类型: `number`
- 默认值: `GUILD_MESSAGES | GUILD_MESSAGE_REACTIONS | DIRECT_MESSAGES | DIRECT_MESSAGE_REACTIONS`

需要订阅的机器人事件。这是一个以 bitset 形式表达的正整数，每一位代表一类事件。

参考：[Gateway Intents](https://discord.com/developers/docs/topics/gateway#gateway-intents)

### options.handleExternalAsset

- 可选值: `string`
- 默认值: `'auto'`

指定单独发送外链资源时采用的方法：

- **download:** 先下载后发送
- **direct:** 直接发送链接
- **auto:** 发送一个 HEAD 请求，如果返回的 Content-Type 正确，则直接发送链接，否则先下载后发送

### options.handleMixedContent

- 可选值: `string`
- 默认值: `'auto'`

指定发送图文混合内容时采用的方法：

- **separate:** 将每个不同形式的内容分开发送
- **attach:** 图片前如果有文本内容，则将文本作为图片的附带信息进行发送
- **auto:** 如果图片本身采用直接发送则与前面的文本分开，否则将文本作为图片的附带信息发送

当配置为 `attach` 并且发送文本+图片形式的消息时，无论 [`handleExternalAsset`](#options-discord-handleexternalasset) 配置为何都会先下载后发送。
