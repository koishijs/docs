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
    "description": {                        // descriptions in different languages
      "en": "English Description",
      "zh": "中文描述"
    },
    "service": {
      "required": ["database"],             // dependent services of required
      "optional": ["assets"],               // dependent services of optional
      "implements": ["dialogue"],           // services provided by the itself
    },
    "locales": ["en", "zh"],                // supported languages
  }
}
```

- **description:** 插件描述，应该是一个对象，其中的键代表语言名，值是对应语言下的描述
- **service:** 插件的服务相关信息，具体包含下列属性：
  - **required:** 必需的服务，应该是一个服务名构成的数组
  - **optional:** 可选的服务，应该是一个服务名构成的数组
  - **implements:** 实现的服务，应该是一个服务名构成的数组
- **locales:** 插件支持的语言，应该是一个语言名构成的数组
- **preview:** 配置为 `true` 可以让插件显示为「开发中」状态
- **hidden:** 配置为 `true` 可以让插件市场中不显示该插件 (通常情况下你不需要这么做)

::: tip
此外，还有一些其他的字段与 [Koishi Online](../../cookbook/practice/online.md) 相关。由于不影响主线开发，你可以稍后再进行了解。
:::

## Publish your plugin

Congratulations! It's time to publish your plugin, after editing the file above and [build source](./workspace.md#构建源代码).

::: tabs code
```npm
npm run pub [...name]
```
```yarn
yarn pub [...name]
```
:::

- **name:** list of plugins to be published, all by default ( `name` is your plugin directory name)

This will be released of all plugins that have changed version numbers.

::: tip
从插件成功发布到进插件市场需要一定的时间 (通常在 15 分钟内)，请耐心等待。
:::

:::: tip
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

发布成功后，你可以将镜像重新设置为国内镜像，以保证后续的下载速度。 :
:::

## Updating version

Version default starts from `1.0.0`. Its number needs to be updated before releasing changes. Run the command in the workspace root to update that:

::: tabs code
```npm
npm run bump [...name] [-1|-2|-3|-p|-v <ver>] [-r]
```
```yarn
yarn bump [...name] [-1|-2|-3|-p|-v <ver>] [-r]
```
:::

- **name: ** Mandatory field. List of plugins.
- **-1, --major:** To the next major version, e.g. `3.1.4` -> `4.0.0`.
- **-2, --minor:** To the next minor version, e.g. `3.1.4` -> `3.2.0`.
- **-3, --patch:** To the next patch version, e.g. `3.1.4` -> `3.1.5` .
- **-p, --prereelease:** to next preview version:
  - To `beta.0` if the release is `alpha.x`
  - To `rc.0` if the release is `beta.x`
  - Remove the prerelease section if the release is `rc.x`
  - Otherwise, to the next major version of `alpha.0`
- **-v, --version:** set specific version
- Default: incremented by the last of the release version number

当进行此操作时，其他相关插件的依赖版本也会同步更新，确保所有工作区内依赖的插件版本一致。进一步，如果你希望更新了依赖版本的插件也同时更新自身的版本，那么可以附加 `-r, --recursive` 选项。
