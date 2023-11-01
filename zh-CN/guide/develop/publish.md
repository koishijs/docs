# 发布插件

为了让别人更方便地使用你编写的插件，你需要将其作为一个 npm 包进行发布。只需满足一定的规范，你的插件就能显示在 [插件市场](../../market/) 中，其他人就可以通过控制台来安装它。

::: tip
本节中介绍的命令行都需要在 [应用目录](./config.md#应用目录) 下运行。
:::

## 准备工作

首先让我们关注工作区目录中的 `package.json` 文件。这个文件非常重要，它包含了要发布插件的一切元信息。

```diff{6}
root
├── plugins
│   └── example
│       ├── src
│       │   └── index.ts
│       └── package.json        # 你应该修改这里
├── koishi.yml
└── package.json                # 而不是这里
```

::: tip
请注意 `package.json` 文件不是唯一的，它在应用目录和每个插件目录都会存在。请确保你修改了正确的文件。
:::

打开上述文件，你会看到它大概长这样：

```json title=package.json
{
  "name": "koishi-plugin-example",
  "version": "1.0.0",
  // ……
}
```

其中最重要的属性有两个：`name` 是要发布的包名，`version` 是包的版本号。这里的包名相比实际在插件市场中看到的插件名多了一个 `koishi-plugin-` 的前缀，这样既方便了用户安装和配置，又防止了污染命名空间。

::: tip
请注意：包名和版本号都具有唯一性。包名不能与其他已经发布的包相同，而同一个包的同一个版本号也只能发布一次。如果出现了包名冲突或版本号冲突，则会在之后的发布流程中出现错误提示。你可以自行根据错误提示更换包名或更新插件版本。
:::

## 补充更多信息

除了包名和版本号以外，`package.json` 还包括了插件的依赖、描述、贡献者、许可证、关键词等更多信息。你并不需要一上来就把所有信息都填写完整，因为你可以随后再进行修改。但请别忘了，这些内容也是插件的一部分，修改完成后别忘了 [更新版本](#更新插件版本) 并 [再次发布](#发布插件)。

### 准入条件

::: tip
使用模板项目创建的插件一定是符合要求的，因此你可以跳过这一节。
:::

要想显示在插件市场中，插件的 `package.json` 需要满足以下基本要求：

- [`name`](https://docs.npmjs.com/cli/v8/configuring-npm/package-json#name) 必须符合以下格式之一：
  - koishi-plugin-\*
  - @bar/koishi-plugin-\*
  - @koishijs/plugin-\* (官方插件)
  - 其中 \* 是由数字、小写字母和连字符组成的字符串
- [`name`](https://docs.npmjs.com/cli/v8/configuring-npm/package-json#name) 不能与已发布的插件重复或相似
- [`version`](https://docs.npmjs.com/cli/v8/configuring-npm/package-json#version) 应当符合 [语义化版本](https://semver.org/lang/zh-CN/) (通常从 `1.0.0` 开始)
- [`peerDependencies`](https://docs.npmjs.com/cli/v8/configuring-npm/package-json#peerdependencies) 必须包含 `koishi`
- 不能声明 [`private`](https://docs.npmjs.com/cli/v8/configuring-npm/package-json#private) 为 `true` (否则你的插件无法发布)
- 最新版本不能被 [弃用](https://docs.npmjs.com/deprecating-and-undeprecating-packages-or-package-versions) (一种常见的情况是：你已经发布了某个插件，又希望更换一个名字重新发布，此时你可以通过弃用的方式让旧的名字不显示在插件市场中)

一个符合上述标准的示例：

```json title=package.json
{
  "name": "koishi-plugin-example",
  "version": "1.0.0",
  "peerDependencies": {
    "koishi": "^4.3.2"
  }
}
```

### 添加相关信息

除去上面的基本要求外，`package.json` 中还有一些字段能帮助显示插件的相关信息。

```json title=package.json
{
  "name": "koishi-plugin-example",
  "version": "1.0.0",
  "contributors": [                         // 贡献者
    "Alice <alice@gmail.com>",
    "Bob <bob@gmail.com>"
  ],
  "license": "MIT",                         // 许可证
  "homepage": "https://example.com",        // 主页
  "repository": {                           // 源码仓库
    "type": "git",
    "url": "git+https://github.com/alice/koishi-plugin-example.git"
  },
  "keywords": ["example"],                  // 关键词
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

### koishi 字段

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
  - **required:** 必需的服务，应该是一个服务名构成的数组
  - **optional:** 可选的服务，应该是一个服务名构成的数组
  - **implements:** 实现的服务，应该是一个服务名构成的数组
- **locales:** 插件支持的语言，应该是一个语言名构成的数组
- **preview:** 配置为 `true` 可以让插件显示为「开发中」状态
- **hidden:** 配置为 `true` 可以让插件市场中不显示该插件 (通常情况下你不需要这么做)

::: tip
此外，还有一些字段与 [Koishi Online](../../cookbook/practice/online.md) 的部署流程相关 (如 `browser`, `exports` 等)。由于不影响主线开发，你可以稍后再进行了解。
:::

## 发布插件

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

发布成功后，你可以将镜像重新设置为国内镜像，以保证后续的下载速度。
::::

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
