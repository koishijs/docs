# 分类与评分细则

## 清单文件

插件的 [`package.json`](../guide/develop/publish.md#准备工作) 文件包含了插件几乎所有的信息。开发者可以通过编辑该文件让用户更块地找到并了解插件。

### 准入条件

要想显示在插件市场中，插件的 [`package.json`](../guide/develop/publish.md#准备工作) 需要满足以下基本要求：

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

## 插件的分类

我们目前提供了 14 个分类。它们分别是：

- 核心功能
- 适配器
- 存储服务
- 扩展功能
- 控制台
- 管理工具
- 行为预设
- 图片服务
- 资讯服务
- 实用工具
- 人工智能
- 趣味交互
- 娱乐玩法
- 游戏工具

插件的分类由 Koishi 团队成员负责维护，通常在插件发布后的一周内完成。极少数不适宜的插件不会属于任何类别。如果你认为你的插件没有被正确分类，可以提交议题进行反馈。

## 插件的评分

插件市场中的插件会根据其评分进行排序。评分由多个指标加权计算得到，下面列举出了一些常见的指标：

- 插件是否开源
- 插件是否被标记为不安全 / 开发中
- 插件的下载量
- 插件的安装体积

## 补充说明

下面的一些小技巧可能会改善你的插件的展示效果。

### 添加头像到 Gravatar

### 在描述中使用 Markdown
