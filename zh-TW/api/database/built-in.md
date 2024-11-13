# 內建資料結構

:::tip
参见：[开发 > 数据库 > 内置数据结构](../../guide/database/builtin.md)
:::

Koishi 的資料庫 API 實際上分為兩部分：

- Minato 定义的通用数据库接口，由数据库插件实现
- Koishi 内置数据结构相关的方法，由 Koishi 提供实现

这一页中将仅展示第二部分的内容。另一部分的内容请参见 [数据库操作](./database.md)。

## 内建表

### User

- **id:** `id` 用户 ID
- **name:** `string` 用户昵称
- **authority:** `number` [权限等级](../../guide/database/permission.md)
- **permissions:** `string[]` [权限列表](../../guide/database/permission.md)
- **locales:** `string[]` 语言列表

### Binding

- **aid:** `id` 用户 ID
- **platform:** `string` 平台名
- **pid:** `string` 平台账号

### Channel

- **platform:** `string` 平台名
- **id:** `string` 平台账号
- **assignee:** `string` [受理人](../../manual/usage/customize.md#受理人机制)
- **permissions:** `string[]` [权限列表](../../guide/database/permission.md)
- **locales:** `string[]` 语言列表

## 內建實體方法

下列實體方法直接由 @koishijs/core 提供實現。

### ctx.database.getUser(platform, id, modifier?)

- **platform:** `string` 平台名
- **id:** `string` 用户标识符
- **modifier:** `QueryModifier<User.Field>` 请求修饰符
- 返回值: `Promise<User>` 用户数据

向資料庫請求使用者資料。

### ctx.database.setUser(platform, id, data)

- **platform:** `string` 平台名
- **id:** `string` 用户标识符
- **data:** `User` 要修改 / 添加的数据
- 返回值: `Promise<void>`

向資料庫修改或新增使用者資料。

### ctx.database.getChannel(platform, id, fields?)

- **platform:** `string` 平台名
- **id:** `string` 频道标识符
- **fields:** `QueryModifier<User.Field>` 请求修饰符
- 返回值: `Promise<Channel>` 频道数据

向資料庫請求頻道資料。

### ctx.database.getAssignedChannels(fields?, platform?, assignees?) <badge type="danger">废弃</badge>

- **fields:** `ChannelField[]` 请求的字段，默认为全部字段
- **platform:** `string` 平台名，默认为全平台
- **assignees:** `string[]` 代理者列表，默认为当前运行的全部机器人
- 返回值: `Promise<Channel[]>` 频道数据列表

向資料庫請求被特定機器人管理的所有頻道資料。這裡的兩個引數可以寫任意一個，都可以識別。

### ctx.database.setChannel(platform, id, data)

- **platform:** `string` 平台名
- **id:** `number` 频道标识符
- **data:** `Channel` 要修改 / 添加的数据
- 返回值: `Promise<void>`

向資料庫修改或新增頻道資料。
