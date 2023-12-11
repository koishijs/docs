# Context API

:::warning
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

### ctx.action(id, options) <badge type="warning">实验性</badge>

- **id:** `string` 动作标识符
- **options.disabled:** `(() => boolean)?` 是否隐藏
- **options.action:** `Function` 回调函数函数

注册一个动作。

### ctx.menu(id, items) <badge type="warning">实验性</badge>

- **id:** `string` 菜单标识符
- **items:** `MenuItem[]` 菜单项列表
  - **items\[].id:** `string` 动作标识符
  - **items\[].label:** `MaybeGetter<string>?` 菜单项名称
  - **items\[].type:** `MaybeGetter<string>?` 菜单项类型
  - **items\[].icon:** `MaybeGetter<string>?` 菜单项图标
  - **items\[].order:** `number?` 排列优先级

注册一个菜单。

### ctx.page(options)

- **options.id:** `string?` 页面标识符
- **options.path:** `string` 页面路由
- **options.name:** `MaybeRefOrGetter<string>` 页面名称
- **options.desc:** `MaybeRefOrGetter<string>?` 页面描述
- **options.icon:** `MaybeRefOrGetter<string>?` 页面图标
- **options.position:** `'top' | 'bottom'` 图标在活动栏中的位置
- **options.order:** `number?` 排列优先级
- **options.disabled:** `(() => boolean)?` 是否隐藏
- **options.component:** `Component` 页面组件

注册一个页面。

### ctx.settings(options) <badge type="warning">实验性</badge>

- **options.type:** `string` 所属类别
- **options.title:** `string?` 类别名称
- **options.order:** `number?` 排列优先级
- **options.disabled:** `(() => boolean)?` 是否隐藏
- **options.schema:** `Schema?` 配置构型
- **options.component:** `Component?` 配置组件

扩展用户设置。当使用了 `component` 时，`schema` 会被忽略。

### ctx.slot(options)

- **options.type:** `string` 插槽名称
- **options.order:** `number?` 排列优先级
- **options.disabled:** `(() => boolean)?` 是否隐藏
- **options.component:** `Component` 注入组件

向特定插槽注入组件。

### ctx.theme(options)

- **options.id:** `string` 主题标识符 (必须以 `-dark` 或 `-light` 结尾)
- **options.name:** `string` 主题名称
- **options.components:** `Dict<Component>?` 主题提供的布局组件

定义一个新的主题。
