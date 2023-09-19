# Lifecycle

In the [Event System](../basic/events.md), we have already learned about session events dispatched by chat platforms. In addition to these, Koishi also provides various lifecycle events. These events are triggered at specific phases during Koishi's lifetime, and you can implement various functionalities by listening to them. This section mainly introduces some core events relevant to plugin development.

For a complete list of events provided by Koishi, you can refer to the [Events](../../api/core/events.md).

## Asynchronous loading and `ready` event

The `ready` event is triggered when the application starts. If a plugin is loaded while the application is already in a started state, the ready event will be triggered immediately. The following scenarios are where you would typically use the `ready` event:

- Contains asynchronous operations (e.g., file operations, network requests, etc.)
- Actions to be performed only after all other plugins have been loaded

## Side effects and `dispose` event

### Unload Plugins

We have previously understood how to enable plugins; Koishi also supports disabling a plugin at runtime. The `ctx.plugin()` method returns a `Fork` object, and calling `fork.dispose()` can disable a plugin.

```ts
import { Context } from 'koishi'

function callback(ctx: Context) {
  // Write your plugin logic here
  ctx.on('message', callback1)
  ctx.command('foo').action(callback2)
  ctx.middleware(callback3)
  ctx.plugin(require('another-plugin'))
}

// Load the plugin
const fork = ctx.plugin(callback)

// Disable this plugin, removing all its side effects
fork.dispose()
```

For reusable plugins, calling `fork.dispose()` will only disable the instance of the plugin represented by that particular `fork`. If you want to remove all side effects, you can use `ctx.registry.delete()`:

```ts
// Remove all side effects from a reusable plugin
ctx.registry.delete(plugin)
```

### Clean up side effects

Koishi's plugin system supports hot reloading, meaning that any plugin might be loaded and unloaded multiple times at runtime. To make this possible, all side effects of a plugin must be cleaned up when it is unloaded.

Most methods of `ctx` will automatically clean up side effects when a plugin is disabled. However, if you are using methods outside of `ctx`, you might introduce other side effects, which then need to be manually cleaned up using the `dispose` event. Below is an example:

```ts
// An example server plugin
import { Context } from 'koishi'
import { createServer } from 'http'

export function apply(ctx: Context, config) {
  const server = createServer()

  ctx.on('ready', () => {
    // Listen to a port when the plugin starts
    server.listen(1234)
  })

  ctx.on('dispose', () => {
    // Close the port when the plugin is disabled
    server.close()
  })
}
```

## Reusability and `fork` Event

### Reusable Plugins

Until now, the plugin development we discussed was limited to scenarios where only one instance of a plugin could be activated at a time. What happens if you want to load multiple instances of a plugin in the same application?

```ts
function callback() {
  console.log('called')
}

ctx.plugin(callback)
ctx.plugin(callback)
```

If you run the code above, you'll notice that `called` is printed only once. This is because `ctx.plugin()` checks if the plugin has already been loaded. If it has, it returns the existing `Fork` object, rather than re-running the plugin callback.

The primary reason for this design is that plugins often consume resources. Activating a plugin multiple times could lead to unexpected issues. For instance, a plugin might register a specific command; activating it multiple times would result in multiple registrations of the same command, creating ambiguity when the command is invoked.

However, this doesn't mean that all plugins should not be reused. If you have such a need, Koishi provides a way to do it—simply declare the `reusable` property of the plugin as `true`. Here's an example:

```ts title=reply.ts
export const name = 'reply'
export const reusable = true  // Declare this plugin as reusable

export interface Config {
  input: string
  output: string
}

export function apply(ctx: Context, config: Config) {
  ctx.middleware((session, next) => {
    // Reply with output when user sends input
    if (session.message === config.input) {
      return config.output
    }
    return next()
  })
}
```

Then, we can load this plugin multiple times:

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

### Maintain Shared States

A more complex situation arises when we need plugins to be reusable and maintain some shared state. For example, can we write a command that always returns the number of times the plugin has been invoked? This is where the `fork` event comes in handy:

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

Here, the plugin listens for the fork event. The `fork` event is a lifecycle event that is triggered each time the plugin is invoked. Thus, we can update the shared state in the `fork` event handler. Every time a new `Fork` object is created, `count` increases by 1; and each time a `Fork` object is disposed, `count` decreases by 1. When the user invokes the command, we simply return the value of `count`.

`fork` 事件实际上将插件分割成了两个不同的作用域。外侧的代码仍然只会被执行一次，对应着不可重用的部分；而内侧的代码则会被执行多次，对应着可重用的部分。在上面的例子中，只需将指令的注册放在外侧作用域中，这样就不用担心重复注册的问题了。

最后，`fork` 事件的回调函数与插件本身类似，也接受 `ctx` 和 `config` 两个参数，分别对应于该次调用时传入插件的参数。外侧和内侧的 `ctx` 含义不同，请格外注意。

### Nested Plugin Reusability

Let's revisit the concept of reusable plugins:

1. Based on the `reusable` property, plugins can be categorized as reusable or non-reusable: Non-reusable plugins take effect only once when invoked multiple times, while reusable plugins take effect multiple times.
2. Both types can essentially use the `fork` event to express themselves: the logic for non-reusable plugins is written outside the `fork` event, and the logic for reusable plugins is written inside it.

当我们嵌套使用可重用插件和不可重用插件时，又会发生什么呢？让我们来看一些例子吧。

#### Condition I: reusable plugin in non-reusable plugins

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

#### Condition II: non-reusable plugin in reusable plugins

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

## Rethinking Contexts

从学习 Koishi 开发的一开始，我们就已经接触到了 **上下文 (Context)** 这个概念。我们所熟悉的 `ctx.on()`, `ctx.middleware()` 以及 `ctx.command()` 等等 API 都是上下文类所提供的方法。而在本节中，我们进一步看到，上下文在插件开发中扮演着非常重要的角色。

上下文描述了机器人的一种可能的运行环境，而插件则是在这个环境中运行的。每个插件的上下文互不相同，这才保证了插件的副作用可以被有效地回收。

对于完整的运行环境有许多的刻画方式，而副作用的回收正是其中的一种。基于副作用的上下文也可以称为插件上下文。在接下来的章节中，我们还将看到运行环境的其他刻画维度，包括基于依赖的服务上下文和基于过滤器的会话上下文。
