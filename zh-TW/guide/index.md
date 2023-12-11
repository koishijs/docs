# 开发指南

## 如何阅读本指南

:::tip
本篇指南旨在向有一定 Node.js 开发基础的人介绍 Koishi 的全部知识。如果你只想快速搭建自己的机器人而非学习 Koishi 开发，请前往 [起步](../manual/starter/) 了解更多安装方式。
:::

Koishi 是一个强大的机器人框架，因此有大量的内容可供学习。不过请不用担心，我们为学习者提供了一部循序渐进的教程，帮助你从最基础的概念出发，逐步掌握关于 Koishi 的一切——运行原理、开发方式和最佳实践。

本篇指南分为了多个章节，每个章节通常围绕一个主题展开。由于许多章节之间存在一定的依赖关系，因此我们建议你按照目录中的顺序阅读本篇指南。当然，每个章节也不必全部读完，你完全可以先产生大致的印象，并在后续的使用中随时回来了解更多的细节。

### 与入门教程的关系

:::tip
前往 → [入门教程](../manual/introduction.md)
:::

要想更好地开发 Koishi 插件，我们应当首先了解 Koishi 的功能本身。因此，开发指南中的部分章节会基于入门教程中的前置知识。如果你是第一次接触 Koishi，那么我们推荐你先阅读入门教程，再回到这里学习。就算没有读完入门教程也不必担心：我们会在章节的开头提供相关链接，让你可以快速地了解前置知识。

### 与进阶指南的关系

:::tip
前往 → [进阶指南](../cookbook/index.md)
:::

本篇指南会系统地介绍 Koishi 开发的核心用法，而关于 Koishi 的设计原理和最佳实践则会在进阶指南中进行补充。如果你已经阅读完本篇指南，或是在实际开发中无所适从，相信进阶指南会给你带来更多的帮助。

## 预备知识

Koishi 是一个 Node.js 框架，因此我们假定你已经拥有了一定的 JavaScript 和 Node.js 开发基础。如果你对自己的基础不自信，可以参考下面的两篇教程：

- [JavaScript 语言概览](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Language_Overview)
- [现代 JavaScript 教程](https://zh.javascript.info/)

### 关于 TypeScript

TypeScript 是 JavaScript 的超集，前者在后者的基础上额外提供了强大的类型系统，可以让你的代码更加健壮，开发也更加快捷。Koishi 本身就是用 TypeScript 编写的，因此我们推荐你使用 TypeScript 来进行 Koishi 开发。如果你对 TypeScript 不熟悉，这里有一篇 [TypeScript 教程](https://www.typescriptlang.org/zh/docs/handbook/typescript-in-5-minutes.html)。

本篇指南中的所有代码示例都使用了 TypeScript。这对于插件开发者来说这并不是必需的。如果你不想用 TypeScript 来开发插件，你可以自行忽略那些类型标注，并使用原生 JavaScript 或其他方言来编写代码。

## 让我们开始吧！

继续向下滚动，你将在每一页的底部看到前往下一节的链接。
