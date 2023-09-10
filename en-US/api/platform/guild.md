# 群组 (Guild)

## 类型定义

## API

### bot.getGuild(guildId)

- **guildId:** `string` 群组 ID
- 返回值: `Promise<GuildInfo>` 群组信息

获取群组信息。

```ts
export interface GuildInfo {
  guildId: string
  guildName: string
}
```

### bot.getGuildList(next?) <badge>实验性</badge>

- **next:** `string` 分页令牌
- 返回值: `Promise<List<GuildInfo>>` 群组列表

获取机器人加入的群组列表。

### bot.getGuildIter() <badge>内置</badge> <badge>实验性</badge>

- 返回值: `AsyncIterable<GuildInfo>` 迭代器

获取机器人加入的群组列表的异步迭代器。

### bot.handleGuildRequest(messageId, approve, comment?)

- **messageId:** `string` 请求 ID
- **approve:** `boolean` 是否通过请求
- **comment:** `string` 备注信息
- 返回值: `Promise<void>`

处理来自群组的邀请。
