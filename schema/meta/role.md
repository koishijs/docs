---
url: /schema/meta/role.md
---

# 配置项外观

`.role()` 描述了一个配置项的外观，而不会影响该类型的实际行为。不同类型的可选外观各有不同，我们将在每种类型的示例中分别介绍。

```ts
export default Schema.object({
  number: Schema.percent().role(''),
  string: Schema.string().role(''),
  choice: Schema
    .union(['foo', 'bar', 'qux'])
    .role(''),
})
```

```ts
export default Schema.object({
  number: Schema.percent().role('slider'),
  string: Schema.string().role('secret'),
  choice: Schema
    .union(['foo', 'bar', 'qux'])
    .role('radio'),
})
```
