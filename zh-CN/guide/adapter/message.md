# 消息编码

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
