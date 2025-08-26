# 上下文 (Context)

**上下文 (Context)** 是 Koishi 的核心概念。Koishi 的绝大多数功能也直接通过上下文提供，包括插件、中间件、监听器和指令等。

## 服务与混入

Koishi 使用了组合 (Compose) 的开发方式，绝大部分上下文属性和方法都通过混入的方式搭载在了服务上。以下的属性和方法是由内置服务提供的，你可以像使用实例属性和方法一样使用它们。这些 API 的具体用法在服务文档中详细介绍，你可以点击对应的链接前往查看。

- [ctx.any](../service/filter.md#ctx-any)
- [ctx.bail](../service/events.md#ctx-bail)
- [ctx.before](../service/events.md#ctx-before)
- [ctx.debounce](../service/timer.md#ctx-debounce)
- [ctx.emit](../service/events.md#ctx-emit)
- [ctx.events](../service/events.md)
- [ctx.exclude](../service/filter.md#ctx-exclude)
- [ctx.filter](../service/filter.md#ctx-filter)
- [ctx.http](../service/http.md)
- [ctx.i18n](../service/i18n.md)
- [ctx.inject](../service/registry.md#ctx-inject)
- [ctx.intersect](../service/filter.md#ctx-intersect)
- [ctx.loader](../service/loader.md)
- [ctx.middleware](../service/events.md#ctx-middleware)
- [ctx.model](../database/model.md)
- [ctx.never](../service/filter.md#ctx-never)
- [ctx.off](../service/events.md#ctx-off)
- [ctx.on](../service/events.md#ctx-on)
- [ctx.once](../service/events.md#ctx-once)
- [ctx.parallel](../service/events.md#ctx-parallel)
- [ctx.permissions](../service/permissions.md)
- [ctx.plugin](../service/registry.md#ctx-plugin)
- [ctx.registry](../service/registry.md)
- [ctx.scope](../service/registry.md#ctx-scope)
- [ctx.serial](../service/events.md#ctx-serial)
- [ctx.server](../service/server.md)
- [ctx.setInterval](../service/timer.md#ctx-setinterval)
- [ctx.setTimeout](../service/timer.md#ctx-settimeout)
- [ctx.sleep](../service/timer.md#ctx-sleep)
- [ctx.stop](../service/registry.md#ctx-stop)
- [ctx.throttle](../service/timer.md#ctx-throttle)
- [ctx.timer](../service/timer.md)
- [ctx.union](../service/filter.md#ctx-union)

除此以外，以下服务由官方插件提供，因此使用时需要 [声明依赖](../../guide/plugin/service.md#inject)：

- [ctx.console](../console/server.md)
- [ctx.database](../database/database.md)
- [ctx.mock](../../plugins/develop/mock.md)
- [ctx.server](../../plugins/develop/server.md)

## 实例属性

### ctx.root.config

- 类型: [`Context.Config`](./app.md)

当前的 Koishi 全局配置，相当于配置文件中的配置经过默认值处理后的结果。

### ctx.baseDir

- 类型: `string`

当前的 Koishi 默认路径。如果你使用配置文件，则这个路径是配置文件所在的路径；否则这个路径是当前工作路径。

### ctx.bots

- 类型: `Bot[]`

当前应用的全部机器人实例。

## 实例方法

### ctx.extend(meta)

- **meta:** `Partial<Context.Meta>` 要覆盖的属性
- 返回值: `this` 新的上下文

以当前上下文为原型创建一个新上下文。`meta` 中的属性将覆盖当前上下文的属性。

<!-- ### ctx.isolate(names)

- **keys:** `string[]` 隔离的服务列表
- 返回值: `this`

以当前上下文为原型创建一个新上下文。`keys` 中指定的服务将在新的上下文中被隔离，其他服务仍然与当前上下文共享。参见 [服务的共享与隔离](../../guide/plugin/service.md#服务的共享与隔离)。 -->

### ctx.command(def, desc?, config?)

- **def:** `string` 指令名以及可能的参数
- **desc:** `string` 指令的描述
- **config:** `CommandConfig` 指令的配置
  - **checkUnknown:** `boolean` 是否对未知选项进行检测，默认为 `false`
  - **checkArgCount:** `boolean` 是否对参数个数进行检测，默认为 `false`
  - **authority:** `number` 最低调用权限，默认为 `1`
  - **showWarning:** `boolean` 当小于最短间隔时是否进行提醒，默认为 `true`
- 返回值：[`Command`](./command.md) 注册或修改的指令

在当前上下文中注册或修改一个指令。

### ctx.broadcast(channels?, content) <badge>需要数据库</badge>

- **channels:** `string[]` 频道列表，格式为 `{platform}:{channelId}` (如 `discord:1234567890`)
- **content:** `string` 要发送的内容
- 返回值: `Promise<string[]>` 成功发送的消息 ID 列表

所有机器人向自己分配的频道广播消息。如果传入的频道不存在，会输出一个警告。

### ctx.logger(scope?)

- **scope:** `string` 要指定的类型，默认为 `''`
- 返回值: [`Logger`](../utils/logger.md)

根据命名空间生成一个 [Logger](../utils/logger.md) 对象。

## 静态属性和方法

### Context.filter

- 类型: `symbol`

### Context.current

- 类型: `symbol`

特殊的键值，可以在通用上下文属性对象的方法上访问。参见 [声明通用上下文属性](../../guide/plugin/service.md#声明通用上下文属性)。
