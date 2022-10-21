---
sidebarDepth: 0
---

# 官方插件

Koishi 官方提供了许多插件。为了更好地模块化开发，它们被分散在了多个仓库中。

## 适配器支持

- [@koishijs/plugin-adapter-discord](./adapter/discord.md)
- [@koishijs/plugin-adapter-kook](./adapter/kook.md)
- [@koishijs/plugin-adapter-onebot](./adapter/onebot.md)
- [@koishijs/plugin-adapter-qqguild](./adapter/qqguild.md)
- [@koishijs/plugin-adapter-telegram](./adapter/telegram.md)

## 数据库支持

- [@koishijs/plugin-database-level](./database/level.md)
- [@koishijs/plugin-database-memory]()
- [@koishijs/plugin-database-mongo](./database/mongo.md)
- [@koishijs/plugin-database-mysql](./database/mysql.md)
- [@koishijs/plugin-database-sqlite](./database/sqlite.md)

## 资源存储支持

- [@koishijs/plugin-assets-git](./assets/git.md)
- [@koishijs/plugin-assets-local](./assets/local.md)
- [@koishijs/plugin-assets-remote](./assets/remote.md)
- [@koishijs/plugin-assets-s3](./assets/s3.md)

## 常用功能

- [@koishijs/plugin-broadcast](./common/broadcast.md)：发送广播
- [@koishijs/plugin-echo](./common/echo.md)：发送消息
- [@koishijs/plugin-feedback](./common/feedback.md)：发送反馈
- [@koishijs/plugin-forward](./common/forward.md)：转发消息
- [@koishijs/plugin-recall](./common/recall.md)：撤回消息
- [@koishijs/plugin-repeater](./common/repeater.md)：复读机
- [@koishijs/plugin-respondent](./common/respondent.md)：快捷回复

## 辅助功能

- [@koishijs/plugin-admin](./accessibility/admin.md)：数据管理
- [@koishijs/plugin-bind](./accessibility/bind.md)：账号绑定
- [@koishijs/plugin-callme](./accessibility/callme.md)：设置昵称
- [@koishijs/plugin-locales](./accessibility/locales.md)：本地翻译
- [@koishijs/plugin-rate-limit](./accessibility/rate-limit.md)：速率控制
- [@koishijs/plugin-schedule](./accessibility/schedule.md)：计划任务
- [@koishijs/plugin-sudo](./accessibility/sudo.md)：模拟调用
- [@koishijs/plugin-verifier](./accessibility/verifier.md)：处理申请

## 控制台功能

- [@koishijs/plugin-console](./console/index.md)：控制台
- [@koishijs/plugin-chat](./console/chat.md)：聊天工具
- [@koishijs/plugin-commands](./console/commands.md)：指令管理
- [@koishijs/plugin-dataview](./console/dataview.md)：数据库操作
- [@koishijs/plugin-insight](./console/insight.md)：插件依赖图
- [@koishijs/plugin-logger](./console/logger.md)：日志管理
- [@koishijs/plugin-market](./console/market.md)：插件管理
- [@koishijs/plugin-status](./console/status.md)：运行状态

## 测试工具

- [@koishijs/plugin-memory](./test/memory.md)：模拟数据库
- [@koishijs/plugin-mock](./test/mock.md)：模拟聊天环境
