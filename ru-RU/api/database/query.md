# 查询表达式 (Query)

::: tip
参见：[开发 > 数据库 > 基本用法](../../guide/database/index.md)
:::

查询表达式用于表达数据库操作中的约束条件。你可以在 [`Database`](./database.md) 或 [`Selection`](./selection.md) 的实例方法中使用。查询表达式的基本形式是一个字典，其中的键是字段名，值是约束条件。例如：

```ts
ctx.database.get('foo', {
  bar: 1,
  baz: { $gt: 2 },
})
```

上述查询表达式的意思是：`bar` 字段的值等于 `1`，且 `baz` 字段的值大于 `2`。

## 类型定义

### FieldExpr

本节中定义的具体操作符构成的对象，例如 `{ $gt: 2 }`。

### Shorthand

为了简化查询操作符的书写，我们为特定类型的字段引入了一些简写形式：

- 如果该字段的类型是可比较类型，那么接受一个同类型的值，相当于 [`$eq`](#eq) 操作符
- 如果该字段的类型是可索引类型，那么接受一个数组，相当于 [`$in`](#in) 操作符
- 如果该字段的类型是字符串，那么接受一个正则表达式，相当于 [`$regex`](#regex) 操作符

```ts
type Extract<S, T, U> = S extends T ? U : never

type Shorthand<T> =
  | Extract<T, Comparable, T>
  | Extract<T, Indexable, T[]>
  | Extract<T, string, RegExp>
```

### FieldQuery

某个字段的约束条件。可以是一个 [`FieldExpr`](#fieldexpr) 或 [`Shorthand`](#shorthand)。

```ts
type FieldQuery<T> = FieldExpr<T> | Shorthand<T>
```

### QueryExpr

一个字典，其中的键是字段名，值是该字段约束条件。除此以外，还可以使用逻辑运算符 `$or`, `$and`, `$not` 来组合多个约束条件。

```ts
type QueryExpr<T> = LogicalExpr<T> & {
  [K in keyof T]?: null | FieldQuery<T[K]>
}

interface LogicalExpr<T> {
  $or?: QueryExpr<T>[]
  $and?: QueryExpr<T>[]
  $not?: QueryExpr<T>
}
```

### Query

某个表的约束条件。它可以是：

- 一个 [`QueryExpr`](#queryexpr)，用于约束表中的字段
- 一个 [`Shorthand`](#shorthand)，用于约束表中的主键 (如果主键唯一)
- 一个 [`Callback`](./selection.md#callback)，可以在其中使用求值表达式

```ts
type Query<T> = QueryExpr<T> | Shorthand<Indexable> | Callback<T, boolean>
```

## 逻辑运算

逻辑运算可以出现在 `QueryExpr` 或 `FieldExpr` 中。根据出现的场合，它们的类型和含义也会有所不同。

### $or

- 类型: `QueryExpr[]` (作为 `QueryExpr` 时)
- 类型: `FieldExpr[]` (作为 `FieldExpr` 时)

一组约束条件的或运算。

### $and

- 类型: `QueryExpr[]` (作为 `QueryExpr` 时)
- 类型: `FieldExpr[]` (作为 `FieldExpr` 时)

一组约束条件的与运算。

### $not

- 类型: `QueryExpr` (作为 `QueryExpr` 时)
- 类型: `FieldExpr` (作为 `FieldExpr` 时)

约束条件的否定。

## 元素运算

### $in

- 类型: `T[]` (`T extends Indexable`)

判断字段的值是否在给定的数组中。

### $nin

- 类型: `T[]` (`T extends Indexable`)

判断字段的值是否不在给定的数组中。

## 比较运算

### $eq

- 类型: `T` (`T extends Comparable`)

判断字段的值是否等于给定的值。

### $ne

- 类型: `T` (`T extends Comparable`)

判断字段的值是否不等于给定的值。

### $gt

- 类型: `T` (`T extends Comparable`)

判断字段的值是否大于给定的值。

### $gte

- 类型: `T` (`T extends Comparable`)

判断字段的值是否大于或等于给定的值。

### $lt

- 类型: `T` (`T extends Comparable`)

判断字段的值是否小于给定的值。

### $lte

- 类型: `T` (`T extends Comparable`)

判断字段的值是否小于或等于给定的值。

## 列表运算

### $el

- 类型: [`FieldExpr<U>`](#fieldexpr) (`T extends U[]`)

判断列表中是否存在满足给定约束条件的元素。

::: warning
部分数据库可能不支持使用子条件，因此请尽量只使用 [`$eq`](#eq) 操作符。
:::

### $size

- 类型: `number` (`T extends any[]`)

判断列表的长度是否等于给定的值。

## 正则表达式

### $regex

- 类型: `RegExp` (`T extends string`)

判断字段的值是否匹配给定的正则表达式。

### $regexFor

- 类型: `string` (`T extends string`)

将字段的值作为正则表达式，判断给定的字符串是否匹配。

## 位运算

### $bitsAllSet

- 类型: `number` (`T extends number`)

判断字段的值是否包含给定的全部位。

### $bitsAllClear

- 类型: `number` (`T extends number`)

判断字段的值是否不包含给定的全部位。

### $bitsAnySet

- 类型: `number` (`T extends number`)

判断字段的值是否包含给定的任意位。

### $bitsAnyClear

- 类型: `number` (`T extends number`)

判断字段的值是否不包含给定的任意位。
