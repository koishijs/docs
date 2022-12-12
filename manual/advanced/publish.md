# 发布插件

为了让别人更方便地使用你编写的插件，你需要将其作为一个 npm 包进行发布。只需满足一定的规范，你的插件就能显示在 [插件市场](../../market.md) 中，其他人就可以通过控制台来安装它。

::: tip
本节中介绍的命令行都需要在 [应用目录](./config.md#应用目录) 下运行。
:::

## 编辑清单文件

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

### 基本要求

要想显示在插件市场中，插件的 `package.json` 需要满足以下基本要求：

- [`name`](https://docs.npmjs.com/cli/v8/configuring-npm/package-json#name) 必须符合以下格式之一：
  - koishi-plugin-\*
  - @bar/koishi-plugin-\*
  - @koishijs/plugin-\* (官方插件)
  - 其中 \* 是由数字、小写字母和连字符组成的字符串
- [`name`](https://docs.npmjs.com/cli/v8/configuring-npm/package-json#name) 不能与已发布的插件重复或相似
- [`peerDependencies`](https://docs.npmjs.com/cli/v8/configuring-npm/package-json#peerdependencies) 必须包含 `koishi`
- 不能声明 [`private`](https://docs.npmjs.com/cli/v8/configuring-npm/package-json#private) 为 `true`
- 最新版本不能被 [弃用](https://docs.npmjs.com/deprecating-and-undeprecating-packages-or-package-versions)

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
  "author": "Alice <alice@gmail.com>",      // 作者
  "maintainers": [                          // 维护者
    "Bob <bob@gmail.com>"
  ],
  "license": "MIT",                         // 许可证
  "homepage": "https://example.com",        // 主页
  "keywords": ["example"],                  // 关键词
  "peerDependencies": {
    "koishi": "^4.3.2"
  }
}
```

- **author:** 插件作者，通常使用 `名字 <邮箱>` 的格式
- **maintainers:** 插件维护者，应该是一个数组，其中元素格式同上
- **license:** 插件许可证，你可以在 [这里](https://choosealicense.com/licenses/) 了解各种许可证的详细信息
- **homepage:** 插件主页，可以是一个网址 (比如你的 GitHub 项目地址)
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

## 发布工作区插件

编辑完上面的清单文件并 [构建源代码](./workspace.md#构建源代码) 后，你就可以公开发布你的插件了。

::: tabs code
```npm
npm run pub [...name]
```
```yarn
yarn pub [...name]
```
:::

- **name:** 要发布的插件列表，缺省时表示全部

这将将发布所有版本号发生变动的插件。

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

## 了解更多

想要了解更多关于发布 npm 包的知识，请参考 [这篇文档](https://docs.npmjs.com/packages-and-modules/contributing-packages-to-the-registry)。
