---
layout: schema
code: |
  Schema.object({
    point: Schema.tuple([Number, Number]).description('请输入点的坐标。'),
  }).description('配置项')
---

# 元组 (Tuple)

:::tip
目前我们只支持元组内部元素是原始类型 ([String](./string.md), [Number](./number.md), [Boolean](./boolean.md)) 的情况。如果你要描述比较复杂的类型，请使用 [Object](./object.md) 或 [Array](./array.md) 替代。
:::

`Schema.tuple()` 描述了一个元组，它的长度是固定的，你需要分别给出其中每个元素的类型。它们会被显示在同一行中。

```ts
export default Schema.object({
  point: Schema.tuple([Number, Number]),
})
```
