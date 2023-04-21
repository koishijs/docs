# Collaborate with Chat Platforms

Koishi uses adapter plugins to support various chat platforms. The commonly used adapter plugins have been pre-installed in Koishi, you can find them in the "Adapter" tag in Plugin Configuration page. If you didn't find one adapter you need, you could also search for and add other adapters from Plugin Market.

一个 Koishi 应用可以同时接入多个聊天平台的多个账号。一个 Koishi 应用可以同时接入多个聊天平台的多个账号。One plugin configurations are bound with one bot account, you could add any new plugin configurations according to [Add More Plugins](./market.md#添加更多插件).User data is shared by multiple bots that connected to the same chat platform.So you could easily switch between bot accounts to achieve a load balance.

对于不同的平台，你需要做好相应的准备工作。The following is a guide to connect your bot in various platforms.The following is a guide to connect your bot in various platforms.

## Discord

1. Go to [Discord Developer Portal](https://discord.com/developers/applications), log yourself in and then create an application.
2. Click "Bot" and then create a new Bot, copy the `token` in this page (DO NOT share it to anyone).
3. To invite your bot into your server, click "OAuth2" and check the permissions that required for your bot in URL Generator, make sure "Bot" to be checked.
4. Open the link that you generated above, select the server that you have the admin permissions, then you could add your bot into the server successfully.
5. Enter the `token` into the plugin configuration.

See also: [@koishijs/plugin-adapter-discord](../../plugins/adapter/discord.md)

## Lark / Feishu

1. 在开发者后台 ([飞书](https://open.feishu.cn/app/), [Lark](https://open.larksuite.com/app/)) 点击「新建企业自建应用」，点击应用名称进入应用详情页
2. 点击凭证与基础信息，获取 App ID 和 App Secret 值，填写到插件配置对应字段
3. 点击事件订阅，获取 Encrypt Key 和 Verification Token 值，填写到插件配置对应字段
4. 在事件订阅页面，确保添加了 `接收消息v2.0` (`im.message.receive_v1`) 事件
5. 按实际情况配置插件或机器人全局的 `selfUrl` 值，然后启动插件
6. 将第 5 步中配置的值加上 `path` 的值，填写到飞书开发者后台事件订阅页面的「请求地址配置」中，并点击完成
7. 若第 6 步的 URL 验证未通过，请检查你所配置的地址是否正确

See also: [@koishijs/plugin-adapter-lark](../../plugins/adapter/lark.md)

## KOOK

1. 前往 [开发者平台](https://developer.kookapp.cn/)，前往「应用」并点击「新建」
2. 输入应用名称后，点击「机器人」，保存这个页面中的 `token` (请注意不要泄露)
3. 将上面的 `token` 填入插件配置即可使用

See also: [@koishijs/plugin-adapter-kook](../../plugins/adapter/kook.md)

## OneBot

这里只介绍最常见的 [go-cqhttp](https://github.com/Mrs4s/go-cqhttp) 配置方法。

1. 在 `selfId` 填写机器人账号
2. 开启 `gocqhttp.enable` 选项
3. 点击「启用」，并跟随提示完成后续配置

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
