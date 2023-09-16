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
3. You can set different `prefix` for different sessions, learn more in [Filters](./customize.md#过滤器) section
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

If the parent command didn't have a feature itself, then the effect of `user` and `user -h` are the same.In that situation, we can use spaces instead of dots to call derivative subcommands:

<chat-panel>
<chat-message nickname="Alice">user locale zh
</chat-message>
<chat-message nickname="Koishi">User data has been changed.</chat-message>
</chat-panel>

Users who are familiar with Git may find out, this design draws on the 2-level command of Git: When features of a command are too complex, we can split them into several subcommands, to make the feature of command clear.

::: tip
You may already guess out what does user.locale do.We will talk more about it in [Internationalization](./customize.md#国际化) section.
:::

## Command Management

Open the Console, we can find the page named 'Command Management' on the activity bar.You can view a list of all current commands here, and set behaviors of these commands.

### Set Aliases

Open the detail page of any commands, we can find "Name Setting" with all aliases on it.Each alias can be used to trigger the command, the first alias will be shown as the default name in the help.

We can add or delete aliases here, or set any alias to the default display name.For example, click "Add Alias" in the `echo` command, input `repeat` and click "Set as default", so that the user will see `repeat` instead of `echo` in the help.

### Add Subcommands

In the left sidebar, we can drag any command (except derivative command) below another command, which will make it a subcommand of the another command.例如，我们可以将 [`bind`](../../plugins/common/bind.md) 指令设置为 `user` 指令的子指令，因为这属于用户管理的一部分。

Click the plus button in the top right, we can create a new command.This new command naturally lacks inherent actions, its primary purpose is to serve as the parent command for other commands, aiming to enhance the presentation quality.对于通过此方法创建的新指令，我们可以通过点击右上角的垃圾桶按钮将其移除。

### Permission Management

在「名称设置」下方还有更多的配置项，我们可以在这里进一步配置指令对用户的访问权限。例如，将 echo 指令的 `authority` 设置为 `2`，那么将只有 2 级以上权限的用户才能调用该指令。

我们甚至还可以单独设置每一个指令选项的权限等级。例如，我们可以单独给 `-E, --unescape` 选项设置 `authority` 为 3。这样一来，只有 3 级以上权限的用户才能使用 `echo -E` 的功能。

For user permissions, please refer to [Permission Management](./customize.md#权限管理) section.
