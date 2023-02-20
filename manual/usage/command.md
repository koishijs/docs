# 指令系统

::: danger
此页面尚未编写完成。请过几天再来看看吧~
:::

在了解了控制台的基本用法后，我们终于可以开始介绍如何与机器人对话了！一个 Koishi 机器人的绝大部分功能都是通过指令提供给用户的，正如你在上一节中看到的例子：

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

- help 指令由 @koishijs/plugin-help 提供，它会根据所有已注册的指令生成帮助信息
- echo 指令由 @koishijs/plugin-echo 提供，它会将用户的输入原样返回

help 指令后还可以添加一个参数，用于查看特定指令的帮助信息：

<chat-panel>
<chat-message nickname="Alice">help echo</chat-message>
<chat-message nickname="Koishi">
<p>echo &lt;message></p>
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
<p>help [command]</p>
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
<chat-message nickname="Alice">echo -e 1+1&lt;3</chat-message>
<chat-message nickname="Koishi">
<p>1+1&amp;lt;3</p>
</chat-message>
</chat-panel>

糟了！这里怎么会有一串 `&lt;` 这样的乱码？先别急，这正是 `-e` 选项有用的标志。这里出现的乱码其实叫做转义字符，你现在并不需要理解它，我们会在后续的章节进行介绍。

<!-- 参数除了可以分为必选和可选外，还有一种特殊的类型：变长参数。变长参数可以接受任意多个参数，它们的顺序是不固定的，用户可以按照自己的意愿来输入参数。变长参数一定出现在必选参数和可选参数之后。变长参数的语法与可选参数相同，只是在参数名前面多了一个星号 `*`。 -->
