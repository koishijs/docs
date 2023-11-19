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

Koishi 需要 [Node.js](https://nodejs.org/) (最低 v18，推荐使用 LTS) 运行环境，你需要自己安装它。

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
这个路径不宜过长，且应当避免出现中文或者空格。我们推荐的路径如下：

- Pour Windows : `C:\dev` ou `D:\dev` (n'installez pas le projet directement à la racine du lecteur, créez plutôt un sous-répertoire)
- Pour d'autres systèmes d'exploitation : `~/dev`
:::

Saisissez la commande suivante pour créer le projet modèle de Koishi :

::: tabs code
```npm
npm i -g create-koishi@latest
npm init koishi
```
```yarn
yarn create koishi
```
:::

Suivez les instructions pour terminer le processus d'initialisation.

## Démarre l'application Koishi

Si vous avez suivi avec succès les étapes ci-dessus, votre application devrait déjà être en cours d'exécution et la console Koishi devrait s'afficher. Si vous souhaitez arrêter l'application, vous pouvez appuyer sur la combinaison de touches `Ctrl+C` dans la ligne de commande. Lorsque l'application est arrêtée, vous pouvez exécuter la commande suivante pour la redémarrer :

::: tabs code
```npm
npm start
```
```yarn
yarn start
```
:::

## À venir

Félicitations, vous avez maintenant une bonne compréhension de l'utilisation de base de Koishi ! Voici ce que vous pouvez faire ensuite :

- Si vous souhaitez en savoir plus sur les fonctionnalités de Koishi, rendez-vous sur [Installation et configuration de plugins](../usage/market.md).
- Si vous souhaitez commencer immédiatement à développer vos propres plugins, consultez le [Guide de développement](../../guide/index.md).
