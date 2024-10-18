---
prev:
  text: Installation
  link: /fr-FR/manual/starter/
next:
  text: Guide
  link: /fr-FR/guide/
---

# Appellation comme une dépendance

:::warning
这篇指南假设你已了解关于 [JavaScript](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript) 和 [Node.js](https://nodejs.org/) 的中级知识。如果你刚开始学习 JavaScript 开发或者对编写业务代码不感兴趣，请 [选择其他安装方式](./index.md)。
:::

:::warning
我们强烈建议使用模板项目进行 Koishi 开发。如果你不确定自己在做什么，建议先完整阅读 [模板项目](./boilerplate.md) 章节。
:::

虽然现在我们推荐绝大部分用户使用 [模板项目](./boilerplate.md)，但如果你希望将 Koishi 嵌入更复杂的程序中，那么直接调用将会成为更具有灵活性的选择。

## Initialisation du projet

:::tip
Koishi 本身使用 TypeScript 编写，因此我们推荐你使用 TypeScript 来进行 Koishi 开发。Dans la documentation à suivre, nous utiliserons systématiquement TypeScript comme exemple. Si vous préférez écrire en JavaScript pur ou utiliser un autre dialecte, vous pouvez vous baser sur les exemples en TypeScript.
:::

Koishi 需要 [Node.js](https://nodejs.org/) (最低 v18，推荐使用 LTS) 运行环境，你需要自己安装它。Nous supposons que vous l'avez déjà installé.

Commencez par initialiser le répertoire de votre robot conversationnel et installer Koishi ainsi que les plugins nécessaires (nous prendrons l'exemple des plugins officiels : console, sandbox et echo) :

:::tabs code

```npm
# 初始化项目
npm init

# 安装 Koishi 和相关插件
npm i koishi \
      @koishijs/plugin-server \
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
         @koishijs/plugin-server \
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
import server from '@koishijs/plugin-server'
import console from '@koishijs/plugin-console'
import * as sandbox from '@koishijs/plugin-sandbox'
import * as echo from '@koishijs/plugin-echo'

// 创建一个 Koishi 应用
const ctx = new Context()

// 启用上述插件
ctx.plugin(server, {
  port: 5140,
})                      // 提供后端服务
ctx.plugin(console)     // 提供控制台
ctx.plugin(sandbox)     // 提供调试沙盒
ctx.plugin(echo)        // 提供回声指令
```

Exécutez ensuite ce fichier :

```sh
node -r esbuild-register .
```

最后，打开浏览器并前往 `http://localhost:5140`，你将看到一个控制台界面。Cliquez sur l'icône "Sandbox" à gauche, puis cliquez sur "Ajouter un utilisateur" en haut de l'écran pour créer un utilisateur virtuel. Maintenant, vous pouvez interagir avec le robot :

<chat-panel>
<chat-message nickname="Alice">echo Bonjour</chat-message>
<chat-message nickname="Koishi">Bonjour</chat-message>
</chat-panel>

## Configuration du robot

Si vous souhaitez vous connecter à une véritable plateforme de chat, il vous suffit d'installer les plugins adaptateurs appropriés :

:::tabs code

```npm
# Exemple d'installation des adaptateurs Satori et Discord
npm i @koishijs/plugin-adapter-satori \
      @koishijs/plugin-adapter-discord
```

```yarn
# Exemple d'installation des adaptateurs Satori et Discord
yarn add @koishijs/plugin-adapter-satori \
         @koishijs/plugin-adapter-discord
```

:::

接着修改你刚刚创建的 `index.ts`。Chaque fois que vous activez une instance de plugin adaptateur, une nouvelle instance de robot est créée :

```ts title=index.ts
import satori from '@koishijs/plugin-adapter-satori'
import discord from '@koishijs/plugin-adapter-discord'

// Utilisation d'un robot avec l'adaptateur Satori
ctx.plugin(satori, {
  endpoint: 'http://127.0.0.1:5500',
})

// Utilisation d'un autre robot avec l'adaptateur Satori, pouvant utiliser un mode de communication différent
ctx.plugin(satori, {
  endpoint: 'http://127.0.0.1:5501',
})

// Utilisation d'un robot avec l'adaptateur Discord
// N'oubliez pas d'installer les plugins appropriés et de terminer la configuration avant utilisation
ctx.plugin(discord, {
  token: 'QwErTyUiOpAsDfGhJkLzXcVbNm',
})
```

## Ajout de plugins supplémentaires

Koishi 插件可以在 [npm](https://www.npmjs.com) 上获取。Généralement, les plugins suivent l'une des conventions de nommage suivantes :

- koishi-plugin-foo
- @koishijs/plugin-foo
- @bar/koishi-plugin-foo

Pour les plugins communautaires, l'installation et l'utilisation suivent un schéma similaire :

:::tabs code

```npm
# Exemple d'installation des plugins puppeteer et forward
npm i koishi-plugin-puppeteer koishi-plugin-forward
```

```yarn
# Exemple d'installation des plugins puppeteer et forward
yarn add koishi-plugin-puppeteer koishi-plugin-forward
```

:::

```ts title=index.ts
import puppeteer from 'koishi-plugin-puppeteer'
import * as forward from 'koishi-plugin-forward'

ctx.plugin(puppeteer)   // Service de navigateur
ctx.plugin(forward)     // Transfert de messages
```

Veuillez noter la subtile différence dans la manière d'importer les deux plugins ci-dessus. Le plugin puppeteer utilise l'exportation par défaut, tandis que le plugin forward utilise un espace de noms d'exportation. Ces deux méthodes ont des différences fondamentales et ne peuvent pas être mélangées, il vous appartient de déterminer lequel de ces cas s'applique à chaque plugin. Bien que cela puisse être déroutant, les utilisateurs de TypeScript bénéficieront d'une assistance aux types pour déterminer facilement le cas de chaque plugin.

同理，对于 commonjs 的使用者，如果要使用 `require` 来获取插件对象，也应注意到这种区别：

```ts title=index.ts
// N'oubliez pas de spécifier .default ici
ctx.plugin(require('koishi-plugin-puppeteer').default)

// Vous ne devez pas spécifier .default ici
ctx.plugin(require('koishi-plugin-forward'))
```

Les utilisateurs d'autres méthodes d'installation n'ont pas besoin de se soucier de ces détails, car les projets modèles gèrent ces aspects pour vous.

## Ajout de la logique d'interaction

En plus d'utiliser des plugins existants depuis npm, vous pouvez également écrire votre propre logique d'interaction :

```ts title=index.ts
// 如果收到“天王盖地虎”，就回应“宝塔镇河妖”
ctx.on('message', (session) => {
  if (session.content === '天王盖地虎') {
    session.send('宝塔镇河妖')
  }
})
```

Ensuite, redémarrez votre projet :

<chat-panel>
<chat-message nickname="Alice">Sésame, ouvre-toi</chat-message>
<chat-message nickname="Koishi">Ali Baba</chat-message>
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
// Ici, ./ping est relatif à index.ts
import * as ping from './ping'

ctx.plugin(ping)
```

## Quelle est l'étape suivante ?

Félicitations, vous avez maintenant une bonne compréhension de l'utilisation de base de Koishi ! 接下来让我们前往 [开发指南](../../guide/)，学习更多的 Koishi 知识。
