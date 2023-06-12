# Broadcasting (Broadcast)

::: tip
要使用本插件，你需要安装数据库支持。
:::

## 指令：broadcast

- 基本语法：`broadcast <message>`
- 最低权限：4
- 选项：
  - `-o, --only` 仅向当前账号负责的群进行广播
  - `-f, --forced` 无视 silent 标签进行广播

broadcast 指令用于按照 [受理人](../../manual/usage/permission.md#受理人机制) 向所有机器人所负责的频道发送一段文本（默认情况下有 silent 标签的群不发送）。你可以这样调用它：

```sh
broadcast foo bar baz     # 向所有频道发送 foo bar baz
```

当一个机器人账号同时向多个频道发送广播消息时，为了避免风控，Koishi 会给每条消息发送后添加一段延迟，可以通过 [`delay.broadcast`](../../api/core/app.md#options-delay) 进行配置。

::: tip 提示
broadcast 指令的 message 参数是一个 [变长参数](../../manual/usage/command.md#参数和选项)，因此你应该把所有的选项写到消息前面，否则会被认为是消息的一部分。
:::
