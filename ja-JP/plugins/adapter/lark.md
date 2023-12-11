# @koishijs/plugin-adapter-lark

## 接入方法

1. 在开发者后台 ([Lark](https://open.larksuite.com/app/) / [飞书](https://open.feishu.cn/app/)) 新建**企业自建应用**，点击应用名称进入应用详情页。
2. 点击凭证与基础信息，获取 App ID 和 App Secret 值，填写到插件配置对应字段。
3. 点击事件订阅，获取 Encrypt Key 和 Verification Token 值，填写到插件配置对应字段。
4. 在事件订阅页面，确保添加了 `接收消息v2.0` (`im.message.receive_v1`) 事件。
5. 如果你的机器人需要发送图片消息，你需要确保添加了 `获取与上传图片或文件资源` (`im:resource`) 事件
6. 按实际情况配置插件或机器人全局的 `selfUrl` 值，然后启动插件。
7. 将第 6 步中配置的值加上 `path` 的值，填写到飞书开发者后台事件订阅页面的**请求地址配置**中，并点击完成。
8. 若第 7 步的 URL 验证未通过，请检查你所配置的地址是否正确。

参考文档：https\://open.larksuite.com/document/home/develop-a-bot-in-5-minutes/coding

## 配置项

### options.appId

- 类型：`string`

机器人的应用 ID。

### options.appSecret

- 类型：`string`

机器人的应用密钥。

### options.encryptKey

- 类型：`string`

机器人的 Encrypt Key。

### options.verificationToken

- 类型：`string`

事件推送的验证令牌。

## HTTP 配置项

### options.path

- 类型：`string`
- 默认值：`'/feishu'` 或 `'/lark'`

服务器监听的路径。

### options.selfUrl

- 类型：`string`

Koishi 服务暴露在公网的地址，会覆盖 [`app.config.selfUrl`](../../api/core/app.md#options-selfurl) 的值。

### options.verifyToken

- 类型：`boolean`

接受事件推送时是否验证令牌。

### options.verifySignature

- 类型：`boolean`

接受事件推送时是否验证签名。
