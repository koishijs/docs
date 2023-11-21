# データベース操作 (Database)

::: tip
参见：[开发 > 数据库 > 基本用法](../../guide/database/)
:::

Koishi 的数据库 API 实际上分为两部分：

- Minato 定义的通用数据库接口，由数据库插件实现
- Koishi 内置数据结构相关的方法，由 Koishi 提供实现

这一页中将仅展示第一部分的内容。另一部分的内容请参见 [内置数据结构](./built-in.md)。

## 类型定义

### TableLike

一个可用表。该类型可以是数据库中现有的表名或者一个 [`Selection`](./selection.md) 对象。

```ts
type TableLike<S> = keyof S | Selection
```

### TableJoin

将多个表连接成新的虚拟表。该类型可以是表名数组或者一个由 `TableLike` 构成的字典。如果是表名数组，则新的表将会使用这些表名作为字段名；否则将会使用字典的键作为字段名。

```ts
type TableJoin<S> = (keyof S)[] | Dict<TableLike<S>>
```

### Modifier

对查询的结果进行修饰，包括限制数量、选取字段和排序。

```ts
type Modifier<K extends string> = K[] | ModifierOptions<K>

interface ModifierOptions<K> {
  limit?: number
  offset?: number
  fields?: K[]
  sort?: Dict<'asc' | 'desc'>
}
```

### Update

要更新的数据。包含任意多个字段，每个字段的值可以是一个固定值或者求值表达式。

```ts
type Uneval<T> =
  | T extends number ? Eval.Number
  : T extends string ? Eval.String
  : T extends boolean ? Eval.Boolean
  : T extends Date ? Eval.Date
  : T extends RegExp ? Eval.RegExp
  : T

type Update<S> = {
  [K in keyof S]?: Uneval<S[K]>
}
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

### WriteResult

数据库写入操作的结果。

```ts
export interface WriteResult {
  // upsert 操作中插入数据的行数
  inserted?: number
  // set, upsert, remove 操作中匹配数据的行数
  matched?: number
}
```

## 实例方法

### ctx.database.select(table, query?)

- **table:** `string` 表名
- **query:** [`Query`](./query.md) 约束条件
- 返回值: [`Selection`](./selection.md)

创建一个新的 `Selection` 对象。

### ctx.database.join(tables, query?) <badge type="warning">实验性</badge>

- **tables:** [`TableJoin`](#tablejoin) 用于连接的表
- **query:** [`Callback`](./selection.md#callback) 约束条件
- 返回值: [`Selection`](./selection.md)

将多个表连接成新的虚拟表。

### ctx.database.get(table, query, modifier?)

- **table:** `string` 表名
- **query:** [`Query`](./query.md) 约束条件
- **modifier:** [`Modifier`](#modifier) 请求修饰符
- 返回值: `Promise<any[]>`

查询数据。

### ctx.database.set(table, query, update)

- **table:** `string` 表名
- **query:** [`Query`](./query.md) 约束条件
- **update:** [`Update`](#update) 数据
- 返回值: [`Promise<WriteResult>`](#writeresult)

更新数据。返回对象包含本次操作的匹配行数。

### ctx.database.remove(table, query)

- **table:** `string` 表名
- **query:** [`Query`](./query.md) 约束条件
- 返回值: [`Promise<WriteResult>`](#writeresult)

删除数据。返回对象包含本次操作的匹配行数。

### ctx.database.create(table, data)

- **table:** `string` 表名
- **data:** `any` 数据
- 返回值: `Promise<any>`

插入数据。返回值为插入的数据行。

### ctx.database.upsert(table, data, keys?)

- **table:** `string` 表名
- **data:** [`Update[]`](#update) 数据
- **keys:** `string | string[]` 用于索引的字段
- 返回值: [`Promise<WriteResult>`](#writeresult)

插入或更新数据。返回对象包含本次操作的插入行数和匹配行数。

### ctx.database.eval(table, expr, query?)

- **table:** `string` 表名
- **expr:** [`Callback`](./selection.md#callback) 用于计算的表达式
- **query:** [`Query`](./query.md) 约束条件
- 返回值: `Promise<any>`

计算聚合表达式。

### ctx.database.drop(table)

- **table:** `string` 表名
- 返回值: `Promise<void>`

删除表。

### ctx.database.stats() <badge type="warning">实验性</badge>

- 返回值: [`Promise<Stats>`](#stats)

获取统计信息。
