---
prev:
  text: Installation
  link: /fr-FR/manual/starter/
next:
  text: Installation et configuration de plugins
  link: /fr-FR/manual/usage/market.html
---

# Création d'un projet modèle

:::tip
如果想了解其他安装方式，请移步 [选择安装方式](./index.md)。
:::

En cette section nous vous introduira notre méthode de développement Koishi la plus recommandée - la création d'un projet modèle. Par rapport à la création manuelle à partir de zéro, les avantages d'un projet modèle sont les suivants :

- Une fois le projet créé, vous pouvez immédiatement profiter de toutes les fonctionnalités de la console et créer des modèles de plugins en un clic.
- Prise en charge directe de TypeScript, vous pouvez profiter des avantages de l'autocomplétion et de la vérification des types.
- Prise en charge du rechargement à chaud des plugins, vous pouvez modifier le code des plugins sans redémarrer l'application et obtenir des commentaires instantanés.
- Possibilité de développement ultérieur, vous pouvez déboguer votre propre robot en collaboration avec les plugins d'autres personnes.

Bien sûr, le projet modèle peut également être utilisé en production.Bien qu'il puisse ne pas être aussi pratique à utiliser que le lanceur Koishi, il propose plus de liberté et peut fonctionner parfaitement dans des scénarios non couverts par le lanceur Koishi.

## Installer Node.js

Koishi 需要 [Node.js](https://nodejs.org/) (最低 v18，推荐使用 LTS) 运行环境，你需要自己安装它。

### Télécharger le package d'installation

首先我们前往 [Node.js](https://nodejs.org/) 的官方网站：

![home](/manual/nodejs/home-dark.webp) {.dark-only}

![home](/manual/nodejs/home-light.webp) {.light-only}

在这里可以看到两个巨大的按钮，分别对应着 **LTS (长期维护版)** 和 **Current (最新版本)**。Nous vous recommandons de choisir la version LTS plus stable. Vous pouvez cliquer sur le bouton pour télécharger le package d'installation.

Ensuite, exécutez le package d'installation téléchargé et suivez les instructions pour terminer le processus d'installation.

### Installer la gestionnaire de paquets

Node.js 自带名为 [npm](https://www.npmjs.com/) 的包管理器，你可以直接使用它。我们同时也推荐功能更强大的 [yarn](https://classic.yarnpkg.com/) 作为包管理器。Son installation est très simple, il vous suffit d'ouvrir une ligne de commande et de saisir la commande suivante :

```sh
# Installation de yarn
npm i -g yarn

# Vérification de la version de yarn
yarn -v
```

::: tip
部分 Windows 用户可能会发现以下错误 ([参考链接](https://learn.microsoft.com/zh-cn/powershell/module/microsoft.powershell.core/about/about_execution_policies))：

```text
yarn : Impossible de charger le fichier yarn.ps1, car l'exécution de scripts est désactivée sur ce système.
```

Dans ce cas, vous pouvez exécuter à nouveau le terminal en tant qu'administrateur et saisir la commande suivante :

```sh
Set-ExecutionPolicy RemoteSigned
```

Après cela, vous pourrez utiliser yarn normalement.
:::

### Configure un miroir du référentiel de packages

Si vous êtes en Chine, le téléchargement des dépendances depuis npm ou yarn peut être très lent. Par conséquent, nous vous recommandons de configurer un miroir du référentiel de packages pour accélérer le processus d'installation.

:::tabs code

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
这个路径不宜过长，且应当避免出现中文或者空格。我们推荐的路径如下：

- Windows：`C:\dev` 或者 `D:\dev` (也不要直接在盘根创建项目，最好是建一层目录)
- 其他操作系统：`~/dev`
  :::

Saisissez la commande suivante pour créer le projet modèle de Koishi :

:::tabs code

```npm
npm init koishi@latest
```

```yarn
yarn create koishi
```

:::

Suivez les instructions pour terminer le processus d'initialisation.

## Démarre l'application Koishi

Si vous avez suivi avec succès les étapes ci-dessus, votre application devrait déjà être en cours d'exécution et la console Koishi devrait s'afficher. 如果你想要关闭应用，可以在命令行中按下 `Ctrl+C` 组合键。Lorsque l'application est arrêtée, vous pouvez exécuter la commande suivante pour la redémarrer :

:::tabs code

```npm
npm start
```

```yarn
yarn start
```

:::

## Quelle est l'étape suivante ?

Félicitations, vous avez maintenant une bonne compréhension de l'utilisation de base de Koishi ! Voici ce que vous pouvez faire ensuite :

- 如果你希望了解 Koishi 的更多功能，请前往 [安装和配置插件](../usage/market.md)
- 如果你希望立即开始你的插件开发，请前往 [开发指南](../../guide/index.md)
