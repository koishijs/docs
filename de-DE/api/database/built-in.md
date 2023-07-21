# 内置数据结构

Koishi 的数据库 API 实际上分为两部分：

- @koishijs/core 中定义的内置数据结构
- minato 中提供的 ORM 接口

这一页中将仅展示第一部分的内容。

## 内置表

### User

- **id:** `id` 用户 ID
- **name:** `string` 用户昵称
- **flag:** `number` 状态标签
- **authority:** `number` 用户权限

### Binding

- **aid:** `id` 用户 ID
- **platform:** `string` 平台名
- **pid:** `string` 频道账号

### Channel

- **platform:** `string` 平台名
- **id:** `string` 频道账号
- **flag:** `number` 状态标签
- **assignee:** `string` [受理人](../../manual/usage/permission.md#受理人机制)

## 全局接口

### User.Flag, Channel.Flag <badge type="danger">废弃</badge>

所有用户 / 频道状态标签构成的枚举类型。

Koishi 使用**状态标签**来管理用户和群的可能状态。状态标签是一个正整数，它的每一个二进制位表示一种可能状态的开启或关闭。在 Koishi 中，这些状态通过一个枚举类型来进行辨别和修改。以下是内置的状态标签列表：

- **User.Flag.ignore:** 不响应用户的任何消息
- **Channel.Flag.ignore:** 不响应频道内的任何消息
- **Channel.Flag.silent:** 不主动向频道发送任何消息

利用位运算操作符，你可以用下面的方法辨别和修改状态信息：

```ts
import { Channel } from 'koishi'

// 判断会话用户是否被设置了 ignore 状态
if (session.channel.flag & Channel.Flag.ignore) {}

// 为频道设置一个 ignore 状态
session.channel.flag |= Channel.Flag.ignore

// 为频道取消一个 silent 状态
session.channel.flag &= ~Channel.Flag.silent
```

## 内置实例方法

下列实例方法直接由 @koishijs/core 提供实现。

### database.getUser(platform, id, modifier?)

- **platform:** `string` 平台名
- **id:** `string` 用户标识符
- **modifier:** `QueryModifier<User.Field>` 请求修饰符
- 返回值: `Promise<User>` 用户数据

向数据库请求用户数据。

### database.setUser(platform, id, data)

- **platform:** `string` 平台名
- **id:** `string` 用户标识符
- **data:** `User` 要修改 / 添加的数据
- 返回值: `Promise<void>`

向数据库修改或添加用户数据。

### database.getChannel(platform, id, fields?)

- **platform:** `string` 平台名
- **id:** `string` 频道标识符
- **fields:** `QueryModifier<User.Field>` 请求修饰符
- 返回值: `Promise<Channel>` 频道数据

向数据库请求频道数据。

### database.getAssignedChannels(fields?, platform?, assignees?) <badge type="danger">废弃</badge>

- **fields:** `ChannelField[]` 请求的字段，默认为全部字段
- **platform:** `string` 平台名，默认为全平台
- **assignees:** `string[]` 代理者列表，默认为当前运行的全部机器人
- 返回值: `Promise<Channel[]>` 频道数据列表

向数据库请求被特定机器人管理的所有频道数据。这里的两个参数可以写任意一个，都可以识别。

### database.setChannel(platform, id, data)

- **platform:** `string` 平台名
- **id:** `number` 频道标识符
- **data:** `Channel` 要修改 / 添加的数据
- 返回值: `Promise<void>`

向数据库修改或添加频道数据。
