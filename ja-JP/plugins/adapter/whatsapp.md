# @koishijs/plugin-adapter-whatsapp

## 接入方式

1. 前往 [商务平台](https://business.facebook.com/) 创建业务账户，并在 [业务设置](https://business.facebook.com/settings/security) 完成组织验证
2. 参照 [官方入门指南](https://developers.facebook.com/docs/whatsapp/cloud-api/get-started) 进行操作
3. 阅读 [Business API 概览](https://developers.facebook.com/docs/whatsapp/business-management-api/get-started)，创建系统用户访问口令，在 Available Permissions 中勾选 `whatsapp_business_messaging` 和 `whatsapp_business_management`，填入插件的 `systemToken` 字段。在当前页面，点击 Add assets，在左侧 Apps 菜单选中创建的 App，勾选 Develop app，点击 Save changes
4. 在 [应用面板](https://developers.facebook.com)，左侧切换至 设置-基本 页面，点击应用密钥右侧的显示按钮，复制密钥填入插件的 `systemToken` 字段。
5. 在 [商业账号](https://business.facebook.com/settings/whatsapp-business-accounts/) 页面选择生产或开发环境的账号集合，复制页面上方高亮的 ID，填入插件的 `id` 字段
6. 在官方入门指南第三步配置 Webhooks 中，Callback URL 填写机器人的 `selfUrl` 值后连接 `/whatsapp`，Verify token 可填写随机的字符串，与插件的 verifyToken 配置保持一致，启用插件后点击 Verify and save
7. 点击 Webhook 字段右侧的管理，在 messages 一行打勾

## 配置项

### config.id

- 类型：`string`
- 必选项

商户 ID。

### config.secret

- 类型：`string`
- 必选项

应用密钥。

### config.systemToken

- 类型：`string`
- 必选项

系统用户访问令牌。

### config.verifyToken

- 类型：`string`
- 必选项

Webhook 验证令牌。
