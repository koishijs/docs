# 术语表

本页收集了一些 Koishi 设计中的重要概念，按字母表序排列。如果你在阅读文档时对某个概念感到迷惑，可以随时回到这里查看解释。

## Adapter

适配器是指实现了平台协议，能够让机器人接入平台的插件。In general, one adapter instance corresponds to one robot user, and enabling multiple adapters at the same time allows simultaneous access to multiple robots.

- [入门 > 接入聊天平台](../manual/usage/adapter.md)
- [开发 > 跨平台 > 实现适配器](../guide/adapter/adapter.md)
- [API > 核心模块 > 适配器](./core/adapter.md)

## App

- [开发 > 开发起步 > 配置文件](../guide/develop/config.md)
- [API > 核心模块 > 应用](./core/app.md)

## Bot

机器人是指由 Koishi 操控的平台用户。The user here is not necessarily a real user. It can also be a bot user, which is provided by some platforms.By interacting with the robot, other users experience Koishi's functions.

- [开发 > 交互基础 > 进阶用法](../guide/basic/advanced.html#机器人对象)
- [开发 > 跨平台 > 实现机器人](../guide/adapter/bot.md)
- [API > 核心模块 > 机器人](./core/bot.md)
- [API > 内置服务 > 机器人](./service/bots.md)

## 频道 (Channel)

频道是消息的集合。A channel contains a series of messages that have a temporal and logical sequence to each other.Channels are divided into private chat channels and group chat channels, where private chat channels have only two participants and group chat channels can have any number of participants.

- [开发 > 跨平台 > 基础知识](../guide/adapter/index.html#核心概念)

## Command

- [入门 > 指令系统](../manual/usage/command.md)
- [开发 > 交互基础 > 指令开发](../guide/basic/command.md)
- [API > 核心模块 > 指令](./core/command.md)

## Console (Console)

- [入门 > 认识控制台](../manual/usage/market.md#认识控制台)
- [开发 > 控制台](../guide/console/index.md)
- [API > 控制台](./console/server.md)

## Context

- [开发 > 模块化](../guide/plugin/index.md)
- [API > 核心模块 > 上下文](./core/context.md)

## 数据库 (Database)

- [入门 > 访问数据库](../manual/recipe/dataview.md)
- [开发 > 数据库 > 使用数据库](../guide/database/index.md)
- [API > 数据库](./database/built-in.md)

## 消息元素 (Element)

消息元素类似于 HTML 元素，它是组成消息的基本单位。一个元素可以表示具有特定语义的内容，如文本、表情、图片、引用、元信息等。Koishi 会将这些元素转换为平台所支持的格式，以便在不同平台之间发送和接收消息。

- [开发 > 交互基础 > 消息元素](../guide/basic/element.md)
- [开发 > 跨平台 > 消息编码](../guide/adapter/message.md)
- [API > 消息元素](./message/syntax.md)

## Events

- [开发 > 交互基础 > 事件系统](../guide/basic/events.md)
- [API > 核心模块 > 事件](./core/events.md)
- [API > 内置服务 > 事件系统](./service/events.md)

## 过滤器 (Filter)

- [入门 > 过滤器](../manual/usage/customize.md#过滤器)
- [开发 > 模块化 > 过滤器](../guide/plugin/filter.md)
- [API > 内置服务 > 过滤器](./service/filter.md)

## 群组 (Guild)

群组是平台用户的集合。一个群组通常会同时包含一组[用户](#用户)和[频道](#频道)，并通过权限机制让其中的部分用户进行管理。在部分平台中，群组和群聊频道的概念恰好是重合的 (例如 Telegram)：一个群组内有且仅有一个群聊频道。The private chat channel does not belong to any of the guilds

- [开发 > 跨平台 > 基础知识](../guide/adapter/index.html#核心概念)

## 生命周期 (Lifecycle)

- [开发 > 模块化 > 生命周期](../guide/plugin/lifecycle.md)
- [API > 核心模块 > 事件](./core/events.html#生命周期事件)
- [API > 内置服务 > 插件系统](./service/registry.md)

## 中间件 (Middleware)

- [开发 > 交互基础 > 中间件](../guide/basic/middleware.md)

## Data Model

- [开发 > 数据库 > 数据模型](../guide/database/model.md)
- [API > 数据库 > 数据模型](./database/model.md)

## 平台 (Platform)

平台是指聊天平台，比如 QQ、Discord 等。Users on the same platform can message each other, but users on different platforms cannot message each other.对于 Rocket.Chat 这一类可自建的聊天平台而言，每个独立的自建服务器都视为不同的平台。

- [开发 > 跨平台 > 基础知识](../guide/adapter/index.html#核心概念)

## 插件 (Plugin)

- [开发 > 模块化 > 认识插件](../guide/plugin/index.md)
- [API > 内置服务 > 插件系统](./service/registry.md)

## 协议 (Protocol)

## 路由 (Router)

- [API > 内置服务 > 网络服务](./service/router.md)

## 配置构型 (Schema)

- [开发 > 模块化 > 配置构型](../guide/plugin/schema.md)
- [演练场 > 配置构型](../schema/index.md)

## 服务 (Service)

服务是一系列挂载于上下文对象上的功能的合集 (例如数据库和路由等)。为避免耦合，这些功能并不直接定义在上下文本身，而是将应用看作一个容器，通过依赖合并的方式来实现控制的反转。

- [开发 > 模块化 > 服务与依赖](../guide/plugin/service.md)
- [API > 核心模块 > 上下文](./core/context.md#混入属性和方法)

## Session

会话对象封装了一次上报事件所含有的属性以及其上的可用操作。你会在事件，中间件和指令的回调函数中用到它。此外，会话对象还提供了许多实用方法，足以满足绝大部分的使用场景。

- [开发 > 交互基础 > 事件系统](../guide/basic/events.md)
- [API > 核心模块 > 会话](./core/session.md)

## 用户 (User)
