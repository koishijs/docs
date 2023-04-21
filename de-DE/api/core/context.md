# 上下文 (Context)

**上下文 (Context)** 是 Koishi 的重要概念。你的每一个插件，中间件，监听器和指令都被绑定在上下文上。你的每一个插件，中间件，监听器和指令都被绑定在上下文上。

::: tip
#### 提示

你可能正在寻找某些上下文 API 但并没有在这里找到，这是因为 Koishi 使用了面向切面编程 (AOP) 的开发方式，绝大部分上下文属性和方法都**通过混入的方式搭载在了服务上**。你可以前往服务部分看到更多上下文中可用的 API。如果你想快速找到某个具体的 API，请善用搜索功能。 :::你可以前往服务部分看到更多上下文中可用的 API。如果你想快速找到某个具体的 API，请善用搜索功能。
:::

## 实例属性

### ctx.baseDir

- 类型: `string`

当前的 Koishi 默认路径。当前的 Koishi 默认路径。如果你使用配置文件，则这个路径是配置文件所在的路径；否则这个路径是当前工作路径。

## 实例方法

### ctx.extend(meta)

- **meta:** `Partial<Context.Meta>` 要覆盖的属性
- 返回值: `this` 新的上下文

以当前上下文为原型创建一个新上下文。以当前上下文为原型创建一个新上下文。`meta` 中的属性将覆盖当前上下文的属性。

### ctx.isolate(names)

- **keys:** `string[]` 隔离的服务列表
- 返回值: `this`

以当前上下文为原型创建一个新上下文。以当前上下文为原型创建一个新上下文。`keys` 中指定的服务将在新的上下文中被隔离，其他服务仍然与当前上下文共享。参见 [服务的共享与隔离](../../guide/plugin/service.md#服务的共享与隔离)。参见 [服务的共享与隔离](../../guide/plugin/service.md#服务的共享与隔离)。

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

### ctx.logger(scope?)

- **scope:** `string` 要指定的类型，默认为 `''`
- 返回值: [`Logger`](../service/logger.md)

根据 namespace 生成一个 [Logger 对象](../service/logger.md)。

## 静态属性和方法

### Context.filter

- 类型: `symbol`

### Context.source

- 类型: `symbol`

### Context.current

- 类型: `symbol`

特殊的键值，可以在通用上下文属性对象的方法上访问。参见 [声明通用上下文属性](../../guide/plugin/service.md#声明通用上下文属性)。参见 [声明通用上下文属性](../../guide/plugin/service.md#声明通用上下文属性)。

### Context.mixin(name, options)

- **name:** `string` 属性名称
- **options:** `MixinOptions` 混入选项

### Context.service(name, options?)

- **name:** `string` 属性名称
- **options:** `MixinOptions` 混入选项

声明一个通用上下文属性。声明一个通用上下文属性。参见 [声明通用上下文属性](../../guide/plugin/service.md#声明通用上下文属性)。
