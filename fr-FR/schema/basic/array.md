---
layout: schema
code: |
  Schema.object({
  values: Schema.array(Number).description('这是一个数组，点击右侧的按钮添加元素。'),
  }).description('配置项')
---

# Array

`Schema.array()` 描述了一个数组，其中的元素满足给定的类型。

例子里的 `Number` 是 `Schema.number().required()` 的简写。

```ts
export default Schema.object({
  values: Schema.array(Number),
})
```
