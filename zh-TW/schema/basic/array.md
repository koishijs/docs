---
layout: schema
code: |
  Schema.object({
  array: Schema.array(Number).description('这是一个数组，点击右侧的按钮添加元素。'),
  table: Schema.array(String).role('table').description('以表格形式显示的数组。'),
  table2: Schema.array(Schema.object({
  foo: Schema.string(),
  bar: Schema.number(),
  })).role('table').description('对象构成的数组。'),
  }).description('配置项')
---

# 陣列 (Array)

`Schema.array()` 描述了一个数组，其中的元素满足给定的类型。

使用 `.role('table')` 可以将数组以表格形式显示。

例子里的 `Number` 是 `Schema.number().required()` 的简写。

```ts
export default Schema.object({
  array: Schema.array(Number),
  table: Schema.array(String).role('table'),
  table2: Schema.array(Schema.object({
    foo: Schema.string(),
    bar: Schema.number(),
  })).role('table'),
})
```
