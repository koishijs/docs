# 查询构造器 (Selection)

::: tip
参见：[开发 > 数据库 > 进阶查询技巧](../../guide/database/selection.md)
:::

## 类型定义

### Callback

可以视为字段的回调函数。接受当前行作为参数，返回一个 [`Eval.Expr`](./evaluation.md)。

```ts
type Callback<S> = (row: Row<S>) => Eval.Expr
```

### FieldLike

一个的可用字段。该类型可以是表中现有的字段名或者一个回调函数。

```ts
type FieldLike<S> = keyof S | Callback<S>
```

### ProjectFields

使用多个字段构造新的表。该类型可以是字段名、字段名数组或者一个由回调函数构成的字典。如果是字段名或者字段名数组，则新的表将会沿用它们的名称；否则将会使用字典的键作为字段名。

```ts
type ProjectFields<S> = keyof S | (keyof S)[] | Dict<FieldLike<S>>
```

## 实例方法

### selection.where(query)

- **query:** [`Query`](./query.md) 约束条件
- 返回值: `Selection`

添加约束条件。

### selection.orderBy(key, order?)

- **key:** [`FieldLike`](#fieldlike) 用于排序的字段
- **order:** `'asc' | 'desc'` 排序方式
- 返回值: `Selection`

对结果进行排序。

### selection.limit(count)

- **count:** `number` 数量限制
- 返回值: `Selection`

限制结果数量。

### selection.offset(count)

- **count:** `number` 偏移量
- 返回值: `Selection`

跳过指定数量的结果。

### selection.project(fields)

- **fields:** [`ProjectFields`](#projectfields) 用于投影的字段
- 返回值: `Selection`

对结果进行投影。

### selection.groupBy(fields, extra?)

- **fields:** [`ProjectFields`](#projectfields) 用于分组的字段
- **extra:** [`Dict<FieldLike<S>>`](#fieldlike) 向分组内添加额外的字段
- 返回值: `Selection`

对结果进行分组。

### selection.execute(expr?)

- **expr:** [`Eval.Expr`](./evaluation.md) 用于计算的表达式
- 返回值: `Promise<any>`

执行查询并返回结果。如果没有传入 `expr`，返回的是一个包含所有结果的数组；否则返回的是由 `expr` 聚合计算出的结果。
