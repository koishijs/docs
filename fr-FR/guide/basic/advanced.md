# 进阶用法

在前面的几节中，我们已经了解了基础的交互概念。以他们为基础，Koishi 提供了一些进阶的用法，用于处理真实应用场景中的交互需求。

## 机器人对象

我们通常将机器人做出的交互行为分为两种：主动交互和被动交互。**主动交互**是指机器人主动进行某些操作，而**被动交互**则是指机器人接收到特定事件后做出的响应。一个机器人的大部分交互都应该是被动的，而主动交互则可用于一些特殊情况，比如定时任务、通知推送等。

Koishi 提供的交互性 API 可能存在于 `ctx`， `session` 和 `bot` 三种对象中。其中，上下文对象 `ctx` 可以在插件参数中取得，会话对象 `session` 可以在被动交互中取得，而机器人对象 `bot` 则可以从上述两个对象中访问到：

```ts
// 从 session 中访问 bot
session.bot

// 从 ctx 中访问 bot，其中 platform 和 selfId 分别是平台名称和机器人 ID
ctx.bots[`${platform}:${selfId}`]
```

在之后的章节中，我们将进一步了解这三种对象的用法。

## 广播消息

主动交互中的一种常见需求是同时向多个频道发送消息。Koishi 提供了两套方法来实现消息的广播。最基础的写法是直接使用 `bot.broadcast()`：

```ts
// 一参数填写你要发送到的频道 ID 列表
await bot.broadcast(['123456', '456789'], '全体目光向我看齐')
```

但这样写需要知道每一个频道对应哪个机器人。对于启用了多个机器人的场景下，这么写就有点不方便了。幸运的是，Koishi 还有另一个方法：`ctx.broadcast()`。在启用了数据库的情况下，此方法会自动获取每个频道的 [受理人](../../manual/usage/customize.md#受理人机制)，并以对应的账号发送消息：

```ts
await ctx.broadcast(['onebot:123456', 'discord:456789'], '全体目光向我看齐')
```

## 等待输入

当你需要进行一些交互式操作时，可以使用 `session.prompt()`：

```ts
await session.send('请输入用户名：')

const name = await session.prompt()
if (!name) return '输入超时。'

// 执行后续操作
return `${name}，请多指教！`
```

你可以给这个方法传入一个 `timeout` 参数，或使用 `delay.prompt` 配置项，来作为等待的时间。

## 延时发送

如果你需要连续发送多条消息，那么在各条消息之间留下一定的时间间隔是很重要的：一方面它可以防止消息刷屏和消息错位 (后发的条消息呈现在先发的消息前面)，提高了阅读体验；另一方面它能够有效降低机器人发送消息的频率，防止被平台误封。这个时候，`session.sendQueued()` 可以解决你的问题。

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

## 执行指令

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
```
