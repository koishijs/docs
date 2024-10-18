# History

In August 2019, I started developing my first Node.js-based chatbot, named Shiki-chan. At that time, I explored various chatbot frameworks but couldn’t find one that truly met my needs, so I decided to build one from scratch. Initially, the bot had only a few features, but as I added more functionalities, I began to refine the underlying architecture and planned to gradually open-source it.

Before the release of v4, Koishi had a major version update approximately every eight months. It can be said that Koishi's development was entirely driven by user needs. It formed a set of best practices for chatbot development through the iterations.

## The v1 Era

Koishi v1 was released in January 2020. Although Koishi was still small in scope at this time, it already had many features that continue to this day: modular functionality implemented through a plugin system, user input handling via events and middlewares, context filtering of input events, and a command system developed through chained calls.

The only v1 official plugins that continue to v4 are `common`, `schedule`, and `teach`, while most other plugins developed during this period have been deprecated.

## The v2 Era

Koishi v2 was released in September 2020, with significant changes to the application layer design. In this major version, the application became the program’s entry point, managing required resources in a unified way. This was the first time the concept of lifecycle hooks was introduced, and the metadata objects from the v1 era evolved into session objects. These changes encapsulated many underlying interfaces, allowing plugin developers to organize business logic in a more modern structure.

The v2 era also saw rapid growth in official plugins, with many powerful plugins like `eval`, `github`, `image-search`, and `puppeteer` being developed during this era.

## The v3 Era

Koishi v3 was released in May 2021. The core change in this version was the abstraction of the Adapter / Bot concept, successfully adapting Koishi to other mainstream chat platforms like Discord and Telegram. Another notable change was the implementation of hot-reloading for plugins, which develops the web console and the plugin marketplace.

During this period, community developers contributed many interesting and useful plugins, indicating significant success in promoting the modularity of Koishi’s functionality.

## The v4 Era

Koishi v4 was released in January 2022, with significant optimizations to the underlying architecture. We introduced the concept of Service, allowing us to manage Koishi’s features in a manner similar to IoC (Inversion of Control) / DI (Dependency Injection). Additionally, we provided an ORM solution for databases, greatly improving the plugin development experience.  Furthermore, we formally established interfaces around Service, such as Assets and Cache, and provided numerous official plugin implementations.

In this version, we moved some official plugins out of `koishijs/koishi` for maintenance reasons. Even so, the number of official plugins has seen a significant increase compared to the previous major version. The ecosystem centered around the plugin marketplace is also rapidly maturing.
