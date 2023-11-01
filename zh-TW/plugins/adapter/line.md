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

## 内部 API

- [`internal.audienceMatch()`](https://developers.line.biz/en/reference/partner-docs/#phone-audience-match)
- [`internal.broadcast()`](https://developers.line.biz/en/reference/messaging-api/#send-broadcast-message)
- [`internal.cancelDefaultRichMenu()`](https://developers.line.biz/en/reference/messaging-api/#cancel-default-rich-menu)
- [`internal.createRichMenu()`](https://developers.line.biz/en/reference/messaging-api/#create-rich-menu)
- [`internal.createRichMenuAlias()`](https://developers.line.biz/en/reference/messaging-api/#create-rich-menu-alias)
- [`internal.deleteRichMenu()`](https://developers.line.biz/en/reference/messaging-api/#delete-rich-menu)
- [`internal.deleteRichMenuAlias()`](https://developers.line.biz/en/reference/messaging-api/#delete-rich-menu-alias)
- [`internal.getAdPhoneMessageStatistics()`](https://developers.line.biz/en/reference/partner-docs/#get-phone-audience-match)
- [`internal.getAggregationUnitNameList()`](https://developers.line.biz/en/reference/messaging-api/#get-name-list-of-units-used-this-month)
- [`internal.getAggregationUnitUsage()`](https://developers.line.biz/en/reference/messaging-api/#get-number-of-units-used-this-month)
- [`internal.getBotInfo()`](https://developers.line.biz/en/reference/messaging-api/#get-bot-info)
- [`internal.getDefaultRichMenuId()`](https://developers.line.biz/en/reference/messaging-api/#get-default-rich-menu-id)
- [`internal.getFollowers()`](https://developers.line.biz/en/reference/messaging-api/#get-follower-ids)
- [`internal.getGroupMemberCount()`](https://developers.line.biz/en/reference/messaging-api/#get-members-group-count)
- [`internal.getGroupMemberProfile()`](https://developers.line.biz/en/reference/messaging-api/#get-group-member-profile)
- [`internal.getGroupMembersIds()`](https://developers.line.biz/en/reference/messaging-api/#get-group-member-user-ids)
- [`internal.getGroupSummary()`](https://developers.line.biz/en/reference/messaging-api/#get-group-summary)
- [`internal.getMessageContent()`](https://developers.line.biz/en/reference/messaging-api/#get-content)
- [`internal.getMessageContentPreview()`](https://developers.line.biz/en/reference/messaging-api/#get-image-or-video-preview)
- [`internal.getMessageContentTranscodingByMessageId()`](https://developers.line.biz/en/reference/messaging-api/#verify-video-or-audio-preparation-status)
- [`internal.getMessageQuota()`](https://developers.line.biz/en/reference/messaging-api/#get-quota)
- [`internal.getMessageQuotaConsumption()`](https://developers.line.biz/en/reference/messaging-api/#get-consumption)
- [`internal.getNarrowcastProgress()`](https://developers.line.biz/en/reference/messaging-api/#get-narrowcast-progress-status)
- [`internal.getNumberOfSentBroadcastMessages()`](https://developers.line.biz/en/reference/messaging-api/#get-number-of-broadcast-messages)
- [`internal.getNumberOfSentMulticastMessages()`](https://developers.line.biz/en/reference/messaging-api/#get-number-of-multicast-messages)
- [`internal.getNumberOfSentPushMessages()`](https://developers.line.biz/en/reference/messaging-api/#get-number-of-push-messages)
- [`internal.getNumberOfSentReplyMessages()`](https://developers.line.biz/en/reference/messaging-api/#get-number-of-reply-messages)
- [`internal.getPNPMessageStatistics()`](https://developers.line.biz/en/reference/partner-docs/#get-number-of-sent-line-notification-messages)
- [`internal.getProfile()`](https://developers.line.biz/en/reference/messaging-api/#get-profile)
- [`internal.getRichMenu()`](https://developers.line.biz/en/reference/messaging-api/#get-rich-menu)
- [`internal.getRichMenuAlias()`](https://developers.line.biz/en/reference/messaging-api/#get-rich-menu-alias-by-id)
- [`internal.getRichMenuAliasList()`](https://developers.line.biz/en/reference/messaging-api/#get-rich-menu-alias-list)
- [`internal.getRichMenuBatchProgress()`](https://developers.line.biz/en/reference/messaging-api/#get-batch-control-rich-menus-progress-status)
- [`internal.getRichMenuIdOfUser()`](https://developers.line.biz/en/reference/messaging-api/#get-rich-menu-id-of-user)
- [`internal.getRichMenuImage()`](https://developers.line.biz/en/reference/messaging-api/#download-rich-menu-image)
- [`internal.getRichMenuList()`](https://developers.line.biz/en/reference/messaging-api/#get-rich-menu-list)
- [`internal.getRoomMemberCount()`](https://developers.line.biz/en/reference/messaging-api/#get-members-room-count)
- [`internal.getRoomMemberProfile()`](https://developers.line.biz/en/reference/messaging-api/#get-room-member-profile)
- [`internal.getRoomMembersIds()`](https://developers.line.biz/en/reference/messaging-api/#get-room-member-user-ids)
- [`internal.getWebhookEndpoint()`](https://developers.line.biz/en/reference/messaging-api/#get-webhook-endpoint-information)
- [`internal.issueLinkToken()`](https://developers.line.biz/en/reference/messaging-api/#issue-link-token)
- [`internal.leaveGroup()`](https://developers.line.biz/en/reference/messaging-api/#leave-group)
- [`internal.leaveRoom()`](https://developers.line.biz/en/reference/messaging-api/#leave-room)
- [`internal.linkRichMenuIdToUser()`](https://developers.line.biz/en/reference/messaging-api/#link-rich-menu-to-user)
- [`internal.markMessagesAsRead()`](https://developers.line.biz/en/reference/partner-docs/#mark-messages-from-users-as-read)
- [`internal.multicast()`](https://developers.line.biz/en/reference/messaging-api/#send-multicast-message)
- [`internal.pushMessage()`](https://developers.line.biz/en/reference/messaging-api/#send-push-message)
- [`internal.pushMessagesByPhone()`](https://developers.line.biz/en/reference/partner-docs/#send-line-notification-message)
- [`internal.replyMessage()`](https://developers.line.biz/en/reference/messaging-api/#send-reply-message)
- [`internal.setDefaultRichMenu()`](https://developers.line.biz/en/reference/messaging-api/#set-default-rich-menu)
- [`internal.setRichMenuImage()`](https://developers.line.biz/en/reference/messaging-api/#upload-rich-menu-image)
- [`internal.setWebhookEndpoint()`](https://developers.line.biz/en/reference/messaging-api/#set-webhook-endpoint-url)
- [`internal.testWebhookEndpoint()`](https://developers.line.biz/en/reference/messaging-api/#test-webhook-endpoint)
- [`internal.unlinkRichMenuIdFromUser()`](https://developers.line.biz/en/reference/messaging-api/#unlink-rich-menu-from-user)
- [`internal.updateRichMenuAlias()`](https://developers.line.biz/en/reference/messaging-api/#update-rich-menu-alias)
- [`internal.validateBroadcast()`](https://developers.line.biz/en/reference/messaging-api/#validate-message-objects-of-broadcast-message)
- [`internal.validateMulticast()`](https://developers.line.biz/en/reference/messaging-api/#validate-message-objects-of-multicast-message)
- [`internal.validateNarrowcast()`](https://developers.line.biz/en/reference/messaging-api/#validate-message-objects-of-narrowcast-message)
- [`internal.validatePush()`](https://developers.line.biz/en/reference/messaging-api/#validate-message-objects-of-push-message)
- [`internal.validateReply()`](https://developers.line.biz/en/reference/messaging-api/#validate-message-objects-of-reply-message)
- [`internal.validateRichMenuBatchRequest()`](https://developers.line.biz/en/reference/messaging-api/#validate-batch-control-rich-menus-request)
- [`internal.validateRichMenuObject()`](https://developers.line.biz/en/reference/messaging-api/#validate-rich-menu-object)

## 内部事件

- [`line/account-link`](https://developers\.line\.biz/en/reference/messaging-api/#account-link-event)
- [`line/beacon`](https://developers\.line\.biz/en/reference/messaging-api/#beacon-event)
- [`line/device-link`](https://developers\.line\.biz/en/reference/messaging-api/#device-link-event)
- [`line/device-unlink`](https://developers\.line\.biz/en/reference/messaging-api/#device-unlink-event)
- [`line/follow`](https://developers.line.biz/en/reference/messaging-api/#follow-event)
- [`line/join`](https://developers.line.biz/en/reference/messaging-api/#join-event)
- [`line/leave`](https://developers.line.biz/en/reference/messaging-api/#leave-event)
- [`line/member-joined`](https://developers.line.biz/en/reference/messaging-api/#member-joined-event)
- [`line/member-left`](https://developers.line.biz/en/reference/messaging-api/#member-left-event)
- [`line/message`](https://developers.line.biz/en/reference/messaging-api/#message-event)
- [`line/postback`](https://developers.line.biz/en/reference/messaging-api/#postback-event)
- [`line/scenario-result`](https://developers\.line\.biz/en/reference/messaging-api/#scenario-result-event)
- [`line/unfollow`](https://developers.line.biz/en/reference/messaging-api/#unfollow-event)
- [`line/unsend`](https://developers.line.biz/en/reference/messaging-api/#unsend-event)
- [`line/video-viewing-complete`](https://developers\.line\.biz/en/reference/messaging-api/#video-viewing-complete)
