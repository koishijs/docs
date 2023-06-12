---
layout: schema
code: |
  Schema.intersect([
  Schema.object({
  enabled: Schema.boolean().default(false).description('是否开启功能'),
  }).description('基础配置'),
  Schema.union([
  Schema.object({
  enabled: Schema.const(true).required(),
  foo: Schema.number().description('请输入一个数值。'),
  bar: Schema.string().description('请输入一个字符串。'),
  }),
  Schema.object({}),
  ]),
  ])
---

# Union: Tagged 1

一种比较复杂的场景是以对象的某个属性值确定对象的其他属性的类型。善用 Intersect 和 Union，我们就可以轻松实现表单项的联动效果！试着切换 `enabled` 的取值，并观察下方表单项的变化吧。

```ts
export default Schema.intersect([
  Schema.object({
    enabled: Schema.boolean().default(false),
  }).description('基础配置'),
  Schema.union([
    Schema.object({
      enabled: Schema.const(true).required(),
      foo: Schema.number().description('请输入一个数值。'),
      bar: Schema.string().description('请输入一个字符串。'),
    }),
    Schema.object({}),
  ])
])
```

::: tip
请注意这个例子中对于 `default()` 和 `required()` 的使用。由于配置项默认情况下都是可选的，所以下方的 `enabled` 如果类型与上方的默认值不同，就必须加上 `required()`；反过来，如果相同，你就不应该加上 `required()` (你甚至可以缺省不写，这就是为什么最下面出现了一个空白的 `object({})`)。
:::
