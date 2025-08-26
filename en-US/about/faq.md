# Frequently Asked Questions

## Who Maintains Koishi?

Koishi is an open-source project founded by Shigma. The first official version was released in January 2020. Today, Koishi is maintained by its core team, with Shigma as the main lead. For more information, please refer to [Team Members](./team.md).

## Who Uses Koishi?

People who interact with Koishi generally fall into three roles:

- **Developers:** Those who actually write Koishi plugins.
- **Deployers:** Those who use Koishi to set up bots.
- **Users:** Those who interact with Koishi bots.

Currently, the Koishi plugin marketplace features over 1,000 plugins, maintained by more than 500 developers. On GitHub, Koishi has over 3,000 stars. In various official discussion channels, there are thousands of active deployers. Many of these deployers manage bots that serve tens of thousands of active users.

## Is Koishi Lightweight?

Thanks to its modular design achieved through the Cordis architecture, Koishi is incredibly lightweight. The core module of Koishi is less than [350 KB](https://bundlephobia.com/package/@koishijs/core) in size, and a complete project, including the package manager, is only around [10 MB](https://github.com/koishijs/boilerplate/releases). In the future, we plan to introduce new plugin loading mechanisms, which will further optimize Koishi's size.

## Can Koishi Handle Large-Scale Projects?

Yes, it can. Most of Koishi's features are provided through [services](../guide/plugin/service.md), meaning you can easily replace lightweight services with more specialized implementations as needed. For example, although the template project uses SQLite as the default database, you can switch to other databases like MongoDB, MySQL, or PostgreSQL at any time.

Additionally, the Koishi's extensive documentation (over 150,000 words) and a robust toolchain for plugin development significantly lower the learning curve for new developers and ensures a smooth development experience even as your application scales.
