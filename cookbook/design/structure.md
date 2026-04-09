---
url: /cookbook/design/structure.md
---
# 项目架构

::: danger
本文档正在编写中，内容可能不完整或者不准确。
:::

大家在编写 Koishi 插件的时候想必都会从 Koishi 导入各种东西。然而，Koishi 也并不是单一的包，而是拆分为了多个仓库和模块进行开发的。我们熟悉的 `Command`, `Context`, `Session` 和 `Schema` 就来自于不同的包中。而为了简化插件开发流程并提高可靠性，Koishi 将这些包统一重新导出，这才有了我们熟悉的 Koishi 框架。

下面就让我们用一张图介绍 Koishi 的底层架构吧。

::: warning
这里应该有一张架构图但是还没有画。
:::
