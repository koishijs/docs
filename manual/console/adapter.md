# 接入聊天平台

Koishi 使用适配器插件来支持各种聊天平台，对于不同的平台，你需要做好相应的准备工作。

- [Discord](../../plugins/adapter/discord.md)
- [Feishu (飞书)](../../plugins/adapter/feishu.md)
- [KOOK (开黑啦)](../../plugins/adapter/kook.md)
- [OneBot](../../plugins/adapter/onebot.md)
- [QQ 频道](../../plugins/adapter/qqguild.md)
- [Telegram](../../plugins/adapter/telegram.md)

Koishi 中预装了一些常用的适配器插件，你可以在插件配置中的 adapter 分组中找到他们，如果这里没有你想要的适配器，你可以在插件市场中搜索并添加更多适配器。

你需要阅读适配器的文档，按照文档中的流程获取 API 或注册账号，参考文档填写插件配置，最后点击屏幕上方的启用插件，这样你就完成了一个平台的接入。

## 添加更多实例

在「全局配置」或任意分组界面中，点击右上角的「添加插件」将会弹出对话框。在对话框中点击要添加的插件，即可创建一份未启用的插件配置 (请阅读 [维护多份配置](#维护多份配置))。

![select-plugin](/manual/console/select-plugin.light.webp) {.light-only}

![select-plugin](/manual/console/select-plugin.dark.webp) {.dark-only}

在任何插件的配置界面点击右上角的「删除插件」可删除这份配置。此操作无法被撤销，如果你想要恢复之前的配置，只能再次手动添加。
