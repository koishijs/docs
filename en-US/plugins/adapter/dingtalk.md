# @koishijs/plugin-adapter-dingtalk

## 接入方式

1. 前往 [开放平台 > 应用开发 > 钉钉应用](https://open-dev.dingtalk.com/fe/app#/corp/app) 并点击「创建应用」，输入相关信息，选择「企业自主开发」并确定创建
2. 在跳转至的应用信息页面，将 `AppKey` 填入插件的 `appkey` 字段，将 `AppSecret` 填入插件的 `secret` 字段，将 `AgentId` 填入插件的 `agentId` 字段
3. 在左侧打开「机器人与消息推送」页面，勾选「机器人配置」，输入相关信息；消息接收模式选择 `Stream 模式` 时，插件的 protocol 填写 ws，选择 `HTTP 模式` 时，将机器人的 `selfUrl` 值后连接 `/dingtalk`（如 `https://example.com/dingtalk`）填入钉钉平台的消息接收地址，插件的 protocol 填写 http。最后点击发布按钮

## 配置项

### config.protocol

- 可选值: http, ws

要使用的协议类型。

### config.secret

- 类型: `string`
- 必需选项

机器人密钥。

### config.appkey

- 类型: `string`
- 必需选项

机器人 AppKey。

### config.agentId

- 类型: `string`
- 必需选项

机器人 AgentId。

## HTTP 配置项

无。

## WebSocket 配置项

包括全部的 [`WsClient`](../../api/core/adapter.md#类：adapter-websocketclient) 选项。
