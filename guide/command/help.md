# 查看和编写帮助

::: tip
下面的 echo 指令是为了理解方便而举的例子，与 @koishijs/plugin-echo 中实际的 echo 指令并不相同。
:::

## 查看帮助

Koishi 拥有着强大的指令系统，然而过于复杂的功能也会困扰使用者。因此，Koishi 也内置了 help 指令，用于输出全部或特定指令的使用方法。你可以使用 `help` 查看指令列表：

<chat-panel>
<chat-message nickname="Alice">help</chat-message>
<chat-message nickname="Koishi">
<p>当前可用的指令有：</p>
<p>&nbsp;&nbsp;&nbsp;&nbsp;echo  输出收到的信息</p>
<p>&nbsp;&nbsp;&nbsp;&nbsp;help  显示帮助信息</p>
<p>输入“帮助+指令名”查看特定指令的语法和使用示例。</p>
</chat-message>
</chat-panel>

或通过 `help echo` 或 `echo -h` 查看特定指令的信息，包括指令的名称，参数，选项，子指令，权限设置等等。这里的 echo 是指令名，但也可以换成 [指令别名](./execution.md#指令别名) 甚至 [快捷方式](./execution.md#快捷方式)。具体的细节将在下面的介绍。

## 编写帮助

之前已经介绍了 `ctx.command()` 和 `cmd.option()` 这两个方法，它们都能传入一个 `desc` 参数。你可以在这个参数的结尾补上对于指令或参数的说明文字，就像这样：

```ts
ctx.command('echo <message:text> 输出收到的信息')
  .option('timeout', '-t <seconds> 设定延迟发送的时间')
```

<chat-panel>
<chat-message nickname="Alice">echo -h</chat-message>
<chat-message nickname="Koishi">
<p>echo &lt;message></p>
<p>输出收到的信息</p>
<p>可用的选项有：</p>
<p>&nbsp;&nbsp;&nbsp;&nbsp;-t, --timeout &lt;seconds>  设定延迟发送的时间</p>
</chat-message>
</chat-panel>

### 添加用法和使用示例

当然，我们还可以加入具体的用法和使用示例，进一步丰富这则使用说明：

```ts
ctx.command('echo <message:text>', '输出收到的信息')
  .option('timeout', '-t <seconds> 设定延迟发送的时间')
  .usage('注意：参数请写在最前面，不然会被当成 message 的一部分！')
  .example('echo -t 300 Hello World  五分钟后发送 Hello World')
```

这时再调用 `echo -h`，你便会发现使用说明中已经添加了你刚刚的补充文本：

<chat-panel>
<chat-message nickname="Alice">echo -h</chat-message>
<chat-message nickname="Koishi">
<p>echo &lt;message></p>
<p>输出收到的信息</p>
<p>注意：参数请写在最前面，不然会被当成 message 的一部分！</p>
<p>可用的选项有：</p>
<p>&nbsp;&nbsp;&nbsp;&nbsp;-t, --timeout &lt;seconds>  设定延迟发送的时间</p>
<p>使用示例：</p>
<p>&nbsp;&nbsp;&nbsp;&nbsp;echo -t 300 Hello World  五分钟后发送 Hello World</p>
</chat-message>
</chat-panel>

最后，如果直接调用 `help`，输出的会是全部指令组成的列表。

### 隐藏指令和选项

读到这里，细心的你可能会产生一丝好奇：如果 `echo -h` 能够被解析成查看帮助的话，这个 `-h` 为什么不出现在这个帮助中呢？答案很简单，因为这个内置选项被 Koishi 隐藏起来了。如果你希望隐藏一条指令或一个选项，只需要注册时将配置项 `hidden` 设置为 `true` 即可：

```ts
ctx.command('bar 一条看不见的指令', { hidden: true })
  .option('foo', '<text> 一个看不见的选项')
  .action(({ options }) => 'secret: ' + options.foo)
```

<chat-panel>
<chat-message nickname="Alice">help</chat-message>
<chat-message nickname="Koishi">
<p>当前可用的指令有：</p>
<p>&nbsp;&nbsp;&nbsp;&nbsp;help  显示帮助信息</p>
<p>输入“帮助+指令名”查看特定指令的语法和使用示例。</p>
</chat-message>
<chat-message nickname="Alice">bar --foo 123</chat-message>
<chat-message nickname="Koishi">secret: 123</chat-message>
</chat-panel>

如果要查看隐藏的指令和选项，可以使用 `help -H`：

<chat-panel>
<chat-message nickname="Alice">help -H</chat-message>
<chat-message nickname="Koishi">
<p>当前可用的指令有：</p>
<p>&nbsp;&nbsp;&nbsp;&nbsp;help  显示帮助信息</p>
<p>&nbsp;&nbsp;&nbsp;&nbsp;bar  一条看不见的指令</p>
<p>输入“帮助+指令名”查看特定指令的语法和使用示例。</p>
</chat-message>
</chat-panel>

## 禁用帮助功能

如果你在开发用于特定目的的机器人，你可能不希望用户使用全局的 help 指令查看指令列表。

```yaml koishi.yml
# 禁用帮助指令
help: false

# 配置帮助指令
help:
  # 不能通过 -h 触发帮助指令
  options: false
  # 禁用全局「帮助」快捷调用（指令依然存在）
  shortcut: false
```
