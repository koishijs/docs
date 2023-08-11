---
layout: schema
code: |
  Schema.object({
  intents: Schema
  .bitset({ FOO: 1, BAR: 2, QUX: 4 }).default(5)
  .description('选择要启用的功能。'),
  }).description('配置项')
---

# Bitset : Stockage binaire

`Schema.bitset()` 以多选框的形式描述了一个整数，通常每一位表达某种特征。

```ts
const enum Intents {
  FOO = 1,
  BAR = 2,
  QUX = 4,
}

export default Schema.object({
  intents: Schema.bitset(Intents)
    .default(Intents.FOO | Intents.QUX),
})
```
