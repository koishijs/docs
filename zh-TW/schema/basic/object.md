---
layout: schema
code: |
  Schema.object({
  foo: Schema.string().required().description('这是一个必需属性。'),
  bar: Schema.number().description('这是一个可选属性。'),
  baz: Schema.object({
  qux: Schema.boolean().description('这是一个嵌套属性。'),
  }),
  collapse: Schema.object({
  inner: Schema.string().description('现在你看到我了！'),
  }).description('点击右侧按钮查看嵌套属性。').collapse(),
  }).description('配置项')
---

# 物件 (Object)

`Schema.object()` 描述了一个具有给定属性的对象。

默认情况下所有属性都是可选的，可以通过 `.required()` 来声明一个必需属性。

使用 `.collapse()` 可以将对象默认折叠为一个单独的配置项。

```ts
export default Schema.object({
  foo: Schema.string().required(),
  bar: Schema.number(),
  baz: Schema.object({
    qux: Schema.boolean(),
  }),
  nested: Schema.object({
    inner: Schema.string(),
  }).collapse(),
})
```
