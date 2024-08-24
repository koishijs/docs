# History

In August 2019, I started developing my first Node.js-based chatbot, named Shiki-chan. At that time, I explored various chatbot frameworks but couldn’t find one that truly met my needs, so I decided to build one from scratch. Initially, the bot had only a few features, but as I added more functionalities, I began to refine the underlying architecture and planned to gradually open-source it.

Before the release of v4, Koishi had a major version update approximately every eight months. It can be said that Koishi's development was entirely driven by user needs. It formed a set of best practices for chatbot development through the iterations.

## The v1 Era

Koishi v1 was released in January 2020. Although Koishi was still small in scope at this time, it already had many features that continue to this day: modular functionality implemented through a plugin system, user input handling via events and middlewares, context filtering of input events, and a command system developed through chained calls.

The only v1 official plugins that continue to v4 are `common`, `schedule`, and `teach`, while most other plugins developed during this period have been deprecated.

## The v2 Era

Koishi v2 was released in September 2020, with significant changes to the application layer design. 在这个大版本中，应用作为程序的入口对所需的资源统一管理，第一次有了生命周期钩子的概念，也将 v1 时期的元信息对象进化为了会话对象。这些改动将许多底层的接口进行了封装，允许插件开发者通过更为现代化的方式组织业务逻辑。

v2 时期也是官方插件发展迅猛的时期，许多功能强大的插件如 eval, github, image-search 和 puppeteer 等都是在这个阶段被开发出来的。

## v3 时期

Koishi v3 发布于 2021 年 5 月。这个版本最核心的变化是我们抽象出了 Adapter / Bot 的概念，并成功将 Koishi 适配到 Discord 和 Telegram 等其他主流聊天平台中。另一个值得一提的改动则是我们实现了插件的热重载，并由此催生了网页控制台和插件市场的发展。

在此期间社区开发者贡献了大量或有趣或实用的插件，也意味着 Koishi 在功能模块化的推行上取得了令人满意的成效。

## v4 时期

Koishi v4 发布于 2022 年 1 月，在底层架构中进行了大幅优化。我们引入了 Service 的概念，这将使我们得以通过类似于 IoC / DI 的方式管理 Koishi 的各项功能。同时对于数据库，我们也提供了一个 ORM 解决方案，这大幅优化了插件的开发体验。此外，我们正式围绕 Service 确立了 Assets 和 Cache 等接口，并提供了许多官方插件实现。我们引入了 Service 的概念，这将使我们得以通过类似于 IoC / DI 的方式管理 Koishi 的各项功能。同时对于数据库，我们也提供了一个 ORM 解决方案，这大幅优化了插件的开发体验。此外，我们正式围绕 Service 确立了 Assets 和 Cache 等接口，并提供了许多官方插件实现。

在这个版本中，我们出于维护性的考虑将一些官方插件移出了 koishijs/koishi。即便如此，官方插件的数量也较上一个大版本有了一个激增。以插件市场为核心的生态也正在被快速完善起来。
