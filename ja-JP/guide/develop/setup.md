# 环境搭建

本节将介绍推荐的开发环境搭建流程。如果某些软件已经安装完成，可以跳过对应的步骤。

## 安装 Node.js

Koishi 需要 [Node.js](https://nodejs.org/) (最低 v16，推荐使用 LTS) 运行环境，你需要自己安装它。

### 下载安装包

首先我们前往 [Node.js](https://nodejs.org/) 的官方网站：

![home](/manual/nodejs/home-dark.webp) {.dark-only}

![home](/manual/nodejs/home-light.webp) {.light-only}

在这里可以看到两个巨大的按钮，分别对应着 **LTS (长期维护版)** 和 **Current (最新版本)**。我们建议你选择更加稳定的 LTS 版本，点击按钮即可下载安装包。

随后，运行下载好的安装包，根据提示完成整个安装流程即可。

### 安装包管理器

Node.js 自带名为 [npm](https://www.npmjs.com/) 的包管理器，你可以直接使用它。我们同时也推荐功能更强大的 [yarn](https://classic.yarnpkg.com/) 作为包管理器。它的安装非常简单，只需打开命令行输入下面的命令：

```sh
# 安装 yarn
npm i -g yarn

# 查看版本
yarn -v
```

### 配置镜像源

如果你是国内用户，从 npm 或 yarn 上下载依赖可能非常慢。因此，我们推荐你配置一下镜像源，以提升安装速度。

::: tabs code
```npm
npm config set registry https://registry.npmmirror.com
```
```yarn
yarn config set registry https://registry.npmmirror.com
```
:::

### 注册 npm

如果你打算发布插件，你还需要注册一个 npm 账号。这一步非常简单，只需前往这里的 [注册页面](https://www.npmjs.com/signup)。填写你的用户名、邮箱和密码，勾选同意协议，点击注册即可。

注册完成后，你就可以在命令行中使用 `npm login` 来登录你的账号：

```sh
npm login --registry=https://registry.npmjs.org
```

## 版本控制

我们强烈推荐使用版本控制系统 (VCS) 来管理你的代码。这一方面允许你在任何时候回退到之前的版本，另一方面也能让你与其他开发者协作。

### 安装 Git

Git 是最普遍使用的版本控制工具。前往 [官网](https://git-scm.com/downloads)，点击右上角的青色按钮下载安装包。

![downloads](/manual/git/downloads.webp)

国内的 Windows 用户也可以选择从 [镜像](https://registry.npmmirror.com/binary.html?path=git-for-windows/) 下载。如果不知道下载哪个版本，可以在上面的官网中看到 (比如现在是 2.39.1)。

获取到安装包后，双击运行。安装过程无需手动配置，一直点击下一步即可完成安装。

安装完成后，可以在命令行中输入 `git --version` 来查看版本号，以确认安装成功：

```sh
git --version           # git version 2.39.1
```

最后你还需要设置你的姓名和邮箱。它们将会默认作为你创建的插件的作者，也会出现在你的提交记录中：

```sh
git config --global user.name "Your Name"
git config –-global user.email "you@example.com"
```

### 注册 GitHub

通常来说我还会建议你注册一个 GitHub 账号。[GitHub](https://github.com) 是一个代码托管平台，我们可以在上面创建仓库来存放我们的代码。由于篇幅有限，请在互联网搜索相关的教程，自行完成注册。如果发现无法注册，也不用担心，你仍然可以在本地进行开发。

## 安装 Koishi

打开命令行，并进入你想要创建 Koishi 项目的目录。

::: tip
这个目录不宜过长，且路径中请避免出现中文或者空格。我们推荐的目录如下：

- Windows：`C:\dev` 或者 `D:\dev` (也不要直接在盘根创建项目，最好是建一层目录)
- 其他操作系统：`~/dev`
:::

输入下面的命令以创建 Koishi 项目：

::: tabs code
```npm
npm i -g create-koishi@latest
npm init koishi
```
```yarn
yarn create koishi
```
:::

跟随提示即可完成全套初始化流程。

如果你顺利完成了上述操作，你的应用此时应该已经是启动状态，并弹出了控制台界面。接下来的几节中我们将学习更多的命令行用法，因此我们可以先关闭 Koishi。在命令行中按下 `Ctrl+C` 组合键即可停止 Koishi 的运行。


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
