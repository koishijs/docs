# 机器人 (Bot)

::: tip
参见：[开发 > 跨平台 > 实现机器人](../../guide/adapter/bot.md)
:::

**机器人 (Bot)** 是适配器的核心，它将不同平台的 API 封装成统一的格式供 Koishi 使用。而不同的适配器也可以自行扩展 Bot 实例上的属性和方法。

标有 <badge>内置</badge> 的 API 已经由 Koishi 提供，适配器可以覆盖对应的方法，但是无需自行实现。

## 实例属性

### bot.config <badge>内置</badge>

- 类型: `object`

构造 `Bot` 实例时所使用的配置项。

### bot.ctx <badge>内置</badge>

- 类型: [`Context`](./context.md)

当前 `Bot` 所在的 [Context](./context.md) 实例。

### bot.adapter <badge>内置</badge>

- 类型: [`Adapter`](./adapter.md)

当前 `Bot` 所在的 [Adapter](./adapter.md) 实例。

### bot.status <badge>内置</badge>

- 可选值: online, offline, connect, disconnect, reconnect

当前 `Bot` 的运行状态。

### bot.platform

- 类型: `string`

当前 `Bot` 的 [平台名称](../glossary.md#平台-platform)。

### bot.avatar

- 类型: `string`

当前 `Bot` 的头像。

### bot.username

- 类型: `string`

当前 `Bot` 的用户名。

### bot.userId

- 类型: `string`

当前 `Bot` 的平台账号。

## 适配器相关

### bot.dispatch(session) <badge>内置</badge>

- **session:** [`Session`](./session.md) 会话实例

触发一个会话事件。

### bot.session(data) <badge>内置</badge>

- **data:** [`Partial<Session>`](./session.md) 会话数据
- 返回值: [`Session`](./session.md) 会话实例

创建一个新的会话实例。

### bot.online() <badge>内置</badge>

修改机器人的状态为 `online`。

### bot.offline(error?) <badge>内置</badge>

- **error:** `Error` 错误信息

修改机器人的状态为 `offline`，并记录错误信息。
