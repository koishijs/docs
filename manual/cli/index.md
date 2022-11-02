# 使用命令行

## 启动 Koishi

### 修改入口文件

`koishi start` 指令需要一个配置文件作为入口。这个配置文件允许 js，ts，json，yaml 等多种格式。默认情况下，配置文件名应当形如 `koishi.[ext]` 或 `koishi.config.[ext]`，但你其实也可以传入一个 `file` 参数来指定其他名称。它的完整语法为：

```sh
# 如果你不写这里的 file 参数，程序就会自动寻找 koishi.[ext] 和 koishi.config.[ext] 文件
koishi start [file] [options]
```

::: tip
基于这个逻辑，你也可以将你的配置文件的后缀名改为 ts 等，但动态的配置文件格式将不再支持 @koishijs/plugin-market，这意味着你将无法使用插件市场。
:::

### 使用环境变量

你可以通过插值语法在配置文件中使用环境变量。例如：

```yaml title=koishi.yml
plugins:
  adapter-discord:
    bots:
      - token: ${{ env.DISCORD_TOKEN }}
```

当项目启动时，会将环境变量中的值替换进去。

除了系统提供的环境变量外，Koishi 还支持 [dotenv](https://github.com/motdotla/dotenv)。你可以在当前目录创建一个 `.env` 文件，并在里面填写你的环境变量。这个文件已经被包含在 `.gitignore` 中，你可以在其中填写隐私信息（例如账号密码）而不用担心被上传到远端。

### 自动重启

Koishi 的命令行工具支持自动重启。当运行 Koishi 的进程崩溃时，如果 Koishi 已经启动成功，则监视进程将自动重新启动一个新的进程。

<!-- 同时，你也可以通过指令手动进行重启：

<chat-panel>
<chat-message nickname="Alice">exit -r</chat-message>
<chat-message nickname="Koishi">正在重启……</chat-message>
<chat-message nickname="Koishi">重启完成。</chat-message>
</chat-panel> -->

## 开发模式

在模板项目下运行下面的指令可以启动开发模式：

::: tabs code
```npm
npm run dev
```
```yarn
yarn dev
```
:::

这其实相当于在 `start` 指令的基础上添加下面的参数：

```sh
-r esbuild-register
-r yml-register
--watch
```

这些参数为我们提供了额外的特性。

### TypeScript 支持

Koishi 工作区原生地支持 TypeScript 开发。上面的两组 `-r` 参数允许我们在运行时直接使用工作区插件的 TypeScript 源代码。

如果你想使用其他语言进行开发，你也可以打开 `package.json`，修改 `dev` 指令对应的脚本，向其中添加自己所需的参数：

```sh
-r coffeescript/register        # 以 CoffeeScript 为例
```

### 模块热替换

如果你开发着一个巨大的 Koishi 项目，可能光是加载一遍全部插件就需要好几秒了。在这种时候，像前端框架一样支持模块热替换就成了一个很棒的主意。Koishi 也做到了！`--watch` 参数实现了插件级别的热替换。每当你修改你的本地文件时，Koishi 就会尝试重载你的插件，并在控制台提醒你。

这里的行为也可以在配置文件中进行定制：

```yaml title=koishi.yml
watch:
  # 要忽略的文件列表，支持 glob patterns
  ignore:
    - some-file
```

<!-- 此外，这个指令还支持一些额外的配置项：

- **--log-level:** 控制输出等级
- **--log-time:** 在日志中显示时间
- **--debug:** 最高等级输出的命名空间

与输出日志相关的选项请参见 [输出与日志](../service/logger.md) 一章。 -->
