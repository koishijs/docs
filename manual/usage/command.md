# 指令系统

在了解了控制台的基本用法后，我们终于可以开始介绍如何与机器人对话了！让我们从上一节中看到的例子开始：

<chat-panel>
<chat-message nickname="Alice">help</chat-message>
<chat-message nickname="Koishi">
<p>当前可用的指令有：</p>
<p class="indent-1">echo  发送消息</p>
<p class="indent-1">help  显示帮助信息</p>
<p>输入“帮助 指令名”查看特定指令的语法和使用示例。</p>
</chat-message>
</chat-panel>

这里的输出与两个插件有关：

- help 指令由 @koishijs/plugin-help 提供，它可以显示指令列表或具体指令的帮助信息
- echo 指令由 @koishijs/plugin-echo 提供，它可以将用户的输入原样返回

一个 Koishi 机器人的绝大部分功能都是通过指令提供给用户的。当你安装了更多的插件后，你也就有了更多的指令可供使用。

## 查看帮助

help 指令后还可以添加一个参数，用于查看特定指令的帮助信息：

<chat-panel>
<chat-message nickname="Alice">help echo</chat-message>
<chat-message nickname="Koishi">
<p>指令：echo &lt;message...></p>
<p>发送消息</p>
<p>可用的选项有：</p>
<p class="indent-1">-e, --escape  发送转义消息</p>
<p class="indent-1">-E, --unescape  发送反转义消息</p>
</chat-message>
</chat-panel>

那么细心的小伙伴可能会发现，既然 help 本身也是一个指令，那我能不能用来查看 help 自己的帮助信息呢？答案是肯定的：

<chat-panel>
<chat-message nickname="Alice">help help</chat-message>
<chat-message nickname="Koishi">
<p>指令：help [command]</p>
<p>显示帮助信息</p>
<p>可用的选项有：</p>
<p class="indent-1">-a, --authority  显示权限设置</p>
<p class="indent-1">-H, --show-hidden  查看隐藏的选项和指令</p>
</chat-message>
</chat-panel>

## 参数和选项

在上面的用法中，我们接触到了两个新的概念：**参数 (Argument)** 和 **选项 (Option)**。

参数分为必选参数和可选参数，分别用尖括号 `<>` 和方括号 `[]` 表示。一个指令可以有任意多个参数，它们的顺序是固定的，用户必须按照指令定义的顺序来输入参数。必选参数一定出现在可选参数之前。如果用户输入的参数数量不足必选参数的个数，那么插件通常会给出错误提示；如果用户输入了额外的参数，那么会被忽略。

例如，help 指令共有一个参数，它是可选参数，表示要查看的指令名；echo 指令也有一个参数，它是必选参数，表示要发送的消息。让我们看看如果不填必选参数会怎么样：

<chat-panel>
<chat-message nickname="Alice">echo</chat-message>
<chat-message nickname="Koishi">
<p>请输入要发送的文本。</p>
</chat-message>
</chat-panel>

选项同样可以控制指令的行为。它通常以 `-` 或 `--` 开头，后面不带空格地跟着一个固定的单词，称为选项名称。选项之间没有顺序要求，但通常建议将选项放在参数之前。让我们试试看：

<chat-panel>
<chat-message nickname="Alice">echo &lt;image url="https://koishi.chat/logo.png"/&gt;</chat-message>
<chat-message nickname="Koishi">&lt;image url="https://koishi.chat/logo.png"/&gt;</chat-message>
<chat-message nickname="Alice">echo -E &lt;image url="https://koishi.chat/logo.png"/&gt;</chat-message>
<chat-message nickname="Koishi">
<img src="https://koishi.chat/logo.png" width="100"/>
</chat-message>
</chat-panel>

在上面的例子中，我们使用了 `-E` 选项，成功改变了输出的内容。关于这具体是怎么做到的，我们会在后续的章节中进行介绍。

参数除了可以分为必选和可选外，还可以分为定长和变长。定长参数的中不能出现空白字符，而变长参数则可以。变长参数通过参数名前后的 `...` 来指示，例如 `echo` 指令的参数就是一个变长参数。如果要为定长参数传入带有空白字符的内容，可以使用引号将其包裹起来，例如：

<chat-panel>
<chat-message nickname="Alice">help "foo bar"</chat-message>
</chat-panel>

此外，部分选项也可以接受参数。例如，当你安装了翻译插件，你将会获得如下的帮助信息：

<chat-panel>
<chat-message nickname="Alice">help translate</chat-message>
<chat-message nickname="Koishi">
<p>指令：translate &lt;text...></p>
<p>文本翻译</p>
<p>可用的选项有：</p>
<p class="indent-1">-s, --source &lt;lang> 源语言 (默认为自动匹配)</p>
<p class="indent-1">-t, --target &lt;lang> 目标语言 (默认为中文)</p>
</chat-message>
<chat-message nickname="Alice">translate -t ja 你好，世界</chat-message>
<chat-message nickname="Koishi">こんにちは世界</chat-message>
</chat-panel>

在这个例子中，`-s` 和 `-t` 都是带有参数的选项。我们使用 `-t ja` 来指定目标语言为日语，源语言仍然采用了默认行为。

## 触发前缀

然而，如果仅仅通过一个词就能触发指令，在群聊环境下非常容易出现误触。为了避免这种情况，Koishi 引入了前缀触发的概念。在「全局设置」中，我们提供了名为 `prefix` 和 `nickname` 的配置项。假如将 `prefix` 设置为 `/`，`nickname` 设置为 `四季酱`，则在群聊环境下只有以下信息可以触发指令调用：

```sh
四季酱, echo hello
@四季酱 echo hello
/echo hello
```

换句话说，一个指令能够被触发的实际条件为：

- 消息以 `prefix` 开头，后面紧跟着指令调用
- 消息以 `nickname` 开头，后面可以有逗号或空白字符，再后面是指令调用
- 消息以 @机器人 开头 (可以有多个 `@`，但至少一个是机器人账号)，后面是指令调用

对于人数较多或是含有不止一个机器人的群聊，我们强烈建议每一个机器人都配置不同的触发前缀。而在私聊环境下，由于不用担心误触，因此并没有上面的限制。没有触发前缀的指令调用也能被正常执行。

::: tip
**关于 `prefix` 的几点提示**

1. `prefix` 是一个列表，默认值为 `['']` 表示无需前缀也能触发；将列表清空会导致所有指令都无法通过 `prefix` 触发 (但仍然可以通过私聊或 `nickname` 或 @机器人 触发)
2. 如果你在 `prefix` 中设置了多个值，例如 `['.', '/', '']`，那么 `.`, `/` 或无前缀都能触发指令；但由于 Koishi 是按顺序匹配各个前缀的，因此空串 `''` 必须写在最后一个
3. 可以为不同的会话设置不同的 `prefix`，具体请参考 [过滤器](./filter.md) 一节
:::

## 子指令

@koishijs/plugin-admin 插件提供了名为 user 的指令，现在让我们调用一下：

<chat-panel>
<chat-message nickname="Alice">user</chat-message>
<chat-message nickname="Koishi">
<p>指令：user</p>
<p>用户管理</p>
<p>可用的子指令有：</p>
<p class="indent-1">authorize  权限管理</p>
<p class="indent-1">bind  绑定到账号</p>
<p class="indent-1">user.flag  标记信息</p>
<p class="indent-1">user.locale  语言偏好</p>
</chat-message>
</chat-panel>

这里出现了一个新的概念：子指令。子指令在调用上与普通的指令并没有区别，但它们将不会显示在 `help` 返回的全局指令列表中，而只会显示在父指令 `user` 的帮助信息中。这样设计的目的是为了避免指令列表过于冗长，同时也将指令以一种更清晰的方式进行了组织。

在上面的例子中，我们还能发现 Koishi 存在两种不同的子指令：一种是 **层级式**，例如 `bind`；而另一种则是 **派生式**，例如 `user.locale`。后者跟前者的区别是，它的名称带有父指令的名称，以及一个小数点 `.`。在调用时，我们也需要加上这个小数点：

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

## 指令管理

打开控制台，我们会在活动栏中找到名为「指令管理」的页面。你可以在这里查看当前所有指令的列表，并对指令的行为进行设置。

### 别名和显示名称

点进任意指令的详情页，首先就能看到「名称设置」，这里展示了指令的全部别名。每个别名都能被用来触发指令，而第一个别名则会被用作指令的显示名显示在帮助中。

你可以在这里添加或删除别名，也可以将任意别名设置为默认的显示名称。例如，在 echo 指令中点击「添加别名」，输入 `复读`，然后点击「设为默认」，这样一来，用户在帮助中看到的就是 `复读` 而不是 `echo` 了。

### 速率限制

在「名称设置」下方还有更多的配置项，我们可以在这里对指令进行速率限制。有些指令 (例如签到抽卡，限制次数的 API 调用等) 我们并不希望被无限调用，这时我们可以通过 `maxUsage` 设置每天访问额度的上限。当超出总次数后，机器人将回复「调用次数已达上限」。

另一些指令 (例如高强度刷屏，需要等待一定时间才有结果的功能) 我们并不希望被短时间内重复调用，这时我们可以通过 `minInterval` 设置最短触发间隔。如果一个处于冷却中的指令再次被调用，机器人将会提示「调用过于频繁，请稍后再试」。

如果你希望某些选项不计入总次数，可以使用选项配置中的 `notUsage`。启用此项后，当指令调用含有对应的选项时，将不会收到 `maxUsage` 和 `minInterval` 的限制。

最后，如果我们希望让多个指令共同同一套速率限制，可以通过 `usageName` 来进行管理。只需将这些指令的 `usageName` 设置为相同的值即可。

### 权限控制

我们也可以进一步配置指令对用户的访问权限。例如，将 echo 指令的 `authority` 设置为 `2`，那么将只有 2 级以上权限的用户才能调用该指令。

我们甚至还可以单独设置每一个指令选项的权限等级。例如，我们可以单独给 `-E, --unescape` 选项设置 `authority` 为 3。这样一来，只有 3 级以上权限的用户才能使用 `echo -E` 的功能。

关于用户权限，请参考 [权限管理](./authority.md) 一节。
