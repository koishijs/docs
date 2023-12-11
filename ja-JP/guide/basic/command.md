# 指令开发

:::tip
在学习本节之前，建议先完整阅读 [入门 > 指令系统](../../manual/usage/command.md)。
:::

正如我们在入门篇中介绍的那样，一个 Koishi 机器人的绝大部分功能都是通过指令提供给用户的。Koishi 的指令系统能够高效地处理大量消息的并发调用，同时还提供了快捷方式、调用前缀、权限管理、速率限制、本地化等大量功能。因此，只需掌握指令开发并编写少量代码就可以轻松应对各类用户需求。

编写下面的代码，你就实现了一个简单的 echo 指令：

```ts
ctx.command('echo <message>')
  .action((_, message) => message)
```

<chat-panel>
<chat-message nickname="Alice">echo Hello!</chat-message>
<chat-message nickname="Koishi">Hello!</chat-message>
</chat-panel>

让我们回头看看这段代码是如何工作的：

- `.command()` 方法定义了名为 echo 的指令，其有一个必选参数为 `message`
- `.action()` 方法定义了指令触发时的回调函数，第一个参数是一个 `Argv` 对象，第二个参数是输入的 `message`

这种链式的结构能够让我们非常方便地定义和扩展指令。稍后我们将看到这两个函数的更多用法，以及更多指令相关的函数。

## 定义参数

正如你在上面所见的那样，使用 `ctx.command(decl)` 方法可以定义一个指令，其中 `decl` 是一个字符串，包含了 **指令名** 和 **参数列表**。

- 指令名可以包含数字、字母、短横线甚至中文，但不应该包含空白字符、小数点 `.` 或斜杠 `/`；小数点和斜杠的用途参见 [注册子指令](#注册子指令) 章节
- 一个指令可以含有任意个参数，其中 **必选参数** 用尖括号包裹，**可选参数** 用方括号包裹；这些参数将作为 `action` 回调函数除 `Argv` 以外的的后续参数传入

例如，下面的程序定义了一个拥有三个参数的指令，第一个为必选参数，后面两个为可选参数，它们将分别作为 `action` 回调函数的第 2\~4 个参数：

```ts
ctx.command('test <arg1> [arg2] [arg3]')
  .action((_, arg1, arg2, arg3) => { /* do something */ })
```

:::tip
除去表达的意义不同，以及参数个数不足时使用必选参数可能产生错误信息外，这两种参数在程序上是没有区别的。与此同时，默认情况下 `action` 回调函数从第二个参数起也总是字符串。如果传入的参数不足，则对应的参数不会被传入，因此你需要自己处理可能的 `undefined`。
:::

### 变长参数

有时我们需要传入未知数量的参数，这时我们可以使用 **变长参数**，它可以通过在括号中前置 `...` 来实现。在下面的例子中，无论传入了多少个参数，都会被放入 `rest` 数组进行处理：

```ts
ctx.command('test <arg1> [...rest]')
  .action((_, arg1, ...rest) => { /* do something */ })
```

### 文本参数

通常来说传入的信息被解析成指令调用后，会被空格分割成若干个参数。但如果你想输入的就是含有空格的内容，可以通过在括号中后置 `:text` 来声明一个 **文本参数**。
在下面的例子中，即使 test 后面的内容中含有空格，也会被整体传入 `message` 中：

```ts
ctx.command('test <message:text>')
  .action((_, message) => { /* do something */ })
```

:::tip
文本参数的解析优先级很高，即使是之后的内容中含有选项也会被一并认为是该参数的一部分。因此，当使用文本参数时，应确保选项写在该参数之前，或 [使用引号](../../manual/recipe/execution.md#使用引号) 将要输入的文本包裹起来。
:::

### 参数的类型

除去 `text` 以外，Koishi 还支持许多其他的类型。它们的用法与 `text` 无异：

```ts
function showValue(value) {
  return `${typeof value} ${JSON.stringify(value)}`
}

ctx.command('test [arg:number]')
  .option('foo', '<val:string>')
  .action(({ options }, arg) => `${showValue(arg)} ${showValue(options.foo)}`)
```

<chat-panel>
<chat-message nickname="Alice">test 100 --foo 200</chat-message>
<chat-message nickname="Koishi">number 100 string "200"</chat-message>
<chat-message nickname="Alice">test xyz</chat-message>
<chat-message nickname="Koishi">参数 arg 输入无效，请提供一个数字。</chat-message>
</chat-panel>

目前 Koishi 支持的内置类型如下：

- string: `string` 字符串
- number: `number` 数值
- text: `string` 贪婪匹配的字符串
- user: `string` 用户，格式为 `{platform}:{id}`
- channel: `string` 频道，格式为 `{platform}:{id}`
- integer: `number` 整数
- posint: `number` 正整数
- date: `Date` 日期

<!-- ### 定义新类型

使用 `Argv.createDomain()` 创建新类型：

```ts
import { Argv } from 'koishi'

declare module 'koishi' {
  namespace Argv {
    interface Domain {
      repeat: string
    }
  }
}

Argv.createDomain('repeat', source => source.repeat(3))

ctx.command('test [arg:repeat]').action((_, arg) => arg)
```

<chat-panel>
<chat-message nickname="Alice">test foo</chat-message>
<chat-message nickname="Koishi">foofoofoo</chat-message>
</chat-panel>

### 类型检查

你也可以在 `Argv.createDomain()` 的回调函数中抛出错误，以实现类型检查的目的：

```ts
import { Argv } from 'koishi'

declare module 'koishi' {
  namespace Argv {
    interface Domain {
      positive: number
    }
  }
}

Argv.createDomain('positive', (source) => {
  const value = +source
  if (Math.sign(value) !== 1) throw new Error('应为正数。')
  return value.toString()
})

ctx.command('test [x:positive]').action((_, arg) => arg)
```

<chat-panel>
<chat-message nickname="Alice">test 0.5</chat-message>
<chat-message nickname="Koishi">参数 x 输入无效，应为整数。</chat-message>
</chat-panel> -->

<!-- ### 使用检查器

从 v3 开始 Koishi 支持给一个指令配置多个回调函数，并引入了 `cmd.before()`。你可以利用这个接口定义一些更加复杂的类型检查逻辑。让我们在最后简单地了解一下这个特性。

```ts
ctx.command('test')
  .before(checker1)
  .before(checker2)
  .action(action1)
  .action(action2)
```

在上面的代码中，我们给 test 指令配置了 4 个回调函数。在运行时，这 4 个函数将逐一被调用。当其中一个函数返回值的类型为 `string` 时，这个调用过程停止，并输出这个返回值（如果返回空串，调用依然会停止，此时没有输出）。

在执行顺序上，同时，`.before()` 回调函数是先注册的先调用；而 `.action()` 则是最后注册的先调用。你还可以通过在注册回调函数时传入 truthy 作为第二个参数来实现这个效果的反转。

指令执行时将按照下面的顺序注意调用：

- before-command 事件（包括 check 回调函数）
- action 回调函数
- command 事件

因此，检查器可以在 `usage` 这样的属性尚未发生更新时进行操作，并提前退出执行流程。 -->

## 定义选项

使用 `cmd.option(name, decl)` 方法可以给指令定义参数。这个方法也是支持链式调用的，就像这样：

```ts
ctx.command('test')
  .option('alpha', '-a')          // 定义一个选项
  .option('beta', '-b [beta]')    // 定义一个带参数的可选选项
  .option('gamma', '-c <gamma>')  // 定义一个带参数的必选选项
  .action(({ options }) => JSON.stringify(options))
```

<chat-panel>
<chat-message nickname="Alice">test -adb text --gamma=1 --foo-bar baz --no-xyz</chat-message>
<chat-message nickname="Koishi">{ "alpha": true, "d": true, "beta": "text", "gamma": 1, "fooBar": "baz", "xyz": false }</chat-message>
</chat-panel>

从上面的例子中我们不难看出 Koishi 指令系统的许多方便的特性：

- 使用注册的多个别名中的任何一个都会被赋值到 `name` 中
- 选项和参数之间同时支持用空格或等号隔开的语法
- 单个短横线后跟多个字母时，会把之后的参数赋给最后一个字母（如果需要参数的话）
- 多字母中如果有短横线，会被自动进行驼峰式处理
- 类型自动转换：无参数默认为 `true`，如果是数字会转化为数字，其余情况为字符串
- 支持识别未注册选项，同时会根据传入的命令行推测是否需要参数
- 如果一个未注册选项以 `no-` 开头，则会自动去除这个前缀并处理为 `false`

在调用 `cmd.option()` 时，你还可以传入第三个参数，它应该是一个对象，用于配置选项的具体特性。它们将在下面逐一介绍。

### 选项的默认值

使用 `fallback` 配置选项的默认值。配置了默认值的选项，如果没有被使用，则会按照注册的默认值进行赋值。

```ts
ctx.command('test')
  .option('alpha', '-a', { fallback: 100 })
  .option('beta', '-b', { fallback: 100 })
  .action(({ options }) => JSON.stringify(options))
```

<chat-panel>
<chat-message nickname="Alice">test -b 80</chat-message>
<chat-message nickname="Koishi">{ "alpha": 100, "beta": 80 }</chat-message>
</chat-panel>

### 选项的重载

将同一个选项注册多次，并结合使用 `value` 配置选项的重载值。如果使用了带有重载值的选项，将按照注册的重载值进行赋值。

```ts
ctx.command('test')
  .option('writer', '-w <id>')
  .option('writer', '--anonymous', { value: 0 })
  .action(({ options }) => JSON.stringify(options))
```

<chat-panel>
<chat-message nickname="Alice">test --anonymous</chat-message>
<chat-message nickname="Koishi">{ "writer": 0 }</chat-message>
</chat-panel>

### 选项的类型

选项也可以像参数一样设置类型：

```ts
ctx.command('text')
  .option('alpha', '-a <value:number>')
```

除了这种写法外，你还可以传入一个 `type` 属性，作为选项的临时类型声明。它可以是像上面的例子一样的回调函数，也可以是一个 `RegExp` 对象，表示传入的选项应当匹配的正则表达式：

```ts
ctx.command('test')
  .option('beta', '-b <value>', { type: /^ba+r$/ })
  .action(({ options }) => options.beta)
```

<chat-panel>
<chat-message nickname="Alice">test -f bar</chat-message>
<chat-message nickname="Koishi">bar</chat-message>
<chat-message nickname="Alice">test -f baaaz</chat-message>
<chat-message nickname="Koishi">选项 beta 输入无效，请检查语法。</chat-message>
</chat-panel>

## 更改触发方式

### 指令别名

你可以为一条指令添加别名：

```ts
ctx.command('echo').alias('say')
```

这样一来，无论是 `echo` 还是 `say` 都能触发这条指令了。

:::warning
由于指令名可以在用户侧配置，因此不建议开发者设置过多的别名。此外，如果用户加载的多个插件都注册了同一个指令别名，那么后一个加载的插件将直接加载失败。
:::

### 快捷匹配

Koishi 的指令机制虽然能够尽可能避免冲突和误触发，但是也带来了一些麻烦。一方面，一些常用指令的调用会受到指令前缀的限制；另一方面，一些指令可能有较长的选项和参数，但它们调用时却往往是相同的。面对这些情况，**快捷匹配 (Shortcut)** 能有效地解决你的问题。

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

## 编写帮助

之前已经介绍了 `ctx.command()` 和 `cmd.option()` 这两个方法，它们都能传入一个 `desc` 参数。你可以在这个参数的结尾补上对于指令或参数的说明文字，就像这样：

```ts
ctx.command('echo <message:text> 输出收到的信息')
  .option('timeout', '-t <seconds> 设定延迟发送的时间')
```

<chat-panel>
<chat-message nickname="Alice">echo -h</chat-message>
<chat-message nickname="Koishi">
<p>echo &lt;message></p>
<p>输出收到的信息</p>
<p>利用可能なオプション：</p>
<p class="indent-1">-t, --timeout &lt;seconds>  设定延迟发送的时间</p>
</chat-message>
</chat-panel>

### 添加使用说明

当然，我们还可以加入具体的用法和使用示例，进一步丰富这则使用说明：

```ts
ctx.command('echo <message:text>', '输出收到的信息')
  .option('timeout', '-t <seconds> 设定延迟发送的时间')
  .usage('注意：参数请写在最前面，不然会被当成 message 的一部分！')
  .example('echo -t 300 Hello World  五分钟后发送 Hello World')
```

这时再调用 `echo -h`，你便会发现使用说明中已经添加了你刚刚的补充文本：

<chat-panel>
<chat-message nickname="Alice">echo -h</chat-message>
<chat-message nickname="Koishi">
<p>echo &lt;message></p>
<p>输出收到的信息</p>
<p>注意：参数请写在最前面，不然会被当成 message 的一部分！</p>
<p>利用可能なオプション：</p>
<p class="indent-1">-t, --timeout &lt;seconds>  设定延迟发送的时间</p>
<p>例：</p>
<p class="indent-1">echo -t 300 Hello World  五分钟后发送 Hello World</p>
</chat-message>
</chat-panel>

### 隐藏指令和选项

读到这里，细心的你可能会产生一丝好奇：如果 `echo -h` 能够被解析成查看帮助的话，这个 `-h` 为什么不出现在这个帮助中呢？答案很简单，因为这个内置选项被 Koishi 隐藏起来了。如果你希望隐藏一条指令或一个选项，只需要注册时将配置项 `hidden` 设置为 `true` 即可：

```ts
// 手动导入类型
import {} from '@koishijs/plugin-help'

ctx.command('bar 一条看不见的指令', { hidden: true })
  .option('foo', '<text> 一个看不见的选项', { hidden: true })
  .action(({ options }) => 'secret: ' + options.foo)
```

<chat-panel>
<chat-message nickname="Alice">help</chat-message>
<chat-message nickname="Koishi">
<p>当前可用的指令有：</p>
<p class="indent-1">help  显示帮助信息</p>
<p>输入“帮助+指令名”查看特定指令的语法和使用示例。</p>
</chat-message>
<chat-message nickname="Alice">help bar</chat-message>
<chat-message nickname="Koishi">
<p>指令：bar</p>
<p>一条看不见的指令</p>
</chat-message>
<chat-message nickname="Alice">bar --foo 123</chat-message>
<chat-message nickname="Koishi">secret: 123</chat-message>
</chat-panel>

如果要查看隐藏的指令和选项，可以使用 `help -H`：

<chat-panel>
<chat-message nickname="Alice">help -H</chat-message>
<chat-message nickname="Koishi">
<p>当前可用的指令有：</p>
<p class="indent-1">help  显示帮助信息</p>
<p class="indent-1">bar  一条看不见的指令</p>
<p>输入“帮助+指令名”查看特定指令的语法和使用示例。</p>
</chat-message>
<chat-message nickname="Alice">help bar -H</chat-message>
<chat-message nickname="Koishi">
<p>指令：bar</p>
<p>一条看不见的指令</p>
<p>利用可能なオプション：</p>
<p class="indent-1">--foo &lt;text>  一个看不见的选项</p>
</chat-message>
</chat-panel>

## 注册子指令

在本节的最后，我们介绍一下[子指令](../../manual/usage/command.md#子指令)的注册方法：

```ts
// 层级式子指令
ctx.command('foo/bar')

// 派生式子指令
ctx.command('foo.bar')
```

是的，除了这里用到了斜杠 `/` 和小数点 `.` 来分别表示层级式和派生式子指令外，其他用法都是完全一致的。

对于已经存在的指令，你也可以使用 `cmd.subcommand()` 方法来注册子指令：

```ts
// 层级式子指令
ctx.command('foo').subcommand('bar')

// 派生式子指令
ctx.command('foo').subcommand('.bar')
```
