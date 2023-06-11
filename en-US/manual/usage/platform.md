# Cross-Platform

Koishi describes itself as a "cross-platform" framework, but what does this "cross-platform" mean?This doesn't just mean that Koishi supports multiple running platforms, but that Koishi can access multiple chat platforms simultaneously and provide the most native experience possible:

- Koishi provides a unified interface so you can enjoy the full Koishi ecosystem on any chat platform
- Koishi app can access multiple chat platforms at the same time, so users can interact with your bot on any platform
- Koishi has native support for cross-platform account binding, which allows users to take all of their data with them for a seamless migration experience.

Let's talk about this now.

## Basic Concepts

**Platform(Platform)** is a chat platform, such as QQ, Discord, etc.Users on the same platform can message each other, but users on different platforms cannot message each other.Each separate self-built server is considered a separate platform for a self-built chat platform like Rocket Chat.

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

## 账号绑定

Koishi 支持账号绑定，即一个 Koishi 账号可以同时对应多个平台用户。完成绑定后，你无论在哪个平台上与机器人交互，数据都会被共享。

Koishi 官方目前提供了两个插件实现账号绑定，我们将逐一介绍。

### 在控制台中绑定

登录控制台后，任何用户都可以在个人页面中绑定平台账号。点击「平台账号绑定」右侧的「添加」按钮，并使用你要绑定的账号完成一遍类似平台账号登录的流程，就大功告成了。

![profile](/manual/console/profile.light.webp) {.light-only}

![profile](/manual/console/profile.dark.webp) {.dark-only}

如果要解除绑定，点击对应平台账号右侧的「解绑」即可。

### 通过指令绑定

[bind](../../plugins/common/bind.md) 插件通过指令也实现了账号绑定。使用要绑定的平台账号向机器人发送 `bind`：

<chat-panel>
<chat-message nickname="Alice">bind</chat-message>
<chat-message nickname="Koishi">
<p>指令 bind 可用于在多个平台间绑定用户数据。绑定过程中，原始平台的用户数据将完全保留，而目标平台的用户数据将被原始平台的数据所覆盖。</p>
<p>请确认当前平台是你的目标平台，并在 5 分钟内使用你的账号在原始平台内向机器人发送以下文本：</p>
<p>Koishi/123456</p>
</chat-message>
</chat-panel>

跟随提示，使用原始平台账号向机器人发送 `Koishi/123456`。如果你的第一条消息是私聊消息，那么此时绑定已经完成。如果你的第一条消息是群聊消息，则机器人会再次让你进行一遍确认：

<chat-panel>
<chat-message nickname="Alice">Koishi/123456</chat-message>
<chat-message nickname="Koishi">
<p>令牌核验成功！下面将进行第二步操作。</p>
<p>请在 5 分钟内使用你的账号在目标平台内向机器人发送以下文本：</p>
<p>Koishi/654321</p>
<p>注意：当前平台是你的原始平台，这里的用户数据将覆盖目标平台的数据。</p>
</chat-message>
</chat-panel>

再次跟随提示，使用目标平台账号向机器人发送 `Koishi/654321`，即可完成绑定。

绑定完成后，你可以随时在目标平台向机器人发送 `bind -r` 来解除绑定状态。
