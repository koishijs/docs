---
url: /schema/meta/nested.md
---

# 嵌套类型

一些类型 (例如 [Object](../basic/object.md) 和 [Array](../basic/array.md)) 允许将其他类型作为参数传入，形成新的组合类型。你可以任意嵌套这些类型，以满足更复杂的需求。

例子里的 `String` 是 `Schema.string().required()` 的简写形式。类似的写法对于 `Number` 和 `Boolean` 也是成立的。

```ts
Schema.object({
  foo: Schema.object({
    bar: Schema
      .array(Schema.object({
        baz: Schema.number().required(),
      }))
      .default([{ baz: 114514 }]),
    qux: Schema
      .dict(String)
      .default({ welcome: 'Hello World' }),
  }),
})
```
