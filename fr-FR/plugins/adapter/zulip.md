# @koishijs/plugin-adapter-zulip

## 接入指南

1. 登录自己的 Zulip 社群，右上角设置按钮选择「个人设置」，在弹窗左侧进入「机器人」，点击「新增机器人」输入相关信息后点击新增。
2. 在界面中找到新创建的机器人，复制机器人邮箱填入插件的 `email` 字段，复制 API KEY 填入插件的 `key` 字段。

## 配置项

### config.email

- 类型: `string`
- 必需字段

机器人邮箱。

### config.key

- 类型: `string`
- 必需字段

机器人 API 密钥。
