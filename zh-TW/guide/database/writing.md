# 編寫資料庫外掛

:::danger 注意
此页文档正在施工，其中的内容可能不是最新。
:::

现在让我们介绍一下如何编写一个数据库支持。与上面介绍的方法类似，我们也采用注入的方式，不过这次我们需要先实现一个类。我们用 mysql 来举个例子：

由于数据库支持往往要被其他插件或用户所使用，有一个好的类型标注是非常重要的。因此这里我们就只提供 TypeScript 的范例了。

## 代码示例

```ts no-extra-header
// @errors: 2416

import { createPool, Pool, PoolConfig } from 'mysql'
import { Context, Database } from 'koishi'

// 从 Database 类派生出一个子类并将其默认导出
export default class MysqlDatabase extends Database {
  private pool: Pool

  constructor(ctx: Context, config: PoolConfig = {}) {
    super(ctx)
    this.pool = createPool(config)
  }

  query(sql: string, values?: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.pool.query(sql, values, (error, results, fields) => {
        if (error) {
          reject(error)
        } else {
          resolve(results)
        }
      })
    })
  }

  // 实现内置方法
  get() {}
  set() {}
  upsert() {}
  remove() {}
  create() {}
  drop() {}
  eval() {}
  stats() {}
}
```

当然，真正的 [@koishijs/plugin-database-mysql](../../plugins/database/mysql.md) 要比上面的例子复杂的多，我们还需要处理有关数据库的更多细节。你可以在 [这里](https://github.com/koishijs/koishi/tree/master/plugins/database/mysql) 看到完整的源代码。
