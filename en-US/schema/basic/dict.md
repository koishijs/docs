---
layout: schema
code: |
  Schema.object({
  values: Schema.dict(Boolean).description('这是一个字典，点击右侧的按钮添加属性。'),
  }).description('配置项')
---

# Dict

`Schema.dict()` 类型描述了一个字典，其中的键是任意字符串，而值是给定的类型。

例子里的 `Boolean` 是 `Schema.boolean().required()` 的简写。

```ts
export default Schema.object({
  values: Schema.dict(Boolean),
})
```
