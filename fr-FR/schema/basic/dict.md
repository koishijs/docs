---
layout: schema
code: |
  Schema.object({
  dict: Schema.dict(Boolean).description('这是一个字典，点击右侧的按钮添加属性。'),
  table: Schema.dict(String).role('table').description('以表格形式显示的字典。'),
  table2: Schema.dict(Schema.object({
  foo: Schema.string(),
  bar: Schema.number(),
  })).role('table').description('对象构成的字典。'),
  }).description('配置项')
---

# Dict : Dictionnaire

`Schema.dict()` 类型描述了一个字典，其中的键是任意字符串，而值是给定的类型。

使用 `.role('table')` 可以将字典以表格形式显示。

使用 `.collapse()` 可以将配置项设置为默认折叠 (对表格无效)。

例子里的 `Boolean` 是 `Schema.boolean().required()` 的简写。

```ts
export default Schema.object({
  dict: Schema.dict(Boolean),
  table: Schema.dict(String).role('table'),
  table2: Schema.dict(Schema.object({
    foo: Schema.string(),
    bar: Schema.number(),
  })).role('table'),
})
```
