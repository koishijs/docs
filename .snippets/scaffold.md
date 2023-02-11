打开命令行，并进入你想要创建 Koishi 项目的目录。

::: tip
这个目录不宜过长，且路径中请避免出现中文或者空格。我们推荐的目录如下：

- Windows：`C:\dev` 或者 `D:\dev`
- 其他操作系统：`~/dev`
:::

输入下面的命令以创建 Koishi 项目：

::: tabs code
```npm
npm init koishi
```
```yarn
yarn create koishi
```
:::

跟随提示即可完成全套初始化流程。

:::: tip
由于国内可能无法访问 GitHub，你可能需要科学上网或使用镜像。例如你可以使用 [FastGit](http://fastgit.org/) 作为镜像源，只需在上面的脚本后添加 `-m https://hub.fastgit.xyz` 即可。
::::
