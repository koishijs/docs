# Publishing Plugins

Your plugin should be published onto npm before being available to Koishi users. But there are extra requirements for a valid plugin to be listed in the [marketplace](../../market/).

::: tip
These commands are should be run in the [workspace root](./config.md#应用目录).
:::

## Prerequisite

1. Let's start with the `package.json` file in your workspace directory.This file is crucial as it has all the meta information for publishing your plugin.

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

::: tip
There is a `package.json` file in your workspace root and in each plugin folder, please make sure the file opened is the one in the corresponding plugin folder.
:::

2. The following structure is an example of the above file:

```json title=package.json
{
  "name": "koishi-plugin-example",
  "version": "1.0.0",
  // ……
}
```

When publishing your plugin, the property `name` and `version` are required. We can see a package name prefix `koishi-plugin-`. The prefix is not only omitted in the marketplace to make it easier for users to search and install the plugin, but also prevents conflicts with other package names on npm.

::: tip
Each package name and updated version number is unique.If you use a duplicate name or number,  will get an error message and have to change them.
:::

## More information

The `package.json` is more than just name and version of the plugin. It also includes dependencies, description, contributors, license, keywords, and other information. These are part of the plugin too, so whenever you change them, it is important that you update a version first and then publish again.

### Requirements

::: tip
You may skip this section, if your plugin created using the boilerplate.
:::

The `package.json` in your plugin should meet the requirements below to appear in the marketplace:

- [`name`](https://docs.npmjs.com/cli/v8/configuring-npm/package-json#name) should match one of these formats:
  - koishi-plugin-\*
  - @bar/koishi-plugin-\*
  - @koishijs/plugin-\* (Official)
  - \* is a string of digits, lowercase letters and dashes
- [`name`](https://docs.npmjs.com/cli/v8/configuring-npm/package-json#name) is unique
- The [`version`](https://docs.npmjs.com/cli/v8/configuring-npm/package-json#version) be in the form `x. x. x` and should follow [semantic versioning guidelines](https://semver.org/lang/zh-CN/) (usually from `1.0.0`)
- [`peerDependencies`](https://docs.npmjs.com/cli/v8/configuring-npm/package-json#peerdependencies) must include `koishi`
- Do not set [`private`](https://docs.npmjs.com/cli/v8/configuring-npm/package-json#private) to `true`, otherwise your plugin cannot be published to npm
- Avoid [deprecating](https://docs.npmjs.com/deprecating-and-undeprecating-packages-or-package-versions) your plugin, unless you have a good reason to do so. For example, if you want to republish the plugin with a different name, you can use it to hide the old plugin on the marketplace.

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
    "koishi": "^4.3.2"
  }
}
```

- **contributors:** 插件维护者，应该是一个数组，其中的元素通常使用 `名字 <邮箱>` 的格式
- **license:** 插件许可证，你可以在 [这里](https://choosealicense.com/licenses/) 了解各种许可证的详细信息
- **homepage:** 插件主页，可以是一个网址 (比如你的 GitHub 项目地址)
- **repository:** 插件源码仓库，应该是一个对象，其中 `type` 字段指定仓库类型，`url` 字段指定仓库地址
- **keywords:** 插件关键词，应该是一个字符串数组，会用于插件市场中的搜索功能

### Koishi fields

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
    "locales": ["en", "zh"],                // 支持的语言
  }
}
```

- **description:** 插件描述，应该是一个对象，其中的键代表语言名，值是对应语言下的描述
- **service:** 插件的服务相关信息，具体包含下列属性：
  - **required:** 必需的服务，应该是一个服务名构成的数组
  - **optional:** 可选的服务，应该是一个服务名构成的数组
  - **implements:** 实现的服务，应该是一个服务名构成的数组
- **locales:** 插件支持的语言，应该是一个语言名构成的数组
- **hidden:** 配置为 `true` 可以让插件市场中不显示该插件 (通常情况下你不需要这么做)

## Publish Your Plugin

编辑完上面的清单文件并 [构建源代码](./workspace.md#构建源代码) 后，你就可以公开发布你的插件了。

::: tabs code
```npm
npm run pub [...name]
```
```yarn
yarn pub [...name]
```
:::

- **name:** 要发布的插件列表，缺省时表示全部 (此处 `name` 不包含 `koishi-plugin-` 前缀，而是你的工作区目录名)

这将发布所有版本号发生变动的插件。

如果你配置了国内镜像，你可能会遇到以下的错误提示：

```text
No token found and can't prompt for login when running with --non-interactive.
```

此时你需要将镜像源重置，并重新登录 npm 账号：

::: tabs code
```npm
npm config delete registry
npm login
```
```yarn
yarn config delete registry
yarn login
```
:::

发布成功后，你可以将镜像重新设置为国内镜像，以保证后续的下载速度。

## 更新插件版本

初始创建的插件版本号为 `1.0.0`。当你修改过插件后，你需要更新版本号才能重新发布。在应用目录运行下面的命令以更新版本号：

::: tabs code
```npm
npm run bump [...name] [-1|-2|-3|-p|-v <ver>] [-r]
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
- 缺省情况：按照当前版本的最后一位递增

当进行此操作时，其他相关插件的依赖版本也会同步更新，确保所有工作区内依赖的插件版本一致。进一步，如果你希望更新了依赖版本的插件也同时更新自身的版本，那么可以附加 `-r, --recursive` 选项。
