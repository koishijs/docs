# 服务端 API

:::tip
本节中所涉及的 API 都在 @koishijs/plugin-console 中导出。
:::

## 类：Console

`Console` 类封装了控制台服务的所有功能，你可以通过 `ctx.console` 来访问它。

### console.addEntry(entry)

- **entry:** `Entry` 要添加的入口

```ts
interface Entry {
  dev: string
  prod: string | string[]
}
```

添加客户端入口文件。

### console.addListener(event, callback, options)

- **event:** `string` 事件名称
- **callback:** `Function` 回调函数，其中 `this` 指向 [`Client`](#类-client) 对象

注册一个事件监听器。

### console.broadcast(event, body, options)

- **event:** `string` 事件名称
- **body:** `any` 事件内容

向所有客户端广播一个事件。

## 类：Client

`Client` 类代表一个客户端连接。

### client.socket

- 类型: `WebSocket`

客户端连接的 WebSocket 对象。

### client.request

- 类型: `IncomingMessage`

客户端发出的 HTTP 请求对象。

### client.send(data)

- **data:** `any` 要发送的数据

向客户端发送数据。`data` 会被序列化为 JSON 字符串。

## 类：DataService <badge>抽象</badge>

`DataService` 类封装了一些与客户端进行 [数据通信](../../guide/console/data.md) 的实用方法。

### new DataService(ctx, key, options)

- **ctx:** `Context` 上下文对象
- **key:** `string` 服务的唯一标识符

构造一个数据服务。

### service.refresh()

向全体客户端重新发布该服务的数据。

### service.get() <badge>抽象</badge>

实现此方法以返回该服务的数据。
