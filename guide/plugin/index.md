---
sidebarDepth: 2
---

# 认识插件

在 [直接调用 Koishi](../introduction/direct.md) 一章中，我们已经学习了基础的插件开发范例。本章将介绍更多的插件编写方式，以及一些场景下的最佳实践。

## 插件的基本形式

一个插件需要是以下三种基本形式之一：

1. 一个接受两个参数的函数，第一个参数是所在的上下文，第二个参数是传入的选项
2. 一个接受两个参数的类，第一个参数是所在的上下文，第二个参数是传入的选项
3. 一个对象，其中的 `apply` 方法是第一种形式中所说的函数

而一个插件在被加载时，则相当于进行了上述函数的调用。因此，下面的四种写法是基本等价的：

```ts
declare const callback: Middleware
/// ---cut---
ctx.middleware(callback)

ctx.plugin(ctx => ctx.middleware(callback))

ctx.plugin({
  apply: ctx => ctx.middleware(callback),
})

ctx.plugin(class {
  constructor(ctx) {
    ctx.middleware(callback)
  }
})
```

看起来插件似乎只是将函数调用换了一种写法，但这种写法能够帮助我们将多个逻辑组合在一起并模块化，同时可以在插件内部对所需的选项进行初始化，这些都能极大地提高了代码的可维护性。

## 模块化的插件

一个模块可以作为插件被 Koishi 加载，其需要满足以下两条中的一条：

- 此模块的**默认导出**是一个插件
- 此模块的**导出整体**是一个插件

这两种写法并无优劣之分，你完全可以按照自己的需求调整导出的形式。按照惯例，如果你的插件是一个函数，我们通常直接导出 apply 方法，并将导出整体作为一个插件；如果你的插件是一个类，那么我们通常使用默认导出的形式。

```ts
// 导出 apply 方法
export interface Config {}

export function apply(ctx: Context, config: Config) {}

// 将模块整体作为插件
import * as plugin from './plugin'
```

```ts
// 默认导出一个类
export interface Config {}

export default class ExamplePlugin {
  constructor(ctx: Context, config: Config) {}
}

// 将默认导出作为插件
import plugin from './plugin'
```

::: tip
这里默认导出的优先级更高。因此，只要模块提供了默认导出，Koishi 就会尝试加载这个默认导出，而不是导出整体。在开发中请务必注意这一点。
:::

## 具名插件

插件如果使用对象式，那么除了 `apply` 以外，你还可以提供一个 `name` 属性，它便是插件的名称。对于函数和类形式的插件来说，插件名称便是函数名或类名。具名插件有助于更好地描述插件的功能，并被用于插件关系可视化中，实际上不会影响任何运行时的行为。

例如，下面给出了一个插件的例子，它实现了检测说话带空格的功能：

```ts title=detect-space.ts
import { Context } from 'koishi'

export const name = 'detect-space'

export function apply(ctx: Context) {
  ctx.middleware((session, next) => {
    if (session.content.match(/^\s*(\S +){2,}\S\s*$/g)) {
      return '在？为什么说话带空格？'
    } else {
      return next()
    }
  })
}
```

## 嵌套插件

Koishi 的插件也是可以嵌套的。你可以将你编写的插件解耦成多个独立的子插件，再用一个父插件作为入口，就像这样：

```ts title=nested-plugin.ts
declare module './a' {}
declare module './b' {}
// ---cut---
// 在 a.ts, b.ts 中编写两个不同的插件
import { Context } from 'koishi'
import pluginA from './a'
import pluginB from './b'

export function apply(ctx: Context) {
  // 依次加载 a, b 两个插件
  ctx.plugin(pluginA)
  ctx.plugin(pluginB)
}
```

这样当你加载 nested-plugin 时，就相当于同时加载了 a 和 b 两个插件。

当你在开发较为复杂的功能时，可以将插件分解成多个独立的子插件，并在入口文件中依次加载这些子插件。许多大型插件都采用了这种写法。

## 卸载插件

通常来说一个插件的效应应该是永久的，但如果你想在运行时卸载一个插件，应该怎么做？你可以使用 `ctx.dispose()` 方法来解决：

```ts
declare const eventCallback: (session: Session) => void
declare const commandCallback: Command.Action
declare const middlewareCallback: Middleware
// ---cut---
import { Context } from 'koishi'

function callback(ctx: Context, options) {
  // 编写你的插件逻辑
  ctx.on('message', eventCallback)
  ctx.command('foo').action(commandCallback)
  ctx.middleware(middlewareCallback)
  ctx.plugin(require('another-plugin'))
}

// 加载插件
const dispose = app.plugin(callback)

// 卸载这个插件，取消上述全部操作
dispose()
```

看起来很神奇，不过它的实现方式也非常简单。当一个插件被注册时，Koishi 会记录注册过程中定义的所有事件钩子、指令、中间件乃至子插件。当 `ctx.dispose()` 被调用时，再逐一取消上述操作的效应。因此，它的局限性也很明显：它并不能妥善处理除了 Context API 以外的**副作用**。不过，我们也准备了额外的解决办法：

```ts title=my-plugin.ts
import { Context } from 'koishi'
import { createServer } from 'http'

export function apply(ctx: Context, options) {
  const server = createServer()

  ctx.on('ready', () => {
    // ctx.dispose 无法消除 server.listen 带来的副作用
    server.listen(1234)
  })

  // 添加一个特殊的回调函数来处理副作用
  ctx.on('dispose', () => {
    server.close()
  })
}
```

这里的 `ready` 和 `dispose` 被称为**生命周期事件**，我们将会在后续的章节中进一步介绍。

## 在配置文件中加载插件 <Badge text="CLI"/>

配置文件中的 `plugins` 字段记录了插件的信息：

```yaml title=koishi.yml
plugins:
  ./local:
  console:
  dialogue:
    prefix: '#'
```

这里的键对应插件的路径，值则为插件的配置。这个路径允许两种写法：

- 如果是一个绝对路径或者相对路径，则我们会相对配置文件所在的目录进行解析
- 其他情况下我们将其视为包名，忽略 `koishi-plugin-` 以及 `@koishijs/plugin-` 的前缀，并考虑 scope 带来的影响，具体来说：
  - 对于 foo，我们将尝试读取 @koishijs/plugin-foo 和 koishi-plugin-foo
  - 对于 @foo/bar，我们将尝试读取 @foo/koishi-plugin-bar

换言之，上述配置文件相当于下面的代码：

```ts
app.plugin(require('./local'))
app.plugin(require('@koishijs/plugin-console').default)
app.plugin(require('koishi-plugin-dialogue'), { prefix: '#' })
```

在这个例子中，local 是一个本地插件；console 是官方插件，并且使用了默认导出；dialogue 是社区插件，并且使用了导出整体。配置文件使你得以无视这些区别，每个插件的加载方式都会由 CLI 自动检测。
