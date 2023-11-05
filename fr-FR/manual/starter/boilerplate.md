---
prev:
  text: Choisir une méthode d'installation
  link: /fr-FR/manual/starter/
next:
  text: Installation et configuration de plugins
  link: /fr-FR/manual/usage/market.html
---

# Création d'un projet modèle

::: tip
Si vous souhaitez en savoir plus sur les autres méthodes d'installation, veuillez vous référer à [Autre méthode d'installation](./index.md).
:::

En cette section nous vous introduira notre méthode de développement Koishi la plus recommandée - la création d'un projet modèle. Par rapport à la création manuelle à partir de zéro, les avantages d'un projet modèle sont les suivants :

- Une fois le projet créé, vous pouvez immédiatement profiter de toutes les fonctionnalités de la console et créer des modèles de plugins en un clic.
- Prise en charge directe de TypeScript, vous pouvez profiter des avantages de l'autocomplétion et de la vérification des types.
- Prise en charge du rechargement à chaud des plugins, vous pouvez modifier le code des plugins sans redémarrer l'application et obtenir des commentaires instantanés.
- Possibilité de développement ultérieur, vous pouvez déboguer votre propre robot en collaboration avec les plugins d'autres personnes.

Bien sûr, le projet modèle peut également être utilisé en production. Bien qu'il puisse ne pas être aussi pratique à utiliser que le lanceur Koishi, il propose plus de liberté et peut fonctionner parfaitement dans des scénarios non couverts par le lanceur Koishi.

## Installer Node.js

Koishi a besoin d'un environnement d'exécution [Node.js](https://nodejs.org/) (version minimale : 16, version LTS recommandée), que vous devez installer vous-même.

### Télécharger le package d'installation

Tout d'abord, rendez-vous sur le site officiel de [Node.js](https://nodejs.org/) :

![home](/manual/nodejs/home-dark.webp) {.dark-only}

![home](/manual/nodejs/home-light.webp) {.light-only}

Vous y verrez deux gros boutons, correspondant respectivement aux versions **LTS** et **Current**. Nous vous recommandons de choisir la version LTS plus stable. Vous pouvez cliquer sur le bouton pour télécharger le package d'installation.

Ensuite, exécutez le package d'installation téléchargé et suivez les instructions pour terminer le processus d'installation.

### Installer la gestionnaire de paquets

Node.js est publié avec un gestionnaire de paquets appelé [npm](https://www.npmjs.com/), que vous pouvez utiliser directement. Cependant, nous vous recommandons également le gestionnaire de paquets plus puissant [yarn](https://classic.yarnpkg.com/). Son installation est très simple, il vous suffit d'ouvrir une ligne de commande et de saisir la commande suivante :

```sh
# Installation de yarn
npm i -g yarn

# Vérification de la version de yarn
yarn -v
```

::: tip
Certains utilisateurs de Windows peuvent rencontrer l'erreur suivante ([référence](https://learn.microsoft.com/zh-cn/powershell/module/microsoft.powershell.core/about/about_execution_policies)) :

```text
yarn : Impossible de charger le fichier yarn.ps1, car l’exécution de scripts est désactivée sur ce système.
```

Dans ce cas, vous pouvez exécuter à nouveau le terminal en tant qu'administrateur et saisir la commande suivante :

```sh
Set-ExecutionPolicy RemoteSigned
```

Après cela, vous pourrez utiliser yarn normalement.
:::

### Configure un miroir du référentiel de packages

Si vous êtes en Chine, le téléchargement des dépendances depuis npm ou yarn peut être très lent. Par conséquent, nous vous recommandons de configurer un miroir du référentiel de packages pour accélérer le processus d'installation.

::: tabs code
```npm
npm config set registry https://registry.npmmirror.com
```
```yarn
yarn config set registry https://registry.npmmirror.com
```
:::

## Créer un projet

Ouvrez une ligne de commande et accédez au répertoire dans lequel vous souhaitez créer le projet modèle de Koishi.

::: tip
Ce répertoire ne doit pas être trop long et ne doit pas contenir d'espaces dans le chemin. 我们推荐的目录如下：

- Windows：`C:\dev` 或者 `D:\dev` (也不要直接在盘根创建项目，最好是建一层目录)
- 其他操作系统：`~/dev`
:::

输入下面的命令以创建 Koishi 项目：

::: tabs code
```npm
npm i -g create-koishi@latest
npm init koishi
```
```yarn
yarn create koishi
```
:::

跟随提示即可完成全套初始化流程。

## 启动应用

如果你顺利完成了上述操作，你的应用此时应该已经是启动状态，并弹出了控制台界面。如果你想要关闭应用，可以在命令行中按下 `Ctrl+C` 组合键。当应用处于关闭状态时，你可以在运行下面的指令以再次启动：

::: tabs code
```npm
npm start
```
```yarn
yarn start
```
:::

## 接下来……

恭喜你已经掌握了 Koishi 的基本用法！接下来：

- 如果你希望了解 Koishi 的更多功能，请前往 [安装和配置插件](../usage/market.md)
- 如果你希望立即开始你的插件开发，请前往 [开发指南](../../guide/index.md)
