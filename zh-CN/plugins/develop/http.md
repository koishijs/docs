# @koishijs/plugin-http

::: tip
如果想要使用代理，可以使用 [@koishijs/plugin-proxy-agent](./proxy-agent.md) 插件。
:::

@koishijs/plugin-http 提供了 `ctx.http` 基础服务，其上封装了一套基于 [fetch](https://developer.mozilla.org/zh-CN/docs/Web/API/Fetch_API) 的网络请求 API。

你可能会有这样的疑问：为什么不直接使用 fetch，而是使用 `ctx.http`？这是因为许多插件都需要发起网络请求，而诸如代理、超时等配置又通常是插件无关的。因此我们为这些通用需求提供了统一的配置，各个插件则只需要调用 `ctx.http` 即可，不用关心复杂多变的用户需求。

## 实例方法

### ctx.http(method, url, config)

- **method:** `string` 请求方法
- **url:** `string` 请求地址
- **config:** `RequestConfig` 配置项
- 返回值: `Promise<any>`

### ctx.http.head(url, config)
### ctx.http.get(url, config)
### ctx.http.delete(url, config)

- **url:** `string` 请求地址
- **config:** `RequestConfig` 配置项
- 返回值: `Promise<any>`

发送 HEAD / GET / DELETE 请求。

### ctx.http.post(url, data, config)
### ctx.http.put(url, data, config)
### ctx.http.patch(url, data, config)

- **url:** `string` 请求地址
- **data:** `any` 请求数据
- **config:** `RequestConfig` 配置项
- 返回值: `Promise<any>`

发送 POST / PUT / PATCH 请求。

### ctx.http\.ws(url)

- **url:** `string` 请求地址
- 返回值: `WebSocket`

创建一个 WebSocket 连接。
