# 指令调用技巧

## 使用引号

Koishi 会自动将引号 (半角或者全角) 中的内容视为一个整体。这在很多场景中都非常有用，下面举出了一些典型的例子：

- 当希望传入带空格的参数时 (默认行为是只解析空格前面的部分)
- 当希望传入以 `-` 开头的参数时 (默认的行为是解析成下一个选项)
- 当希望传入一个空字符串时作为参数时 (默认的行为是解析为 `true`)
- 当希望传入只由数字构成的字符串参数时 (默认行为是解析为 `number` 类型)

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
