# @koishijs/plugin-adapter-telegram

## 接入方法

1. 搜索 @botfather（有个官方认证的符号）并进入聊天界面
2. After entering `start`, a menu will appear. You can use commands to configure your bot here.
3. To create a bot, click `/newbot` and follow the instructions to finish the process of creation.
4. 使用 `/setprivacy` 开启 Privacy Mode（不然机器人只能收到特定消息）
5. 创建完毕后，你会获得一个 token（请注意不要泄露），将其作为机器人配置项即可使用

参考文档：<https://core.telegram.org/bots>

::: tip
如果启动机器人后发现收不到不带 `/` 的消息，这很可能是由于 Privacy Mode 未开启。如果开启后仍然收不到消息，请尝试将机器人从群组中移除后重新加入。
:::

## 机器人选项

### options.protocol

- 可选值: server, polling

要使用的协议类型。

### options.token

- 类型: `string`

机器人账户的令牌。

### options.endpoint

- 类型: `string`
- 默认值: `'https://api.telegram.org'`

要连接的服务器地址。

### options.proxyAgent

- 类型: `string`
- 默认值: [`app.config.request.proxyAgent`](../../api/core/app.md#options-request-proxyagent)

请求时默认使用的网络代理。

### options.files.endpoint

- 类型: `string`
- 默认值: [`options.endpoint`](#options-bots-endpoint)

文件请求的终结点。

### options.files.local

- 类型: `boolean`
- 默认值: `false`

是否启用 [Telegram Bot API](https://github.com/tdlib/telegram-bot-api) 本地模式。

## 适配器选项

### options.path

- 类型：`string`
- 默认值：`'/telegram'`

服务器监听的路径。

### options.selfUrl

- 类型：`string`

Koishi 服务暴露在公网的地址，会覆盖 [`app.config.selfUrl`](../../api/core/app.md#options-selfurl) 的值。

## 内部 API

- [`internal.addStickerToSet()`](https://core.telegram.org/bots/api#addstickertoset)
- [`internal.answerCallbackQuery()`](https://core.telegram.org/bots/api#answercallbackquery)
- [`internal.answerInlineQuery()`](https://core.telegram.org/bots/api#answerinlinequery)
- [`internal.answerPreCheckoutQuery()`](https://core.telegram.org/bots/api#answerprecheckoutquery)
- [`internal.answerShippingQuery()`](https://core.telegram.org/bots/api#answershippingquery)
- [`internal.answerWebAppQuery()`](https://core.telegram.org/bots/api#answerwebappquery)
- [`internal.approveChatJoinRequest()`](https://core.telegram.org/bots/api#approvechatjoinrequest)
- [`internal.banChatMember()`](https://core.telegram.org/bots/api#banchatmember)
- [`internal.banChatSenderChat()`](https://core.telegram.org/bots/api#banchatsenderchat)
- [`internal.close()`](https://core.telegram.org/bots/api#close)
- [`internal.closeForumTopic()`](https://core.telegram.org/bots/api#closeforumtopic)
- [`internal.closeGeneralForumTopic()`](https://core.telegram.org/bots/api#closegeneralforumtopic)
- [`internal.copyMessage()`](https://core.telegram.org/bots/api#copymessage)
- [`internal.createChatInviteLink()`](https://core.telegram.org/bots/api#createchatinvitelink)
- [`internal.createForumTopic()`](https://core.telegram.org/bots/api#createforumtopic)
- [`internal.createInvoiceLink()`](https://core.telegram.org/bots/api#createinvoicelink)
- [`internal.createNewStickerSet()`](https://core.telegram.org/bots/api#createnewstickerset)
- [`internal.declineChatJoinRequest()`](https://core.telegram.org/bots/api#declinechatjoinrequest)
- [`internal.deleteChatPhoto()`](https://core.telegram.org/bots/api#deletechatphoto)
- [`internal.deleteChatStickerSet()`](https://core.telegram.org/bots/api#deletechatstickerset)
- [`internal.deleteForumTopic()`](https://core.telegram.org/bots/api#deleteforumtopic)
- [`internal.deleteMessage()`](https://core.telegram.org/bots/api#deletemessage)
- [`internal.deleteMyCommands()`](https://core.telegram.org/bots/api#deletemycommands)
- [`internal.deleteStickerFromSet()`](https://core.telegram.org/bots/api#deletestickerfromset)
- [`internal.deleteWebhook()`](https://core.telegram.org/bots/api#deletewebhook)
- [`internal.editChatInviteLink()`](https://core.telegram.org/bots/api#editchatinvitelink)
- [`internal.editForumTopic()`](https://core.telegram.org/bots/api#editforumtopic)
- [`internal.editGeneralForumTopic()`](https://core.telegram.org/bots/api#editgeneralforumtopic)
- [`internal.editMessageCaption()`](https://core.telegram.org/bots/api#editmessagecaption)
- [`internal.editMessageLiveLocation()`](https://core.telegram.org/bots/api#editmessagelivelocation)
- [`internal.editMessageMedia()`](https://core.telegram.org/bots/api#editmessagemedia)
- [`internal.editMessageReplyMarkup()`](https://core.telegram.org/bots/api#editmessagereplymarkup)
- [`internal.editMessageText()`](https://core.telegram.org/bots/api#editmessagetext)
- [`internal.exportChatInviteLink()`](https://core.telegram.org/bots/api#exportchatinvitelink)
- [`internal.forwardMessage()`](https://core.telegram.org/bots/api#forwardmessage)
- [`internal.getChat()`](https://core.telegram.org/bots/api#getchat)
- [`internal.getChatAdministrators()`](https://core.telegram.org/bots/api#getchatadministrators)
- [`internal.getChatMember()`](https://core.telegram.org/bots/api#getchatmember)
- [`internal.getChatMemberCount()`](https://core.telegram.org/bots/api#getchatmembercount)
- [`internal.getChatMenuButton()`](https://core.telegram.org/bots/api#getchatmenubutton)
- [`internal.getCustomEmojiStickers()`](https://core.telegram.org/bots/api#getcustomemojistickers)
- [`internal.getFile()`](https://core.telegram.org/bots/api#getfile)
- [`internal.getForumTopicIconStickers()`](https://core.telegram.org/bots/api#getforumtopiciconstickers)
- [`internal.getGameHighScores()`](https://core.telegram.org/bots/api#getgamehighscores)
- [`internal.getMe()`](https://core.telegram.org/bots/api#getme)
- [`internal.getMyCommands()`](https://core.telegram.org/bots/api#getmycommands)
- [`internal.getMyDefaultAdministratorRights()`](https://core.telegram.org/bots/api#getmydefaultadministratorrights)
- [`internal.getStickerSet()`](https://core.telegram.org/bots/api#getstickerset)
- [`internal.getUpdates()`](https://core.telegram.org/bots/api#getupdates)
- [`internal.getUserProfilePhotos()`](https://core.telegram.org/bots/api#getuserprofilephotos)
- [`internal.getWebhookInfo()`](https://core.telegram.org/bots/api#getwebhookinfo)
- [`internal.hideGeneralForumTopic()`](https://core.telegram.org/bots/api#hidegeneralforumtopic)
- [`internal.leaveChat()`](https://core.telegram.org/bots/api#leavechat)
- [`internal.logOut()`](https://core.telegram.org/bots/api#logout)
- [`internal.pinChatMessage()`](https://core.telegram.org/bots/api#pinchatmessage)
- [`internal.promoteChatMember()`](https://core.telegram.org/bots/api#promotechatmember)
- [`internal.reopenForumTopic()`](https://core.telegram.org/bots/api#reopenforumtopic)
- [`internal.reopenGeneralForumTopic()`](https://core.telegram.org/bots/api#reopengeneralforumtopic)
- [`internal.restrictChatMember()`](https://core.telegram.org/bots/api#restrictchatmember)
- [`internal.revokeChatInviteLink()`](https://core.telegram.org/bots/api#revokechatinvitelink)
- [`internal.sendAnimation()`](https://core.telegram.org/bots/api#sendanimation)
- [`internal.sendAudio()`](https://core.telegram.org/bots/api#sendaudio)
- [`internal.sendChatAction()`](https://core.telegram.org/bots/api#sendchataction)
- [`internal.sendContact()`](https://core.telegram.org/bots/api#sendcontact)
- [`internal.sendDice()`](https://core.telegram.org/bots/api#senddice)
- [`internal.sendDocument()`](https://core.telegram.org/bots/api#senddocument)
- [`internal.sendGame()`](https://core.telegram.org/bots/api#sendgame)
- [`internal.sendInvoice()`](https://core.telegram.org/bots/api#sendinvoice)
- [`internal.sendLocation()`](https://core.telegram.org/bots/api#sendlocation)
- [`internal.sendMediaGroup()`](https://core.telegram.org/bots/api#sendmediagroup)
- [`internal.sendMessage()`](https://core.telegram.org/bots/api#sendmessage)
- [`internal.sendPhoto()`](https://core.telegram.org/bots/api#sendphoto)
- [`internal.sendPoll()`](https://core.telegram.org/bots/api#sendpoll)
- [`internal.sendSticker()`](https://core.telegram.org/bots/api#sendsticker)
- [`internal.sendVenue()`](https://core.telegram.org/bots/api#sendvenue)
- [`internal.sendVideo()`](https://core.telegram.org/bots/api#sendvideo)
- [`internal.sendVideoNote()`](https://core.telegram.org/bots/api#sendvideonote)
- [`internal.sendVoice()`](https://core.telegram.org/bots/api#sendvoice)
- [`internal.setChatAdministratorCustomTitle()`](https://core.telegram.org/bots/api#setchatadministratorcustomtitle)
- [`internal.setChatDescription()`](https://core.telegram.org/bots/api#setchatdescription)
- [`internal.setChatMenuButton()`](https://core.telegram.org/bots/api#setchatmenubutton)
- [`internal.setChatPermissions()`](https://core.telegram.org/bots/api#setchatpermissions)
- [`internal.setChatPhoto()`](https://core.telegram.org/bots/api#setchatphoto)
- [`internal.setChatStickerSet()`](https://core.telegram.org/bots/api#setchatstickerset)
- [`internal.setChatTitle()`](https://core.telegram.org/bots/api#setchattitle)
- [`internal.setGameScore()`](https://core.telegram.org/bots/api#setgamescore)
- [`internal.setMyCommands()`](https://core.telegram.org/bots/api#setmycommands)
- [`internal.setMyDefaultAdministratorRights()`](https://core.telegram.org/bots/api#setmydefaultadministratorrights)
- [`internal.setPassportDataErrors()`](https://core.telegram.org/bots/api#setpassportdataerrors)
- [`internal.setStickerPositionInSet()`](https://core.telegram.org/bots/api#setstickerpositioninset)
- [`internal.setStickerSetThumb()`](https://core.telegram.org/bots/api#setstickersetthumb)
- [`internal.setWebhook()`](https://core.telegram.org/bots/api#setwebhook)
- [`internal.stopMessageLiveLocation()`](https://core.telegram.org/bots/api#stopmessagelivelocation)
- [`internal.stopPoll()`](https://core.telegram.org/bots/api#stoppoll)
- [`internal.unbanChatMember()`](https://core.telegram.org/bots/api#unbanchatmember)
- [`internal.unbanChatSenderChat()`](https://core.telegram.org/bots/api#unbanchatsenderchat)
- [`internal.unhideGeneralForumTopic()`](https://core.telegram.org/bots/api#unhidegeneralforumtopic)
- [`internal.unpinAllChatMessages()`](https://core.telegram.org/bots/api#unpinallchatmessages)
- [`internal.unpinAllForumTopicMessages()`](https://core.telegram.org/bots/api#unpinallforumtopicmessages)
- [`internal.unpinChatMessage()`](https://core.telegram.org/bots/api#unpinchatmessage)
- [`internal.uploadStickerFile()`](https://core.telegram.org/bots/api#uploadstickerfile)

## 内部事件

- [`telegram/callback-query`](https://core.telegram.org/bots/api#update)
- [`telegram/channel-post`](https://core.telegram.org/bots/api#update)
- [`telegram/chat-join-request`](https://core.telegram.org/bots/api#update)
- [`telegram/chat-member`](https://core.telegram.org/bots/api#update)
- [`telegram/chosen-inline-result`](https://core.telegram.org/bots/api#update)
- [`telegram/edited-channel-post`](https://core.telegram.org/bots/api#update)
- [`telegram/edited-message`](https://core.telegram.org/bots/api#update)
- [`telegram/inline-query`](https://core.telegram.org/bots/api#update)
- [`telegram/message`](https://core.telegram.org/bots/api#update)
- [`telegram/my-chat-member`](https://core.telegram.org/bots/api#update)
- [`telegram/poll-answer`](https://core.telegram.org/bots/api#update)
- [`telegram/poll`](https://core.telegram.org/bots/api#update)
- [`telegram/pre-checkout-query`](https://core.telegram.org/bots/api#update)
- [`telegram/shipping-query`](https://core.telegram.org/bots/api#update)
