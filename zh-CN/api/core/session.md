# 会话 (Session)

会话来源于 Koishi v1 的元信息对象，并在后续的版本中发展成了专门的类并大幅扩展了功能。目前的会话已经参与到了 Koishi 的绝大部分工作。

## 通用属性

对于会话事件，我们抽象出了一套通用的属性：

### session.app

- 类型: [`Context`](./context.md)

当前会话的根上下文。

### session.bot

- 类型: [`Bot`](./bot.md)

当前会话绑定的机器人实例。

### session.channel

- 类型: [`Channel`](../database/built-in.md#channel)
- 只能在中间件或指令内部使用

当前会话绑定的频道数据，是一个可观测对象。

::: warning
这个属性对应的是 Koishi 内置数据结构中的频道数据，而不是平台的频道数据。如果你需要访问平台频道数据，请使用 `session.event.channel`。
:::

### session.event

会话事件数据。包含了会话中全部可以序列化的资源。含有以下属性：

- **id:** `number` 事件 ID
- **type:** `string` 事件类型
- **platform:** `string` 接收者的平台名称
- **selfId:** `string` 接收者的平台账号
- **timestamp:** `number` 事件的时间戳
- **channel:** [`Channel`](../resources/channel.md) 事件所属的频道
- **guild:** [`Guild`](../resources/guild.md) 事件所属的群组
- **login:** [`Login`](../resources/login.md) 事件的登录信息
- **member:** [`GuildMember`](../resources/member.md) 事件的目标成员
- **message:** [`Message`](../resources/message.md) 事件的消息
- **operator:** [`User`](../resources/user.md) 事件的操作者
- **role:** [`GuildRole`](../resources/role.md) 事件的目标角色
- **user:** [`User`](../resources/user.md) 事件的目标用户

事件中的各属性遵循**资源提升**规则：资源对象的某个字段可以是另一个资源对象，例如消息对象中的 `user` 字段就是一个用户对象。当资源对象出现多级嵌套时，内层的资源将会被统一提升到最外层。例如，当接收到消息事件时，事件体中可以访问到 `message`, `member`, `user`, `channel` 等资源，但 `message` 中就不再存在 `member` 和 `user` 字段了。

要访问事件体内部的属性，可以使用下面介绍的 [访问器属性](#访问器属性)。

### session.user

- 类型: [`User`](../database/built-in.md#user)
- 只能在中间件或指令内部使用

当前会话绑定的用户数据，是一个可观测对象。

::: warning
这个属性对应的是 Koishi 内置数据结构中的用户数据，而不是平台的用户数据。如果你需要访问平台用户数据，请使用 `session.event.user`。
:::

## 访问器属性

对于部分常用的事件体属性，我们提供了访问器属性。

### session.author

- 类型: <code>[GuildMember](../resources/member.md) & [User](../resources/user.md)</code>
- 完整写法: `{ ...session.event.user, ...session.event.member }`

::: tip
注意到 `GuildMember` 和 `User` 有部分重叠的字段，例如 `name` 和 `avatar`。在这种情况下，`GuildMember` 的字段会覆盖 `User` 的字段。
:::

### session.channelId

- 类型: `string`
- 完整写法: `session.event.channel.id`

### session.channelName

- 类型: `string`
- 完整写法: `session.event.channel.name`

### session.content

- 类型: `string`
- 完整写法: `session.event.message.content`

### session.elements

- 类型: `Element[]`
- 完整写法: `session.event.message.elements`

### session.guildId

- 类型: `string`
- 完整写法: `session.event.guild.id`

### session.guildName

- 类型: `string`
- 完整写法: `session.event.guild.name`

### session.id

- 类型: `string`
- 完整写法: `session.event.id`

### session.isDirect

- 类型: `boolean`
- 完整写法: `session.event.channel.type === Channel.Type.DIRECT`

### session.messageId

- 类型: `string`
- 完整写法: `session.event.message.id`

### session.platform

- 类型: `string`
- 完整写法: `session.event.platform`

### session.quote

- 类型: `Message`
- 完整写法: `session.event.message.quote`

### session.selfId

- 类型: `string`
- 完整写法: `session.event.selfId`

### session.timestamp

- 类型: `string`
- 完整写法: `session.event.timestamp`

### session.type

- 类型: `string`
- 完整写法: `session.event.type`

### session.userId

- 类型: `string`
- 完整写法: `session.event.user.id`

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
