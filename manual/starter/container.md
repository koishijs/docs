---
sidebarDepth: 2
redirectFrom:
  - /guide/misc/docker.md
---

# 使用容器

::: tip
如果想了解其他安装方式，请移步 [选择安装方式](./index.md)。
:::

Koishi 提供了 [Docker](https://hub.docker.com/r/koishijs/koishi) 镜像，方便你在容器中运行 Koishi。你需要首先安装 [Podman](https://podman.io) 或 [Docker](https://www.docker.com) 来运行容器。

## 拉取镜像

你可以从 Docker Hub 拉取最新的 Koishi 镜像：

::: code-group container
```podman
podman pull docker.io/koishijs/koishi
```
```docker
docker pull koishijs/koishi
```
:::

如果你需要运行 [koishi-plugin-puppeteer](https://www.npmjs.com/package/koishi-plugin-puppeteer) 插件，应使用预装 chromium 的容器:

::: code-group container
```podman
podman pull docker.io/koishijs/koishi:latest-puppeteer
```
```docker
docker pull koishijs/koishi:latest-puppeteer
```
:::

## 启动容器

使用以下命令启动容器:

::: code-group container
```podman
podman run -p 5140:5140 koishijs/koishi
```
```docker
docker run -p 5140:5140 koishijs/koishi
```
:::

启动后将会绑定 koishi 控制台到 5140 端口。

## 安装插件

在容器正常运行时，可以通过在浏览器中访问 http://宿主机地址:5140 在控制台中安装和启用插件。若无法访问请检查你的防火墙配置是否正确。
