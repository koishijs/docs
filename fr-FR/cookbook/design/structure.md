# 项目架构

::: danger
本文档正在编写中，内容可能不完整或者不准确。
:::

大家在编写 Koishi 插件的时候想必都会从 Koishi 导入各种东西。然而，Koishi 也并不是单一的包，而是拆分为了多个仓库和模块进行开发的。我们熟悉的 `Command`, `Context`, `Session` 和 `Schema` 就来自于不同的包中。而为了简化插件开发流程并提高可靠性，Koishi 将这些包统一重新导出，这才有了我们熟悉的 Koishi 框架。

下面就让我们用一张图介绍 Koishi 的底层架构吧。

::: warning
这里应该有一张架构图但是还没有画。
:::

在上图中，我们可以看到 Koishi 的核心架构分为三层：Cordis，Satori 和 Koishi：

- Cordis 是一个现代化的组合式框架。其核心理念是可逆化和插件化。
- Satori 是一个跨平台的聊天协议及其对应的 SDK 实现。
- Koishi 是一个基于 Cordis 和 Satori 的聊天机器人框架。

除此以外，还有一系列外围的工具包，为 Koishi 提供了各种内置服务和实用功能。
