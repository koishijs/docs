# Multiple Configuration Maintenance

Sometimes you might want to maintain different configurations of a plugin, for example:

- Multiple plugin instances in the same time
- Switch between configurations at the certain time
- Use different configurations for different channels

Solutions can be varied for different demands, so there is no a unique answer. Fortunately, Koishi has already provided solutions for all three situations above, and you only need to choose the appropriate solution according to your needs.

## Single Instance

In the same Koishi application, some plugins can be enabled multiple times simultaneously, while others cannot—this is not a flaw in the implementation but rather the intended behavior. In fact, plugin developers can specify which features can be independently enabled. This results in two different types of plugins: those that can be enabled multiple times are called reusable plugins, while those that cannot are known as non-reusable plugins.

Typical reusable plugins are known as [adapter plugins](../usage/adapter.md).Each adapter corresponds to a running bot, and bots on different platforms are configured by different adapters. So, if you want to configure multiple bots on the same platform, just follow the method in previous section to add multiple adapter plugins.

At the same time, the vast majority of plugins are not reusable. For such plugins, you can only have one running configuration at a time. If there's already a running configuration, you'll see a line prompting "This plugin is already running and cannot be reused" in other configurations. Of course, you can still prepare multiple configurations, then disable one configuration and enable another at the right time.

对于那些不可重用的插件，如果希望在不同的场景下切换到不同的配置，就需要插件作者提供带有 [过滤器](../usage/customize.md#filters) 的配置项。如果你想要修改的配置不支持过滤器，那么你可以考虑向插件作者提出建议，或采用下面介绍的 [多实例](#multiple-instances) 方案。

## 多实例 {#multiple-instances}

Another option is to run multiple Koishi instances at the same time. Doing so makes it possible to use completely different plugin configurations in different instances, or even enable completely different combinations of plugins. But, by contrast, you need to maintain multiple instances and each requires a separate port.
