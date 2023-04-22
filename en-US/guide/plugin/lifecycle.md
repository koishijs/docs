# 生命周期

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
const fork = app.plugin(callback)

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
