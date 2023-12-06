# @koishijs/plugin-adapter-wechat-official

## 接入方法

1. 根据 [注册流程指引](https://kf.qq.com/product/weixinmp.html#hid=87) 注册公众平台。
2. 在微信公众平台登录后，页面左侧展开「设置与开发」，进入「公众号设置」，翻至页面底部，复制 `原始 ID` 填入插件的 account 字段。
3. 页面左侧进入「基本配置」，复制 `开发者ID` 填入插件的 appId 字段，在网页上获取开发者密码填入插件的 secret 字段，设置白名单 IP。
4. 页面下方启用服务器配置，将机器人的 `selfUrl` 值后连接 `/wechat-official` (如 `https://example.com/wechat-official`)，在 URL 一栏中填写；在插件配置和公众平台上填入相同的 Token；在公众平台上生成 EncodingAESKey 并填入插件的 aesKey 字段；三种消息加解密方式均可选择。
5. 如果公众号为企业主体，且通过了微信认证，可在插件配置中启用 customerService。客服接口提供了更宽松的消息回复能力。

参考文档：[https://developers.weixin.qq.com/doc/offiaccount/Basic_Information/Access_Overview.html](https://developers.weixin.qq.com/doc/offiaccount/Basic_Information/Access_Overview.html)

## 配置项

### config.account

- 类型: `string`

公众号原始 ID。

### config.appId

- 类型: `string`

AppID。

### config.secret

- 类型: `string`

AppSecret。

### config.token

- 类型: `string`

Webhook Token。

### config.aesKey

- 类型: `string`

EncodingAESKey。

### config.customerService

- 类型: `boolean`

启用客服消息回复。
