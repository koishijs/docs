---
layout: schema
code: |
  Schema.object({
  foo: Schema.string().description('默认值为 `lol` 的属性。').default('lol'),
  bar: Schema.number().description('默认值为 `2333` 的属性。').default(2333),
  }).description('配置项')
---

# Default

`.default()` 用于设置某个配置项的默认值。如果你传入了值，那么默认值将不会有任何行为；如果没有传入值，则默认值会作为初始状态呈现在表单中。

如果你将某个配置项修改为了默认值，则该配置项实际上会被清除，以确保配置文件的简洁性。

```ts
export default Schema.object({
  foo: Schema.string().default('lol'),
  bar: Schema.number().default(2333),
})
```
