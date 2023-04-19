# 組み込みデータ構造

Koishi のデータベース APIは2種類に分けています：

- @koishijs/coreで定義される組み込みデータ構造
- minatoで提供されたORMインターフェース

このページでは１つ目のAPIについて説明します。

## 組み込みテーブル

### User

- **id:** `id` ユーザー ID
- **name:** `string` ユーザー名
- **flag:** `number` ステータスフラグ
- **authority:** `number` ユーザー権限

### Binding

- **aid:** `id` ユーザー ID
- **platform:** `string` プラットフォーム名
- **pid:** `string` チャンネルアカウント

### Channel

- **platform:** `string` プラットフォーム名
- **id:** `string` チャンネルアカウント
- **flag:** `number` ステータスフラグ
- **assignee:** `string` [担当者](../../manual/usage/permission.md#受理人机制)

## グローバルインターフェイス

### User.Flag, Channel.Flag <badge text="已废弃" type="danger"/>

すべてのユーザー/チャンネルステータスフラグで構成された列挙型です。

Koishi では**ステータスフラグ**を使用してユーザーとグループの可能なステータスを管理します。ステータスフラグは正の整数で、各バイナリは可能なステータスのオンとオフを意味します。Koishi では、列挙型を通してこれらのステータスの識別と変更が行われています。組み込みステータスフラグを以下に示します：

- **User.Flag.ignore:** ユーザーのすべてのメッセージには応答しません
- **Channel.Flag.ignore:** チャンネルのすべてのメッセージには応答しません
- **Channel.Flag.silent:** チャンネルに自発的にメッセージを送信しません

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

### database.getAssignedChannels(fields?, platform?, assignees?) <Badge type="danger" text="deprecated"/>

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
