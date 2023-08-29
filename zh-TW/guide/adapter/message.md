# 訊息編碼

::: danger 注意
此页文档正在施工，其中的内容可能不是最新。
:::

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

## 傳送訊息

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
class TelegramMessageEncoder extends MessageEncoder {
  // 使用 payload 存储待发送的消息
  private payload: Dict

  constructor(bot: TelegramBot, channelId: string, guildId?: string, options?: SendOptions) {
    super(bot, channelId, guildId, options)
    const chat_id = guildId || channelId
    this.payload = { chat_id, parse_mode: 'html', text: '' }
  }

  // 将发送好的消息添加到 results 中
  async addResult(message: Telegram.Message) {
    const session = this.bot.session()
    await adaptMessage(message, session)
    this.results.push(session)
    session.app.emit(session, 'send', session)
  }

  // 发送缓冲区内的消息
  async flush() {
    if (this.payload.text) {
      const message = await this.bot.internal.sendMessage(this.payload)
      await this.addResult(message)
      delete this.payload.reply_to_message_id
      this.payload.text = ''
    }
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

一个 `MessageEncoder` 类需要提供 `flush` 和 `visit` 两个方法。前者用于发送缓冲区内的消息，后者用于遍历消息元素。消息发送完成后，还需要构造相应的 `Session`，用于触发 `send` 会话事件并存储于 `results` 数组中。

与此同时，我们还需要修改 `TelegramBot` 类，为其添加静态属性。实现了 `MessageEncoder` 静态属性后，就无需手动实现 `bot.sendMessage()` 和 `bot.sendPrivateMessage()` 方法了：

```ts title=bot.ts
export class TelegramBot extends Bot<TelegramBot.Config> {
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

在需要对消息进行分片的场合，我们可以手动调用 `flush()` 方法。例如下面的代码展示了如何实现 `<message>` 和 `<quote>` 元素：

```ts
// 忽略前面的部分
} else if (type === 'quote') {
  // 将引用消息的 ID 添加到缓冲区
  this.payload.reply_to_message_id = attrs.id
} else if (type === 'message') {
  // 在解析内部元素之前先清空缓冲区
  await this.flush()
  await this.render(children)
  await this.flush()
} else ...
```

