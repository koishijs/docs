# 认识插件

::: tip
在学习本章之前，建议先完整阅读 [入门 > 安装和配置插件](../../manual/usage/market.md)。
:::

模块化是 Koishi 的核心特性。借助插件系统，Koishi 得以将各种功能解耦出来，并以模块的形式分发。在「开发上手」中我们已经体验了基础的插件开发范例。本章将介绍更多的模块化编写方式，并介绍一些场景下的最佳实践。

## 插件的基本形式

一个插件需要是以下三种基本形式之一：

1. 一个接受两个参数的函数，第一个参数是所在的上下文，第二个参数是传入的配置项
2. 一个接受两个参数的类，第一个参数是所在的上下文，第二个参数是传入的配置项
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

插件化最大的好处就是可以把不同的功能写在不同的模块中。此时插件将作为模块的导出，它可以是 [默认导出](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/import#导入默认值) 或 [导出整体](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/import#导入整个模块的内容)。

对于对象形式的插件，你还可以额外提供一个 `name` 属性作为插件的名称。对于函数和类形式的插件来说，插件名称便是函数名或类名。具名插件有助于更好地描述插件的功能，并被用于插件关系可视化中，实际上不会影响任何运行时的行为。

```ts title=foo.ts
// 整体导出对象形式的插件
export interface Config {}

export const name = 'Foo'

export function apply(ctx: Context, config: Config) {}
```

```ts title=bar.ts
// 默认导出类形式的插件
class Bar {
  constructor(ctx: Context, config: Bar.Config) {}
}

namespace Bar {
  export interface Config {}
}

export default Bar
```

## 嵌套的插件

Koishi 的插件也是可以嵌套的。你可以将你编写的插件解耦成多个独立的子模块，再将调用这些子模块的一个新插件作为入口模块，就像这样：

```ts title=index.ts
// 入口文件，从上述模块分别加载插件
import Foo from './foo'
import * as Bar from './bar'

export function apply(ctx: Context) {
  ctx.plugin(Foo)
  ctx.plugin(Bar)
}
```

这样当你加载上述模块时，就相当于同时加载了 foo 和 bar 两个模块。这样的做法不仅能够减轻心智负担，解耦出的模块还享受独立的热重载，你可以在不影响一个模块运行的情况下修改另一个的代码！

当你在开发较为复杂的功能时，可以将插件分解成多个独立的子插件，并在入口文件中依次加载这些子插件。许多大型插件都采用了这种写法。

## 在配置文件中加载

一个模块可以作为插件被 Koishi 的配置文件加载，其需要满足以下两条中的一条：

- 此模块的**默认导出**是一个插件
- 此模块的**导出整体**是一个插件

这两种写法并无优劣之分，你完全可以按照自己的需求调整导出的形式。按照惯例，如果你的插件是一个函数，我们通常直接导出 apply 方法，并将导出整体作为一个插件；如果你的插件是一个类，那么我们通常使用默认导出的形式。

::: tip
这里默认导出的优先级更高。因此，只要模块提供了默认导出，Koishi 就会尝试加载这个默认导出，而不是导出整体。在开发中请务必注意这一点。
:::

配置文件中的 `plugins` 字段记录了插件的信息：

```yaml title=koishi.yml
plugins:
  console:
  dialogue:
    prefix: '#'
```

这里的键对应插件的路径，值则为插件的配置。这个路径的解析逻辑如下：

- 对于 foo，我们将尝试读取 @koishijs/plugin-foo 和 koishi-plugin-foo
- 对于 @foo/bar，我们将尝试读取 @foo/koishi-plugin-bar

换言之，上述配置文件相当于下面的代码：

```ts
app.plugin(require('@koishijs/plugin-console').default)
app.plugin(require('koishi-plugin-dialogue'), { prefix: '#' })
```

在这个例子中，console 是官方插件，并且使用了默认导出；dialogue 是社区插件，并且使用了导出整体。配置文件使你得以无视这些区别，每个插件的加载方式都会由 CLI 自动检测。
