# 网络服务 (Router)

::: danger
`ctx.router` 需要手动声明为 `inject`。在未来的版本，我们将会把此服务移至插件中。
:::

::: tip
Koishi 默认情况下并不会监听任何端口，如要启用网络服务请记得配置 [`options.port`](../core/app.md#options-port)。
:::

`ctx.router` 是 Koishi 的内置服务，提供了一个基于 [Koa Router](https://github.com/koajs/router) 的简单路由系统，用于管理 Koishi 应用收到的网络请求。除了 Koa Router 所支持的部分方法外，Router API 还提供了一些额外的功能，例如支持接受 WebSocket 连接等。

::: warning
请避免使用未在本页列出的方法：

1. Koa Router 的 API 并不是副作用安全的。我们对本页列出的方法进行了特殊处理，使其在插件卸载时自动删除路由。但使用其他方法会导致你的插件无法被正常卸载。
2. 未来可能会不基于 Koa Router 重新实现路由系统。
:::

## 实例方法

### ctx.router\[method\](path, middleware)

- **method:** 可以是 `get`, `post`, `put`, `delete`, `patch` 或 `all` (仅能是小写)
- **path:** `string | RegExp | (string | RegExp)[]` 路径
- **middleware:** `Function` Koa 中间件

处理特定路径上的网络请求。具体请参见 [这里](https://github.com/koajs/router/blob/master/API.md)。

### ctx.router\.ws(path, handler)

- **path:** `string | RegExp | (string | RegExp)[]` 路径
- **handler:** `WebSocketHandler` 处理函数，接受下列参数
  - **socket:** [`WebSocket`](https://github.com/websockets/ws/blob/master/doc/ws.md#class-websocket) WebSocket 连接
  - **request:** [`IncomingMessage`](https://nodejs.org/api/http.html#class-httpincomingmessage) 网络请求

在给定的路径上支持 WebSocket 连接。
