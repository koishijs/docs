# 服务端 API

::: warning
此页文档正在施工，内容尚未完成。
:::

## 类：Console

### console.addEntry(callback, options)

### console.addListener(callback, options)

## 类：Client

`Client` 类代表一个客户端连接。你可以在 `console.addListener` 的回调函数中通过 `this` 访问到它。

### client.socket

- 类型: `WebSocket`

客户端连接的 WebSocket 对象。

### client.request

- 类型: `IncomingMessage`

客户端发出的 HTTP 请求对象。

### client.send(data)

- **data:** `any` 要发送的数据

向客户端发送数据。`data` 会被序列化为 JSON 字符串。

## 类：DataService <badge text="抽象"/>

### new DataService(ctx, key, options)

- **ctx:** `Context` 上下文对象
- **key:** `string` 服务的唯一标识符

构造一个数据服务。

### service.refresh()

向全体客户端重新发布该服务的数据。
