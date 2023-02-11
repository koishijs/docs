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

本节将介绍我们最推荐的 Koishi 开发方案——创建模板项目。相比其他方案，模板项目的优势在于：

- 支持直接加载 TypeScript，你可以尽情享受代码提示和类型检查带来的便利
- 支持插件热重载，你可以在不重启应用的情况下修改插件代码，并获得即时的反馈
- 支持二次开发，你可以将你自己的机器人与其他人的插件进行联合调试

## 安装 Node.js

<!--@include: ../../.snippets/install-node.md-->

## 创建项目

<!--@include: ../../.snippets/scaffold.md-->

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

- 如果你希望学习使用 Koishi 控制台，请前往 [认识控制台](../console/index.md)
- 如果你希望立即开始你的插件开发，请前往 [开发教程](../../guide/index.md)
