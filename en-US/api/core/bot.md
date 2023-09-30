# Bot

::: tip
参见：[开发 > 跨平台 > 实现机器人](../../guide/adapter/bot.md)
:::

**机器人 (Bot)** 是适配器的核心，它将不同平台的 API 封装成统一的格式供 Koishi 使用。而不同的适配器也可以自行扩展 Bot 实例上的属性和方法。

标有 <badge>内置</badge> 的 API 已经由 Koishi 提供，适配器可以覆盖对应的方法，但是无需自行实现。

## Instance Properties

### bot.adapter <badge>built-in</badge>

- Type: [`Adchapter`](./adapter.md)

当前 `Bot` 所在的 [Adapter](./adapter.md) 实例。

### bot.config <badge>built-in</badge>

- Type: `object`

构造 `Bot` 实例时所使用的配置项。

### bot.ctx <badge>built-in</badge>

- Type: [`Context`](./context.md)

当前 `Bot` 所在的 [Context](./context.md) 实例。

### bot.internal

- 类型: `object`

当前机器人的 [内部接口](../../guide/adapter/bot.md#实现内部接口)。

### bot.platform

- Type: `string`

当前 `Bot` 的 [平台名称](../glossary.md#平台-platform)。

### bot.selfId

- Type: `string`

当前 `Bot` 的平台账号。

### bot.status <badge>built-in</badge>

- 类型: [`Status`](../resources/login.md)

当前 `Bot` 的登录状态。

### bot.user

- 类型: [`User`](../resources/user.md)

当前 `Bot` 的用户信息。

## Adapter Related

### bot.dispatch(session) <badge>built-in</badge>

- **session:** [`Session`](./session.md) Session instance

Dispatch a session event.

### bot.session(data) <badge>built-in</badge>

- **data:** [`Partial<Session>`](./session.md) Session data
- Return value: [`Session`](./session.md) Session instance

Create a new session instance.

### bot.online() <badge>内置</badge>

修改机器人的状态为在线。

### bot.offline(error?) <badge>内置</badge>

- **error:** `Error` 错误信息

修改机器人的状态为离线，并记录错误信息。

## 通用 API

通用 API 由适配器实现。它们会在相应的资源页面中介绍。

- [`bot.broadcast()`](../resources/message.md#bot-broadcast)
- [`bot.clearReaction()`](../resources/reaction.md#bot-clearreaction)
- [`bot.createGuildRole()`](../resources/role.md#bot-createguildrole)
- [`bot.createReaction()`](../resources/reaction.md#bot-createreaction)
- [`bot.deleteGuildRole()`](../resources/role.md#bot-deleteguildrole)
- [`bot.deleteReaction()`](../resources/reaction.md#bot-deletereaction)
- [`bot.deleteMessage()`](../resources/message.md#bot-deletemessage)
- [`bot.editMessage()`](../resources/message.md#bot-editmessage)
- [`bot.getChannel()`](../resources/channel.md#bot-getchannel)
- [`bot.getChannelIter()`](../resources/channel.md#bot-getchanneliter)
- [`bot.getChannelList()`](../resources/channel.md#bot-getchannellist)
- [`bot.getFriendIter()`](../resources/user.md#bot-getfrienditer)
- [`bot.getFriendList()`](../resources/user.md#bot-getfriendlist)
- [`bot.getGuild()`](../resources/guild.md#bot-getguild)
- [`bot.getGuildIter()`](../resources/guild.md#bot-getguilditer)
- [`bot.getGuildList()`](../resources/guild.md#bot-getguildlist)
- [`bot.getGuildMember()`](../resources/member.md#bot-getguildmember)
- [`bot.getGuildMemberIter()`](../resources/member.md#bot-getguildmemberiter)
- [`bot.getGuildMemberList()`](../resources/member.md#bot-getguildmemberlist)
- [`bot.getGuildRoleIter()`](../resources/role.md#bot-getguildroleiter)
- [`bot.getGuildRoleList()`](../resources/role.md#bot-getguildrolelist)
- [`bot.getLogin()`](../resources/login.md#bot-getlogin)
- [`bot.getMessage()`](../resources/message.md#bot-getmessage)
- [`bot.getMessageIter()`](../resources/message.md#bot-getmessageiter)
- [`bot.getMessageList()`](../resources/message.md#bot-getmessagelist)
- [`bot.getReactionIter()`](../resources/reaction.md#bot-getreactioniter)
- [`bot.getReactionList()`](../resources/reaction.md#bot-getreactionlist)
- [`bot.getUser()`](../resources/user.md#bot-getuser)
- [`bot.handleFriendRequest()`](../resources/user.md#bot-handlefriendrequest)
- [`bot.handleGuildMemberRequest()`](../resources/member.md#bot-handleguildmemberrequest)
- [`bot.handleGuildRequest()`](../resources/guild.md#bot-handleguildrequest)
- [`bot.kickGuildMember()`](../resources/member.md#bot-kickguildmember)
- [`bot.muteGuildMember()`](../resources/member.md#bot-muteguildmember)
- [`bot.sendMessage()`](../resources/message.md#bot-sendmessage)
- [`bot.sendPrivateMessage()`](../resources/message.md#bot-sendprivatemessage)
- [`bot.setGuildMemberRole()`](../resources/role.md#bot-setguildmemberrole)
- [`bot.unsetGuildMemberRole()`](../resources/role.md#bot-unsetguildmemberrole)
- [`bot.updateGuildRole()`](../resources/role.md#bot-updateguildrole)
