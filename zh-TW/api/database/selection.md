# 查询构造器 (Selection)

::: tip
参见：[开发 > 数据库 > 进阶查询技巧](../../guide/database/selection.md)
:::

`Selection` 可以由 [`database.select()`](./database.md#database-select) 或 [`database.join()`](./database.md#database-join) 方法创建，也可以被其他 `Selection` 的实例方法返回。它提供了一组链式调用的 API，用于构造查询语句。

## 类型定义

### Row

象征一行数据的代理对象。其上的属性对应取值的 [`EvalExpr`](./evaluation.md)。

```ts
type Cell<T> = EvalExpr<T> & (T extends Comparable ? {} : Row<T>)

type Row<S> = {
  [K in keyof S]-?: Cell<NonNullable<S[K]>>
}
```

### Callback

可以视为字段的回调函数。接受当前行作为参数，返回一个 [`EvalExpr`](./evaluation.md)。

```ts
type Callback<S, T> = (row: Row<S>) => EvalExpr<T>
```

### FieldLike

一个可用字段。该类型可以是表中现有的字段名或者一个由回调函数表示的虚拟字段。

```ts
type FieldLike<S> = keyof S | Callback<S>
```

### Project

使用多个字段构造新的虚拟表。该类型可以是字段名数组或者一个由 `FieldLike` 构成的字典。如果是字段名数组，则新的表将会沿用这些字段的名称；否则将会使用字典的键作为字段名。

```ts
type Project<S> = (keyof S)[] | Dict<FieldLike<S>>
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

- **fields:** [`Project`](#project) 用于投影的字段
- 返回值: `Selection`

对结果进行投影。

### selection.groupBy(fields, extra?)

- **fields:** [`Project`](#project) 用于分组的字段
- **extra:** [`Dict<FieldLike>`](#fieldlike) 向分组内添加额外的字段
- 返回值: `Selection`

对结果进行分组。

### selection.execute(expr?)

- **expr:** [`EvalExpr`](./evaluation.md) 用于计算的表达式
- 返回值: `Promise<any>`

执行查询并返回结果。如果没有传入 `expr`，返回的是一个包含所有结果的数组；否则返回的是由 `expr` 聚合计算出的结果。
