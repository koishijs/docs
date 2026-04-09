---
url: /schema/basic/dict.md
---

# 字典 (Dict)

`Schema.dict()` 类型描述了一个字典，其中的键是任意字符串，而值是给定的类型。

* 使用 `.collapse()` 可以将配置项设置为默认折叠。
* 使用 `.role('table')` 可以将字典以表格形式显示。

例子里的 `Boolean` 是 `Schema.boolean().required()` 的简写。

```ts
export default Schema.object({
  dict: Schema.dict(Boolean),
  table1: Schema.dict(String).role('table'),
  table2: Schema.dict(Schema.object({
    foo: Schema.string(),
    bar: Schema.number(),
  })).role('table'),
})
```
