# Launch Script

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

In the subsequent parts of this section, we will introduce more options of the above launch script. No matter what changes you make, you can use the above command line to start. This is also the significance of the boostrap script.

### Command Line Options

The launch script supports Node.js's [command line options](https://nodejs.org/api/cli.html). For example, the `-r` above corresponds to `--require`, which allows you to load files with `.ts` and `.yml` extensions.

In addition to Node.js's command line options, Koishi also provides some additional options. We will introduce each of them below.

### Auto Restart

Koishi's command line tool supports auto-restart. When the process running Koishi crashes, if Koishi has already started successfully, the surveillance process will automatically restart a new process.

## Development Mode

In addition to `start`, the template project also prepares a launch script for development mode named `dev`. Running the following command line in the workspace root can start the application in development mode:

::: tabs code
```npm
npm run dev
```
```yarn
yarn dev
```
:::

As you can see, `dev` is equivalent to adding additional options and environment variables on the basis of the `start` command. These options enable us to use additional features, while the environment variables can affect some behaviors of the plugins.

### TypeScript Support

The Koishi template project provides built-in support for TypeScript development. The `-r esbuild-register` option mentioned above allows us to directly use the TypeScript source code of workspace plugins at runtime.

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

This way, you can use CoffeeScript to write your plugin source code (of course, you still need to handle the build logic yourself), and you can even write the configuration file in `koishi.coffee`.

::: danger
We do not recommend using advanced languages to write configuration files, as dynamic configurations do not support features like environment variables, configuration hot reloading, and plugin marketplace. In most cases, we suggest using `-r` only for development purposes.
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
Due to the file watcher limit of 8192 on some Linux systems, you may encounter the following error after running `yarn dev`:

```text
NOSPC: System limit for number of file watchers reached
```

In this case, you can use the following command to increase the limit of the number of file watchers:

```sh
echo fs.inotify.max_user_watches=524288 |
sudo tee -a /etc/sysctl.conf &&
sudo sysctl -p
```

Another solution is to only monitor certain subpaths, such as changing `root` to `external/foo` (where `foo` is the directory of the plugin you are developing, see the next section's workspace guide), which will ignore changes in other directories while still hot reloading your plugin. When you are developing multiple plugins at the same time, you can also change `root` to an array for use.
:::
