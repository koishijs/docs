# 渲染 API

## 实例属性

一个消息元素对象的结构如下：

```ts
interface Element {
  type: string
  attrs: object
  children: Element[]
}
```

## 静态方法

### h(type, attrs?, ...children?)

- **type:** `string | Function` 消息元素类型
- **attrs:** `object` 消息元素属性
- **children:** `Element[]` 子消息元素
- 返回值: `Element` 生成的消息元素

构造一个消息元素对象。如果 `type` 是一个函数，则会视为一个自定义消息组件。

### h.escape(source, inline?)

- **source:** `string` 源文本
- **inline:** `boolean` 在属性内部转义 (会额外处理引号)
- 返回值: `string` 转义过后的文本

转义一段文本到消息元素格式。

### h.unescape(source)

- **source:** `string` 源文本
- 返回值: `string` 转义前的文本

取消一段文本的消息元素转义。

### h.parse(source, context?)

- **source:** `string` 源文本
- **context:** `object` 插值上下文
- 返回值: `Element[]` 消息元素数组

解析一段文本内的全部消息元素。其中的纯文本将会解析成 `text` 类型。

当传入 `context` 对象时，将会自动识别源文本中的插值语法并进行替换。

### h.select(source, query)

- **source:** `string | Element[]` 源文本或消息元素数组
- **query:** `string` 选择器
- 返回值: `Element[]` 消息元素数组

使用选择器在一段文本或消息元素数组中查找。支持的语法包括：

- 通配选择器 `*`
- 元素选择器 `type`
- 选择器列表 `sel1, sel2`
- 组合器
  - 后代组合器 `sel1 sel2`
  - 直接子代组合器 `sel1 > sel2`
  - 一般兄弟组合器 `sel1 ~ sel2`
  - 紧邻兄弟组合器 `sel1 + sel2`

如果传入了字符串，则会先使用 [`h.parse()`](#h-parse) 进行解析。

### h.transform(source, rules, session?)

- **source:** `string | Element[]` 源文本或消息元素数组
- **rules:** `Dict<Transformer>` 转换规则，以消息元素类型为键
- **session:** `Session` 会话对象
- 返回值: `string | Element[]` 转换后的文本或消息元素数组

将一段文本或消息元素数组中的所有消息元素按照规则进行转换。转换规则的定义方式如下：

```ts
type Fragment = string | Element | (string | Element)[]
type Transformer = boolean | ((
  attrs: Dict,
  children: Element[],
  session: Session,
) => Fragment)
```

返回值会与传入的参数保持相同类型。如果传入了字符串，则会先使用 [`h.parse()`](#h-parse) 进行解析，并在转换完成后重新序列化。

### h.transformAsync(source, rules, session?)

- **source:** `string | Element[]` 源文本或消息元素数组
- **rules:** `Dict<AsyncTransformer>` 转换规则，以消息元素类型为键
- **session:** `Session` 会话对象
- 返回值: `Promise<string | Element[]>` 转换后的文本或消息元素数组

与 [`h.transform()`](#h-transform) 类似，但转换规则可以是异步的，同一层级的各元素的转换将同时进行。转换规则的定义方式如下：

```ts
type AsyncTransformer = boolean | ((
  attrs: Dict,
  children: Element[],
  session: Session,
) => Awaitable<Fragment>)
```

## 快捷调用

我们也为一些常见的标准元素提供了语法糖，可以直接通过一些静态方法进行调用。

```ts
// content
h.text(content)

// id
h.at(id)
h.sharp(id)
h.quote(id)

// url
h.image(url)
h.audio(url)
h.video(url)
h.file(url)

// buffer
h.image(buffer, 'image/png')
h.audio(buffer, 'audio/mpeg')
h.video(buffer, 'video/mp4')
h.file(buffer, 'application/octet-stream')
```
