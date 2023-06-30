# Service Plugins

This page lists important service plugins in the ecosystem.

Some plugins rely on other plugins to have full functionality. These dependencies are declared as "Services".The most typical service is database, which provides access to databases for many plugins.

Services provided by plugins are roughly divided into two types: the first is abstract services, which only describe specific functions and can be provided by multiple plugins; the second is direct services, whose functions are directly provided by plugins. Most services are direct services. The following is a list of plugins that provide these two types of services.

## Abstract Services

- [assets](https://assets.koishi.chat): asset storage service

## Direct Services

### Infrastructure

- [cron](https://cron.koishi.chat): scheduled task service
- [puppeteer](https://puppeteer.koishi.chat): browser service that provides image rendering capability

### Extension

- [nonebot](https://nonebot.koishi.chat): NoneBot service
- [presence](https://presence.koishi.chat): online status service
