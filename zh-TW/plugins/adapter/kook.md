# @koishijs/plugin-adapter-kook

## 接入方法

1. 前往 [开发者平台](https://developer.kookapp.cn/)，选择「机器人」并点击「新建」
2. 根据自身需要，在「机器人连接模式」中选择 Webhook 或 WebSocket 中的一种：
    - 如果是 Webhook，请记下页面中的 `token` 和 `verify_token` (请注意不要泄露)，并作为机器人的配置项，同时让 Koishi 暴露一个 URL，填入下方的 Callback URL 中，启动 Koishi 后点击「机器人上线」
    - 如果是 WebSocket，则只需记录 `token` (请注意不要泄露) 并作为机器人的配置项即可，你可以在任何时候启动 Koishi

## 基础配置项

### options.protocol

- 可选值: http, ws

要使用的协议类型。

### options.token

- 类型: `string`

机器人账户的令牌。

### options.endpoint

- 类型: `string`
- 默认值: `'https://www.kookapp.cn/api/v3'`

要请求的 API 网址。

### options.attachMode

- 类型: `'separate' | 'mixed' | 'card'`
- 默认值: `'separate'`

控制当尝试发送含有[资源元素](../../api/message/elements.md#资源元素)的消息时的行为。

- **separate:** 每一个资源消息段，以及资源消息段之间的文本都将单独发送一条消息
- **mixed:** 当要发送的内容中含有多个资源消息段或资源消息段和文本的混合时，发送卡片消息；否则将单独发送资源消息段
- **card:** 当要发送的内容中含有资源消息段，则以卡片消息的形式发送

## HTTP 配置项

### options.verifyToken

- 类型: `string`

机器人账户的验证令牌。

### options.path

- 类型：`string`
- 默认值：`'/kook'`

服务器监听的路径。

## WS 配置项

包括全部的 [`WsClient`](../../api/core/adapter.md#类-adapter-wsclient) 选项。
