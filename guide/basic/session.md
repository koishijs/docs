# 使用会话

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

<!-- ### 延时发送

如果你需要连续发送多条消息，那么在各条消息之间留下一定的时间间隔是很重要的：一方面它可以防止消息刷屏和消息错位（后发的条消息呈现在先发的消息前面），提高了阅读体验；另一方面它能够有效降低机器人发送消息的频率，防止被平台误封。这个时候，`session.sendQueued()` 可以解决你的问题。

```ts
// 发送两条消息，中间间隔一段时间，这个时间由系统计算决定
await session.sendQueued('message1')
await session.sendQueued('message2')

// 清空等待队列
await session.cancelQueued()
```

你也可以在发送时手动定义等待的时长：

```ts
import { Time } from 'koishi'

// 如果消息队列非空，在前一条消息发送完成后 1s 发送本消息
await session.sendQueued('message3', Time.second)

// 清空等待队列，并设定下一条消息发送距离现在至少 0.5s
await session.cancelQueued(0.5 * Time.second)
```

事实上，对于不同的消息长度，系统等待的时间也是不一样的，你可以通过配置项修改这个行为：

```yaml
delay:
  # 消息里每有一个字符就等待 0.02s
  character: 20
  # 每条消息至少等待 0.5s
  message: 500
```

这样一来，一段长度为 60 个字符的消息发送后，下一条消息发送前就需要等待 1.2 秒了。

### 等待用户输入

当你需要进行一些交互式操作时，可以使用 `session.prompt()`：

```ts
// @errors: 1108
await session.send('请输入用户名：')

const name = await session.prompt()
if (!name) return '输入超时。'

// 执行后续操作
await ctx.database.setUser(session.platform, session.userId, { name })
return `${name}，请多指教！`
```

你可以给这个方法传入一个 `timeout` 参数，或使用 `delay.prompt` 配置项，来作为等待的时间。

### 发送广播消息

有的时候你可能希望向多个频道同时发送消息，我们也专门设计了相关的接口。

```ts
// 使用当前机器人账户向多个频道发送消息
await session.bot.broadcast(['123456', '456789'], content)

// 如果你有多个账号，请使用 ctx.broadcast，并在频道编号前加上平台名称
await ctx.broadcast(['onebot:123456', 'discord:456789'], content)

// 或者直接将消息发给所有频道
await ctx.broadcast(content)
```

如果你希望广播消息的发送也有时间间隔的话，可以使用 `delay.broadcast` 配置项。

### 执行指令

我们还可以实用 `session.execute()` 来让用户执行某条指令：

```ts
// 当用户输入“查看帮助”时，执行 help 指令
ctx.middleware((session, next) => {
  if (session.content === '查看帮助') {
    return session.execute('help', next)
  } else {
    return next()
  }
})
``` -->
