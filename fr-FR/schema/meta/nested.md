---
layout: schema
code: |
  Schema.object({
  foo: Schema.object({
  bar: Schema.array(
  Schema.object({
  baz: Schema.number().description('在这里填写数值。'),
  qux: Schema.string().description('在这里填写字符串。'),
  }).description('这是数组的元素，它本身又是一个对象。'),
  ).default([{}]).description('这是一个嵌套属性，类型为数组。'),
  }),
  }).description('配置项')
---

# 嵌套类型

一些类型 (例如 [Object](../basic/object.md) 和 [Array](../basic/array.md)) 允许将其他类型作为参数传入，形成新的组合类型。你可以任意嵌套这些类型，以满足更复杂的需求。

```ts
Schema.object({
  foo: Schema.object({
    bar: Schema.array(
      Schema.object({
        baz: Schema.number(),
        qux: Schema.string(),
      }),
    ).default([{}]),
  }),
})
```
