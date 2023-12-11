# GuildMember : membres de la guilde

## 类型定义

```ts
interface GuildMember {
  user: User
  name?: string
  avatar?: string
  joinedAt?: number
}
```

## API

### bot.getGuildMember(guildId, userId)

- **guildId:** `string` 群组 ID
- **userId:** `string` 用户 ID
- 返回值: `Promise<GuildMember>` 群成员信息

获取群成员信息。

### bot.getGuildMemberList(guildId, next?)

- **guildId:** `string` 群组 ID
- **next:** `string` 分页令牌
- 返回值: `Promise<List<GuildMember>>` 群成员列表

获取群成员列表。

### bot.getGuildMemberIter(guildId) <badge>内置</badge>

- **guildId:** `string` 群组 ID
- 返回值: `AsyncIterable<GuildMember>` 异步迭代器

获取群成员列表的异步迭代器。

### bot.kickGuildMember(guildId, userId, permanent?)

- **guildId:** `string` 群组 ID
- **userId:** `string` 用户 ID
- **permanent:** `boolean` 是否永久踢出 (用户无法再次加入群组)
- 返回值: `Promise<void>`

将某个用户踢出群组。

### bot.muteGuildMember(guildId, userId, duration?, reason?) <badge type="warning">实验性</badge>

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

## 事件

### guild-member-added

- **session:** `Session` 会话对象
- 触发方式: emit

新成员加入群组时触发。

### guild-member-updated

- **session:** `Session` 会话对象
- 触发方式: emit

群组成员信息更新时触发。

### guild-member-removed

- **session:** `Session` 会话对象
- 触发方式: emit

群组成员退出群组时触发。

### guild-member-request

- **session:** `Session` 会话对象
- 触发方式: emit

接收到新的加群请求时触发。
