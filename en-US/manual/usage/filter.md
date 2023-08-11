# Filters

Many times, we hope that certain features can only be used for certain group or private chats.Using permission management means introducing a database, and a lighter approach is to directly affect the plugin's functional diagram through**filters**.

## Plugin Filters

::: tip
A few plugins are unrelated to chat platforms, such as console and database plugins.These plugins therefore have no filter settings.
:::

Most of the plugins provide filter settings at the top of the plugin details page.Click the 'Add Condition' button to create a filter condition.Can include or exclude any platform/user/group/channel/robot by setting filters.

::: tip
如果不知道这些 ID 是什么，可以使用 [获取账号信息](./platform.md#获取账号信息) 中介绍的 [inspect](../../plugins/common/inspect.md) 插件。
:::

After adding a condition, you will find that the button below has changed to two options: "Add AND Condition" and "Add OR Condition".Koishi's filter supports a Protein secondary structure. A series of conditions in the inner layer form a condition group with a logical relationship of "and", and a series of bars in the outer layer form the final filter condition with a recursive relationship of "or".

## Conditional Properties

Koishi not only supports setting up filters at the plugin level, but certain configuration items also support taking different values in different sessions.For example, we can see `prefix`, `autopsying` on the right side of configuration items with a "…" button

![computed](/manual/console/computed.dark.webp) {.dark-only}

![computed](/manual/console/computed.light.webp) {.light-only}

Click this [..] button to turn a regular configuration item into a calculationWe can configure a series of values that meet a filter, and a default value that does not meet anything.

By utilizing this feature, we can achieve some complex functions, such as:

- Block all messages from certain groups
- Using different command prefixes on different platforms
- Open extra limit for a specific user
