# App

**应用 (App)** 是程序的入口。可以通过 `new Context()` 构造或通过 `ctx.root` 访问。

本节中介绍的配置项可用于传入构造函数，也可以在配置文件或控制台中进行修改。

## 网络设置

### options.host

- 类型：`string`
- 默认值：`'127.0.0.1'`

服务器监听的 IP 地址。如果将此设置为 `0.0.0.0` 将监听所有地址，包括局域网和公网地址。

### options.port

- 类型：`number`

要监听的初始端口号。

### options.maxPort

- 类型：`number`
- 默认值：[`options.port`](#options-port)

允许监听的最大端口号。

### options.selfUrl

- 类型：`string`

Koishi 服务暴露在公网的地址。部分功能（例如 [adapter-telegram](../../plugins/adapter/telegram.md) 或是 [plugin-assets-local](https://assets.koishi.chat/plugins/local.html)）需要用到。

## 基础设置

### options.prefix

- 类型：`Computed<string | string[]>`
- 默认值：`['']`

指令前缀字符，可以是字符串或字符串数组。将用于指令前缀的匹配。例如，如果配置该选项为 `.`，则你可以通过 `.help` 来进行 help 指令的调用。参见 [触发前缀](../../manual/usage/command.md#触发前缀) 一节。

### options.nickname

- 类型：`string | string[]`
- 默认值：`[]`

机器人的昵称，可以是字符串或字符串数组。将用于指令前缀的匹配。例如，如果配置该选项为 `'恋恋'`，则你可以通过 `恋恋，help` 来进行 help 指令的调用。参见 [触发前缀](../../manual/usage/command.md#触发前缀) 一节。

### options.autoAssign

- 类型：`Computed<boolean>`
- 默认值：`true`

当获取不到频道数据时，是否将接收到消息的机器人设置为该频道的受理人。

### options.autoAuthorize

- 类型：`Computed<number>`
- 默认值：`1`

当获取不到用户数据时默认使用的权限等级。

### options.minSimilarity

- 类型：`number`
- 默认值：`1`

用于模糊匹配的相似系数，应该是一个 0 到 1 之间的数值。数值越高，模糊匹配越严格。设置为 1 可以完全禁用模糊匹配。参见 [模糊匹配](../../manual/recipe/execution.md#模糊匹配) 一节。

### options.delay

- 类型：`DelayOptions`

```ts
// 所有配置项的单位均为毫秒
interface DelayOptions {
  // 调用 session.sendQueued() 时消息间发送的最小延迟，按前一条消息的字数计算，默认值为 0
  character?: number
  // 调用 session.sendQueued() 时消息间发送的最小延迟，按固定值计算，默认值为 100
  message?: number
  // 调用 session.cancelQueued() 时默认的延迟，默认值为 0
  cancel?: number
  // 调用 bot.broadcast() 时默认的延迟，默认值为 500
  broadcast?: number
  // 调用 session.prompt() 是默认的等待时间，默认值为 60000
  prompt?: number
}
```

## 国际化设置

### options.i18n.locales {#i18n-locales}

- 类型：`string[]`

可用的语言列表。按照回退顺序排列。

### options.i18n.output {#i18n-output}

- 类型：`string`

输出语言偏好设置。可选值包括：

- `prefer-user`: 优先使用用户语言
- `prefer-channel`: 优先使用频道语言

## 请求设置

### options.request.proxyAgent

- 类型: `string`

配置请求时默认使用的网络代理。

## 配置文件选项

:::warning
下面的配置项来自 Koishi 的命令行工具，仅可在配置文件中编辑，不支持在控制台中修改。
:::

### options.plugins

- 类型：`Record<string, any>`

要安装的插件列表。以传入的对象的键为插件名，值为插件的选项进行安装。参见：

- [开发 > 开发起步 > 配置文件](../../guide/develop/config.md)
- [开发 > 模块化 > 认识插件](../../guide/plugin/index.md)

### options.logger

- 类型：`Logger.Config`

参见 [输出日志](../utils/logger.md) 一节。
