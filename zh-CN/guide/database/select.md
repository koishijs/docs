# 进阶查询技巧

`database.get()` 已经能实现一些简单的查询了。然而在实际的开发中，我们通常会遇到排序、分组乃至聚合等更复杂的查询需求。此时就轮到更加强大的 `database.select()` 方法登场了。

## 基本用法

`database.select()` 会创建一个 `Selection` 对象。它提供了一系列的链式方法，你可以将其理解成一个查询语句的构造器。构造完成后，你可以调用 `.execute()` 方法来执行最终的查询。下面是一个简单的例子：

```ts
ctx.database.get('foo', { id: { $gt: 5 } })
// 等价于
ctx.database.select('foo')
  .where({ id: { $gt: 5 } })
  .execute()
```

## 排序与分页

使用 `.orderBy()` 方法来对查询结果排序，使用 `.limit()` 和 `.offset()` 方法来分页：

```ts
// 按 id 降序排列，从第 100 条开始取 10 条数据
ctx.database.select('foo')
  .orderBy('id', 'desc')
  .limit(10)
  .offset(100)
  .execute()
```

## 求值表达式

`.orderBy()` 和 `.where()` 方法都支持传入一个函数，这个函数会接受一个 `row` 参数，表示当前正在处理的数据行。你可以在这个函数中返回一个值，这个值会被用于排序或筛选。

```ts
// 返回 id 大于 5 的数据行，并按 id 升序排列
ctx.database.select('foo')
  .where(row => $.gt(row.id, 5))
  .orderBy(row => row.id)
  .execute()
```

这里的 `$.gt()` 是一个求值表达式。你可以在 [这里](../../api/database/eval.md) 看到完整的求值表达式 API。

## 字段映射

`.project()` 方法可以用于映射查询结果。它接受一个对象，对象的键表示要映射的字段名，值表示映射的表达式。下面是一个例子：

```ts
// 返回的数组元素将只含有 a, b 属性
ctx.database.select('foo')
  .project({
    a: row => $.add(row.id, 1),         // a = id + 1
    b: row => $.multiply(row.id, 2),    // b = id * 2
  })
  .execute()
```

## 聚合查询

`.execute()` 也可以传入一个带有聚合运算的求值函数。如果你这样做，此时返回的结果将不再是一个数组，而是该表达式计算出的值。

```ts
// 返回 id 大于 5 的数据行的数量
ctx.database.select('foo')
  .where(row => $.gt(row.id, 5))
  .execute(row => $.count(row.id))
```

除了 `.count()` 外还有其他的一些聚合运算，例如 `$.sum()`，`$.max()` 等。聚合运算与其他求值函数的区别在于，聚合运算的外部不能再包含 `row` 的引用。

此外，只有特定方法中才能使用聚合运算，例如 `.execute()` 和 `.having()` 等。

## 分组查询

`.groupBy()` 和 `.having()` 方法可以用于分组查询。`.groupBy()` 方法接受一个字段名或求值函数，`.having()` 方法接受一个含有聚合运算并返回布尔值的表达式。下面是一个例子：

```ts
// 按照 value 字段分组，返回结果数大于 5 的分组
ctx.database.select('foo')
  .groupBy('value')
  .having(row => $.gt($.count(row.id), 5))
  .execute()
```

`.groupBy()` 可以接受一个数组，表示同时对数组中的字段进行分组。甚至也可以是一个对象，与 `.project()` 中的用法类似。

```ts
// 返回的数据将按照 id - value 的值分组
ctx.database.select('foo')
  .groupBy({
    key: row => $.subtract(row.id, row.value),
  })
  .execute()
```

`.having()` 中可以使用的 `row` 属性仅限于 `.groupBy()` 中的字段。

### 添加字段

`.groupBy()` 还额外接受一个二参数，用于在查询结果中添加聚合字段。这个参数是一个对象，同样与 `.project()` 中的用法类似。下面是一个例子：

```ts
// 返回的数据包含 value, sum, count 三个属性
ctx.database.select('foo')
  .groupBy('value', {
    sum: row => $.sum(row.id),
    count: row => $.count(row.id),
  })
  .execute()
```

### 多级分组

可以通过链式调用 `.groupBy()` 方法来实现多级分组。下面是一个例子：

```ts
ctx.database.select('foo')
  .groupBy(['uid', 'pid'], {
    submit: row => $.sum(1),
    accept: row => $.sum(row.value),
  })
  .groupBy(['uid'], {
    submit: row => $.sum(row.submit),
    accept: row => $.sum($.if($.gt(row.accept, 0), 1, 0)),
  })
  .orderBy('uid')
  .execute()
```
