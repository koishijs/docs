# About Plugin

::: tip
Before learning this chapter, it is recommended to read [Manual > Install and Configure Plugins](../../manual/usage/market.md).
:::

Modular is a fundamental feature in Koishi.With the plugin system, Koishi was able to couple various features and distribute them in the form of modules.We have already experienced the basic plugin development example in the Getting Started section.In this chapter, we will introduce more modular developing ways and best practices in some scenarios.

## Basic Forms of Plugins

A plugin needs to be one of three basic forms:

1. A function that accepts two parameters, which are the context and the configuration
2. A class that accepts two constructor parameters, which are the context and the configuration
3. An object which has a `apply` method of the object and the method is the function in the first form

The loading of this plugin is equivalent to the invocation the above function. Therefore, the four formulations below are basic equivalent:

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

## Modular Plugins

The greatest advantage of pluginization is the ability to write different functionalities in separate modules. At this point, the plugin will serve as a module export, and it can either be a [default export](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/import#导入默认值) or a [namespace export](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/import#导入整个模块的内容).

For plugins in the object form, you can additionally provide a `name` property as the plugin's name. For function and class forms, the plugin name would be the function or class name. Named plugins help better describe their functionalities and are used for plugin relationship visualization, although they don't affect any runtime behaviors.

```ts title=foo.ts
// Namespace export of an object-form plugin
export interface configuration {}

export const name = 'Foo'

export function application (ctx: Context, config: Config) {}
```

```ts title=bar.ts
// Default export of a class-form plugin
class Bar {
  constructor(ctx: Context, config: Bar.Config) {}
}

namespace Bar {
  export interface Config {}
}

export default Bar
```

## Nested Plugins

Koishi plugins can also be nested. You can decouple the plugin you wrote into multiple independent files and then create a new entry file that loads these plugins, like this:

```ts title=index.ts
// Entry file, loading plugins from the aforementioned modules
import Foo from './foo'
import * as Bar from './bar'

export function apply(ctx: Context) {
  ctx.plugin(Foo)
  ctx.plugin(Bar)
}
```

When you load the entry file, you are essentially loading both the foo and bar modules simultaneously. This approach not only reduces mental overhead, but the decoupled modules also benefit from independent hot-reloading. You can modify one module's code without affecting another module's running!

When developing more complex features, you can break down the plugin into multiple independent sub-plugins and load these sub-plugins sequentially in the entry file. Many large plugins adopt this structure.

## Load plugins in the config file

A module can be loaded as a plugin via Koishi's configuration file, and it needs to satisfy one of the following two conditions:

- The **default export** of the module is a plugin.
- The **namespace export** of the module is a plugin.

There is no advantage or disadvantage between these two methods; you can adjust the export form according to your own needs. Conventionally, if your plugin is a function, we usually directly export the apply method and treat the namespace export as a plugin; if your plugin is a class, we usually use the default export form.

The priority of the default export is higher here. Therefore, as long as the module provides a default export, Koishi will try to load this default export instead of the namespace export. Be sure to pay attention to this during development.
:::

The `plugins` field in the configuration file records the plugin configurations:

```yaml title=koishi.yml
plugins:
  console:
  dialogue:
    prefix: '#'
```

Here, the key corresponds to the plugin's path, and the value is the plugin's configuration. The logic for resolving this path is as follows:

- For foo, we will try to read both @koishijs/plugin-foo and koishi-plugin-foo.
- For @foo/bar, we will try to read @foo/koishi-plugin-bar.

In other words, the above configuration file is equivalent to the following code:

```ts
app.plugin(require('@koishijs/plugin-console').default)
app.plugin(require('koishi-plugin-dialogue'), { prefix: '#' })
```

In this example, console is an official plugin that uses the default export, while dialogue is a community plugin that uses namespace export. The configuration file allows you to ignore these differences, as each plugin's loading method will be automatically detected by the CLI.
