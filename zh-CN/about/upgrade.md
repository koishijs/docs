# 版本内迁移

## JSX 支持 <badge>v4.10.3</badge>

在 4.10.3 版本中，我们正式引入了 JSX 支持。这意味着你可以在插件中使用 JSX 语法来构造消息元素了。要实现这一点，你需要对你的项目进行一些配置：

1. 打开 `tsconfig.base.json` 文件并加入以下配置：

```json{3-4}
{
  "compilerOptions": {
    "jsx": "react-jsx",
    "jsxImportSource": "@satorijs/element",
  },
}
```

2. 将要使用 JSX 的文件后缀名修改为 `.tsx`。

## 心跳迁移 <badge>v4.10.4</badge>

在 4.10.4 版本中，我们调整了默认的心跳行为，这可能导致老用户升级时遭遇无限重启问题。可以执行下列操作进行升级：

1. 先将 market 插件更新到最新版本 (最新版本支持批量更新)
2. (非 v4.10.3 用户忽略此步骤) 在控制台中修改全局设置，将 `heartbeatInterval` 项的值改为 `6000`，`heartbeatTimeout` 项的值改为 `600000`，并点击「重载配置」按钮
3. 在依赖管理中，通过下拉菜单将全部官方依赖修改为最新版本 (如果有 suggest 和 assets-* 依赖则选择移除)，并点击「应用更改」按钮
4. 更新完成后重启实例
5. 在控制台中修改全局设置，将 `heartbeatInterval` 和 `heartbeatTimeout` 项的值均改为 `0`，并点击「重载配置」按钮
6. 再次重启实例
7. 如果之前移除了 assets-* 插件，请重新前往插件市场进行安装

## CLI 迁移 <badge>v4.11.0</badge>

在 4.11.0 版本中我们移除了 @koishijs/cli 包，将其合并到了 koishi 中。这意味着你每次升级时不再需要同时升级两边了。但对于已经安装了 @koishijs/cli 的用户，你需要执行下列操作完成升级：

1. 先完成 4.10.4 版本的更新，确保自己的版本号不小于 4.10.4
2. 在依赖管理中，修改 koishi 的版本号到 4.11.0，同时移除 @koishijs/cli 的版本号
3. 点击「应用更改」按钮

## HMR 迁移 <badge>v4.12.0</badge>

在 4.12.0 版本中，我们将模块热替换相关功能移至专门的插件 @koishijs/plugin-hmr 中。对于生产模式下的用户无影响，但开发者则需要在升级 Koishi 后手动安装新插件。你需要执行下列操作完成升级：

1. 安装最新版本的 @koishijs/plugin-hmr
2. 修改你的配置文件，加上 [模块热替换](../guide/develop/script.md#模块热替换) 中提到的部分
3. 移除 `package.json` 文件中 `scripts.dev` 的 `--watch` 参数

## 插件市场迁移 <badge>v4.13.0</badge>

在 4.13.0 版本中，我们将 @koishijs/plugin-market 插件分拆为了两个插件 market 和 config。其中 market 负责「插件市场」和「依赖管理」页面，而 config 则负责「插件配置」页面。直接将 market 插件更新到 2.0.0 或以上版本的用户会发现自己的「插件配置」页面消失，此时你需要执行下列操作完成升级：

1. 首先确保你的 market 插件是最新版 (应该是 2.0.0 以上版本)
2. 打开「插件市场」页面，安装最新版的 config 插件
3. 打开「资源管理器」页面，找到 `koishi.yml` 页面，打开并编辑：

```yaml
host: 127.0.0.1
port: 5140
maxPort: 5149
plugins:
  ...
    ...
    config: {}         # 加一行在这里，注意左侧缩进与 market 对齐
    market:
      ...
    ...
```

4. 点击右上角的保存按钮
5. 重新启动 Koishi 实例

## 国际化迁移 <badge>v4.13.0</badge>

在 4.13.0 版本中，我们也引入了多语言的回退机制。这意味者，所有涉及语言配置的地方都需要从单一的语言字符串修改为数组。具体包括以下几个地方：

- 应用配置项 `locale` → `i18n.locales`
- 用户和频道的数据结构 `locale` → `locales`
- 会话对象的属性 `locale` → `locales`

用户无需留意这些改动，但开发者如果使用了上述 API 则需要进行迁移。

## 协议更新 <badge>v4.14.5</badge>

在 4.14.5 版本中，我们将协议库 Satori 升级到了 v3 alpha 版本。新版本引入了与分页 API 相关的不兼容更新。具体受影响的 API 如下：

- `bot.getChannelList()`
- `bot.getFriendList()`
- `bot.getGuildList()`
- `bot.getGuildMemberList()`
- `bot.getGuildRoleList()`
- `bot.getMessageList()`
- `bot.getReactionList()`

上述 API 将不再返回 `Promise<T[]>` 而是返回一个 `Promise<List<T>>`，包含 `data` 属性和可选的 `next` 属性。`data` 包含了当前页的数据，`next` 则表示下一页的分页令牌。此外，对于上述每一个 API，我们还额外提供了返回异步迭代器的版本：

```ts
for (const item of await bot.getChannelList())  // old
for await (const item of bot.getChannelIter())  // new
```

## 协议更新 <badge>v4.15.0</badge>

在 4.15.0 版本中，我们将协议库 Satori 升级到了 v3 正式版本。新版本引入了一系列涉及平台资源不兼容更新。

[`User`](../api/resources/user.md) 类型的 `userId` 属性改为 `id`，同理对于 [`Channel`](../api/resources/channel.md), [`Guild`](../api/resources/guild.md), [`Message`](../api/resources/message.md) 也是如此。此外，`Author` 被重构为了 `User` 和 `Member` 两个部分。

[`Session`](../api/core/session.md) 引入了 `event` 属性用于存放所有事件相关的资源。尽管我们在会话中提供了 [访问器属性](../api/core/session.md#访问器属性) 以保证了大部分 API 的向下兼容，但对于没有提供访问器的事件属性，或是在使用 Bot API 的返回值时，你都需要手动修改代码。

`Adapter.Server` 和 `Adapter.Client` 两个基类被移除。现在可以直接使用 [`Adapter`](../api/core/adapter.md) 基类，并通过 `reusable` 属性决定其是否可重用。

[`Bot`](../api/core/bot.md) 将实现 [`Login`](../api/resources/login.md) 资源，因此其上的用户数据将存放在 `bot.user` 中。此外，[`status`](../api/resources/login.md) 属性由字符串变为数值枚举。

[`encoder.results`](../api/message/encoder.md#encoder-results) 的类型由 `string[]` 变为 `Message[]`。

新增用于创建私聊频道的 [`bot.createDirectChannel()`](../api/resources/channel.md)，因此不再需要实现 [`bot.sendPrivateMessage()`](../api/resources/message.md#bot-sendprivatemessage)。
