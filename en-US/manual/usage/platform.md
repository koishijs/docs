# Login and Bind Account

Koishi describes itself as a "cross-platform" framework, but what does this "cross-platform" mean?This doesn't just mean that Koishi supports multiple running platforms, but that Koishi can access multiple chat platforms simultaneously and provide the most native experience possible:

- Koishi 提供了统一的接口，你可以在任何聊天平台上享受完整的 Koishi 生态。
- Koishi 应用可以同时接入多个聊天平台，用户可以在任意平台上与你的机器人进行交互。
- Koishi 原生地支持了跨平台账号绑定，这使得用户可以带着全部数据进行无感迁移。

现在就让我们来说说，如何在 Koishi 中使用跨平台的账号系统。

## 获取账号信息

有些平台的账号信息是不可见的，所以我们需要借助一些工具来获取它们。

[inspect](../../plugins/common/inspect.md) 插件提供了获取会话信息的能力。安装这个插件后，使用任意平台账号向机器人发送 `inspect` (这里不要使用沙盒，不然只能获得沙盒用户的数据)，就可以获得下面的会话信息：

<chat-panel>
<chat-message nickname="Alice">inspect</chat-message>
<chat-message nickname="Koishi">
<p>Platform: discord</p>
<p>Message ID: 1085992290352373951</p>
<p>Channel ID: 835804172850561094</p>
<p>Guild ID: 811975252883800125</p>
<p>User ID: 811972350065115208</p>
<p>Self ID: 952190117479600159</p>
</chat-message>
</chat-panel>

如果你要进行登录或者绑定，这里的「平台名」和「用户 ID」会很有用。

## Console Login

The [auth](../../plugins/console/auth.md) plugin allows any user to log in and manage their Koishi account from the console.In addition, the plugin comes with an administrator account, which is the most convenient way to raise the rights of users who have just built Koishi.

### Configure Login Plugin

Click on the Auth plugin in the Plugin Configuration screen.At this point we will see that there is an "Administrator Settings" tab.

![plugin-login](/manual/console/plugin-login.light.webp) {.light-only}

![plugin-login](/manual/console/plugin-login.dark.webp) {.dark-only}

Enter the password you've prepared. Click "Activate plugin".Select "User Password Login", enter the username (default `admin` if you haven't changed it) and password you just configured, and click "Login" to enter your personal page.

![login-password](/manual/console/login-password.light.webp) {.light-only}

![login-password](/manual/console/login-password.dark.webp) {.dark-only}

### Ordinary user login

If you are a regular user of the bot and the bot is configured with the console login plugin, then when you first enter the console, you will find that only a few pages are accessible.The reason for this is that you do not have a login.

Enter your Platform Name and User ID when you clicked the lower left Login button and selected Platform Account Login.Click "Get Verification Code" and send the verification code that appears on the page to the bot via the private chat of the account above to complete the registration.

![login-platform](/manual/console/login-platform.light.webp) {.light-only}

![login-platform](/manual/console/login-platform.dark.webp) {.dark-only}

Once you are logged in, you will be redirected to your personal page.In this page you can change your username and password.Ordinary users can only log in with their platform account for the first time, and after setting a username and password, click "Apply Changes" in the upper right corner to log in with a user password in the future.

## Account Binding

Koishi supports account binding. This means that one Koishi account can correspond to multiple platform users at the same time.No matter what platform you are interacting with the bot on, the data will be shared once the binding is complete.

Koishi currently offers two official plugins for account binding, which we will introduce one by one.

### Binding in the console

Any user can bind a platform account to their personal page after logging in to the console.Click the "Add" button to the right of "Platform Account Binding" and complete the process by logging in with the account you want to bind, and you're done.

![profile](/manual/console/profile.light.webp) {.light-only}

![profile](/manual/console/profile.dark.webp) {.dark-only}

Click the "Disconnect" button on the right side of the platform account if you wish to disconnect.

### Binding by command

[bind](../../plugins/common/bind.md) The plugin also implements the binding of accounts by means of a command.Using the platform account you want to bind to, send `bind` to the bot:

<chat-panel>
<chat-message nickname="Alice">bind</chat-message>
<chat-message nickname="Koishi">
<p>You can use the bind command for binding user data across multiple platforms.During the binding process, the user data on the original platform is completely preserved, while the user data on the target platform is overwritten with the data on the original platform.</p>
<p>Please confirm that the current platform is your target platform and send the following text to the bot on the original platform using your account within 5 minutes:</p>
<p>Koishi/123456</p>
</chat-message>
</chat-panel>

Using the original platform account, follow the prompt and send `Koishi/123456` to the bot.The binding is complete at this point if your first message is a private chat message.The bot will ask you to confirm again if your first message is a guild chat message:

<chat-panel>
<chat-message nickname="Alice">Koishi/123456</chat-message>
<chat-message nickname="Koishi">
<p>Token verification successful!The second step is described below.</p>
<p>Please use your account to send the following text to the bot on the target platform within the next 5 minutes:</p>
<p>Koishi/654321</p>
<p>Attention: The current platform is your original platform, the user data here will overwrite the data of the target platform.</p>
</chat-message>
</chat-panel>

Follow the prompts again and send `Koishi/654321` to the bot using the target platform account to complete the binding.

Once the binding is complete, you can unbind the state at any time by sending `bind -r` to the robot from the target platform.
