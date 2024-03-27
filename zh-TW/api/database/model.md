# 資料模型 (Model)

:::tip
参见：[开发 > 数据库 > 数据模型](../../guide/database/model.md)
:::

`ctx.model` 是 Koishi 的内置服务。其上的方法可以用于定义或扩展数据表及其字段。

## 資料型別

数据类型会被用于 [`model.extend()`](#model-extend) 方法中，其定义如下：

```ts
export interface Field<T> {
  type: string
  length?: number
  nullable?: boolean
  initial?: T
  comment?: string
  legacy?: string[]
}
```

### 數值型別

|    名稱    |   TS 型別  | 預設長度 | 預設初始值 |         說明        |
| :------: | :------: | :--: | :---: | :---------------: |
|  integer | `number` |  10  |  `0`  | 有符號整型數，長度決定了資料的範圍 |
| unsigned | `number` |  10  |  `0`  | 無符號整型數，長度決定了資料的範圍 |
|   float  | `number` | 固定長度 |  `0`  |       單精度浮點數      |
|  double  | `number` | 固定長度 |  `0`  |       雙精度浮點數      |

### 字串型別

|   名稱   |   TS 型別  |  預設長度 | 預設初始值 |   說明  |
| :----: | :------: | :---: | :---: | :---: |
|  char  | `string` |   64  |  `''` | 定長的字串 |
| string | `string` |  255  |  `''` | 變長的字串 |
|  text  | `string` | 65535 |  `''` | 變長的字串 |

### 時間型別

|     名稱    |  TS 型別 | 預設長度 |  預設初始值 |  說明 |
| :-------: | :----: | :--: | :----: | :-: |
|    date   | `Date` | 固定長度 | `null` | 日期值 |
|    time   | `Date` | 固定長度 | `null` | 時間值 |
| timestamp | `Date` | 固定長度 | `null` | 時間戳 |

### 其他型別

|  名稱  |    TS 型別   |  預設長度 |  預設初始值 |         說明         |
| :--: | :--------: | :---: | :----: | :----------------: |
| json |  `object`  | 65535 | `null` | 可被序列化為 json 的結構化資料 |
| list | `string[]` | 65535 |  `[]`  |  字串構成的列表，序列化時以逗號分隔 |

## 實體方法

### ctx.model.extend(name, fields, config?)

- **name:** `string` 数据表名
- **fields:** `Field.Config` 字段信息
- **config:** `Table.Meta` 表的基本配置
  - **config.primary:** `string | string[]` 主键名，默认为 `'id'`
  - **config.unique:** `(string | string[])[]` 值唯一的键名列表
  - **config.foreign:** `Dict<[string, string]>` 外键列表 <badge type="warning">实验性</badge>
  - **config.autoInc:** `boolean` 是否使用自增主键

擴展一個新的資料表。

### ctx.model.create(name, data)

- **name:** `string` 数据表名
- **data:** `any` 数据

创建一条新的数据，折叠嵌套属性，并填充必要的默认值。

### ctx.model.migrate(name, fields, callback) <badge type="warning">实验性</badge>

- **name:** `string` 数据表名
- **fields:** `Field.Config` 要迁移的字段信息
- **callback:** `(db: Database) => Promise<void>` 迁移的回调函数

设置 [整表迁移](../../guide/database/model.md#整表迁移) 的操作。
