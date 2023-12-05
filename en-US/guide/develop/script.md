# Bootstrap Script

There is also a set of command line tools that provided by Koishi to boot the application quickly by reading the configuration file.

::: tip
These commands are should be run in the [workspace root](./config.md#应用目录).
:::

## General Usage

We usually use a **bootstrap script** to start a Koishi application. Open the `package.json` file in the workspace root:

```json title=package.json
{
  "scripts": {
    "dev": "cross-env NODE_ENV=development koishi start -r esbuild-register -r yml-register",
    "start": "koishi start"
  }
}
```

Run the following command line in the workspace root to start the Koishi application:

::: tabs code
```npm
npm run start
```
```yarn
yarn start
```
:::

In the subsequent parts of this section, we will introduce more parameters of the above bootstrap script. No matter what changes you make, you can use the above command line to start. This is also the significance of the boostrap script.

### Command Line Options

The bootstrap script supports Node.js's [command line options](https://nodejs.org/api/cli.html). For example, the `-r` above corresponds to `--require`, which allows you to load files with `.ts` and `.yml` extensions.

In addition to Node.js's command line options, Koishi also provides some additional options. We will introduce each of them below.

### Auto Restart

Koishi's command line tool supports auto-restart. When the process running Koishi crashes, if Koishi has already started successfully, the surveillance process will automatically restart a new process.

## Development Mode

In addition to `start`, the template project also prepares a development mode bootstrap script named `dev`. 在应用目录运行下面的命令行可以以开发模式启动应用：

::: tabs code
```npm
npm run dev
```
```yarn
yarn dev
```
:::

As you can see, `dev` is equivalent to adding additional options and environment variables on the basis of the `start` command. 这些参数为我们启用了额外的特性，而环境变量则能影响插件的部分行为。

### TypeScript Support

Koishi 模板项目原生地支持 TypeScript 开发。The `-r esbuild-register` option mentioned above allows us to directly use the TypeScript source code of workspace plugins at runtime.

You can also add support for more extensions on your own. 例如，如果你更喜欢 CoffeeScript，你可以这样修改你的开发脚本为：

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

This way, you can use CoffeeScript to write your plugin source code (of course, you still need to handle the build logic yourself), and you can even write the configuration file in `koishi.coffee`.

::: danger
We do not recommend using advanced languages to write configuration files, as dynamic configurations do not support features like environment variables, configuration hot reloading, and plugin marketplace. In most cases, we suggest using `-r` only for development purposes.
:::

### Hot Module Replacement

If you are developing a large Koishi project, it might take several seconds just to load all plugins. At times like this, supporting hot module replacement like front-end frameworks becomes a great idea. Fortunately, Koishi also supports this! The built-in plugin @koishijs/plugin-hmr implements plugin-level hot replacement. 每当你修改你的本地文件时，Koishi 就会尝试重载你的插件，并在命令行中提醒你。

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
Due to the file watcher limit of 8192 on some Linux systems, you may encounter the following error after running `yarn dev`:

```text
NOSPC: System limit for number of file watchers reached
```

In this case, you can use the following command to increase the limit of the number of file watchers:

```sh
echo fs.inotify.max_user_watches=524288 |
sudo tee -a /etc/syssctl.conf &&
sudo syctl -p
```

Another solution is to only monitor certain subpaths, such as changing `root` to `external/foo` (where `foo` is the directory of the plugin you are developing, see the next section's workspace guide), which will ignore changes in other directories while still hot reloading your plugin. When you are developing multiple plugins at the same time, you can also change `root` to an array for use.
:::
