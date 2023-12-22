---
layout: schema
code: |
  Schema.object({
    array: Schema.array(Number).description('这是一个数组，点击右侧的按钮添加元素。'),
    table1: Schema.array(String).role('table').description('以表格形式显示的数组。'),
    table2: Schema.array(Schema.object({
      foo: Schema.string().disabled(),
      bar: Schema.number().experimental(),
      qux: Schema.bitset({ FOO: 1, BAR: 2, QUX: 4 }).default(5),
    })).role('table').description('以表格形式显示的由对象构成的数组。'),
  }).description('配置项')
---

# 陣列 (Array)

`Schema.array()` 描述了一个数组，其中的元素满足给定的类型。

- 使用 `.collapse()` 可以将配置项设置为默认折叠。
- 使用 `.role('table')` 可以将数组以表格形式显示。

例子里的 `Number` 是 `Schema.number().required()` 的简写。

:::tip
特别地，对于已知字符串构成的数组，还可以使用 [`.role('checkbox')`](./bitset.md) 或 [`.role('select')`](./bitset.md)，将它们以复选框或复选菜单的形式显示。
:::

```ts
export default Schema.object({
  array: Schema.array(Number),
  table1: Schema.array(String).role('table'),
  table2: Schema.array(Schema.object({
    foo: Schema.string(),
    bar: Schema.number(),
    qux: Schema.bitset({ FOO: 1, BAR: 2, QUX: 4 }).default(5),
  })).role('table'),
})
```
