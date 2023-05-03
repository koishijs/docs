# Chat in Sandbox

Once the Sandbox plugin is installed, we could use the plugin immediately. Go to the "Sandbox" page, we can simulate a conversation with bots.

## Chat Simulation

First, click the "Add User" button in the upper left corner to create a virtual user, which is named Alice for example. Then, you would see a blank chat UI on the right side. Click the input box at the bottom of the chat UI, enter "help" (without quotes) and then press Enter key. You will see a reply message from bot immediately. "help" is a built-in command that lists all available commands at the moment. Therefore, we could see "echo" and "help" commands in the response.

The "echo" here is the plugin we have just installed, which displays a line of text that the user just entered. Let's try with entering "echo Bonjour", then press Enter to commit it. You will see the response from bot with "Bonjour".

![sandbox](../../../shared/manual/console/sandbox.light.webp) {.light-only}

![sandbox](../../../shared/manual/console/sandbox.dark.webp) {.dark-only}

## Virtual Users Management

We just simulated a private chat with bot. If you want to simulate a group chat, then we could click "Add User" again to create more virtual users. Then, switch to "Group Chat" at the top of the screen. At this moment, you could control multiple virtual users to chat with the bot. This would be useful when you want to test a multiplayer plugin like chess.

Additionally, you could also set the [Authority](../usage/permission.md) of a virtual user in the "User Settings" page when commands require it.

## Why Not Real Platform?

So, why don't we test plugins in a real chat platform rather than a sandbox?

Comparing a real environment, the sandbox allows you to test the plugin immediately without a lot of debugging work in the real environment. What's worse, if some features of your bot disobeyed the ToS that your bot account hosted, your account may be blocked. Therefore, the sandbox is useful here.

If you are a plugin develop rather than just a user, the sandbox is more meaningful to you. Thanks to the HMR feature, you could see the result when you click the Save button every time you changed the source code of your plugin. The sandbox allows you to develop plugin quickly iteratively without a real account.

Of course, the sandbox would not simulate every platform, you might need some features that is not implemented in the sandbox plugin. In the next section, we will describe how to connect to the real chat platform.
