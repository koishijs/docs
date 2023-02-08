---
prev:
  text: 选择安装方式
  link: /manual/starter/
next:
  text: 认识控制台
  link: /manual/console/
---

# 在容器中使用

::: tip
Docker 是一个以服务生产环境而开发的应用平台，在使用 Docker 部署之时，我们相信你已经掌握了运维一台服务器所必须的知识，同时也理解了容器化的概念与 Docker 的基础操作。如若不然，在除路由器或 NAS 等特殊环境外，请 [选择其他安装方式](./index.md)。
:::

Koishi 提供了 [Docker](https://hub.docker.com/r/koishijs/koishi) 镜像，方便你在容器中运行 Koishi。你需要首先安装 [Podman](https://podman.io) 或 [Docker](https://www.docker.com) 来运行容器。

## 拉取镜像

你可以从 Docker Hub 拉取最新的 Koishi 镜像：

::: tabs code
```podman
podman pull docker.io/koishijs/koishi
```
```docker
docker pull koishijs/koishi
```
:::

如果你需要运行 [koishi-plugin-puppeteer](https://www.npmjs.com/package/koishi-plugin-puppeteer) 插件，应使用预装 chromium 的容器:

::: tabs code
```podman
podman pull docker.io/koishijs/koishi:latest-puppeteer
```
```docker
docker pull koishijs/koishi:latest-puppeteer
```
:::

## 启动容器

使用以下命令启动容器:

::: tabs code
```podman
podman run -p 5140:5140 koishijs/koishi
```
```docker
docker run -p 5140:5140 koishijs/koishi
```
:::

启动后将会绑定 koishi 控制台到 5140 端口。

## 安装插件

在容器正常运行时，可以通过在浏览器中访问 `http://宿主机地址:5140` 在控制台中安装和启用插件。若无法访问请检查你的防火墙配置是否正确。
