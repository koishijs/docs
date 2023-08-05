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

- The help command is provided by [help](../../plugins/common/help.md), which could display help information about a list of every command or detail for a specific command.
- The echo command is provided by [echo](../../plugins/common/echo.md), which could return the input from users.

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

In the usages above, we have encountered two new concepts：**Argument** and **Option**.

There are two types of parameters: required parameters, quoted by a pair of chevrons `<>`; and optional parameters, quoted by a pair of brackets `[]`. A command may have arbitrary parameters, their orders are fixed, which means that users should enter the parameters in the order that pre-defined by the command. Required parameters must be precedent before optional parameters. When user enters fewer parameters than the required parameters that the plugin requires, the plugin should often print errors. When user enters extra parameters, they would be ignored generally.

For example, command `help` has an optional argument which indicates the name of the command to be viewed; command `echo` has a required argument which indicates the message to be sent. Let's see what will happen if the required parameter is missing:

<chat-panel>
<chat-message nickname="Alice">echo</chat-message>
<chat-message nickname="Koishi">
<p>Please type to send</p>
</chat-message>
</chat-panel>

The behavior would be affected by the options as well. An option usually starts with `-` or `--`, followed by a fixed word without any spaces, the word is the name of the option. There are no order requirements between options, but generally we should put options before parameters. Let's try out!

<chat-panel>
<chat-message nickname="Alice">echo &lt;image url="https://koishi.chat/logo.png"/&gt;</chat-message>
<chat-message nickname="Koishi">&lt;image url="https://koishi.chat/logo.png"/&gt;</chat-message>
<chat-message nickname="Alice">echo -E &lt;image url="https://koishi.chat/logo.png"/&gt;</chat-message>
<chat-message nickname="Koishi">
<img src="https://koishi.chat/logo.png" width="100"/>
</chat-message>
</chat-panel>

In the example above, the option `-E` that we used changed the outputs. We will talk about it in detail in the next section.

In addition to being required and optional, the arguments can be divided into fixed and variable length. A variable-length argument would be fed all characters including whitespace characters, while a fixed-length one stops feeding when it reads whitespace characters. The variable-length argument is defined by `...` follows the parameter name. For example, the argument of `echo` is variable-length. If it is required to pass whitespace characters into a fixed-length argument, you can wrap the whole argument into quotes, just like:

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

Both `-s` 和 `-t` are options with arguments. We use `-t ja` to specify the target language as Japanese, while the source language option remains default still.

## Command Prefix

However, it is very vulnerable to make a mistake if trigger the command just by a single wordIn order to avoid this case, Koishi introduced the concept of prefix trigger.In Global Settings, we have provided configuration items called `prefix` and `nickname`.If `prefix` is set to `/`, `nickname` is set to `Shiki-chan`, only the following information can trigger：

```sh
Shiki-chan, echo hello
@Shiki-chan echo hello
/echo hello
```

In other words, the actual condition in which a command can be triggered is:

- Message starts with `prefix` and follows the command
- Message starts with `nickname` after which you can have commas or blank characters and then the command
- The message starts with @Bot (multiple `@`but at least one bot account), followed by a command

For groups with lots of people or more than one bot, we strongly recommend that each bot configure a different command prefix.In the context of private chat, there are no restrictions as there is no fear of mistakes.Command calls without a prefix can also be performed properly.

::: tip
**Tips for  `prefix` **

1. `prefix` is a list with default value `['']` for triggering a prefix without prefix; empty the list will not trigger all instructions via `prefix` (but can still be triggered by private chat or `nickname` or @Bot)
2. If you set multiple values in `prefix` such as `['.', '/', '']`, then `.`, `/` or no prefix can all trigger the command; but empty string `'` must be written in the last one because Koishi matches each prefix in order
3. You can set different `prefix`for different sessions, refer to [filter](./filter.md) section
:::

## Subcommands

[admin](../../plugins/common/admin.md) plugin provides a command named user. Let's have a try:

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

Here is a new concept: subcommands.Subcommands are not different from normal commands on calls, but they will not appear in the list of global commands returned by `help` but only in the help message of the parent command `user`.The purpose of this design is to avoid too large a list of instructions and to organize them in a clearer way.

In the example above, we can also find Koishi has two different types of subcommands: one is **hierarchy** such as `authorize`and another is **derivative**, eg: `user.locale`.The latter differs from the predecessor in that its name contains the name of the parent command and a decimal point `.`.We also need to add this decimal point when calling:

<chat-panel>
<chat-message nickname="Alice">user.locale en</chat-message>
<chat-message nickname="Koishi">User data updated.</chat-message>
</chat-panel>

如果父指令本身没有功能，那么 `user` 和 `user -h` 的效果是一样的。此时，我们也可以使用空格代替小数点进行派生式子指令的调用：

<chat-panel>
<chat-message nickname="Alice">user locale zh
</chat-message>
<chat-message nickname="Koishi">用户数据已修改。</chat-message>
</chat-panel>

熟悉 Git 的用户可能会发现，这种设计正是借鉴了 Git 的二级指令：当一个指令的功能过于复杂时，我们可以将其拆分为多个子指令，从而使得指令的功能更加清晰。

::: tip
至于 user.locale 是干什么的，想必大家也已经猜出来了。我们留到 [国际化](./i18n.md) 一节再详细介绍。
:::

## Command Management

打开控制台，我们会在活动栏中找到名为「指令管理」的页面。你可以在这里查看当前所有指令的列表，并对指令的行为进行设置。

### Set Aliases

点进任意指令的详情页，首先就能看到「名称设置」，这里展示了指令的全部别名。每个别名都能被用来触发指令，而第一个别名则会作为默认名称显示在帮助中。

你可以在这里添加或删除别名，也可以将任意别名设置为默认的显示名称。例如，在 `echo` 指令中点击「添加别名」，输入 `复读`，然后点击「设为默认」，这样一来，用户在帮助中看到的就是 `复读` 而不是 `echo` 了。

### Add Subcommands

在左侧栏中，你可以将任何指令 (派生式指令除外) 拖至其他指令的下方，这将使得前者成为后者的子指令。例如，我们可以将 [`bind`](../../plugins/common/bind.md) 指令或是 [`usage`](../../plugins/common/rate-limit.md) 指令设置为 `user` 指令的子指令，因为这属于用户管理的一部分。

点击右上角的加号按钮，我们可以创建一个新指令。这个新指令自然是没有行为的，它的主要目的是作为其他指令的父指令，已获得更好的展示效果。对于通过此方法创建的新指令，我们可以通过点击右上角的垃圾桶按钮将其移除。

### Permission Management

在「名称设置」下方还有更多的配置项，我们可以在这里进一步配置指令对用户的访问权限。例如，将 echo 指令的 `authority` 设置为 `2`，那么将只有 2 级以上权限的用户才能调用该指令。

我们甚至还可以单独设置每一个指令选项的权限等级。例如，我们可以单独给 `-E, --unescape` 选项设置 `authority` 为 3。这样一来，只有 3 级以上权限的用户才能使用 `echo -E` 的功能。

For user permissions, refer to [permissions management](./permission.md) section.

### Rate Limits

:::tip
This feature is provided by [rate-limit](../../plugins/common/rate-limit.md) plugin.
:::

有些指令 (例如签到抽卡，限制次数的 API 调用等) 我们并不希望被无限调用，这时我们可以通过 `maxUsage` 设置每天访问额度的上限。当超出总次数后，机器人将回复「调用次数已达上限」。

另一些指令 (例如高强度刷屏，需要等待一定时间才有结果的功能) 我们并不希望被短时间内重复调用，这时我们可以通过 `minInterval` 设置最短触发间隔。如果一个处于冷却中的指令再次被调用，机器人将会提示「调用过于频繁，请稍后再试」。

如果你希望某些选项不计入总次数，可以使用选项配置中的 `notUsage`。启用此项后，当指令调用含有对应的选项时，将不会收到 `maxUsage` 和 `minInterval` 的限制。

最后，如果我们希望让多个指令共同同一套速率限制，可以通过 `usageName` 来进行管理。只需将这些指令的 `usageName` 设置为相同的值即可。
