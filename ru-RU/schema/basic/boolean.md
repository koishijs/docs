---
layout: schema
code: |
  Schema.object({
    enable: Schema.boolean().description('这是一个开关。'),
  }).description('配置项')
---

# 布尔值 (Boolean)

`Schema.boolean()` 以开关的形式描述了一个布尔值。

```ts
export default Schema.object({
  enable: Schema.boolean(),
})
```
