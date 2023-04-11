# 消息元素

当然，一个聊天平台所能发送或接收的内容往往不只有纯文本。为此，我们引入了 **消息元素 (Element)** 的概念。

消息元素类似于 HTML 元素，它是组成消息的基本单位。一个元素可以表示具有特定语义的内容，如文本、表情、图片、引用、元信息等。Koishi 会将这些元素转换为平台所支持的格式，以便在不同平台之间发送和接收消息。

## 基本用法

一个典型的元素包含名称、属性和内容。在 Koishi 中，我们通常使用 JSX 或 API 的方式创建元素。下面是一些例子：

::: tabs code
```tsx title=JSX
// 欢迎 @用户名 入群！
session.send(<>欢迎 <at id={userId}/> 入群！</>)

// 发送一张 Koishi 图标
session.send(<image url="https://koishi.chat/logo.png"/>)
```
```ts title=API
// 欢迎 @用户名 入群！
session.send('欢迎 ' + h('at', { id: session.userId }) + ' 入群！')

// 发送一张 Koishi 图标
session.send(h('image', { url: 'https://koishi.chat/logo.png' }))
```
:::

这两种写法各有优劣，不同人可能会有不同的偏好。但无论哪一种写法都表达了同样的意思。

### 使用 JSX

学习 JSX 的写法需要你有一定的 HTML 基础 (如果有 React 基础将更好，尽管这不是必需的)。如果你不熟悉 HTML，可以参考 [这篇文档](https://developer.mozilla.org/zh-CN/docs/Glossary/Element)。

如果你已经学习过 HTML 的相关知识，你唯一额外需要了解的事情就是我们使用单花括号 `{}` 进行插值。你可以在单花括号中使用任何 JavaScript 表达式，它们会在运算完成后成为元素的一部分。此外，我们还为消息元素编写了完整的 [语法规范](../../api/message/syntax.md)，供你参考。

### 使用 API

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

### 混用两种写法

虽然大部分情况下你可能并不想这么做 (看起来很怪不是吗)，但事实上这两种写法也是可以混用的。例如，你可以在 JSX 中使用 `h` 函数：

```tsx
// 欢迎 @用户名 入群！
<>欢迎 {h('at', { id: userId })} 入群！</>
```

也可以反过来，将由 JSX 创建出的元素传入 `h` 函数的参数中：

```tsx
// 创建一个仅包含图片的消息
h('message', <image url="https://koishi.chat/logo.png"/>)
```

## 标准元素

Koishi 提供了一系列标准元素，它们覆盖了绝大部分常见的需求。例如：

- `at`：提及用户
- `quote`：引用回复
- `image`：嵌入图片
- `message`：发送消息

尽管一个平台不太可能支持所有的行为，但适配器对每一个标准元素都进行了最大程度的适配。例如，对于不支持斜体的 QQ 平台，我们会将斜体元素转换为普通文本；对于无法同时发送多张图片的 Discord 平台，我们会将多张图片转换为多条消息分别发送等等。这样一来，开发者便可以在不同平台上使用同一套代码，而不用担心平台差异。

我们先对比较常用的一些元素进行介绍，你可以稍后在 [这个页面](../../api/message/elements.md) 查看所有的标准元素。

### 提及用户和消息

使用 `at` 元素提及用户：

```html
欢迎 <at id={userId}/> 入群！
```

<chat-panel>
<chat-message nickname="Koishi">欢迎 @用户名 入群！</chat-message>
</chat-panel>

使用 `quote` 元素引用回复：

```html
<quote id={messageId}/> 你说得对
```

<chat-panel>
<chat-message nickname="Koishi">
<blockquote>原消息文本</blockquote>
你说得对
</chat-message>
</chat-panel>

### 嵌入图片和其他资源

使用 `image`, `audio`, `video` 和 `file` 元素嵌入图片、音频、视频和文件，它们的用法是类似的。这里以图片为例：

```html
<image url="https://koishi.chat/logo.png"/>
```

<chat-panel>
<chat-message nickname="Koishi">
<img src="https://koishi.chat/logo.png" alt="Koishi Logo" style="max-width: 100px">
</chat-message>
</chat-panel>

上面是对于网络图片的用法，如果你想发送本地图片，可以使用 `file:` URL：

```tsx
import { pathToFileURL } from 'url'
import { resolve } from 'path'

// 发送相对路径下的 logo.png
<image url={pathToFileURL(resolve(__dirname, 'logo.png'))}/>
```

如果图片以二进制数据的形式存在于内存中，你也可以直接通过 `h.image()` 构造 `data:` URL：

```tsx
// 这里的二参数是图片的 MIME 类型
h.image(buffer, 'image/png')

// 它等价于下面的写法
<image url={'data:image/png;base64,' + buffer.toString('base64')}/>
```

## 消息组件

除了标准元素外，Koishi 还提供了一系列名为 **消息组件 (Component)** 的高级元素。例如：

- `execute`：执行指令
- `prompt`：等待输入
- `i18n`：国际化
- `random`：随机选择

这些元素的用法与标准元素类似，但它们不在适配器中实现，而由 Koishi 直接处理。与之相对的，部分消息组件只有在会话环境下才能使用 (例如在 `ctx.broadcast()` 中传入 `<execute>` 是无意义的，也会抛出错误)。

消息组件也是可以由插件扩展的：

```ts
ctx.component('custom', (attrs, children, session) => {
  return '自定义内容'
})

session.send(<custom/>)         // -> 自定义内容
```

我们在 [这个页面](../../api/message/components.md) 中列出了所有的内置组件，你可以稍后在这里查看每个组件的详细用法和适用范围。
