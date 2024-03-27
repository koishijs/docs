# Advanced Command Tricks

## Quotes

Koishi would regard the content in quotes (whatever full-width or half-width) as a single parameter. This would be useful in many cases, for example:

- Passing parameters with spaces, otherwise spaces would be treated as delimiters between parameters.
- 当希望传入以 `-` 开头的参数时 (默认的行为是解析成下一个选项)
- 当希望传入一个空字符串时作为参数时 (默认的行为是解析为 `true`)
- 当希望传入只由数字构成的字符串参数时 (默认行为是解析为 `number` 类型)

## Interpolation

如果你希望在指令中使用其他指令的内容，可以使用 `$()` 进行指令插值：

<chat-panel>
<chat-message nickname="Alice">echo foo$(echo bar)</chat-message>
<chat-message nickname="Koishi">foobar</chat-message>
</chat-panel>

By default, text in single quotes would not be escaped. So it can be used when you don't want the parameter to be escaped:

<chat-panel>
<chat-message nickname="Alice">echo 'foo$(echo bar)'</chat-message>
<chat-message nickname="Koishi">foo$(echo bar)</chat-message>
</chat-panel>

最后，你还可以在 [koishi-plugin-eval](https://eval.koishi.chat) 中了解到另一种插值方法。

## Fuzzy Matching

In the daily use, it is not surprise that you make typos. In this case, Koishi would show hints based on similar commands:

<chat-panel>
<chat-message nickname="Alice">ecko hello</chat-message>
<chat-message nickname="Koishi">您要找的是不是“echo”？Send a period to apply the suggestion.</chat-message>
<chat-message nickname="Alice">.</chat-message>
<chat-message nickname="Koishi">hello</chat-message>
</chat-panel>

如果想调整模糊匹配的程度，你还可以修改配置项 [minSimilarity](../../api/core/app.md#options-minsimilarity)。Very convenient, isn't it?
