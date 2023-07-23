# Bot Implementation

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

## 访问内部接口

尽管上面的通用接口足以应对大多数插件的需求，但这并不能将平台的能力发挥到极致。为此，Koishi 也允许 `Bot` 提供一套内部接口，用于直接调用平台的原生能力。

::: tip
**为什么不能直接在 `Bot` 类上添加方法？**

首先，插件并不能确定所拿到的 `Bot` 对象来自哪一个适配器，就算想要用上原生能力也必须强行做类型转换 (你稍后就能看到内部接口是如何解决类型问题的)；其次，原生接口可能与通用接口有相同的名称，随着 Koishi 未来进一步扩展通用接口，会有很大可能性引发接口冲突。
:::

### 在插件中访问

在插件中访问内部接口有两种方法。我们以 Discord 平台为例展示。

第一种是直接通过 `bot.internal` 属性访问。这个属性在 `Bot` 基类中的类型是 `any`，因此你可以直接使用其上的方法，也可以通过类型断言来获取更好的类型提示：

```ts
(bot as DiscordBot).internal.getGuild(guildId)
```

另一种方法是在有 `Session` 对象的环境中，直接通过 `session[platform]` 就可以访问到对应适配器的内部接口。这种方式的好处是无需类型断言：

```ts
session.discord.getGuild(guildId)
```

你甚至还可以用这种方式对多种适配器提供定制化的支持：

```ts
if (session.discord) {
  session.discord.getGuild(guildId)
} else {
  // 其他平台的处理
}
```

### 在适配器中访问

内部接口不仅能为插件提供更全面的平台能力，对适配器本身的实现也有很大的帮助。让我们截取 Discord 适配器的一段代码作为示例：

```ts
class Internal {
  // 这里的实现先略去
}

// 将 Discord 的数据结构转换为通用数据结构
const decodeGuild = (data: Discord.Guild): Universal.Guild => ({
  guildId: data.id,
  guildName: data.name,
})

class DiscordBot extends Bot {
  internal: Internal

  constructor(ctx: Context, config: Config) {
    super(ctx, config)
    this.internal = new Internal()
  }

  // 获取群组数据
  async getGuild(guildId: string) {
    const data = await this.internal.getGuild(guildId)
    return decodeGuild(data)
  }

  // 获取群组列表
  async getGuildList() {
    const data = await this.internal.getCurrentUserGuilds()
    return data.map(decodeGuild)
  }
}
```

在上面这段代码中，Discord 平台与 Koishi 都定义了一个 `Guild` 接口。前者包含了更多信息，但由于它们的关键字段不完全相同，因此并不能直接把请求的结果作为通用方法的返回值。

为此，我们实现了一个 `decodeGuild` 函数，将 Discord 的数据结构转换为 Koishi 的通用数据结构。与此同时，我们把网络请求的部分放在 `internal` 中实现，并在 `Bot` 类中直接调用内部方法。可以看到，这样编写出来的代码结构相比直接把请求放在 `Bot` 类中要清晰得多。
