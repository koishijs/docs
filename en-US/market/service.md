# Service Plugins

This page lists important service plugins in the ecosystem.

Some plugins rely on other plugins to have full functionality. These dependencies are declared as "Services".The most typical service is database, which provides access to databases for many plugins.

由插件提供的服务大致分为两种类型：第一种是抽象服务，它只描述了特定的功能，并可以由多个插件提供；第二种是直接服务，它由某一个插件直接提供对应的功能。绝大多数服务都是直接服务。下面将分别列举提供两类服务的插件。

## Abstract Services

- [assets](https://assets.koishi.chat): asset storage service

## Direct Services

### Infrastructure

- [cron](https://cron.koishi.chat): scheduled task service
- [puppeteer](https://puppeteer.koishi.chat): browser service that provides image rendering capability

### Extension

- [nonebot](https://nonebot.koishi.chat): NoneBot service
- [presence](https://presence.koishi.chat): online status service
