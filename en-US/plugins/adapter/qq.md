# @koishijs/plugin-adapter-qq

QQ (official robot) adapter.

## 接入方法

1. Sign up at the [QQ Channel Management Backend](https://bot.q.qq.com/open/#/type?appType=2)
2. Sign in the [Management Backend](https://bot.q.qq.com/open/#/botlogin) and create an official bot
3. 创建完成后，在 [频道机器人开发设置](https://bot.q.qq.com/#/developer/developer-setting) 获取机器人基本数据 [id, token, key]
4. 将上面的基本数据作为机器人配置项即可使用

## 机器人选项

### config.id

- 类型: `string`

机器人 id。

### config.key

- 类型: `string`

机器人密钥，管理端又称呼为 secret。

### config.token

- 类型: `string`

机器人 token。

### config.type

- 类型: `'private' | 'public'`

是否为公域机器人。

### config.sandbox

- 类型: `boolean`
- 默认值: `true`

是否开启沙盒。

### config.endpoint

- 类型: `string`
- 默认值: `'https://api.sgroup.qq.com/'`

要请求的 API 网址。

### config.authType

- 类型: `'bot' | 'bearer'`
- 默认值: `'bot'`

验证方式。
