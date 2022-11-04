# 插件开发

本章节将介绍如何使用模板项目编写、构建和发布自己的 Koishi 插件。

## 创建新插件

::: tabs code
```npm
npm run setup [name] [-c]
```
```yarn
yarn setup [name] [-c]
```
:::

上述指令将创建一个新的插件工作区。

- **name:** 插件的包名，缺省时将进行提问
- **-c, --console:** 创建一个带控制台扩展的插件

我们假设你创建了一个叫 `demo` 的插件。那么，你将看到下面的目录结构：

```diff
root
├── plugins
│   └── demo
│       ├── src
│       │   └── index.ts
│       └── package.json
├── koishi.yml
└── package.json
```

打开 `index.ts` 文件，并修改其中的代码：

```ts no-extra-header
import { Context } from 'koishi'

export const name = 'demo'

export function apply(ctx: Context) {
  ctx.middleware((session, next) => {
    if (session.content === '天王盖地虎') {
      return '宝塔镇河妖'
    }
    return next()
  })
}
```

以开发模式重新运行你的项目，你会立即在网页控制台的配置界面中看到 `demo` 插件。只需点击启用，你就可以实现与机器人的对话了：

<chat-panel>
<chat-message nickname="Alice" color="#cc0066">天王盖地虎</chat-message>
<chat-message nickname="Koishi" avatar="/koishi.png">宝塔镇河妖</chat-message>
</chat-panel>

## 构建源代码

在插件正式发布前，你需要将插件的源代码构建为 js 文件。

::: tabs code
```npm
npm run build [...folder]
```
```yarn
yarn build [...folder]
```
:::

上述指令按依赖顺序构建插件相关的源代码，包括后端 + 前端。

- **folder:** 要构建的插件列表，缺省时表示全部

还是以上面的插件 `demo` 为例：

- 后端代码将输出到 `plugins/foo/lib` 目录
- 前端代码将输出到 `plugins/foo/dist` 目录 (如果存在)

## 更新版本号

::: tabs code
```npm
npm run bump [...folder] [-1|-2|-3|-p|-v <ver>] [-r]
```
```yarn
yarn bump [...folder] [-1|-2|-3|-p|-v <ver>] [-r]
```
:::

上述指令将更新某些插件的版本号。当进行此操作时，其他相关插件的依赖版本也会同步更新，确保所有工作区内依赖的插件版本一致。

- **folder:** 要发布的插件列表，不能为空
- 版本选项：
  - **-1, --major:** 跳到下一个大版本，例如 `3.1.4` -> `4.0.0`
  - **-2, --minor:** 跳到下一个中版本，例如 `3.1.4` -> `3.2.0`
  - **-3, --patch:** 跳到下一个小版本，例如 `3.1.4` -> `3.1.5`
  - **-p, --prerelease:** 跳到下一个预览版本，具体行为如下
    - 如果当前版本是 `alpha.x`，则跳到 `beta.0`
    - 如果当前版本是 `beta.x`，则跳到 `rc.0`
    - 如果当前版本是 `rc.x`，则移除 prerelease 部分
    - 其他情况下，跳到下一个大版本的 `alpha.0`
  - **-v, --version:** 设置具体的版本号
  - 缺省情况：当前版本的最后一位递增
- 其他选项：
  - **-r, --recursive:** 当更新一个插件的版本时，依赖其的插件也随时更新版本
  <!-- - -s, --sync: 与云端进行同步，基于 npm 上的最新版本而非本地版本更新 -->

## 更新依赖

尽管 npm 和 yarn 等包管理器都提供了依赖更新功能，但它们对工作区开发的支持都不是很好。因此，我们也提供了一个简单的指令用于批量更新依赖版本。

::: tabs code
```npm
npm run dep
```
```yarn
yarn dep
```
:::

上述指令会按照每个 `package.json` 中声明的依赖版本进行更新。举个例子，如果某个依赖的版本是 `^1.1.4`，而这个依赖之后发布了新版本 `1.2.3` 和 `2.3.3`，那么运行该指令后，依赖的版本将会被更新为 `^1.2.3`。

## 发布插件

::: tabs code
```npm
npm run pub [...folder]
```
```yarn
yarn pub [...folder]
```
:::

上述指令将发布所有版本号发生变动的插件。

- **folder:** 要发布的插件列表，缺省时表示全部
