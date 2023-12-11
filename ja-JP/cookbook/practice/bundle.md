# 整合包开发 <badge type="warning">实验性</badge>

正如 [深入工作区](../design/workspace.md) 一文所说，对于普通的插件开发者，我们不建议将模板项目提交到 Git 仓库中。但凡事总有例外——如果你想要分发的不是插件而是成品机器人本身，那么你就需要提交根工作区了。像这种包含根工作区的仓库被称为 **整合包 (Bundle)**。

## はじめに

:::tip
在开始之前，我们推荐你创建一个全新的模板项目。由于整合包功能还在开发中，模板项目的结构可能随时发生更改。使用全新的模板项目可以确保你可以顺利完成后续流程。
:::

在本地的模板项目下进入命令行，执行以下命令：

```sh
git init
```

好了，这个模板项目现在已经是一个整合包了。你可以将它公开发布到 GitHub 供更多人使用 (当然也可以不公开发布，就只给自己机器人做个版本管理也不错)。

## 管理环境变量

:::warning
使用环境变量管理隐私信息存在一些局限性，并不是最好的方案。未来我们会提供更通用的解决方案，但目前可以先用下面的方法。
:::

接下来，你需要对你的机器人进行配置了。但请注意你的配置文件将会被提交，因此请确保不要将任何隐私信息写入配置文件中。正确的做法是创建一个用于存放环境变量的 `.env.local` 文件，并在配置文件中引用这些环境变量。

```yaml title=koishi.yml
plugins:
  adapter-discord:
    $if: env.DISCORD_TOKEN
    token: ${{ env.DISCORD_TOKEN }}
```

```sh title=.env.local
DISCORD_TOKEN = QwErTyUiOpAsDfGhJkLzXcVbNm
```

::: tip
以下是 `.env` 和 `.env.local` 文件的区别：

- `.env` 会被提交到 Git 仓库中 (因此请勿包含任何隐私信息)。
- `.env.local` 有着更高的优先级，且不会被提交到 Git 仓库中。

Koishi 的模板项目已经包含了一个 `.env` 文件。通常情况下你都不需要用到这个文件，因为不含有隐私信息的配置项都可以直接在 `koishi.yml` 中进行修改。
:::

## 添加私有插件

:::warning
我们不推荐这种行为。私有插件无法在不重启的情况下热更新，这将严重影响你机器人的 SLA。
:::

如果你想要在整合包中使用私有插件，只需在 `packages` 目录下创建一个子工作区即可：

```diff{7-11A}
root
├── external
│   └── foo                     # 公开插件
│       ├── src
│       │   └── index.ts
│       └── package.json
├── packages
│   └── bar                     # 私有插件
│       ├── src
│       │   └── index.ts
│       └── package.json
├── koishi.yml
└── package.json
```

在上图中，`foo` 是一个公开插件，`bar` 则是一个私有插件。它们的开发方式完全相同，唯一的区别就是前者有着独立的工作区仓库，而后者没有。在 `bar` 工作区下的 `package.json` 中设置 `private` 为 `true` 可以防止你不小心将私有插件发布到 npm 上。

## 持续集成

模板项目中自带的 `.github` 目录包含了一系列构建工作流。如果你的整合包是公开的，那么你可以在 GitHub 上自动构建和发布你的整合包。你要做的只有一件事：修改整合包的版本号。

目前的所有工作流都基于整合包的版本号。当根工作区的版本号变动时，所有的工作流将开始运行。一次完整的发布将包含适用于 Koishi Desktop、Koishi Android 的完整环境，甚至是 Docker 镜像和 npm 包。部分流程需要配置 actions secrets，可以参考下面的列表：

- DOCKER\_USERNAME
- DOCKER\_PASSWORD
- NPM\_TOKEN
