---
url: /schema/advanced/intersect.md
---

# Intersect：分组

Intersect 类型可用于合并多个类型。一种最常见的用法是将配置项分为多组显示。

使用 `.collapse()` 可以将分组默认折叠为一个单独的配置项。

```ts
export default Schema.intersect([
  Schema.object({
    foo: Schema.number(),
    bar: Schema.string(),
  }).description('分组 1'),
  Schema.object({
    baz: Schema.string(),
    qux: Schema.boolean(),
  }).description('分组 2'),
])
```
