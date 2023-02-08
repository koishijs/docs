---
prev:
  text: 选择安装方式
  link: /manual/starter/
next:
  text: 指南
  link: /guide/
---

# 作为依赖调用

::: warning
这篇指南假设你已了解关于 [JavaScript](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript) 和 [Node.js](https://nodejs.org/) 的中级知识。如果你刚开始学习 JavaScript 开发或者对编写业务代码不感兴趣，请 [选择其他安装方式](./index.md)。
:::

::: tip
Koishi 本身使用 TypeScript 编写，因此我们推荐你使用 TypeScript 来进行 Koishi 开发。在接下来的文档中，我们将统一使用 TypeScript 作为示例代码。如果你想编写原生 JavaScript 或使用其他方言，可以在示例代码的基础上自行修改。
:::

虽然现在我们推荐绝大部分用户使用模板项目，但如果你希望将 Koishi 嵌入更复杂的程序中，那么直接调用将会成为更具有灵活性的选择。

## 初始化项目

::: tip
Koishi 需要 Node.js (最低 v14，推荐使用 LTS) 运行环境，你需要自己安装它。
:::

首先初始化你的机器人目录并安装 Koishi 和所需的插件 (这里以官方插件 console, sandbox 和 echo 为例)：

::: tabs code
```npm
# 初始化项目
npm init

# 安装 Koishi 和相关插件
npm i koishi @koishijs/plugin-console @koishijs/plugin-sandbox @koishijs/plugin-echo

# 安装 TypeScript 相关依赖 (如不使用可忽略此步骤)
npm i typescript @types/node esbuild esbuild-register -D
```
```yarn
# 初始化项目
yarn init

# 安装 Koishi 和相关插件
yarn add koishi @koishijs/plugin-console @koishijs/plugin-sandbox @koishijs/plugin-echo

# 安装 TypeScript 相关依赖 (如不使用可忽略此步骤)
yarn add typescript @types/node esbuild esbuild-register -D
```
:::

新建入口文件 `index.ts`，并写下这段代码：

```ts title=index.ts no-extra-header
import { Context } from 'koishi'

// 创建一个 Koishi 应用
const ctx = new Context({
  port: 5140,
})

// 启用上述插件
ctx.plugin('console')
ctx.plugin('sandbox')
ctx.plugin('echo')

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
# 以 OneBot 和 Discord 适配器为例
npm i @koishijs/plugin-adapter-onebot @koishijs/plugin-adapter-discord
```
```yarn
# 以 OneBot 和 Discord 适配器为例
yarn add @koishijs/plugin-adapter-onebot @koishijs/plugin-adapter-discord
```
:::

接着修改你刚刚创建的 `index.ts`。每个机器人相当于启用一个插件：

```ts title=index.ts
// 使用 OneBot 适配器的机器人
ctx.plugin('adapter-onebot', {
  protocol: 'ws',
  selfId: '123456789',
  endpoint: 'ws://127.0.0.1:6700',
})

// 使用 OneBot 适配器的另一个机器人，可以有不同的通信方式
ctx.plugin('adapter-onebot', {
  protocol: 'http',
  selfId: '987654321',
  endpoint: 'http://127.0.0.1:5700',
})

// 使用 Discord 适配器的机器人
// 别忘了在使用之前，先安装相应的插件和完成准备工作
ctx.plugin('adapter-discord', {
  token: 'QwErTyUiOpAsDfGhJkLzXcVbNm',
})
```

## 添加更多插件

Koishi 插件可以在 [npm](https://www.npmjs.com/) 上获取。要下载的包名与实际书写的插件短名并不完全一样，遵循以下的规则：

| npm 包名 | 插件名 |
|:-----:|:-----:|
| koishi-plugin-**foo** | foo |
| @koishijs/plugin-**foo** | foo |
| **@bar**/koishi-plugin-**foo** | @bar/foo |

简单来说就是，从 npm 包名中删去 `koishi-plugin-` 和 `@koishijs/plugin-` 两种前缀，剩下的部分就是你要书写的插件名。这样既保证了用户书写简便，又防止了发布的插件污染命名空间。

`ctx.plugin()` 也支持传入完整的插件对象，这种写法尽管长了一些，但是对于 TypeScript 用户会有更好的类型支持：

```ts title=index.ts
import onebot from '@koishijs/plugin-adapter-onebot'
import * as echo from '@koishijs/plugin-echo'

ctx.plugin(onebot, {
  protocol: 'ws',
  selfId: '123456789',
  endpoint: 'ws://127.0.0.1:6700',
})

ctx.plugin(echo)
```

请注意到上面的两个插件的导入方式的微妙差异。onebot 插件使用了默认导出，而 echo 插件使用了导出的命名空间。这两种写法存在本质的区别，不能混用。虽然这可能产生一些困扰，但对 TypeScript 用户来说，只需注意到写代码时的类型提示就足以确定自己应该采用的写法。

同理，对于 commonjs 的使用者，如果要使用 `require` 来获取插件对象，也应注意到这种区别：

```ts title=index.ts
// 这里的 .default 是不可省略的
ctx.plugin(require('@koishijs/plugin-adapter-onebot').default, {
  protocol: 'ws',
  selfId: '123456789',
  endpoint: 'ws://127.0.0.1:6700',
})

// 这里则不能写上 .default
ctx.plugin(require('@koishijs/plugin-echo'))
```

为了避免混淆，我们建议 commonjs 的使用者直接使用插件的短名安装插件。

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

<!-- ## 配置数据库

数据库是机器人开发的常见需求，许多插件本身也要求你安装数据库。在 Koishi 这里，数据库支持也可以通过插件来安装。这里以 MySQL 为例。首先安装所需的依赖：

::: tabs code
```npm
npm i @koishijs/plugin-database-mysql
```
```yarn
yarn add @koishijs/plugin-database-mysql
```
:::

然后继续修改你的代码，在应用中配置 MySQL 数据库插件：

```ts title=index.ts
ctx.plugin('database-mysql', {
  host: '[your-host]',
  port: 3306,
  user: 'root',
  password: '[your-password]',
  database: '[your-database]',
})
```

这样就大功告成了。得益于 Koishi 的内置 ORM，如果一个插件需要数据库支持，那么它只需要编写通用代码。无论你使用的是 MySQL 还是 MongoDB，Koishi 都能使其正常运行。 -->

## 接下来……

恭喜你已经掌握了 Koishi 的基本用法！接下来让我们前往 [指南](../../guide/)，学习更多的 Koishi 知识。
