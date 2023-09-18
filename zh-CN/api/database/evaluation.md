# 求值表达式 (Eval)

::: tip
参见：[开发 > 数据库 > 进阶查询技巧](../../guide/database/selection.md)
:::

求值表达式是一组静态 API，主要在 [`Selection`](./selection.md) 中使用。你可以从 Koishi 中直接导入：

```ts
import { Eval } from 'koishi'
// 或者使用更短的别名
import { $ } from 'koishi'
```

## 类型定义

### \{Type\}

本节中使用的 `Number`, `String`, `Boolean`, `Any` 并非 JavaScript 中的内置函数，而是对应于 `number`, `string`, `boolean`, `any` 类型的求值表达式。例如，当一个表的 `foo` 字段有数值类型时，求值表达式 `$.gt(row.x, 1)` 是合法的，并且返回值的类型是 `Boolean`。

```ts
type $Date = Date
type $RegExp = RegExp

namespace Eval {
  type Number = number | EvalExpr<number>
  type String = string | EvalExpr<string>
  type Boolean = boolean | EvalExpr<boolean>
  type Date = $Date | EvalExpr<$Date>
  type RegExp = $RegExp | EvalExpr<$RegExp>
  type Any = string | number | boolean | $Date | $RegExp | EvalExpr<any>
}
```

### EvalExpr

本节中任意求值表达式的返回值。

## 数值运算

### $.add(...values)

- **values:** `Number[]` 要相加的值
- 返回值: `EvalExpr<number>`

将一组值相加。

### $.subtract(x, y)

- **x:** `Number` 被减数
- **y:** `Number` 减数
- 返回值: `EvalExpr<number>`

将两个值相减。

### $.multiply(...values)

- **values:** `Number[]` 要相乘的值
- 返回值: `EvalExpr<number>`

将一组值相乘。

### $.divide(x, y)

- **x:** `Number` 被除数
- **y:** `Number` 除数
- 返回值: `EvalExpr<number>`

将两个值相除。

## 比较运算

### $.eq(...values)

- **values:** `Any[]` 要比较的值
- 返回值: `EvalExpr<boolean>`

判断一组值是否相等。

### $.ne(x, y)

- **x:** `Any` 任意值
- **y:** `Any` 任意值
- 返回值: `EvalExpr<boolean>`

判断 `x != y`。

### $.gt(x, y)

- **x:** `Number` 任意值
- **y:** `Number` 任意值
- 返回值: `EvalExpr<boolean>`

判断 `x > y`。

### $.gte(x, y)

- **x:** `Number` 任意值
- **y:** `Number` 任意值
- 返回值: `EvalExpr<boolean>`

判断 `x >= y`。

### $.lt(x, y)

- **x:** `Number` 任意值
- **y:** `Number` 任意值
- 返回值: `EvalExpr<boolean>`

判断 `x < y`。

### $.lte(x, y)

- **x:** `Number` 任意值
- **y:** `Number` 任意值
- 返回值: `EvalExpr<boolean>`

判断 `x <= y`。

## 字符串运算

### $.concat(...values)

- **values:** `String[]` 要连接的值
- 返回值: `EvalExpr<string>`

连接一组字符串。

## 布尔运算

### $.and(...values)

- **values:** `Boolean[]` 布尔值
- 返回值: `EvalExpr<boolean>`

将一组布尔值做与运算。

### $.or(...values)

- **values:** `Boolean[]` 布尔值
- 返回值: `EvalExpr<boolean>`

将一组布尔值做或运算。

### $.not(values)

- **values:** `Boolean` 布尔值
- 返回值: `EvalExpr<boolean>`

将一个布尔值取反。

## 聚合运算

### $.sum(x)

- **x:** `Number` 数值表达式
- 返回值: `EvalExpr<number>`

累加一组值。

### $.avg(x)

- **x:** `Number` 表达式
- 返回值: `EvalExpr<number>`

计算一组值的平均值。

### $.min(x)

- **x:** `Number` 表达式
- 返回值: `EvalExpr<number>`

计算一组值的最小值。

### $.max(x)

- **x:** `Number` 表达式
- 返回值: `EvalExpr<number>`

计算一组值的最大值。

### $.count(x)

- **x:** `Any` 表达式
- 返回值: `EvalExpr<number>`

统计不同元素的数量。
