# @koishijs/plugin-adapter-discord

## 接入方法

1. 前往 [https://discord.com/developers/applications](https://discord.com/developers/applications)，登录账号创建一个应用
2. 点击「Bot」并创建一个新的机器人，保存这个页面中的 token（请注意不要泄露）
3. To invite your bot into your server, click "OAuth2" and check the permissions that required for your bot in URL Generator, make sure "Bot" to be checked.
4. Open the link that you generated above, select the server that you have the admin permissions, then you could add your bot into the server successfully.
5. 将上面的 token 作为机器人配置项即可使用

## 配置项

包括全部的 [`WsClient`](../../api/core/adapter.md#类：adapter-websocketclient) 选项和下列额外选项：

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

## 频道

### bot.$modifyChannel(channelId, data)

- **channelId:** `string` 频道 ID
- **data:** `ModifyChannel` 请求的数据

修改频道信息。

## 反应

### bot.$createReaction(channelId, messageId, emoji)
- **channelId:** `string` 频道 ID
- **messageId:** `string` 消息 ID
- **emoji:** `string` emoji 表情, 例如: 😊, 需提交其[百分比编码](https://developer.mozilla.org/zh-CN/docs/Glossary/percent-encoding)

以机器人的身份创建反应。

### bot.$deleteReaction(channelId, messageId, emoji)
- **channelId:** `string` 频道 ID
- **messageId:** `string` 消息 ID
- **emoji:** `string` emoji 表情

删除机器人创建的反应。

### bot.$deleteAllReactions(channelId, messageId, emoji?)
- **channelId:** `string` 频道 ID
- **messageId:** `string` 消息 ID
- **emoji:** `string` emoji 表情

删除所有反应。

## Webhook

### bot.$executeWebhook(id, token, data, wait)
- **id:** `string` ID
- **token:** `string` Token
- **data:** `ExecuteWebhookBody` 请求内容
- **wait:** `boolean` 等待 Discord 处理消息, 默认为 `false` (`false` 将不会返回消息 ID )
- 返回值: `Promise<string>`

执行 Webhook。

### bot.$createWebhook(channelId, data)
- **channelId:** `string` ID
- **data:** `{
  name: string;
  avatar?: string
}` 提交内容

创建 Webhook。

### bot.$modifyWebhook(channelId, data)
- **channelId:** `string` ID
- **data:** `{
  name: string;
  avatar?: string
}` 提交内容

修改 Webhook。

### bot.$getChannelWebhooks(channelId)
- **channelId:** `string` ID
- 返回值: `Promise<Webhook[]>`

获取频道的 Webhook 列表。

### bot.$getGuildWebhooks(guildId)
- **guildId:** `string` 服务器 ID
- 返回值: `Promise<Webhook[]>`

获取服务器的 Webhook 列表。

## 服务器

### bot.getGuildChannels(guildId)
- **guildId:** `string` 服务器 ID
- 返回值: `Promise<Channel[]>`

获取服务器下的频道列表。

### bot.$getGuildRoles(guildId)
- **guildId:** `string` 服务器 ID
- 返回值: `Promise<Role[]>`

获取服务器权限列表。

### bot.$listGuildMembers(guildId, limit?, after?)
- **guildId:** `string` 服务器 ID
- **limit:** `number` 数量限制(1-1000), 默认为 1
- **after:** `string` 上一页最后一位用户的 ID

获取服务器用户列表。

### bot.$getRoleMembers(guildId, roleId)
- **guildId:** `string` 服务器 ID
- **roleId:** `string` 权限 ID
- 返回值: `Promise<GuildMember[]>`

获取服务器内拥有此权限的所有用户。

### bot.$modifyGuildMember(guildId, userId, data)
- **guildId:** `string` 服务器 ID
- **userId:** `string` 用户 ID
- **data:** `ModifyGuildMember` 请求内容

修改服务器成员信息。

### bot.$setGroupCard(guildId, userId, nick)
- **guildId:** `string` 服务器 ID
- **userId:** `string` 用户 ID
- **nick:** `string` 昵称

修改用户在服务器内的昵称。

### bot.$addGuildMemberRole(guildId, userId, roleId)
- **guildId:** `string` 服务器 ID
- **userId:** `string` 用户 ID
- **roleId:** `string` 权限 ID

为成员增加权限。

### bot.$removeGuildMemberRole(guildId, userId, roleId)
- **guildId:** `string` 服务器 ID
- **userId:** `string` 用户 ID
- **roleId:** `string` 权限 ID

删除成员权限。

### bot.$createGuildRole(guildId, data)
- **guildId:** `string` 服务器 ID
- **data:** `GuildRoleBody`

增加服务器权限。

### bot.$modifyGuildRole(guildId, roleId, data)
- **guildId:** `string` 服务器 ID
- **roleId:** `string` 权限 ID
- **data:** `GuildRoleBody`

修改服务器权限。

### bot.$modifyGuild(guildId, data)
- **guildId:** `string` 服务器 ID
- **data:** `GuildModify` 提交内容

修改服务器信息

### bot.$setGroupName(guildId, name)
- **guildId:** `string` 服务器 ID
- **name:** `string`

修改服务器名称。