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
2. 输入应用名称后，点击「机器人」，保存这个页面中的 `token` (请注意不要泄露)
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

## Mail

1. The 'username' corresponds to your email account, 'password' to your authorization code
2. 'imap' for incoming mail, 'smtp' for sending mail, requires 'host' and 'port'
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

## OneBot

We will only talk about the most widely-used approach to configure [go-cqhttp](https://github.com/Mrs4s/go-cqhttp).

1. Fill in the bot account ID in `selfId` field.
2. Enable the  `gocqhttp.enable` option.
3. Click "Enable" button, then follow the prompted tutorial to complete the configuration.

See also: [@koishijs/plugin-adapter-onebot](../../plugins/adapter/onebot.md)

## QQ Guild

1. 前往 [QQ 频道管理后台](https://bot.q.qq.com/open/#/type?appType=2) 注册
2. 登陆进入 [机器人管理后台](https://bot.q.qq.com/open/#/botlogin) 并创建官方机器人
3. 创建完成后，在 [频道机器人开发设置](https://bot.q.qq.com/#/developer/developer-setting) 获取机器人基本数据
4. 将上面的基本数据填入插件配置即可使用

See also: [@koishijs/plugin-adapter-qqguild](../../plugins/adapter/qqguild.md)

## Telegram

1. 搜索 **@botfather** (有个官方认证的符号) 并进入聊天界面
2. 输入 `/start` 后，会出现一个使用菜单，你可以使用这里指令对你的机器人进行配置
3. 要创建一个机器人，请点击 `/newbot`，并根据系统提示完成创建流程
4. 使用 `/setprivacy` 开启 Privacy Mode (不然机器人只能收到特定消息)
5. 创建完毕后，你会获得一个 `token` (请注意不要泄露)，将其填入插件配置即可使用

See also: [@koishijs/plugin-adapter-telegram](../../plugins/adapter/telegram.md)
