# 標準元素

这里列出了应该由各适配器实现的标准消息元素。各适配器由于平台的限制可能表现出一定的行为差异，但应尽可能贴近标准规定的语义。

::: tip
为了方便记忆，我们使用了许多 HTML 中出现的标签来表达类似的语义，如 `<p>`, `<em>` 等。但需要指出的是，这并不意味着这些同名的标签就有着相同的语义。这里举出几个例子：

- HTML 中标签 `<u>` 的定义是「表意不清标注元素」，而 Koishi 这里只使用了下划线的功能
- HTML 中图像对应 `<img>` 标签，而 Koishi 中则是 `<image>`，并且语法也不相同
  :::

## 基础元素

基础元素是最常见的消息元素，它们能够在大多数平台上正常显示，是组成消息的基本单位。

### 纯文本 (text) {#text}

- **content:** `string` 文本内容

这是一个特殊的消息元素。它等价于一段纯文本，并且在序列化时也不会带两侧的标签。

### 提及用户 (at) {#at}

- **id:** `string` 目标用户的 ID
- **name:** `string` 目标用户的名称
- **role:** `string` 目标角色
- **type:** `string` 特殊操作，例如 all 表示 @全体成员，here 表示 @在线成员

`<at>` 元素用于提及某个或某些用户。

:::tip
由于上述几个属性的语义是互斥的，发送时使用 `id`, `role`, `type` 其一即可。
:::

### 提及频道 (sharp) {#sharp}

- **id:** `string` 目标频道的 ID
- **name:** `string` 目标频道的名称

`<sharp>` 元素用于提及某个频道。

<!-- ### 表情 (face)

- **id:** `string` 表情的 ID
- **name:** `string` 表情的名称
- **platform:** `string` 表情显示的平台

`<face>` 元素用于显示某个表情。通常来说为了跨平台转发，在 `<face>` 内部还会增加 `<image>` 作为回退。当图片的存在可能导致消息分片时，可以使用 `name` 取代图片的渲染。 -->

### 链接 (a) {#a}

- **href:** `string` 链接的 URL

`<a>` 元素用于显示一个链接。当平台不支持链接时，建议显示为 `content (href)` 的形式。

## 资源元素

资源消息元素表示文本中存在的资源文件。不同的平台对资源文件的支持存在较大的差异。发送时只需提供 `src`。如果某个平台不支持特定的资源类型，适配器应该用 `src` 代替。如果某个平台不支持将资源消息元素和其他消息元素同时发送，适配器应该分多条发送，并返回最后一条消息的 ID。

- **src:** `string` 资源的 URL
- **title:** `string` 资源文件名称
- **cache:** `boolean` 是否使用已缓存的文件
- **timeout:** `string` 下载文件的最长时间

::: tip
**非网络资源的 URL 写法**

- 本地文件请使用 `file:` 协议
- 二进制数据请使用 `data:` 协议

关于它们的最佳实践，可以参考 [嵌入图片和其他资源](../../guide/basic/element.md#嵌入图片和其他资源)。
:::

### 图片 (img) {#img}

除了上述通用属性外，还支持下面的属性：

- **width:** `number` 图片宽度 (像素)
- **height:** `number` 图片高度 (像素)

`<img>` 元素用于表示图片。

### 音频 (audio) {#audio}

除了上述通用属性外，还支持下面的属性：

- **duration:** `number` 音频长度 (秒)
- **poster:** `string` 音频封面 URL

`<audio>` 元素用于表示语音。

### 视频 (video) {#video}

除了上述通用属性外，还支持下面的属性：

- **width:** `number` 视频宽度 (像素)
- **height:** `number` 视频高度 (像素)
- **duration:** `number` 视频长度 (秒)
- **poster:** `string` 视频封面 URL

`<video>` 元素用于表示视频。

### 文件 (file) {#file}

除了上述通用属性外，还支持下面的属性：

- **poster:** `string` 文件封面 URL

`<file>` 元素用于表示文件。

## 修饰元素

修饰元素用于修饰其中的内容。如果对应的平台不支持对应的元素，可以忽略这个元素本身，正常渲染其中的子元素。

### 粗体 (b, strong) {#b}

`<b>` 或 `<strong>` 元素用于将其中的内容以粗体显示。

### 斜体 (i, em) {#i}

`<i>` 或 `<em>` 元素用于将其中的内容以斜体显示。

### 下划线 (u, ins) {#u}

`<u>` 或 `<ins>` 元素用于为其中的内容附加下划线。

### 删除线 (s, del) {#s}

`<s>` 或 `<del>` 元素用于为其中的内容附加删除线。

### 剧透 (spl) {#spl}

`<spl>` 元素用于将其中的内容标记为剧透 (默认会被隐藏，点击后才显示)。

### 代码 (code) {#code}

`<code>` 元素用于将其中的内容以等宽字体显示 (通常还会有特定的背景色)。

### 上标 (sup) {#sup}

`<sup>` 元素用于将其中的内容以上标显示。

### 下标 (sub) {#sub}

`<sub>` 元素用于将其中的内容以下标显示。

## 排版元素

### 换行 (br) {#br}

`<br>` 元素表示一个独立的换行。

### 段落 (p) {#p}

`<p>` 元素表示一个段落。在渲染时，它与相邻的元素之间会确保有一个换行。

### 消息 (message) {#message}

- **id:** `string` 消息 ID
- **forward:** `boolean` 是否为转发消息

`<message>` 元素的基本用法是表示一条消息。子元素对应于消息的内容。如果其没有子元素，则消息不会被发送。

当出现 `<message>` 元素时，之前的元素会被立即视为一条消息被发送。因此下面的两种写法是等价的：

```html
<!-- 第一种写法：发送两条消息 -->
<message>hello</message>
<message>world</message>

<!-- 第二种写法：用一条空消息隔开两段文本，实际上仍然会发送两条消息 -->
hello<message/>world
```

部分平台允许你模拟其他用户发送消息：

```html
<message>
  <author id="123123123" name="Alice" avatar="url"/>
  hello world
</message>
```

在支持转发的平台上，你可以使用 `forward` 配合 `id` 属性来转发一条消息：

```html
<message id="123456789" forward/>
```

在支持合并转发的平台上，你可以使用带有 `forward` 属性的 `<message>` 元素嵌套其他 `<message>` 元素来实现合并转发：

```html
<message forward>
  <message id="123456789"/>
  <message id="987654321"/>
  <!-- 合并转发里也可以嵌套模拟其他用户发送的消息 -->
  <message>
    <author id="123123123" name="Alice" avatar="url"/>
    hello world
  </message>
</message>
```

## 元信息元素

元信息元素通常不会被渲染，但会影响到消息的发送行为。

### 引用 (quote) {#quote}

`<quote>` 元素用于表示对消息引用。它的子元素会被渲染为引用的内容。理论上所有 `<message>` 元素的特性也可以用于 `<quote>` 元素，包括子元素 (构造引用消息) 和 `forward` 属性 (引用合并转发)。然而目前似乎并没有平台提供了这样的支持。

### 作者 (author) {#author}

- **id:** `string` 用户 ID
- **name:** `string` 昵称
- **avatar:** `string` 头像 URL

`<author>` 元素用于表示消息的作者。它的子元素会被渲染为作者的名字。

## 交互元素

交互元素用于显然消息中的可交互性内容。如果平台不支持此类元素且难以提供回退，可以直接忽略整个元素。实现侧应当根据平台特性，针对性地返回带有交互和不带有交互的消息。

### 按钮 (button) <badge type="warning">实验性</badge> {#button}

- **id:** `string` 按钮的 ID
- **type:** `string` 按钮的类型
- **href:** `string` 按钮的链接
- **text:** `string` 待输入文本
- **theme:** `string` 按钮的风格

`<button>` 元素用于表示一个按钮。它的子元素会被渲染为按钮的文本。

按钮目前支持三种不同的类型：

- 点击 `action` 类型的按钮时会触发一个 `interaction/button` 事件，该事件的 `button` 资源会包含上述 `id`
- 点击 `link` 类型的按钮时会打开一个链接，该链接的地址为上述 `href`
- 点击 `input` 类型的按钮时会在用户的输入框中填充上述 `text`

`theme` 仅建议使用下列值：

- primary
- secondary
- success
- warning
- danger
- info
