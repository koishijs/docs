# Session

会话来源于 Koishi v1 的元信息对象，并在后续的版本中发展成了专门的类并大幅扩展了功能。目前的会话已经参与到了 Koishi 的绝大部分工作。

## 通用属性

对于会话事件，我们抽象出了一套通用的属性：

### session.type

- 类型: `string`

事件类型。它应当是 [通用会话事件](./events.md#通用会话事件) 中的某一个。

### session.platform

- 类型: `string`

触发事件的机器人所在的平台。

### session.selfId

- 类型: `string`

触发事件的机器人所在平台的编号。

### session.userId

- 类型: `string`

事件相关用户的平台编号 (例如发送好友申请的人，发送消息的人等)。

### session.guildId

- 类型: `string`

事件相关群组的平台编号 (如果不是群组相关事件则没有这一项)。

### session.channelId

- 类型: `string`

事件相关频道的平台编号 (如果不是频道相关事件则没有这一项)。

### session.messageId

- 类型: `string`

事件相关的消息编号 (例如在回复消息时需要用到)。

### session.elements

- 类型: `Element[]`

事件的消息元素内容 (例如消息的文本等)。

### session.content

- 类型: `string`

事件的文本内容 (例如消息的文本等)。

### session.isDirect

- 类型: `boolean`

事件是否在私聊环境中触发。

## Instance Properties

你应该已经读过 [事件 (Events)](./events.md) 一章了。由于每个会话都必定表达了一个上报事件，因此上报事件中定义的属性也都可以在 Session 的实例中访问到。此外，也只有来自上报事件的属性才会在序列化中被保留。下面将介绍的实例属性都是无法被序列化的。

### session.app

当前会话绑定的 [App](./app.md) 实例。

### session.bot

当前会话绑定的 [Bot](./bot.md) 实例。

### session.user

当前会话绑定的用户数据，是一个可观测 [User](../database/built-in.md#user) 对象。

::: tip
通常情况下，Session 对象只有在中间件内才有此属性。因此如果想使用此接口请考虑下列方式：

- 使用中间件
- 使用指令 (指令的执行处于中间件内部)
- 手动调用 [`session.observeUser()`](#session-observeuser)
- 手动调用 [`database.getUser()`](../database/built-in.md#database-getuser)

下面的两个属性也同理。
:::

### session.channel

当前会话绑定的频道数据，是一个可观测 [Channel](../database/built-in.md#channel) 对象。

### session.guild

当前会话绑定的群组数据，是一个可观测 [Channel](../database/built-in.md#channel) 对象。

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
