---
url: /schema/basic/object.md
---

# 对象 (Object)

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
