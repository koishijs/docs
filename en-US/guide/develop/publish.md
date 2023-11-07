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

- **contributors:** plugin maintainers, should be an array. The elements usually follow the format `Name <Email>`.
- **license:** license under your plugins You can find detailed information about [various licenses here](https://choosealicense.com/licenses/).
- **homepage:** homepage for your plugin, which can be a URL (e.g. your GitHub project address).
- **repository:** source code repository of the plugin, which should be an object. The `type` field specifies the type of repository, and the `url` field specifies the repository address.
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
- **preview:** If set to `true`, this allows the plugin to be displayed as “under development”.
- **hidden:** If set to `true`, this prevents the plugin from being displayed in the marketplace (you usually don’t need to do this).

::: tip
Additionally, there are some fields related to the deployment process of [Koishi Online](../../cookbook/practice/online.md) (such as `browser`, `exports`, etc.). Since they do not affect the mainline development, you can learn about them later.
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
It will take some time for the marketplace to include your plugin (usually within 15 minutes), sit back and relax.
:::

::::tip
If you are in China and have configured a mirror, you may encounter the following error hint:

```text
No token found and can't prompt for login when running with --non-interactive.
```

此时你需要在发布时使用官方镜像，具体操作如下：

::: tabs code
```npm
npm run pub [...name] -- --registry https://registry.npmjs.org
```
```yarn
yarn pub [...name] --registry https://registry.yarnpkg.com
```
:::

对于 Yarn v2 及以上版本，你还可以分别针对发布和安装设置不同的镜像：

::: tabs code
```yarn
# 安装时使用国内镜像
yarn config set npmRegistryServer https://registry.npmmirror.com
# 发布时使用官方镜像
yarn config set npmPublishRegistry https://registry.yarnpkg.com
```
:::  
:
:::

## Updating version

Version default starts from `1.0.0`. Its number needs to be updated before releasing changes. Run the command in the workspace root to update that:

::: tabs code
```npm
npm run bump [...name] -- [-1|-2|-3|-p|-v <ver>] [-r]
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
- **-r, --recursive:** 递归更新依赖版本
- Default: incremented by the last of the release version number

When updating the version of a plug-in, the versions of dependencies that rely on this plug-in will also be upgraded to ensure consistency in the workspace.Moreover, if you wish for the versions of plug-ins that depend on this plug-in to be updated in sync, you can append the `-r, --recursive` option.
