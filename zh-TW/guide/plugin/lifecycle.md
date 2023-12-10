# 生命週期

在 [事件系统](../basic/events.md) 中，我们已经了解了由聊天平台推送的会话事件。除此以外，Koishi 也提供了一些生命周期事件。这些事件会在某些 Koishi 的运行阶段被触发，你可以通过监听它们来实现各种各样的功能。本节主要介绍与插件开发相关的一些核心事件。

要了解 Koishi 所提供的全部事件，可以参考 [事件列表](../../api/core/events.md)。

## 异步加载与 `ready` 事件

`ready` 事件在应用启动时触发。如果一个插件在加载时，应用已经处于启动状态，则会立即触发。在下面的场景建议将逻辑放入 `ready` 事件：

- 含有异步操作 (比如文件操作，网络请求等)
- 希望等待其他插件加载完成后才执行的操作

## 副作用与 `dispose` 事件

### 停用插件

之前我们已经了解了插件的启用，而 Koishi 同样支持在运行时停用一个插件。`ctx.plugin()` 返回一个 `Fork` 对象。调用 `fork.dispose()` 可以停用一个插件。

```ts
import { Context } from 'koishi'

function callback(ctx: Context) {
  // 编写你的插件逻辑
  ctx.on('message', callback1)
  ctx.command('foo').action(callback2)
  ctx.middleware(callback3)
  ctx.plugin(require('another-plugin'))
}

// 加载插件
const fork = ctx.plugin(callback)

// 停用这个插件，取消上述全部副作用
fork.dispose()
```

对于可重用的插件，`fork.dispose()` 也只会停用 `fork` 对应的那一次。如果你想取消全部的副作用，可以使用 `ctx.registry.delete()`：

```ts
// 移除可重用插件的全部副作用
ctx.registry.delete(plugin)
```

### 清除副作用

Koishi 的插件系统支持热重载，即任何一个插件可能在运行时被多次加载和卸载。要实现这一点，我们就必须在插件被卸载时清除它的所有副作用。

绝大部分 `ctx` 方法都会在在插件被停用自动回收副作用；然而，如果你使用了 `ctx` 之外的方法，你的代码还可能通过其他方式引入副作用，这时就需要通过 `dispose` 事件来手动清除它们。下面是一个例子：

```ts
// 一个示例的服务器插件
import { Context } from 'koishi'
import { createServer } from 'http'

export function apply(ctx: Context, config) {
  const server = createServer()

  ctx.on('ready', () => {
    // 在插件启动时监听端口
    server.listen(1234)
  })

  ctx.on('dispose', () => {
    // 在插件停用时关闭端口
    server.close()
  })
}
```

## 可重用性与 `fork` 事件

### 可重用插件

到此为止，我们所介绍的插件开发都限定在插件只能同时启用一份的情况。如果你想要在同一个应用中同时启用多份插件，会发生什么呢？

```ts
function callback() {
  console.log('called')
}

ctx.plugin(callback)
ctx.plugin(callback)
```

执行上面的代码，你会发现 `called` 只会被打印一次。这是因为 `ctx.plugin()` 会检测插件是否已经被加载：如果是，则会直接返回之前的 `Fork` 对象，而不会再次执行插件的逻辑。

采用这种设计的主要原因是，插件往往会占用某些资源，因此重复启用会导致预期之外的问题。例如，一个插件注册了某个指令，如果重复启用，那么这个指令也会被重复注册。而当用户调用这个指令时，究竟要执行哪个指令的逻辑呢？这显然是不合理的。

不过也不能因此就认为所有插件都不应该被重用。如果你真的有这样的需求，Koishi 也提供了方法——只需声明插件的 `reusable` 属性为 `true` 即可。参考下面的例子：

```ts title=reply.ts
export const name = 'reply'
export const reusable = true    // 声明此插件可重用

export interface Config {
  input: string
  output: string
}

export function apply(ctx: Context, config: Config) {
  ctx.middleware((session, next) => {
    // 当用户发送 input 时，回复 output
    if (session.content === config.input) {
      return config.output
    }
    return next()
  })
}
```

然后我们可以多次调用此插件了：

```ts
import * as reply from './reply'

ctx.plugin(reply, { input: '天王盖地虎', output: '宝塔镇河妖' })
ctx.plugin(reply, { input: '宫廷玉液酒', output: '一百八一杯' })
```

如果你在开发类形式的插件，那么可以在类的静态属性中声明 `reusable`，效果是一样的：

```ts title=bar.ts
export default class Bar {
  static reusable = true
  constructor(ctx: Context) {}
}
```

### 维护共享状态

一种更复杂的情况是，我们既需要插件可重用，又需要维护一些共享状态。例如，我们能否编写一个指令，使得它总是返回插件被调用的次数呢？这时候 `fork` 事件就派上用场了：

```ts title=count.ts
export const name = 'count'

export function apply(ctx: Context) {
  let count = 0         // 这里保存了共享状态

  ctx.command('count').action(() => {
    return `此插件已被调用 ${count} 次。`
  })

  ctx.on('fork', (ctx) => {
    count += 1
    ctx.on('dispose', () => {
      count -= 1
    })
  })
}
```

我们可以看到，上面的插件并没有声明 `reusable` 属性，取而代之的是监听了 `fork` 事件。`fork` 是一个生命周期事件，当插件每次被调用时都会触发。因此，我们可以在 `fork` 事件中对共享状态进行更新。我们每创建一个新的 `Fork` 对象，就会增加一次 `count`；而每当 `Fork` 对象被停用，就会减少一次 `count`；当用户调用指令时，我们只需要返回 `count` 的值即可。

`fork` 事件实际上将插件分割成了两个不同的作用域。外侧的代码仍然只会被执行一次，对应着不可重用的部分；而内侧的代码则会被执行多次，对应着可重用的部分。在上面的例子中，只需将指令的注册放在外侧作用域中，这样就不用担心重复注册的问题了。

最后，`fork` 事件的回调函数与插件本身类似，也接受 `ctx` 和 `config` 两个参数，分别对应于该次调用时传入插件的参数。外侧和内侧的 `ctx` 含义不同，请格外注意。

### 嵌套插件的可重用性

让我们重新梳理一下可重用插件的概念：

1. 根据插件的 `reusable` 属性，可以将插件分为可重用插件和不可重用插件：不可重用插件被调用多次时，只会执行一次插件逻辑；而可重用插件被调用多次时，会执行多次插件逻辑；
2. 这两种类型本质上都可以使用 `fork` 事件来表达：不可重用插件的逻辑写在 `fork` 事件的外侧，而可重用插件的逻辑写在 `fork` 事件的内侧。

当我们嵌套使用可重用插件和不可重用插件时，又会发生什么呢？让我们来看一些例子吧。

#### 情况一：不可重用插件嵌套可重用插件

实际上我们会发现，`reusable` 属性只是 `fork` 事件的语法糖。下面两种写法是等价的：

```ts
ctx.plugin({
  reusable: true,
  apply: (ctx) => {
    ctx.middleware(callback)
  },
})
```

```ts
ctx.plugin((ctx) => {
  ctx.on('fork', (ctx) => {
    ctx.middleware(callback)
  })
})
```

然而，如果你直接将可重用插件嵌套在不可重用插件中，由于外层的插件只会执行一次，所以内层的插件也并不会被重复执行。这显然不是我们想要的结果。这就是为什么我们需要 `fork` 事件。当你需要在不可重用的插件中重用某段代码，你就应该使用 `fork` 事件，就像上面的例子一样。

#### 情况二：可重用插件嵌套不可重用插件

反过来的情况则更加自然：如果你在可重用插件内调用了一个不可重用的插件，那么可重用插件将被多次执行，而不可重用则会确保只被执行一次。这种写法常常用于注册指令或其他服务：

```ts internal.ts
export function apply(ctx: Context) {
  // 注册指令
  ctx.command('foo').action(callback)

  // 扩展控制台
  ctx.console.addEntry('/client')
}
```

```ts
import * as internal from './internal'

export const reusable = true

export function apply(ctx: Context, config: Config) {
  // 不可重用的部分被嵌套在独立的插件中
  ctx.plugin(internal)

  // 中间件是可以重复注册的
  ctx.middleware(callback)
}
```

## 重新认识上下文

从学习 Koishi 开发的一开始，我们就已经接触到了 **上下文 (Context)** 这个概念。我们所熟悉的 `ctx.on()`, `ctx.middleware()` 以及 `ctx.command()` 等等 API 都是上下文类所提供的方法。而在本节中，我们进一步看到，上下文在插件开发中扮演着非常重要的角色。

上下文描述了机器人的一种可能的运行环境，而插件则是在这个环境中运行的。每个插件的上下文互不相同，这才保证了插件的副作用可以被有效地回收。

对于完整的运行环境有许多的刻画方式，而副作用的回收正是其中的一种。基于副作用的上下文也可以称为插件上下文。在接下来的章节中，我们还将看到运行环境的其他刻画维度，包括基于依赖的服务上下文和基于过滤器的会话上下文。
