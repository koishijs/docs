# Advanced Command Tricks

## Quotes

与大多数命令行工具一样，你可以使用单引号或双引号将参数包裹，引号中的内容将被视为一个独立的参数。这在许多场景下都非常有用：

- Passing parameters with spaces (by default, spaces would be treated as delimiters between parameters)
- Passing parameters starting with `-` (by default, text starting with `-` would be treated as options)
- Passing an empty string as parameters (by default, options without parameters would be parsed as `true`)

## Command Substitution

Use the result from the execution of other commands as parameters in a command, you can use `$()` for command interpolation:

<chat-panel>
<chat-message nickname="Alice">echo foo$(echo bar)</chat-message>
<chat-message nickname="Koishi">foobar</chat-message>
</chat-panel>

By default, text in single quotes would not be escaped. So it can be used when you don't want the parameter to be escaped:

<chat-panel>
<chat-message nickname="Alice">echo 'foo$(echo bar)'</chat-message>
<chat-message nickname="Koishi">foo$(echo bar)</chat-message>
</chat-panel>

Finally, you can also learn about another interpolation method in [koishi-plugin-eval](https://eval.koishi.chat).

## Fuzzy Matching

In the daily use, it is not surprise that you make typos. In this case, Koishi would show hints based on similar commands:

<chat-panel>
<chat-message nickname="Alice">ecko hello</chat-message>
<chat-message nickname="Koishi">Do you mean "echo"?Send a period to apply the suggestion.</chat-message>
<chat-message nickname="Alice">.</chat-message>
<chat-message nickname="Koishi">hello</chat-message>
</chat-panel>

You can also adjust the value of the configuration [`minSimilarity`](../../api/core/app.md#options-minsimilarity) for the similarity confidence in fuzzy search. Very convenient, isn't it?
