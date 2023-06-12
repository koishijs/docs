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

If you want to persist your data, use `-v /some/place:/koishi` to remap Koishi files into your local file system or volumes.

If you want to switch the time zone, use `-e TZ=Asia/Shanghai`.

::: tip
You could update all the plugins as well as Koishi itself in Koishi Console. After persistence, only several programs such as Chromium or Node.js would be updated when you update the container.
:::

## Install Plugins

While the container is running, you could open the Koishi Console with `http://<host-ip>:5140`, then install and enable plugins in it. If you cannot access the Koishi Console, please check the configurations of your firewall.
