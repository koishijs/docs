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

## 安装 VSCode

所谓工欲善其事，必先利其器，一个好的编辑器可以极大地提高开发效率。我们推荐安装 VSCode 作为编辑器。

同样是前往 [官网](https://code.visualstudio.com/) 进行下载。点击左侧的蓝色下载按钮。

![home](/manual/vscode/home.webp)

## 下载 Koishi
