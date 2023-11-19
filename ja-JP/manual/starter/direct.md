---
prev:
  text: インストール方法
  link: /ja-JP/manual/starter/
next:
  text: 指南
  link: /ja-JP/guide/
---

# 作为依赖调用

::: warning
这篇指南假设你已了解关于 [JavaScript](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript) 和 [Node.js](https://nodejs.org/) 的中级知识。如果你刚开始学习 JavaScript 开发或者对编写业务代码不感兴趣，请 [选择其他安装方式](./index.md)。
:::

::: warning
我们强烈建议使用模板项目进行 Koishi 开发。如果你不确定自己在做什么，建议先完整阅读 [模板项目](./boilerplate.md) 章节。
:::

虽然现在我们推荐绝大部分用户使用 [模板项目](./boilerplate.md)，但如果你希望将 Koishi 嵌入更复杂的程序中，那么直接调用将会成为更具有灵活性的选择。

## 初始化项目

::: tip
Koishi 本身使用 TypeScript 编写，因此我们推荐你使用 TypeScript 来进行 Koishi 开发。在接下来的文档中，我们将统一使用 TypeScript 作为示例代码。如果你想编写原生 JavaScript 或使用其他方言，可以在示例代码的基础上自行修改。
:::

Koishi 需要 [Node.js](https://nodejs.org/) (最低 v16，推荐使用 LTS) 运行环境，你需要自己安装它。这里我们假定你已经安装完成了。

首先初始化你的机器人目录并安装 Koishi 和所需的插件 (这里以官方插件 console, sandbox 和 echo 为例)：

::: tabs code
```npm
# 初始化项目
npm init

# 安装 Koishi 和相关插件
npm i koishi @koishijs/plugin-console \
             @koishijs/plugin-sandbox \
             @koishijs/plugin-echo

# 安装 TypeScript 相关依赖 (如不使用可忽略此步骤)
npm i typescript @types/node esbuild esbuild-register -D
```
```yarn
# 初始化项目
yarn init

# 安装 Koishi 和相关插件
yarn add koishi @koishijs/plugin-console \
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

// 创建一个 Koishi 应用
const ctx = new Context({
  port: 5140,
})

// 启用上述插件
ctx.plugin(console)     // 提供控制台
ctx.plugin(sandbox)     // 提供调试沙盒
ctx.plugin(echo)        // 提供回声指令

// 启动应用
ctx.start()
```

接着运行这个文件：

```sh
node -r esbuild-register .
```

最后，打开浏览器并前往 `http://localhost:5140`，你将看到一个控制台界面。在左侧点击进入「沙盒」页面，并点击屏幕上方的「添加用户」来创建一个模拟用户。现在你已经可以与机器人对话了：

<chat-panel>
<chat-message nickname="Alice">echo 你好</chat-message>
<chat-message nickname="Koishi">你好</chat-message>
</chat-panel>

## 配置机器人

如果你想要接入真实聊天平台，那么你只需要安装适配插件即可：

::: tabs code
```npm
# 以 Satori 和 Discord 适配器为例
npm i @koishijs/plugin-adapter-satori @koishijs/plugin-adapter-discord
```
```yarn
# 以 Satori 和 Discord 适配器为例
yarn add @koishijs/plugin-adapter-satori @koishijs/plugin-adapter-discord
```
:::

接着修改你刚刚创建的 `index.ts`。每个机器人相当于启用一个插件：

```ts title=index.ts
import satori from '@koishijs/plugin-adapter-satori'
import discord from '@koishijs/plugin-adapter-discord'

// 使用 Satori 适配器的机器人
ctx.plugin(satori, {
  endpoint: 'http://127.0.0.1:5500',
})

// 使用 Satori 适配器的另一个机器人，可以有不同的通信方式
ctx.plugin(satori, {
  endpoint: 'http://127.0.0.1:5501',
})

// 使用 Discord 适配器的机器人
// 别忘了在使用之前，先安装相应的插件和完成准备工作
ctx.plugin(discord, {
  token: 'QwErTyUiOpAsDfGhJkLzXcVbNm',
})
```

## 添加更多插件

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

## 次のステップ……

おめでとうございます！Koishi の基本的な使い方をマスターしましたね。接下来让我们前往 [开发指南](../../guide/)，学习更多的 Koishi 知识。
