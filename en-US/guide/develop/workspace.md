# Workspace Development

The core of Koishi is its plugin system, with the vast majority of Koishi's functionalities being implementable through plugins. This chapter will introduce how to develop and build your own Koishi plugins using the template project.

:::tip
本节中介绍的命令行都需要在 [应用目录](./config.md#应用目录) 下运行。
:::

## Create a New Plugin

Run the following command in the workspace root to create a new plugin workspace:

:::tabs code

```npm
npm run setup [name] -- [-c] [-m] [-G]
```

```yarn
yarn setup [name] [-c] [-m] [-G]
```

:::

- **name:** 插件的包名，缺省时将进行提问
- **-c, --console:** 创建一个带控制台扩展的插件
- **-m, --monorepo:** 创建 monorepo 的插件
- **-G, --no-git:** 跳过 git 初始化

我们假设你创建了一个叫 `example` 的插件。you will see the following directory structure:

```diff{3-6}
root
├── external
│   └── example
│       ├── src
│       │   └── index.ts
│       └── package.json
├── koishi.yml
└── package.json
```

打开 `index.ts` 文件，并修改其中的代码：

```ts{6-11}
import { Context } from 'koishi'

export const name = 'example'

export function apply(ctx: Context) {
  // 如果收到“天王盖地虎”，就回应“宝塔镇河妖”
  ctx.on('message', (session) => {
    if (session.content === '天王盖地虎') {
      session.send('宝塔镇河妖')
    }
  })
}
```

以 [开发模式](./script.md#开发模式) 重新运行你的项目，点击右上角的「添加插件」按钮，选择你刚才创建的插件名称，你会立即在网页控制台的配置界面中看到 `example` 插件。Just click to enable it, and you can interact with the bot:

<chat-panel>
<chat-message nickname="Alice">Hello</chat-message>
<chat-message nickname="Koishi">world</chat-message>
</chat-panel>

### Create a Scoped Plugin

If you find that the plugin name you want to create is already taken, in addition to thinking of a new name or adding numbers to it, you can opt to create a scoped plugin. 私域插件使用你自己的 [npm 用户名](./setup.md#注册-npm) 作为包名前缀，因此不用担心与其他人的插件冲突。

假设你的 npm 用户名是 `alice`，那么你可以使用下面的命令创建一个私域插件工作区：

:::tabs code

```npm
npm run setup @alice/example
```

```yarn
yarn setup @alice/example
```

:::

此外，你还需要额外修改 `tsconfig.json` 文件。Open this file, and you will see the following content:

```json {6}
{
  "extends": "./tsconfig.base",
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      // "@scope/koishi-plugin-*": ["external/*/src"],
      "@alice/koishi-plugin-*": ["external/*/src"],
    },
  },
}
```

找到高亮的一行代码，将其复制一份，并将 `@scope` 替换为你的 npm 用户名，然后将复制的这一行代码前面的注释符号去掉。

## Build Source Code

The plugin mentioned above can currently only run in development mode. If you want to use it in production mode or publish it to the plugin marketplace, you need to build your source code. Run the following command in the workspace root:

:::tabs code

```npm
npm run build [...name]
```

```yarn
yarn build [...name]
```

:::

- **name:** 要构建的插件列表，缺省时表示全部插件

还是以上面的插件 `example` 为例：

- 后端代码将输出到 `external/example/lib` 目录
- 前端代码将输出到 `external/example/dist` 目录 (如果存在)

## Add Dependencies

插件创建时，`package.json` 中已经包含了一些必要的依赖。If you need to add other dependencies, you can use the following command:

:::tabs code

```npm
npm install [...deps] -w koishi-plugin-[name]
```

```yarn
yarn workspace koishi-plugin-[name] add [...deps]
```

:::

- **name:** 你的插件名称
- **deps:** 要添加的依赖列表

如果要添加的是 `devDependencies` 或者 `peerDependencies`，你也需要在命令后面加上 `-D` 或 `-P` 参数。关于服务类插件的依赖声明，请参考 [后续章节](../plugin/service.md#关于-peerdependencies)。

## Upgrade Dependencies

Although package managers like npm and yarn provide dependency upgrade features, their support for workspace development is not very good. Therefore, we also provide a simple command for batch upgrading dependencies.

:::tabs code

```npm
npm run dep
```

```yarn
yarn dep
```

:::

这将按照每个 `package.json` 中声明的依赖版本进行更新。举个例子，如果某个依赖的版本是 `^1.1.4`，而这个依赖之后发布了新版本 `1.2.3` 和 `2.3.3`，那么运行该指令后，依赖的版本将会被更新为 `^1.2.3`。

## Secondary Development

:::tip
阅读本节前请确保你已经完成 [版本控制](./setup.md#版本控制) 中的全部准备工作。
:::

:::tip
如果你想要贡献原始仓库，在开始执行下面的操作之前，请确保你对要开发的仓库有写入权限。If not, you should first create your own fork and then replace the repository name below with the name of your fork. 举个例子，假如你的 GitHub 用户名是 `alice`，那么下面你使用的仓库名称应当是 `alice/koishi-plugin-forward` 而不是 `koishijs/koishi-plugin-forward`。
:::

Secondary development refers to debugging or modifying plugins in other repositories. In this case, you need to first clone the corresponding repository to your local environment and then carry out debugging and modifications.

### Develop Plugins

其他人创建的工作区插件可以直接克隆到你的 `external` 目录下。例如，你可以使用下面的命令将 `koishi-plugin-forward` 插件克隆到本地：

:::tabs code

```npm
npm run clone koishijs/koishi-plugin-forward
```

```yarn
yarn clone koishijs/koishi-plugin-forward
```

:::

### Develop Koishi

Workspaces can be used not only for secondary development of plugins but also for developing Koishi itself. Simply use the following commands to clone the Koishi repository to your local environment and complete the build:

:::tabs code

```npm
npm run clone koishijs/koishi
npm run build -w @root/koishi
```

```yarn
yarn clone koishijs/koishi
yarn workspace @root/koishi build
```

:::

Generally, non-plugin repositories need to go through path configuration after being cloned in order to be used normally. 不过不同担心，模板项目支持已经内置了 Koishi 生态中的几个核心仓库 ([koishi](https://github.com/koishijs/koishi), [satori](https://github.com/satorijs/satori), [minato](https://github.com/shigma/minato)) 的路径配置。

完成上述操作后，现在你的 `yarn dev` 已经能直接使用 Koishi 的 TypeScript 源码了！
