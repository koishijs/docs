# 术语表

本页收集了一些 Koishi 设计中的重要概念，按字母表序排列。如果你在阅读文档时对某个概念感到迷惑，可以随时回到这里查看解释。

## 适配器 (Adapter)

参考：

- [入门 > 接入聊天平台](../manual/console/adapter.md)
- [开发 > 使用适配器](../guide/adapter/index.md)
- [API > 适配器](./core/adapter.md)

## 应用 (App)

参考：

- [开发 > 配置文件](../guide/develop/config.md)
- [API > 应用](./core/app.md)

## 机器人 (Bot)

参考：

- [API > 机器人](./core/bot.md)

## 频道 (Channel)

## 指令 (Command)

参考：

- [入门 > 指令系统](../manual/usage/command.md)
- [开发 > 指令开发](../guide/basic/command.md)
- [API > 指令](./core/command.md)

## 上下文 (Context)

参考：

- [开发 > 使用上下文](../guide/plugin/selector.md)
- [API > 上下文](./core/context.md)

## 数据库 (Database)

参考：

- [开发 > 使用数据库](../guide/database/)
- [API > 数据库](./database/built-in.md)

## 事件 (Events)

参考：

- [开发 > 事件系统](../guide/basic/events.md)
- [API > 事件](./core/events.md)

## 群组 (Guild)

## 输出日志 (Logger)

参考：

- [API > 输出日志](./utils/logger.md)

## 中间件 (Middleware)

参考：

- [开发 > 中间件](../guide/basic/middleware.md)

## 数据模型 (Model)

参考：

- [开发 > 扩展数据模型](../guide/database/model.md#扩展数据模型)
- [API > 数据模型](./database/model.md)

## 观察者 (Observer)

参考：

- [API > 观察者](./utils/observer.md)

## 平台 (Platform)

## 插件 (Plugin)

参考：

- [开发 > 使用插件](../guide/plugin/)

## 协议 (Protocol)

## 路由 (Router)

参考：

- [API > 网络服务](./service/router.md)

## 配置模式 (Schema)

参考：

- [开发 > 配置模式](../guide/plugin/schema.md)
- [API > 配置模式](./utils/schema.md)

## 消息元素 (Element)

参考：

- [开发 > 消息元素](../guide/basic/element.md)
- [API > 消息元素](./message/syntax.md)

## 服务 (Service)

服务是一系列挂载于上下文对象上的功能的合集 (例如数据库和路由等)。为避免耦合，这些功能并不直接定义在上下文本身，而是将应用看作一个容器，通过依赖合并的方式来实现控制的反转。

参考：

- [开发 > 服务与依赖](../guide/plugin/service.md)

## 会话 (Session)

会话对象封装了一次上报事件所含有的属性以及其上的可用操作。你会在事件，中间件和指令的回调函数中用到它。此外，会话对象还提供了许多实用方法，足以满足绝大部分的使用场景。

参考：

- [开发 > 事件系统](../guide/basic/events.md)
- [API > 会话](./core/session.md)

## 用户 (User)
