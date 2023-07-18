# 机器人 (Bot)

**机器人 (Bot)** 是适配器的核心，它将不同平台的 API 封装成统一的格式供 Koishi 使用。而不同的适配器也可以自行扩展 Bot 实例上的属性和方法。

标有 <badge text="内置"/> 的 API 已经由 @koishijs/core 提供，适配器可以覆盖对应的方法，但是无需自行实现。

## 构造函数选项

不同的适配器可能对应了不同的 Bot 配置项，但是有一些配置项是公用的：

### options.protocol

- 类型: `string`

部分适配器可能提供了多种协议实现，此时你可能需要指定一个协议。

### options.platform

- 类型: `string`

要使用的用户数据字段名称。默认情况下你可以使用适配器名作为字段访问到你的账号，但是对于同一个适配器连接多个服务器的情况，你可能需要对各自账户做出区分。配置不同的 platform 可以确保不会出现串数据的情况。

## 实例属性

### bot.config

- 类型: `object`

构造 Bot 实例时所使用的配置项。

### bot.ctx

- 类型: [`Context`](./context.md)

当前 Bot 所在的 [Context](./context.md) 实例。

### bot.adapter

- 类型: [`Adapter`](./adapter.md)

当前 Bot 所在的 [Adapter](./adapter.md) 实例。

### bot.platform

- 类型: `string`

当前 Bot 的平台名称，会受到 [options.platform](#options-platform) 影响。

### bot.username

- 类型: `string`

当前 Bot 的用户名。

### bot.selfId

- 类型: `string`

当前 Bot 的平台账号。

### bot.sid

- 类型: `string`

当前 Bot 的唯一标识符。

### bot.status

- 可选值: online, offline, connect, disconnect, reconnect

当前 Bot 的运行状态。

## 消息相关

### bot.sendMessage(channelId, content, guildId?)

- **channelId:** `string` 频道 ID
- **content:** `Fragment` 要发送的内容
- **guildId:** `string` 群组 ID
- 返回值: `Promise<string[]>` 发送的消息 ID

向特定频道发送消息。

::: warning
只要你能够获取到会话对象，你就不应使用此 API，而应该使用 `session.send()`。一些平台会将主动发送的消息同被动接收后回复的消息区分开来，甚至可能限制主动消息的发送，因此使用 `session.send()` 总是有更好的可靠性。
:::

::: tip
`bot.sendMessage()` 既可以发送群聊消息，也可以发送私聊消息。当发送私聊消息时，其与 `bot.sendPrivateMessage()` 的区别在于前者传入的是频道 ID，而后者传入的是用户 ID。
:::

### bot.sendPrivateMessage(userId, content)

- **userId:** `string` 对方 ID
- **content:** `Fragment` 要发送的内容
- 返回值: `Promise<string[]>` 发送的消息 ID

向特定用户发送私聊消息。

### bot.getMessage(channelId, messageId)

- **channelId:** `string` 频道 ID
- **messageId:** `string` 消息 ID
- 返回值: `Promise<MessageInfo>`

获取特定消息。

```ts
type AuthorInfo = any

// ---cut---
export interface MessageInfo {
  messageId: string
  isDirect: boolean
  content: string
  timestamp: number
  author: AuthorInfo
}
```

### bot.deleteMessage(channelId, messageId)

- **channelId:** `string` 频道 ID
- **messageId:** `string` 消息 ID
- 返回值: `Promise<void>`

撤回特定消息。

### bot.editMessage(channelId, messageId, content)

- **channelId:** `string` 频道 ID
- **messageId:** `string` 消息 ID
- **content:** `Fragment` 要发送的内容
- 返回值: `Promise<void>`

修改特定消息。

### bot.broadcast(channels, content, delay?) <Badge text="内置"/>

- **channels:** `string[]` 频道列表
- **content:** `string` 要发送的内容
- **delay:** `number` 发送消息间的延迟，默认值为 [`app.config.delay.broadcast`](./app.md#options-delay)
- 返回值: `Promise<string[]>` 成功发送的消息 ID 列表

向多个频道广播消息。如有失败不会抛出错误。

## 表态相关

### bot.createReaction(channelId, messageId, emoji) <Badge text="实验性" type="warning"/>

- **channelId:** `string` 频道 ID
- **messageId:** `string` 消息 ID
- **emoji:** `string` 表态名称
- 返回值: `Promise<void>`

向特定消息添加表态。

### bot.deleteReaction(channelId, messageId, emoji, userId?) <Badge text="实验性" type="warning"/>

- **channelId:** `string` 频道 ID
- **messageId:** `string` 消息 ID
- **emoji:** `string` 表态名称
- **userId:** `string` 用户 ID
- 返回值: `Promise<void>`

从特定消息删除某个用户添加的特定表态。如果没有传入用户 ID 则表示删除自己的表态。

### bot.clearReaction(channelId, messageId, emoji?) <Badge text="实验性" type="warning"/>

- **channelId:** `string` 频道 ID
- **messageId:** `string` 消息 ID
- **emoji:** `string` 表态名称
- 返回值: `Promise<void>`

从特定消息清除某个特定表态。如果没有传入表态名称则表示清除所有表态。

### bot.getReactions(channelId, messageId, emoji) <Badge text="实验性" type="warning"/>

- **channelId:** `string` 频道 ID
- **messageId:** `string` 消息 ID
- **emoji:** `string` 表态名称
- 返回值: `Promise<User[]>`

获取添加特定消息的特定表态的用户列表。

## 获取数据

### bot.getSelf()

- 返回值: `Promise<UserInfo>` 用户信息

获取机器人自己的信息。

```ts
export interface UserInfo {
  userId: string
  username: string
  avatar?: string
}
```

### bot.getUser(userId)

- **userId:** `string` 用户 ID
- 返回值: `Promise<UserInfo>` 用户信息

获取用户信息。

### bot.getFriendList()

- 返回值: `Promise<UserInfo[]>` 好友列表

获取机器人的好友列表。

### bot.getGuild(guildId)

- **guildId:** `string` 群组 ID
- 返回值: `Promise<GuildInfo>` 群组信息

获取群组信息。

```ts
export interface GuildInfo {
  guildId: string
  guildName: string
}
```

### bot.getGuildList()

- 返回值: `Promise<GuildInfo[]>` 群组列表

获取机器人加入的群组列表。

### bot.getGuildMember(guildId, userId)

- **guildId:** `string` 群组 ID
- **userId:** `string` 用户 ID
- 返回值: `Promise<GuildMemberInfo>` 群成员信息

获取群成员信息。

```ts no-extra-header
export interface UserInfo {
  userId: string
  username: string
  avatar?: string
}

// ---cut---
export interface GuildMemberInfo extends UserInfo {
  nickname: string
}
```

### bot.getGuildMemberList(guildId)

- **guildId:** `string` 群组 ID
- 返回值: `Promise<GuildMemberInfo[]>` 群成员列表

获取群成员列表。

### bot.getGuildMemberMap(guildId) <Badge text="内置"/>

- **guildId:** `string` 群组 ID
- 返回值: `Promise<Record<string, string>>` 群成员昵称的键值对

获取群成员列表，返回一个用户 ID 到昵称的键值对，若无 nickname 则使用 username。

### bot.getChannel(channelId)

- **channelId:** `string` 频道 ID
- 返回值: `Promise<ChannelInfo>` 频道信息

获取频道信息。

```ts
export interface ChannelInfo {
  channelId: string
  channelName: string
}
```

### bot.getChannelList(guildId)

- **guildId:** `string` 群组 ID
- 返回值: `Promise<ChannelInfo[]>` 频道列表

获取某个群组的频道列表。

## 群组管理

### bot.kickGuildMember(guildId, userId, permanent?)

- **guildId:** `string` 群组 ID
- **userId:** `string` 用户 ID
- **permanent:** `boolean` 是否永久踢出 (用户无法再次加入群组)
- 返回值: `Promise<void>`

将某个用户踢出群组。

### bot.muteGuildMember(guildId, userId, duration?, reason?)

- **guildId:** `string` 群组 ID
- **userId:** `string` 用户 ID
- **duration:** `number` 禁言时长 (毫秒)
- **reason:** `string` 禁言说明
- 返回值: `Promise<void>`

将某个用户禁言。如果传入的禁言时长为 `0` 则表示解除禁言。

### bot.setGuildMemberRole(guildId, userId, roleId) <Badge text="实验性" type="warning"/>

- **guildId:** `string` 群组 ID
- **userId:** `string` 用户 ID
- **roleId:** `string` 角色 ID
- 返回值: `Promise<void>`

设置群组内用户的角色。

### bot.unsetGuildMemberRole(guildId, userId, roleId) <Badge text="实验性" type="warning"/>

- **guildId:** `string` 群组 ID
- **userId:** `string` 用户 ID
- **roleId:** `string` 角色 ID
- 返回值: `Promise<void>`

取消群组内用户的角色。

### bot.getGuildRoles(guildId) <Badge text="实验性" type="warning"/>

- **guildId:** `string` 群组 ID
- 返回值: `Promise<Role[]>` 角色列表

获取群组角色列表。

### bot.createGuildRole(guildId, data) <Badge text="实验性" type="warning"/>

- **guildId:** `string` 群组 ID
- **data:** `Partial<Role>` 角色信息
- 返回值: `Promise<string>` 角色 ID

创建群组角色。

### bot.modifyGuildRole(guildId, roleId, data) <Badge text="实验性" type="warning"/>

- **guildId:** `string` 群组 ID
- **roleId:** `string` 角色 ID
- **data:** `Partial<Role>` 角色信息
- 返回值: `Promise<void>`

修改群组角色。

### bot.deleteGuildRole(guildId, roleId) <Badge text="实验性" type="warning"/>

- **guildId:** `string` 群组 ID
- **roleId:** `string` 角色 ID
- 返回值: `Promise<void>`

删除群组角色。

## 处理请求

### bot.handleFriendRequest(messageId, approve, comment?)

- **messageId:** `string` 请求 ID
- **approve:** `boolean` 是否通过请求
- **comment:** `string` 备注信息
- 返回值: `Promise<void>`

处理好友请求。

### bot.handleGuildRequest(messageId, approve, comment?)

- **messageId:** `string` 请求 ID
- **approve:** `boolean` 是否通过请求
- **comment:** `string` 备注信息
- 返回值: `Promise<void>`

处理来自群组的邀请。

### bot.handleGuildMemberRequest(messageId, approve, comment?)

- **messageId:** `string` 请求 ID
- **approve:** `boolean` 是否通过请求
- **comment:** `string` 备注信息
- 返回值: `Promise<void>`

处理加群请求。
