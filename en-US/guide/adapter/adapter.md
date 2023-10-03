# Implement Adapters

We know that a single `Bot` class is already a valid plugin. However, such plugin has only the ability to call the platform API and cannot receive messages. 这个时候就需要 `Adapter` 类出场了。

## Types of Adapters

适配器需要建立并维护机器人与聊天平台之间的连接。通常来说，根据协议的不同，适配器与机器人可能是一对一的，也可能是一对多的。让我们再看一眼之前介绍过的 `ReplBot` 实例：

```ts
class ReplBot extends Bot {
  constructor(ctx: Context, config: Config) {
    super(ctx, config)
    this.platform = 'repl'
    this.selfId = 'koishi'
    ctx.plugin(ReplAdapter, this)
  }
}
```

如果我们多次加载上述插件，由于 `Bot` 基类的可重用性，每一次加载都会构造出新的 `ReplBot` 实例。另一方面，`ReplAdapter` 类继承了 `Adapter`，并且没有声明 `reusable` 属性，因此是一个不可重用插件。在多次加载的过程中，多个 `ReplBot` 实例会对应于同一个 `ReplAdapter` 实例。这便是典型的一对多适配器逻辑。

相比之下，Discord 平台使用 WebSocket 向机器人推送事件。每一个机器人都需要维护一个独立的 WebSocket 连接，因此需要多个 `Adapter` 实例。在这种情况下，我们无需改动上面机器人的代码，只需要将 `DiscordAdapter` 继承的基类变为 `Adapter.WsClient`。这个基类声明了可重用性，它将实现一个一对一的适配器逻辑。

简单来说就是，在实现适配器时，首先需要协议的类型确定适配器与机器人的对应关系。如果是一对一的，就需要声明 `reusable` 属性，否则不需要声明。此外，对于部分典型场景，我们又进一步派生出了 `Adapter.WsClient` 等子类，方便你快速实现适配器。

## Typical Implementations

Let's see a few typical adapters.

### WebSocket

一种常见的通信方式是 WebSocket，许多平台 (Discord、KOOK、钉钉等) 都会使用这项技术。它的工作原理是，机器人首先向聊天平台的 WebSocket 网关发起连接请求，随后平台会将事件推送到机器人的 WebSocket 连接上。这里我们还是以 Discord 平台为例：

```ts
export class DiscordAdapter extends Adapter.WsClient<DiscordBot> {
  async prepare() {
    const { url } = await this.bot.internal.getGatewayBot()
    return this.bot.http.ws(url + '/?v=10&encoding=json')
  }

  accept() {
    this.socket.addEventListener('message', async ({ data }) => {
      const parsed = JSON.parse(data.toString())
      if (parsed.t === 'READY') {
        const user = decodeUser(parsed.d.user)
        Object.assign(this.bot, user)
        return this.bot.online()
      } else {
        const session = createSession(this.bot, parsed)
        if (session) this.dispatch(session)
      }
    })
  }
}
```

一个 `WsClient` 类需要实现 `prepare()` 和 `accept()` 两个方法。`prepare()` 方法应当返回一个 `WebSocket` 对象，用于与聊天平台建立连接。在上面的例子中，我们首先通过内部 API 获取了 WebSocket 网关地址，然后使用 `bot.http.ws()` 方法创建了一个 `WebSocket` 对象：

```ts
const { url } = await this.bot.internal.getGatewayBot()
return this.bot.http.ws(url + '/?v=10&encoding=json')
```

`accept()` 方法用于处理已经成功连接的 `WebSocket` 对象。具体而言应当包含三件事：

1. 在初始化机器人各项属性后，调用 `bot.online()` 方法，将机器人标记为在线状态
2. 接收来自聊天平台的事件，构造 `Session` 对象并初始化各项属性，随后调用 `dispatch()` 方法将其触发为会话事件
3. 根据聊天平台的协议要求，处理心跳、重连、错误等情况 (如果平台没有专门设置与重连相关的信令，可以不用实现，`WsClient` 基类已经内置了简单的重连逻辑)

在上面的例子中，`READY` 事件表示机器人已经成功连接，此时我们对机器人进行初始化：

```ts
const user = decodeUser(parsed.d.user)
Object.assign(this.bot, user)
return this.bot.online()
```

在我们调用 `bot.online()` 之前，应当尽量保证 `Bot` 实例有 `selfId`, `username` 和 `avatar` 属性。前者本身就是必须属性，而后两个属性则会显示在控制台的机器人状态栏中。

对于其他事件，我们都尝试创建一个 `Session` 对象，并将它触发为会话事件：

```ts
const session = createSession(this.bot, parsed)
if (session) this.dispatch(session)
```

`createSession()` 会根据事件的类型，创建不同的 `Session` 实例。如果无法对应到标准的会话事件，那么 `createSession()` 方法会返回空值，表示我们不需要调用 `dispatch()` 方法。

### Webhook

另一种常见的通信方式是 Webhook，使用这种通信方式的平台有飞书、企业微信、Line 等。它的工作原理是，机器人搭建者首先在聊天平台的开发者后台配置一个 HTTP 服务器地址，随后平台会将事件推送到该地址上。这里我们以 Line 平台为例：

```ts
export class HttpServer extends Adapter<LineBot> {
  constructor(ctx: Context) {
    super()

    ctx.router.post('/line', async (ctx) => {
      const { destination, events } = ctx.request.body
      const bot = this.bots.find(bot => bot.selfId === destination)
      if (!bot) return ctx.status = 403

      for (const event of events) {
        const session = createSession(bot, event)
        if (session) bot.dispatch(session)
      }
      ctx.status = 200
      ctx.body = 'ok'
    })
  }

  async start(bot: LineBot) {
    const user = await this.getSelf()
    Object.assign(this, user)
    await bot.internal.setWebhookEndpoint({
      endpoint: bot.ctx.root.config.selfUrl + '/line',
    })
  }
}
```

任何一个适配器都需要通过 `start()` 和 `stop()` 方法来控制机器人的启动和停止 (你在前一个例子中没有看到这两个方法，只是因为 `WsClient` 已经内置了实现)。在这个例子中，我们通过内部接口对机器人数据做了初始化，并设置了 Webhook 回调地址：

```ts
const user = await this.getSelf()
Object.assign(this, user)
await bot.internal.setWebhookEndpoint({
  endpoint: bot.ctx.root.config.selfUrl + '/line',
})
```

对于 HTTP 服务器来说，我们不仅需要维护机器人的状态，还需要创建一个 HTTP 服务器，用于接收来自聊天平台的事件。因此，我们在构造函数中使用 `ctx.router` 监听了 Webhook 回调地址。对于每一个接收到的请求，我们首先验证其是否对应于已经配置的机器人：

```ts
const sign = ctx.headers['x-line-signature']?.toString()
const parsed = ctx.request.body as WebhookRequestBody
const bot = this.bots.find(bot => bot.selfId === parsed.destination)
if (!bot) return ctx.status = 403
```

After validation, for each event in the request, we create an `Session` instance and dispatch it as a session event:

```ts
for (const event of parsed.events) {
  const session = createSession(bot, event)
  if (session) bot.dispatch(session)
}
```

### 其他通信方式

除了 WebSocket 和 Webhook 以外，还有一些其他可能出现的通信方式：

- WS 服务器：机器人建立 WebSocket 服务器，持续接收来自聊天平台的事件
- HTTP 轮询：机器人定时向聊天平台发起 HTTP 请求，获取新增的事件列表

当然，对于那些不太像聊天平台的聊天平台，你也可以不必拘泥于传统的通信方式。直接继承 `Adapter` 基类，实现自己的逻辑即可。无论是我们在本章开始介绍的命令行环境，又或者是邮件、短信，甚至是社交媒体的评论区、私信，只要是能打字的地方，都可以通过适配器的方式接入到 Koishi 中！

## Advanced Techniques

接下来我们将介绍一些复杂适配器的实现技巧。

### Multi-Protocol Support

部分平台同时支持了多种通信方式，例如 Telegram 就同时支持了 Webhook 和 HTTP 轮询。对于此类平台，我们可以提供一个配置项，让用户根据需要自行选择通信方式。

首先调整目录结构，在 `server.ts` 和 `polling.ts` 中分别完成两种通信方式的适配器开发：

```text{5D,6-7A}
adapter-telegram
├── src
│   ├── bot.ts
│   ├── index.ts
│   ├── adapter.ts
│   ├── polling.ts
│   └── server.ts
└── package.json
```

每一种适配器可能都有自己的配置项，我们按照类插件的开发方式分别进行声明：

```ts title=server.ts
class ServerAdapter extends Adapter<TelegramBot> {}

namespace ServerAdapter {
  export interface Config {
    protocol: 'server'
    path?: string
  }

  export const Config: Schema<Config> = Schema.object({
    protocol: Schema.const('server').required(),
    path: Schema.string().default('/telegram'),
  })
}
```

```ts title=polling.ts
class PollingAdapter extends Adapter<TelegramBot> {
  // polling 适配器是可重用的
  static reusable = true
}

namespace PollingAdapter {
  export interface Config {
    protocol: 'polling'
    timeout?: string
  }

  export const Config: Schema<Config> = Schema.object({
    protocol: Schema.const('server').required(),
    timeout: Schema.number().default(Time.second * 25),
  })
}
```

最后编写作为入口的 `TelegramBot` 类，它将根据配置项的 `protocol` 属性，自动选择相关联的适配器 (最后配置项的定义使用了 [配置联动](../../schema/advanced/union-tagged-2.md) 技巧)：

```ts
class TelegramBot extends Bot<TelegramBot.Config> {
  constructor(ctx: Context, config: TelegramBot.Config) {
    super(ctx, config)
    if (config.protocol === 'server') {
      ctx.plugin(HttpServer, this)
    } else if (config.protocol === 'polling') {
      ctx.plugin(HttpPolling, this)
    }
  }
}

namespace TelegramBot {
  export type Config = ServerAdapter.Config | PollingAdapter.Config

  export const Config: Schema<Config> = Schema.intersect([
    Schema.object({
      protocol: Schema.union(['server', 'polling']).required(),
    }),
    Schema.union([
      HttpServer.Config,
      HttpPolling.Config,
    ]),
  ])
}
```

### Dynamically Create Bots

到此为止，我们的适配器开发中都存在一个隐含限制：用户的一次插件加载只能对应于一个 `Bot` 实例。如果用户需要创建多个机器人，那么就需要多次加载插件。这是因为在绝大多数适配器的使用场景下，用户都能很明确地知道自己需要创建多少个机器人。然而总有一些例外情况：

- WhatsApp 平台的一个应用可以填入多个手机号，也就对应了多个 `Bot` 实例。
- OneBot 平台中，你可以不预先创建机器人实例，只建立一个 WebSocket 服务器，同时允许多个连接，只要对应的 `Bot` 实例不存在就立即创建。

::: warning
无限制的 `Bot` 连接可能会导致你的 Koishi 被恶意调用。因此，如果将适配器作为可任意连接的服务端，请确保在可信任的网络环境下运行，或者引入其他验证机制。
:::

在上述的情况下，我们需要对插件的写法做一些调整。`Bot` 类不再能作为插件的入口了，但我们可以直接使用 `Adapter` 类作为入口。这里以 WhatsApp 平台为例：

```ts title=index.ts
import WhatsAppAdapter from './adapter'
export default WhatsAppAdapter
```

同时，适配器也直接继承 `Adapter` 基类，并声明 `schema` 和 `reusable`：

```ts title=adapter.ts
class WhatsAppAdapter extends Adapter<WhatsAppBot> {
  // 由适配器直接向外暴露配置项
  static schema = true
  // 这个适配器仍然是可重用的
  static reusable = true

  constructor(ctx: Context, config: WhatsAppAdapter.Config) {
    super()

    // 初始化内部接口
    const http = ctx.http.extend({
      headers: { Authorization: `Bearer ${config.token}` },
    })
    const internal = new Internal(http)

    // 启动时创建机器人
    ctx.on('ready', async () => {
      const data = await internal.getPhoneNumbers()
      for (const item of data) {
        const bot = new WhatsAppBot(ctx, {
          phoneNumber: item.id,
        })
        bot.adapter = this
        bot.internal = internal
        this.bots.push(bot)
      }
    })
  }
}
```
