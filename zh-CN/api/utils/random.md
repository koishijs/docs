# 随机数操作

::: tip
本节中的 API 来自 [inaba](https://github.com/shigma/inaba)，并由 Koishi 重新导出。
:::

## 基本用法

```ts
import { Random } from 'koishi'

// 静态方法
Random.bool(0.8)                // 80% 的概率返回 true
Random.shuffle([5, 1, 4])       // 随机打乱数组

// 使用自定义的随机数生成器
const random = new Random(() => Math.random())
random.int(0, 10)               // 生成一个 [0, 10) 的随机整数
random.pick([1, 2, 3])          // 随机选取一个元素
```

## API

### new Random(callback)

- **callback:** `() => number` 一个返回 `[0, 1)` 的随机数的函数
- **returns:** `Random` 实例

使用自定义的随机数生成器构造一个 `Random` 实例。

### Random.bool(probability)

- **probability:** `number`
- **returns:** `boolean`

生成一个随机布尔值，有 `probability` 的概率为 1。

### Random.real(start?, end)

- **start:** `number` 下界，默认为 0
- **end:** `number` 上界
- 返回值: `number` 一个 `[start, end)` 之间的随机实数

生成一个随机实数。

### Random.int(start?, end)

- **start:** `number` 下界，默认为 0
- **end:** `number` 上界
- 返回值: `number` 一个 `[start, end)` 之间的随机整数

生成一个随机整数。

### Random.pick(array, count?)

- **array:** `readonly T[]` 数组
- **count:** `number` 元素个数
- 返回值: `T` 挑出的元素

从数组中随机挑出一个或多个元素，不改变原数组。如果未传入 `count`，则返回一个元素；否则返回一个包含 `count` 个元素的数组。

### Random.shuffle(array)

- **array:** `T[]` 数组
- 返回值: `T[]` 新的数组

随机打乱数组中的元素，返回新的数组。此操作不修改原数组，相当于 `Random.pick(array, array.length)`。

### Random.weightedPick(weights)

- **weights:** `Record<T, number>` 权重表
- **returns:** `T` 挑出的元素

按照权重随机挑出一个元素。
