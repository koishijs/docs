# 事件系统

本节将从最简单的事件系统开始，介绍如何使用 Koishi 来接收和发送消息。

## 基本用法

让我们先从一个基本示例开始：

```ts
ctx.on('message', (session) => {
  if (session.content === '天王盖地虎') {
    session.send('宝塔镇河妖')
  }
})
```

上述代码片段实现了一个简单的功能：当任何用户发送「天王盖地虎」时，机器人将发送「宝塔镇河妖」。如你所见，`ctx.on()` 方法监听了一个事件。传入的第一个参数 `message` 是事件的名称 (收到消息)，而第二个参数则是事件被触发时的回调函数。

回调函数接受一个参数 `session`，通常称为会话对象。在这个例子中，我们通过它访问事件相关的数据 (使用 `session.content` 获取消息的内容)，并调用其上的 API 作为对此事件的响应 (使用 `session.send()` 在当前频道内发送消息)。

事件与会话构成了最基础的交互模型。这种模型不仅能够处理消息，还能够处理其他类型的事件。我们再给出两个例子：

```tsx
// 当有新成员入群时，发送：欢迎+@新成员+入群！
ctx.on('guild-member-added', (session) => {
  // session.userId 对应了入群者的平台账号
  // <at> 是一种消息元素，能够实现 @特定用户 的效果
  session.send(<>欢迎 <at id={session.userId}/> 入群！</>)
})
```

```ts
// 当有好友请求时，接受请求并发送欢迎消息
ctx.on('friend-request', async (session) => {
  // session.bot 是当前会话绑定的机器人实例
  await session.bot.handleFriendRequest(session.messageId, true)
  await session.bot.sendPrivateMessage(session.userId, '很高兴认识你！')
})
```

像这样由聊天平台推送的事件，我们称之为 **会话事件**。除此以外，Koishi 还有着其他类型的事件，例如由 Koishi 自身生成的 **生命周期事件**，又或者是由插件提供的 **自定义事件** 等等。这些事件的监听方式与会话事件基本一致，只不过它们的回调函数接受的参数不同。例如下面的代码实现了当 Bot 上线时自动给自己发送一条消息的功能：

```ts
// bot-status-updated 不是会话事件
// 所以回调函数接受的参数不是 session 而是 bot
ctx.on('bot-status-updated', (bot) => {
  if (bot.status === 'online') {
    // 这里的 userId 换成你的账号
    bot.sendPrivateMessage(userId, '我上线了~')
  }
})
```

在后续的章节中，我们也将介绍更多的事件和会话的使用方法。

## 监听事件

在上面的例子中，我们已经了解到事件系统的基本用法：使用 `ctx.on()` 注册监听器。它的写法与 Node.js 自带的 [EventEmitter](https://nodejs.org/api/events.html#events_class_eventemitter) 类似：第一个参数表示要监听的事件名称，第二个参数表示事件的回调函数。同时，我们也提供了类似的函数 `ctx.once()`，用于注册一个只触发一次的监听器；以及 `ctx.off()`，用于取消一个已注册的监听器。

这套事件系统与 EventEmitter 的一个不同点在于，无论是 `ctx.on()` 还是 `ctx.once()` 都会返回一个 dispose 函数，调用这个函数即可取消注册监听器。因此你其实不必使用 `ctx.once()` 和 `ctx.off()`。下面给一个只触发一次的监听器的例子：

```ts
declare module 'koishi' {
  interface Events {
    foo(...args: any[]): void
  }
}
// ---cut---
// 回调函数只会被触发一次
const dispose = ctx.on('foo', (...args) => {
  dispose()
  // do something
})
```

### 事件的命名

无论是会话事件，生命周期事件还是插件自定义的事件，Koishi 的事件名都遵循着一些既定的规范。遵守规范能够让开发者获得一致的体验，提高开发和调试的效率。它们包括：

- 总是使用 param-case 作为事件名
- 通过命名空间进行管理，使用 `/` 作为分隔符
- 配对使用 xxx 和 before-xxx 命名具有时序关系的事件

举个例子，koishi-plugin-dialogue 扩展了多达 20 个自定义事件。为了防止命名冲突，所有的事件都以 `dialogue/` 开头，并且在特定操作前触发的事件都包含了 `before-` 前缀，例如：

- dialogue/before-search: 获取搜索结果前触发
- dialogue/search: 获取完搜索结果后触发

### 前置事件

前面介绍了，Koishi 有不少监听器满足 before-xxx 的形式。对于这类监听器的注册，我们也提供了一个语法糖，那就是 `ctx.before('xxx', callback)`。这种写法也支持命名空间的情况：

```ts
// @errors: 2304
ctx.before('dialogue/search', callback)
// 相当于
ctx.on('dialogue/before-search', callback, true)
```

默认情况下，事件的多个回调函数的执行顺序取决于它们添加的顺序。先注册的回调函数会先被执行。如果你希望提高某个回调函数的优先级，可以给 `ctx.on()` 传入第三个参数 `prepend`，设置为 true 即表示添加到事件执行队列的开头而非结尾，相当于 [`emitter.prependListener()`](https://nodejs.org/api/events.html#emitterprependlistenereventname-listener)。

对于 `ctx.before()`，情况则正好相反。默认的行为的先注册的回调函数后执行，同时 `ctx.before()` 的第三个参数 `append` 则表示添加到事件执行队列的末尾而非开头。

## 触发事件

Koishi 的事件系统与 EventEmitter 的最大区别在于，触发一个事件可以有着多种形式，目前支持 4 个不同的方法，足以适应绝大多数需求。

- emit: 同时触发所有 event 事件的回调函数
- parallel: 上述方法对应的异步版本
- bail: 依次触发所有 event 事件的回调函数；当返回一个 `false`, `null`, `undefined` 以外的值时将这个值作为结果返回
- serial: 上述方法对应的异步版本

这些方法的基本用法也都与 EventEmitter 类似，第一个参数是事件名称，之后的参数对应回调函数的参数。下面是一个例子：

```ts
declare module 'koishi' {
  interface Events {
    'custom-event'(...args: any[]): void
  }
}

// ---cut---
// @errors: 2304
ctx.emit('custom-event', arg1, arg2, ...rest)
// 对应于
ctx.on('custom-event', (arg1, arg2, ...rest) => {})
```

### 过滤触发上下文

如果你的自定义事件与某个特定会话相关 (并不需要是会话事件)，你可以在触发事件的时候传入一个额外的一参数 `session`，以实现对触发上下文的过滤：

```ts
declare module 'koishi' {
  interface Events {
    'custom-event'(...args: any[]): void
  }
}

// ---cut---
// @errors: 2304
// 无法匹配该会话的上下文中注册的回调函数不会被执行 (可能有点绕)
ctx.emit(session, 'custom-event', arg1, arg2, ...rest)
```

过滤触发上下文的效果将在 [会话选择器](../plugin/selector.md) 一节中详细介绍。

更一般地，即使是不使用会话的事件也能主动选择触发的上下文，其语法完全一致：

```ts
const thisArg = { [Context.filter]: callback }
ctx.emit(thisArg, 'custom-event', arg1, arg2, ...rest)
```

触发事件时传入的一参数如果是对象，则会作为事件回调函数的 `this`。并且如果这个对象有 `Context.filter` 属性，那么这个属性将被用于过滤触发上下文。对应的值是一个函数，传入一个上下文对象，返回一个 boolean 表示是否应该在该上下文上触发该事件。而上面介绍的会话事件只是一种特殊情况而已。

<!-- ### 延时发送

如果你需要连续发送多条消息，那么在各条消息之间留下一定的时间间隔是很重要的：一方面它可以防止消息刷屏和消息错位（后发的条消息呈现在先发的消息前面），提高了阅读体验；另一方面它能够有效降低机器人发送消息的频率，防止被平台误封。这个时候，`session.sendQueued()` 可以解决你的问题。

```ts
// 发送两条消息，中间间隔一段时间，这个时间由系统计算决定
await session.sendQueued('message1')
await session.sendQueued('message2')

// 清空等待队列
await session.cancelQueued()
```

你也可以在发送时手动定义等待的时长：

```ts
import { Time } from 'koishi'

// 如果消息队列非空，在前一条消息发送完成后 1s 发送本消息
await session.sendQueued('message3', Time.second)

// 清空等待队列，并设定下一条消息发送距离现在至少 0.5s
await session.cancelQueued(0.5 * Time.second)
```

事实上，对于不同的消息长度，系统等待的时间也是不一样的，你可以通过配置项修改这个行为：

```yaml
delay:
  # 消息里每有一个字符就等待 0.02s
  character: 20
  # 每条消息至少等待 0.5s
  message: 500
```

这样一来，一段长度为 60 个字符的消息发送后，下一条消息发送前就需要等待 1.2 秒了。

### 等待用户输入

当你需要进行一些交互式操作时，可以使用 `session.prompt()`：

```ts
// @errors: 1108
await session.send('请输入用户名：')

const name = await session.prompt()
if (!name) return '输入超时。'

// 执行后续操作
await ctx.database.setUser(session.platform, session.userId, { name })
return `${name}，请多指教！`
```

你可以给这个方法传入一个 `timeout` 参数，或使用 `delay.prompt` 配置项，来作为等待的时间。

### 发送广播消息

有的时候你可能希望向多个频道同时发送消息，我们也专门设计了相关的接口。

```ts
// 使用当前机器人账户向多个频道发送消息
await session.bot.broadcast(['123456', '456789'], content)

// 如果你有多个账号，请使用 ctx.broadcast，并在频道编号前加上平台名称
await ctx.broadcast(['onebot:123456', 'discord:456789'], content)

// 或者直接将消息发给所有频道
await ctx.broadcast(content)
```

如果你希望广播消息的发送也有时间间隔的话，可以使用 `delay.broadcast` 配置项。

### 执行指令

我们还可以实用 `session.execute()` 来让用户执行某条指令：

```ts
// 当用户输入“查看帮助”时，执行 help 指令
ctx.middleware((session, next) => {
  if (session.content === '查看帮助') {
    return session.execute('help', next)
  } else {
    return next()
  }
})
``` -->
