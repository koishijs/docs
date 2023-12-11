# 适配器 (Adapter)

:::tip
参见：[开发 > 跨平台 > 实现适配器](../../guide/adapter/adapter.md)
:::

本章将介绍与适配器相关的内容，这是一个相当底层的概念，因此如果你并不打算编写一个平台实现，你完全可以跳过本章节。

标有 <badge>抽象</badge> 的方法需要由适配器插件自行实现。

## 类：Adapter

适配器基类。

### new Adapter()

构造一个适配器实例。

### adapter.bots

- 类型: `Bot[]`

当前适配器下的全部机器人实例。

### adapter.connect(bot) <badge>抽象</badge>

- **bot:** `Bot` 机器人实例
- 返回值: `Promise<void>`

连接 Bot 所需的操作，将在 `bot.start()` 中被调用。

### adapter.disconnect(bot) <badge>抽象</badge>

- **bot:** `Bot` 机器人实例
- 返回值: `Promise<void>`

停止连接 Bot 所需的操作，将在 `bot.stop()` 中被调用。

## 类：Adapter.WsClient

一个用于 WebSocket 通信方式的实用适配器基类。其中的机器人需要接受以下配置项：

```ts
export interface WsClientConfig {
  retryLazy?: number
  retryTimes?: number
  retryInterval?: number
}
```

### new WsClient(ctx, bot)

- **ctx:** `Context` 上下文
- **bot:** `Bot` 机器人实例

创建一个 WsClient 适配器实例。

### client.bot

- 类型: `Bot`

当前适配器下的机器人实例。

### client.socket

- 类型: `WebSocket`

当前适配器下的 WebSocket 实例。

### client.prepare() <badge>抽象</badge>

- 返回值: `WebSocket | Promise<WebSocket>`

根据机器人实例生成一个 WebSocket 对象。

### client.accept() <badge>抽象</badge>

WebSocket 连接成功建立后的回调函数。你需要实现这个方法，并在其中手动调用 `bot.resolve()` 回调函数表示已经连接成功。
