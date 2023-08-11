# 实现机器人

`Bot` 对应着由 Koishi 操纵的聊天平台机器人账号。其上封装了一系列方法，用于发送消息、获取频道信息等操作。要实现一个聊天平台的 `Bot` 类，只需要实现这些方法即可。

## 通用接口

让我们先回忆一下上一节介绍的 `ReplBot`：

```ts
class ReplBot extends Bot {
  constructor(ctx: Context, config: Config) {
    super(ctx, config)
    this.platform = 'repl'
    this.selfId = 'koishi'
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

另一种方法是在有 `Session` 对象的环境中，直接通过 `session[platform]` 就可以访问到对应适配器的内部接口。这种方式不仅无需类型断言，并且能够直接访问到会话的原始数据：

```ts
session.discord.getGuild(guildId)

session.discord.t // 原始事件名称
session.discord.d // 原始事件数据
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
  constructor(ctx: Context, config: Config) {
    super(ctx, config)
    this.internal = new Internal()
    ctx.plugin(DiscordAdapter, this)
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

为此，我们实现了一个 `decodeGuild` 函数，将 Discord 的数据结构转换为 Koishi 的通用数据结构。与此同时，我们把网络请求的部分放在 `Internal` 类中实现，并在 `Bot` 类中直接调用内部方法。可以看到，这样编写出来的代码结构相比直接把请求放在 `Bot` 类中要清晰得多。

## 实现内部接口

不同的平台由于其 API 的差异性，`Internal` 类的实现方式也会有所不同。对于简单的平台，你完全可以手动实现每一个内部接口 (甚至可以不实现 `Internal` 类，就像 REPL 适配器那样)；但如果平台本身就有上百个 API，手写每一个内部接口显然既费时又啰嗦。因此，Koishi 提供了一些技巧以简化你的适配工作。我们这里仍然以 Discord 为例。

### 使用 HTTP 服务

让我们进一步完成上面的代码。Discord 的 API 是 Restful 的，并且需要 `Authorization` 请求头。我们通过在 `Internal` 类中传入一个 `http` 对象简化网络请求的写法：

```ts{5,9,17-20}
class Internal {
  constructor(private http: Quester) {}

  getGuild(guildId: string) {
    return this.http.get(`/guilds/${guildId}`)
  }

  getCurrentUserGuilds() {
    return this.http.get('/users/@me/guilds')
  }
}

class DiscordBot extends Bot {
  constructor(ctx: Context, config: Config) {
    super(ctx, config)
    const http = ctx.http.extend({
      endpoint: 'https://discord.com/api/v10',
      headers: {
        Authorization: `Bot ${config.token}`,
      },
    })
    this.internal = new Internal(http)
  }
}
```

[`ctx.http`](../../api/service/http.md) 是 Koishi 的内置服务，其上封装了一套基于 [axios](https://github.com/axios/axios) 的网络请求 API。这里，我们使用 `ctx.http.extend()` 方法创建了一个新的 `Quester` 实例，其上的请求会继承传入的配置。这样我们就无需每次请求都写一遍请求头了。

### 反射网络请求

在 `Quester` 的帮助下，我们甚至可以直接对网络请求进行反射，从而自动生成内部接口。

```ts
class Internal {
  constructor(private http: Quester) {}

  static define(path: string, methods: Partial<Record<Quester.Method, string | string[]>>) {
    for (const key in methods) {
      const method = key as Quester.Method
      for (const name of makeArray(methods[method])) {
        this.prototype[name] = async function (this: Internal, ...args: any[]) {
          // 将参数填入路径中
          const url = path.replace(/\{([^}]+)\}/g, () => {
            if (!args.length) throw new TypeError('missing arguments')
            return args.shift()
          })
          return this.http(method, url)
        }
      }
    }
  }
}
```

有了这个 `Internal.define()` 方法，我们就可以批量定义内部接口了：

```ts
Internal.define('/guilds/{guild.id}', {
  GET: 'getGuild',
  PATCH: 'modifyGuild',
  DELETE: 'deleteGuild',
})

Internal.define('/users/@me/guilds', {
  GET: 'getCurrentUserGuilds',
})
```

最后别忘了通过类型合并的方式，将这些方法添加到 `Internal` 类型上：

```ts
interface Internal {
  getGuild(guildId: string): Promise<Discord.Guild>
  modifyGuild(guildId: string, data: Discord.PartialGuild): Promise<Discord.Guild>
  deleteGuild(guildId: string): Promise<void>
  getCurrentUserGuilds(): Promise<Discord.Guild[]>
}
```

上面的代码还没有考虑请求体和异常处理等问题，如果想要深入了解，可以阅读 Discord 适配器的 [源码](https://github.com/satorijs/satori/blob/master/adapters/discord/src/types/internal.ts)。事实上，Discord 的接口已经是比较复杂的了。相信有了这些技巧的加持，其他平台的适配器你一定也能手到擒来。

### 注入会话属性

在本节的最后，我们还有一点伏笔没有回收。我们还需要在 `Session` 对象中注入 `discord` 属性，以便插件能够访问到内部接口：

```ts
declare module 'koishi' {
  interface Session {
    discord?: Internal & Payload
  }
}
```

这里的 `Internal` 对应着内部接口，而 `Payload` 则对应着原始事件数据。当构造会话对象时 (将在下一节具体介绍)，我们需要将这些数据注入到 `Session` 对象中：

```ts
// 平台注入的属性不建议设置为 enumerable
Object.defineProperty(session, 'discord', {
  // 将 Internal 作为原型，将 Payload 作为实例属性
  value: Object.assign(Object.create(internal), payload),
  writable: true,
})
```
