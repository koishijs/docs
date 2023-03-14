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

参数除了可以分为必选和可选外，还可以分为定长和变长。定长参数的中不能出现空白字符，而变长参数则可以。变长参数通过参数名前后的 `...` 来指示，例如 `echo` 指令的参数就是一个变长参数。如果要为定长参数传入带有空白字符的内容，可以使用引号将其括起来，例如：

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
