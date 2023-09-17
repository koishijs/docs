# Database

::: tip
参见：[开发 > 数据库 > 基本用法](../../guide/database/)
:::

::: tip
Koishi 的数据库 API 实际上分为两部分：

- Koishi 内置数据结构相关的方法，由 Koishi 提供实现
- Minato 定义的通用数据库接口，由数据库插件实现

这一页中将仅展示第二部分的内容。另一部分的内容请参见 [内置数据结构](./built-in.md)。
:::

## 类型定义

### TableLike

一个可用表。该类型可以是数据库中现有的表名或者一个 `Selection` 对象。

```ts
type TableLike<S> = keyof S | Selection
```

### Join

将多个表连接成新的虚拟表。该类型可以是表名数组或者一个由 `TableLike` 构成的字典。如果是表名数组，则新的表将会使用这些表名作为字段名；否则将会使用字典的键作为字段名。

```ts
type Join<S> = (keyof S)[] | Dict<TableLike<S>>
```

### Stats

数据库统计信息。

```ts
interface Stats {
  size: number
  tables: Dict<TableStats>
}

interface TableStats {
  count: number
  size: number
}
```

## 实例方法

### database.select(table, query?)

- **table:** `string` 表名
- **query:** [`Query`](./query.md) 约束条件
- 返回值: [`Selection`](./selection.md)

创建一个新的 `Selection` 对象。

### database.join(tables, query?) <badge type="warning">实验性</badge>

- **tables:** [`Join`](#join) 用于连接的表
- **query:** [`Query`](./query.md) 约束条件
- 返回值: [`Selection`](./selection.md)

将多个表连接成新的虚拟表。

### database.get(table, query, modifier?)

- **table:** `string` 表名
- **query:** [`Query`](./query.md) 约束条件
- **modifier:** `QueryModifier<keyof Tables[T]>` 请求修饰符
- 返回值: `Promise<Tables[T][]>`

查询数据。

### database.set(table, query, updater)

- **table:** `string` 表名
- **query:** [`Query`](./query.md) 约束条件
- **updater:** `QueryUpdater<keyof Tables[T]>` 更新器
- 返回值: `Promise<void>`

更新数据。

### database.remove(table, query)

- **table:** `string` 表名
- **query:** [`Query`](./query.md) 约束条件
- 返回值: `Promise<void>`

删除数据。

### database.create(table, data)

- **table:** `string` 表名
- **data:** `any` 数据
- 返回值: `Promise<void>`

插入数据。

### database.upsert(table, data, keys?)

- **table:** `string` 表名
- **data:** `any[]` 数据
- **keys:** `string | string[]` 用于索引的字段
- 返回值: `Promise<void>`

插入或更新数据。

### database.eval(table, expr, query?)

- **table:** `string` 表名
- **expr:** [`Callback`](./selection.md#callback) 用于计算的表达式
- **query:** [`Query`](./query.md) 约束条件
- 返回值: `Promise<any>`

计算聚合表达式。

### database.drop(table)

- **table:** `string` 表名
- 返回值: `Promise<void>`

删除表。

### database.stats() <badge type="warning">实验性</badge>

- 返回值: [`Promise<Stats>`](#stats)

获取统计信息。
