# 更多功能

到目前为止，我们已经了解了指令的定义方式和触发机制，以及如何编写帮助和组织多级指令。但这只是一个开始，让我们真正将指令系统与数据库进行交互，并服务于不同的平台和用户群体时，还有更多能做的事情。

## 权限管理

::: tip
要启用权限管理，你需要安装数据库支持。
:::

除了之前介绍过的两个参数外，`ctx.command()` 还可以传入一个额外参数，它提供了指令相关的配置项。

### authority

你可以通过 `authority` 属性设置一个指令的调用权限：

```ts
// 设置 echo 命令的调用权限为 2 级
ctx.command('echo <message:text> 输出收到的信息', { authority: 2 })
  // 设置 -t 选项的调用权限为 3 级
  .option('timeout', '-t <seconds> 设定延迟发送的时间', { authority: 3 })
```

这样一来，1 级或以下权限的用户就无法调用 echo 指令；2 级权限用户只能调用 echo 指令但不能使用 -t 参数；3 级或以上权限的用户不受限制。对于受限的用户，机器人将会回复“权限不足”。

## 多语言支持

## 平台集成

## 模糊匹配

在日常的使用中，我们也难免会遇到打错的情况，这时 Koishi 还会自动根据相近的指令名进行纠错提醒：

<chat-panel>
<chat-message nickname="Alice">ecko hello</chat-message>
<chat-message nickname="Koishi">没有此命令。你要找的是不是“echo”？发送空行或句号以调用推测的指令。</chat-message>
<chat-message nickname="Alice">.</chat-message>
<chat-message nickname="Koishi">hello</chat-message>
</chat-panel>

如果想调整模糊匹配的程度，你还可以修改配置项 [minSimilarity](../../api/core/app.md#options-minsimilarity)。是不是很方便呢？
