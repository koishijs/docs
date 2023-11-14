# @koishijs/plugin-server-satori

@koishijs/plugin-server-satori 实现了一个 [Satori 协议](https://satori.js.org/zh-CN/) 的服务器。这个插件将允许你：

- 通过 HTTP / WebSocket 访问当前 Koishi 实例中的机器人
- 配合 [Satori 适配器](../adapter/satori.md)，在另一个 Koishi 实例中完全控制当前实例中的机器人

## 配置项

### config.path

- 类型: `string`
- 默认值: `''`

服务器监听的路径。
