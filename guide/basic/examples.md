# 快速上手

本节提供了一些常见功能的代码示例，以便您快速上手 Koishi。你将在后续的几节中了解每个示例的技术细节。

## 基础问答

当机器人收到「天王盖地虎」时，发送「宝塔镇河妖」。

```ts
ctx.middleware((session, next) => {
  if (session.content === '天王盖地虎') {
    return '宝塔镇河妖'
  } else {
    return next()
  }
})
```

## 上线提醒

当机器人上线时自动给自己发送一条消息的功能：

```ts
ctx.on('bot-status-updated', (bot) => {
  // 这里的 selfId 换成机器人的账号
  if (bot.status === 'online' && bot.selfId === selfId) {
    // 这里的 userId 换成你的账号
    bot.sendPrivateMessage(userId, '我上线了~')
  }
})
```

## 入群欢迎

当有新成员入群时，发送「欢迎+@新成员+入群」。

::: tabs code
```tsx title=JSX
ctx.on('guild-member-added', (session) => {
  // session.userId 对应了入群者的平台账号
  // <at> 是一种消息元素，能够实现 @特定用户 的效果
  session.send(<>欢迎 <at id={session.userId}/> 入群！</>)
})
```
```ts title=API
ctx.on('guild-member-added', (session) => {
  // session.userId 对应了入群者的平台账号
  // h('at') 创建了一个消息元素，能够实现 @特定用户 的效果
  session.send('欢迎 ' + h('at', { id: session.userId }) + ' 入群！')
})
```
:::

## 通过好友申请

当有好友请求时，接受请求并发送欢迎消息。

```ts
ctx.on('friend-request', async (session) => {
  // session.bot 是当前会话绑定的机器人实例
  await session.bot.handleFriendRequest(session.messageId, true)
  await session.bot.sendPrivateMessage(session.userId, '很高兴认识你！')
})
```

## 发送广播消息

使用机器人同时向多个频道发送消息。

```ts
// 一参数填写你要发送到的频道 ID 列表
await session.bot.broadcast(['123456', '456789'], '全体目光向我看齐')
```

如果你启用了数据库，还能让每个机器人向自己绑定的所有频道发送消息：

```ts
// 只有启用了数据库才能用哦
await ctx.broadcast('全体目光向我看齐')
```
