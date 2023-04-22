---
prev:
  text: Choose Installation Method
  link: /en-US/manual/starter/
next:
  text: About Koishi Console
  link: /en-US/manual/console/
---

# Create Template Project

::: tip
If you want to learn about other installation method, please visit [Choose Installation Method](./index.md).
:::

In this section, we will talk about creating a template project, which is strongly recommended for developing Koishi. Comparing to build up a project from scratch, there are advantages with the template:

- One-key Template Project. Create a project with full console experience and plugin templates with just one key
- Fully TypeScript support. Enjoy the benefits of code hints and type checks.
- Plugins Hot Reload. Get immediately feedback while changing plugin code without restarting the app.
- Support Secondary Development. You could connect your own bot and others' plugins for debugging.

Of course, you could also use the template project in production. While it might be not convenient in operation, it would be more configurable than launchers. Template project could also be easily launched in case that launchers wouldn't work.

## Install Node.js

Koishi requires [Node.js](https://nodejs.org/) (minimum v14, LTS is recommended) as the runtime environment. You should install it manually.

### Download Installer

Firstly, we should go to the official website of [Node.js](https://nodejs.org/):

![home](/manual/nodejs/home-dark.webp) {.dark-only}

![home](/manual/nodejs/home-light.webp) {.light-only}

So we see here are two green buttons, which are **LTS (Long-term Support version)** and **Current (the Latest version)**. The stable LTS version is recommended. Click the button to download the installer.

Then, launch the installer you just downloaded, complete the installation process.

### NPM

[NPM](https://www.npmjs.com/) is the built-in package manager of Node.js, you could use it directly. We also recommend the powerful [Yarn](https://classic.yarnpkg.com/) as the package manager. It is very simple to install Yarn, just enter the following command into command line.

```sh
# install yarn
npm i -g yarn

# check yarn version
yarn -v
```

### Configure Registry Mirror

If you live in Chinese mainland, it might be very slow when you download dependencies from npm or yarn. Therefore, it is recommended to configure a registry mirror to speed up the installation process.

::: tabs code
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
The working directory path should not be absurdly long, also it is recommended to use a path that contains ASCII characters only. For example:

- Windows: `C:\dev` or `D:\dev`
- Other operating systems: `~/dev`
:::

Enter the following command to create Koishi template project:

::: tabs code
```npm
npm i -g create-koishi@latest
npm init koishi
```
```yarn
yarn create koishi
```
:::

Follow the prompts and finalize the initialization process.

## Launch the Application

If you have successfully finalized the operations above, your application should be already launched, the Koishi Console Web UI should be also opened. If you want to terminate the application, you could press `Ctrl + C` combination keys. When your application is terminated, you could enter the following command to launch it again:

::: tabs code
```npm
npm start
```
```yarn
yarn start
```
:::

## What's Next

Congratulations that you have learnt the basic of Koishi! What's next:

- If you want to learn to the Koishi Console, please visit [About Koishi Console](../console/index.md)
- If you want to develop your own plugin, please visit [Developing Guide](../../guide/index.md).
