# 表态 (Reaction) <badge type="warning">实验性</badge>

::: warning
这是一个实验性功能，未来可能发生改动。
:::

## API

### bot.createReaction(channelId, messageId, emoji)

- **channelId:** `string` 频道 ID
- **messageId:** `string` 消息 ID
- **emoji:** `string` 表态名称
- 返回值: `Promise<void>`

向特定消息添加表态。

### bot.deleteReaction(channelId, messageId, emoji, userId?)

- **channelId:** `string` 频道 ID
- **messageId:** `string` 消息 ID
- **emoji:** `string` 表态名称
- **userId:** `string` 用户 ID
- 返回值: `Promise<void>`

从特定消息删除某个用户添加的特定表态。如果没有传入用户 ID 则表示删除自己的表态。

### bot.clearReaction(channelId, messageId, emoji?)

- **channelId:** `string` 频道 ID
- **messageId:** `string` 消息 ID
- **emoji:** `string` 表态名称
- 返回值: `Promise<void>`

从特定消息清除某个特定表态。如果没有传入表态名称则表示清除所有表态。

### bot.getReactionList(channelId, messageId, emoji, next?)

- **channelId:** `string` 频道 ID
- **messageId:** `string` 消息 ID
- **emoji:** `string` 表态名称
- **next:** `string` 分页令牌
- 返回值: `Promise<List<User>>`

获取添加特定消息的特定表态的用户列表。

### bot.getReactionIter(channelId, messageId, emoji) <badge>内置</badge>

- **channelId:** `string` 频道 ID
- **messageId:** `string` 消息 ID
- **emoji:** `string` 表态名称
- 返回值: `AsyncIterable<User>` 异步迭代器

获取添加特定消息的特定表态的用户的异步迭代器。

## 事件

### reaction-added

- **session:** `Session` 会话对象
- 触发方式: emit

添加表态时触发。

### reaction-removed

- **session:** `Session` 会话对象
- 触发方式: emit

删除表态时触发。
