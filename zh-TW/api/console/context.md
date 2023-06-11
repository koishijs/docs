# 上下文 API

::: warning
此页文档正在施工，内容尚未完成。
:::

::: warning
请注意：本文档介绍的是控制台客户端的 `Context`，而非 Koishi 本身的 `Context`。要查看后者的 API 文档请 [前往这里](../core/context.md)。
:::

Koishi 的控制台客户端一样通过插件化的方式加载，因此我们也实现了一套类似的 `Context` 机制。许多你熟悉的底层 API 在客户端是依然可用的 (例如生命周期事件、服务的定义与使用等等)。此外，我们还提供了一些与客户端相关的 API 来帮助你更方便地开发控制台插件。

## 混入属性和方法

以下的属性和方法是由服务混入的。你可以就像使用实例属性和方法一样使用它们。这些 API 的具体用法在对应的服务文档中详细介绍，你可以点击链接前往查看。

- [ctx.bail](../service/events.md#ctx-bail)
- [ctx.before](../service/events.md#ctx-before)
- [ctx.emit](../service/events.md#ctx-emit)
- [ctx.middleware](../service/events.md#ctx-middleware)
- [ctx.off](../service/events.md#ctx-off)
- [ctx.on](../service/events.md#ctx-on)
- [ctx.once](../service/events.md#ctx-once)
- [ctx.parallel](../service/events.md#ctx-parallel)
- [ctx.plugin](../service/registry.md#ctx-plugin)
- [ctx.scope](../service/registry.md#ctx-scope)
- [ctx.serial](../service/events.md#ctx-serial)
- [ctx.using](../service/registry.md#ctx-using)

## 实例方法

### ctx.action()

### ctx.menu()

### ctx.page()

### ctx.schema()

### ctx.settings()

### ctx.slot()

### ctx.theme(options)

- **options.id:** `string` 主题标识符 (必须以 `-dark` 或 `-light` 结尾)
- **options.name:** `string` 主题名称
- **options.components:** `Dict<Component>` 主题提供的布局组件

定义一个新的主题。

参考：[主题开发](../../guide/console/theme.md)
