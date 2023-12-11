# 組み込みデータ構造

:::tip
参见：[开发 > 数据库 > 内置数据结构](../../guide/database/builtin.md)
:::

Koishi のデータベース APIは2種類に分けています：

- Minato 定义的通用数据库接口，由数据库插件实现
- Koishi 内置数据结构相关的方法，由 Koishi 提供实现

这一页中将仅展示第二部分的内容。另一部分的内容请参见 [数据库操作](./database.md)。

## 組み込みテーブル

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

## 組み込みインスタンスメソッド

以下のインスタンスメソッドは @koishijs/core で実装されます。

### ctx.database.getUser(platform, id, modifier?)

- **platform:** `string` 平台名
- **id:** `string` 用户标识符
- **modifier:** `QueryModifier<User.Field>` 请求修饰符
- 返回值: `Promise<User>` 用户数据

データベースにユーザーデータをリクエストします。

### ctx.database.setUser(platform, id, data)

- **platform:** `string` 平台名
- **id:** `string` 用户标识符
- **data:** `User` 要修改 / 添加的数据
- 返回值: `Promise<void>`

データベースにユーザーデータを修正・追加します。

### ctx.database.getChannel(platform, id, fields?)

- **platform:** `string` 平台名
- **id:** `string` 频道标识符
- **fields:** `QueryModifier<User.Field>` 请求修饰符
- 返回值: `Promise<Channel>` 频道数据

データベースにチャンネルデータをリクエストします。

### ctx.database.getAssignedChannels(fields?, platform?, assignees?) <badge type="danger">废弃</badge>

- **fields:** `ChannelField[]` 请求的字段，默认为全部字段
- **platform:** `string` 平台名，默认为全平台
- **assignees:** `string[]` 代理者列表，默认为当前运行的全部机器人
- 返回值: `Promise<Channel[]>` 频道数据列表

向数据库请求被特定机器人管理的所有频道数据。ここにある二つの引数のどちらを選んでも、正しく認識されます。

### ctx.database.setChannel(platform, id, data)

- **platform:** `string` 平台名
- **id:** `number` 频道标识符
- **data:** `Channel` 要修改 / 添加的数据
- 返回值: `Promise<void>`

データベースにチャンネルデータを修正・追加します。
