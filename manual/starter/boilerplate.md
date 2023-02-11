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

<!--@include: ../../snippets/install-node.md-->

## 创建项目

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

- 如果你希望学习使用 Koishi 控制台，请前往 [认识控制台](../console/index.md)
- 如果你希望立即开始你的插件开发，请前往 [开发教程](../../guide/index.md)
