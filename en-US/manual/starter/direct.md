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
This guide assumes that you know about secondary knowledge of [JavaScript](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript) and [Node.js](https://nodejs.org/). If you just started learning JavaScript development recently, or are not interested in coding, please [Choose Other Installation Methods](./index.md).
:::

::: warning
It is strongly recommended to use template project for developing Koishi. If you are not sure what you are doing, it is recommended to read [Template Project](./boilerplate.md) first.
:::

While it is recommended to use the [boilerplate project](./boilerplate.md) for most users, it would be more flexible when you directly embed Koishi as a dependency for your complicated application.

## Initialize Your Project

::: tip
Koishi is written with TypeScript, so TypeScript would be the first class programming language when you are developing Koishi. In the following section of documents, we will use TypeScript as example language. If you are writing vanilla JavaScript or other JavaScript dialects, you could modify your own code based on the example code.
:::

Koishi requires [Node.js](https://nodejs.org/) (at least v16, suggested to use LTS versions) Runtime, you need to install it.Here we suppose you have it installed already.

Initialize a directly as your bot, install Koishi and common plugins, here we would install several official plugins as example: console, sandbox and echo.

::: tabs code
```npm
# Initialize project
npm init

# Install Koishi and plugins
npm i koishi @koishijs/plugin-console \
             @koishijs/plugin-sandbox \
             @koishijs/plugin-echo

# Install TypeScript and related packages (skip this if you don't use TypeScript)
npm i typescript @types/node esbuild esbuild-register -D
```
```yarn
# Initialize project
yarn init

# Install Koishi and plugins
yarn add koishi @koishijs/plugin-console \
                @koishijs/plugin-sandbox \
                @koishijs/plugin-echo

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

Then modify the `index.ts` you just created. Every time you activated an adapter plugin instance, a new bot instance would be created:

```ts title=index.ts
import onebot from '@koishijs/plugin-adapter-onebot'
import discord from '@koishijs/plugin-adapter-discord'

// Apply the OneBot adapter to create a bot instance
ctx.plugin(onebot, {
  protocol: 'ws',
  selfId: '123456789',
  endpoint: 'ws://127.0.0.1:6700',
})

// Apply the OneBot adapter to create another bot instance
ctx.plugin(onebot, {
  protocol: 'http',
  selfId: '987654321',
  endpoint: 'http://127.0.0.1:5700',
})

// Apply the Discord adapter to create a bot instance
// You should install the corresponding plugins and complete the preparing process
ctx.plugin(discord, {
  token: 'QwErTyUiOpAsDfGhJkLzXcVbNm',
})
```

## Add More Plugins

Koishi plugins could be installed from [npm](https://www.npmjs.com). Normally the name of Koishi plugins should follow the patterns described below:

- koishi-plugin-foo
- @koishijs/plugin-foo
- @bar/koishi-plugin-foo

As for community plugins, you could install and apply in a similar way:

::: tabs code
```npm
# As the example, install puppeteer and forward plugins
npm i koishi-plugin-puppeteer koishi-plugin-forward
```
```yarn
# As the example, install puppeteer and forward plugins
yarn add koishi-plugin-puppeteer koishi-plugin-forward
```
:::

```ts title=index.ts
import puppeteer from 'koishi-plugin-puppeteer'
import * as forward from 'koishi-plugin-forward'

ctx.plugin(puppeteer)   // browser-related service
ctx.plugin(forward)     // message forwarding
```

Please note the delicate differences in the import methods of the two plugins above.puppeteer plugin uses default export, but forward plugin uses export namespace.These two methods are fundamentally different and cannot be intermingled, so you will need to decide for yourself which situation is for each plugin.While this may cause some trouble, if you are a TypeScript user, it is easy to judge with the help of typographical tips.

Similarly, for the users of CommonJS, if you want to use `require` to get plugin objects, you should also note this difference:

```ts title=index.ts
// Here's .default is untraceable
ctx.plugin(require('koishi-plugin-puppeteer').default)

// This cannot be written .default
ctx.plugin(require('koishi-plugin-forward'))
```

Users using other installation methods do not need to be interested in these details because the template project has already helped you to process them.

## Apply Interaction

In addition to plugins already packaged, we can add our own interactive logic:

```ts title=index.ts
// Reply with "world", after receiving "Hello"
  ctx.on('message', (session) => {
    if (session.content === 'Hello') {
      session.send('world')
    }
  })
```

Then restart your project:

<chat-panel>
<chat-message nickname="Alice">Hello</chat-message>
<chat-message nickname="Koishi">world</chat-message>
</chat-panel>

But this is not recommended because your `index.ts` becomes too large once more features.You can write the above logic in a separate file `ping.ts` and load it as a plugin:

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
