# 平台集成

至此，Koishi 的适配器开发已经接近尾声。经过前面的几节内容，我们的适配器已经封装了平台接口，与服务器稳定地进行连接，并能够顺利地接受和发送消息。但除此以外，部分平台还提供了一些额外的能力，允许机器人做得更好。Koishi 当然也要把这些能力集成到机器人中。

## 斜线指令

:::tip
相关章节：[指令开发](../basic/command.md)
:::

部分平台为机器人提供了斜线指令功能，用于在聊天框中快速输入指令。在 Discord 中差不多是这个效果：

![slash command](/adapter/slash.png)

适配器可以通过 `bot.updateCommands()` 方法，将 Koishi 的指令注册为平台的斜线指令：

```ts
class DiscordBot {
  async updateCommands(commands: Universal.Command[]) {
    // 这里忽略了部分细节，仅供参考
    const updates = commands.map(Discord.encodeCommand)
    await this.internal.bulkOverwriteGlobalApplicationCommands(this.selfId, updates)
  }
}
```

## 用户语言偏好

:::tip
相关章节：[多语言支持](../i18n/index.md)
:::

部分平台本身支持多种语言。在这样的平台中，用户可以自行设置自己的语言偏好。当用户向机器人发送消息时，Koishi 就可以根据用户的语言偏好，做出相应语言的回复。

而适配器所需要做的，就只有设置 `session.locales` 属性 (以 Telegram 平台为例)：

```ts
if (from.language_code) {
  // 这里为了简化逻辑，只取语言码的前两位
  session.locales = [from.language_code.slice(0, 2)]
}
```
