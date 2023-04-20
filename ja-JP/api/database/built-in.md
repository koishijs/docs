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
- **assignee:** `string` [代理人](../../manual/usage/permission.md#受理人机制)

## グローバルインターフェイス

### User.Flag, Channel.Flag <badge text="已废弃" type="danger"/>

すべてのユーザー/チャンネルステータスフラグで構成された列挙型です。

Koishi では**ステータスフラグ**を使用してユーザーとグループの可能なステータスを管理します。ステータスフラグは正の整数で、各バイナリは可能なステータスのオンとオフを意味します。Koishi では、列挙型を通してこれらのステータスの識別と変更が行われています。組み込みステータスフラグを以下に示します：

- **User.Flag.ignore:** ユーザーのすべてのメッセージに応答しません
- **Channel.Flag.ignore:** チャンネルのすべてのメッセージに応答しません
- **Channel.Flag.silent:** チャンネルで自発的にメッセージを送信しません

ビット演算子を使用することで、以下のようにステータスの識別と変更ができます：

```ts
import { Channel } from 'koishi'

// ユーザーが ignore ステータスに設定されたどうかを判断します
if (session.channel.flag & Channel.Flag.ignore) {}

// チャンネルに ignore ステータスを設定します
session.channel.flag |= Channel.Flag.ignore

// チャンネルに silent ステータスを外します
session.channel.flag &= ~Channel.Flag.silent
```

## 組み込みインスタンスメソッド

以下のインスタンスメソッドは @koishijs/core で実装されます。

### database.getUser(platform, id, modifier?)

- **platform:** `string` プラットフォーム名
- **id:** `string` ユーザー識別子
- **modifier:** `QueryModifier<User.Field>` クエリ修飾子
- 戻り値: `Promise<User>` ユーザーデータ

データベースにユーザーデータをリクエストします。

### database.setUser(platform, id, data)

- **platform:** `string` プラットフォーム名
- **id:** `string` ユーザー識別子
- **data:** `User` 変更・追加するデータ
- 戻り値: `Promise<void>`

データベースにユーザーデータを修正・追加します。

### database.getChannel(platform, id, fields?)

- **platform:** `string` プラットフォーム名
- **id:** `string` チャンネル識別子
- **fields:** `QueryModifier<User.Field>` クエリ修飾子
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
