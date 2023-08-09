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
- **assignee:** `string` [指派人](../../manual/usage/permission.md#受理人机制)
- **permissions:** `string[]` 許可權列表
- **locales:** `string[]` 語言列表

## 內建實體方法

下列實體方法直接由 @koishijs/core 提供實現。

### database.getUser(platform, id, modifier?)

- **platform:** `string` 平臺名
- **id:** `string` 使用者識別符號
- **modifier:** `QueryModifier<User.Field>` 請求飾詞
- 回返值: `Promise<User>` 使用者資料

向資料庫請求使用者資料。

### database.setUser(platform, id, data)

- **platform:** `string` 平臺名
- **id:** `string` 使用者識別符號
- **data:** `User` 要修改 / 新增的資料
- 回返值: `Promise<void>`

向資料庫修改或新增使用者資料。

### database.getChannel(platform, id, fields?)

- **platform:** `string` 平臺名
- **id:** `string` 頻道識別符號
- **fields:** `QueryModifier<User.Field>` 請求飾詞
- 回返值: `Promise<Channel>` 頻道資料

向資料庫請求頻道資料。

### database.getAssignedChannels(fields?, platform?, assignees?) <badge type="danger">廢棄</badge>

- **fields:** `ChannelField[]` 請求的欄位，預設為全部欄位
- **platform:** `string` 平臺名，預設為全平臺
- **assignees:** `string[]` 指派者列表，預設為當前執行的全部機器人
- 回返值: `Promise<Channel[]>` 頻道資料列表

向資料庫請求被特定機器人管理的所有頻道資料。這裡的兩個引數可以寫任意一個，都可以識別。

### database.setChannel(platform, id, data)

- **platform:** `string` 平臺名
- **id:** `number` 頻道識別符號
- **data:** `Channel` 要修改 / 新增的資料
- 回返值: `Promise<void>`

向資料庫修改或新增頻道資料。
