# Multiple Configuration Maintenance

Sometimes you might want to maintain different configurations of a plugin, for example:

- Multiple plugin instances in the same time
- Switch between configurations at the certain time
- Use different configurations for different channels

Solutions can be varied for different demands, so there is no a unique answer. Fortunately, Koishi has already provided solutions for all three situations above, and you only need to choose the appropriate solution according to your needs.

## Single Instance

In each Koishi application, some plugins can be enabled multiple instances, others can't. It is not the defects of the plugin, but the expected behavior.In fact, the author of the plugin can specify which features can be enabled independently.This is reflected in two different types of plugins: those that can enable multiple configurations at the same time are called reusable plugins and instead are non-reusable plugins.

Typical reusable plugins are [Adapter Plugins](../usage/adapter.md).Each adapter corresponds to a running bot, and bots on different platforms are configured by different adapters. So, if you want to configure multiple bots on the same platform, just follow the method in previous section to add multiple adapter plugins.

At the same time, the vast majority of plugins are not reusable. For such plugins, you can only have one running configuration at a time. If there's already a running configuration, you'll see a line prompting "This plugin is already running and cannot be reused" in other configurations. Of course, you can still prepare multiple configurations, then disable one configuration and enable another at the right time.

For those plugins that are not reusable, if you want to switch to different configurations in different cases, plugin authors are required to provide configurations with [filters](../usage/customize.md#过滤器).If the configuration you want to modify does not support filters, then you may consider making suggestions to the plugin author, or using [multiple instances](#多实例) described below.

## Multiple Instances

Another option is to run multiple Koishi instances at the same time. Doing so makes it possible to use completely different plugin configurations in different instances, or even enable completely different combinations of plugins. But, by contrast, you need to maintain multiple instances and each requires a separate port.
