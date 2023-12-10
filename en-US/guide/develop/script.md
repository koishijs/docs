# Launch Script

There is also a set of command line tools that provided by Koishi to boot the application quickly by reading the configuration file.

:::tip
本节中介绍的命令行都需要在 [应用目录](./config.md#应用目录) 下运行。
:::

## Basic Usage

我们通常使用 **启动脚本** 来启动 Koishi 应用。打开应用目录下的 `package.json` 文件：

```json title=package.json
{
  "scripts": {
    "dev": "cross-env NODE_ENV=development koishi start -r esbuild-register -r yml-register",
    "start": "koishi start"
  }
}
```

Run the following command line in the workspace root to start the Koishi application:

:::tabs code

```npm
npm run start
```

```yarn
yarn start
```

:::

In the subsequent parts of this section, we will introduce more options of the above launch script. No matter what changes you make, you can use the above command line to start. This is also the significance of the boostrap script.

### Command Line Options

启动脚本支持 Node.js 的 [命令行参数](https://nodejs.org/api/cli.html)。例如，上面的 `-r` 对应于 `--require`，它将允许你加载 `.ts` 和 `.yml` 后缀的文件。

In addition to Node.js's command line options, Koishi also provides some additional options. We will introduce each of them below.

### Auto Restart

Koishi's command line tool supports auto-restart. When the process running Koishi crashes, if Koishi has already started successfully, the surveillance process will automatically restart a new process.

## Development Mode

除了 `start` 以外，模板项目还准备了名为 `dev` 的开发模式启动脚本。Running the following command line in the workspace root can start the application in development mode:

:::tabs code

```npm
npm run dev
```

```yarn
yarn dev
```

:::

如你所见，`dev` 相当于在 `start` 指令的基础上添加了额外的参数和环境变量。These options enable us to use additional features, while the environment variables can affect some behaviors of the plugins.

### TypeScript Support

The Koishi template project provides built-in support for TypeScript development. 上述 `-r esbuild-register` 参数允许我们在运行时直接使用工作区插件的 TypeScript 源代码。

You can also add support for more extensions on your own. For example, if you prefer CoffeeScript, you can modify your development script like this:

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

### Hot Module Replacement

If you are developing a large Koishi project, it might take several seconds just to load all plugins. At times like this, supporting hot module replacement like front-end frameworks becomes a great idea. Fortunately, Koishi also supports this! The built-in plugin @koishijs/plugin-hmr implements plugin-level hot replacement. Whenever you modify your local files, Koishi will try to reload your plugin and remind you in the terminal.

The behavior here can also be customized in the configuration file:

```yaml title=koishi.yml
plugins:
  group:develop:
    $if: env.NODE_ENV === 'development'
    hmr:
      root: '.'
      # List of files to ignore, supports glob patterns
      ignore:
        - some-file
```

::: tip
由于部分 Linux 系统有着 8192 个文件的监听数量限制，你可能会发现运行 `yarn dev` 后出现了如下的报错：

```text
NOSPC: System limit for number of file watchers reached
```

In this case, you can use the following command to increase the limit of the number of file watchers:

```sh
echo fs.inotify.max_user_watches=524288 |
sudo tee -a /etc/sysctl.conf &&
sudo sysctl -p
```

另一种方案是只监听部分子路径，例如将 `root` 改为 `external/foo` (其中 `foo` 是你正在开发的插件目录，参见下一节的工作区指南)，这将忽略其他目录下的变化，并依然对你的插件进行热重载。当你同时开发多个插件时，你也可以将 `root` 改成一个数组来使用。
:::
