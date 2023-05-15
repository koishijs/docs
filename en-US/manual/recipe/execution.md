# Advanced Command Tricks

## Quotes

Koishi would regard the content in quotes (whatever full-width or half-width) as a single parameter. This would be useful in many cases, for example:

- Passing parameters with spaces, otherwise spaces would be treated as delimiters between parameters.
- Passing parameters that start with `-`, otherwise they would be treated as options.
- Passing an empty string as the parameter, otherwise it would be treated as `true`.
- Passing numbers as string, otherwise they would be treated as `number` type.

## Interpolation

You could use `$()` to inject the results from other commands into your current command:

<chat-panel>
<chat-message nickname="Alice">echo foo$(echo bar)</chat-message>
<chat-message nickname="Koishi">foobar</chat-message>
</chat-panel>

By default, text in single quotes would not be escaped. So it can be used when you don't want the parameter to be escaped:

<chat-panel>
<chat-message nickname="Alice">echo 'foo$(echo bar)'</chat-message>
<chat-message nickname="Koishi">foo$(echo bar)</chat-message>
</chat-panel>

Lastly, there is another interpolation approach in the [koishi-plugin-eval](https://eval.koishi.chat) plugin.

## Fuzzy Matching

在日常的使用中，我们也难免会遇到打错的情况，这时 Koishi 还会自动根据相近的指令名进行纠错提醒：

<chat-panel>
<chat-message nickname="Alice">ecko hello</chat-message>
<chat-message nickname="Koishi">没有此命令。你要找的是不是“echo”？发送空行或句号以调用推测的指令。</chat-message>
<chat-message nickname="Alice">.</chat-message>
<chat-message nickname="Koishi">hello</chat-message>
</chat-panel>

如果想调整模糊匹配的程度，你还可以修改配置项 [minSimilarity](../../api/core/app.md#options-minsimilarity)。是不是很方便呢？
