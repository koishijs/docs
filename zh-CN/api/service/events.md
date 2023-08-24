# 事件系统 (Events)

::: tip
参见：[开发 > 交互基础 > 事件系统](../../guide/basic/events.md)
<br>参见：[开发 > 模块化 > 生命周期](../../guide/plugin/lifecycle.md)
:::

::: tip
本节介绍事件 API。如果想了解 Koishi 的内置事件，请前往 [API > 核心模块 > 事件](../core/events.md)。
:::

## 实例方法

### ctx.emit(session?, event, ...param)
### ctx.parallel(session?, event, ...param)

- **session:** [`Session`](../core/session.md) 会话对象
- **event:** `string` 事件名称
- **param:** `any[]` 事件的参数
- 返回值: `boolean` 匹配结果

同时触发所有 event 事件的能够匹配 session 对象的回调函数。emit 为同步，parallel 为异步。

### ctx.bail(session?, event, ...param)
### ctx.serial(session?, event, ...param)

- **session:** [`Session`](../core/session.md) 会话对象
- **event:** `string` 事件名称
- **param:** `any[]` 事件的参数
- 返回值: `boolean` 匹配结果

依次触发所有 event 事件的能够匹配 session 对象的回调函数。当返回一个 false, null, undefined 以外的值时将这个值作为结果返回。bail 为同步，serial 为异步。

### ctx.chain(session?, event, ...param) <badge type="warning">实验性</badge>
### ctx.waterfall(session?, event, ...param) <badge type="warning">实验性</badge>

- **session:** [`Session`](../core/session.md) 会话对象
- **event:** `string` 事件名称
- **param:** `any[]` 事件的参数
- 返回值: `boolean` 匹配结果

依次触发所有 event 事件的能够匹配 session 对象的回调函数。每次用得到的返回值覆盖下一轮调用的第一个参数，并在所有函数执行完后返回最终结果。chain 为同步，waterfall 为异步。

### ctx.on(event, listener, prepend?)

- **event:** `string` 事件名称
- **listener:** `Function` 回调函数
- **prepend:** `boolean` 是否前置
- 返回值: `() => boolean` 取消这个监听器

监听一个事件。

### ctx.off(event, listener)

- **event:** `string` 事件名称
- **listener:** `Function` 回调函数
- 返回值: `boolean` 是否有此回调函数

取消监听一个事件。

### ctx.once(event, listener, prepend?)

- **event:** `string` 事件名称
- **listener:** `Function` 回调函数
- **prepend:** `boolean` 是否前置
- 返回值: `() => boolean` 取消这个监听器

监听一个事件，且确保回调函数只会被执行一次。

### ctx.before(event, listener, append?)

- **event:** `string` 事件名称
- **listener:** `Function` 回调函数
- **append:** `boolean` 是否后置
- 返回值: `() => boolean` 取消这个监听器

监听一个以 `before-` 开头的事件。

### ctx.middleware(middleware, prepend?)

- **middleware:** [`Middleware`](../../guide/basic/middleware.md#使用中间件) 要注册的中间件
- **prepend:** `boolean` 是否前置
- 返回值: `() => boolean` 取消这个中间件

当前上下文中注册一个中间件。
