# Workspace Development

Koishi 的核心是插件系统，绝大部分 Koishi 功能都可以通过插件实现。本章节将介绍如何使用模板项目开发和构建自己的 Koishi 插件。

::: tip
These commands are should be run in the [workspace root](./config.md#应用目录).
:::

## 创建新插件

在应用目录运行下面的命令以创建一个新的插件工作区：

::: tabs code
```npm
npm run setup [name] [-c] [-m] [-G]
```
```yarn
yarn setup [name] [-c] [-m] [-G]
```
:::

- **name:** 插件的包名，缺省时将进行提问
- **-c, --console:** 创建一个带控制台扩展的插件
- **-m, --monorepo:** 创建 monorepo 的插件
- **-G, --no-git:** 跳过 git 初始化

我们假设你创建了一个叫 `example` 的插件。那么，你将看到下面的目录结构：

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

以 [开发模式](./script.md#开发模式) 重新运行你的项目，点击右上角的「添加插件」按钮，选择你刚才创建的插件名称，你会立即在网页控制台的配置界面中看到 `example` 插件。只需点击启用，你就可以实现与机器人的对话了：

<chat-panel>
<chat-message nickname="Alice">天王盖地虎</chat-message>
<chat-message nickname="Koishi">宝塔镇河妖</chat-message>
</chat-panel>

### 创建私域插件

如果你发现想要创建的插件名称已经被占用了，除了重新想名字或在后面加上数字之外，你还可以改为创建私域插件。私域插件使用你自己的 [npm 用户名](./setup.md#注册-npm) 作为包名前缀，因此不用担心与其他人的插件冲突。

假设你的 npm 用户名是 `alice`，那么你可以使用下面的命令创建一个私域插件工作区：

::: tabs code
```npm
npm run setup @alice/example
```
```yarn
yarn setup @alice/example
```
:::

此外，你还需要额外修改 `tsconfig.json` 文件。打开这个文件，你将看到下面的内容：

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

## 构建源代码

上面的插件暂时还只能在开发模式下运行。如果想要在生产模式下使用或发布到插件市场，你需要构建你的源代码。在应用目录运行下面的命令：

::: tabs code
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

## 添加依赖

插件创建时，`package.json` 中已经包含了一些必要的依赖。如果你需要添加其他依赖，可以使用下面的命令：

::: tabs code
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

## 更新依赖版本

尽管 npm 和 yarn 等包管理器都提供了依赖更新功能，但它们对工作区开发的支持都不是很好。因此，我们也提供了一个简单的命令用于批量更新依赖版本。

::: tabs code
```npm
npm run dep
```
```yarn
yarn dep
```
:::

这将按照每个 `package.json` 中声明的依赖版本进行更新。举个例子，如果某个依赖的版本是 `^1.1.4`，而这个依赖之后发布了新版本 `1.2.3` 和 `2.3.3`，那么运行该指令后，依赖的版本将会被更新为 `^1.2.3`。

## 二次开发

::: tip
阅读本节前请确保你已经完成 [版本控制](./setup.md#版本控制) 中的全部准备工作。
:::

::: tip
如果你想要贡献原始仓库，在开始执行下面的操作之前，请确保你对要开发的仓库有写入权限。如果没有，你应当先创建属于自己的 fork，然后将下面的仓库名称替换为你的 fork 仓库名称。举个例子，假如你的 GitHub 用户名是 `alice`，那么下面你使用的仓库名称应当是 `alice/koishi-plugin-forward` 而不是 `koishijs/koishi-plugin-forward`。
:::

二次开发是指调试或修改其他仓库中的插件。这种情况下，你需要先将对应的仓库克隆到本地，然后在本地进行调试和修改。

### 开发插件

其他人创建的工作区插件可以直接克隆到你的 `external` 目录下。例如，你可以使用下面的命令将 `koishi-plugin-forward` 插件克隆到本地：

::: tabs code
```npm
npm run clone koishijs/koishi-plugin-forward
```
```yarn
yarn clone koishijs/koishi-plugin-forward
```
:::

### 开发 Koishi

工作区不仅可以用于插件的二次开发，还可以用于开发 Koishi 本身。只需使用下面的命令将 Koishi 仓库克隆到本地，并完成构建：

::: tabs code
```npm
npm run clone koishijs/koishi
npm run build -w @root/koishi
```
```yarn
yarn clone koishijs/koishi
yarn workspace @root/koishi build
```
:::

通常来说，非插件仓库在克隆下来之后还需经过路径配置才可以正常使用。不过不同担心，模板项目支持已经内置了 Koishi 生态中的几个核心仓库 ([koishi](https://github.com/koishijs/koishi), [satori](https://github.com/satorijs/satori), [minato](https://github.com/shigma/minato)) 的路径配置。

完成上述操作后，现在你的 `yarn dev` 已经能直接使用 Koishi 的 TypeScript 源码了！
