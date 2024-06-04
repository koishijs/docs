# @koishijs/plugin-server

@koishijs/plugin-server 提供了 `ctx.server` 基础服务，它是一个基于 [Koa Router](https://github.com/koajs/router) 的简单路由系统，用于管理 Koishi 应用收到的网络请求。除了 Koa Router 所支持的部分方法外，Router API 还提供了一些额外的功能，例如支持接受 WebSocket 连接等。

## 上下文 API

::: warning
请避免使用未在本页列出的方法：

1. Koa Router 的 API 并不是副作用安全的。我们对本页列出的方法进行了特殊处理，使其在插件卸载时自动删除路由。但使用其他方法会导致你的插件无法被正常卸载。
2. 未来可能会不基于 Koa Router 重新实现路由系统。
:::

### ctx.server[method](path, middleware)

- **method:** 可以是 `get`, `post`, `put`, `delete`, `patch` 或 `all` (仅能是小写)
- **path:** `string | RegExp | (string | RegExp)[]` 路径
- **middleware:** `Function` Koa 中间件

处理特定路径上的网络请求。具体请参见 [这里](https://github.com/koajs/router/blob/master/API.md)。

### ctx.server\.ws(path, handler)

- **path:** `string | RegExp | (string | RegExp)[]` 路径
- **handler:** `WebSocketHandler` 处理函数，接受下列参数
  - **socket:** [`WebSocket`](https://github.com/websockets/ws/blob/master/doc/ws.md#class-websocket) WebSocket 连接
  - **request:** [`IncomingMessage`](https://nodejs.org/api/http.html#class-httpincomingmessage) 网络请求

在给定的路径上支持 WebSocket 连接。

## 配置项

### config.host

- 类型：`string`
- 默认值：`'127.0.0.1'`

服务器监听的 IP 地址。如果将此设置为 `0.0.0.0` 将监听所有地址，包括局域网和公网地址。

### config.port

- 类型：`number`
- 必需选项

要监听的初始端口号。Koishi 建议使用 `5140` 作为默认端口。

### config.maxPort

- 类型：`number`
- 默认值：[`config.port`](#config-port)

允许监听的最大端口号。插件启动时，如果设定的端口号被占用，插件会尝试自动切换到下一个端口，直到找到一个可用的端口，或是超出 `maxPort` 的限制。

### config.selfUrl

- 类型：`string`

Koishi 服务暴露在公网的地址。部分插件 (例如 [adapter-telegram](../adapter/telegram.md) 或是 [assets-local](https://assets.koishi.chat/plugins/local.html)) 需要用到。
