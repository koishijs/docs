# Localization File

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

```yaml title=locales/zh-CN.yml
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

如果我们希望在指令中输出一些本地化内容，为了避免与其他指令定义的内容相冲突，最好的办法是将这些内容与其他指令相关文本定义在一起：

```yaml title=locales/zh-CN.yml
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

::: warning
配置本地化仍然是实验性功能，暂不支持被其他插件扩展。
:::

插件配置中出现的文本也可以支持多语言。考虑下面的配置项：

```ts
Schema.object({
  foo: Schema.string().description('这是一个字符串。'),
  bar: Schema.number().description('这是一个数值。'),
})
```

为了让其支持多语言，我们在翻译文件中增加名为 `_config` 的属性：

```yaml title=locales/zh-CN.yml
_config:
  foo: 这是一个字符串。
  bar: 这是一个数值。
```

接着使用 `schema.i18n()` 加载翻译文件：

```ts
Schema.object({
  foo: Schema.string(),
  bar: Schema.number(),
}).i18n({
  'zh-CN': require('./locales/zh-CN')._config,
  'en-US': require('./locales/en-US')._config,
})
```

### 描述复杂类型

默认情况下，上述 `_config` 对象的键对应配置项的键，值则是对应的翻译文本。这种写法足以覆盖大部分的情况，即便当出现嵌套的对象或引入 `intersect` 类型时也成立：

```ts
// 一个带有嵌套对象和 intersect 的类型
Schema.intersect([
  Schema.object({
    foo: Schema.object({
      qux: Schema.boolean(),
    }),
  }),
  Schema.object({
    bar: Schema.string(),
    baz: Schema.number(),
  }),
])
```

```yaml
# 对应的翻译文件
foo:
  qux: 这是一个配置项。
bar: 这是另一个配置项。
baz: 这是再一个配置项。
```

然而，当想要描述 `union`, `array`, `dict` 等类型，或是要为一个 `intersect` 中的不同对象设置不同的小标题时，上面的方法就行不通了。此时就需要引入一些高特殊属性：

```ts
// 一个带有 union, array 和 dict 的复杂类型
Schema.intersect([
  Schema.object({
    shared: Schema.string(),
    type: Schema.union(['foo', 'bar']).required(),
  }),
  Schema.union([
    Schema.object({
      type: Schema.const('foo').required(),
      value: Schema.array(Number),
    }),
    Schema.object({
      type: Schema.const('bar').required(),
      text: Schema.Dict(string),
    }),
  ]),
])
```

```yaml
# 对应的翻译文件
- shared: 公用的配置项。
  type:
    $desc: 选择一个分支。
    $inner:
      - 分支 1
      - 分支 2
- - $desc: 分支 1
    $inner: 一个数值。
    value: 一个数值构成的数组。
  - $desc: 分支 2
    $inner: 一个字符串。
    text: 一个字符串构成的字典。
```

其中，任何一个节点的 `$desc` 属性表达其自身的文本，`$inner` 属性则用于描述其子节点 (对于 `array` 和 `dict` 是其内部类型，对于 `intersect` 和 `union` 是其内部类型的数组)。而在对象中，我们可以同时使用普通的属性和带有 `$` 前缀的特殊属性。

## 控制台本地化 <badge type="warning">实验性</badge>

::: warning
控制台本地化仍然是实验性功能，暂不支持被其他插件扩展。
:::

如果你在开发支持多语言的控制台扩展，你可以组件中使用 `vue-i18n` 这样的国际化库：

```ts
import { useI18n } from 'vue-i18n'
import zhCN from './zh-CN.yml'
import enUS from './en-US.yml'

const { t, setLocaleMessage } = useI18n({
  messages: {
    'zh-CN': zhCN,
    'en-US': enUS,
  },
})

// 支持热重载
if (import.meta.hot) {
  import.meta.hot.accept('./zh-CN.yml', (module) => {
    setLocaleMessage('zh-CN', module.default)
  })
  import.meta.hot.accept('./en-US.yml', (module) => {
    setLocaleMessage('en-US', module.default)
  })
}
```

::: tip
注意：此时你的翻译文件应当处于 `client` 目录而非 `src/locales` 目录。
:::
