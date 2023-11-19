---
prev:
  text: Installation
  link: /en-US/manual/starter/
next:
  text: Developing Guide
  link: /en-US/guide/
---

# Install as a dependency

::: warning
This guide assumes that you already have intermediate knowledge of [JavaScript](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript) and [Node.js](https://nodejs.org/). If you are just starting to learn JavaScript or not interested in writing business code, please [Choose Other Installation Methods](./index.md).
:::

::: warning
We strongly recommend using a template project for Koishi development. If you are unsure about what you are doing, it is advisable to read the [Template Project](./boilerplate.md) section thoroughly.
:::

While we recommend the use of the [boilerplate](./boilerplate.md) for most users, it would be a more flexible choice if you directly embed Koishi as the dependency for your complex application.

## Initializing Your Project

::: tip
The Koishi itself is written in TypeScript, so we recommend using TypeScript for Koishi development. In the following documentation, we will consistently use TypeScript as an example. If you are writing vanilla JavaScript or other JavaScript dialects, you could make modifications for your own code based on the example one.
:::

Koishi 需要 [Node.js](https://nodejs.org/) (最低 v18，推荐使用 LTS) 运行环境，你需要自己安装它。We assume that you have already installed it.

Firstly initialize your bot directory, then install Koishi and the necessary plugins (in this example, we use the official plugins such as console, sandbox, and echo):

::: tabs code
```npm
# Initialize the project
npm init

# Install Koishi and related plugins
npm i koishi @koishijs/plugin-console \
             @koishijs/plugin-sandbox \
             @koishijs/plugin-echo

# Install TypeScript and related packages (skip this step if you using TypeScript)
npm i typescript @types/node esbuild esbuild-register -D
```
```yarn
# Initialize the project
yarn init

# Install Koishi and related plugins
yarn add koishi @koishijs/plugin-console \
                @koishijs/plugin-sandbox \
                @koishijs/plugin-echo

# Install TypeScript and related packages (skip this step if not using TypeScript)
yarn add typescript @types/node esbuild esbuild-register -D
```
:::

Create a new entry file `index.ts` and write the following code:

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

Finally, open your browser and go to `http://localhost:5140`. You will see the Koishi Console WebUI. Click on the "Sandbox" icon on the left and click "Add User" at the top of the screen to create a virtual user. Now you can interact with the bot:

<chat-panel>
<chat-message nickname="Alice">echo Bonjour</chat-message>
<chat-message nickname="Koishi">Bonjour</chat-message>
</chat-panel>

## Configuring Your Bot

If you want to integrate your bot with an actual chat platform, you just need to install the appropriate adapter plugins:

::: tabs code
```npm
# Using Satori and Discord adapters as examples
npm i @koishijs/plugin-adapter-satori @koishijs/plugin-adapter-discord
```
```yarn
# Using Satori and Discord adapters as examples
yarn add @koishijs/plugin-adapter-satori @koishijs/plugin-adapter-discord
```
:::

Then modify the `index.ts` file you created earlier. Every time you activated an adapter plugin instance, a new bot instance would be created:

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

Koishi plugins could be obtained from [npm](https://www.npmjs.com). Typically, plugins follow one of these naming conventions:

- koishi-plugin-foo
- @koishijs/plugin-foo
- @bar/koishi-plugin-foo

For community plugins, you can install and load them similarly:

::: tabs code
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

Likewise, for CommonJS users who want to use `require` to get the plugin object, you should also pay attention to this distinction:

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
// Reply with "world", after receiving "Hello"
  ctx.on('message', (session) => {
    if (session.content === 'Hello') {
      session.send('world')
    }
  })
```

Then run your project again:

<chat-panel>
<chat-message nickname="Alice">Hello</chat-message>
<chat-message nickname="Koishi">world</chat-message>
</chat-panel>

However, this may be worse because as your features grow, your `index.ts` file will become cumbersome. You can write the above logic in a separate file such as `ping.ts`, and then load it as a plugin:

```ts title=ping.ts no-extra-header
import { Context } from 'koishi'

export const name = 'ping'

export function apply(ctx: Context) {
  // Reply with "world", after receiving "Hello"
  ctx.on('message', (session) => {
    if (session.content === 'Hello') {
      session.send('world')
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

Congratulations on mastering the basic of Koishi! Next, let's go to [developing guide](../../guide/) to learn more about Koishi.
