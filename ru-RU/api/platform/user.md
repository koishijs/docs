# 用户 (User)

::: tip
消歧义：本节介绍跨平台协议中的用户对象。

- 要了解数据库中的用户，请前往 [API > 数据库 > 内置数据结构](../database/built-in.md#user)
- 要了解两者的区别，请前往 [API > 术语表](../glossary.md#用户)
:::

## 类型定义

## API

### bot.getSelf()

- 返回值: `Promise<UserInfo>` 用户信息

获取机器人自己的信息。

```ts
export interface UserInfo {
  userId: string
  username: string
  avatar?: string
}
```

### bot.getUser(userId)

- **userId:** `string` 用户 ID
- 返回值: `Promise<UserInfo>` 用户信息

获取用户信息。

### bot.getFriendList(next?) <badge>实验性</badge>

- **next:** `string` 分页令牌
- 返回值: `Promise<List<UserInfo>>` 好友列表

获取机器人的好友列表。

### bot.getFriendIter() <badge>内置</badge> <badge>实验性</badge>

- 返回值: `AsyncIterable<UserInfo>` 迭代器

获取机器人的好友列表的异步迭代器。

### bot.handleFriendRequest(messageId, approve, comment?)

- **messageId:** `string` 请求 ID
- **approve:** `boolean` 是否通过请求
- **comment:** `string` 备注信息
- 返回值: `Promise<void>`

处理好友请求。