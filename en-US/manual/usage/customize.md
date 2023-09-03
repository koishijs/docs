# 深入定制机器人

## Permission Management

Now that a user system is in place, the next natural requirement is permission management.

### User Permissions

Koishi 内部有一套默认的权限系统，它为每个用户赋予了一个权限等级，遵循以下的 **核心规则**：

- 数据库中没有的用户默认拥有 0 级权限
- 高权限者能够执行一切低权限者的操作

在此基础上，我们还扩充出了这样的一套 **设计准则**：

- Level 0: non-existing users
- Level 1: All users, limited access to functionality
- Level 2: Advanced user with access to almost all functionality
- Level 3: Admin, able to directly manipulate bot configurations
- Level 4: Senior admin, able to manage other accounts

你可以基于这套准则对指令进行 [权限管理](./command.md#权限管理)，也可以用于部分 [计算属性](#计算属性) 的配置项中。

通过 [配置登录插件](./platform.md#配置登录插件) 的方式，你可以快速拥有一个 5 级权限的管理员账号。接下来，要做的就是为其他用户赋予权限了。

安装 [admin](../../plugins/common/admin.md) 插件。该插件提供了名为 `authorize` 的指令，可以设置其他用户的权限等级：

<chat-panel>
<chat-message nickname="Alice">authorize -u @Bob 2</chat-message>
<chat-message nickname="Koishi">User data updated.</chat-message>
</chat-panel>

任何用户只能对权限等级低于自己的用户进行操作，且操作后的权限等级同样必须低于自己。

### Assignment Mechanism

默认情况下，同一个 Koishi 应用接入的多个机器人账号在同一个频道内，只有一个机器人会响应用户的消息。这是为了防止消息重复发送和循环触发等问题。这个负责响应消息的机器人被称为该频道的「受理人」。默认情况下，第一个收到该频道的消息的机器人会自动成为受理人。

当受理人账号离线时，即便频道内仍有其他机器人，它们也不会响应你的消息。此时如果想要切换受理人，同样请安装 [admin](../../plugins/common/admin.md) 插件，并使用 `@bot assign`，其中 @bot 是你所希望的受理人。

反过来，如果你希望你的 Koishi 实例不主动响应某个频道的消息，可以通过 `assign -r` 的方式来移除该频道的受理人。其他频道不会受到影响。

::: tip
某个频道处于无受理人状态与该频道被过滤器排除的区别在于：前者仍然可以被通过 @机器人 的方式触发指令，而后者无论如何都无法触发指令。具体请参考 [触发前缀](./command.md#触发前缀) 章节。
:::

### Auto-assign

默认情况下，对于每一条接收到的消息，机器人都会自动向数据库中注册其用户和频道。新注册的用户将默认获得 1 级权限，而新注册的频道会自动以收到消息的机器人为其受理者。如果你不希望有此行为，可以在全局设置中手动配置 `autoAuthorize` 和 `autoAssign`。

上述两个配置项都支持 [计算属性](#计算属性)，这也意味着你可以在不同的聊天环境中配置不同的行为。

## Filters

Many times, we hope that certain features can only be used for certain group or private chats.Using permission management means introducing a database, and a lighter approach is to directly affect the plugin's functional diagram through **filters**.

### Plugin Filters

::: tip
A few plugins are unrelated to chat platforms, such as console and database plugins.These plugins therefore have no filter settings.
:::

Most of the plugins provide filter settings at the top of the plugin details page.Click the 'Add Condition' button to create a filter condition.Can include or exclude any platform/user/group/channel/robot by setting filters.

::: tip
如果不知道这些 ID 是什么，可以使用 [获取账号信息](./platform.md#获取账号信息) 中介绍的 [inspect](../../plugins/common/inspect.md) 插件。
:::

After adding a condition, you will find that the button below has changed to two options: "Add AND Condition" and "Add OR Condition".Koishi's filter supports a Protein secondary structure. A series of conditions in the inner layer form a condition group with a logical relationship of "and", and a series of bars in the outer layer form the final filter condition with a recursive relationship of "or".

### Conditional Properties

Koishi not only supports setting up filters at the plugin level, but certain configuration items also support taking different values in different sessions.For example, we can see `prefix`, `autopsying` on the right side of configuration items with a "…" button

![computed](/manual/console/computed.dark.webp) {.dark-only}

![computed](/manual/console/computed.light.webp) {.light-only}

Click this [..] button to turn a regular configuration item into a calculationWe can configure a series of values that meet a filter, and a default value that does not meet anything.

By utilizing this feature, we can achieve some complex functions, such as:

- Block all messages from certain groups
- Using different command prefixes on different platforms
- Open extra limit for a specific user

## Internationalization

Koishi supports internationalization natively, which means that a Koishi bot could switch languages according to different context. This might no matter with you at all...but wait a second! This section might show you some very useful features. Internationalization is not as simple as you think.

### Set Language Preferences

In Koishi, each user and channel managed by the application itself can independently set language preferences.其中，应用级别的默认语言通过全局配置项 `locale` 来设置，而用户、频道的语言偏好则通过 [admin](../../plugins/common/admin.md) 插件提供的 `user.locale` 和 `channel.locale` 指令来管理 (还记得指令系统中的 [这个例子](./command.md#子指令) 吧)。

By default, the priority of preferred language is Channel > User > GlobalA group may have a large number of users who use different native languages participating in discussions, and different language channels are usually set up to facilitate communication.而对于此类情况，频道优先策略就可以让机器人在这些频道内始终使用预设好的语言来回答，而对于未设置语言偏好的频道，机器人仍然会遵循用户的偏好设置。Of course, you can also change this behavior through the global configuration item`i18n. output`.

### Localize Text

Of course, most plugins only support Chinese.If you want to make your Koishi bot support other languages, you can modify texts of plugins locally, instead of sending Pull Requests to their authors.

Click 'Localization' on the activity bar, you will see page like below:

![locales](/manual/console/locales.dark.webp) {.dark-only}

![locales](/manual/console/locales.light.webp) {.light-only}

Select categories on the left, and select the language to display in the top right corner, and the zone to edit texts is in the middle.其中，文本框里的占位符对应于插件本身提供的文本，可以在翻译到其他语言时用做参考。

然而，这个页面还有另一个用法，就是修改已有的文本！例如在上面的截图中，`low-authority` 原本对应到的文本是 `权限不足`，我们可以将它修改为 `哼，不给用`。现在让我们找个带权限等级的指令试试看有什么效果：

<chat-panel>
<chat-message nickname="Alice">authorize -u @Bob 5</chat-message>
<chat-message nickname="Koishi">哼，不给用！</chat-message>
</chat-panel>

If you do things like above, you can get fully customized texts of your bot, and make your bot very different.
