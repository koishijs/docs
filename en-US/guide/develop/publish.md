# Publish your plugin

Your plugin should be published onto npm before being available to Koishi users.
只需满足一定的规范，你的插件就能显示在 [插件市场](../../market/) 中，其他人可以通过控制台来安装它。

:::tip
本节中介绍的命令行都需要在 [应用目录](./config.md#应用目录) 下运行。
:::

## Prerequisite

首先让我们关注插件目录中的 `package.json` 文件。This file is crucial as it has all the meta information for publishing your plugin.

```diff{6}
root
├── plugins
│   └── example
│       ├── src
│       │   └── index.ts
│       └── package.json        # the file we concern about
├── koishi.yml
└── package.json                # not this
```

:::tip
There is a `package.json` file in your workspace root and in each plugin folder,please make sure the file opened is the one in the corresponding plugin folder.
:::

2. The following structure is an example of the above file:

```json title=package.json
{
  "name": "koishi-plugin-example",
  "version": "1.0.0",
  // ……
}
```

其中最重要的属性有两个：`name` 是要发布的包名，`version` 是当前版本号。可以看到，这里的包名相比实际在插件市场中看到的插件名多了一个 `koishi-plugin-` 的前缀，这使得我们很容易区分 Koishi 插件与其他 npm 包，同时也方便了用户安装和配置插件。

:::tip
请注意：包名和版本号都是唯一的：包名不能与其他已经发布的包相同，而同一个包的同一个版本号也只能发布一次。 你可以自行根据错误提示更改包名或更新插件版本。
:::

## More information

The `package.json` of a plugin contains more than just name and version. It comprises dependencies, description, contributors, license, keywords and other details relevant to the plugin.Each time one of these elements is changed,you need to [update the version](#updating-version) and [reissue the plugin](#publishing-plugins-1)

### Requirements

:::tip
You may skip this section, if your plugin created using the boilerplate.
:::

The `package.json` in your plugin should meet the requirements below to appear in the marketplace:

- [`name`](https://docs.npmjs.com/cli/v8/configuring-npm/package-json#name) should match one of these formats:
  - `koishi-plugin-*`
  - `@bar/koishi-plugin-*`
  - `@koishijs/plugin-*` (official plugin)
  - 其中 `*` 是由数字、小写字母和连字符 `-` 组成的字符串
- [`name`](https://docs.npmjs.com/cli/v10/configuring-npm/package-json#name) is unique
- [`version`](https://docs.npmjs.com/cli/v10/configuring-npm/package-json#version) should match [semantic version](https://semver.org/) (usually from `1.0.0`)
- [`peerDependencies`](https://docs.npmjs.com/cli/v10/configuring-npm/package-json#peerdependencies) must contain `koishi`
- Could not declare [`private`](https://docs.npmjs.com/cli/v10/configuring-npm/package-json#private) to `true` (otherwise your plugin cannot be published)
- 最新版本不能被 [弃用](https://docs.npmjs.com/deprecating-and-undeprecating-packages-or-package-versions)

Example:

```json title=package.json
{
  "name": "koishi-plugin-example",
  "version": "1.0.0",
  "peerDependencies": {
    "koishi": "^4.3.2"
  }
}
```

### The `package.json` file

To make more information available to Koishi users, you could add more comprehensive fields in the `package.json` of your plugin.

```json title=package.json
{
  "name": "koishi-plugin-example",
  "version": "1.0.0",
  "contributors": [
    "Alice <alice@gmail.com>",
    "Bob <bob@gmail.com>"
  ],
  "license": "MIT",
  "homepage": "https://example.com",
  "repository": {
    "type": "git",
    "url": "git+https://github.com/alice/koishi-plugin-example.git"
  },
  "keywords": ["example"],
  "peerDependencies": {
    "koishi": "^4.15.6"
  }
}
```

- **contributors:** plugin maintainers, should be an array. The elements usually follow the format `Name <Email>`.
- **license:** plugin license, you can learn details about various licenses in [here](https://choosealicense.com/licenses/)
- **homepage:** homepage for your plugin, which can be a URL (e.g. your GitHub project address).
- **repository:**  source code repository of the plugin, which should be an object. The `type` field specifies the type of repository, and the `url` field specifies the repository address.
- **keywords:** keywords for the plugin, which should be an array of strings. They are used for the search function in the plug-in market.

:::tip
`package.json` 中还有一些字段没有在这里提及，如果你对此感兴趣，可以前往 [npmjs.com](https://docs.npmjs.com/files/package.json/) 查看文档。
:::

### `koishi` 字段

We can also use the `koishi` field to specify Koishi related information

```json title=package.json
{
  "name": "koishi-plugin-dialogue",
  "version": "1.0.0",
  "peerDependencies": {
    "koishi": "^4.3.2"
  },
  "koishi": {
    "description": {                        // 不同语言的插件描述
      "en": "English Description",
      "zh": "中文描述"
    },
    "service": {
      "required": ["database"],             // 必需的服务
      "optional": ["assets"],               // 可选的服务
      "implements": ["dialogue"],           // 实现的服务
    },
  }
}
```

- **description:** This refers to the description of the plugin, which should be an object. The keys represent the language names, and the values are the descriptions in the corresponding languages.
- **service:** 插件的服务相关信息，详情请参见 [服务与依赖](../plugin/service.html#package-json)
- **preview:** Configure `true` to allow plugin to be displayed as "developing" status
- **hidden:** If set to true, this prevents the plugin from being displayed in the marketplace (you usually don’t need to do this).

:::tip
Furthermore, there are certain aspects related to the deployment process of [Koishi Online](../../cookbook/practice/online.md), including browsers, exports, and more.Since they do not affect the mainline development, you can learn about them later.
:::

## Publish your plugin

编辑完上面的清单文件并 [构建源代码](./workspace.md#build) 后，你就可以公开发布你的插件了。

:::tabs code

```npm
npm run pub [...name]
```

```yarn
yarn pub [...name]
```

:::

- **name:** list of plugins to be published, all by default (`name` is your directory name)

This will be released of all plugins that have changed version numbers.

::: tip
从插件成功发布到进插件市场需要一定的时间 (通常在 15 分钟内)，请耐心等待。

如果发布时多次失败或者长时间无响应，可以添加 `--debug` 选项以显示调试信息。

```npm
npm run pub [...name] --debug
```

```yarn
yarn pub [...name] --debug
```

:::

If you are in China and have configured a mirror, you may encounter the following error hint:

```text
No token found and can't prompt for login when running with --non-interactive.
```

You need to use official mirrors when publishing at this time, following:

:::tabs code

```npm
npm run pub [...name] -- --registry https://registry.npmjs.org
```

```yarn
yarn pub [...name] --registry https://registry.yarnpkg.com
```

:::

对于 Yarn v2 及以上版本，你还可以分别针对发布和安装设置不同的镜像：

:::tabs code

```yarn
# 安装时使用国内镜像
yarn config set npmRegistryServer https://registry.npmmirror.com
# 发布时使用官方镜像
yarn config set npmPublishRegistry https://registry.yarnpkg.com
```

:::
::::

## Updating version

初始创建的插件版本号为 `1.0.0`。Its number needs to be updated before releasing changes. Run the command in the workspace root to update that:

:::tabs code

```npm
npm run bump [...name] -- [-1|-2|-3|-p|-v <ver>] [-r]
```

```yarn
yarn bump [...name] [-1|-2|-3|-p|-v <ver>] [-r]
```

:::

- **name:** 要更新的插件列表，不能为空
- **-1, --major:** 跳到下一个大版本，例如 `3.1.4` -> `4.0.0`
- **-2, --minor:** 跳到下一个中版本，例如 `3.1.4` -> `3.2.0`
- **-3, --patch:** 跳到下一个小版本，例如 `3.1.4` -> `3.1.5`
- **-p, --prerelease:** 跳到下一个预览版本，具体行为如下
  - 如果当前版本是 `alpha.x`，则跳到 `beta.0`
  - 如果当前版本是 `beta.x`，则跳到 `rc.0`
  - 如果当前版本是 `rc.x`，则移除 prerelease 部分
  - 其他情况下，跳到下一个大版本的 `alpha.0`
- **-v, --version:** 设置具体的版本号
- **-r, --recursive:** 递归更新依赖版本
- Default: incremented by the last of the release version number

When updating the version of a plug-in, the versions of dependencies that rely on this plug-in will also be upgraded to ensure consistency in the workspace.进一步，如果你希望更新了依赖版本的插件也同时更新自身的版本，那么可以附加 `-r, --recursive` 选项。

## 弃用插件 {#deprecate}

如果你不再维护某个插件，或者你希望更换一个名字重新发布，那么你可以弃用该插件。在任意目录运行下面的命令以弃用插件：

```sh
npm deprecate <full-name> <message>
# 例如
npm deprecate koishi-plugin-example "this plugin is deprecated"
```

请注意这里要写出的是完整的包名，而不是插件的目录名。

你也可以弃用某个特定版本或版本区间 (默认情况下将弃用所有版本)：

```sh
npm deprecate <full-name>[@<version>] <message>
```

弃用插件的最新版本后，该插件将不再显示在插件市场中。未来你仍然可以发布新版本，这将使你的插件重新进入插件市场。
