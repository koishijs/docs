---
url: /schema/basic/number.md
---

# 数值 (Number)

`Schema.number()` 描述了一个数值，支持输入框和滑块。

```ts
export default Schema.object({
  foo: Schema.number(),
  bar: Schema.number().role('slider')
    .min(0).max(100).step(1).default(30),
})
```
