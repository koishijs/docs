# 消息元素

当然，一个聊天平台所能发送或接收的内容往往不只有纯文本。为此，我们引入了 **消息元素 (Message Element)** 的概念。

消息元素类似于 HTML 元素，它是组成消息的基本单位。一个元素可以表示具有特定语义的内容，如文本、表情、图片、引用、元信息等。Koishi 会将这些元素转换为平台所支持的格式，以便在不同平台之间发送和接收消息。

## 基本用法

一个典型的元素包含名称、属性和内容。在 Koishi 中，我们通常使用 JSX 或 API 的方式创建元素。下面是一些例子：

::: tabs code
```tsx title=JSX
// @某某用户 我在叫你哟！(后半部分加粗)
session.send(<><at id={userId}/><b>我在叫你哟！</b></>)

// 发送一张 Koishi 图标
session.send(<image url="https://koishi.chat/koishi.png"/>))
```
```ts title=API
// @某某用户 我在叫你哟！(后半部分加粗)
session.send(h('at', { id: userId }) + h('b', '我在叫你哟！'))

// 发送一张 Koishi 图标
session.send(h('image', { url: 'https://koishi.chat/koishi.png' }))
```
:::

这两种写法各有优劣，不同人可能会有不同的偏好。但无论哪一种写法都表达了同样的意思。

### JSX

学习 JSX 的写法需要你有一定的 HTML 基础 (如果有 React 基础将更好，尽管这不是必需的)。如果你不熟悉 HTML，可以参考 [这篇文档](https://developer.mozilla.org/zh-CN/docs/Glossary/Element)。

如果你已经学习过 HTML 的相关知识，你唯一额外需要了解的事情就是我们使用单花括号 `{}` 进行插值。你可以在单花括号中使用任何 JavaScript 表达式，它们会在运算完成后成为元素的一部分。此外，我们还为消息元素编写了完整的 [语法规范](../../api/message/syntax.md)，供你参考。

### API

对于更喜欢原生 JavaScript 的人，我们也提供了 API 的方式来创建元素。Koishi 提供一个 `h` 函数，它有着灵活的使用方式：

```ts
// 第一个参数是元素名称 (必选)
h('message')

// 你可以传入一个由属性构成的对象作为第二个参数
h('quote', { id })

// 后续参数是元素的内容，可以是字符串或其他元素
h('p', {}, 'hello')

// 没有属性时二参数可以忽略不写
h('p', 'hello', h('image', { url }))
```
