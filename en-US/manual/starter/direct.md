---
prev:
  text: Installation
  link: /en-US/manual/starter/
next:
  text: Developing Guide
  link: /en-US/guide/
---

# Install as a dependency

:::warning
这篇指南假设你已了解关于 [JavaScript](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript) 和 [Node.js](https://nodejs.org/) 的中级知识。如果你刚开始学习 JavaScript 开发或者对编写业务代码不感兴趣，请 [选择其他安装方式](./index.md)。
:::

:::warning
我们强烈建议使用模板项目进行 Koishi 开发。如果你不确定自己在做什么，建议先完整阅读 [模板项目](./boilerplate.md) 章节。
:::

虽然现在我们推荐绝大部分用户使用 [模板项目](./boilerplate.md)，但如果你希望将 Koishi 嵌入更复杂的程序中，那么直接调用将会成为更具有灵活性的选择。

## Initializing Your Project

:::tip
Koishi 本身使用 TypeScript 编写，因此我们推荐你使用 TypeScript 来进行 Koishi 开发。In the following documentation, we will consistently use TypeScript as an example. If you are writing vanilla JavaScript or other JavaScript dialects, you could make modifications for your own code based on the example one.
:::

Koishi 需要 [Node.js](https://nodejs.org/) (最低 v18，推荐使用 LTS) 运行环境，你需要自己安装它。We assume that you have already installed it.

Firstly initialize your bot directory, then install Koishi and the necessary plugins (in this example, we use the official plugins such as console, sandbox, and echo):

:::tabs code

```npm
# 初始化项目
npm init

# 安装 Koishi 和相关插件
npm i koishi \
      @koishijs/plugin-console \
      @koishijs/plugin-sandbox \
      @koishijs/plugin-echo

# 安装 TypeScript 相关依赖 (如不使用可忽略此步骤)
npm i typescript @types/node esbuild esbuild-register -D
```

```yarn
# 初始化项目
yarn init

# 安装 Koishi 和相关插件
yarn add koishi
         @koishijs/plugin-console \
         @koishijs/plugin-sandbox \
         @koishijs/plugin-echo

# 安装 TypeScript 相关依赖 (如不使用可忽略此步骤)
yarn add typescript @types/node esbuild esbuild-register -D
```

:::

新建入口文件 `index.ts`，并写下这段代码：

```ts title=index.ts no-extra-header
import { Context } from 'koishi'
import console from '@koishijs/plugin-console'
import * as sandbox from '@koishijs/plugin-sandbox'
import * as echo from '@koishijs/plugin-echo'

// Create a Koishi instance
const ctx = new Context({
  port: 5140,
})

// Enable the above plugins
ctx.plugin(console)     // Provides a console
ctx.plugin(sandbox)     // Provides a debugging sandbox
ctx.plugin(echo)        // Provides an echo command

// Start the application
ctx.start()
```

Then run this file:

```sh
node -r esbuild-register .
```

最后，打开浏览器并前往 `http://localhost:5140`，你将看到一个控制台界面。Click on the "Sandbox" icon on the left and click "Add User" at the top of the screen to create a virtual user. Now you can interact with the bot:

<chat-panel>
<chat-message nickname="Alice">echo Bonjour</chat-message>
<chat-message nickname="Koishi">Bonjour</chat-message>
</chat-panel>

## Configuring Your Bot

If you want to integrate your bot with an actual chat platform, you just need to install the appropriate adapter plugins:

:::tabs code

```npm
# 以 Satori 和 Discord 适配器为例
npm i @koishijs/plugin-adapter-satori \
      @koishijs/plugin-adapter-discord
```

```yarn
# 以 Satori 和 Discord 适配器为例
yarn add @koishijs/plugin-adapter-satori \
         @koishijs/plugin-adapter-discord
```

:::

接着修改你刚刚创建的 `index.ts`。Every time you activated an adapter plugin instance, a new bot instance would be created:

```ts title=index.ts
import satori from '@koishijs/plugin-adapter-satori'
import discord from '@koishijs/plugin-adapter-discord'

// Using the Satori adapter for one bot
ctx.plugin(satori, {
  endpoint: 'http://127.0.0.1:5500',
})

// Using the Satori adapter for another bot with different communication methods
ctx.plugin(satori, {
  endpoint: 'http://127.0.0.1:5501',
})

// Using the Discord adapter for a bot
// Don't forget to install the appropriate plugins and complete the setup before using it
ctx.plugin(discord, {
  token: 'QwErTyUiOpAsDfGhJkLzXcVbNm',
})
```

## Adding More Plugins

Koishi 插件可以在 [npm](https://www.npmjs.com) 上获取。Typically, plugins follow one of these naming conventions:

- koishi-plugin-foo
- @koishijs/plugin-foo
- @bar/koishi-plugin-foo

For community plugins, you can install and load them similarly:

:::tabs code

```npm
# Using puppeteer and forward plugins as examples
npm i koishi-plugin-puppeteer koishi-plugin-forward
```

```yarn
# Using puppeteer and forward plugins as examples
yarn add koishi-plugin-puppeteer koishi-plugin-forward
```

:::

```ts title=index.ts
import puppeteer from 'koishi-plugin-puppeteer'
import * as forward from 'koishi-plugin-forward'

ctx.plugin(puppeteer)   // Provides browser service
ctx.plugin(forward)     // Provides message forwarding
```

Please note the subtle difference in importing the two plugins above. The puppeteer plugin uses default export, while the forward plugin uses a named export namespace. These two approaches are fundamentally different and cannot be mixed, so you need to determine which category each plugin falls into. Although this may cause some confusion, if you are a TypeScript user, determining which category a plugin belongs to is easy with the help of type hints.

同理，对于 commonjs 的使用者，如果要使用 `require` 来获取插件对象，也应注意到这种区别：

```ts title=index.ts
// .default is required here
ctx.plugin(require('koishi-plugin-puppeteer').default)

// .default should not be added here
ctx.plugin(require('koishi-plugin-forward'))
```

Users of other installation methods do not need to worry about this distinction, because the boilerplate handles them for you.

## Adding Interaction Logic

除了使用发布在 npm 上的插件，我们还可以添加自己的交互逻辑：

```ts title=index.ts
// 如果收到“天王盖地虎”，就回应“宝塔镇河妖”
ctx.on('message', (session) => {
  if (session.content === '天王盖地虎') {
    session.send('宝塔镇河妖')
  }
})
```

Then run your project again:

<chat-panel>
<chat-message nickname="Alice">Hello</chat-message>
<chat-message nickname="Koishi">World</chat-message>
</chat-panel>

不过这样写可能并不好，因为一旦功能变多，你的 `index.ts` 就会变得臃肿。可以将上面的逻辑写在一个单独的文件 `ping.ts` 里，并将它作为一个插件来加载：

```ts title=ping.ts no-extra-header
import { Context } from 'koishi'

export const name = 'ping'

export function apply(ctx: Context) {
  // 如果收到“天王盖地虎”，就回应“宝塔镇河妖”
  ctx.on('message', (session) => {
    if (session.content === '天王盖地虎') {
      session.send('宝塔镇河妖')
    }
  })
}
```

```ts title=index.ts
// Here the ./ping is the path to index.ts
import * as ping from './ping'

ctx.plugin(ping)
```

## What's Next...

Congratulations on mastering the basic of Koishi! 接下来让我们前往 [开发指南](../../guide/)，学习更多的 Koishi 知识。
