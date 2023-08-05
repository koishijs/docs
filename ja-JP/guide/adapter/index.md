# 基本示例

::: tip
在学习本章之前，建议先完整阅读 [入门 > 跨平台](../../manual/usage/platform.md)。
:::

Koishi 通过适配器插件来实现对不同聊天平台的支持。

一方面，适配器插件需要接收来自聊天平台的消息，并将其转换为 Koishi 的标准格式并触发会话事件；另一方面，对于来自 Koishi 内部的请求，适配器也需要将其转换为聊天平台的格式并发送出去。我们可以简单地将这两个过程概括成「接收」和「发送」。

在 Koishi 中，尽管适配器要处理的逻辑随着平台的不同而变化，但本质上所有适配器的结构都是类似的：通过实现 `Bot` 类完成发送的功能，而通过实现 `Adapter` 类完成接收的功能。让我们先来看一个最简单的例子。

## REPL 适配器

下面展示的插件是 REPL 适配器，它可以接收来自命令行的消息，并把 Koishi 的回复同样输出到命令行中。你可以在 [这个仓库](https://github.com/koishijs/koishi-plugin-adapter-repl) 查看它的源码。

> REPL 的意思是 Read-Eval-Print-Loop (读取-求值-输出-循环)，是一种交互式环境。

REPL 适配器有三个文件。首先来看入口文件 `index.ts`，它什么事都没做：

```ts title=index.ts
import ReplBot from './bot'
export default ReplBot
```

接下来是 `bot.ts`。我们可以看到它实现了 `sendMessage` 方法，用来发送消息：

```ts title=bot.ts
import { Bot, Context, h, Schema } from 'koishi'
import { EOL } from 'os'
import ReplAdapter from './adapter'

export interface Config {}
export const Config: Schema<Config> = Schema.object({})

export default class ReplBot extends Bot {
  constructor(ctx: Context, config: Config) {
    super(ctx, config)
    ctx.plugin(ReplAdapter, this)
  }

  async sendMessage(channelId: string, content: h.Fragment) {
    process.stdout.write(h('', content).toString(true))
    process.stdout.write(EOL)
    return []
  }
}
```

最后是 `adapter.ts`，它创建了一个 [readline](https://nodejs.org/dist/latest-v20.x/docs/api/readline.html) 接口，用于接收消息并生成会话：

```ts title=adapter.ts
import { Adapter, Context } from 'koishi'
import { createInterface } from 'readline'
import ReplBot from './bot'

export default class ReplAdapter extends Adapter.Server<ReplBot> {
  rl = createInterface({
    input: process.stdin,
  })

  async start(bot: ReplBot) {
    this.rl.on('line', (line) => {
      const session = bot.session({
        type: 'message',
        isDirect: true,
        platform: 'repl',
        userId: 'repl',
        channelId: 'repl',
        content: line,
      })
      bot.dispatch(session)
    })
  }

  async stop(bot: ReplBot) {
    this.rl.close()
  }
}
```

真实的聊天平台当然会比命令行交互复杂得多，但你仍然可以使用相同的结构来实现它们。在接下来的几节中，我们会进一步介绍适配器插件的更多设计细节。让我们开始吧。

## 适配器也是插件

等下，上面的代码的确实现了一个适配器，但它是一个插件吗？

答案是肯定的。这个插件的入口文件是 `index.ts`，默认导出了 `ReplBot`。而 `ReplBot` 的构造函数接受两个参数 `ctx` 和 `config`，这与插件的 [类形式](../plugin/index.md) 是一致的。这意味着，一个 `ReplBot` 类本身就是一个可以安装的插件！

与此同时，`Bot` 基类中也声明了它是一个 [可重用](../plugin/lifecycle.md#可重用插件) 的插件，因此多次加载此插件将会创建多个独立的 `ReplBot` 实例。适配器插件是最常见的可重用插件。
