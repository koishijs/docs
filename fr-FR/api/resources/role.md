# GuildRole : rôles de la guilde

## 类型定义

```ts
export interface GuildRole {
  id: string
  name: string
}
```

## API

### bot.setGuildMemberRole(guildId, userId, roleId)

- **guildId:** `string` 群组 ID
- **userId:** `string` 用户 ID
- **roleId:** `string` 角色 ID
- 返回值: `Promise<void>`

设置群组内用户的角色。

### bot.unsetGuildMemberRole(guildId, userId, roleId)

- **guildId:** `string` 群组 ID
- **userId:** `string` 用户 ID
- **roleId:** `string` 角色 ID
- 返回值: `Promise<void>`

取消群组内用户的角色。

### bot.getGuildRoleList(guildId, next?)

- **guildId:** `string` 群组 ID
- **next:** `string` 分页令牌
- 返回值: `Promise<List<GuildRole>>` 角色列表

获取群组角色列表。

### bot.getGuildRoleIter(guildId) <badge>内置</badge>

- **guildId:** `string` 群组 ID
- 返回值: `AsyncIterable<GuildRole>` 异步迭代器

获取群组角色列表的异步迭代器。

### bot.createGuildRole(guildId, data)

- **guildId:** `string` 群组 ID
- **data:** `Partial<GuildRole>` 角色信息
- 返回值: `Promise<GuildRole>`

创建群组角色。

### bot.updateGuildRole(guildId, roleId, data)

- **guildId:** `string` 群组 ID
- **roleId:** `string` 角色 ID
- **data:** `Partial<GuildRole>` 角色信息
- 返回值: `Promise<void>`

修改群组角色。

### bot.deleteGuildRole(guildId, roleId)

- **guildId:** `string` 群组 ID
- **roleId:** `string` 角色 ID
- 返回值: `Promise<void>`

删除群组角色。

## 事件

### guild-role-created

- **session:** `Session` 会话对象
- 触发方式: emit

创建群组角色时触发。

### guild-role-updated

- **session:** `Session` 会话对象
- 触发方式: emit

群组角色信息更新时触发。

### guild-role-deleted

- **session:** `Session` 会话对象
- 触发方式: emit

删除群组角色时触发。
