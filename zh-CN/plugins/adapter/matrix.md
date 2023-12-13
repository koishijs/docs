# @koishijs/plugin-adapter-matrix

::: warning
在接入之前，你需要准备一个带有 SSL 证书的公网域名，并将 Koishi [部署到公网](../../manual/recipe/server.md)。
:::

## 接入方式

1. 参考 [此链接](https://spec.matrix.org/unstable/application-service-api/#registration) 编写 `registry.yaml` 文件：

```yaml
id: koishi                    # Application Service 的 ID
hs_token:                     # 填入任意内容，与配置文件相对应，请确保不会泄漏
as_token:                     # 填入任意内容，与配置文件相对应，请确保不会泄漏
url:                          # 你的机器人地址，通常是 {selfUrl}/matrix
sender_localpart: koishi      # 不能与机器人的 ID 相同
namespaces:
  users:
  - exclusive: true
    # 这里填入你的机器人的 userId
    # 如果需要同时接入多个 matrix 机器人，请使用正则表达式
    regex: '@koishi:matrix.example.com'
```

2. 将 `registry.yaml` 添加进你的服务器 (如 synapse 则使用 `app_service_config_files` 配置项来指向 `registry.yaml` 并重启服务器)
3. 在控制台中配置本插件，`host` 填入你的 Homeserver 域名，`hs_token`, `as_token` 上述文件中的对应值，`id` 填入任意值 (需要与 `sender_localpart` 不同)
4. 安装 [koishi-plugin-verifier](https://common.koishi.chat/plugins/verifier.html) (或其他自助通过群组邀请的插件)
5. 在房间中邀请机器人 (机器人的 ID 为 `@${id}:${host}`)

## 配置项

### options.id

- 类型: `string`
- 必需参数

机器人的 ID。机器人最后的用户名将会是 `@{id}:{host}`。请注意不能与上面的 `sender_localpart` 相同。

### options.host

- 类型: `string`
- 必需参数

Matrix Homeserver 域名。

### options.hsToken

- 类型: `string`
- 必需参数

与上述文件中的 `hs_token` 对应。

### options.asToken

- 类型: `string`
- 必需参数

与上述文件中的 `as_token` 对应。

### options.endpoint

- 类型: `string`

Matrix Homeserver 地址。默认为 `https://{host}`。

### options.name

- 类型: `string`

机器人的名称，如果设置了将会在启动时为机器人更改。

### options.avatar

- 类型: `string`

机器人的头像地址，如果设置了将会在启动时为机器人更改。
