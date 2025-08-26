# 消息编码器 (MessageEncoder) <badge type="warning">实验性</badge>

:::warning
这是一个实验性功能，未来可能发生改动。
:::

:::tip
参见：[开发 > 跨平台 > 消息编码](../../guide/adapter/message.md)
:::

标有 <badge>抽象</badge> 的方法需要由适配器插件自行实现。

## 使用方法

消息编码器通常不直接进行构造，而是以关联类型的形式绑定在 [`Bot`](../core/bot.md) 类的静态成员上，用于实现 [`bot.sendMessage()`](../resources/message.md#bot-sendmessage) 等方法。

```ts title=bot.ts
export class MyBot extends Bot {
  static MessageEncoder = MyMessageEncoder
}
```

## 实例方法

### new MessageEncoder(bot, channelId)

- **bot:** [`Bot`](../core/bot.md) 机器人实例
- **channelId:** `string` 频道 ID

构造一个 `MessageEncoder` 实例。

### encoder.flush() <badge>抽象</badge>

- 返回值: `Promise<void>`

向平台发送消息，清空缓冲区。

### encoder.visit(element) <badge>抽象</badge>

- **element:** [`Element`](./api.md) 消息元素

渲染某一个消息元素。如果其有子元素，可以使用 [`encoder.render(element)`](#encoder-render) 进行递归遍历。

### encoder.render(elements)

- **element:** [`Element[]`](./api.md) 消息元素
- 返回值: `Promise<void>`

渲染一组元素。

### encoder.send(content)

- **content:** `Fragment` 消息元素
- 返回值: `Promise<Message[]>`

解析并发送一段内容。返回发送的消息列表。
