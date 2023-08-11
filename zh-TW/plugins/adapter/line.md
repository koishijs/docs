# @koishijs/plugin-adapter-line

## 接入方法

1. 在 [LINE 開發者控制檯](https://developers.line.biz/console/) 註冊賬號，建立一個新的 Provider，在 Provider 中建立一個 Channel，型別選擇 Messaging API，輸入相關資訊
2. 在 Basic settings 頁面找到 Channel secret，填入外掛的 secret 欄位
3. 在 Messaging API 頁面底部 Channel access token 處點選 Issue 建立 token，填入外掛的 token 欄位
4. 根據使用需求可在上方的 Allow bot to join group chats (允許機器人加入群組) 處點選 Edit，在新頁面中找到 Toggle features 一欄，第一對單選框選擇 Allow
5. 在 Messaging API 頁面底部，根據使用需求點選 Auto-reply messages 或者 Greeting messages 的修改按鈕，在新頁面中可設定是否啟用平臺自帶的自動回覆或問候訊息
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
