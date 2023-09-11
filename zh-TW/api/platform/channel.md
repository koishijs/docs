# 频道 (Channel)

::: tip
消歧义：本节介绍跨平台协议中的频道对象。

- 要了解数据库中的频道，请前往 [API > 数据库 > 内置数据结构](../database/built-in.md#channel)
- 要了解两者的区别，请前往 [API > 术语表](../glossary.md#频道)
:::

## 类型定义

```ts
export interface Channel {
  id: string
  name: string
}
```

## API

### bot.getChannel(channelId)

- **channelId:** `string` 频道 ID
- 返回值: `Promise<Channel>` 频道信息

获取频道信息。

### bot.getChannelList(guildId, next?)

- **guildId:** `string` 群组 ID
- **next:** `string` 分页令牌
- 返回值: `Promise<List<Channel>>` 频道列表

获取某个群组的频道列表。

### bot.getChannelIter(guildId) <badge>内置</badge>

- **guildId:** `string` 群组 ID
- 返回值: `AsyncIterable<Channel>` 迭代器

获取某个群组的频道列表的异步迭代器。
