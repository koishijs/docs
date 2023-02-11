Koishi 需要 [Node.js](https://nodejs.org/) (最低 v14，推荐使用 LTS) 运行环境，你需要自己安装它。

### 下载安装包

首先我们前往 [Node.js](https://nodejs.org/) 的官方网站：

![home](/manual/nodejs/home-dark.webp) {.dark-only}

![home](/manual/nodejs/home-light.webp) {.light-only}

在这里可以看到两个巨大的按钮，分别对应着 **LTS (长期维护版)** 和 **Current (最新版本)**。我们建议你选择更加稳定的 LTS 版本，点击按钮即可下载安装包。

随后，运行下载好的安装包，根据提示完成整个安装流程即可。

### 安装包管理器

Node.js 自带名为 [npm](https://www.npmjs.com/) 的包管理器，你可以直接使用它。我们同时也推荐功能更强大的 [yarn](https://classic.yarnpkg.com/) 作为包管理器。它的安装非常简单：

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
