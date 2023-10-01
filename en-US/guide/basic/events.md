# Event

在上一节中我们了解了指令开发，现在让我们回到更加基础的事件系统。事件系统在 Koishi 中扮演着底层的角色，它不仅包含由聊天平台触发的会话事件，还包含了监听运行状态的生命周期事件和提供扩展性的自定义事件。

## 基本用法

让我们先从一个基本示例开始：

```ts
ctx.on('message', (session) => {
  if (session.content === '天王盖地虎') {
    session.send('宝塔镇河妖')
  }
})
```

上述代码片段实现了一个简单的功能：当任何用户发送「天王盖地虎」时，机器人将发送「宝塔镇河妖」。如你所见，`ctx.on()` 方法监听了一个事件。传入的第一个参数 `message` 是事件的名称，而第二个参数则是事件的回调函数。每一次 `message` 事件被触发 (即收到消息) 时都会调用该函数。

回调函数接受一个参数 `session`，称为**会话对象**。在这个例子中，我们通过它访问事件相关的数据 (使用 `session.content` 获取消息的内容)，并调用其上的 API 作为对此事件的响应 (使用 `session.send()` 在当前频道内发送消息)。

事件与会话构成了最基础的交互模型。这种模型不仅能够处理消息，还能够处理其他类型的事件。我们再给出一个例子：

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
  if (bot.status === Status.ONLINE) {
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

如果你开发的插件希望允许其他插件扩展，那么触发事件就是最简单的方式。

触发事件的基本用法也都与 EventEmitter 类似，第一个参数是事件名称，之后的参数对应回调函数的参数。下面是一个例子：

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

### 触发方式

Koishi 的事件系统与 EventEmitter 的另一个区别在于，触发一个事件可以有着多种形式，目前支持 4 个不同的方法，足以适应绝大多数需求。

- emit: 同时触发所有 event 事件的回调函数
- parallel: 上述方法对应的异步版本
- bail: 依次触发所有 event 事件的回调函数；当返回一个 `false`, `null`, `undefined` 以外的值时将这个值作为结果返回
- serial: 上述方法对应的异步版本

此外，你还将在下一节学习 [中间件](./middleware.md)，它提供了一种更加强大的消息事件处理流程。

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

过滤触发上下文的效果将在 [过滤器](../plugin/filter.md) 一节中详细介绍。

更一般地，即使是不使用会话的事件也能主动选择触发的上下文，其语法完全一致：

```ts
const thisArg = { [Context.filter]: callback }
ctx.emit(thisArg, 'custom-event', arg1, arg2, ...rest)
```

触发事件时传入的一参数如果是对象，则会作为事件回调函数的 `this`。并且如果这个对象有 `Context.filter` 属性，那么这个属性将被用于过滤触发上下文。对应的值是一个函数，传入一个上下文对象，返回一个 boolean 表示是否应该在该上下文上触发该事件。而上面介绍的会话事件只是一种特殊情况而已。

## 自定义事件

在本节的最后，我们来聊聊插件扩展的事件系统。

如果你是插件的开发者，想要自定义一些事件，那么只需要在你的插件中添加下面的代码：

```ts{5}
declare module 'koishi' {
  interface Events {
    // 方法名称对应自定义事件的名称
    // 方法签名对应事件的回调函数签名
    'kook/message-btn-click'(...args: any[]): void
  }
}
```

如果你监听的事件由其他插件扩展而来，那么你同样需要通过一行额外的代码来导入相应的类型：

```ts{4}
// 从 @koishijs/plugin-adapter-kook 导入事件类型
// 这里的 import {} from 会在编译时被删除，不会影响运行时的行为
// 请不要写成 import '@koishijs/plugin-adapter-kook'
import {} from '@koishijs/plugin-adapter-kook'

// 如果没有上面的类型导入，下面的代码会报错
ctx.on('kook/message-btn-click', callback)
```
