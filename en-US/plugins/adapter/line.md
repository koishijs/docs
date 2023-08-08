# @koishijs/plugin-adapter-line

## 接入方法

1. 在 [LINE 开发者控制台](https://developers.line.biz/console/) 注册账号，创建一个新的 Provider，在 Provider 中创建一个 Channel，类型选择 Messaging API，输入相关信息
2. 在 Basic settings 页面找到 Channel secret，填入插件的 secret 字段
3. 在 Messaging API 页面底部 Channel access token 处点击 Issue 创建 token，填入插件的 token 字段
4. 根据使用需求可在上方的 Allow bot to join group chats (允许机器人加入群组) 处点击 Edit，在新页面中找到 Toggle features 一栏，第一对单选框选择 Allow
5. 在 Messaging API 页面底部，根据使用需求点击 Auto-reply messages 或者 Greeting messages 的修改按钮，在新页面中可设置是否启用平台自带的自动回复或问候消息
6. 在 Security 页面推荐配置白名单 IP
7. 启动插件，打开 Messaging API 页面，勾选 Use webhook

参考文档：<https://developers.line.biz/en/docs/messaging-api/getting-started/>

## 配置项

### options.token

- 类型：`string`

机器人令牌。

### options.secret

- 类型：`string`

机器人密钥。
