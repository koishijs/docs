# 服务类插件导航

此页面列举了生态中重要的服务类插件。

某些插件需要依赖其他插件才能拥有完整的功能，这些依赖是通过「服务」的方式进行声明的。最典型的服务是 database，它为大量的插件提供了访问数据库的能力。

由插件提供的服务大致分为两种类型：第一种是抽象服务，它只描述了特定的功能，并可以由多个插件提供；第二种是直接服务，它由某一个插件直接提供对应的功能。绝大多数服务都是直接服务。下面将分别列举提供两类服务的插件。

## 抽象服务

- [assets](https://assets.koishi.chat)：资源存储服务

## 直接服务

### 基础设施

- [cron](https://cron.koishi.chat)：定时任务服务
- [puppeteer](https://puppeteer.koishi.chat)：浏览器服务，可提供图片渲染能力

### 扩展功能

- [nonebot](https://nonebot.koishi.chat)：NoneBot 服务
- [presence](https://presence.koishi.chat)：在线状态服务
