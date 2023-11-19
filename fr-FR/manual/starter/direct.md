---
prev:
  text: Choisir une méthode d'installation
  link: /fr-FR/manual/starter/
next:
  text: Guide
  link: /fr-FR/guide/
---

# Appellation comme une dépendance

::: warning
Ce guide suppose que vous avez une connaissance intermédiaire de [JavaScript](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript) et de [Node.js](https://nodejs.org/). Si vous débutez dans le développement JavaScript ou si vous n'êtes pas intéressé par l'écriture de code métier, veuillez [choisir une autre méthode d'installation](./index.md).
:::

::: warning
Nous vous recommandons vivement d'utiliser un projet modèle pour le développement de Koishi. Si vous n'êtes pas sûr de ce que vous faites, nous vous conseillons de lire d'abord la section sur les [projets modèles](./boilerplate.md).
:::

Bien que nous recommandions actuellement à la plupart des utilisateurs d'utiliser le [projet modèle](./boilerplate.md), si vous souhaitez intégrer Koishi dans une application complexe, l'appellation directe sera une option flexible.

## Initialisation du projet

::: tip
Koishi est lui-même écrit en TypeScript, c'est pourquoi nous vous recommandons d'utiliser TypeScript pour développer avec Koishi. Dans la documentation à suivre, nous utiliserons systématiquement TypeScript comme exemple. Si vous préférez écrire en JavaScript pur ou utiliser un autre dialecte, vous pouvez vous baser sur les exemples en TypeScript.
:::

Koishi 需要 [Node.js](https://nodejs.org/) (最低 v18，推荐使用 LTS) 运行环境，你需要自己安装它。Nous supposons que vous l'avez déjà installé.

Commencez par initialiser le répertoire de votre robot conversationnel et installer Koishi ainsi que les plugins nécessaires (nous prendrons l'exemple des plugins officiels : console, sandbox et echo) :

::: tabs code
```npm
# Initialiser le projet
npm init

# Installer Koishi et les plugins correspondants
npm i koishi @koishijs/plugin-console \
             @koishijs/plugin-sandbox \
             @koishijs/plugin-echo

# Installer TypeScript et les paquets dépendances (vous pouvez ignorer cette étape si vous ne les utilisez pas)
npm i typescript @types/node esbuild esbuild-register -D

```
```yarn
# Initialiser le projet
yarn init

# Installer Koishi et les plugins correspondants
yarn add koishi @koishijs/plugin-console \
                @koishijs/plugin-sandbox \
                @koishijs/plugin-echo

# Installer TypeScript et les paquets dépendances (vous pouvez ignorer cette étape si vous ne les utilisez pas)
yarn add typescript @types/node esbuild esbuild-register -D

```
:::

Créez un fichier d'entrée `index.ts` et ajoutez-y ce code :

```ts title=index.ts no-extra-header
import { Context } from 'koishi'
import console from '@koishijs/plugin-console'
import * as sandbox from '@koishijs/plugin-sandbox'
import * as echo from '@koishijs/plugin-echo'

// Créez une application Koishi
const ctx = new Context({
  port: 5140,
})

// Activez les plugins ci-dessus
ctx.plugin(console)     // Fournit la console
ctx.plugin(sandbox)     // Fournit un bac à sable de débogage
ctx.plugin(echo)        // Fournit la commande echo

// Démarrez l'application
ctx.start()

```

Exécutez ensuite ce fichier :

```sh
node -r esbuild-register .
```

Enfin, ouvrez un navigateur et rendez-vous sur `http://localhost:5140`. Vous y verrez le Web UI de Console Koishi. Cliquez sur l'icône "Sandbox" à gauche, puis cliquez sur "Ajouter un utilisateur" en haut de l'écran pour créer un utilisateur virtuel. Maintenant, vous pouvez interagir avec le robot :

<chat-panel>
<chat-message nickname="Alice">echo Bonjour</chat-message>
<chat-message nickname="Koishi">Bonjour</chat-message>
</chat-panel>

## Configuration du robot

Si vous souhaitez vous connecter à une véritable plateforme de chat, il vous suffit d'installer les plugins adaptateurs appropriés :

::: tabs code
```npm
# Exemple d'installation des adaptateurs Satori et Discord
npm i @koishijs/plugin-adapter-satori @koishijs/plugin-adapter-discord
```
```yarn
# Exemple d'installation des adaptateurs Satori et Discord
yarn add @koishijs/plugin-adapter-satori @koishijs/plugin-adapter-discord
```
:::

Modifiez le fichier `index.ts` que vous avez créé précédemment. Chaque fois que vous activez une instance de plugin adaptateur, une nouvelle instance de robot est créée :

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

Les plugins Koishi peuvent être obtenus sur [npm](https://www.npmjs.com). Généralement, les plugins suivent l'une des conventions de nommage suivantes :

- koishi-plugin-foo
- @koishijs/plugin-foo
- @bar/koishi-plugin-foo

Pour les plugins communautaires, l'installation et l'utilisation suivent un schéma similaire :

::: tabs code
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

De même, pour les utilisateurs de CommonJS qui souhaitent utiliser `require` pour obtenir un objet de plugin, soyez conscients de cette différence :

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
// Si le message reçu est "Sésame, ouvre-toi", répondez "Ali Baba"
ctx.on('message', (session) => {
  if (session.content === 'Sésame, ouvre-toi') {
    session.send('Ali Baba')
  }
})

```

Ensuite, redémarrez votre projet :

<chat-panel>
<chat-message nickname="Alice">Sésame, ouvre-toi</chat-message>
<chat-message nickname="Koishi">Ali Baba</chat-message>
</chat-panel>

Cependant, il n'est peut-être pas idéal, car lorsque votre application devient plus complexe, votre `index.ts` peut devenir volumineux.Vous pouvez écrire la logique ci-dessus dans un fichier distinct, par exemple `ping.ts`, et le charger en tant que plugin :

```ts title=ping.ts no-extra-header
import { Context } from 'koishi'

export const name = 'ping'

export function apply(ctx: Context) {
  // Si le message reçu est "Sésame, ouvre-toi", répondez "Ali Baba"
  ctx.on('message', (session) => {
    if (session.content === 'Sésame, ouvre-toi') {
      session.send('Ali Baba')
    }
  })
}
```

```ts title=index.ts
// Ici, ./ping est relatif à index.ts
import * as ping from './ping'

ctx.plugin(ping)
```

## À venir

Félicitations, vous avez maintenant une bonne compréhension de l'utilisation de base de Koishi ! Consultez le [Guide de développement](../../guide/) pour en savoir plus sur Koishi.
