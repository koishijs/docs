---
prev:
  text: Installation
  link: /en-US/manual/starter/
next:
  text: Install and Configure Plugins
  link: /en-US/manual/usage/market.html
---

# Create from Template

:::tip
如果想了解其他安装方式，请移步 [选择安装方式](./index.md)。
:::

In this section, we will talk about creating a template project, which is strongly recommended for developing Koishi. Comparing to build up a project from scratch, there are advantages with the template:

- Template One-click Creation. Create a project with full console experience and plugin templates with only one click
- Fully TypeScript support. Enjoy the benefits of code hints and type checks.
- Plugins Hot Reload. Get immediately feedback while changing plugin code without restarting the app.
- Support Secondary Development. You could connect your own bot and others' plugins for debugging.

Of course, you could also use the template project in production. While it might be not convenient in operation, it would be more configurable than launchers. Template project could also be easily launched in case that launchers wouldn't work.

## Install Node.js

Koishi 需要 [Node.js](https://nodejs.org/) (最低 v18，推荐使用 LTS) 运行环境，你需要自己安装它。

### Download Installer

首先我们前往 [Node.js](https://nodejs.org/) 的官方网站：

![home](/manual/nodejs/home-dark.webp) {.dark-only}

![home](/manual/nodejs/home-light.webp) {.light-only}

在这里可以看到两个巨大的按钮，分别对应着 **LTS (长期维护版)** 和 **Current (最新版本)**。The stable LTS version is recommended. Click the button to download the installer.

Then, launch the installer you just downloaded, complete the installation process.

### NPM

Node.js 自带名为 [npm](https://www.npmjs.com/) 的包管理器，你可以直接使用它。我们同时也推荐功能更强大的 [yarn](https://classic.yarnpkg.com/) 作为包管理器。It is very simple to install Yarn, just enter the following command into command line.

```sh
# install yarn
npm i -g yarn

# check yarn version
yarn -v
```

::: tip
部分 Windows 用户可能会发现以下错误 ([参考链接](https://learn.microsoft.com/zh-cn/powershell/module/microsoft.powershell.core/about/about_execution_policies))：

```text
yarn: File yarn.ps1 cannot be loaded because running scripts is disabled on this system.
```

Now start a (PowerShell) terminal with elevated permission (as Administrator), run the command below:

```sh
Set-ExecutionPolicy RemoteSigned
```

Then you can use Yarn normally.
:::

### Configure Registry Mirror

If you live in Chinese mainland, it might be very slow when you download dependencies from npm or yarn. Therefore, it is recommended to configure a registry mirror to speed up the installation process.

:::tabs code

```npm
npm config set registry https://registry.npmmirror.com
```

```yarn
yarn config set registry https://registry.npmmirror.com
```

:::

## Create a Project

Open a command line, cd to the directory that you want to create a Koishi template project.

::: tip
这个路径不宜过长，且应当避免出现中文或者空格。我们推荐的路径如下：

- Windows：`C:\dev` 或者 `D:\dev` (也不要直接在盘根创建项目，最好是建一层目录)
- 其他操作系统：`~/dev`
  :::

Enter the following command to create Koishi template project:

:::tabs code

```npm
npm init koishi@latest
```

```yarn
yarn create koishi
```

:::

Follow the prompts and finalize the initialization process.

## Launch the Application

If you have successfully finalized the operations above, your application should be already launched, the Koishi Console Web UI should be also opened. 如果你想要关闭应用，可以在命令行中按下 `Ctrl+C` 组合键。When your application is terminated, you could enter the following command to launch it again:

:::tabs code

```npm
npm start
```

```yarn
yarn start
```

:::

## What's Next...

Congratulations on mastering the basic of Koishi! Moving forward:

- 如果你希望了解 Koishi 的更多功能，请前往 [安装和配置插件](../usage/market.md)
- 如果你希望立即开始你的插件开发，请前往 [开发指南](../../guide/index.md)
