# 机器人 (Bots)

::: warning
本节中介绍的 API 目前属于实验性功能，可能在后续版本中发生变化。
:::

`ctx.bots` 保存了当前全部 [Bot](../core/bot.md) 实例。它继承了 Array 类，因此你可以使用诸如 `ctx.bots.forEach()` 的写法。除此以外，我们还提供了一些与机器人相关的实用方法。

## 实例属性

### ctx.bots\[sid]

- **sid:** `string` 机器人的 sid

你可以用这个属性来获取或移除机器人实例。

## 实例方法

### ctx.getSelfIds(type?, assignees?)

- **type:** `Platform` 平台名称，如果不写就对应全部平台
- **assignees:** `string[]` 机器人 ID 列表，如果不写就对应当前平台的全部机器人
- 返回值: `Record<string, readonly string[]>` 平台名到机器人 ID 列表的键值对

按平台名称对机器人分类。

### ctx.broadcast(channels?, content, forced?) <badge>需要数据库</badge>

- **channels:** `string[]` 频道列表
- **content:** `string` 要发送的内容
- **forced:** `boolean` 是否无视 silent 标记
- 返回值: `Promise<string[]>` 成功发送的消息 ID 列表

所有机器人向自己分配的频道广播消息，存在标记 silent 的频道除外。如有失败不会抛出错误。

<!-- ### ctx.bots.get(sid)

- **sid:** `string` 机器人的 sid
- 返回值: `Bot` 机器人实例

使用 sid 获取机器人实例。

### ctx.bots.remove(id)

- **sid:** `string` 机器人的 id
- 返回值: `boolean` 机器人实例是否存在

移除一个机器人实例。 -->
