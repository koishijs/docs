# 工作区开发

Koishi 的核心是插件系统，绝大部分 Koishi 功能都可以通过插件实现。本章节将介绍如何使用模板项目开发和构建自己的 Koishi 插件。

::: tip
本节中介绍的命令行都需要在 [根目录](./config.md#根目录位置) 下运行。
:::

## 创建新插件

在根目录运行下面的命令以创建一个新的插件工作区：

::: tabs code
```npm
npm run setup [name] [-c]
```
```yarn
yarn setup [name] [-c]
```
:::

- **name:** 插件的包名，缺省时将进行提问
- **-c, --console:** 创建一个带控制台扩展的插件

我们假设你创建了一个叫 `example` 的插件。那么，你将看到下面的目录结构：

```diff{3-6}
root
├── plugins
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

以 [开发模式](./script.md#开发模式) 重新运行你的项目，你会立即在网页控制台的配置界面中看到 `example` 插件。只需点击启用，你就可以实现与机器人的对话了：

<chat-panel>
<chat-message nickname="Alice">天王盖地虎</chat-message>
<chat-message nickname="Koishi">宝塔镇河妖</chat-message>
</chat-panel>

## 构建源代码

上面的插件暂时还只能在开发模式下运行。如果想要在生产模式下使用或发布到插件市场，你需要构建你的源代码。在根目录运行下面的命令：

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

- 后端代码将输出到 `plugins/example/lib` 目录
- 前端代码将输出到 `plugins/example/dist` 目录 (如果存在)

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
