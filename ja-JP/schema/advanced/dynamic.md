---
layout: schema
code: |
  Schema.object({
    value: Schema.union(['foo', 'bar']).description('选择一个值。'),
  }).description('配置项')
---

# Dynamic：动态类型

:::tip
此类型只能在 Koishi 中使用。
:::

:::warning
此特性为实验性功能，未来可能会有改动。
:::

`Schema.dynamic()` 用于使用动态类型。例如某个服务需要在运行时才能获取某个配置项的可能取值，而基于此服务的其他插件的配置又需要从这些值中选择一个。这个时候，实现服务的插件可以使用 `ctx.schema.set()` 来定义动态的类型，使用服务的插件则可以使用 `Schema.dynamic()` 来引用该类型。

```ts
// 提供服务的插件
// getChoices() 返回一个数组，假设为 ['foo', 'bar']
ctx.schema.set('choices', Schema.union(getChoices()))
```

```ts
// 使用服务的插件
export default Schema.object({
  value: Schema.dynamic('choices').description('选择一个值。'),
}).description('配置项')
```
