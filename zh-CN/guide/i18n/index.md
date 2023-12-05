# 基本用法

::: tip
在学习本章之前，建议先完整阅读 [入门 > 国际化](../../manual/usage/customize.md#国际化)。
:::

如果你在运营一个大型社区，那么你可能会遇到这种场景：群组内设立了许多不同语言的频道，每个频道分别供不同地区的用户进行交流。在这种情况下，最合适的做法是让你的机器人在不同的频道下使用不同的语言进行回复。本质上，这不会改变机器人的运行逻辑，因此最好的做法是将涉及的每一段文本都抽离出来，通过统一的方式进行管理，并在发送前进行本地化渲染。

## 基本示例

让我们先看一个最简单的例子：

```ts
ctx.i18n.define('zh-CN', { hello: '你好！' })
ctx.i18n.define('en-US', { hello: 'Hello!' })
```

上面的代码定义了两种语言下 `hello` 对应的翻译文本。其中 `zh-CN` 和 `en-US` 称为语言名，`hello` 称为渲染路径，后面的字符串是对应的翻译文本。

现在我们把它用在 `session.text()` 中：

```ts
ctx.middleware((session, next) => {
  if (session.content === 'greeting') {
    return session.text('hello')
  } else {
    return next()
  }
})
```

<chat-panel>
<chat-message nickname="Alice">greeting</chat-message>
<chat-message nickname="Koishi">你好！</chat-message>
</chat-panel>

我们看到机器人回复了「你好！」，这是因为 Koishi 使用的默认语言是中文。

现在，如果我们希望它在某个频道使用英文，我们只需设置这个频道的属性：

```ts
channel.locales = ['en-US']
```

<chat-panel>
<chat-message nickname="Alice">greeting</chat-message>
<chat-message nickname="Koishi">Hello!</chat-message>
</chat-panel>

## 模板能力

### 插值语法

向 `session.text()` 中传入第二个参数，就可以在模板中使用单花括号插值。花括号中的内容将对应传入列表的索引。

```ts
ctx.i18n.define('zh-CN', { hello: '你好，{0}！' })
ctx.i18n.define('en-US', { hello: 'Hello, {0}!' })

ctx.middleware((session, next) => {
  if (session.content === 'greeting') {
    return session.text('hello', [session.author.name])
  } else {
    return next()
  }
})
```

<chat-panel>
<chat-message nickname="Alice">greeting</chat-message>
<chat-message nickname="Koishi">Hello, Alice!</chat-message>
</chat-panel>

这里的参数也可以是一个对象，此时花括号中的内容仍然表示对象的索引。

```ts
ctx.i18n.define('zh-CN', { hello: '你好，{username}！' })
ctx.i18n.define('en-US', { hello: 'Hello, {username}!' })

ctx.middleware((session, next) => {
  if (session.content === 'greeting') {
    return session.text('hello', session.author)
  } else {
    return next()
  }
})
```

如果要访问对象深层的内容，只需将多个属性之间用 `.` 连接。利用这种方法，你甚至可以把整个 `session` 传进去：

```ts
ctx.i18n.define('zh-CN', { hello: '你好，{author.name}！' })
ctx.i18n.define('en-US', { hello: 'Hello, {author.name}!' })
```

上述三段代码的实际效果完全相同，可以根据自己的需要进行选择。

## 渲染回退

一次完整的本地化渲染可能涉及多种不同优先级的语言和渲染路径。当首选语言的首选路径对应的翻译文本不存在时，会依次尝试使用其他翻译，这就是渲染回退。

### 基于语言的回退

首先需要了解的是基于语言的回退。根据 [IETF 语言标签](https://zh.wikipedia.org/wiki/IETF%E8%AA%9E%E8%A8%80%E6%A8%99%E7%B1%A4) 规范，一个语言名称可以包含由 `-` 分隔的多个部分，例如 `de-DE-bavarian`。用户可以为应用设置 [`config.i18n.locales`](../../api/core/app.md#i18n-locales) 来指定可用的语言列表，这些语言将按照 `-` 分隔符形成一棵字典树，而 Koishi 会按照以下规则进行回退：

1. 找到目标语言的在字典树中出现的最长前缀对应的节点；
2. 按照用户配置的优先级渲染改节点的子树所包含的语言，并将它们移除；
3. 如果此时仍有未被渲染过的语言，那么回到 1 继续遍历，直到所有语言被遍历完全。

例如，如果用户配置的语言列表为 `zh-CN`, `en-US`, `zh-TW`, `en-GB`，则对于不同的目标语言会生成对应的回退序列：

- 目标语言为 `en`，回退序列为 `en`, `en-US`, `en-GB`, ` `, `zh`, `zh-CN`, `zh-TW`
- 目标语言为 `zh-TW`，回退序列为 `zh-TW`, `zh`, `zh-CN`, `en`, `en-US`, `en-GB`, ` `
- 目标语言为 `de-DE`，回退序列为 ` `, `zh`, `zh-CN`, `zh-TW`, `en`, `en-US`, `en-GB`
- 目标语言为 `en`, `zh-TW`，回退序列为 `en`, `en-US`, `en-GB`, `zh-TW`, `zh`, `zh-CN`, ` `
- 目标语言为 `zh-TW`, `en`，回退序列为 `zh-TW`, `en`, `en-US`, `en-GB`, `zh`, `zh-CN`, ` `

请注意，空字符串也被视为合法的语言，其所代表的是「没有指定语言」的情况。在实践中，空语言的使用是非常广泛的，例如当用户使用下面的代码定义指令：

```ts
ctx.command('echo', '回声')
```

此时我们无法推测出「回声」的语言，因此它将会被作为路径 `commands.echo.name` 注册到空语言下。用户可以为其定义其他语言的翻译，但在未命中任何翻译时，它将回退到空语言。

### 基于会话的回退

实际的本地化渲染通常发生在消息会话中。对于一个会话，我们可以从以下几个维度来确定它的目标语言 (每个维度都可以存在多个目标语言)：

- 会话语言 (`session.locales`)
- 频道语言 (`session.channel.locales`)
- 群组语言 (`session.guild.locales`)
- 用户语言 (`session.user.locales`)

最终的目标语言将会是上述语言按顺序的并集，再根据前面介绍的规则进行回退渲染。

会话语言可以在一些交互场景中被直接感知得到。例如，用户如果在聊天平台中已经设置了语言偏好 (并且聊天平台提供了相应的 API)，则相关的设置可以通过适配器插件提供给会话。又比如，当开发者为一个指令设置了多种语言的别名时，可以为这些别名手动指定语言，当用户调用某一个别名时，Koishi 会按照设定好的语言来回答。

用户语言与频道、群组语言的优先关系可以通过 [`config.i18n.output`](../../api/core/app.md#i18n-output) 来指定。默认情况下频道和群组的语言优先级高于用户语言，但是你可以将其设置为 `prefer-user` 来改变这一行为。

### 基于路径的回退

你也可以配置多个路径，将会按照顺序查找翻译，直到找到一个翻译为止。

```ts
session.text(['foo', 'bar'])
```

::: tip
路径回退的优先级低于语言回退。举个例子，假如可选的语言包括 A 和 B，路径包括 1 和 2。翻译 A1 不存在，但是翻译 A2 和 B1 都存在。这种情况下会输出 B1 而非 A2。采用这种设计是因为不同的路径通常表达了不同的逻辑。相比语言的正确性，逻辑的正确性更重要。
:::

利用这种行为，你可以实现静默渲染。下面的代码当未找到翻译时，将只会输出一个空串，并且不会输出警告：

```ts
session.text(['foo', ''])
```
