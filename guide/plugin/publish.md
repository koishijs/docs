# 发布插件

为了让别人更方便地使用你编写的插件，你需要将其作为一个 npm 包进行发布。只需满足一定的规范，你的插件就能显示在 [插件市场](../../market.md) 中，其他人就可以通过控制台来安装它。

::: tip
- 想要了解发布工作区插件的具体操作，请前往 [插件开发](../../manual/cli/development.md#发布插件)
- 想要了解更多关于发布 npm 包的知识，请参考 [这篇文档](https://docs.npmjs.com/packages-and-modules/contributing-packages-to-the-registry)
:::

## 基本要求

要想显示在插件市场中，插件的 `package.json` 需要满足以下基本要求：

- 符合 `package.json` 本身的要求
- 包名必须符合以下格式之一：
  - koishi-plugin-foo
  - @bar/koishi-plugin-foo
  - @koishijs/plugin-foo (官方插件)
- 必须声明 `koishi` 作为 [同版本依赖](https://docs.npmjs.com/cli/v8/configuring-npm/package-json#peerdependencies)
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

## 添加相关信息

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
- **homepage:** 插件主页，可以是一个网址 (也可以放你的 GitHub 项目地址)
- **keywords:** 插件关键词，应该是一个字符串数组，会用于插件市场中的搜索功能

## `koishi` 字段

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
