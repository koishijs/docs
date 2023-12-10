# スクリプトを実行する

Koishi 提供了一套命令行工具，用于读取配置文件快速启动应用。

:::tip
本节中介绍的命令行都需要在 [应用目录](./config.md#应用目录) 下运行。
:::

## 基本用法

我们通常使用 **启动脚本** 来启动 Koishi 应用。打开应用目录下的 `package.json` 文件：

```json title=package.json
{
  "scripts": {
    "dev": "cross-env NODE_ENV=development koishi start -r esbuild-register -r yml-register",
    "start": "koishi start"
  }
}
```

在应用目录运行下面的命令行以启动 Koishi 应用：

:::tabs code

```npm
npm run start
```

```yarn
yarn start
```

:::

在本节的后续部分，我们会介绍上述启动脚本的更多参数。无论你做何改动，你都可以使用上面的命令行来快速启动。这也是启动脚本的意义所在。

### 启动参数

启动脚本支持 Node.js 的 [命令行参数](https://nodejs.org/api/cli.html)。例如，上面的 `-r` 对应于 `--require`，它将允许你加载 `.ts` 和 `.yml` 后缀的文件。

除了 Node.js 的命令行参数，Koishi 还提供了一些额外的参数。我们将在下面逐一介绍。

### 自动重启

Koishi 的命令行工具支持自动重启。当运行 Koishi 的进程崩溃时，如果 Koishi 已经启动成功，则监视进程将自动重新启动一个新的进程。

## 开发模式

除了 `start` 以外，模板项目还准备了名为 `dev` 的开发模式启动脚本。在应用目录运行下面的命令行可以以开发模式启动应用：

:::tabs code

```npm
npm run dev
```

```yarn
yarn dev
```

:::

如你所见，`dev` 相当于在 `start` 指令的基础上添加了额外的参数和环境变量。这些参数为我们启用了额外的特性，而环境变量则能影响插件的部分行为。

### TypeScript 支持

Koishi 模板项目原生地支持 TypeScript 开发。上述 `-r esbuild-register` 参数允许我们在运行时直接使用工作区插件的 TypeScript 源代码。

你也可以自行扩展更多的后缀名支持。例如，如果你更喜欢 CoffeeScript，你可以这样修改你的开发脚本为：

```json title=package.json
{
  "scripts": {
    "dev": "koishi start -r coffeescript/register"
  },
  "devDependencies": {
    "coffeescript": "^2.7.0"
  }
}
```

这样你就可以使用 CoffeeScript 编写你的插件源代码 (当然你还得自行处理构建逻辑)，甚至连配置文件都可以使用 `koishi.coffee` 书写了。

:::danger
我们并不推荐使用高级语言来编写配置文件，因为动态的配置无法支持环境变量、配置热重载和插件市场等特性。大部分情况下我们建议仅将 `-r` 用于开发目的。
:::

### 模块热替换

如果你开发着一个巨大的 Koishi 项目，可能光是加载一遍全部插件就需要好几秒了。在这种时候，像前端框架一样支持模块热替换就成了一个很棒的主意。幸运的是，Koishi 也做到了这一点！内置插件 @koishijs/plugin-hmr 实现了插件级别的热替换。每当你修改你的本地文件时，Koishi 就会尝试重载你的插件，并在命令行中提醒你。

这里的行为也可以在配置文件中进行定制：

```yaml title=koishi.yml
plugins:
  group:develop:
    $if: env.NODE_ENV === 'development'
    hmr:
      root: '.'
      # 要忽略的文件列表，支持 glob patterns
      ignore:
        - some-file
```

::: tip
由于部分 Linux 系统有着 8192 个文件的监听数量限制，你可能会发现运行 `yarn dev` 后出现了如下的报错：

```text
NOSPC: System limit for number of file watchers reached
```

此时你可以使用下面的命令来增加监听数量限制：

```sh
echo fs.inotify.max_user_watches=524288 |
sudo tee -a /etc/sysctl.conf &&
sudo sysctl -p
```

另一种方案是只监听部分子路径，例如将 `root` 改为 `external/foo` (其中 `foo` 是你正在开发的插件目录，参见下一节的工作区指南)，这将忽略其他目录下的变化，并依然对你的插件进行热重载。当你同时开发多个插件时，你也可以将 `root` 改成一个数组来使用。
:::
