# Multiple Configuration Maintenance

Sometimes you might want to maintain different configurations of a plugin, for example:

- Multiple plugin instances in the same time
- Switch between configurations at the certain time
- Use different configurations for different channels

Solutions can be varied for different demands, so there is no a unique answer. Fortunately, Koishi has already provided solutions for all three situations above, and you only need to choose the appropriate solution according to your needs.

## Single Instance

In the same Koishi application, some plugins can be enabled multiple times simultaneously, while others cannot—this is not a flaw in the implementation but rather the intended behavior. In fact, plugin developers can specify which features can be independently enabled. This results in two different types of plugins: those that can be enabled multiple times are called reusable plugins, while those that cannot are known as non-reusable plugins.

Typical reusable plugins are known as [adapter plugins](../usage/adapter.md).Each adapter plugin corresponds to a bot running on a specific platform, and bots on different platforms are configured using different adapter plugins. So, if you want to set up multiple bots on the same platform, you can simply add multiple adapter plugins following the method described in the previous section.

On the other hand, the vast majority of plugins are non-reusable. For these plugins, you can only have one active configuration at a time. If a configuration is already running, you'll see a message in other configurations indicating that "this plugin is running and cannot be reused." However, you can still prepare multiple configurations and switch between them by disabling one configuration and enabling another when needed.

For non-reusable plugins, if you need to switch between different configurations in different environment, you'll need configuration options with [filters](../usage/customize.md#filters) provided by plugin developers. If the such configuration doesn’t support filters, you can consider suggesting this feature to the plugin developer or use the [multi-instance](#multiple-instances) approach described below.

## Multi-Instances {#multiple-instances}

Another approach is to run multiple instances of Koishi simultaneously. The advantage of this method is that you can use entirely different plugin configurations for each instance, or even set up a completely different set of plugins.However, the trade-off is that you'll need to manage multiple instance separately, such as each one will require its own dedicated HTTP port.
