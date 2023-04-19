# Chat in Sandbox

Once the Sandbox plugin is installed, we could use the plugin immediately. Go to the "Sandbox" page, we can simulate a conversation with bots.

## Chat Simulation

First, click the "Add User" button in the upper left corner to create a virtual user, which is named Alice for example. Then, you would see a blank chat UI on the right side. Click the input box at the bottom of the chat UI, enter "help" (without quotes) and then press Enter key. You will see a reply message from bot immediately. "help" is a built-in command that lists all available commands at the moment. Therefore, we could see "echo" and "help" commands in the response.

The "echo" here is the plugin we have just installed, which displays a line of text that the user just entered. Let's try with entering "echo Bonjour", then press Enter to commit it. You will see the response from bot with "Bonjour".

![sandbox](/manual/console/sandbox.light.webp) {.light-only}

![sandbox](/manual/console/sandbox.dark.webp) {.dark-only}

## Virtual Users Management

We just simulated a private chat with bot. If you want to simulate a group chat, then we could click "Add User" again to create more virtual users. Then, switch to "Group Chat" at the top of the screen. At this moment, you could control multiple virtual users to chat with the bot. This would be useful when you want to test a multiplayer plugin like chess.

Additionally, you could also set the [Authority](../usage/permission.md) of a virtual user in the "User Settings" page when commands require it.

## Why Not Real Platform?

So, why don't we test plugins in a real chat platform rather than a sandbox?

Comparing a real environment, the sandbox allows you to test the plugin immediately without a lot of debugging work in the real environment. What's worse, if some features of your bot disobeyed the ToS that your bot account hosted, your account may be blocked. Therefore, the sandbox is useful here.

如果你是插件的开发者而非使用者，沙盒功能的意义则更大了：得益于 Koishi 的热重载机制，每次修改插件源码后，你只需要按下保存，即可立即在沙盒中体验修改后的效果。这允许你进行快速的迭代开发，而根本不需要准备真实环境的账号。

当然，沙盒并不能模拟所有真实聊天环境，因此有些插件的效果可能无法在沙盒中体验。因此下一节，我们就来介绍如何接入真实的聊天环境。
