# 內建資料結構

Koishi 的資料庫 API 實際上分為兩部分：

- @koishijs/core 中定義的內建資料結構
- minato 中提供的 ORM 介面

這一頁中將僅展示第一部分的內容。

## 内建表

### User

- **id:** `id` 使用者 ID
- **name:** `string` 使用者暱稱
- **authority:** `number` 許可權等級
- **permissions:** `string[]` 許可權列表
- **locales:** `string[]` 語言列表

### Binding

- **aid:** `id` 使用者 ID
- **platform:** `string` 平臺名
- **pid:** `string` 頻道賬號

### Channel

- **platform:** `string` 平臺名
- **id:** `string` 頻道賬號
- **assignee:** `string` [受理人](../../manual/usage/permission.md#受理人机制)
- **permissions:** `string[]` 許可權列表
- **locales:** `string[]` 語言列表

## 內建實體方法

下列實體方法直接由 @koishijs/core 提供實作。

### database.getUser(platform, id, modifier?)

- **platform:** `string` 平臺名
- **id:** `string` 使用者識別符號
- **modifier:** `QueryModifier<User.Field>` 请求修饰符
- 返回值: `Promise<User>` 用户数据

向数据库请求用户数据。

### database.setUser(platform, id, data)

- **platform:** `string` 平臺名
- **id:** `string` 使用者識別符號
- **data:** `User` 要修改 / 添加的数据
- 返回值: `Promise<void>`

向数据库修改或添加用户数据。

### database.getChannel(platform, id, fields?)

- **platform:** `string` 平臺名
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

- **platform:** `string` 平臺名
- **id:** `number` 频道标识符
- **data:** `Channel` 要修改 / 添加的数据
- 返回值: `Promise<void>`

向数据库修改或添加频道数据。
