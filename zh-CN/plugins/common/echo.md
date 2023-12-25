# 发送消息 (Echo)

## 指令：echo

- 基本语法：`echo <message>`
- 最低权限：2
- 选项：
  - `-e, --escape`  发送转义消息 (需要 3 级权限)
  - `-E, --unescape`  发送反转义消息 (需要 3 级权限)
  - `-u, --user [user]`  发送到用户 (需要 3 级权限)
  - `-c, --channel [channel]`  发送到频道 (需要 3 级权限)
  - `-g, --guild [guild]`  指定群组编号 (需要 3 级权限)

你可以使用 echo 指令发送消息到特定的上下文：

```sh
echo foo bar              # 向当前上下文发送 foo bar
echo -u @foo foo bar      # 向用户 foo 私聊发送 foo bar
echo -c #bar foo bar      # 向频道 bar 发送 foo bar
```

::: tip
echo 指令的 message 参数是一个 [变长参数](../../manual/usage/command.md#参数和选项)，因此你应该把所有的选项写到消息前面，否则会被认为是消息的一部分。
:::
