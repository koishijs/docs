# 群组 (Guild)

## 类型定义

```ts
export interface Guild {
  id: string
  name: string
}
```

## API

### bot.getGuild(guildId)

- **guildId:** `string` 群组 ID
- 返回值: `Promise<Guild>` 群组信息

获取群组信息。

### bot.getGuildList(next?)

- **next:** `string` 分页令牌
- 返回值: `Promise<List<Guild>>` 群组列表

获取机器人加入的群组列表。

### bot.getGuildIter() <badge>内置</badge>

- 返回值: `AsyncIterable<Guild>` 异步迭代器

获取机器人加入的群组列表的异步迭代器。

### bot.handleGuildRequest(messageId, approve, comment?)

- **messageId:** `string` 请求 ID
- **approve:** `boolean` 是否通过请求
- **comment:** `string` 备注信息
- 返回值: `Promise<void>`

处理来自群组的邀请。

## 事件

### guild-added

- **session:** `Session` 会话对象
- 触发方式: emit

加入群组时触发。

### guild-updated

- **session:** `Session` 会话对象
- 触发方式: emit

群组信息更新时触发。

### guild-removed

- **session:** `Session` 会话对象
- 触发方式: emit

群组成员退出群组时触发。
