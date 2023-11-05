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

在这里可以看到两个巨大的按钮，分别对应着 **LTS (长期维护版)** 和 **Current (最新版本)**。我们建议你选择更加稳定的 LTS 版本，点击按钮即可下载安装包。

随后，运行下载好的安装包，根据提示完成整个安装流程即可。

### 安装包管理器

Node.js 自带名为 [npm](https://www.npmjs.com/) 的包管理器，你可以直接使用它。我们同时也推荐功能更强大的 [yarn](https://classic.yarnpkg.com/) 作为包管理器。它的安装非常简单，只需打开命令行输入下面的命令：

```sh
# 安装 yarn
npm i -g yarn

# 查看版本
yarn -v
```

::: tip
部分 Windows 用户可能会发现以下错误 ([参考链接](https://learn.microsoft.com/zh-cn/powershell/module/microsoft.powershell.core/about/about_execution_policies))：

```text
yarn：无法加载文件 yarn.ps1，因为在此系统上禁止运行脚本。
```

此时请以管理员身份重新运行终端，并输入下面的命令：

```sh
Set-ExecutionPolicy RemoteSigned
```

之后就可以正常使用 yarn 了。
:::

### 配置镜像源

如果你是国内用户，从 npm 或 yarn 上下载依赖可能非常慢。因此，我们推荐你配置一下镜像源，以提升安装速度。

::: tabs code
```npm
npm config set registry https://registry.npmmirror.com
```
```yarn
yarn config set registry https://registry.npmmirror.com
```
:::

## 创建项目

打开命令行，并进入你想要创建 Koishi 项目的目录。

::: tip
这个目录不宜过长，且路径中请避免出现中文或者空格。我们推荐的目录如下：

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
