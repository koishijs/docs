# 常见问题

## 谁在维护 Koishi？

Koishi 是一个由 Shigma 创立的开源项目。它于 2020 年 1 月发布了第一个正式版本。如今，Koishi 由其核心团队维护，并由 Shigma 担任主要负责人。更多信息请参阅 [团队成员](./team.md)。

## 谁在使用 Koishi？

接触 Koishi 的人按照场景可以大致分为三种角色：

- 开发者：他们实际编写了 Koishi 插件
- 搭建者：他们使用 Koishi 搭建了机器人
- 使用者：他们与 Koishi 机器人进行交互

目前，在 Koishi 的插件市场中能看到超过 1000 个插件，这些插件由超过 500 位开发者维护。在 GitHub 上，Koishi 有超过 3000 个星标。在官方提供的各种讨论频道中，有着数千位活跃的搭建者。其中许多搭建者仅一个机器人就能覆盖数万活跃用户。

## Koishi 体积小吗？

Koishi 通过 Cordis 架构实现了模块化的设计，因此它的体积非常小。Koishi 的核心体积不到 [350 KB](https://bundlephobia.com/package/@koishijs/core)，而一个完整的项目连同包管理器的体积也仅仅在 [10 MB](https://github.com/koishijs/boilerplate/releases) 左右。未来，我们还会引入新的插件加载机制，这将近一步优化 Koishi 的体积。

## Koishi 能胜任大型项目吗？

可以。Koishi 中的绝大多数功能都通过 [服务](../guide/plugin/service.md) 的形式提供，这意味着你随时可以将一些轻量级服务替换为更专业的实现。例如，尽管模板项目中使用 SQLite 作为数据库，但你可以随时将其替换为 MongoDB, MySQL, PostgreSQL 等专业数据库。

此外，Koishi 为插件开发提供了全面的文档 (超过 15 万字) 和工具链支持，这将显著降低新手开发者的入门和学习成本，并确保开发体验在应用规模增长的过程中依旧保持丝滑。
