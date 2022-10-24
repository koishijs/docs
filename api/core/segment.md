# 消息段 (Segment)

**消息段** 的概念类似于 HTML 中的标签，用于描述具有特定语义的内容。Koishi 提供了两种方式处理消息：字符串和消息段数组。它们之间可以相互转换。

```ts
// 会话属性
session.content                         // 字符串
session.elements                        // 消息段数组

// 发送消息
session.send('Hello, world!')           // 发送字符串
session.send(segment('at', { id }))     // 发送消息段
```

我们为常见的消息段提供了静态方法，以方便使用：

```ts
session.send(segment.image(url))        // 发送图片
```

对于复杂的消息段，我们也提供了 `h` 的别名。下面的写法是等价的：

```ts
session.send(h('image', { url }))       // 发送图片
```

## 实例属性

一个消息段对象的结构如下：

```ts
interface segment {
  type: string
  attrs: object
  children: segment[]
}
```

## 静态方法

### segment(type, attrs?, children?)

- **type:** `string` 消息段类型
- **attrs:** `object` 消息段属性
- **children:** `segment[]` 子消息段
- 返回值: `segment` 生成的消息段

构造一个消息段对象。

### segment.escape(source, inline?)

- **source:** `string` 源文本
- **inline:** `boolean` 在属性内部转义 (会额外处理引号)
- 返回值: `string` 转义过后的文本

转义一段文本到消息段格式。

### segment.unescape(source)

- **source:** `string` 源文本
- 返回值: `string` 转义前的文本

取消一段文本的消息段转义。

### segment.parse(source)

- **source:** `string` 源文本
- 返回值: `segment[]` 消息段数组

解析一段文本内的全部消息段。其中的纯文本将会解析成 text 类型。

### segment.select(source, query)

- **source:** `string | segment[]` 源文本或消息段数组
- **query:** `string` 选择器
- 返回值: `segment[]` 消息段数组

使用选择器在一段文本或消息段数组中查找。支持的语法包括：

- 通配选择器 `*`
- 元素选择器 `type`
- 选择器列表 `sel1, sel2`
- 组合器
  - 后代组合器 `sel1 sel2`
  - 直接子代组合器 `sel1 > sel2`
  - 一般兄弟组合器 `sel1 ~ sel2`
  - 紧邻兄弟组合器 `sel1 + sel2`

如果传入了字符串，则会先使用 [`segment.parse()`](#segment-parse-source) 进行解析。

### segment.transform(source, rules)

- **source:** `string | segment[]` 源文本或消息段数组
- **rules:** `Dict<Transformer>` 转换规则，以消息段类型为键
- 返回值: `string | segment[]` 转换后的文本或消息段数组

将一段文本或消息段数组中的所有消息段按照规则进行转换。转换规则的定义方式如下：

```ts
type Content = string | segment | (string | segment)[]
type Transformer =
  | boolean
  | Content
  | ((attrs: Dict, index: number, array: segment[]) => Content)
```

返回值会与传入的参数保持相同类型。如果传入了字符串，则会先使用 [`segment.parse()`](#segment-parse-source) 进行解析，并在转换完成后重新序列化。

### segment.transformAsync(source, rules)

- **source:** `string | segment[]` 源文本或消息段数组
- **rules:** `Dict<AsyncTransformer>` 转换规则，以消息段类型为键
- 返回值: `Promise<string | segment[]>` 转换后的文本或消息段数组

与 [`segment.transform()`](#segment-transform-source-rules) 类似，但转换规则可以是异步的，同一层级的各元素的转换将同时进行。转换规则的定义方式如下：

```ts
type AsyncTransformer =
  | boolean
  | Content
  | ((attrs: Dict, index: number, chain: segment[]) => Awaitable<Content>)
```

## 元素消息段

元素消息段是一段拥有特定语义的文本，通常可以出现在一段消息中的任何位置。发送时只需提供 `id`。当存在不受支持的消息段时，适配器应该用 `name` 或 `id` 代替。

### 纯文本 (text)

- **content:** `string` 文本内容

这是一个特殊的消息段。使用 `segment('text', { content })` 将等价于 `content` 本身。此消息段仅出现于 `segment.parse()` 方法的返回值中。

### 指定用户 (at)

- **id:** `string` 目标用户的 ID
- **name:** `string` 目标用户的名称
- **role:** `string` 目标角色
- **type:** `string` 特殊操作，例如 all 表示 @全体成员，here 表示 @在线成员

由于上述几个属性的语义是互斥的，发送时使用 `id`, `role`, `type` 其一即可。

### 指定频道 (sharp)

- **id:** `string` 目标频道的 ID
- **name:** `string` 目标频道的名称

### 表情 (face)

- **id:** `string` 表情的 ID
- **name:** `string` 表情的名称

## 资源消息段

资源消息段表示文本中存在的资源文件。不同的平台对资源文件的支持存在较大的差异。发送时只需提供 `url`。如果某个平台不支持特定的资源类型，适配器应该用 `url` 代替。如果某个平台不支持将资源消息段和其他消息段同时发送，适配器应该分多条发送，并返回最后一条消息的 ID。

- **file:** `string` 资源在本地目录的相对路径
- **url:** `string` 资源的 URL（可以是网络 URL，文件绝对路径，或 base64 协议等）
- **cache:** `boolean` 是否使用已缓存的文件
- **timeout:** `string` 下载文件的最长时间

### 图片 (image)

除了上述通用属性外，还支持下面的属性：

- **type:** 特殊类型，例如 flash 表示 QQ 闪照

### 语音 (audio)

参见上述通用属性。

### 视频 (video)

参见上述通用属性。

### 文件 (file)

参见上述通用属性。

## 前缀消息段

前缀消息段只会出现在一段消息的第一个，用于表示这段消息的发送方式。由于其本身不包含任何信息，发送前应从消息中清除。

### 引用 (quote)

- **id:** `string` 要引用的消息 ID

### 卡片 (card)

### 匿名 (anonymous)

- **ignore:** `boolean` 当无法发送匿名消息时，如果此项为 `true`，则直接删去此前缀码；否则将不产生任何输出

### Markdown (markdown)
