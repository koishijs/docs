# @koishijs/plugin-adapter-slack

::: tip
如果选择通信方式为 `http`，那么你需要准备一个带有 SSL 证书的公网域名，并将 Koishi [部署到公网](../../manual/recipe/server.md)。
:::

## 接入方式

Slack 适配器提供了两种接入方式：`http` 和 `ws` (推荐)。其中，`http` 连接方式需要一个公网可访问的地址。在接入之前，请根据使用需求填写插件的 [`protocol`](#config-protocol) 字段。

1. 准备一个 [Slack](https://slack.com/signin) 账号和工作区。

2. 前往 [应用后台](https://api.slack.com/apps)，点击「Create New App」>「From Scratch」，填入应用名称和所添加的工作区 (目前适配器只支持一个应用处理一个工作区的事件)，点击「Create App」。

![app-1](/adapter/slack/app-1.webp)

<!-- ![app-2](/adapter/slack/app-2.webp) -->

3. 仅限 `http` 连接方式：在跳转至的应用信息页面，在底部复制 `Signing Secret`，填入插件的 [`signing`](#config-signing) 字段。

![secret-1](/adapter/slack/secret-1.webp)

4. 在「App-Level Tokens」一栏，点击带有 Generate 字样的按钮，填写 Token 名称，在下方下拉框中选择 `connections:write`，点击绿色 Generate 按钮，在弹出的对话框中点击 Copy 按钮，填入插件的 [`token`](#config-token) 字段。

![secret-2](/adapter/slack/secret-2.webp)

5. 仅限 `http` 连接方式：在左侧打开「Event Subscriptions」页面，勾选「Enable Events」。将机器人的 `selfUrl` 值后连接 `/slack` (如 `https://example.com/slack`)，填入「Request URL」中。

![webhook](/adapter/slack/webhook.webp)

6. 仅限 `ws` 连接方式：在左侧打开「Socket Mode」页面，勾选「Enable Socket Mode」；再打开「Event Subscriptions」页面，勾选「Enable Events」。

![websocket](/adapter/slack/websocket.webp)

7. 前往「Event Subscriptions」页面，在「Subscribe to bot events」下方勾选事件 (参见 [推荐的事件列表](#推荐的事件列表))，填写完整后点击右下角的绿色「Save Changes」按钮保存。

![events](/adapter/slack/events.webp)

8. 前往「OAuth & Permissions」页面，在「Bot Token Scopes」下方添加权限 (参见 [推荐的权限列表](#推荐的权限列表))。

![scopes](/adapter/slack/scopes.webp)

9. 返回页面上方，点击「Install to Workspace」，点击 Allow 授权，复制「Bot User OAuth Token」，填入插件的 [`botToken`](#config-bottoken) 字段。

![workspace](/adapter/slack/workspace.webp)

10. 在相应工作区 @ 机器人名称或右键频道详情，选择 集成-添加应用 添加机器人到频道中。

### 推荐的事件列表

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

### 推荐的权限列表

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

## WS 配置项

包括全部的 [`WsClient`](../../api/core/adapter.md#类-adapter-wsclient) 选项。
