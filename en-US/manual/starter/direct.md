---
prev:
  text: Installation
  link: /en-US/manual/starter/
next:
  text: Developing Guide
  link: /en-US/guide/
---

# Use as a Dependency

::: warning
This guide assumes that you know about secondary knowledge of [JavaScript](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript) and [Node.js](https://nodejs.org/). If you just started learning JavaScript development recently, or are not interested in coding, please [Choose Other Installation Methods](./index.md).
:::

::: warning
It is strongly recommended to use template project for developing Koishi. If you are not sure what you are doing, it is recommended to read [Template Project](./boilerplate.md) first.
:::

虽然现在我们推荐绝大部分用户使用 [模板项目](./boilerplate.md)，但如果你希望将 Koishi 嵌入更复杂的程序中，那么直接调用将会成为更具有灵活性的选择。

## Initialize Your Project

::: tip
Koishi is written with TypeScript, so TypeScript would be the first class programming language when you are developing Koishi. In the following section of documents, we will use TypeScript as example language. If you are writing vanilla JavaScript or other JavaScript dialects, you could modify your own code based on the example code.
:::

Koishi requires [Node.js](https://nodejs.org/) (minimum v14, LTS is recommended) as the runtime environment. You should install it manually.Here we suppose you have it installed already.

Initialize a directly as your bot, install Koishi and common plugins, here we would install several official plugins as example: console, sandbox and echo.

::: tabs code
```npm
# Initialize project
npm init

# Install Koishi and plugins
npm i koishi @koishijs/plugin-console @koishijs/plugin-sandbox @koishijs/plugin-echo

# Install TypeScript and related packages (skip this if you don't use TypeScript)
npm i typescript @types/node esbuild esbuild-register -D
```
```yarn
# Initialize project
yarn init

# Install Koishi and plugins
yarn add koishi @koishijs/plugin-console @koishijs/plugin-sandbox @koishijs/plugin-echo

# Install TypeScript and related packages (skip this if you don't use TypeScript)
yarn add typescript @types/node esbuild esbuild-register -D
```
:::

Create an entry file `index.ts` and write down the code below:

```ts title=index.ts no-extra-header
import { Context } from 'koishi'
import console from '@koishijs/plugin-console'
import * as sandbox from '@koishijs/plugin-sandbox'
import * as echo from '@koishijs/plugin-echo'

// Create a new Koishi application
const ctx = new Context({
  port: 5140,
})

// Install plugins
ctx.plugin(console)     // Koishi Console
ctx.plugin(sandbox)     // Sandbox for debugging
ctx.plugin(echo)        // Echo command

// Launch the Koishi application
ctx.start()
```

Then launch this file:

```sh
node -r esbuild-register .
```

Finally, open your browser and enter `http://localhost:5140`, you will see the Console Web UI. Click the "Sandbox" icon on the left side, then click "Add User" button to create a simulated user. Now you can talk to the bot:

<chat-panel>
<chat-message nickname="Alice">echo Bonjour</chat-message>
<chat-message nickname="Koishi">Bonjour</chat-message>
</chat-panel>

## Configure the Bot

If you want to connect the bot to a real chat platform, what you need to do is to install an adapter plugin:

::: tabs code
```npm
# Install the OneBot and Discord adapter as the example
npm i @koishijs/plugin-adapter-onebot @koishijs/plugin-adapter-discord
```
```yarn
# Install the OneBot and Discord adapter as the example
yarn add @koishijs/plugin-adapter-onebot @koishijs/plugin-adapter-discord
```
:::

Then modify the `index.ts` you just created. 每个机器人相当于启用一个插件：

```ts title=index.ts
import onebot from '@koishijs/plugin-adapter-onebot'
import discord from '@koishijs/plugin-adapter-discord'

// 使用 OneBot 适配器的机器人
ctx.plugin(onebot, {
  protocol: 'ws',
  selfId: '123456789',
  endpoint: 'ws://127.0.0.1:6700',
})

// 使用 OneBot 适配器的另一个机器人，可以有不同的通信方式
ctx.plugin(onebot, {
  protocol: 'http',
  selfId: '987654321',
  endpoint: 'http://127.0.0.1:5700',
})

// 使用 Discord 适配器的机器人
// 别忘了在使用之前，先安装相应的插件和完成准备工作
ctx.plugin(discord, {
  token: 'QwErTyUiOpAsDfGhJkLzXcVbNm',
})
```

## Add More Plugins

Koishi 插件可以在 [npm](https://www.npmjs.com) 上获取。通常插件会遵循下面的名称：

- koishi-plugin-foo
- @koishijs/plugin-foo
- @bar/koishi-plugin-foo

对于社区插件，使用类似的方式安装和加载：

::: tabs code
```npm
# 以 puppeteer 和 forward 插件为例
npm i koishi-plugin-puppeteer koishi-plugin-forward
```
```yarn
# 以 puppeteer 和 forward 插件为例
yarn add koishi-plugin-puppeteer koishi-plugin-forward
```
:::

```ts title=index.ts
import puppeteer from 'koishi-plugin-puppeteer'
import * as forward from 'koishi-plugin-forward'

ctx.plugin(puppeteer)   // 浏览器服务
ctx.plugin(forward)     // 消息转发
```

请注意到上面的两个插件的导入方式的微妙差异。puppeteer 插件使用了默认导出，而 forward 插件使用了导出的命名空间。这两种写法存在本质的区别，不能混用，因此你需要自行判断每个插件属于哪一种情况。虽然这可能产生一些困扰，但如果你是 TypeScript 用户，在类型提示的帮助下，判断一个插件属于哪一种情况是很轻松的。

同理，对于 commonjs 的使用者，如果要使用 `require` 来获取插件对象，也应注意到这种区别：

```ts title=index.ts
// 这里的 .default 是不可省略的
ctx.plugin(require('koishi-plugin-puppeteer').default)

// 这里则不能写上 .default
ctx.plugin(require('koishi-plugin-forward'))
```

使用其他安装方式的用户不需要关心这些细节，因为模板项目已经帮你处理好了。

## 添加交互逻辑

除了已经封装好的插件外，我们还可以添加自己的交互逻辑：

```ts title=index.ts
// 如果收到“天王盖地虎”，就回应“宝塔镇河妖”
ctx.on('message', (session) => {
  if (session.content === '天王盖地虎') {
    session.send('宝塔镇河妖')
  }
})
```

然后重新运行你的项目：

<chat-panel>
<chat-message nickname="Alice">天王盖地虎</chat-message>
<chat-message nickname="Koishi">宝塔镇河妖</chat-message>
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
// 这里的 ./ping 是相对于 index.ts 的路径
import * as ping from './ping'

ctx.plugin(ping)
```

## What's next...

Congratulations that you have learnt the basic of Koishi! 接下来让我们前往 [开发指南](../../guide/)，学习更多的 Koishi 知识。
