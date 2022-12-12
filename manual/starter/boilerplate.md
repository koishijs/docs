---
prev:
  text: 选择安装方式
  link: /manual/starter/
next:
  text: 认识控制台
  link: /manual/console/
---

# 创建模板项目

::: tip
如果想了解其他安装方式，请移步 [选择安装方式](./index.md)。
:::

本节将介绍我们最推荐的 Koishi 上手方案——创建模板项目。

## 安装 Node.js

Koishi 需要 [Node.js](https://nodejs.org/) (最低 v14，推荐使用 LTS) 运行环境，你需要自己安装它。

### 下载安装包

首先我们前往 [Node.js](https://nodejs.org/) 的官方网站：

![home](/manual/nodejs/home-dark.webp) {.dark-only}

![home](/manual/nodejs/home-light.webp) {.light-only}

在这里可以看到两个巨大的按钮，分别对应着 **LTS (长期维护版)** 和 **Current (最新版本)**。我们建议你选择更加稳定的 LTS 版本，点击按钮即可下载安装包。

随后，运行下载好的安装包，根据提示完成整个安装流程即可。

### 安装包管理器

Node.js 自带名为 [npm](https://www.npmjs.com/) 的包管理器，你可以直接使用它。我们同时也推荐功能更强大的 [yarn](https://classic.yarnpkg.com/) 作为包管理器。它的安装非常简单：

```sh
# 安装 yarn
npm i -g yarn

# 查看版本
yarn -v
```

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

我们提供了两种创建模板项目的方法。你可以使用其中的任意一种。

### 使用包管理器创建

在任意目录启动命令行，输入下面的指令：

::: tabs code
```npm
npm init koishi
```
```yarn
yarn create koishi
```
:::

跟随提示即可完成全套初始化流程。

:::: tip
由于国内可能无法访问 GitHub，你可能需要科学上网或使用镜像。例如你可以使用 [FastGit](http://fastgit.org/) 作为镜像源，只需在上面的脚本后添加 `-m https://hub.fastgit.xyz` 即可。
::::

### 从模板仓库创建

访问模板仓库需要你有一个 [GitHub](https://github.com/) 账号。我们假设你已经处于登录状态。

1. 点击 [这里](https://github.com/koishijs/boilerplate/generate) 以创建此仓库的副本。
    <br>注意：创建副本不同于 fork，它生成的新仓库不会包含当前仓库的提交历史。
2. 将你创建的项目 clone 到本地，并在本地目录启动命令行。
3. 输入 `npm install` / `yarn` 安装依赖。
4. 输入 `npm start` / `yarn start` 开始运行。

::: warning pnpm 用户看这里！
Koishi 不支持 pnpm 默认的 isolated linker。如果你确实想使用 pnpm，请在安装依赖前运行如下命令：

```sh
echo node-linker=hoisted > .npmrc
```
:::

## 启动应用

如果你顺利完成了上述操作，你的应用此时应该已经是启动状态，你无需进行额外的操作。当应用处于关闭状态时，你可以在运行下面的指令以再次启动：

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

- 如果你希望学习使用 Koishi 控制台，请前往 [认识控制台](../console/)
- 如果你希望立即开始你的插件开发，请前往 [进阶教程](../advanced/config.md)
