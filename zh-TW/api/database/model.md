# 資料模型 (Model)

## 資料型別

資料型別會被用於 [`model.extend()`](#model-extend-name-fields-config) 方法中，其定義如下：

```ts
export interface Field<T> {
  type: string
  length?: number
  nullable?: boolean
  initial?: T
  comment?: string
}
```

### 數值型別

|    名稱    |  TS 型別   | 預設長度 | 預設初始值 |        說明         |
|:--------:|:--------:|:----:|:-----:|:-----------------:|
| integer  | `number` |  10  |  `0`  | 有符號整型數，長度決定了資料的範圍 |
| unsigned | `number` |  10  |  `0`  | 無符號整型數，長度決定了資料的範圍 |
|  float   | `number` | 固定長度 |  `0`  |      單精度浮點數       |
|  double  | `number` | 固定長度 |  `0`  |      雙精度浮點數       |

### 字串型別

|   名稱   |  TS 型別   | 預設長度  | 預設初始值 |  說明   |
|:------:|:--------:|:-----:|:-----:|:-----:|
|  char  | `string` |  64   | `''`  | 定長的字串 |
| string | `string` |  256  | `''`  | 變長的字串 |
|  text  | `string` | 65535 | `''`  | 變長的字串 |

### 時間型別

|    名稱     | TS 型別  | 預設長度 | 預設初始值  | 說明  |
|:---------:|:------:|:----:|:------:|:---:|
|   date    | `Date` | 固定長度 | `null` | 日期值 |
|   time    | `Date` | 固定長度 | `null` | 時間值 |
| timestamp | `Date` | 固定長度 | `null` | 時間戳 |

### 其他型別

|  名稱  |   TS 型別    | 預設長度  | 預設初始值  |         說明         |
|:----:|:----------:|:-----:|:------:|:------------------:|
| json |  `object`  | 65535 | `null` | 可被序列化為 json 的結構化資料 |
| list | `string[]` | 65535 |  `[]`  | 字串構成的列表，序列化時以逗號分隔  |

## 實體方法

### model.extend(name, fields, config?)

- **name:** `string` 資料表名
- **fields:** `Field.Config` 欄位資訊
- **config:** `Table.Meta` 表的基本配置
  - **config.primary:** `string | string[]` 主鍵名，預設為 `'id'`
  - **config.unique:** `(string | string[])[]` 值唯一的鍵名串列
  - **config.foreign:** `Dict<[string, string]>` 外來鍵串列
  - **config.autoInc:** `boolean` 是否使用自增主鍵

擴展一個新的資料表。

### model.create(name)

### model.resolveQuery(query)

### model.resolveModifier(modifier)
