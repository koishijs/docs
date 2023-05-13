# Collaborate with Chat Platforms

Koishi uses adapter plugins to support various chat platforms. The commonly used adapter plugins have been pre-installed in Koishi, you can find them in the "Adapter" tag in Plugin Configuration page. If you didn't find one adapter you need, you could also search for and add other adapters from Plugin Market.

A Koishi process is able to connect to multiple accounts of different chat platforms. One plugin configurations are bound with one bot account, you could add any new plugin configurations according to [Add More Plugins](./market.md#添加更多插件). User data is shared by multiple bots that connected to the same chat platform. So you could easily switch between bot accounts to achieve a load balance.

There are different configuration work that you need to do with different platforms. The following is a guide to connect your bot in various platforms.

## Discord

1. Go to [Discord Developer Portal](https://discord.com/developers/applications), log yourself in and then create an application.
2. Click "Bot" and then create a new Bot, copy the `token` in this page (DO NOT share it to anyone).
3. To invite your bot into your server, click "OAuth2" and check the permissions that required for your bot in URL Generator, make sure "Bot" to be checked.
4. Open the link that you generated above, select the server that you have the admin permissions, then you could add your bot into the server successfully.
5. Enter the `token` into the plugin configuration.

See also: [@koishijs/plugin-adapter-discord](../../plugins/adapter/discord.md)

## Lark / Feishu

1. Go to the Developer Console ([Feishu](https://open.feishu.cn/app/), [Lark](https://open.larksuite.com/app/)) and click "Create Custom App", and then click the name of the Custom App that you just created to get into the application management page.
2. Click "Credentials & Basic Info" on the left side, copy the value of App ID and App Secret, then paste them into the plugin configuration items accordingly.
3. Click "Event Subscription", copy the value of Encrypt Key and Verification Token, then paste them into the plugin configuration items accordingly.
4. In the event subscription page, enable the `Receive message v2.0` (`im.message.receive_v1`) event.
5. Configure the `selfUrl` of the plugin itself or of the global with your actual environment requirement, then enable the plugin.
6. Take the value in step 5 appended with the value of `path`, paste into the "Request URL" in the "Event Subscription" page in the Lark Developer Console.
7. If you didn't pass the URL challenge that Lark requires, please make sure you have configured the URL correctly.

See also: [@koishijs/plugin-adapter-lark](../../plugins/adapter/lark.md)

## KOOK

1. 前往 [开发者平台](https://developer.kookapp.cn/)，前往「应用」并点击「新建」
2. 输入应用名称后，点击「机器人」，保存这个页面中的 `token` (请注意不要泄露)
3. Enter the `token` into the plugin configuration.

See also: [@koishijs/plugin-adapter-kook](../../plugins/adapter/kook.md)

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
