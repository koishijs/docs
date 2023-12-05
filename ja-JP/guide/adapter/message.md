# 消息编码

在 [实现机器人](./bot.md#在适配器中访问) 一节中，我们其实已经涉及了格式转换的概念：

```ts
// 将 Discord 的数据结构转换为通用数据结构
const decodeGuild = (data: Discord.Guild): Universal.Guild => ({
  guildId: data.id,
  guildName: data.name,
})

// 将通用数据结构转换为 Discord 的数据结构
const encodeGuild = (data: Universal.Guild): Discord.Guild => ({
  id: data.guildId,
  name: data.guildName,
})
```

不同平台对于同一个概念的接口会存在或多或少的差异。为了抹平这些差异，Koishi 引入了一套通用接口，用来描述这些跨平台的概念。在实现机器人和适配器时，通常都需要编写如上的函数，来对具体平台的数据进行转化。而这其中最复杂的则是对消息的处理。

Koishi 使用 [消息元素](../basic/element.md) 表达任何聊天平台的消息。这是一种类似于 HTML 的格式。消息元素作为组成消息的基本单位，可以表示具有特定语义的内容，如文本、表情、图片、引用、元信息等。本节将介绍如何在消息元素与平台消息之间互相转换。

## 接收消息

在会话对象上存在两个属性与消息的内容有关：`content` 和 `elements`，它们分别对应着字符串形式和消息元素形式的消息内容。它们之间会自动转换，因此下面的两种写法是等价的：

```ts
session.content = '欢迎 <at id="1234567"/>'
```

```ts
session.elements = [
  h('text', { content: '欢迎 ' }),
  h('at', { id: '1234567' }),
]
```

在接收消息时，只需根据平台的格式对消息进行解码，将结果赋值到上述两个属性之一即可。下面是一个最简单的例子，假设平台的消息均以文本形式接收，并且使用 `@id` 的语法表达提及用户，那么你可以这么写：

```ts
session.content = input.replace(/@(\d+)/g, '<at id="$1"/>')
```

## 发送消息

### 兼容性原则

在具体介绍消息发送之前，不知道你是否有这样的疑问：Koishi 提供了一整套标准的消息元素，但并非所有平台都支持这些元素。对于那些不支持的元素，应该如何处理呢？

Koishi 的建议是**尽量兼容实现**。对于平台不支持的元素，可以根据元素的类型和用户的配置进行转化与回退。大致可以分为两种情况：

- 修饰型的元素可以选择只渲染内部的元素，或以适当的方式进行文本修饰。 <br>例如：在不支持粗体的平台上渲染 `<b>` 时，可以改为只渲染粗体的内容。 <br>例如：在不支持列表的平台上渲染 `<ul>` 时，可以在每个列表项前面渲染一个 `-`。

- 占位型的元素尽量转换为可渲染的元素；如果实在无法渲染则抛出错误。 <br>例如：如果平台不支持发送网络图片，可以先将图片下载到本地再发送。 <br>例如：如果平台不支持发送语音，可以改为发送文件，或抛出错误。

对于更加复杂的元素，适配器也可以发挥自主性，设计最适合的交互形式。例如，如果用户的需求是「从若干个选项中选择一个」，那么平台 A 可以渲染出多个按钮供用户点击；平台 B 则可以发送一条带有表态的消息，点击表态对应选择选项；实在不行，平台 C 也可以直接发送选项列表和文本提示语，并将用户的下一次输入作为选项。

### 消息编码器

之前介绍过的 REPL 适配器为了简化写法，并未包含消息的编码过程。对于一般的适配器，我们建议通过继承 `MessageEncoder` 类来实现消息的发送逻辑。

这里我们以 Telegram 平台为例，首先在源码目录下创建 `message.ts`：

```text{6A}
adapter-example
├── src
│   ├── adapter.ts
│   ├── bot.ts
│   ├── index.ts
│   └── message.ts
└── package.json
```

在这个文件中我们定义 `TelegramMessageEncoder`：

```ts title=message.ts
class TelegramMessageEncoder<C extends Context> extends MessageEncoder<C, TelegramBot<C>> {
  // 使用 payload 存储待发送的消息
  private payload: Dict

  constructor(bot: TelegramBot<C>, channelId: string, guildId?: string, options?: SendOptions) {
    super(bot, channelId, guildId, options)
    const chat_id = guildId || channelId
    this.payload = { chat_id, parse_mode: 'html', text: '' }
  }

  // 将发送好的消息添加到 results 中
  async addResult(data: Telegram.Message) {
    const message = decodeMessage(data)
    this.results.push(message)
    const session = this.bot.session()
    session.event.message = message
    session.app.emit(session, 'send', session)
  }

  // 发送缓冲区内的消息
  async flush() {
    let message: Telegram.Message
    if (this.payload.text) {
      message = await this.bot.internal.sendMessage(this.payload)
    }
    await this.addResult(message)
    this.payload.text = ''
  }

  // 遍历消息元素
  async visit(element: h) {
    const { type, attrs, children } = element
    if (type === 'text') {
      this.payload.text += h.escape(attrs.content)
    } else {
      await this.render(children)
    }
  }
}
```

一个 `MessageEncoder` 类需要提供 `flush` 和 `visit` 两个方法。前者用于发送缓冲区内的消息，后者用于遍历消息元素。消息发送完成后，还需要触发 `send` 事件并将结果存储于 `results` 数组中。

与此同时，我们还需要修改 `TelegramBot` 类，为其添加静态属性。实现了 `MessageEncoder` 静态属性后，就无需手动实现 `bot.sendMessage()` 和 `bot.sendPrivateMessage()` 方法了：

```ts title=bot.ts
export class TelegramBot<C extends Context> extends Bot<C, TelegramBot.Config> {
  static MessageEncoder = TelegramMessageEncoder
}
```

### 行内元素

上面的例子仅仅包含了消息编码器的基本结构，并未实现除了文本外的任何消息元素。对于任何非文本元素，上面的代码都会回退到其内部的文本。要添加更多消息元素的支持，只需在 `visit` 方法中添加更多的判断分支，就像这样：

```ts
if (type === 'text') {
  this.payload.text += h.escape(attrs.content)
} else if (['b', 'strong', 'i', 'em', 'u', 'ins', 's', 'del'].includes(type)) {
  // 这些元素都是 Telegram 已经支持的，直接渲染成 HTML 即可
  this.payload.text += `<${type}>`
  await this.render(children)
  this.payload.text += `</${type}>`
} else if (type === 'at') {
  // 将 at 渲染为用户链接
  this.payload.text += `<a href="tg://user?id=${attrs.id}">@${attrs.name || attrs.id}</a>`
} else {
  await this.render(children)
}
```

### 消息分片

在 Koishi 中，一次消息发送可能在目标平台产生多条独立的消息，称为消息分片。这也是为什么上面的 `results` 是一个数组。消息分片产生的原因是多样的：

- 某些元素的语义就是发送独立的消息 (例如 `<message>`)
- 部分平台不支持某些消息元素的组合 (例如图文混合发送)，此时必须对消息进行拆分
- 待发送的消息长度超出平台限制，此时必须对消息进行拆分

在需要对消息进行分片的场合，我们可以手动调用 `flush()` 方法。下面的代码展示了如何实现 `<message>` 元素：

```ts
// 忽略前面的部分
} else if (type === 'message') {
  // 在解析内部元素之前先清空缓冲区
  await this.flush()
  await this.render(children)
  await this.flush()
} else ...
```

### 资源元素

由于不同平台对于媒体资源的支持类型、发送方式、渲染形式有所不同，因此资源元素的情况会更加复杂。可以大致将各种平台规定的发送方式分为以下几类：

1. 通过不同的 API 发送不同类型的资源 (例如 Telegram)
2. 使用统一的 API，但通过不同的字段区分资源类型 (例如 Discord)
3. 先上传资源获得链接或资源 ID，再调用发送 API (例如 Lark)

这里我们还是以 Telegram 平台为例。首先照例修改 `visit` 方法。由于 Telegram 仅支持资源 + 文本的组合 (文本显示在资源下方)，因此我们需要进行消息分片：

```ts
// 忽略前面的部分
} else if (['image', 'audio', 'video', 'file'].includes(type)) {
  await this.flush()
  this.asset = element
} else ...
```

接着，我们需要在 `flush` 方法中处理资源元素。Telegram 的资源上传接口是 `sendPhoto`、`sendAudio` 等，与文本所用的 `sendMessage` 不同，因此我们需要根据资源类型进行判断：

```ts
class TelegramMessageEncoder<C extends Context> extends MessageEncoder<C, TelegramBot<C>> {
  async flush() {
    let message: Telegram.Message
    if (this.asset) {
      const form = new FormData()
      for (const key in this.payload) {
        form.append(key, this.payload[key].toString())
      }
      const { type, attrs } = this.asset
      const { filename, data } = await this.bot.ctx.http.file(attrs.url, attrs)
      if (type === 'image') {
        form.append('photo', data, filename)
        message = await this.bot.internal.sendPhoto(form)
      } else if (type === 'audio') {
        form.append('audio', data, filename)
        message = await this.bot.internal.sendAudio(form)
      } else if (type === 'video') {
        form.append('video', data, filename)
        message = await this.bot.internal.sendVideo(form)
      } else if (type === 'file') {
        form.append('document', data, filename)
        message = await this.bot.internal.sendDocument(form)
      }
      this.asset = null
    } else if (this.payload.text) {
      message = await this.bot.internal.sendMessage(this.payload)
    }
    await this.addResult(message)
    this.payload.text = ''
  }
}
```

差不多这样就实现了资源元素的发送。值得一提的是，这里的代码使用了 `http.file()` 方法。它可以自动为我们处理 `http:`、`file:`、`data:` 等各种协议的资源链接，并将它们统一转换为 `ArrayBuffer`。这可以省去适配器解析资源链接的步骤，对于适配器开发是非常方便的。

## 进阶知识

下面的知识并非适用于所有适配器。但对于一些特殊的平台，你可能会用到它们。

### 发送被动消息

我们通常将机器人做出的交互行为分为两种：主动交互和被动交互。

- 主动交互是指机器人主动进行某些操作，例如定时任务、通知推送。
- 被动交互是指机器人接收到特定事件后做出的响应，例如消息回复、入群欢迎。

遗憾的是，部分平台会限制机器人的主动交互能力。例如，在 QQ (官方机器人) 中，机器人每天只能发送极少量的主动消息；而对于被动消息，则必须在用户发送消息后的短时间内回复。这种平台被称为**被动型平台**。

被动型平台要求适配器在发送消息时尽可能带有回复目标。当然 Koishi 也提供了解决方案：

```ts{5}
class QQGuildMessageEncoder {
  async flush() {
    await this.bot.internal.sendMessages(this.channelId, {
      content: this.content,
      msgId: this.options?.session?.messageId,
    })
  }
}
```

在这一段代码中使用了 `this.options`，它存储了一些额外的发送选项。其中 `session` 正好对应着接收到消息的会话对象。当我们调用 `session.send()` 时，Koishi 会把当前的会话对象传递给 `MessageEncoder`。这样一来，我们就可以在发送消息时带上回复目标了。

### 资源反向代理

一些平台会使用 ID 标识资源文件 (例如 Lark)。当你接收到来自平台的消息时，拿到的是资源 ID 而非资源链接。此时你需要将资源 ID 转换为资源链接，才能构造合法的资源元素。

::: tip
Telegram 是另一种特殊情况。尽管其提供的资源链接是可用的，但这个链接中会明文包含机器人令牌，并非可以公开使用的链接。因此 Telegram 和其他类似平台也适用于这一节的内容。
:::

对于这种情况，一种**不推荐**的做法是直接下载资源，并转存为 `data:` 链接放入消息中。之所以不推荐，是因为这种做法有两大致命缺点：

1. 这些图片本来可以按需加载，但现在却被强制下载到本地，造成额外的带宽消耗。
2. 编码为 `data:` 会导致消息体积大幅增加，极大影响消息处理的性能。

那么，有没有更好的解决方案呢？答案便是资源反向代理。我们要做的，是在本地提供一个路由，将资源 ID 映射到资源链接。这样一来，上面提到的两个问题也就都解决了。

下面是 Lark 适配器的一部分代码，用于实现资源反向代理 (位于 `adapter.ts`)：

```ts
class LarkAdapter {
  static inject = ['router']

  constructor(ctx: Context) {
    ctx.router.get('/lark/assets/:message_id/:key', async (ctx) => {
      const key = ctx.params.key
      const messageId = ctx.params.message_id
      const selfId = ctx.request.query.self_id
      const bot = this.bots.find((bot) => bot.selfId === selfId)
      if (!bot) return ctx.status = 404
      const response = await bot.http(`/im/v1/messages/${messageId}/resources/${key}`, {
        method: 'GET',
        params: { type: 'image' },
        responseType: 'stream',
      })
      ctx.status = 200
      ctx.response.headers['content-type'] = response.headers['content-type']
      ctx.response.body = response.data
    })
  }
}
```

然后在接收消息的逻辑中，我们只需要将资源 ID 转换为资源链接即可：

```ts
h.image(`http://${host}/image/${message_id}/${image_key}?self_id=${selfId}`)
```

::: tip
反向代理同时也带来了一个新的问题，那就是当这个链接被原样发送时，外网可能无法访问到这个链接。但无需担心，上面提到的 `http.file()` 方法恰好可以解决这个问题。因此，即使经过了反向代理，Koishi 也可以确保消息的跨平台转发插件能够正常工作。
:::

### 扩展消息元素

平台可以提供扩展消息元素，但需要加上平台通用名称作为前缀。下面是一个例子：

```html
<kook:card size="lg">
  <kook:countdown end-time="1608819168000"/>
</kook:card>
```

标准元素的平台扩展属性也可以通过加上平台通用名称作为前缀的方式声明。下面是一个例子：

```html
<!-- src 是 audio 元素的标准属性。 -->
<!-- 但 cover 并未标准化，所以需要加前缀。 -->
<audio src="url1" kook:cover="url2"/>
```

::: tip
平台扩展消息元素的属性是否需要前缀由 SDK 实现自行决定。如果某个消息元素希望在未来标准化，那么加上前缀可以降低迁移成本。如果没有标准化需要，那么去掉前缀在书写上更方便。
:::
