# Publishing Plugins

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
  - `@koishijs/plugin-*` (官方插件)
  - 其中 `*` 是由数字、小写字母和连字符 `-` 组成的字符串
- [`name`](https://docs.npmjs.com/cli/v10/configuring-npm/package-json#name) 不能与已发布的插件重复或相似
- [`version`](https://docs.npmjs.com/cli/v10/configuring-npm/package-json#version) 应当符合 [语义化版本](https://semver.org/lang/zh-CN/) (通常从 `1.0.0` 开始)
- [`peerDependencies`](https://docs.npmjs.com/cli/v10/configuring-npm/package-json#peerdependencies) 必须包含 `koishi`
- 不能声明 [`private`](https://docs.npmjs.com/cli/v10/configuring-npm/package-json#private) 为 `true` (否则你的插件无法发布)
- Avoid [deprecating](https://docs.npmjs.com/deprecating-and-undeprecating-packages-or-package-versions) of the latest version unless there is a valid reason to do so. For example, if you intend to re-release the plugin under a different name, it can be used to hide the old plugin on the marketplace.

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

除此以外，我们还提供了一个额外的 `koishi` 字段，用于指定与 Koishi 相关的信息。

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
    "locales": ["en", "zh"],                // 支持的语言
  }
}
```

- **description:** 插件描述，应该是一个对象，其中的键代表语言名，值是对应语言下的描述
- **service:** 插件的服务相关信息，具体包含下列属性：
  - **implements:** services that your plugin implements, represented as an array of service names.
- **locales:** This refers to the languages supported by the plugin, represented as an array of language names.
- **preview:** Configure `true` to allow plugin to be displayed as "developing" status
- **hidden:** If set to true, this prevents the plugin from being displayed in the marketplace (you usually don’t need to do this).

:::tip
Furthermore, there are certain aspects related to the deployment process of [Koishi Online](../../cookbook/practice/online.md), including browsers, exports, and more.Since they do not affect the mainline development, you can learn about them later.
:::

## Publishing Plugins

Congratulations! It's time to publish your plugin, after editing the file above and [build source](./workspace.md##build-source-code).

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

:::tip
It takes some time for the plugin to be successfully published to the plugin marketplace (usually within 15 minutes). Please be patient.
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
