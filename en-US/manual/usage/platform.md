# Cross Platform

Koishi describes itself as a "cross-platform" framework, but what does this "cross-platform" mean?This doesn't just mean that Koishi supports multiple running platforms, but that Koishi can access multiple chat platforms simultaneously and provide the most native experience possible:

- Koishi provides a unified interface so you can enjoy the full Koishi ecosystem on any chat platform
- Koishi app can access multiple chat platforms at the same time, so users can interact with your bot on any platform
- Koishi has native support for cross-platform account binding, which allows users to take all of their data with them for a seamless migration experience.

Let's talk about this now.

## Basic Concepts

**平台 (Platform)** 是指聊天平台，比如 Discord、Telegram 等。Users on the same platform can message each other, but users on different platforms cannot message each other.Each separate self-built server is considered a separate platform for a self-built chat platform like Rocket Chat.

**Bot(Bot)** is a platform user controlled by Koishi.The user here is not necessarily a real user. It can also be a bot user, which is provided by some platforms.By interacting with the robot, other users experience Koishi's functions.

**Adapters (Adapter)** are plugins that implement the platform protocol and enable robots to access the platform.In general, one adapter instance corresponds to one robot user, and enabling multiple adapters at the same time allows simultaneous access to multiple robots.

**Message(Message)** is literally a message.It is usually text or rich text format, and sometimes includes media resources such as images and audio, etc.Koishi uniformly encodes messages using message elements.

**Channel(Channel)** is a collection of messages.A channel contains a series of messages that have a temporal and logical sequence to each other.Channels are divided into private chat channels and group chat channels, where private chat channels have only two participants and group chat channels can have any number of participants.

**Guilds (Guilds)** are collections of platform users.A guild will typically contain both a set of Users and Channels, and be managed by some of them using a permission-based mechanism.In some platforms, the concepts of guilds and guild chat channels coincide (e.g. QQ): there is one and only one group chat channel within a guildThe private chat channel does not belong to any of the guilds

### Get session information

Koishi identifies by platform, message, channel, user, and bot ID for a session from a chat platform.If you don't know what these values are, you can enable the [inspect](../../plugins/common/inspect.md) plugin.Send `inspect` to the bot using the platform account you want to bind to (don't use the sandbox here, or you'll only get the sandboxed user's data) to get the session information:

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

If you want to bind your account, the platform name and user ID here will be useful.

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
