# 事件系统

在 [使用会话](../message/session.md) 一章中，我们介绍了如何使用接受会话事件，并埋下了一个伏笔。本章节就让我们来完整地认识一下 Koishi 的事件系统。

- 相关 API：[事件系统 (Lifecycle)](../../api/service/lifecycle.md)

## 监听事件

先让我们回顾一下之前介绍过的例子：

```ts
// 当有新成员入群时，发送：欢迎+@入群者+入群！
ctx.on('guild-member-added', (session) => {
  session.send('欢迎' + segment.at(session.userId) + '入群！')
})
```

要注册一个监听器，可以使用 `ctx.on()`，它的基本用法与 Node.js 自带的 [EventEmitter](https://nodejs.org/api/events.html#events_class_eventemitter) 类似：第一个参数表示要监听的事件名称，第二个参数表示事件的回调函数。同时，我们也提供了类似的函数 `ctx.once()`，用于注册一个只触发一次的监听器；以及 `ctx.off()`，用于取消一个已注册的监听器。

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

无论是通用会话事件，生命周期事件还是插件自定义的事件，Koishi 的事件名都遵循着一些既定的规范。遵守规范能够让开发者获得一致的体验，提高开发和调试的效率。它们包括：

- 总是使用 param-case 作为事件名
- 对于相关的大量事件，推荐通过命名空间进行管理，使用 `/` 作为分隔符
- 配对使用 xxx 和 before-xxx 命名具有时序关系的事件

举个例子，koishi-plugin-dialogue 扩展了多达 20 个自定义事件。为了防止命名冲突，所有的事件都以 `dialogue/` 开头，并且在特定操作前触发的事件都包含了 `before-` 前缀，例如：

- dialogue/before-search: 获取搜索结果前触发
- dialogue/search: 获取完搜索结果后触发

### 前置事件与执行次序

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

Koishi 的事件系统与 EventEmitter 的最大区别在于，触发一个事件可以有着多种形式，目前支持 6 个不同的方法，足以适应绝大多数需求。

- emit: 同时触发所有 event 事件的回调函数
- parallel: 上述方法对应的异步版本
- bail: 依次触发所有 event 事件的回调函数；当返回一个 `false`, `null`, `undefined` 以外的值时将这个值作为结果返回
- serial: 上述方法对应的异步版本
- chain: 依次触发所有 event 事件的回调函数；每次用得到的返回值覆盖下一轮调用的第一个参数，并在所有函数执行完后返回最终结果
- waterfall: 上述方法对应的异步版本

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

### 支持会话选择器

在 [会话选择器](./context.md) 一节中，我们已经了解到选择器可以会对会话事件进行过滤。如何让自定义事件也支持会话选择器呢？只需在触发事件的时候传入一个额外的一参数 `session` 即可：

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

而这也是这类事件被称为 **会话事件** 的原因。

### 过滤触发上下文

其实过滤这个概念本身就是相互的：一个上下文能通过选择器过滤某些会话事件，反过来说也就是这个事件过滤了能够触发的上下文。因此，不只是会话事件，我们还能让不使用会话的事件也能主动选择触发的上下文，其语法完全一致：

```ts
const thisArg = { [Context.filter]: callback }
ctx.emit(thisArg, 'custom-event', arg1, arg2, ...rest)
```

触发事件时传入的一参数如果是对象，则会作为事件回调函数的 `this`。并且如果这个对象有 `Context.filter` 属性，那么这个属性将被用于过滤触发上下文。对应的值是一个函数，传入一个上下文对象，返回一个 boolean 表示是否应该在该上下文上触发该事件。而上面介绍的会话事件只是一种特殊情况而已。
