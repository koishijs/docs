# 使用数据库

::: tip
直接对数据库进行操作时需要小心谨慎哦~
:::

控制台左侧的数据库选项提供了一个数据库面板，你可以在这里对 Koishi 的数据库进行查看、新增、修改或是删除。通常这里包含了各用户和频道的信息，以及 bot 在各频道发送消息的频率记录。

![database](/manual/console/database.light.webp) {.light-only}

![database](/manual/console/database.dark.webp) {.dark-only}

有时你可能希望或需要手动对数据库进行操作，比如使用 `Admin` 插件中的 `authorize` 指令为用户设定权限时，操作者默认必须拥有 4 级以上的权限。

这时我们可以进入控制台的 `数据库` 选项卡中，在 `user` 表中的对应平台（如 onebot）列下方，找到你自己的账号（需要先在平台至少向 Bot 发送一条消息），然后将其对应的 authority 从 1 修改为 大于等于 4 的数值。这样这个账号就拥有更高的权限啦，现在试试使用 authorize 指令为好友提升权限吧~
