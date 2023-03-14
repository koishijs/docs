# 指令触发机制

本节介绍有关指令调用的一些机制。

### 指令别名

你可以为一条指令添加别名：

```ts
ctx.command('echo').alias('say')
```

这样一来，无论是 `echo` 还是 `say` 都能触发这条指令了。

### 快捷方式

Koishi 的指令机制虽然能够尽可能避免冲突和误触发，但是也带来了一些麻烦。一方面，一些常用指令的调用会受到指令前缀的限制；另一方面，一些指令可能有较长的选项和参数，但它们调用时却往往是相同的。面对这些情况，**快捷方式 (Shortcut)** 能有效地解决你的问题。

假设你实现了一个货币系统和 rank 指令，调用 `rank wealth --global` 可以实现查看全服所有人财富排行，你可以这样做：

```ts
ctx.command('rank <type>')
  .shortcut('全服财富排行', { args: ['wealth'], options: { global: true } })
```

这样一来，只要输入“全服财富排行”，Koishi 就会自动调用 `rank wealth --global`，回复查询结果了。

通常来说，快捷方式都要求严格匹配（当然删除两端空格和繁简体转化这种程度的模糊匹配是可以做的），但是你也可以让快捷方式允许带参数：

```ts
ctx.command('buy <item>')
  .shortcut('购买', { prefix: true, fuzzy: true })
```

上面程序注册了一个快捷方式，`prefix` 要求在调用时保留指令前缀，而 `fuzzy` 允许这个快捷方式带参数列表。这样一来，只要输入“Koishi，购买物品名”，Koishi 就会自动调用“buy 物品名”了。

除此以外，你还可以使用正则表达式作为快捷方式：

```ts
ctx.command('market <area>')
  .shortcut(/^查(.+区)市场$/, { args: ['$1'] })
```

这样一来，输入“查美区市场”就等价于输入“market 美区”了。

不难看出，使用快捷方式会让你的输入方式更加接近自然语言，也会让你的机器人显得更平易近人。

### 使用引号

Koishi 会自动将引号（半角或者全角）中的内容视为一个整体。这在很多场景中都非常有用，下面举出了一些典型的例子：

- 当希望传入带空格的参数时（默认行为是只解析空格前面的部分）
- 当希望传入以 `-` 开头的参数时（默认的行为是解析成下一个选项）
- 当希望传入一个空字符串时作为参数时（默认的行为是解析为 `true`）
- 当希望传入只由数字构成的字符串参数时（默认行为是解析为 `number` 类型）

当然，这些情况也都可以使用接下来要介绍的 [类型系统](#类型系统) 解决。

### 指令插值

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
