# 資料庫操作 (Database)

::: tip
参见：[开发 > 数据库 > 基本用法](../../guide/database/)
:::

一個 Database 物件代理了 Koishi 上下文繫結的應用實體有關的所有資料庫訪問。同時它具有注入特性，任何外掛程式都可以自己定義資料庫上的方法。本章主要介紹資料庫的官方介面。注意：**它們並不由 Koishi 自身實現，而是由每個資料庫分別實現的**。Koishi 只是提供了一套標準。

## database.drop()

## database.stats()

## database.get(table, query, modifier?)

- **table:** `keyof Tables` 註冊在 ORM 中的表名
- **query:** `QueryExpr<Tables[T]> | QueryShorthand` 搜尋運算式
- **modifier:** `QueryModifier<keyof Tables[T]>` 請求飾詞
- 回返值: `Promise<Tables[T][]>` 使用者資料

引數 query 支援正則以及運算式，你可以使用複雜的巢狀更細緻化的去完成你對資料庫的查詢服務。實現上與 mongo 近似，如果你有使用過 mongodb 經驗，那麼使用 Koishi ORM 對你來說便不是一件難事。

```ts
interface FieldQueryExpr<T> {
  $regex?: RegExp
  $in?: T[]
  $nin?: T[]
  $eq?: T
  $ne?: T
  $gt?: T
  $gte?: T
  $lt?: T
  $lte?: T
}

interface LogicalQueryExpr<T> {
  $or?: QueryExpr<T>[]
  $and?: QueryExpr<T>[]
  $not?: QueryExpr<T>
}

type QueryShorthand<T> = T[] | RegExp
type FieldQuery<T> = FieldQueryExpr<T> | QueryShorthand<T>
type QueryExpr<T> = LogicalQueryExpr<T> & {
  [K in keyof T]?: FieldQuery<T[K]>
}

interface QueryOptions<T extends string> {
  limit?: number
  offset?: number
  fields?: T[]
}

type QueryModifier<T extends string> = T[] | QueryOptions<T>
```

下面是一些簡單的示例：

```ts
// @errors: 2451

// 獲取名為 schedule 的表中 id 為 1 或者 2 的資料列
// Koishi ORM 自動解析你的 primary key
const rows = await ctx.database.get('schedule', [1, 2])
const rows = await ctx.database.get('schedule', { id: [1, 2] })

// 當然 Koishi ORM 也支援了 mongo 的正則寫法
const rows = await ctx.database.get('schedule', { command: /echo.*/ })

// 獲取名為 schedule 的表中 id 大於 2 但是小於等於 5 的資料列
const rows = await ctx.database.get('schedule', { id: { $gt: 2, $lte: 5 } })

// 獲取名為 schedule 的表中
// id 大於 2 但是小於等於 5 或者 id 大於 100 的資料列
const rows = await ctx.database.get('schedule', {
  id: { $gt: 2, $lte: 5 },
  $or: [{ id: { $gt: 100 } }],
})

// 只獲取 id 和 command 欄位（預設情況下將獲取全部欄位）
const rows = await ctx.database.get('schedule', 1, ['id', 'command'])
```

## database.set(table, query, updater)

## database.remove(table, query)

## database.create(table, data)

## database.upsert(table, data, keys?)

## database.eval(table, expr, query?)
