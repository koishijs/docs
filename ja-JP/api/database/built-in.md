# 組み込みデータ構造

::: tip
参见：[开发 > 数据库 > 内置数据结构](../../guide/database/builtin.md)
:::

Koishi のデータベース APIは2種類に分けています：

- @koishijs/coreで定義される組み込みデータ構造
- minatoで提供されたORMインターフェース

このページでは１つ目のAPIについて説明します。

## 組み込みテーブル

### User

- **id:** `id` ユーザー ID
- **name:** `string` ユーザー名
- **authority:** `number` 权限等级
- **permissions:** `string[]` 权限列表
- **locales:** `string[]` 语言列表

### Binding

- **aid:** `id` ユーザー ID
- **platform:** `string` プラットフォーム名
- **pid:** `string` チャンネルアカウント

### Channel

- **platform:** `string` プラットフォーム名
- **id:** `string` チャンネルアカウント
- **assignee:** `string` [受理人](../../manual/usage/customize.md#受理人机制)
- **permissions:** `string[]` 权限列表
- **locales:** `string[]` 语言列表

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
- 戻り値: `Promise<Channel>` チャンネルデータ

データベースにチャンネルデータをリクエストします。

### database.getAssignedChannels(fields?, platform?, assignees?) <badge type="danger">非推奨</badge>

- **fields:** `ChannelField[]` リクエストするフィールド。デフォルトはすべてのフィールドです。
- **platform:** `string` プラットフォーム名。デフォルトはすべてのプラットフォームです。
- **assignees:** `string[]` 代理人リスト。デフォルトは現在実行されているすべてのボットです。
- 戻り値: `Promise<Channel[]>` チャンネルデータリスト

データベースに特定のボットが管理するすべでのチャンネルデータをリクエストします。ここにある二つの引数のどちらを選んでも、正しく認識されます。

### database.setChannel(platform, id, data)

- **platform:** `string` プラットフォーム名
- **id:** `number` チャンネル識別子
- **data:** `Channel` 修正・追加するデータ
- 戻り値: `Promise<void>`

データベースにチャンネルデータを修正・追加します。
