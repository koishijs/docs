---
layout: schema
code: |
  Schema.object({
  intents: Schema
  .bitset({ FOO: 1, BAR: 2, QUX: 4 })
  .default(5)
  .description('选择要启用的功能。'),
  array: Schema
  .array(Schema.union(['FOO', 'BAR', 'QUX']))
  .default(['FOO', 'QUX'])
  .role('checkbox')
  .description('选择要启用的功能。'),
  }).description('配置项')
---

# Bitset : Stockage binaire

`Schema.bitset()` 以多选框的形式描述了一个整数，通常每一位表达某种特征。它的输出是一个整数，输入可以是一个整数或者一个字符串数组。

如果希望输出的也是字符串数组，可以配合使用 `Schema.array()` 和 `Schema.union()`，并将外观设置为 `checkbox`。

```ts
const enum Intents {
  FOO = 1,
  BAR = 2,
  QUX = 4,
}

export default Schema.object({
  intents: Schema.bitset(Intents)
    .default(Intents.FOO | Intents.QUX),
  array: Schema.array(Schema.union(['FOO', 'BAR', 'QUX']))
    .default(['FOO', 'QUX'])
    .role('checkbox'),
})
```
