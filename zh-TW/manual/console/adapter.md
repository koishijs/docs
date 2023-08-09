# 接入聊天平臺

Koishi 使用適配器插件來支持各種聊天平臺。其中，常用的適配器插件已經預裝在了 Koishi 中，你可以在插件配置中的 adapter 分組中找到他們。如果這裏沒有你想要的適配器，你可以在插件市場中搜索並添加更多適配器。

一個 Koishi 應用可以同時接入多個聊天平臺的多個賬號。每個賬號對應一份插件配置，你可以參考 [添加更多插件](./market.md#添加更多插件) 中的方法添加新的插件配置。由於同一平臺內接入的多個機器人共享了相同的用戶數據。因此，你可以非常方便地在多個機器人之間切換以實現負載均衡。

對於不同的平臺，你需要做好相應的準備工作。以下是各個平臺的接入指南。

## Discord

1. 前往 [開發者後臺](https://discord.com/developers/applications)，登錄賬號創建一個應用
2. 點擊「Bot」並創建一個新的機器人，保存這個頁面中的 `token` (請註意不要泄露)
3. 要將機器人拉進你的服務器，點擊「OAuth2」，並在網址生成器中勾選 Bot 和機器人所需要的權限
4. 打開生成的鏈接，選擇你具有管理權限的服務器，就成功把機器人添加進去了
5. 將上面的 `token` 填入插件配置即可使用

參考：[@koishijs/plugin-adapter-discord](../../plugins/adapter/discord.md)

## KOOK

1. 前往 [開發者平臺](https://developer.kookapp.cn/)，前往「應用」並點擊「新建」
2. 輸入應用名稱後，點擊「機器人」，保存這個頁面中的 `token` (請註意不要泄露)
3. 將上面的 `token` 填入插件配置即可使用

參考：[@koishijs/plugin-adapter-discord](../../plugins/adapter/kook.md)

## Lark / 飛書

1. 在開發者後臺 ([Lark](https://open.larksuite.com/app/) / [飛書](https://open.feishu.cn/app/)) 點擊「新建企業自建應用」，點擊應用名稱進入應用詳情頁
2. 點擊憑證與基礎信息，獲取 App ID 和 App Secret 值，填寫到插件配置對應字段
3. 點擊事件訂閱，獲取 Encrypt Key 和 Verification Token 值，填寫到插件配置對應字段
4. 在事件訂閱頁面，確保添加了 `接收消息v2.0` (`im.message.receive_v1`) 事件
5. 按實際情況配置插件或機器人全局的 `selfUrl` 值，然後啟動插件
6. 將第 5 步中配置的值加上 `path` 的值，填寫到飛書開發者後臺事件訂閱頁面的「請求地址配置」中，並點擊完成
7. 若第 6 步的 URL 驗證未通過，請檢查你所配置的地址是否正確

參考：[@koishijs/plugin-adapter-lark](../../plugins/adapter/lark.md)

## LINE

1. 在 [LINE 開發者控制檯](https://developers.line.biz/console/) 註冊賬號，建立一個新的 Provider，在 Provider 中建立一個 Channel，型別選擇 Messaging API，輸入相關資訊
2. 在 Basic settings 頁面找到 Channel secret，填入外掛的 secret 欄位
3. 在 Messaging API 頁面底部 Channel access token 處點選 Issue 建立 token，填入外掛的 token 欄位
4. 根據使用需求可在上方的 Allow bot to join group chats (允許機器人加入群組) 處點選 Edit，在新頁面中找到 Toggle features 一欄，第一對單選框選擇 Allow
5. 在 Messaging API 頁面底部，根據使用需求點選 Auto-reply messages 或者 Greeting messages 的修改按鈕，在新頁面中可設定是否啟用平臺自帶的自動回覆或問候訊息
6. 在 Security 頁面推薦配置白名單 IP
7. 啟動外掛，開啟 Messaging API 頁面，勾選 Use webhook

參考：[@koishijs/plugin-adapter-line](../../plugins/adapter/line.md)

## 郵件

1. `username` 對應你的郵箱賬號，`password` 對應你的授權碼
2. `imap` 對應接收郵件伺服器，`smtp` 對應傳送郵件伺服器，需要分別填寫對應的 `host` 和 `port`
3. 不同郵箱服務獲取授權碼的方式也有所不同，可以參考下面的主流郵件服務進行配置

參考：[@koishijs/plugin-adapter-mail](../../plugins/adapter/mail.md)

### QQ 郵箱

- 接收郵件服務器：`imap.qq.com`，端口號 `993`
- 發送郵件服務器：`smtp.qq.com`，端口號 `465` 或 `587`
- 參考：[什麼是授權碼，它又是如何設置？](https://service.mail.qq.com/detail/0/75)

### 網易 163 郵箱

- 接收郵件服務器：`imap.163.com`，端口號 `993`
- 發送郵件服務器：`smtp.163.com`，端口號 `465` 或 `994`
- 參考：[網易郵箱 IMAP 服務](https://mail.163.com/html/110127_imap/index.htm)

### Outlook

- 接收郵件服務器：`outlook.office365.com`，端口號 `993`
- 發送郵件服務器：`smtp-mail.outlook.com`，端口號 `587`
- 參考：[Outlook.com 的 POP、IMAP 和 SMTP 設置](https://support.microsoft.com/zh-cn/office/outlook-com-%E7%9A%84-pop-imap-%E5%92%8C-smtp-%E8%AE%BE%E7%BD%AE-d088b986-291d-42b8-9564-9c414e2aa040)

### Gmail

- 接收郵件服務器：`imap.gmail.com`，端口號 `993`
- 發送郵件服務器：`smtp.gmail.com`，端口號 `465`
- 參考：[通過其他電子郵件平臺查看 Gmail](https://support.google.com/mail/answer/7126229?hl=zh-Hans#zippy=%2C%E7%AC%AC-%E6%AD%A5%E6%A3%80%E6%9F%A5-imap-%E6%98%AF%E5%90%A6%E5%B7%B2%E5%90%AF%E7%94%A8%2C%E7%AC%AC-%E6%AD%A5%E5%9C%A8%E7%94%B5%E5%AD%90%E9%82%AE%E4%BB%B6%E5%AE%A2%E6%88%B7%E7%AB%AF%E4%B8%AD%E6%9B%B4%E6%94%B9-smtp-%E5%92%8C%E5%85%B6%E4%BB%96%E8%AE%BE%E7%BD%AE)

## OneBot

這裏只介紹最常見的 [go-cqhttp](https://github.com/Mrs4s/go-cqhttp) 配置方法。

1. 在 `selfId` 填寫機器人賬號
2. 開啟 `gocqhttp.enable` 選項
3. 點選「啟用」，並跟隨提示完成後續配置

參考：[@koishijs/plugin-adapter-onebot](../../plugins/adapter/onebot.md)

## QQ 頻道

1. 前往 [QQ 頻道管理後臺](https://bot.q.qq.com/open/#/type?appType=2) 註冊
2. 登陸進入 [機器人管理後臺](https://bot.q.qq.com/open/#/botlogin) 並建立官方機器人
3. 建立完成後，在 [頻道機器人開發設定](https://bot.q.qq.com/#/developer/developer-setting) 獲取機器人基本資料
4. 將上面的基本資料填入外掛配置即可使用

參考：[@koishijs/plugin-adapter-qqguild](../../plugins/adapter/qqguild.md)

## Telegram

1. 搜尋 **@botfather** (有個官方認證的符號) 並進入聊天介面
2. 輸入 `/start` 後，會出現一個使用選單，你可以使用這裡指令對你的機器人進行配置
3. 要建立一個機器人，請點選 `/newbot`，並根據系統提示完成建立流程
4. 使用 `/setprivacy` 開啟 Privacy Mode (不然機器人只能收到特定訊息)
5. 建立完畢後，你會獲得一個 `token` (請注意不要洩露)，將其填入外掛配置即可使用

參考：[@koishijs/plugin-adapter-telegram](../../plugins/adapter/telegram.md)
