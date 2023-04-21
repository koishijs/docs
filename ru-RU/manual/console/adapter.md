# 接入聊天平台

Koishi 使用适配器插件来支持各种聊天平台。其中，常用的适配器插件已经预装在了 Koishi 中，你可以在插件配置中的 adapter 分组中找到他们。如果这里没有你想要的适配器，你可以在插件市场中搜索并添加更多适配器。其中，常用的适配器插件已经预装在了 Koishi 中，你可以在插件配置中的 adapter 分组中找到他们。如果这里没有你想要的适配器，你可以在插件市场中搜索并添加更多适配器。

一个 Koishi 应用可以同时接入多个聊天平台的多个账号。每个账号对应一份插件配置，你可以参考 [添加更多插件](./market.md#添加更多插件) 中的方法添加新的插件配置。由于同一平台内接入的多个机器人共享了相同的用户数据。因此，你可以非常方便地在多个机器人之间切换以实现负载均衡。每个账号对应一份插件配置，你可以参考 [添加更多插件](./market.md#添加更多插件) 中的方法添加新的插件配置。由于同一平台内接入的多个机器人共享了相同的用户数据。因此，你可以非常方便地在多个机器人之间切换以实现负载均衡。

对于不同的平台，你需要做好相应的准备工作。以下是各个平台的接入指南。以下是各个平台的接入指南。

## Discord

1. 前往 [开发者后台](https://discord.com/developers/applications)，登录账号创建一个应用
2. 点击「Bot」并创建一个新的机器人，保存这个页面中的 `token` (请注意不要泄露)
3. 要将机器人拉进你的服务器，点击「OAuth2」，并在网址生成器中勾选 Bot 和机器人所需要的权限
4. 打开生成的链接，选择你具有管理权限的服务器，就成功把机器人添加进去了
5. 将上面的 `token` 填入插件配置即可使用

参考：[@koishijs/plugin-adapter-discord](../../plugins/adapter/discord.md)

## Lark / 飞书

1. 在开发者后台 ([飞书](https://open.feishu.cn/app/), [Lark](https://open.larksuite.com/app/)) 点击「新建企业自建应用」，点击应用名称进入应用详情页
2. 点击凭证与基础信息，获取 App ID 和 App Secret 值，填写到插件配置对应字段
3. 点击事件订阅，获取 Encrypt Key 和 Verification Token 值，填写到插件配置对应字段
4. 在事件订阅页面，确保添加了 `接收消息v2.0` (`im.message.receive_v1`) 事件
5. 按实际情况配置插件或机器人全局的 `selfUrl` 值，然后启动插件
6. 将第 5 步中配置的值加上 `path` 的值，填写到飞书开发者后台事件订阅页面的「请求地址配置」中，并点击完成
7. 若第 6 步的 URL 验证未通过，请检查你所配置的地址是否正确

参考：[@koishijs/plugin-adapter-lark](../../plugins/adapter/lark.md)

## KOOK

1. 前往 [开发者平台](https://developer.kookapp.cn/)，前往「应用」并点击「新建」
2. 输入应用名称后，点击「机器人」，保存这个页面中的 `token` (请注意不要泄露)
3. 将上面的 `token` 填入插件配置即可使用

参考：[@koishijs/plugin-adapter-kook](../../plugins/adapter/kook.md)

## OneBot

这里只介绍最常见的 [go-cqhttp](https://github.com/Mrs4s/go-cqhttp) 配置方法。

1. 在 `selfId` 填写机器人账号
2. 开启 `gocqhttp.enable` 选项
3. 点击「启用」，并跟随提示完成后续配置

参考：[@koishijs/plugin-adapter-onebot](../../plugins/adapter/onebot.md)

## QQ 频道

1. 前往 [QQ 频道管理后台](https://bot.q.qq.com/open/#/type?appType=2) 注册
2. 登陆进入 [机器人管理后台](https://bot.q.qq.com/open/#/botlogin) 并创建官方机器人
3. 创建完成后，在 [频道机器人开发设置](https://bot.q.qq.com/#/developer/developer-setting) 获取机器人基本数据
4. 将上面的基本数据填入插件配置即可使用

参考：[@koishijs/plugin-adapter-qqguild](../../plugins/adapter/qqguild.md)

## Telegram

1. 搜索 **@botfather** (有个官方认证的符号) 并进入聊天界面
2. 输入 `/start` 后，会出现一个使用菜单，你可以使用这里指令对你的机器人进行配置
3. 要创建一个机器人，请点击 `/newbot`，并根据系统提示完成创建流程
4. 使用 `/setprivacy` 开启 Privacy Mode (不然机器人只能收到特定消息)
5. 创建完毕后，你会获得一个 `token` (请注意不要泄露)，将其填入插件配置即可使用

参考：[@koishijs/plugin-adapter-telegram](../../plugins/adapter/telegram.md)
