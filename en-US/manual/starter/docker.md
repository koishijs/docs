---
prev:
  text: Installation
  link: /zh-CN/manual/starter/
next:
  text: Install and Configure Plugins
  link: /en-US/manual/usage/market.html
---

# Install for Container

:::warning
Docker 等容器化软件是以服务生产环境而开发的应用平台，在使用此类软件部署之时，我们相信你已经掌握了运维一台服务器所必须的知识，同时也理解了容器化的概念与相关软件的基础操作。Otherwise, you could [choose other installation methods](./index.md) unless you are installing Koishi on an embedded system or NAS, etc.
:::

Koishi 提供了 [Docker](https://hub.docker.com/r/koishijs/koishi) 镜像，方便你在容器中运行 Koishi。你需要首先安装 [Podman](https://podman.io) 或 [Docker](https://www.docker.com) 来运行容器。

## Start container

Start container with the following command:

:::tabs code

```podman
podman run -p 5140:5140 koishijs/koishi
```

```docker
docker run -p 5140:5140 koishijs/koishi
```

:::

许多插件依赖 [koishi-plugin-puppeteer](https://www.npmjs.com/package/koishi-plugin-puppeteer) 来进行图片渲染，故默认镜像中包含 Chromium。If you don't need Chromium to be included, we also offer a lite version:

:::tabs code

```podman
podman run -p 5140:5140 koishijs/koishi:latest-lite
```

```docker
docker run -p 5140:5140 koishijs/koishi:latest-lite
```

:::

On startup, the Koishi console will be bound to the 5140 port.

如果你需要持久化，请使用 `-v /some/place:/koishi` 来映射 Koishi 的文件。

如果需要更正时区，请使用 `-e TZ=Asia/Shanghai` 来设置时区。

:::tip
Koishi 本体及其插件都可以控制台完成更新。After persistence, only several programs such as Chromium or Node.js would be updated when you update the container.
:::

## Install Plugins

在容器运行时，可以通过在浏览器中访问 `http://宿主机地址:5140` 在控制台中安装和启用插件。If you cannot access the Koishi Console, please check the configurations of your firewall.
