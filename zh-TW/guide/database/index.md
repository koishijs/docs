# 使用資料庫

::: tip
本章所介紹的內容需要你安裝一個資料庫支援。如果你暫時不打算使用資料庫，那麼可以略過。
:::

對於幾乎所有大型機器人專案，資料庫的使用都是不可或缺的。但如果每個外掛程式都使用了自己的資料庫，這將導致外掛程式之間的相容性非常差——使用者要麼選擇同時安裝多個資料庫，要麼只能放棄一些功能或者重複造輪子。為此，Koishi 設計了一整套物件關係對映 (ORM) 介面，它易於擴展並廣泛地運用於各種外掛程式中。同時，我們也提供了一些常用資料庫的官方外掛程式，足以應對絕大部分使用場景。

## 安裝資料庫

如果你是外掛程式開發者，你並不需要關心具體的資料庫實現。但是如果你是 Koishi 的使用者，只有當安裝了資料庫你才能正常使用所有的特性。首先你需要安裝資料庫依賴：

::: tabs code
```npm
# 我們以 mysql 資料庫為例
npm i @koishijs/plugin-database-mysql -D
```
```yarn
# 我們以 mysql 資料庫為例
yarn add @koishijs/plugin-database-mysql -D
```
:::

然後與你新增外掛程式同樣的方法配置你的資料庫：

```yaml title=koishi.yml
plugins:
  database-mysql:
    host: host
    port: 3306
    user: root
    password: password
    database: database
```

執行程式後，你就可以透過訪問 `ctx.database` 來喚起資料庫介面了：

```ts
// @errors: 2304
// 獲取使用者資料
const user = await ctx.database.getUser(platform, id)

// 修改頻道資料
await ctx.database.setChannel(platform, id, { assignee: '123456789' })
```

你可以在後面的 API 文件中看到全部內建的 [資料庫方法](../../api/database/database.md)。

## 獲取資料

使用 `database.get()` 方法以獲取特定表中的資料。下面是一個最基本的形式：

```ts
// 獲取 schedule 表中 id 為 1234 的資料行，返回一個陣列
await ctx.database.get('schedule', 1234)

// 獲取 schedule 表中 id 為 1234 或 5678 的資料行，返回一個陣列
await ctx.database.get('schedule', [1234, 5678])
```

對於複雜的資料表，如果你只需要獲取少數欄位，你可以透過第三個引數手動指定要獲取的欄位：

```ts
// 返回的陣列中每個元素只會包含 command, lastCall 屬性
await ctx.database.get('schedule', [1234], ['command', 'lastCall'])
```

你還可以向第二個引數傳入一個物件，用來查詢非主鍵上的資料或者同時指定多行的值：

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

## 添加和删除数据

添加和删除数据的语法也非常简单：

```ts
// @errors: 2304
// 从 schedule 表中删除特定 id 的数据行
// 第二个参数也可以使用上面介绍的查询表达式
await ctx.database.remove('schedule', [id])

// 向 schedule 表中添加一行数据，data 是要添加的数据行
// 返回值是添加的行的完整数据（包括自动生成的 id 和默认属性等）
await ctx.database.create('schedule', row)
```

## 修改数据

Koishi 提供了两种修改数据的方法。我们将逐一介绍。

|      | set            | upsert      |
| ---- | -------------- | ----------- |
| 作用范围 | 支持复杂的查询表达式     | 只能限定特定字段的值  |
| 插入行为 | 如果不存在则不会进行任何操作 | 如果不存在则会插入新行 |

### 使用 set 修改数据

`database.set()` 方法需要传入三个参数：表名、查询条件和要修改的数据。

```ts
// 第二个参数也可以使用上面介绍的查询表达式
await ctx.database.set('schedule', 1234, {
  assignee: 'onebot:123456',
  lastCall: new Date(),
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

### 使用 upsert 修改数据

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

| id | foo   | bar    | 說明                                 |
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
