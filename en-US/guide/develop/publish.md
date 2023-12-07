# Publishing Plugins

Your plugin should be published onto npm before being available to Koishi users.
But there are extra requirements for a valid plugin to be listed in the [marketplace](../../market/).

:::tip
本节中介绍的命令行都需要在 [应用目录](./config.md#应用目录) 下运行。
:::

## Prerequisite

Let's start with the `package.json` file in your workspace directory.This file is crucial as it has all the meta information for publishing your plugin.

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

When publishing your plugin, the property `name` and `version` are required.We can see a package name prefix `koishi-plugin-`. The prefix is not only omitted in the marketplace to make it easier for users to search and install the plugin, but also prevents conflicts with other package names on npm.

:::tip
Note: package name and version number are unique.If you use a duplicate name or number,  will get an error message and have to change them.
:::

## More information

The `package.json` of a plugin contains more than just name and version. It comprises dependencies, description, contributors, license, keywords and other details relevant to the plugin.Each time one of these elements is changed,you need to [update the version](#updating-version) and [reissue the plugin](#publishing-plugins-1)

### Requirements

:::tip
You may skip this section, if your plugin created using the boilerplate.
:::

The `package.json` in your plugin should meet the requirements below to appear in the marketplace:

- [`name`](https://docs.npmjs.com/cli/v8/configuring-npm/package-json#name) should match one of these formats:
  - koishi-plugin-\*
  - @bar/koishi-plugin-\*
  - @koishijs/plugin-\* (Official)
  - \* is a string of digits, lowercase letters and dashes
- [`name`](https://docs.npmjs.com/cli/v8/configuring-npm/package-json#name) is unique
- [`version`](https://docs.npmjs.com/cli/v8/configuring-npm/package-json#version) should match [semantic version](https://semver.org/) (usually from `1.0.0`)
- [`peerDependencies`](https://docs.npmjs.com/cli/v8/configuring-npm/package-json#peerdependencies) must contain `koishi`
- Could not declare [`private`](https://docs.npmjs.com/cli/v8/configuring-npm/package-json#private) to `true` (otherwise your plugin cannot be published)
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

- **description:** This refers to the description of the plugin, which should be an object. The keys represent the language names, and the values are the descriptions in the corresponding languages.
- **service:** This pertains to the service-related information of the plugin, which includes the following attributes:
  - **required:** necessary services, represented as an array of service names.
  - **optional:** optional services, also represented as an array of service names.
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
