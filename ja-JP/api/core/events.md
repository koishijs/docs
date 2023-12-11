# イベント

:::tip
参见：[开发 > 交互基础 > 事件系统](../../guide/basic/events.md) <br>参见：[开发 > 模块化 > 生命周期](../../guide/plugin/lifecycle.md)
:::

:::tip
本节介绍 Koishi 的内置事件。如果想了解事件 API，请前往 [API > 内置服务 > 事件](../service/events.md)。
:::

## 通用会话事件

通用会话事件由适配器实现，它们均包含一个 [`session`](./session.md) 参数，触发方式均为 `emit`。各事件会在相应的资源页面中介绍。

- [friend-request](../resources/user.md#friend-request)
- [guild-added](../resources/guild.md#guild-added)
- [guild-member-added](../resources/member.md#guild-member-added)
- [guild-member-removed](../resources/member.md#guild-member-removed)
- [guild-member-request](../resources/member.md#guild-member-request)
- [guild-member-updated](../resources/member.md#guild-member-updated)
- [guild-removed](../resources/guild.md#guild-removed)
- [guild-request](../resources/guild.md#guild-request)
- [guild-role-created](../resources/role.md#guild-role-created)
- [guild-role-deleted](../resources/role.md#guild-role-deleted)
- [guild-role-updated](../resources/role.md#guild-role-updated)
- [guild-updated](../resources/guild.md#guild-updated)
- [login-added](../resources/login.md#login-added)
- [login-removed](../resources/login.md#login-removed)
- [login-updated](../resources/login.md#login-updated)
- [message-created (message)](../resources/message.md#message-created)
- [message-deleted](../resources/message.md#message-deleted)
- [message-updated](../resources/message.md#message-updated)
- [reaction-added](../resources/reaction.md#reaction-added)
- [reaction-removed](../resources/reaction.md#reaction-removed)

## 内置会话事件

与上面介绍的通用会话事件不同，这里的事件都是 Koishi 自身实现的，它们有不同的触发方式，但是都会支持上下文选择器。

### 事件：middleware

- **session:** `Session` 当前会话
- **触发方式:** emit

在执行完全部中间件后会在对应的上下文触发。

### 事件：before-parse

- **content:** `string` 要解析的文本
- **session:** `Session` 当前会话
- **触发方式:** bail

尝试将文本解析成 Argv 对象时调用。你可以在回调函数中返回一个 Argv 对象以覆盖默认的解析行为。

### 事件：parse

- **argv:** `Argv` 运行时参数
- **触发方式:** bail

尝试将一个未识别出指令的 Argv 对象识别成指令调用时使用。你可以在回调函数中修改传入的 Argv 对象，或者返回一个字符串表示识别出的指令。

### 事件：before-attach-channel

### 事件：before-attach-user

- **session:** `Session` 当前会话
- **fields:** `Set<string>` 要获取的字段列表
- **触发方式:** emit

当 Koishi 试图从数据库获取频道 / 用户信息前触发。你可以在回调函数中通过 `fields.add()` 修改传入的字段集合，增加的字段将可以被指令以及之后的中间件获取到。

这两个事件的触发于内置中间件中。如果没有配置数据库，则两个事件都不会触发；如果不是群聊消息，则 before-attach-channel 事件不会触发。

### 事件：attach-channel

### 事件：attach-user

- **session:** `Session` 当前会话
- **触发方式:** serial

当 Koishi 完成频道 / 用户数据获取后触发。调用时会传入一个 Session 对象，将会拥有 `channel`/`user` 属性。你可以在回调函数中修改这两个属性，这些修改会在后续过程中自动更新到数据库。如果你在回调函数中返回一个 truthy 值，则该会话不会触发指令以及之后的中间件。

如果没有配置数据库，则两个事件都不会触发；如果不是群聊消息，则 attach-channel 事件不会触发。

### 事件：command/before-attach-channel

### 事件：command/before-attach-user

- **session:** `Argv` 运行时参数
- **fields:** `Set<string>` 要获取的字段列表
- **触发方式:** emit

当 Koishi 试图从数据库获取频道 / 用户信息前触发。你可以在回调函数中通过 `fields.add()` 修改传入的字段集合，增加的字段将可以被指令以及之后的中间件获取到。

这两个事件触发于任意指令调用前。如果没有配置数据库，则两个事件都不会触发；如果不是群聊消息，则 before-attach-channel 事件不会触发。

### 事件：before-send

- **session:** `Session` 消息会话
- **触发方式:** bail

即将发送信息时会在对应的上下文触发。调用时会传入一个事件类型为 [send](#消息类事件) 的会话实例。由于该消息还未发送，这个会话并没有 `messageId` 属性。你可以通过修改 `session.content` 改变发送的内容，或者返回一个 truthy 值以取消该消息的发送。

### 事件：command/before-execute

- **argv:** `Argv` 运行时参数
- **触发方式:** serial

调用指令前会在对应的上下文触发。此时指令的可用性还未经检测，因此可能出现参数错误、权限不足、超过使用次数等情况。你可以通过在回调函数中返回一个字符串以取消该指令的执行。进一步，如果该字符串非空，则会作为此指令执行的结果。

### 事件：command

- **argv:** `Argv` 运行时参数
- **触发方式:** parallel

指令调用完毕后会在对应的上下文触发。

## 生命周期事件

这里的所有事件在全体上下文触发的 (即上下文选择器对这些事件无效)。

### 事件：ready

- **触发方式:** parallel

应用启动时触发。如果应用已经处于启动状态，则会立即触发。参见 [异步加载](../../guide/plugin/lifecycle.md#异步加载与-ready-事件)。

### 事件：dispose

- **触发方式:** parallel

插件被卸载时触发。参见 [清除副作用](../../guide/plugin/lifecycle.md#清除副作用)。

:::warning
请注意，`dispose` 事件的目的是清理副作用而不是确保数据保存。当 Koishi 进程崩溃或是被强行中止时，`dispose` 事件都可能不会触发。为了保护你的数据，你应当在每一次修改后立即上传数据，而不是在 `dispose` 中处理收尾工作。
:::

### 事件：service

- **name:** `string` 服务名称
- **触发方式:** emit

有服务被修改时触发。

### 事件：model

- **name:** `string` 被扩展的表名
- **触发方式:** emit

调用 `model.extend()` 时触发。

### 事件：login-added

- **bot:** [`Bot`](./bot.md) 机器人实例
- **触发方式:** emit

添加机器人时触发。

### 事件：login-removed

- **bot:** [`Bot`](./bot.md) 机器人实例
- **触发方式:** emit

移除机器人时触发。

### 事件：login-updated

- **bot:** [`Bot`](./bot.md) 机器人实例
- **触发方式:** emit

机器人状态发生改变时触发。
