---
layout: schema
code: |
  Schema.object({
    foo: Schema.boolean().description('这是一个可选属性。'),
    bar: Schema.string().required().description('这是一个必需属性。'),
  }).description('配置项')
---

# 必需与可选

默认情况下，所有配置项都是可选的。你可以通过 `.required()` 来声明一个必需的配置项。未配置的必需配置项的左侧会出现红色的提示线。

请注意：对于字符串等原始类型，空串和未配置是两个不同的概念。你可以通过控件中央的水平线来进行区分。

```ts
export default Schema.object({
  foo: Schema.boolean(),
  bar: Schema.string().required(),
})
```
