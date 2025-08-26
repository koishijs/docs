# Migration from Older Versions

## JSX Support <badge>v4.10.3</badge>

In version 4.10.3, we officially introduced JSX support. This means you can now use JSX syntax in your plugins to construct message elements. To enable this, you'll need to configure your project as follows:

1. Open the `tsconfig.base.json` file and add the following configuration:

```json{3-4}
{
  "compilerOptions": {
    "jsx": "react-jsx",
    "jsxImportSource": "@satorijs/element",
  },
}
```

2. Change the file extension of any files using JSX syntax to `.tsx`.

## Heartbeat Update <badge>v4.10.4</badge>

In version 4.10.4, we adjusted the default heartbeat behavior, which might cause older users to encounter infinite restart issues when migrating. To resolve this, follow these steps:

1. Update the market plugin to the latest version (you can use batch update in the latest version).
2. (Skip this step if you are not using v4.10.3) In the console, modify the global settings by setting `heartbeatInterval` to `6000` and `heartbeatTimeout` to `600000`, then click the "Reload Configuration" button.
3. In the dependency management section, update all official dependencies to the latest version via the dropdown menu (remove the `suggest` and `assets-*` dependencies if present) and click the "Apply Changes" button.
4. Restart Koishi application when you have done above.
5. In the console, change the `heartbeatInterval` and `heartbeatTimeout` settings back to `0` and click the "Reload Configuration" button.
6. Restart Koishi application again.
7. If you removed any `assets-*` plugins in the steps above, reinstall them from the plugin market.

## CLI Update <badge>v4.11.0</badge>

In version 4.11.0, we removed the `@koishijs/cli` package and merged it into `koishi`. This means you no longer need to migrate both separately. However, if you already have `@koishijs/cli` installed, follow these steps to migrate:

1. First, complete the update to version 4.10.4, ensuring your version is at least 4.10.4.
2. 在依赖管理中，修改 koishi 的版本号到 4.11.0，并移除 @koishijs/cli
3. Click the "Apply Changes" button.

## HMR Update <badge>v4.12.0</badge>

In version 4.12.0, we moved the hot module replacement (HMR) functionality to a dedicated plugin, `@koishijs/plugin-hmr`. 如果你使用了 hmr 插件，你需要执行下列操作完成升级：

1. Install the latest version of `@koishijs/plugin-hmr`.
2. 修改你的配置文件，加上 [模块热替换](../guide/develop/script.md#hmr) 中提到的部分
3. Remove the `--watch` parameter from the `scripts.dev` section in your `package.json` file.

## Plugin Marketplace Update <badge>v4.13.0</badge>

In version 4.13.0, we split the `@koishijs/plugin-market` plugin into two separate plugins: `market` and `config`. The `market` plugin provides the "Plugin Market" and "Dependency Management" pages, while the `config` plugin manages the "Plugin Configuration" page. Users who update the `market` plugin only to version 2.0.0 or above will notice that their "Plugin Configuration" page disappears. To resolve this, follow these steps:

1. Ensure that your `market` plugin is updated to the latest version (version 2.0.0 or above).
2. Open the "Plugin Marketplace" page and install the latest version of the `config` plugin.
3. 打开「资源管理器」页面，找到 `koishi.yml` 文件，打开并编辑：

```yaml
host: 127.0.0.1
port: 5140
maxPort: 5149
plugins:
  ...
    ...
    config: {}         # Add this line, aligning the left indentation with the market plugin
    market:
      ...
    ...
```

4. Click the Save button in the upper right corner.
5. Restart the Koishi application

## Internationalization Update <badge>v4.13.0</badge>

In version 4.13.0, we also introduced a fallback mechanism for multiple languages. This means that any language configuration needs to be changed from a single string to an array. This affects the following options:

- Application global configuration `locale` → `i18n.locales`
- User and channel database field `locale` → `locales`
- Session object property `locale` → `locales`

Usually end users do not need to worry about these changes, but developers who use the above API should make the necessary migration.

## Protocol Update <badge>v4.14.5</badge>

In version 4.14.5, we upgraded Satori the protocol library to version 3 alpha. This new version of Satori introduces breaking changes related to paginated APIs. The affected APIs are as follows:

- `bot.getChannelList()`
- `bot.getFriendList()`
- `bot.getGuildList()`
- `bot.getGuildMemberList()`
- `bot.getGuildRoleList()`
- `bot.getMessageList()`
- `bot.getReactionList()`

These APIs will no longer return `Promise<T[]>` but instead return `Promise<List<T>>`, which includes a `data` field and an optional `next` field. The `data` field contains the data for the current page, and `next` field is the pagination token for the next page. Additionally, for each of the above APIs, there is an alternative version that returns an asynchronous iterator provided:

```ts
for (const item of await bot.getChannelList())  // old
for await (const item of bot.getChannelIter())  // new
```

## Protocol Update <badge>v4.15.0</badge>

In version 4.15.0, we upgraded Satori the protocol library to the stable version 3. This version introduces several breaking changes related to platform resources.

The `userId` property of the [`User`](../api/resources/user.md) type has been renamed to `id`, and similarly, the same applies to [`Channel`](../api/resources/channel.md), [`Guild`](../api/resources/guild.md), and [`Message`](../api/resources/message.md). Additionally, `Author` has been restructured into two parts: `User` and `Member`.

[`Session`](../api/core/session.md) includes an `event` property to store all event-related resources. 尽管我们在会话中提供了 [访问器属性](../api/core/session.md#accessor-property) 以保证了大部分 API 的向下兼容，但对于没有提供访问器的事件属性，或是在使用 Bot API 的返回值时，你都需要手动修改代码。

Base classes `Adapter.Server` and `Adapter.Client` have been removed. Now you can now directly use the base class [`Adapter`](../api/core/adapter.md), and the `reusable` property refers whether it can be reused.

[`Bot`](../api/core/bot.md) now implements the resource [`Login`](../api/resources/login.md), so user data will be stored in `bot.user`. Additionally, the property [`status`](../api/resources/login.md) has changed from a string to a numeric enumeration.

The type of [`encoder.results`](../api/message/encoder.md#encoder-results) has changed from `string[]` to `Message[]`.

A new method [`bot.createDirectChannel()`](../api/resources/channel.md) has been added to create private chat channels, so you no longer need to implement [`bot.sendPrivateMessage()`](../api/resources/message.md#bot-sendprivatemessage).

## Server Plugin Separation <badge>v4.16.0</badge>

In version 4.16.0, we separated the `Server` service from Koishi into an independent plugin, [@koishijs/plugin-server](../plugins/develop/server.md). The Koishi CLI would automatically migrate it, so end users who launch Koishi with the CLI don't need to take any action.

If you use Koishi with a programmactially method, follow these steps to complete the upgrade:

1. Install the latest version of the [@koishijs/plugin-server](../plugins/develop/server.md) plugin.
2. Manually import and load the plugin in your code.
3. Move your previous global settings for `host`, `port`, `maxPort`, and `selfUrl` to the server plugin configuration.

## 消息元素更新 <badge>v4.16.4</badge>

在 4.16.4 版本中，我们将 Koishi 内部的消息元素实现与 Satori 协议规范进行了对齐。涉及到以下 API 的变动：

- `<image>` 元素更名为 `<img>`
- `<img>`, `<audio>`, `<video>`, `<file>` 元素的 `url` 属性改为 `src`

如果你的插件用到了相关的特性，请参考下面的迁移指南：

- 如果你的插件**发送**了上述消息元素，你不需要进行任何修改
  - 官方适配器插件 (和积极维护的社区适配器插件) 都进行了向下兼容
  - 如果你使用了非官方的适配器并发现升级后无法发送图片，请联系适配器作者进行更新
- 如果你的插件**接收并解析**了上述消息元素，你可能需要调整你的解析逻辑
  - 要从给定的消息中提取图片，可以使用 [`h.select()`](../api/message/api.md#h-select) 方法
  - 如果你的指令接受图片作为参数，可以直接使用 [`image`](../guide/basic/command.md#argument-type) 参数类型

对于适配器作者，请参考下面的迁移指南：

- 接收侧 (`Adapter`)：请确保创建的会话中的消息元素均符合最新标准
- 发送侧 (`MessageEncoder`)：请尽量同时支持新旧标准，例如使用以下代码：

```ts
if (type === 'image' || type === 'img') {
  await sendImage(attrs.src || attrs.url)
}
```

## HTTP 插件独立 <badge>v4.17.6</badge>

在 4.17.6 版本中，我们将 HTTP 服务从 Koishi 中分离出来，独立成了 [@koishijs/plugin-http](../plugins/develop/http.md) 插件。The Koishi CLI would automatically migrate it, so end users who launch Koishi with the CLI don't need to take any action.

If you use Koishi with a programmactially method, follow these steps to complete the upgrade:

1. 安装最新版本的 [@koishijs/plugin-http](../plugins/develop/http.md) 插件；
2. (可选，如果你使用网络代理工具) 安装最新版本的 [@koishijs/plugin-proxy-agent](../plugins/develop/proxy-agent.md) 插件；
3. 在你的代码中手动导入并加载这两个插件；
4. 将你过去的 `request` 全局设置移动至 http 插件的配置项；
5. (可选) 将你过去的 `request.proxyAgent` 全局设置移动至 proxy-agent 插件的配置项。

## `tsconfig` 更新 <badge>v4.17.8</badge>

在 4.17.8 版本中，由于部分依赖的更新，我们对推荐的 `tsconfig.json` 配置进行了调整。如果你的项目使用了 TypeScript，并且在升级后发现无法通过编译，你可以打开 `tsconfig.json` 文件，并尝试执行下列修改以完成升级：

1. 将 `module` 属性改为 `esnext`；
2. 将 `moduleResolution` 属性改为 `bundler`；
3. 将 `emitDeclarationOnly` 属性改为 `true` (或者添加这个属性)。

```json{3-5}
{
  "compilerOptions": {
    "module": "esnext",
    "moduleResolution": "bundler",
    "emitDeclarationOnly": true,
  },
}
```

注意，如果你的项目中存在多个 `tsconfig.json` 文件，你需要对每一个文件都进行上述修改 (通过 `extends` 继承其他文件中配置的除外)。
