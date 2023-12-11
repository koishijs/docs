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
  type: ChannelType
  parent_id?: string
}

export enum ChannelType {
  TEXT = 0,
  DIRECT = 1,
  VOICE = 2,
  CATEGORY = 3,
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
- 返回值: `AsyncIterable<Channel>` 异步迭代器

获取某个群组的频道列表的异步迭代器。

### bot.createChannel(guildId, data)

- **guildId:** `string` 群组 ID
- **data:** `Partial<Channel>` 频道信息
- 返回值: `Promise<Channel>`

创建群组频道。

### bot.updateChannel(channelId, data)

- **channelId:** `string` 频道 ID
- **data:** `Partial<Channel>` 频道信息
- 返回值: `Promise<void>`

修改群组频道。

### bot.deleteChannel(channelId)

- **channelId:** `string` 频道 ID
- 返回值: `Promise<void>`

删除群组频道。

### bot.createDirectChannel(userId)

- **userId:** `string` 用户 ID
- 返回值: `Promise<Channel>`

创建私聊频道。
