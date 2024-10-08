# 指令进阶技巧

## 使用引号

与大多数命令行工具一样，你可以使用单引号或双引号将参数包裹，引号中的内容将被视为一个独立的参数。这在许多场景下都非常有用：

- 当希望传入带空格的参数时 (默认行为是只解析空格前面的部分)
- 当希望传入以 `-` 开头的参数时 (默认的行为是解析成下一个选项)
- 当希望传入一个空字符串时作为参数时 (默认的行为是解析为 `true`)

## 指令插值

如果你希望在指令中使用其他指令的内容，可以使用 `$()` 进行指令插值：

<chat-panel>
<chat-message nickname="Alice">echo foo$(echo bar)</chat-message>
<chat-message nickname="Koishi">foobar</chat-message>
</chat-panel>

Koishi 默认不转义单引号内的文本。如果你不希望某个参数被插值语法所转义，可以使用单引号：

<chat-panel>
<chat-message nickname="Alice">echo 'foo$(echo bar)'</chat-message>
<chat-message nickname="Koishi">foo$(echo bar)</chat-message>
</chat-panel>

最后，你还可以在 [koishi-plugin-eval](https://eval.koishi.chat) 中了解到另一种插值方法。

## 模糊匹配

在日常的使用中，我们也难免会遇到打错的情况，这时 Koishi 还会自动根据相近的指令名进行纠错提醒：

<chat-panel>
<chat-message nickname="Alice">ecko hello</chat-message>
<chat-message nickname="Koishi">您要找的是不是“echo”？回复句号以使用推测的指令。</chat-message>
<chat-message nickname="Alice">.</chat-message>
<chat-message nickname="Koishi">hello</chat-message>
</chat-panel>

如果想调整模糊匹配的程度，你还可以修改配置项 [minSimilarity](../../api/core/app.md#options-minsimilarity)。是不是很方便呢？
