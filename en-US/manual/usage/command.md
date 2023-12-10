# Command System

After learning the basic usage of the Koishi Console, we can now talk about how to talk with bots! Let's start with the example from the previous section:

<chat-panel>
<chat-message nickname="Alice">help</chat-message>
<chat-message nickname="Koishi">
<p>Available commands:</p>
<p class="indent-1">echo  Send messages</p>
<p class="indent-1">help  Show help</p>
<p>Type "help &lt;command&gt;" to see syntax and examples for a specific command.</p>
</chat-message>
</chat-panel>

The output relates to two plugins:

- help 指令由 [help](../../plugins/common/help.md) 插件提供，它可以显示指令列表或具体指令的帮助信息
- echo 指令由 [echo](../../plugins/common/echo.md) 插件提供，它可以将用户的输入原样返回

Most of the features of a Koishi bot are provided to users by commands. More plugins you have installed, there would be more commands available.

## Display Help Information

An optional parameter followed with help command could be used to view the detail of specific commands:

<chat-panel>
<chat-message nickname="Alice">help echo</chat-message>
<chat-message nickname="Koishi">
<p>Command: echo &lt;message...&gt;</p>
<p>Send messages</p>
<p>Available options:</p>
<p class="indent-1">-e, --escape  Escape characters in message</p>
<p class="indent-1">-E, --unescape  Unescape characters in message</p>
</chat-message>
</chat-panel>

You might find that the help itself is a command as well, so is it possible to use help to show the help message of help itself? The answer is positive:

<chat-panel>
<chat-message nickname="Alice">help help</chat-message>
<chat-message nickname="Koishi">
<p>Command: help [command]</p>
<p>Show help</p>
<p>Available options:</p>
<p class="indent-1">-a, --authority  show authority requirements</p>
<p class="indent-1">-H, --show-hidden  show hidden options and commands</p>
</chat-message>
</chat-panel>

## Arguments and Options

在上面的用法中，我们接触到了两个新的概念：**参数 (Argument)** 和 **选项 (Option)**。

参数分为必选参数和可选参数，分别用尖括号 `<>` 和方括号 `[]` 表示。A command may have arbitrary parameters, their orders are fixed, which means that users should enter the parameters in the order that pre-defined by the command. Required parameters must be precedent before optional parameters. When user enters fewer parameters than the required parameters that the plugin requires, the plugin should often print errors. When user enters extra parameters, they would be ignored generally.

For example, command `help` has an optional argument which indicates the name of the command to be viewed; command `echo` has a required argument which indicates the message to be sent. Let's see what will happen if the required parameter is missing:

<chat-panel>
<chat-message nickname="Alice">echo</chat-message>
<chat-message nickname="Koishi">
<p>Please type to send</p>
</chat-message>
</chat-panel>

The behavior would be affected by the options as well. 它通常以 `-` 或 `--` 开头，后面不带空格地跟着一个固定的单词，称为选项名称。There are no order requirements between options, but generally we should put options before parameters. Let's try out!

<chat-panel>
<chat-message nickname="Alice">echo &lt;image url="https://koishi.chat/logo.png"/&gt;</chat-message>
<chat-message nickname="Koishi">&lt;image url="https://koishi.chat/logo.png"/&gt;</chat-message>
<chat-message nickname="Alice">echo -E &lt;image url="https://koishi.chat/logo.png"/&gt;</chat-message>
<chat-message nickname="Koishi">
<img src="https://koishi.chat/logo.png" width="100"/>
</chat-message>
</chat-panel>

在上面的例子中，我们使用了 `-E` 选项，成功改变了输出的内容。We will talk about it in detail in the next section.

In addition to being required and optional, the arguments can be divided into fixed and variable length. A variable-length argument would be fed all characters including whitespace characters, while a fixed-length one stops feeding when it reads whitespace characters. 变长参数通过参数名前后的 `...` 来指示，例如 `echo` 指令的参数就是一个变长参数。If it is required to pass whitespace characters into a fixed-length argument, you can wrap the whole argument into quotes, just like:

<chat-panel>
<chat-message nickname="Alice">help "foo bar"</chat-message>
</chat-panel>

Additionally, options might require parameters as well. You should see a help information as below when you have any translate plugin installed.

<chat-panel>
<chat-message nickname="Alice">help translate</chat-message>
<chat-message nickname="Koishi">
<p>Command: translate &lt;text...&gt;</p>
<p>Translate Text</p>
<p>Available options:</p>
<p class="indent-1">-s, --source &lt;lang&gt; Source Language (Auto-detect by default)</p>
<p class="indent-1">-t, --target &lt;lang&gt; Target Language (Chinese by default)</p>
</chat-message>
<chat-message nickname="Alice">translate -t ja Hello, world</chat-message>
<chat-message nickname="Koishi">こんにちは世界</chat-message>
</chat-panel>

在这个例子中，`-s` 和 `-t` 都是带有参数的选项。我们使用 `-t ja` 来指定目标语言为日语，源语言仍然采用了默认行为。

## Command Prefix

However, it is very vulnerable to make a mistake if trigger the command just by a single wordIn order to avoid this case, Koishi introduced the concept of prefix trigger.在「全局设置」中，我们提供了名为 `prefix` 和 `nickname` 的配置项。假如将 `prefix` 设置为 `/`，`nickname` 设置为 `四季酱`，则在群聊环境下只有以下信息可以触发指令调用：

```sh
Shiki-chan, echo hello
@Shiki-chan echo hello
/echo hello
```

In other words, the actual condition in which a command can be triggered is:

- 消息以 `prefix` 开头，后面紧跟着指令调用
- 消息以 `nickname` 开头，后面可以有逗号或空白字符，再后面是指令调用
- 消息以 @机器人 开头 (可以有多个 `@`，但至少一个是机器人账号)，后面是指令调用

For groups with lots of people or more than one bot, we strongly recommend that each bot configure a different command prefix.In the context of private chat, there are no restrictions as there is no fear of mistakes.Command calls without a prefix can also be performed properly.

::: tip
**关于 `prefix` 的几点提示：**

1. `prefix` 是一个列表，默认值为 `['']` 表示无需前缀也能触发；将列表清空会导致所有指令都无法通过 `prefix` 触发 (但仍然可以通过私聊或 `nickname` 或 @机器人 触发)
2. 如果你在 `prefix` 中设置了多个值，例如 `['.', '/', '']`，那么 `.`, `/` 或无前缀都能触发指令；但由于 Koishi 是按顺序匹配各个前缀的，因此空串 `''` 必须写在最后一个
3. 可以为不同的会话设置不同的 `prefix`，具体请参考 [过滤器](./customize.md#过滤器) 一节
   :::

## subcommand

[admin](../../plugins/common/admin.md) 插件提供了名为 user 的指令，现在让我们调用一下：

<chat-panel>
<chat-message nickname="Alice">user</chat-message>
<chat-message nickname="Koishi">
<p>Command: user</p>
<p>User Management</p>
<p>Available subcommands:</p>
<p class="indent-1">authorize Permission Management</p>
<p class="indent-1">user.locale  Language Preference</p>
</chat-message>
</chat-panel>

Here is a new concept: subcommands.子指令在调用上与普通的指令并没有区别，但它们将不会显示在 `help` 返回的全局指令列表中，而只会显示在父指令 `user` 的帮助信息中。The purpose of this design is to avoid too large a list of instructions and to organize them in a clearer way.

在上面的例子中，我们还能发现 Koishi 存在两种不同的子指令：一种是 **层级式**，例如 `authorize`；而另一种则是 **派生式**，例如 `user.locale`。后者跟前者的区别是，它的名称带有父指令的名称，以及一个小数点 `.`。We also need to add this decimal point when calling:

<chat-panel>
<chat-message nickname="Alice">user.locale en</chat-message>
<chat-message nickname="Koishi">User data updated.</chat-message>
</chat-panel>

如果父指令本身没有功能，那么 `user` 和 `user -h` 的效果是一样的。In that situation, we can use spaces instead of dots to call derivative subcommands:

<chat-panel>
<chat-message nickname="Alice">user locale zh
</chat-message>
<chat-message nickname="Koishi">User data has been changed.</chat-message>
</chat-panel>

Users who are familiar with Git may find out, this design draws on the 2-level command of Git: When features of a command are too complex, we can split them into several subcommands, to make the feature of command clear.

:::tip
至于 user.locale 是干什么的，想必大家也已经猜出来了。我们留到 [国际化](./customize.md#国际化) 一节再详细介绍。
:::

## Command Management

Open the Console, we can find the page named 'Command Management' on the activity bar.You can view a list of all current commands here, and set behaviors of these commands.

### Set Aliases

Open the detail page of any commands, we can find "Name Setting" with all aliases on it.Each alias can be used to trigger the command, the first alias will be shown as the default name in the help.

We can add or delete aliases here, or set any alias to the default display name.例如，在 `echo` 指令中点击「添加别名」，输入 `复读`，然后点击「设为默认」，这样一来，用户在帮助中看到的就是 `复读` 而不是 `echo` 了。

### Add Subcommands

In the left sidebar, we can drag any command (except derivative command) below another command, which will make it a subcommand of the another command.例如，我们可以将 [`bind`](../../plugins/common/bind.md) 指令设置为 `user` 指令的子指令，因为这属于用户管理的一部分。

Click the plus button in the top right, we can create a new command.This new command naturally lacks inherent actions, its primary purpose is to serve as the parent command for other commands, aiming to enhance the presentation quality.For the new command created through this method, we can remove them by clicking on the trash button in the upper right corner.

### Permission Management

在「名称设置」下方还有更多的配置项，我们可以在这里进一步配置指令对用户的访问权限。例如，将 echo 指令的 `authority` 设置为 `2`，那么将只有 2 级以上权限的用户才能调用该指令。

我们甚至还可以单独设置每一个指令选项的权限等级。例如，我们可以单独给 `-E, --unescape` 选项设置 `authority` 为 3。这样一来，只有 3 级以上权限的用户才能使用 `echo -E` 的功能。

关于用户权限，请参考 [权限管理](./customize.md#权限管理) 一节。
