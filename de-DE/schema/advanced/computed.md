---
layout: schema
code: |
  Schema.object({
    foo: Schema.computed(Number).description('这是一个属性。'),
  }).description('配置项')
---

# Computed：条件求值

:::tip
此类型只能在 Koishi 中使用。
:::

`Schema.computed()` 类型可用于合并多个类型。一种最常见的用法是将配置项分为多组显示。

```ts
export default Schema.object({
  foo: Schema.computed(Number),
}).description('配置项')
```
