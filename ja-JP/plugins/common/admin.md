# 数据管理 (Admin)

::: tip
要使用本插件，你需要安装数据库支持。
:::

::: tip
建议配合阅读 [入门 > 权限管理](../../manual/usage/customize.md#权限管理) 章节。
:::

## 指令：authorize

- 别名：auth
- 基本语法：`authorize <value> -u <user>`
- 最低权限：4

authorize 指令用于设置用户的权限等级。该指令 4 级权限才能调用，且需要满足目标用户的权限和要设定的权限都严格小于自己的权限等级，否则无法设置。

### 指定用户语法

可以通过三种方式指定用户

- `@user`: 通过直接 @ 人的方式指定（不能是纯文本，需要用各平台的 @ 人方式）
- `@<userId>`: @ 符号后面接用户名（必须是纯文本）
- `@<platform>:<userId>`: @ 符号后指定具体的平台和用户名（必须是纯文本）

例子

```sh
authorize 3 -u @Koishi              # 通过 @ 人的方式
authorize 3 -u @123456789           # 通过指定用户名方式
authorize 3 -u @telegram:123456789    # 指定具体的平台和用户名
```

## 指令：assign

- 基本语法：`assign [bot]`
- 最低权限：4
- 选项：
  - `-c, --channel` 指定目标频道（不在群组内使用时必须指定）
  - `-r, --remove` 重置设置

assign 指令可用于设置频道的 [受理人](../../manual/usage/customize.md#受理人机制)。该指令 4 级权限才能调用。

如果 `-c [channel]` 缺省，则表示目标频道为当前频道（因此私聊状态下不能缺省）；如果 `bot` 缺省，则表示当前接收消息的机器人账号。举个例子，如果要设定一个频道 A 的代理者为 B，下面的两种做法是等价的：

1. 私聊机器人 B，发送 `assign -c #A`
2. 在频道 A 中发送 `assign @B`（假设 B 能收到此消息）

## 指令：user.flag <badge type="danger">非推奨</badge>
## 指令：channel.flag <badge type="danger">非推奨</badge>

- 基本语法：`xxx.flag [...names]`
- 选项：
  - `-l, --list` 标记列表
  - `-s, --set` 添加标记（需要 4 级权限）
  - `-S, --unset` 删除标记（需要 4 级权限）
  - `-u, --user [@user]` 目标用户（仅限 user.flag 指令，需要 3 级权限）
  - `-c, --channel [#channel]` 目标频道（仅限 channel.flag 指令，需要 3 级权限）

这两个指令用于查看和修改用户或频道的状态标签。如果不提供选项，则会显示当前的状态标签。如果使用了 `-l`，就会列出所有可用的状态标签。如果使用了 `-s` 或 `-S`，则会添加 / 删除 `names` 中的每一个状态标签。
