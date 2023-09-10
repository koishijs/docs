# @koishijs/plugin-adapter-slack

## 接入方式

1. 在 [应用后台](https://api.slack.com/apps) 点击「Create New App」，选择「From Scratch」，填入应用名称和所添加的工作区 (目前适配器只支持一个应用处理一个工作区的事件)，点击「Create App」
2. 在跳转至的应用信息页面，在底部复制 `Signing Secret` 备用 (将用作 [`signing`](#config-signing) 配置项)
3. 在「App-Level Tokens」一栏，点击带有 Generate 字样的按钮，填写 Token 名称，在下方下拉框中选择 `connections:write`，点击绿色 Generate 按钮，在弹出的对话框中点击 Copy 按钮，填入插件的 [`token`](#config-token) 字段
4. 按照使用需求，决定由 Slack 服务器推送 Webhook 至 Koishi 的公网地址（`Webhook` 模式）或是连接至 Slack 服务器接收推送的消息（`Socket Mode` 模式），参照下方说明配置
5. Socket Mode：在左侧打开「Socket Mode」页面，勾选页面内的单选框
6. Webhook：在左侧打开 Event Subscriptions 页面，勾选单选框。将机器人的 `selfUrl` 值后连接 `/slack`（如 `https://example.com/slack`），在 Request URL 中填写
7. 在 Event Subscriptions 页面勾选事件 (参见下方的推荐列表)，填写完整后点击右下角绿色 Save Changes 保存
8. 在左侧 OAuth & Permissions 页面，在下方 Bot Token Scopes 中，点击 Add 添加权限 (参见下方的推荐列表)
9. 返回页面上方，点击 Install to Workspace，点击 Allow 授权，复制 Bot User OAuth Token 填入插件的 [`botToken`](#config-bottoken) 字段
10. 在相应工作区 @ 机器人名称或右键频道详情，选择 集成-添加应用 添加机器人到频道中

### 推荐勾选的事件

- channel_archive
- channel_created
- channel_deleted
- channel_left
- channel_rename
- member_joined_channel
- member_left_channel
- message.channels
- message.groups
- message.im
- reaction_added
- reaction_removed
- team_join

### 推荐添加的权限

- channels:history
- channels:read
- channels:write.invites
- chat:write
- chat:write.customize
- chat:write.public
- files:read
- files:write
- groups:history
- groups:read
- groups:write
- im:history
- im:write
- reactions:read
- reactions:write
- users:read

## 配置项

### config.protocol

- 可选值: http, ws

要使用的协议类型。

### config.token

- 类型: `string`
- 必需选项

应用令牌。

### config.botToken

- 类型: `string`
- 必需选项

机器人令牌。

## HTTP 配置项

### config.signing

- 类型: `string`
- 必需选项

用于验证请求来源的签名密钥。

## WebSocket 配置项

包括全部的 [`WsClient`](../../api/core/adapter.md#类：adapter-wsclient) 选项。
