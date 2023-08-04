# チャットアプリに接続

Koishiは、様々なチャットアプリをサポートするためにアダプタープラグインを使用します。その中で、よく使われるアダプタープラグインは、Koishiにあらかじめインストールされており、プラグイン設定の 「adapter 」グループで見つけることができます。必要なアダプターが存在しない場合は、プラグインマーケットプレイスでアダプターを検索して追加できます。

Koishiアプリは、いろいろなチャットアプリにまたがる複数のアカウントに同時に接続できます。每个账号对应一份插件配置，你可以参考 [添加更多插件](./market.md#添加更多插件) 中的方法添加新的插件配置。由于同一平台内接入的多个机器人共享了相同的用户数据。因此，你可以非常方便地在多个机器人之间切换以实现负载均衡。

对于不同的平台，你需要做好相应的准备工作。以下是各个平台的接入指南。

## Discord

1. 前往 [开发者后台](https://discord.com/developers/applications)，登录账号创建一个应用
2. 点击「Bot」并创建一个新的机器人，保存这个页面中的 `token` (请注意不要泄露)
3. 要将机器人拉进你的服务器，点击「OAuth2」，并在网址生成器中勾选 Bot 和机器人所需要的权限
4. 打开生成的链接，选择你具有管理权限的服务器，就成功把机器人添加进去了
5. 将上面的 `token` 填入插件配置即可使用

参考：[@koishijs/plugin-adapter-discord](../../plugins/adapter/discord.md)

## KOOK

1. 前往 [开发者平台](https://developer.kookapp.cn/)，前往「应用」并点击「新建」
2. 输入应用名称后，点击「机器人」，保存这个页面中的 `token` (请注意不要泄露)
3. 将上面的 `token` 填入插件配置即可使用

参考：[@koishijs/plugin-adapter-kook](../../plugins/adapter/kook.md)

## Lark / 飞书

1. 在开发者后台 ([Lark](https://open.larksuite.com/app/) / [飞书](https://open.feishu.cn/app/)) 点击「新建企业自建应用」，点击应用名称进入应用详情页
2. 点击凭证与基础信息，获取 App ID 和 App Secret 值，填写到插件配置对应字段
3. 点击事件订阅，获取 Encrypt Key 和 Verification Token 值，填写到插件配置对应字段
4. 在事件订阅页面，确保添加了 `接收消息v2.0` (`im.message.receive_v1`) 事件
5. 按实际情况配置插件或机器人全局的 `selfUrl` 值，然后启动插件
6. 将第 5 步中配置的值加上 `path` 的值，填写到飞书开发者后台事件订阅页面的「请求地址配置」中，并点击完成
7. 若第 6 步的 URL 验证未通过，请检查你所配置的地址是否正确

参考：[@koishijs/plugin-adapter-lark](../../plugins/adapter/lark.md)

## 邮件

1. 「username」对应你的邮箱账号，「password」对应你的授权码
2. 「imap」对应接收邮件服务器，「smtp」对应发送邮件服务器，需要分别填写对应的「host」和「port」
3. 不同邮箱服务获取授权码的方式也有所不同，可以参考下面的主流邮件服务进行配置

参考：[@koishijs/plugin-adapter-mail](../../plugins/adapter/mail.md)

### QQ 邮箱

- 接收邮件服务器：`imap.qq.com`，端口号 `993`
- 发送邮件服务器：`smtp.qq.com`，端口号 `465` 或 `587`
- 参考：[什么是授权码，它又是如何设置？](https://service.mail.qq.com/detail/0/75)

### 网易 163 邮箱

- 接收邮件服务器：`imap.163.com`，端口号 `993`
- 发送邮件服务器：`smtp.163.com`，端口号 `465` 或 `994`
- 参考：[网易邮箱 IMAP 服务](https://mail.163.com/html/110127_imap/index.htm)

### Outlook

- 接收邮件服务器：`outlook.office365.com`，端口号 `993`
- 发送邮件服务器：`smtp-mail.outlook.com`，端口号 `587`
- 参考：[Outlook.com 的 POP、IMAP 和 SMTP 设置](https://support.microsoft.com/zh-cn/office/outlook-com-%E7%9A%84-pop-imap-%E5%92%8C-smtp-%E8%AE%BE%E7%BD%AE-d088b986-291d-42b8-9564-9c414e2aa040)

### Gmail

- 接收邮件服务器：`imap.gmail.com`，端口号 `993`
- 发送邮件服务器：`smtp.gmail.com`，端口号 `465`
- 参考：[通过其他电子邮件平台查看 Gmail](https://support.google.com/mail/answer/7126229?hl=zh-Hans#zippy=%2C%E7%AC%AC-%E6%AD%A5%E6%A3%80%E6%9F%A5-imap-%E6%98%AF%E5%90%A6%E5%B7%B2%E5%90%AF%E7%94%A8%2C%E7%AC%AC-%E6%AD%A5%E5%9C%A8%E7%94%B5%E5%AD%90%E9%82%AE%E4%BB%B6%E5%AE%A2%E6%88%B7%E7%AB%AF%E4%B8%AD%E6%9B%B4%E6%94%B9-smtp-%E5%92%8C%E5%85%B6%E4%BB%96%E8%AE%BE%E7%BD%AE)

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

参照：[@koishijs/plugin-adapter-qqguild](../../plugins/adapter/qqguild.md)

## Telegram

1. 搜索 **@botfather** (有个官方认证的符号) 并进入聊天界面
2. 输入 `/start` 后，会出现一个使用菜单，你可以使用这里指令对你的机器人进行配置
3. 要创建一个机器人，请点击 `/newbot`，并根据系统提示完成创建流程
4. 使用 `/setprivacy` 开启 Privacy Mode (不然机器人只能收到特定消息)
5. 创建完毕后，你会获得一个 `token` (请注意不要泄露)，将其填入插件配置即可使用

参考：[@koishijs/plugin-adapter-telegram](../../plugins/adapter/telegram.md)
