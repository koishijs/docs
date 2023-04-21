# HTTP

`ctx.http` is a built-in service that encapsulates network request APIs based on [axios](https://github.com/axios/axios).

你可能会有这样的疑问：为什么不直接使用 axios，而是使用 `ctx.http`？这是因为许多插件都需要发起网络请求，而诸如代理、超时等配置又通常是插件无关的。因此我们为这些通用需求提供了 [全局的配置项](../../api/core/app.html#options-request-proxyagent)，各个插件则只需要调用 `ctx.http` 即可。

## 实例方法

### ctx.http(method, url, config)

- **method:** `string` 请求方法
- **url:** `string` 请求地址
- **config:** `AxiosRequestConfig` 配置项
- 返回值: `Promise<any>`

### ctx.http.axios(url, config)

- **url:** `string` 请求地址
- **config:** `AxiosRequestConfig` 配置项
- 返回值: `Promise<AxiosResponse<any>>`

### ctx.http.head(url, config)
### ctx.http.get(url, config)
### ctx.http.delete(url, config)

- **url:** `string` 请求地址
- **config:** `AxiosRequestConfig` 配置项
- 返回值: `Promise<any>`

发送 HEAD / GET / DELETE 请求。

### ctx.http.post(url, data, config)
### ctx.http.put(url, data, config)
### ctx.http.patch(url, data, config)

- **url:** `string` 请求地址
- **data:** `any` 请求数据
- **config:** `AxiosRequestConfig` 配置项
- 返回值: `Promise<any>`

发送 POST / PUT / PATCH 请求。

### ctx.http\.ws(url)

- **url:** `string` 请求地址
- 返回值: `WebSocket`

创建一个 WebSocket 连接。
