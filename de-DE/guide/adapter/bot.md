# 实现机器人

::: danger 注意
此页文档正在施工，其中的内容可能不是最新。
:::

`Bot` 对应着由 Koishi 操纵的聊天平台机器人账号。其上封装了一系列方法，用于发送消息、获取频道信息等操作。要实现一个聊天平台的 `Bot` 类，只需要实现这些方法即可。

## 通用接口

让我们先回忆一下上一节介绍的 `ReplBot`：

```ts
class ReplBot extends Bot {
  constructor(ctx: Context, config: Config) {
    super(ctx, config)
    ctx.plugin(ReplAdapter, this)
  }

  async sendMessage(channelId: string, content: h.Fragment) {
    process.stdout.write(h('', content).toString(true))
    process.stdout.write(EOL)
    return []
  }
}
```

这里仅仅实现了 `sendMessage` 一个方法，而真正的聊天平台往往具备更多消息能力：

- [`bot.sendMessage()`](../../api/core/bot.md#bot-sendmessage)：发送消息
- [`bot.sendPrivateMessage()`](../../api/core/bot.md#bot-sendprivatemessage)：发送私聊消息
- [`bot.deleteMessage()`](../../api/core/bot.md#bot-deletemessage)：删除消息
- [`bot.editMessage()`](../../api/core/bot.md#bot-editmessage)：编辑消息
- [`bot.getMessage()`](../../api/core/bot.md#bot-getmessage)：获取消息

除了处理消息以外，机器人的通用能力还包括获取群组、频道、用户信息，在消息上添加表态，管理群组成员以及处理邀请等等。Koishi 提供了一套通用的 [机器人接口](../../api/core/bot.md)。适配器应当尽可能地实现这些的标准方法，但这些并不是必需的。对于平台没有提供能力的 API，可以直接略去实现。
