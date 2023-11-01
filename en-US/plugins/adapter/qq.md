# @koishijs/plugin-adapter-qq

QQ (official robot) adapter.

## 接入方法

1. 前往 [QQ 开放平台](https://q.qq.com) 注册账号
2. 登陆进入 [机器人管理后台](https://q.qq.com/#/app/bot) 并创建官方机器人
3. 创建完成后，在「开发设置」界面获取机器人三项基本数据 [id, token, key]
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
