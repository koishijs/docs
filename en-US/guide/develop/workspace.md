# Workspace Development

The core of Koishi is its plugin system, with the vast majority of Koishi's functionalities being implementable through plugins. This chapter will introduce how to develop and build your own Koishi plugins using the template project.

::: tip
These commands are should be run in the [workspace root](./config.md#应用目录).
:::

## Create a New Plugin

Run the following command in the workspace root to create a new plugin workspace:

::: tabs code
```npm
npm run setup [name] -- [-c] [-m] [-G]
```
```yarn
yarn setup [name] [-c] [-m] [-G]
```
:::

- **name**: The package name of the plugin, will be prompted if omitted.
- **-c, --console:** Create a plugin with console extension.
- **-m, --monorepo:** Create monorepo plugin.
- **-G, --no-git:** Skip git initialization.

Assuming you created a plugin named `example`, you will see the following directory structure:

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

Open the `index.ts` file and modify its code:

```ts{6-11}
import { Context } from 'koishi'

export const name = 'example'

export function apply(ctx: Context) {
  // When receiving "天王盖地虎", respond with "宝塔镇河妖"
  ctx.on('message', (session) => {
    if (session.content === '天王盖地虎') {
      session.send('宝塔镇河妖')
    }
  })
}
```

Rerun your project in [Development Mode](./script.md#开发模式), click on the 'Add Plugin' button at the top right, select the name of the plugin you just created, and you will immediately see the `example` plugin in the configuration interface of the web console. Just click to enable it, and you can interact with the bot:

<chat-panel>
<chat-message nickname="Alice">天王盖地虎</chat-message>
<chat-message nickname="Koishi">宝塔镇河妖</chat-message>
</chat-panel>

### Create a Scoped Plugin

If you find that the plugin name you want to create is already taken, in addition to thinking of a new name or adding numbers to it, you can opt to create a scoped plugin. Scoped plugins use your own [npm username](./setup.md#注册-npm) as a prefix for the package name, so there's no need to worry about conflicts with other people's plugins.

Suppose your npm username is `alice`, then you can use the following command to create a scoped plugin workspace:

::: tabs code
```npm
npm run setup @alice/example
```
```yarn
yarn setup @alice/example
```
:::

In addition, you will need to modify the `tsconfig.json` file. Open this file, and you will see the following content:

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

Find the highlighted line of code, copy it, replace `@scope` with your npm username, and then remove the comment symbol in front of the copied line.

## Build Source Code

The plugin mentioned above can currently only run in development mode. If you want to use it in production mode or publish it to the plugin marketplace, you need to build your source code. Run the following command in the workspace root:

::: tabs code
```npm
npm run build [...name]
```
```yarn
yarn build [...name]
```
:::

- **name:** list of plugins to build, default to all plugins

Taking the `example` plugin as an example:

- Backend code will be output to the `external/example/lib` directory.
- Frontend code will be output to the `external/example/dist` directory (if it exists).

## Add Dependencies

When creating a plugin, `package.json` already includes some necessary dependencies. If you need to add other dependencies, you can use the following command:

::: tabs code
```npm
npm install [...deps] -w koishi-plugin-[name]
```
```yarn
yarn workspace koishi-plugin-[name] add [...deps]
```
:::

- **name:** your plugin name
- **deps:** list of dependencies to add

If you are adding `devDependencies` or `peerDependencies`, you also need to add `-D` or `-P` parameters to the command. For dependencies declaration of service plugins, please refer to [subsequent chapter](../plugin/service.md#关于-peerdependencies).

## Upgrade Dependencies

Although package managers like npm and yarn provide dependency upgrade features, their support for workspace development is not very good. Therefore, we also provide a simple command for batch upgrading dependencies.

::: tabs code
```npm
npm run dep
```
```yarn
yarn dep
```
:::

This will update according to the dependency versions declared in each `package.json`. For example, if the version of a dependency is `^1.1.4`, and this dependency later releases new versions `1.2.3` and `2.3.3`, then after running this command, the version of the dependency will be updated to `^1.2.3`.

## Secondary Development

::: tip
Please make sure you have completed all the preparations in [Version Control](./setup.md#版本控制) before reading this section.
:::

::: tip
If you want to contribute to the original repository, before starting the following operations, please make sure you have write permission to the repository you are developing. If not, you should first create your own fork and then replace the repository name below with the name of your fork. For example, if your GitHub username is `alice`, then the repository name you use below should be `alice/koishi-plugin-forward` instead of `koishijs/koishi-plugin-forward`.
:::

Secondary development refers to debugging or modifying plugins in other repositories. In this case, you need to first clone the corresponding repository to your local environment and then carry out debugging and modifications.

### Develop Plugins

Plugins created in other people's workspaces can be directly cloned to your `external` directory. For example, you can use the following command to clone the `koishi-plugin-forward` plugin to your local environment:

::: tabs code
```npm
npm run clone koishijs/koishi-plugin-forward
```
```yarn
yarn clone koishijs/koishi-plugin-forward
```
:::

### Develop Koishi

Workspaces can be used not only for secondary development of plugins but also for developing Koishi itself. Simply use the following commands to clone the Koishi repository to your local environment and complete the build:

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

Generally, non-plugin repositories need to go through path configuration after being cloned in order to be used normally. However, don't worry, the template project support has already built-in path configurations for several core repositories in the Koishi ecosystem ([koishi](https://github.com/koishijs/koishi), [satori](https://github.com/satorijs/satori), [minato](https://github.com/shigma/minato)).

After completing the above operations, your `yarn dev` can now directly use the TypeScript source code of Koishi!
