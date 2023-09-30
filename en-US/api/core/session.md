# Session

会话来源于 Koishi v1 的元信息对象，并在后续的版本中发展成了专门的类并大幅扩展了功能。目前的会话已经参与到了 Koishi 的绝大部分工作。

## 通用属性

对于会话事件，我们抽象出了一套通用的属性：

### session.body

- 类型: `Event`

会话事件对象。

### session.app

当前会话绑定的 [App](./app.md) 实例。

### session.bot

当前会话绑定的 [Bot](./bot.md) 实例。

### session.user

当前会话绑定的用户数据，是一个可观测 [User](../database/built-in.md#user) 对象。

::: tip
通常情况下，Session 对象只有在中间件内才有此属性。因此如果想使用此接口请考虑下列方式：

- 使用中间件或指令 (指令的执行处于中间件内部)
- 手动调用 [`session.observeUser()`](#session-observeuser)
- 手动调用 [`database.getUser()`](../database/built-in.md#database-getuser)

下面的两个属性也同理。
:::

### session.channel

当前会话绑定的频道数据，是一个可观测 [Channel](../database/built-in.md#channel) 对象。

### session.guild

当前会话绑定的群组数据，是一个可观测 [Channel](../database/built-in.md#channel) 对象。

## 简写形式

对于部分常用的属性，我们提供了简写形式。

### session.author

- 类型: `GuildMember & User`
- 完整写法: `{ ...session.body.user, ...session.body.member }`

### session.channelId

- 类型: `string`
- 完整写法: `session.body.channel.id`

### session.channelName

- 类型: `string`
- 完整写法: `session.body.channel.name`

### session.content

- 类型: `string`
- 完整写法: `session.body.message.content`

### session.elements

- 类型: `Element[]`
- 完整写法: `session.body.message.elements`

### session.guildId

- 类型: `string`
- 完整写法: `session.body.guild.id`

### session.guildName

- 类型: `string`
- 完整写法: `session.body.guild.name`

### session.isDirect

- 类型: `boolean`
- 完整写法: `session.body.channel.type === Channel.Type.DIRECT`

### session.messageId

- 类型: `string`
- 完整写法: `session.body.message.id`

### session.platform

- 类型: `string`
- 完整写法: `session.body.platform`

### session.quote

- 类型: `Message`
- 完整写法: `session.body.message.quote`

### session.selfId

- 类型: `string`
- 完整写法: `session.body.selfId`

### session.type

- 类型: `string`
- 完整写法: `session.body.type`

### session.userId

- 类型: `string`
- 完整写法: `session.body.user.id`

## 实例方法

### session.observeUser(fields?)

观测特定的用户字段，并更新到 [`session.user`](#session-user) 中。

- **fields:** `Iterable<User.Field>`
- 返回值: `Promise<User.Observed>`

### session.observeChannel(fields?)

观测特定的用户字段，并更新到 [`session.channel`](#session-channel) 中。

- **fields:** `Iterable<Channel.Field>`
- 返回值: `Promise<Channel.Observed>`

### session.send(message)

- **message:** `string` 要发送的内容
- 返回值: `Promise<void>`

在当前上下文发送消息。

### session.sendQueued(message, delay?)

- **message:** `string` 要发送的内容
- **delay:** `number` 与下一条消息的时间间隔，缺省时会使用 [`app.config.delay.queue`](./app.md#options-delay)
- 返回值: `Promise<void>`

在当前上下文发送消息，并与下一条通过 `session.sendQueued` 发送的消息之间保持一定的时间间隔。

### session.cancelQueued(delay?)

- **delay:** `number` 与下一条消息的时间间隔，默认值为 `0`
- 返回值: `Promise<void>`

取消当前正在等待发送的消息队列，并重置与下一条通过 `session.sendQueued` 发送的消息之间的时间间隔。

### session.prompt(timeout?)

- **timeout:** `number` 中间件的生效时间，缺省时会使用 [`app.config.delay.prompt`](./app.md#options-delay)
- 返回值: `Promise<string>` 用户输入

等待当前会话的下一次输入并返回，如果超时则会返回 `null`。无论用户输入什么，超时前的下一次输入都不会进入中间件处理流程。

### session.prompt(callback, options?)

- **callback:** `(session: Session) => Awaitable<T>`
- **options.timeout:** 中间件的生效时间，缺省时会使用 [`app.config.delay.prompt`](./app.md#options-delay)
- 返回值: `Promise<T>` 回调函数返回的结果

处理当前会话的下一次输入，如果超时则会返回 `null`。如果回调函数返回值非空，则下一次输入不会进入中间件处理流程。

### session.suggest(options)

- **options.actual:** `string?` 目标字符串
- **options.expect:** `string[]` 候选项列表
- **options.prefix:** `string?` 显示在候选输入前的文本
- **options.suffix:** `string` 当只有一个选项时，显示在候选输入后的文本
- 返回值: `Promise<string>`

向用户展示候选项并等待输入。

### session.execute(argv, next?)

- **argv:** `string | Argv` 指令文本或运行时参数对象
- **next:** [`Next`](../../guide/basic/middleware.md#注册和取消中间件) 回调函数
- 返回值: `Promise<void>`

执行一个指令。可以传入一个 argv 对象或者指令对应的文本。
