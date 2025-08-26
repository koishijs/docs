---
layout: schema
code: |
  Schema.object({
    value: Schema.union([
      Schema.const().description('unset'),
      Schema.number().description('number'),
      Schema.string().description('string'),
      Schema.const(true).description('true'),
      Schema.const(false).description('false'),
      Schema.object({
        foo: Schema.string().description('对象的一个属性。'),
        bar: Schema.number().description('对象的另一个属性。'),
      }).description('object'),
    ]).description('从六种可能情况中选择一个。'),
  }).description('配置项')
---

# Union: Joint

Union 同样支持多种不同类型的联合。你需要给每个子类型提供一个 description，它们会作为表单中呈现的选项。

```ts
export default Schema.object({
  value: Schema.union([
    Schema.const().description('unset'),
    Schema.number().description('number'),
    Schema.string().description('string'),
    Schema.const(true).description('true'),
    Schema.const(false).description('false'),
    Schema.object({
      foo: Schema.string(),
      bar: Schema.number(),
    }).description('object'),
  ]),
})
```
