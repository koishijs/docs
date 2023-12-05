# 语言包开发 <badge type="warning">实验性</badge>

Koishi 及其官方插件通常会内置 `zh-CN` 和 `en-US` 两种语言。除此以外，还有一些语言同样由官方维护，但是并不会直接内置，而是以专门的插件的形式提供：

- `de-DE`
- `fr-FR`
- `ja-JP`
- `ru-RU`
- `zh-TW`

对应的插件名将形如 @koishijs/plugin-locale-zh-tw (请注意插件名中只会使用小写字母)。

## 参与官方翻译项目

我们在 [Crowdin](https://crowdin.com/project/koishi) 上维护了一个翻译项目，你可以在这里参与上述语言的翻译 (包括 `en-US`)。经过审核的翻译将会被自动同步到 GitHub 仓库中。如果你想翻译的语言不在上述列表中，可以向我们提交 Issue，也可以按照下面的指南发布第三方语言包。

## 编写第三方语言包

如果你不仅仅是想提供标准化的翻译，而是希望为 Koishi 提供不同的说话风格，这同样可以通过语言包来实现。根据 [IETF 语言标签](https://zh.wikipedia.org/wiki/IETF%E8%AA%9E%E8%A8%80%E6%A8%99%E7%B1%A4) 规范，我们可以在标准的语言标签后面添加一个后缀，来表示一个语言变种。例如，你可以通过编写名为 `zh-CN-ZAKO` 的语言包，来为 Koishi 提供一个二次元雌小鬼的说话风格：

<chat-panel>
<p>—— 当要表达「权限不足」时 ——</p>
<chat-message nickname="Koishi">
哼，你以为自己是谁啊？没那个本事就别想在这里装大头！
</chat-message>
</chat-panel>

<chat-panel>
<p>—— 当要表达「调用过于频繁，请稍后再试」时 ——</p>
<chat-message nickname="Koishi">
哎哟，不要这么着急嘛，稍微等一下下，让人家缓口气~
</chat-message>
</chat-panel>
