# Collaborate with Chat Platforms

Koishi uses adapter plugins to support various chat platforms. The commonly used adapter plugins have been pre-installed in Koishi, you can find them in the category "Adapter" in the *Plugin Configuration* page. You could also search for any other adapter plugins from *Plugin Market* before enabling them in Koishi.

Koishi is able to maintain multiple bot accounts of different chat platforms in the same process. Each configuration copy of the corresponding adapter plugin maintains the bot account instance, you could add new configurations of adapter plugin according to [Add More Plugins](./market.md#添加更多插件). User data is shared by bots that connected to the same chat platform. So it is available to achieve a load balance by changing the current active bot account between them.

There are different configuration work that you need to do with different platforms. The following is a guide to connect your bot in various platforms.

## Discord

1. Go to [Discord Developer Portal](https://discord.com/developers/applications), log yourself in and then create an application.
2. Click "Bot" and then create a new Bot, copy the `token` in this page (DO NOT share it to anyone).
3. To invite your bot into your server, click "OAuth2" and check the permissions that required for your bot in URL Generator, make sure "Bot" to be checked.
4. Open the link that you generated above, select the server that you have the admin permissions, then you could add your bot into the server successfully.
5. Enter the `token` into the plugin configuration.

See also: [@koishijs/plugin-adapter-discord](../../plugins/adapter/discord.md)

## KOOK

1. Go to the [Kook Developer Platform](https://developer.kookapp.cn/)to "应用"(App) and click "新建"(New)
2. After entering the app's name, click "机器人"(Bot). Then save the `token` in the page (DO NOT share it to anyone).
3. Enter the `token` into the plugin configuration.

See also: [@koishijs/plugin-adapter-kook](../../plugins/adapter/kook.md)

## Lark / Feishu

1. Go to Lark Developer ([Lark](https://open.larksuite.com/app/) / [Feishu](https://open.feishu.cn/app/)) and click "Create Custom App", then click the corresponding application name to enter app details page.
2. Click "Credentials & Basic Info" on the left side, copy the value of App ID and App Secret, then paste them into the plugin configuration items accordingly.
3. Click "Event Subscription", copy the value of Encrypt Key and Verification Token, then paste them into the plugin configuration items accordingly.
4. In the event subscription page, enable the `Receive message v2.0` (`im.message.receive_v1`) event.
5. Configure the `selfUrl` of the plugin itself or of the global with your actual environment requirement, then enable the plugin.
6. Take the value in step 5 appended with the value of `path`, paste into the "Request URL" in the "Event Subscription" page in the Lark Developer Console.
7. If you didn't pass the URL challenge that Lark requires, please make sure you have configured the URL correctly.

See also: [@koishijs/plugin-adapter-lark](../../plugins/adapter/lark.md)

## LINE

1. 在 [LINE 开发者控制台](https://developers.line.biz/console/) 注册账号，创建一个新的 Provider，在 Provider 中创建一个 Channel，类型选择 Messaging API，输入相关信息
2. 在 Basic settings 页面找到 Channel secret，填入插件的 secret 字段
3. 在 Messaging API 页面底部 Channel access token 处点击 Issue 创建 token，填入插件的 token 字段
4. 根据使用需求可在上方的 Allow bot to join group chats (允许机器人加入群组) 处点击 Edit，在新页面中找到 Toggle features 一栏，第一对单选框选择 Allow
5. 在 Messaging API 页面底部，根据使用需求点击 Auto-reply messages 或者 Greeting messages 的修改按钮，在新页面中可设置是否启用平台自带的自动回复或问候消息
6. 在 Security 页面推荐配置白名单 IP
7. 启动插件，打开 Messaging API 页面，勾选 Use webhook

参考：[@koishijs/plugin-adapter-line](../../plugins/adapter/line.md)

## Mail

1. `username` 对应你的邮箱账号，`password` 对应你的授权码
2. `imap` 对应接收邮件服务器，`smtp` 对应发送邮件服务器，需要分别填写对应的 `host` 和 `port`
3. Different email services also get authorization code in different ways and can be configured by reference to the mainstream mail service below

See also: [@koishijs/plugin-adapter-mail](../../plugins/adapter/mail.md)

### QQ Mail

- Incoming mail server: `imap.qq.com`, port `993`
- Sending mail server: `smtp.qq.com`, port `465` or `587`
- Reference [what is the authorization code, and how is it set?](https://service.mail.qq.com/detail/0/75)

### Netease 163

- Incoming mail server: `imap.163.com`, port `993`
- Sending mail server: `smtp.163.com`, port `465` or `994`
- Reference：[Netease 163 service](https://mail.163.com/html/110127_imap/index.htm)

### Outlook

- Incoming mail server: `outlook.office365.com`, port `993`
- Sending mail server: `smtp-mail.outlook.com`, port `587`
- Reference [POP, IMAP, and SMTP settings for Outlook.com](https://support.microsoft.com/zh-cn/office/outlook-com-%E7%9A%84-pop-imap-%E5%92%8C-smtp-%E8%AE%BE%E7%BD%AE-d088b986-291d-42b8-9564-9c414e2aa040)

### Gmail

- Incoming mail server: `imap.gmail.com`, port `993`
- Sending mail server: `smtp.gmail.com`, port `465`
- Reference: [Check Gmail through other email platforms](https://support.google.com/mail/answer/7126229?hl=zh-Hans#zippy=%2C%E7%AC%AC-%E6%AD%A5%E6%A3%80%E6%9F%A5-imap-%E6%98%AF%E5%90%A6%E5%B7%B2%E5%90%AF%E7%94%A8%2C%E7%AC%AC-%E6%AD%A5%E5%9C%A8%E7%94%B5%E5%AD%90%E9%82%AE%E4%BB%B6%E5%AE%A2%E6%88%B7%E7%AB%AF%E4%B8%AD%E6%9B%B4%E6%94%B9-smtp-%E5%92%8C%E5%85%B6%E4%BB%96%E8%AE%BE%E7%BD%AE)

## Matrix

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

参考：[@koishijs/plugin-adapter-matrix](../../plugins/adapter/matrix.md)

## OneBot

We will only talk about the most widely-used approach to configure [go-cqhttp](https://github.com/Mrs4s/go-cqhttp).

1. Fill in the bot account ID in `selfId` field.
2. Enable the  `gocqhttp.enable` option.
3. Click "Enable" button, then follow the prompted tutorial to complete the configuration.

See also: [@koishijs/plugin-adapter-onebot](../../plugins/adapter/onebot.md)

## QQ Guild

1. Sign up at the [QQ Channel Management Backend](https://bot.q.qq.com/open/#/type?appType=2)
2. Sign in the [Management Backend](https://bot.q.qq.com/open/#/botlogin) and create an official bot
3. After finished creating, get the bot basic information on the [Channel Bot Development Settings](https://bot.q.qq.com/#/developer/developer-setting)
4. Enter these basic information above into the plugin configuration to complete

See also: [@koishijs/plugin-adapter-qqguild](../../plugins/adapter/qqguild.md)

## Telegram

1. Search **@botfather** (with an official sign) and enter the chat
2. After entering `start`, a menu will appear. You can use commands to configure your bot here.
3. To create a bot, click `/newbot` and follow the instructions to finish the process of creation.
4. Use `/setprivacy` to enable Privacy Mode (otherwise the bot will only receive specific messages)
5. Once created, you will get a `token` (DO NOT share it to anyone). Enter them into the plugin configuration to use.

See also: [@koishijs/plugin-adapter-telegram](../../plugins/adapter/telegram.md)
