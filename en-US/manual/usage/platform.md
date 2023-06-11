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

### 获取会话信息

对于一个来自聊天平台的会话，Koishi 会通过平台、消息、频道、用户、机器人的 ID 来进行识别。如果不知道这些值是什么，可以启用 [inspect](../../plugins/common/inspect.md) 插件。使用要绑定的平台账号向机器人发送 `inspect` (这里不要使用沙盒，不然只能获得沙盒用户的数据)，就可以获得会话信息：

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

## 控制台登录

[auth](../../plugins/console/auth.md) 插件允许任何用户在控制台登录 Koishi 账号并管理自己的用户信息。此外，该插件还自带了一个管理员账号，对于刚刚搭建好 Koishi 的用户来说，这是最方便的提权方式。

### 配置登录插件

进入「插件配置」界面，并点击 auth 插件。这里我们会看到有一个「管理员设置」：

![plugin-login](/manual/console/plugin-login.light.webp) {.light-only}

![plugin-login](/manual/console/plugin-login.dark.webp) {.dark-only}

填写你自己准备好的密码，然后点击「启用插件」。此时会弹出一个登录框，选择「用户密码登录」，填写你刚刚配置好的用户名 (如果你没改就是默认值 `admin`) 和密码，点击「登录」即可进入个人页面。

![login-password](/manual/console/login-password.light.webp) {.light-only}

![login-password](/manual/console/login-password.dark.webp) {.dark-only}

### 普通用户登录

如果你是机器人的普通用户，而机器人也配置了控制台登录插件，那么当你初次进入控制台，会发现只有寥寥几个页面是能访问的。这是因为你尚未登录。

点击左下角的「登录」按钮，选择「平台账号登录」，并输入你的平台名和用户 ID。点击「获取验证码」，并把页面中出现的验证码通过上述账号私聊发送给机器人，即可完成登录。

![login-platform](/manual/console/login-platform.light.webp) {.light-only}

![login-platform](/manual/console/login-platform.dark.webp) {.dark-only}

登录完成后，你会被重定向到个人页面。在这个页面中你可以修改自己的用户名和密码。普通用户第一次登录只能使用平台账号登录，而设置了用户名和密码后，点击右上角的「应用更改」，未来就可以使用用户密码登录了。

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
