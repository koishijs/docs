# 数据模型

Koishi 的架构允许任何插件对数据库的结构进行扩展。你就可以在不修改 Koishi 或其他插件源码的情况下，为数据库添加新的字段或者表。这些功能都是通过 `ctx.model` 提供的。

请注意：数据模型的扩展一定要在使用前完成，不然后续数据库操作可能会失败。

## 扩展表和字段

可以使用 `model.extend()` 方法扩展一个新的数据表，其中的第一个参数是表名，第二个参数包含了各字段的类型声明。下面的代码向数据库中扩展了一个名为 `schedule` 的表：

```ts
declare module 'koishi' {
  interface Tables {
    schedule: Schedule
  }
}

// 这里是新增表的接口类型
export interface Schedule {
  id: number
  assignee: string
  time: Date
  interval: number
  command: string
  session: Session.Payload
}

ctx.model.extend('schedule', {
  // 各字段的类型声明
  id: 'unsigned',
  assignee: 'string',
  time: 'timestamp',
  interval: 'integer',
  command: 'text',
  session: 'json',
})
```

`model.extend()` 同样也可以向已经存在的表中注入新的字段，使用方法与上面完全一致。例如，下面的代码向内置的 `User` 表中注入了 `foo` 字段：

```ts
declare module 'koishi' {
  interface User {
    foo: string
  }
}

ctx.model.extend('user', {
  // 向用户表中注入字符串字段 foo
  foo: 'string',
})
```

## 資料型別

上面的数据类型均直接使用字符串来定义。对于更复杂的需求，你也可以选择传入一个对象：

```ts
ctx.model.extend('user', {
  foo: {
    type: 'string',
    // 占据的字节长度
    length: 65535,
    // 该字段的默认值
    initial: 'bar',
    // 是否允许为空
    nullable: false,
  },
})
```

当你直接使用 `string` 作为类型时，其默认字节长度为 255，默认初始值为 `''`。不同字段的默认值也有所区别，你可以在 [这里](../../api/database/model.md) 查看完整的数据类型列表。

## 字段迁移

如果你想要修改一个已有的字段 (只修改名称，不修改逻辑)，你并不能单纯地将源码中的字段名改成新名称。如果这样做，数据仍然会停留在旧的字段中，它们实质上已经丢失了，却仍然占据的数据库的空间。此时你需要将旧的字段一并声明到表中：

```ts
ctx.model.extend('user', {
  foo: {
    type: 'string',
    legacy: ['bar', 'baz'],
  },
})
```

这样一来，Koishi 就知道 `foo`, `bar`, `baz` 这三个字段实际上对应是同一列数据，并在启动时自动将旧字段中的数据迁移到 `foo` 字段中。

## 嵌套字段 <badge type="warning">实验性</badge>

数据模型中的字段也可以是一个对象。有两种方式可以实现这一点：

1. 使用 `json` 类型，适用于对象内部属性不固定的情况
2. 为每个属性单独声明嵌套类型，这种做法在查询时更加高效

下面是第二种方式的声明示例：

```ts
declare module 'koishi' {
  interface User {
    foo: {
      bar: string
      baz: number
    }
  }
}

// 声明嵌套类型时，对象的多级属性被拼接为一个字符串
ctx.model.extend('user', {
  'foo.bar': 'string',
  'foo.baz': 'integer',
})
```

无论是哪一种情况，在查询时 `foo` 都会被视为一个独立的字段。

我们甚至还可以把上述两种方式相结合起来，例如指定 `foo.bar` 的类型为 `json`。

## 声明索引 <badge type="warning">实验性</badge>

`model.extend()` 还接受一个可选的三参数，在这里你可以对表的索引进行设置：

```ts
// 注意这里配置的是第三个参数，也就是之前 autoInc 所在的参数
ctx.model.extend('foo', {}, {
  // 主键，默认为 'id'
  // 主键将会被用于 Query 的简写形式，如果传入的是原始类型或数组则会自行理解成主键的值
  primary: 'name',
  // 自增主键值
  autoInc: true,
  // 唯一键，这应该是一个列表
  // 这个列表中的字段对应的值在创建和修改的时候都不允许与其他行重复
  unique: ['bar', 'baz'],
  // 外键，这应该是一个键值对
  foreign: {
    // 相当于约束了 foo.uid 必须是某一个 user.id
    uid: ['user', 'id'],
  },
})
```

## 整表迁移 <badge type="warning">实验性</badge>

::: warning
整表迁移的性能较差，建议谨慎设计数据库结构而不是依赖迁移。
:::

前面介绍的 [字段迁移](#字段迁移) 仅仅适用于修改字段名称的情况。如果你的插件需要重构表的数据结构，这种方法就不适用了。此时你可以使用 `model.migrate()` 方法来进行整表迁移：

```ts
ctx.model.extend('qux', {
  id: 'unsigned',
  text: 'string',
})

ctx.model.extend('qux2', {
  id: 'unsigned',
  flag: 'boolean',
})

// 如果 qux 中存在 flag 列，则对这部分数据进行迁移
ctx.model.migrate('qux', {
  flag: 'boolean',
}, async (database) => {
  const data = await database.get('qux', {}, ['id', 'flag'])
  await database.upsert('qux2', data)
})
```

上面的例子展示了如何将 `qux` 表中的 `flag` 数据迁移到 `qux2` 表中。迁移完成后，`qux` 表中的 `flag` 列将会被删除，而其他列则会保留。如果你希望删除旧表，可以在回调函数的最后加上一句 `database.drop('qux')`。
