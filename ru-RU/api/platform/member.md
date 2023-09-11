# 群组成员 (GuildMember)

## 类型定义

## API

### bot.getGuildMember(guildId, userId)

- **guildId:** `string` 群组 ID
- **userId:** `string` 用户 ID
- 返回值: `Promise<GuildMemberInfo>` 群成员信息

获取群成员信息。

```ts no-extra-header
export interface UserInfo {
  userId: string
  username: string
  avatar?: string
}

// ---cut---
export interface GuildMemberInfo extends UserInfo {
  nickname: string
}
```

### bot.getGuildMemberList(guildId, next?)

- **guildId:** `string` 群组 ID
- **next:** `string` 分页令牌
- 返回值: `Promise<List<GuildMemberInfo>>` 群成员列表

获取群成员列表。

### bot.getGuildMemberIter(guildId) <badge>内置</badge>

- **guildId:** `string` 群组 ID
- 返回值: `AsyncIterable<GuildMemberInfo>` 迭代器

获取群成员列表的异步迭代器。

### bot.kickGuildMember(guildId, userId, permanent?)

- **guildId:** `string` 群组 ID
- **userId:** `string` 用户 ID
- **permanent:** `boolean` 是否永久踢出 (用户无法再次加入群组)
- 返回值: `Promise<void>`

将某个用户踢出群组。

### bot.muteGuildMember(guildId, userId, duration?, reason?)

- **guildId:** `string` 群组 ID
- **userId:** `string` 用户 ID
- **duration:** `number` 禁言时长 (毫秒)
- **reason:** `string` 禁言说明
- 返回值: `Promise<void>`

将某个用户禁言。如果传入的禁言时长为 `0` 则表示解除禁言。

### bot.handleGuildMemberRequest(messageId, approve, comment?)

- **messageId:** `string` 请求 ID
- **approve:** `boolean` 是否通过请求
- **comment:** `string` 备注信息
- 返回值: `Promise<void>`

处理加群请求。
