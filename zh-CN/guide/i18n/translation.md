# 编写翻译文件

`i18n.define()` 允许开发者为自己的插件提供多套翻译，但直接将每种语言的翻译文本写进源代码并不利于代码的解耦。因此我们建议开发者将翻译文件写在一个单独的目录中，在插件中只需要引用这个目录中的文件即可：

```diff
└── example
    ├── src
    │   ├── locales
    │   │   ├── en-US.yml
    │   │   └── zh-CN.yml
    │   └── index.ts
    └── package.json
```

```ts index.ts
ctx.i18n.define('en-US', require('./locales/en-US'))
ctx.i18n.define('zh-CN', require('./locales/zh-CN'))
```

::: tip
在上面的例子中我们使用了 YAML 作为翻译文件的格式。这是因为它的语法简洁美观，非常适合本地化开发。你也可以采用 JSON 等任何你喜欢的格式进行开发。
:::

::: tip
Node.js 并不支持直接加载 `.yaml` / `.yml` 后缀的文件，但我们可以通过适当的 [register](https://nodejs.org/api/cli.html#-r---require-module) 解决这个问题。对此我们的官方脚手架已经内置了相应的支持。
:::

## 指令本地化

在 [编写帮助](../basic/command.md#编写帮助) 一节中，我们已经了解到指令和参数的描述文本都是在指令注册时就定义的。这种做法对单语言开发固然方便，但并不适合多语言开发，因为它将翻译逻辑与代码逻辑耦合了。如果你希望你编写的指令支持多语言，那么需要将翻译文本单独定义：

```yaml
commands:
  foo:
    description: 指令描述
    usage: |-
      指令用法
      可以是多行文本
    examples: |-
      foo qux
      foo --bar qux
    options:
      bar: 选项描述
```

```ts index.ts
ctx.command('foo').option('bar')
```

上述定义在语言文件中的内容会被 [help](../../plugins/common/help.md) 等插件使用。

### 作用域渲染

如果我们希望在指令中输出一些国际化内容，为了避免与其他指令定义的内容相冲突，最好的办法是将这些内容与其他指令相关文本定义在一起：

```yaml
commands:
  greeting:
    description: 指令描述
    messages:
      morning: 早上好！
      evening: 晚上好！
```

但这样一来，你要在指令回调函数中写的东西就显得有点冗长了：

```ts
if (new Date().getHours < 12) {
  return session.text('commands.greeting.messages.morning')
} else {
  return session.text('commands.greeting.messages.evening')
}
```

有没有好的办法呢？由于我们在调用指令的回调函数时必然知道它属于哪一个指令，因此这些相同的前缀实际上是可以省略的。为了避免与全局定义的路径相冲突，我们用一个 `.` 表示当前指令的 `messages` 中的条目，就像这样：

```ts
if (new Date().getHours < 12) {
  return session.text('.morning')
} else {
  return session.text('.evening')
}
```

## 配置本地化 <badge type="warning">实验性</badge>

## 控制台本地化 <badge type="warning">实验性</badge>
