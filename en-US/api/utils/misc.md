# Miscellaneous

::: tip
本节中的 API 来自 [cosmokit](https://github.com/shigma/cosmokit)，并由 Koishi 重新导出。
:::

这一节介绍了其他未被归类的内置工具函数。

## 字符串操作

### capitalize(source)

- **source:** `string` 源文本
- 返回值: `string` 首字母大写后的文本

首字母大写。

### camelCase(source)

- **source:** `any` 要转换的内容
- 返回值: `any` 转换结果

如果输入的是字符串，则将字符串转换成 camelCase；如果是数组或对象，则递归地将对象中的每个（可枚举）的键转换成 camelCase；其他情况不受影响。

### paramCase(source)

如果输入的是字符串，则将字符串转换成 param-case；如果是数组或对象，则递归地将对象中的每个（可枚举）的键转换成 param-case；其他情况不受影响。

- **source:** `any` 要转换的内容
- 返回值: `any` 转换结果

### snakeCase(source)

- **source:** `any` 要转换的内容
- 返回值: `any` 转换结果

如果输入的是字符串，则将字符串转换成 snake_case；如果是数组或对象，则递归地将对象中的每个（可枚举）的键转换成 snake_case；其他情况不受影响。

## 集合操作

### contain(array1, array2)

- **array1:** `readonly any[]` 数组 1
- **array2:** `readonly any[]` 数组 2
- 返回值: `boolean` 数组 1 是否包含数组 2 的全部元素

检测集合的包含关系。

### intersection(array1, array2)

- **array1:** `readonly any[]` 数组 1
- **array2:** `readonly any[]` 数组 2
- 返回值: `any[]` 两个数组的交集

求两个集合的交集。

### difference(array1, array2)

- **array1:** `readonly any[]` 数组 1
- **array2:** `readonly any[]` 数组 2
- 返回值: `any[]` 两个数组的差集

求两个集合的差集。

### union(array1, array2)

- **array1:** `readonly any[]` 数组 1
- **array2:** `readonly any[]` 数组 2
- 返回值: `any[]` 两个数组的并集

求两个集合的并集。

## 对象操作

### is(type, value)

- **type:** `string` 类型，例如 `Date`
- **value:** `any` 要判断的值
- 返回值: `boolean`

判断一个值是否为指定的对象实例。

### clone(source)

- **source:** `T` 要克隆的值
- 返回值: `T`

深度克隆一个值。

### deepEqual(a, b, strict?)

- **a:** `any` 要比较的值
- **b:** `any` 要比较的值
- **strict:** `boolean` 使用严格模式 (默认为 `false`)
- 返回值: `boolean`

深度比较两个值是否相等。

当 `strict` 设置为 `false` 时，`null` 和 `undefined` 视为相等。

### pick(source, keys, forced?)

- **source:** `O` 源对象
- **keys:** `Iterable<K>` 要提取的键
- **forced:** `boolean` 强制提取 (默认为 `false`)
- 返回值: `Pick<O, K>`

从一个对象中提取指定的键。

当 `forced` 设置为 `false` 时，属性不存在或者为 `undefined` 的情况下不会被提取。

### omit(source, keys)

- **source:** `O` 源对象
- **keys:** `Iterable<K>` 要排除的键
- 返回值: `Omit<O, K>`

从一个对象中排除指定的键。

### mapValues(source, callback)

- **source:** `Record<K, V>` 源对象
- **callback:** `(value: V, key: K) => T` 回调函数
- 返回值: `Record<K, T>`

将对象的每个值进行映射，返回新的对象。

### filterKeys(source, callback)

- **source:** `Record<K, V>` 源对象
- **callback:** `(key: K, value: V) => key is T` 回调函数
- 返回值: `Record<T, V>`

将对象的每个键进行过滤，返回新的对象。

## 日期操作

### 静态属性

- Time.millisecond
- Time.second
- Time.minute
- Time.hour
- Time.day
- Time.week

### Time.getDateNumber(date?)

- **date:** `Date` 日期对象，默认为 `new Date()`
- 返回值: `number` UNIX 时间开始后的天数

获取当前日期（从 UNIX 时间开始时计算）。

### Time.fromDateNumber(value)

- **value:** `number` UNIX 时间开始后的天数
- 返回值: `Date` 日期对象

从 UNIX 时间开始后的天数计算日期对象。

### Time.parseTime(source)

- **source:** `string` 要解析的字符串

将一个字符串解析成时间长度。

### Time.parseDate(source)

- **source:** `string` 要解析的字符串

将一个字符串解析成 Date 对象。

### Time.format(ms)

- **ms:** `number` 毫秒数

## 其他工具函数

### noop()

- 返回值: `void`

不进行任何操作（no operation）。

### sleep(ms?)

- **ms:** `number` 要等待的毫秒数
- 返回值: `Promise<void>`

等待一段时间。

### isInteger(value)

- **value:** `any` 要判断的值
- 返回值: `boolean` 是否为整数

判断传入的值是否为整数。
