# @koishijs/plugin-adapter-wecom

## 接入方法

1. 前往 [我的企业](https://work.weixin.qq.com/wework_admin/frame#profile)，复制页面下方企业 ID，填入插件的 corpId。
2. 前往 [应用管理](https://work.weixin.qq.com/wework_admin/frame#apps) 页面下方点击创建应用，填写应用信息。
3. 复制 `AgentId` 填入插件的 agentId 字段，查看 Secret 填入插件的 `secret` 字段。
4. 在下方功能板块点击「设置 API 接收」，URL 填写机器人的 selfUrl 值后连接 `/wecom`，Token 和 EncodingAESKey 点击随机获取，分别填入插件的 `token` 和 `aesKey` 字段。先启用插件，再在「API 接收消息」页面点击保存.
5. 于页面左上角返回应用页面，在下方开发者接口板块点击「企业可信 IP」的「配置」，设置白名单 IP，确定后稍等几分钟即可使用插件。
6. 推荐在几分钟后停用并启用一次插件，以便加载出平台信息呈现在控制台内。

参考文档：<https://developer.work.weixin.qq.com/document/path/90487>

## 配置项

### config.corpId

- 类型: `string`

企业 ID。

### config.agentId

- 类型: `string`

AgentID。

### config.secret

- 类型: `string`

AppSecret。

### config.token

- 类型: `string`

Webhook Token。

### config.aesKey

- 类型: `string`

EncodingAESKey。
