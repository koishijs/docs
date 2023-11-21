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

In the daily use, it is not surprise that you make typos. In this case, Koishi would show hints based on similar commands:

<chat-panel>
<chat-message nickname="Alice">ecko hello</chat-message>
<chat-message nickname="Koishi">您要找的是不是“echo”？Send a period to apply the suggestion.</chat-message>
<chat-message nickname="Alice">.</chat-message>
<chat-message nickname="Koishi">hello</chat-message>
</chat-panel>

You could also change the value of [minSimilarity](../../api/core/app.md#options-minsimilarity) in the global configuration to adjust the threshold of the fuzzy matching. Very convenient, isn't it?
