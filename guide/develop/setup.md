# 环境搭建

本节将介绍推荐的开发环境搭建流程。如果某些软件已经安装完成，可以跳过对应的步骤。

## 安装 Node.js

<!--@include: ../../snippets/install-node.md-->

## 安装 Git

Git 是一个版本控制工具。我们强烈推荐使用 Git 来管理你的代码，这一方面允许你在任何时候回退到之前的版本，另一方面也能让你与其他开发者协作。

我们可以在 [官网](https://git-scm.com/downloads) 上下载安装包。点击右上角的青色下载按钮即可。

![downloads](/manual/git/downloads.webp)

国内的 Windows 用户也可以选择从 [镜像](https://registry.npmmirror.com/binary.html?path=git-for-windows/) 下载。如果不知道下载哪个版本，可以在上面的官网中看到 (比如现在是 2.39.1)。

获取到安装包后，双击运行。安装过程无需手动配置，一直点击下一步即可完成安装。

安装完成后，可以在命令行中输入 `git --version` 来查看版本号，以确认安装成功：

```sh
git --version           # git version 2.39.1
```

## 安装 Koishi

<!--@include: ../../snippets/scaffold.md-->

如果你顺利完成了上述操作，你的应用此时应该已经是启动状态，并弹出了控制台界面。在后续的几节中我们将学习更多的命令行用法，所以我们可以先关闭 Koishi。只需在命令行中按下 `Ctrl+C` 组合键即可停止 Koishi 的运行。

<!-- ## 安装 VSCode (可选)

所谓工欲善其事，必先利其器，一个好的编辑器可以极大地提高开发效率。我们推荐安装 VSCode 作为编辑器。

同样是前往 [官网](https://code.visualstudio.com/) 进行下载。点击左侧的蓝色下载按钮。

![home](/manual/vscode/home.webp)

下载完毕后，双击运行。安装过程无需手动配置，一直点击下一步即可完成安装。

安装完成后，VSCode 会自动打开。你将看到一个英文的界面，不过不用担心，我们现在就来安装中文语言包。

在活动栏中点击「Extensions」，并在搜索框中输入「chinese」，你将看到一个写着「中文 (简体)」的插件。点击「Install」按钮进行安装，并根据提示重启 VSCode。现在你的 VSCode 就已经是中文的了。

![home](/manual/vscode/chinese.webp)

要打开刚刚创建的项目，可以在活动栏中点击「资源管理器」→「打开文件夹」，然后选择你刚刚创建的项目文件夹即可。

![home](/manual/vscode/open.webp) -->
