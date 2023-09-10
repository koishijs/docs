# Bot

::: tip
参见：[开发 > 跨平台 > 实现机器人](../../guide/adapter/bot.md)
:::

**机器人 (Bot)** 是适配器的核心，它将不同平台的 API 封装成统一的格式供 Koishi 使用。而不同的适配器也可以自行扩展 Bot 实例上的属性和方法。

标有 <badge>内置</badge> 的 API 已经由 Koishi 提供，适配器可以覆盖对应的方法，但是无需自行实现。

## Instance Properties

### bot.config <badge>built-in</badge>

- Type: `object`

构造 `Bot` 实例时所使用的配置项。

### bot.ctx <badge>built-in</badge>

- Type: [`Context`](./context.md)

当前 `Bot` 所在的 [Context](./context.md) 实例。

### bot.adapter <badge>built-in</badge>

- Type: [`Adchapter`](./adapter.md)

当前 `Bot` 所在的 [Adapter](./adapter.md) 实例。

### bot.status <badge>built-in</badge>

- 可选值: online, offline, connect, disconnect, reconnect

当前 `Bot` 的运行状态。

### bot.platform

- Type: `string`

当前 `Bot` 的 [平台名称](../glossary.md#平台-platform)。

### bot.avatar

- Type: `string`

当前 `Bot` 的头像。

### bot.username

- Type: `string`

当前 `Bot` 的用户名。

### bot.userId

- Type: `string`

当前 `Bot` 的平台账号。

## Adapter Related

### bot.dispatch(session) <badge>built-in</badge>

- **session:** [`Session`](./session.md) Session instance

Dispatch a session event.

### bot.session(data) <badge>built-in</badge>

- **data:** [`Partial<Session>`](./session.md) Session data
- Return value: [`Session`](./session.md) Session instance

Create a new session instance.

### bot.online() <badge>内置</badge>

修改机器人的状态为 `online`。

### bot.offline(error?) <badge>内置</badge>

- **error:** `Error` 错误信息

修改机器人的状态为 `offline`，并记录错误信息。
