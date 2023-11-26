---
prev:
  text: 选择安装方式
  link: /zh-CN/manual/starter/
next:
  text: 安装和配置插件
  link: /zh-CN/manual/usage/market.html
---

# 创建模板项目

::: tip
如果想了解其他安装方式，请移步 [选择安装方式](./index.md)。
:::

本节将介绍我们最推荐的 Koishi 开发方案——创建模板项目。相比直接从零搭建，模板项目的优势在于：

- 创建完成即是拥有带完整控制台体验的项目，一键创建各种模板插件
- 支持直接加载 TypeScript，你可以尽情享受代码提示和类型检查带来的便利
- 支持插件热重载，你可以在不重启应用的情况下修改插件代码，并获得即时的反馈
- 支持二次开发，你可以将你自己的机器人与其他人的插件进行联合调试

当然，模板项目也可以直接用于生产。虽然在操作上可能不如启动器方便，但它提供了更多的自由度，并能在启动器所覆盖不到的场景下顺利运行。

## 安装 Node.js

Koishi 需要 [Node.js](https://nodejs.org/) (最低 v18，推荐使用 LTS) 运行环境，你需要自己安装它。

### 下载安装包

首先我们前往 [Node.js](https://nodejs.org/) 的官方网站：

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
这个路径不宜过长，且应当避免出现中文或者空格。我们推荐的路径如下：

- Windows：`C:\dev` 或者 `D:\dev` (也不要直接在盘根创建项目，最好是建一层目录)
- 其他操作系统：`~/dev`
:::

输入下面的命令以创建 Koishi 项目：

::: tabs code
```npm
npm init koishi@latest
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
