---
prev:
  text: Installation
  link: /en-US/manual/starter/
next:
  text: About Koishi Console
  link: /en-US/manual/console/
---

# Install for Container

::: warning
Containerized software products like Docker are developed for production environment. We will assume that you have enough acknowledgement for managing a server as well as the concept of "Containerization" or the common operations for these software products. It is not recommended for those who don't have enough acknowledgement unless they are installing Koishi on routers or NAS. Please [Choose Other Installation Methods](./index.md).
:::

Koishi provides an [official Docker image](https://hub.docker.com/r/koishijs/koishi), which would convenient running Koishi in a container. You may need to install [Podman](https://podman.io) or [Docker](https://www.docker.com) first.

## Start container

Start container with the following command:

::: tabs code
```podman
podman run -p 5140:5140 koishijs/koishi
```
```docker
docker run -p 5140:5140 koishijs/koishi
```
:::

Many plugins depend on [koishi-plugin-pupeteer](https://www.npmjs.com/package/koishi-plugin-puppeteer) to render images, so the default image includes Chromium. If you don't need Chromium to be included, we also offer a lite version:

::: tabs code
```podman
podman run -p 5140:5140 koishijs/koishi:latest-lite
```
```docker
docker run -p 5140:5140 koishijs/koishi:latest-lite
```
:::

On startup, the Koishi console will be bound to the 5140 port.

如果你需要持久化，请使用 `-v /some/place:/koishi` 来映射 Koishi 的文件。

If you want to switch the time zone, use `-e TZ=Asia/Shanghai`.

::: tip
Koishi 本体及其插件都可以控制台完成更新。在持久化文件过后更新容器仅会更新 Chromium 和 Node.js 等的版本。
:::

## Install Plugins

在容器正常运行时，可以通过在浏览器中访问 `http://宿主机地址:5140` 在控制台中安装和启用插件。若无法访问请检查你的防火墙配置是否正确。
