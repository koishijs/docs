# 基本用法

::: tip
`ctx.database` 并非内置服务，因此如果你的插件需要使用数据库功能，需要[声明依赖](../plugin/service.md#using-属性)。
:::

对于几乎所有大型机器人项目，数据库的使用都是不可或缺的。但如果每个插件都独立处理与数据库的交互，这将导致插件之间的兼容性非常差——用户要么选择同时安装多个数据库，要么只能放弃一些功能。为此，Koishi 设计了一整套对象关系映射 (ORM) 接口，它易于扩展并广泛地运用于各种插件中，足以应对绝大部分使用场景。

## `get`：查询数据

使用 `database.get()` 方法以获取特定表中的数据。下面是一个最基本的形式：

```ts
// 获取 schedule 表中 id 为 1234 的数据行，返回一个数组
await ctx.database.get('schedule', 1234)

// 获取 schedule 表中 id 为 1234 或 5678 的数据行，返回一个数组
await ctx.database.get('schedule', [1234, 5678])
```

对于复杂的数据表，如果你只需要获取少数字段，你可以通过第三个参数手动指定要获取的字段：

```ts
// 返回的数组中每个元素只会包含 command, time 属性
await ctx.database.get('schedule', [1234], ['command', 'time'])
```

你还可以向第二个参数传入一个对象，用来查询非主键上的数据或者同时指定多列的值：

```ts
// 获取名为 schedule 的表中 assignee 为 onebot:123456 的数据行
await ctx.database.get('schedule', {
  assignee: ['onebot:123456'],
})
```

对于需要进行复杂的数据库搜索的，ORM 也提供了相对应的方法：

```ts
// 获取名为 schedule 的表中 id 大于 2 但是小于等于 5 的数据行
await ctx.database.get('schedule', {
  id: { $gt: 2, $lte: 5 },
})
```

我们甚至也支持逻辑运算：

```ts
// 上述两个搜索条件的或运算
await ctx.database.get('schedule', {
  $or: [
    { assignee: ['onebot:123456'] },
    { id: { $gt: 2, $lte: 5 } },
  ],
})
```

你可以在 [这里](../../api/database/query.md) 看到完整的查询表达式 API。

## `create`：插入数据

使用 `database.create()` 方法以插入数据。

```ts
// 向 schedule 表中添加一行数据，data 是要添加的数据行
// 返回值是添加的行的完整数据 (包括自动填充的 id 和默认属性等)
await ctx.database.create('schedule', row)
```

如果你想要批量插入数据，可以使用下面介绍的 `database.upsert()` 方法。

## `set`：修改数据

`database.set()` 方法需要传入三个参数：表名、查询条件和要修改的数据。

```ts
// 第二个参数也可以使用上面介绍的查询表达式
await ctx.database.set('schedule', 1234, {
  assignee: 'onebot:123456',
  time: new Date(),
})
```

如果要修改的数据与已有数据相关，可以使用求值表达式：

```ts
// 让所有日期为今天的数据行的 count 字段在原有基础上增加 1
await ctx.database.set('foo', { date: new Date() }, {
  // { $add: [a, b] } 相当于 a + b
  // { $: field } 相当于对当前行的 field 字段取值
  count: { $add: [{ $: 'count' }, 1] },
})
```

你可以在 [这里](../../api/database/evaluation.md) 看到完整的求值表达式 API。

## `upsert`：修改或插入数据

`database.upsert()` 的逻辑稍微有些不同，需要你传入一个数组：

```ts
// 用一个数组来对数据进行更新，你需要确保每一个元素都拥有这个数据表的主键
// 修改时只会用每一行中出现的键进行覆盖，不会影响未定义的字段
await ctx.database.upsert('foo', [
  { id: 1, foo: 'hello' },
  { id: 2, foo: 'world' },
  // 这里同样支持求值表达式，$concat 可用于连接字符串
  { id: 3, bar: { $concat: ['koi', 'shi'] } },
])
```

如果初始的数据库是这样的：

| id    | foo  | bar |
| ----- | ---- | --- |
| (默认值) | null | bar |
| 1     | foo  | baz |

那么进行上述操作后的数据库将是这样的：

| id | foo   | bar    | 说明                                 |
| -- | ----- | ------ | ---------------------------------- |
| 1  | hello | baz    | 该行已经存在，只更新了 foo 字段                 |
| 2  | world | bar    | 插入了新行，其中 foo 字段取自传入的数据，bar 字段取自默认值 |
| 3  | null  | koishi | 插入了新行，其中 bar 字段取自传入的数据，foo 字段取自默认值 |

如果想以非主键来索引要修改的数据，可以使用第三个参数：

```ts
// @errors: 2304
// 以非主键为基准对数据表进行更新，你需要确保每一个元素都拥有 onebot 属性
await ctx.database.upsert('user', rows, 'onebot')

// 以复合键为基准对数据表进行更新，你需要确保每一个元素都拥有 platform 和 id 属性
await ctx.database.upsert('channel', rows, ['platform', 'id'])
```

## `remove`：删除数据

使用 `database.remove()` 方法以删除特定表中的数据。

```ts
// 从 schedule 表中删除特定 id 的数据行
// 第二个参数也可以使用上面介绍的查询表达式
await ctx.database.remove('schedule', [id])
```

## 对比 set 和 upsert

`set` 与 `upsert` 方法都可以用于修改已经存在的数据，它们的区别如下表所示：

|      | set              | upsert        |
| ---- | ---------------- | ------------- |
| 作用范围 | 支持复杂的查询表达式       | 只能限定特定字段的值    |
| 插入行为 | 如果数据不存在则不会进行任何操作 | 如果数据不存在则会插入新行 |

## 对比 create 和 upsert

`create` 与 `upsert` 方法都可以用于插入新的数据，它们的区别如下表所示：

|              | create      | upsert        |
| ------------ | ----------- | ------------- |
| 插入数量         | 只能插入一条数据    | 可以批量插入多条数据    |
| return value | 返回经过填充后的数据  | 没有返回值         |
| 冲突行为         | 如果数据已存在则会报错 | 如果数据已存在则会执行修改 |
