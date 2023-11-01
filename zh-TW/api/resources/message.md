# 消息 (Message)

## 类型定义

```ts
interface Message {
  id: string
  channel?: Channel
  user?: User
  member?: Member
  quote?: Message
  content: string
  createdAt?: number
  updatedAt?: number
}
```

## API

### bot.sendMessage(channelId, content) <badge>内置</badge>

- **channelId:** `string` 频道 ID
- **content:** `Fragment` 要发送的内容
- 返回值: `Promise<string[]>` 发送的消息 ID

向特定频道发送消息。

::: warning
只要你能够获取到会话对象，你就不应使用此 API，而应该使用 `session.send()`。一些平台会将主动发送的消息同被动接收后回复的消息区分开来，甚至可能限制主动消息的发送，因此使用 `session.send()` 总是有更好的可靠性。
:::

::: tip
`bot.sendMessage()` 既可以发送群聊消息，也可以发送私聊消息。当发送私聊消息时，其与 `bot.sendPrivateMessage()` 的区别在于前者传入的是频道 ID，而后者传入的是用户 ID。
:::

::: tip
大多数情况下应当使用 [`MessageEncoder`](../message/encoder.md) 实现消息发送功能，而不是直接实现此方法。
:::

### bot.sendPrivateMessage(userId, content, guildId?) <badge>内置</badge>

- **userId:** `string` 对方 ID
- **content:** `Fragment` 要发送的内容
- **guildId:** `string` 群组 ID
- 返回值: `Promise<string[]>` 发送的消息 ID

向特定用户发送私聊消息。

### bot.getMessage(channelId, messageId)

- **channelId:** `string` 频道 ID
- **messageId:** `string` 消息 ID
- 返回值: `Promise<Message>`

获取特定消息。

### bot.deleteMessage(channelId, messageId)

- **channelId:** `string` 频道 ID
- **messageId:** `string` 消息 ID
- 返回值: `Promise<void>`

撤回特定消息。

### bot.editMessage(channelId, messageId, content)

- **channelId:** `string` 频道 ID
- **messageId:** `string` 消息 ID
- **content:** `Fragment` 要发送的内容
- 返回值: `Promise<void>`

修改特定消息。

### bot.getMessageList(channelId, next?)

- **channelId:** `string` 频道 ID
- **next:** `string` 分页令牌
- 返回值: `Promise<List<Message>>` 消息列表

获取频道消息列表。

### bot.getMessageIter(channelId) <badge>内置</badge>

- **channelId:** `string` 频道 ID
- 返回值: `AsyncIterable<Message>` 异步迭代器

获取频道消息的异步迭代器。

### bot.broadcast(channels, content, delay?) <badge>内置</badge>

- **channels:** `string[]` 频道列表
- **content:** `string` 要发送的内容
- **delay:** `number` 发送消息间的延迟，默认值为 [`config.delay.broadcast`](../core/app.md#options-delay)
- 返回值: `Promise<string[]>` 成功发送的消息 ID 列表

向多个频道广播消息。如有失败不会抛出错误。

## 事件

### message-created

- **session:** `Session` 会话对象
- 触发方式: emit
- 别名: `message`

收到消息时触发。

### message-updated

- **session:** `Session` 会话对象
- 触发方式: emit

消息被修改时触发。

### message-deleted

- **session:** `Session` 会话对象
- 触发方式: emit

消息被撤回时触发。
