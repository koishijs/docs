# 适配器 (Adapter)

::: tip
参见：[开发 > 跨平台 > 实现适配器](../../guide/adapter/adapter.md)
:::

本章将介绍与适配器相关的内容，这是一个相当底层的概念，因此如果你并不打算编写一个平台实现，你完全可以跳过本章节。

标有 <badge>抽象</badge> 的方法需要平台自行实现。

## 类：Adapter

### new Adapter(app, config)

- **app:** `App` 应用实例
- **config:** `object` 配置项

创建一个适配器实例。

### adapter.config

- 类型: `object`

构造 Adapter 实例时所使用的配置项。

### adapter.bots

- 类型: `Bot[]`

当前适配器下的全部机器人实例。

### adapter.dispatch(session)

- **session:** `Session` 会话实例
- 返回值: `void`

根据会话内容，在相应的上下文触发一个上报事件。

### adapter.start() <badge>抽象</badge>

- 返回值: `void | Promise<void>`

启动适配器所需的操作，将作为 ready 事件的回调函数。

### adapter.stop() <badge>抽象</badge>

- 返回值: `void | Promise<void>`

停止适配器所需的操作，将作为 dispose 事件的回调函数。

### adapter.connect(bot) <badge>抽象</badge>

- **bot:** `Bot` 机器人实例
- 返回值: `void | Promise<void>`

连接 Bot 所需的操作，将在 `bot.connect()` 中被调用。

## 类：Adapter.WsClient

### new Adapter.WsClient(ctx, bot)

- **ctx:** `Context` 上下文
- **bot:** `Bot` 机器人实例

创建一个 WsClient 适配器实例。

```ts
export interface Config {
  retryLazy?: number
  retryTimes?: number
  retryInterval?: number
}
```

### adapter.prepare() <badge>抽象</badge>

- **bot:** `Bot` 机器人实例
- 返回值: `WebSocket | Promise<WebSocket>`

根据机器人实例生成一个 WebSocket 对象。

### adapter.accept() <badge>抽象</badge>

- **bot:** `Bot` 机器人实例
- 返回值: `void`

WebSocket 连接成功建立后的回调函数。你需要实现这个方法，并在其中手动调用 `bot.resolve()` 回调函数表示已经连接成功。
