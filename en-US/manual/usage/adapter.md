# First Dialogue

After installing Koishi and experiencing the marketplace, you may can't wait to try the features of Koishi.Let's start the first conversation with the bots now!

## Simulate a conversation in the sandbox

Go to the "Sandbox" page in the Console, we can simulate a conversation with bots there.

First, click the "Add User" button in the upper left corner to create a virtual user, which is named Alice for example. Then, you would see a blank chat UI on the right side. Click the input box at the bottom of the chat UI, enter "help" (without quotes) and then press Enter key. You will see a reply message from bot immediately. "help" is a built-in command that lists all available commands at the moment. Therefore, we could see "echo" and "help" commands in the response.

The "echo" here is the plugin we have just installed, which displays a line of text that the user just entered. Let's try with entering "echo Bonjour", then press Enter to commit it. You will see the response from bot with "Bonjour".

![sandbox](/manual/console/sandbox.light.webp) {.light-only}

![sandbox](/manual/console/sandbox.dark.webp) {.dark-only}

If you want to simulate a group chat, then we could click "Add User" again to create more virtual users. Then, switch to "Group Chat" at the top of the screen. At this moment, you could control multiple virtual users to chat with the bot. This would be useful when you want to test a multiplayer plugin like chess.

Additionally, you could also set the [Authority Level](../usage/customize.md#权限管理) of a user in the "User Settings" page when any commands require it.

## Collaborate with real Chat Platforms

Simulate the conversation in the sandbox is far from enough.We need to get the robot into a real chat platform to make it truly serve us.Koishi uses adapter plugins to support various chat platforms. Below is the list of official adapters:

- [DingTalk](../../plugins/adapter/dingtalk.md)
- [Discord](../../plugins/adapter/discord.md)
- [KOOK](../../plugins/adapter/kook.md)
- [Lark](../../plugins/adapter/lark.md)
- [LINE](../../plugins/adapter/line.md)
- [Mail](../../plugins/adapter/mail.md)
- [Matrix](../../plugins/adapter/matrix.md)
- [QQ](../../plugins/adapter/qq.md)
- [Slack](../../plugins/adapter/slack.md)
- [Telegram](../../plugins/adapter/telegram.md)
- [WeChat Official](../../plugins/adapter/wechat-official.md)
- [企业微信](../../plugins/adapter/wecom.md)
- [WhatsApp](../../plugins/adapter/whatsapp.md)

The commonly used adapter plugins have been pre-installed in Koishi, you can find them in the category "Adapter" in the Plugin Configuration page.If you don't see the platform you want, you can also search for and install more adapter plugins in the marketplace.

Koishi is able to maintain multiple bot accounts of different chat platforms in the same process. Each configuration copy of the corresponding adapter plugin maintains the bot account instance, you could add new configurations of adapter plugin according to [Add More Plugins](./market.md#添加更多插件). User data is shared by bots that connected to the same chat platform. So it is available to achieve a load balance by changing the current active bot account between them.

There are large differences between the different platforms of ways and difficulty.There are different configuration work that you need to do with different platforms. 这些工作可能包括在平台内注册开发者账号、准备一台部署到公网的服务器等等。你可以在各个适配器插件的文档中找到详细的指引。

好消息是，Koishi 的大部分功能都不依赖特定的聊天平台。因此在进行准备工作的同时，你完全可以阅读本文档的后续部分，并在沙盒中体验并学习 Koishi 的功能。

## 对比沙盒与真实环境

事实上，大多数机器人框架都没有提供沙盒功能，或是倾向于用户在真实环境中进行体验。你可能会有疑惑：为什么 Koishi 要推荐使用沙盒功能呢？因此我们列出了沙盒的几点优势。

首先，沙盒可以让你快速地了解插件的效果，而不需要在真实环境中进行大量的测试。想象一下，你刚刚安装了一个陌生的插件，你并不知道应该如何使用它，也不知道它的效果是什么。最糟糕的情况下，一旦插件的某些功能触发了机器人的敏感行为，你的真实账号还存在被封禁的风险。而沙盒则可以让你在不用担心这些问题的情况下，快速地了解插件的功能。

其次，如果你是插件的开发者而非使用者，沙盒功能的意义则更大了：得益于 Koishi 的热重载机制，每次修改插件源码后，你只需要按下保存，即可立即在沙盒中体验修改后的效果。这允许你在任何设备上进行快速的迭代开发，而根本不需要准备真实环境的账号。

当然，沙盒并不能代替真实的聊天环境，有些插件的效果可能无法在沙盒中体验。因此，我们推荐你在沙盒中体验插件的基础功能，而在真实环境中进行更加深入的测试。
