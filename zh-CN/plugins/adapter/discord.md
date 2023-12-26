# @koishijs/plugin-adapter-discord

## 接入方法

1. 前往 [https://discord.com/developers/applications](https://discord.com/developers/applications)，登录账号创建一个应用
2. 点击「Bot」并创建一个新的机器人，保存这个页面中的 token（请注意不要泄露）
3. 要将机器人拉进你的服务器，点击「OAuth2」，并在网址生成器中勾选 Bot 和机器人所需要的权限
4. 打开生成的链接，选择你具有管理权限的服务器，就成功把机器人添加进去了
5. 将上面的 token 作为机器人配置项即可使用

## 配置项

包括全部的 [`WsClient`](../../api/core/adapter.md#类-adapter-wsclient) 选项和下列额外选项：

### options.token

- 类型: `string`

机器人账户的令牌。

### options.endpoint

- 类型: `string`
- 默认值: `'https://discord.com/api/v8'`

要连接的服务器地址。

### options.proxyAgent

- 类型: `string`
- 默认值: [`app.config.request.proxyAgent`](../../api/core/app.md#options-request-proxyagent)

请求时默认使用的网络代理。

### options.gateway

- 类型: `string`
- 默认值: `'wss://gateway.discord.gg/?v=8&encoding=json'`

要连接的 WebSocket 网关。

### options.intents

- 类型: `number`
- 默认值: `GUILD_MESSAGES | GUILD_MESSAGE_REACTIONS | DIRECT_MESSAGES | DIRECT_MESSAGE_REACTIONS`

需要订阅的机器人事件。这是一个以 bitset 形式表达的正整数，每一位代表一类事件。

参考：[Gateway Intents](https://discord.com/developers/docs/topics/gateway#gateway-intents)

### options.handleExternalAsset

- 可选值: `string`
- 默认值: `'auto'`

指定单独发送外链资源时采用的方法：

- **download:** 先下载后发送
- **direct:** 直接发送链接
- **auto:** 发送一个 HEAD 请求，如果返回的 Content-Type 正确，则直接发送链接，否则先下载后发送

### options.handleMixedContent

- 可选值: `string`
- 默认值: `'auto'`

指定发送图文混合内容时采用的方法：

- **separate:** 将每个不同形式的内容分开发送
- **attach:** 图片前如果有文本内容，则将文本作为图片的附带信息进行发送
- **auto:** 如果图片本身采用直接发送则与前面的文本分开，否则将文本作为图片的附带信息发送

当配置为 `attach` 并且发送文本+图片形式的消息时，无论 [`handleExternalAsset`](#options-discord-handleexternalasset) 配置为何都会先下载后发送。

## 内部接口

::: tip
关于内部接口的使用方式，请参见 [访问内部接口](../../guide/adapter/bot.md#access-from-plugin)。
:::

- [`internal.addGuildMember()`](https://discord.com/developers/docs/resources/guild#add-guild-member)
- [`internal.addGuildMemberRole()`](https://discord.com/developers/docs/resources/guild#add-guild-member-role)
- [`internal.addThreadMember()`](https://discord.com/developers/docs/resources/channel#add-thread-member)
- [`internal.beginGuildPrune()`](https://discord.com/developers/docs/resources/guild#begin-guild-prune)
- [`internal.bulkDeleteMessages()`](https://discord.com/developers/docs/resources/channel#bulk-delete-messages)
- [`internal.bulkOverwriteGlobalApplicationCommands()`](https://discord.com/developers/docs/interactions/application-commands#bulk-overwrite-global-application-commands)
- [`internal.bulkOverwriteGuildApplicationCommands()`](https://discord.com/developers/docs/interactions/application-commands#bulk-overwrite-guild-application-commands)
- [`internal.createAutoModerationRule()`](https://discord.com/developers/docs/resources/auto-moderation#create-auto-moderation-rule)
- [`internal.createChannelInvite()`](https://discord.com/developers/docs/resources/channel#create-channel-invite)
- [`internal.createDM()`](https://discord.com/developers/docs/resources/user#create-dm)
- [`internal.createFollowupMessage()`](https://discord.com/developers/docs/interactions/receiving-and-responding#create-followup-message)
- [`internal.createGlobalApplicationCommand()`](https://discord.com/developers/docs/interactions/application-commands#create-global-application-command)
- [`internal.createGroupDM()`](https://discord.com/developers/docs/resources/user#create-group-dm)
- [`internal.createGuild()`](https://discord.com/developers/docs/resources/guild#create-guild)
- [`internal.createGuildApplicationCommand()`](https://discord.com/developers/docs/interactions/application-commands#create-guild-application-command)
- [`internal.createGuildBan()`](https://discord.com/developers/docs/resources/guild#create-guild-ban)
- [`internal.createGuildChannel()`](https://discord.com/developers/docs/resources/guild#create-guild-channel)
- [`internal.createGuildEmoji()`](https://discord.com/developers/docs/resources/emoji#create-guild-emoji)
- [`internal.createGuildRole()`](https://discord.com/developers/docs/resources/guild#create-guild-role)
- [`internal.createGuildScheduledEvent()`](https://discord.com/developers/docs/resources/guild-scheduled-event#create-guild-scheduled-event)
- [`internal.createGuildSticker()`](https://discord.com/developers/docs/resources/sticker#create-guild-sticker)
- [`internal.createGuildTemplate()`](https://discord.com/developers/docs/resources/guild-template#create-guild-template)
- [`internal.createGuildfromGuildTemplate()`](https://discord.com/developers/docs/resources/guild-template#create-guild-from-guild-template)
- [`internal.createInteractionResponse()`](https://discord.com/developers/docs/interactions/receiving-and-responding#create-interaction-response)
- [`internal.createMessage()`](https://discord.com/developers/docs/resources/channel#create-message)
- [`internal.createReaction()`](https://discord.com/developers/docs/resources/channel#create-reaction)
- [`internal.createStageInstance()`](https://discord.com/developers/docs/resources/stage-instance#create-stage-instance)
- [`internal.createWebhook()`](https://discord.com/developers/docs/resources/webhook#create-webhook)
- [`internal.crosspostMessage()`](https://discord.com/developers/docs/resources/channel#crosspost-message)
- [`internal.deleteAllReactions()`](https://discord.com/developers/docs/resources/channel#delete-all-reactions)
- [`internal.deleteAllReactionsForEmoji()`](https://discord.com/developers/docs/resources/channel#delete-all-reactions-for-emoji)
- [`internal.deleteAutoModerationRule()`](https://discord.com/developers/docs/resources/auto-moderation#delete-auto-moderation-rule)
- [`internal.deleteChannel()`](https://discord.com/developers/docs/resources/channel#deleteclose-channel)
- [`internal.deleteChannelPermission()`](https://discord.com/developers/docs/resources/channel#delete-channel-permission)
- [`internal.deleteFollowupMessage()`](https://discord.com/developers/docs/interactions/receiving-and-responding#delete-followup-message)
- [`internal.deleteGlobalApplicationCommand()`](https://discord.com/developers/docs/interactions/application-commands#delete-global-application-command)
- [`internal.deleteGuild()`](https://discord.com/developers/docs/resources/guild#delete-guild)
- [`internal.deleteGuildApplicationCommand()`](https://discord.com/developers/docs/interactions/application-commands#delete-guild-application-command)
- [`internal.deleteGuildIntegration()`](https://discord.com/developers/docs/resources/guild#delete-guild-integration)
- [`internal.deleteGuildEmoji()`](https://discord.com/developers/docs/resources/emoji#delete-guild-emoji)
- [`internal.deleteGuildRole()`](https://discord.com/developers/docs/resources/guild#delete-guild-role)
- [`internal.deleteGuildScheduledEvent()`](https://discord.com/developers/docs/resources/guild-scheduled-event#delete-guild-scheduled-event)
- [`internal.deleteGuildSticker()`](https://discord.com/developers/docs/resources/sticker#delete-guild-sticker)
- [`internal.deleteGuildTemplate()`](https://discord.com/developers/docs/resources/guild-template#delete-guild-template)
- [`internal.deleteInvite()`](https://discord.com/developers/docs/resources/invite#delete-invite)
- [`internal.deleteMessage()`](https://discord.com/developers/docs/resources/channel#delete-message)
- [`internal.deleteOriginalInteractionResponse()`](https://discord.com/developers/docs/interactions/receiving-and-responding#delete-original-interaction-response)
- [`internal.deleteOwnReaction()`](https://discord.com/developers/docs/resources/channel#delete-own-reaction)
- [`internal.deleteStageInstance()`](https://discord.com/developers/docs/resources/stage-instance#delete-stage-instance)
- [`internal.deleteUserReaction()`](https://discord.com/developers/docs/resources/channel#delete-user-reaction)
- [`internal.deleteWebhook()`](https://discord.com/developers/docs/resources/webhook#delete-webhook)
- [`internal.deleteWebhookMessage()`](https://discord.com/developers/docs/resources/webhook#delete-webhook-message)
- [`internal.deleteWebhookwithToken()`](https://discord.com/developers/docs/resources/webhook#delete-webhook-with-token)
- [`internal.editApplicationCommandPermissions()`](https://discord.com/developers/docs/interactions/application-commands#edit-application-command-permissions)
- [`internal.editChannelPermissions()`](https://discord.com/developers/docs/resources/channel#edit-channel-permissions)
- [`internal.editFollowupMessage()`](https://discord.com/developers/docs/interactions/receiving-and-responding#edit-followup-message)
- [`internal.editGlobalApplicationCommand()`](https://discord.com/developers/docs/interactions/application-commands#edit-global-application-command)
- [`internal.editGuildApplicationCommand()`](https://discord.com/developers/docs/interactions/application-commands#edit-guild-application-command)
- [`internal.editMessage()`](https://discord.com/developers/docs/resources/channel#edit-message)
- [`internal.editOriginalInteractionResponse()`](https://discord.com/developers/docs/interactions/receiving-and-responding#edit-original-interaction-response)
- [`internal.editWebhookMessage()`](https://discord.com/developers/docs/resources/webhook#edit-webhook-message)
- [`internal.executeGitHubCompatibleWebhook()`](https://discord.com/developers/docs/resources/webhook#execute-githubcompatible-webhook)
- [`internal.executeSlackCompatibleWebhook()`](https://discord.com/developers/docs/resources/webhook#execute-slackcompatible-webhook)
- [`internal.executeWebhook()`](https://discord.com/developers/docs/resources/webhook#execute-webhook)
- [`internal.followNewsChannel()`](https://discord.com/developers/docs/resources/channel#follow-news-channel)
- [`internal.getApplicationCommandPermissions()`](https://discord.com/developers/docs/interactions/application-commands#get-application-command-permissions)
- [`internal.getApplicationRoleConnectionMetadataRecords()`](https://discord.com/developers/docs/resources/application-role-connection-metadata#get-application-role-connection-metadata-records)
- [`internal.getAutoModerationRule()`](https://discord.com/developers/docs/resources/auto-moderation#get-auto-moderation-rule)
- [`internal.getChannel()`](https://discord.com/developers/docs/resources/channel#get-channel)
- [`internal.getChannelInvites()`](https://discord.com/developers/docs/resources/channel#get-channel-invites)
- [`internal.getChannelMessage()`](https://discord.com/developers/docs/resources/channel#get-channel-message)
- [`internal.getChannelMessages()`](https://discord.com/developers/docs/resources/channel#get-channel-messages)
- [`internal.getChannelWebhooks()`](https://discord.com/developers/docs/resources/webhook#get-channel-webhooks)
- [`internal.getCurrentAuthorizationInformation()`](https://discord.com/developers/docs/topics/oauth2#get-current-authorization-information)
- [`internal.getCurrentBotApplicationInformation()`](https://discord.com/developers/docs/topics/oauth2#get-current-bot-application-information)
- [`internal.getCurrentUser()`](https://discord.com/developers/docs/resources/user#get-current-user)
- [`internal.getCurrentUserGuildMember()`](https://discord.com/developers/docs/resources/user#get-current-user-guild-member)
- [`internal.getCurrentUserGuilds()`](https://discord.com/developers/docs/resources/user#get-current-user-guilds)
- [`internal.getFollowupMessage()`](https://discord.com/developers/docs/interactions/receiving-and-responding#get-followup-message)
- [`internal.getGateway()`](https://discord.com/developers/docs/topics/gateway#get-gateway)
- [`internal.getGatewayBot()`](https://discord.com/developers/docs/topics/gateway#get-gateway-bot)
- [`internal.getGlobalApplicationCommand()`](https://discord.com/developers/docs/interactions/application-commands#get-global-application-command)
- [`internal.getGlobalApplicationCommands()`](https://discord.com/developers/docs/interactions/application-commands#get-global-application-commands)
- [`internal.getGuild()`](https://discord.com/developers/docs/resources/guild#get-guild)
- [`internal.getGuildApplicationCommand()`](https://discord.com/developers/docs/interactions/application-commands#get-guild-application-command)
- [`internal.getGuildApplicationCommandPermissions()`](https://discord.com/developers/docs/interactions/application-commands#get-guild-application-command-permissions)
- [`internal.getGuildApplicationCommands()`](https://discord.com/developers/docs/interactions/application-commands#get-guild-application-commands)
- [`internal.getGuildAuditLog()`](https://discord.com/developers/docs/resources/audit-log#get-guild-audit-log)
- [`internal.getGuildBan()`](https://discord.com/developers/docs/resources/guild#get-guild-ban)
- [`internal.getGuildBans()`](https://discord.com/developers/docs/resources/guild#get-guild-bans)
- [`internal.getGuildChannels()`](https://discord.com/developers/docs/resources/guild#get-guild-channels)
- [`internal.getGuildEmoji()`](https://discord.com/developers/docs/resources/emoji#get-guild-emoji)
- [`internal.getGuildIntegrations()`](https://discord.com/developers/docs/resources/guild#get-guild-integrations)
- [`internal.getGuildInvites()`](https://discord.com/developers/docs/resources/guild#get-guild-invites)
- [`internal.getGuildMember()`](https://discord.com/developers/docs/resources/guild#get-guild-member)
- [`internal.getGuildPreview()`](https://discord.com/developers/docs/resources/guild#get-guild-preview)
- [`internal.getGuildPruneCount()`](https://discord.com/developers/docs/resources/guild#get-guild-prune-count)
- [`internal.getGuildRoles()`](https://discord.com/developers/docs/resources/guild#get-guild-roles)
- [`internal.getGuildScheduledEvent()`](https://discord.com/developers/docs/resources/guild-scheduled-event#get-guild-scheduled-event)
- [`internal.getGuildScheduledEventUsers()`](https://discord.com/developers/docs/resources/guild-scheduled-event#get-guild-scheduled-event-users)
- [`internal.getGuildSticker()`](https://discord.com/developers/docs/resources/sticker#get-guild-sticker)
- [`internal.getGuildTemplate()`](https://discord.com/developers/docs/resources/guild-template#get-guild-template)
- [`internal.getGuildTemplates()`](https://discord.com/developers/docs/resources/guild-template#get-guild-templates)
- [`internal.getGuildVanityURL()`](https://discord.com/developers/docs/resources/guild#get-guild-vanity-url)
- [`internal.getGuildVoiceRegions()`](https://discord.com/developers/docs/resources/guild#get-guild-voice-regions)
- [`internal.getGuildWebhooks()`](https://discord.com/developers/docs/resources/webhook#get-guild-webhooks)
- [`internal.getGuildWelcomeScreen()`](https://discord.com/developers/docs/resources/guild#get-guild-welcome-screen)
- [`internal.getGuildWidget()`](https://discord.com/developers/docs/resources/guild#get-guild-widget)
- [`internal.getGuildWidgetImage()`](https://discord.com/developers/docs/resources/guild#get-guild-widget-image)
- [`internal.getGuildWidgetSettings()`](https://discord.com/developers/docs/resources/guild#get-guild-widget-settings)
- [`internal.getInvite()`](https://discord.com/developers/docs/resources/invite#get-invite)
- [`internal.getOriginalInteractionResponse()`](https://discord.com/developers/docs/interactions/receiving-and-responding#get-original-interaction-response)
- [`internal.getPinnedMessages()`](https://discord.com/developers/docs/resources/channel#get-pinned-messages)
- [`internal.getReactions()`](https://discord.com/developers/docs/resources/channel#get-reactions)
- [`internal.getStageInstance()`](https://discord.com/developers/docs/resources/stage-instance#get-stage-instance)
- [`internal.getSticker()`](https://discord.com/developers/docs/resources/sticker#get-sticker)
- [`internal.getThreadMember()`](https://discord.com/developers/docs/resources/channel#get-thread-member)
- [`internal.getUser()`](https://discord.com/developers/docs/resources/user#get-user)
- [`internal.getUserConnections()`](https://discord.com/developers/docs/resources/user#get-user-connections)
- [`internal.getWebhook()`](https://discord.com/developers/docs/resources/webhook#get-webhook)
- [`internal.getWebhookMessage()`](https://discord.com/developers/docs/resources/webhook#get-webhook-message)
- [`internal.getWebhookWithToken()`](https://discord.com/developers/docs/resources/webhook#get-webhook-with-token)
- [`internal.groupDMAddRecipient()`](https://discord.com/developers/docs/resources/channel#group-dm-add-recipient)
- [`internal.groupDMRemoveRecipient()`](https://discord.com/developers/docs/resources/channel#group-dm-remove-recipient)
- [`internal.joinThread()`](https://discord.com/developers/docs/resources/channel#join-thread)
- [`internal.leaveGuild()`](https://discord.com/developers/docs/resources/user#leave-guild)
- [`internal.leaveThread()`](https://discord.com/developers/docs/resources/channel#leave-thread)
- [`internal.listActiveGuildThreads()`](https://discord.com/developers/docs/resources/guild#list-active-guild-threads)
- [`internal.listActiveThreads()`](https://discord.com/developers/docs/resources/channel#list-active-threads)
- [`internal.listAutoModerationRules()`](https://discord.com/developers/docs/resources/auto-moderation#list-auto-moderation-rules-for-guild)
- [`internal.listGuildEmojis()`](https://discord.com/developers/docs/resources/emoji#list-guild-emojis)
- [`internal.listGuildMembers()`](https://discord.com/developers/docs/resources/guild#list-guild-members)
- [`internal.listGuildStickers()`](https://discord.com/developers/docs/resources/sticker#list-guild-stickers)
- [`internal.listJoinedPrivateArchivedThreads()`](https://discord.com/developers/docs/resources/channel#list-joined-private-archived-threads)
- [`internal.listNitroStickerPacks()`](https://discord.com/developers/docs/resources/sticker#list-nitro-sticker-packs)
- [`internal.listPrivateArchivedThreads()`](https://discord.com/developers/docs/resources/channel#list-private-archived-threads)
- [`internal.listPublicArchivedThreads()`](https://discord.com/developers/docs/resources/channel#list-public-archived-threads)
- [`internal.listScheduledEventsforGuild()`](https://discord.com/developers/docs/resources/guild-scheduled-event#list-scheduled-events-for-guild)
- [`internal.listThreadMembers()`](https://discord.com/developers/docs/resources/channel#list-thread-members)
- [`internal.listVoiceRegions()`](https://discord.com/developers/docs/resources/voice#list-voice-regions)
- [`internal.modifyAutoModerationRule()`](https://discord.com/developers/docs/resources/auto-moderation#modify-auto-moderation-rule)
- [`internal.modifyChannel()`](https://discord.com/developers/docs/resources/channel#modify-channel)
- [`internal.modifyCurrentMember()`](https://discord.com/developers/docs/resources/guild#modify-current-member)
- [`internal.modifyCurrentUser()`](https://discord.com/developers/docs/resources/user#modify-current-user)
- [`internal.modifyCurrentUserVoiceState()`](https://discord.com/developers/docs/resources/guild#modify-current-user-voice-state)
- [`internal.modifyGuild()`](https://discord.com/developers/docs/resources/guild#modify-guild)
- [`internal.modifyGuildChannelPositions()`](https://discord.com/developers/docs/resources/guild#modify-guild-channel-positions)
- [`internal.modifyGuildEmoji()`](https://discord.com/developers/docs/resources/emoji#modify-guild-emoji)
- [`internal.modifyGuildMember()`](https://discord.com/developers/docs/resources/guild#modify-guild-member)
- [`internal.modifyGuildRole()`](https://discord.com/developers/docs/resources/guild#modify-guild-role)
- [`internal.modifyGuildRolePositions()`](https://discord.com/developers/docs/resources/guild#modify-guild-role-positions)
- [`internal.modifyGuildScheduledEvent()`](https://discord.com/developers/docs/resources/guild-scheduled-event#modify-guild-scheduled-event)
- [`internal.modifyGuildSticker()`](https://discord.com/developers/docs/resources/sticker#modify-guild-sticker)
- [`internal.modifyGuildTemplate()`](https://discord.com/developers/docs/resources/guild-template#modify-guild-template)
- [`internal.modifyGuildWelcomeScreen()`](https://discord.com/developers/docs/resources/guild#modify-guild-welcome-screen)
- [`internal.modifyGuildWidget()`](https://discord.com/developers/docs/resources/guild#modify-guild-widget)
- [`internal.modifyStageInstance()`](https://discord.com/developers/docs/resources/stage-instance#modify-stage-instance)
- [`internal.modifyUserVoiceState()`](https://discord.com/developers/docs/resources/guild#modify-user-voice-state)
- [`internal.modifyWebhook()`](https://discord.com/developers/docs/resources/webhook#modify-webhook)
- [`internal.modifyWebhookWithToken()`](https://discord.com/developers/docs/resources/webhook#modify-webhook-with-token)
- [`internal.pinMessage()`](https://discord.com/developers/docs/resources/channel#pin-message)
- [`internal.removeGuildBan()`](https://discord.com/developers/docs/resources/guild#remove-guild-ban)
- [`internal.removeGuildMember()`](https://discord.com/developers/docs/resources/guild#remove-guild-member)
- [`internal.removeGuildMemberRole()`](https://discord.com/developers/docs/resources/guild#remove-guild-member-role)
- [`internal.removeThreadMember()`](https://discord.com/developers/docs/resources/channel#remove-thread-member)
- [`internal.searchGuildMembers()`](https://discord.com/developers/docs/resources/guild#search-guild-members)
- [`internal.startThreadFromMessage()`](https://discord.com/developers/docs/resources/channel#start-thread-from-message)
- [`internal.startThreadInForumChannel()`](https://discord.com/developers/docs/resources/channel#start-thread-in-forum-channel)
- [`internal.startThreadWithoutMessage()`](https://discord.com/developers/docs/resources/channel#start-thread-without-message)
- [`internal.syncGuildTemplate()`](https://discord.com/developers/docs/resources/guild-template#sync-guild-template)
- [`internal.triggerTypingIndicator()`](https://discord.com/developers/docs/resources/channel#trigger-typing-indicator)
- [`internal.unpinMessage()`](https://discord.com/developers/docs/resources/channel#unpin-message)
- [`internal.updateApplicationRoleConnectionMetadataRecords()`](https://discord.com/developers/docs/resources/application-role-connection-metadata#update-application-role-connection-metadata-records)

## 内部事件

- [`discord/application-command-permissions-update`](https://discord.com/developers/docs/topics/gateway-events#application-command-permissions-update)
- [`discord/auto-moderation-action-execution`](https://discord.com/developers/docs/topics/gateway-events#auto-moderation-action-execution)
- [`discord/auto-moderation-rule-create`](https://discord.com/developers/docs/topics/gateway-events#auto-moderation-rule-create)
- [`discord/auto-moderation-rule-delete`](https://discord.com/developers/docs/topics/gateway-events#auto-moderation-rule-delete)
- [`discord/auto-moderation-rule-update`](https://discord.com/developers/docs/topics/gateway-events#auto-moderation-rule-update)
- [`discord/channel-create`](https://discord.com/developers/docs/topics/gateway-events#channel-create)
- [`discord/channel-delete`](https://discord.com/developers/docs/topics/gateway-events#channel-delete)
- [`discord/channel-pins-update`](https://discord.com/developers/docs/topics/gateway-events#channel-pins-update)
- [`discord/channel-update`](https://discord.com/developers/docs/topics/gateway-events#channel-update)
- [`discord/guild-audit-log-entry-create`](https://discord.com/developers/docs/topics/gateway-events#guild-audit-log-entry-create)
- [`discord/guild-ban-add`](https://discord.com/developers/docs/topics/gateway-events#guild-ban-add)
- [`discord/guild-ban-remove`](https://discord.com/developers/docs/topics/gateway-events#guild-ban-remove)
- [`discord/guild-create`](https://discord.com/developers/docs/topics/gateway-events#guild-create)
- [`discord/guild-delete`](https://discord.com/developers/docs/topics/gateway-events#guild-delete)
- [`discord/guild-emojis-update`](https://discord.com/developers/docs/topics/gateway-events#guild-emojis-update)
- [`discord/guild-integrations-update`](https://discord.com/developers/docs/topics/gateway-events#guild-integrations-update)
- [`discord/guild-member-add`](https://discord.com/developers/docs/topics/gateway-events#guild-member-add)
- [`discord/guild-member-remove`](https://discord.com/developers/docs/topics/gateway-events#guild-member-remove)
- [`discord/guild-member-update`](https://discord.com/developers/docs/topics/gateway-events#guild-member-update)
- [`discord/guild-members-chunk`](https://discord.com/developers/docs/topics/gateway-events#guild-members-chunk)
- [`discord/guild-role-create`](https://discord.com/developers/docs/topics/gateway-events#guild-role-create)
- [`discord/guild-role-delete`](https://discord.com/developers/docs/topics/gateway-events#guild-role-delete)
- [`discord/guild-role-update`](https://discord.com/developers/docs/topics/gateway-events#guild-role-update)
- [`discord/guild-scheduled-event-create`](https://discord.com/developers/docs/topics/gateway-events#guild-scheduled-event-create)
- [`discord/guild-scheduled-event-delete`](https://discord.com/developers/docs/topics/gateway-events#guild-scheduled-event-delete)
- [`discord/guild-scheduled-event-update`](https://discord.com/developers/docs/topics/gateway-events#guild-scheduled-event-update)
- [`discord/guild-scheduled-event-user-add`](https://discord.com/developers/docs/topics/gateway-events#guild-scheduled-event-user-add)
- [`discord/guild-scheduled-event-user-remove`](https://discord.com/developers/docs/topics/gateway-events#guild-scheduled-event-user-remove)
- [`discord/guild-stickers-update`](https://discord.com/developers/docs/topics/gateway-events#guild-stickers-update)
- [`discord/guild-update`](https://discord.com/developers/docs/topics/gateway-events#guild-update)
- [`discord/hello`](https://discord.com/developers/docs/topics/gateway-events#hello)
- [`discord/integration-create`](https://discord.com/developers/docs/topics/gateway-events#integration-create)
- [`discord/integration-delete`](https://discord.com/developers/docs/topics/gateway-events#integration-delete)
- [`discord/integration-update`](https://discord.com/developers/docs/topics/gateway-events#integration-update)
- [`discord/interaction-create`](https://discord.com/developers/docs/topics/gateway-events#interaction-create)
- [`discord/invalid-session`](https://discord.com/developers/docs/topics/gateway-events#invalid-session)
- [`discord/invite-create`](https://discord.com/developers/docs/topics/gateway-events#invite-create)
- [`discord/invite-delete`](https://discord.com/developers/docs/topics/gateway-events#invite-delete)
- [`discord/message-create`](https://discord.com/developers/docs/topics/gateway-events#message-create)
- [`discord/message-delete-bulk`](https://discord.com/developers/docs/topics/gateway-events#message-delete-bulk)
- [`discord/message-delete`](https://discord.com/developers/docs/topics/gateway-events#message-delete)
- [`discord/message-reaction-add`](https://discord.com/developers/docs/topics/gateway-events#message-reaction-add)
- [`discord/message-reaction-remove-all`](https://discord.com/developers/docs/topics/gateway-events#message-reaction-remove-all)
- [`discord/message-reaction-remove-emoji`](https://discord.com/developers/docs/topics/gateway-events#message-reaction-remove-emoji)
- [`discord/message-reaction-remove`](https://discord.com/developers/docs/topics/gateway-events#message-reaction-remove)
- [`discord/message-update`](https://discord.com/developers/docs/topics/gateway-events#message-update)
- [`discord/presence-update`](https://discord.com/developers/docs/topics/gateway-events#presence-update)
- [`discord/ready`](https://discord.com/developers/docs/topics/gateway-events#ready)
- [`discord/reconnect`](https://discord.com/developers/docs/topics/gateway-events#reconnect)
- [`discord/resumed`](https://discord.com/developers/docs/topics/gateway-events#resumed)
- [`discord/stage-instance-create`](https://discord.com/developers/docs/topics/gateway-events#stage-instance-create)
- [`discord/stage-instance-delete`](https://discord.com/developers/docs/topics/gateway-events#stage-instance-delete)
- [`discord/stage-instance-update`](https://discord.com/developers/docs/topics/gateway-events#stage-instance-update)
- [`discord/thread-create`](https://discord.com/developers/docs/topics/gateway-events#thread-create)
- [`discord/thread-delete`](https://discord.com/developers/docs/topics/gateway-events#thread-delete)
- [`discord/thread-list-sync`](https://discord.com/developers/docs/topics/gateway-events#thread-list-sync)
- [`discord/thread-member-update`](https://discord.com/developers/docs/topics/gateway-events#thread-member-update)
- [`discord/thread-members-update`](https://discord.com/developers/docs/topics/gateway-events#thread-members-update)
- [`discord/thread-update`](https://discord.com/developers/docs/topics/gateway-events#thread-update)
- [`discord/typing-start`](https://discord.com/developers/docs/topics/gateway-events#typing-start)
- [`discord/user-update`](https://discord.com/developers/docs/topics/gateway-events#user-update)
- [`discord/voice-server-update`](https://discord.com/developers/docs/topics/gateway-events#voice-server-update)
- [`discord/voice-state-update`](https://discord.com/developers/docs/topics/gateway-events#voice-state-update)
- [`discord/webhooks-update`](https://discord.com/developers/docs/topics/gateway-events#webhooks-update)
