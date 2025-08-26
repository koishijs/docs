---
layout: schema
code: |
  Schema.intersect([
    Schema.object({
      bitset: Schema
        .bitset({ FOO: 1, BAR: 2, QUX: 4 })
        .default(5)
        .description('选择要启用的功能。'),
      array: Schema
        .array(Schema.union(['FOO', 'BAR', 'QUX']))
        .default(['FOO', 'QUX'])
        .role('checkbox')
        .description('以复选框形式呈现。'),
    }).description('复选框'),
    Schema.object({
      bitset: Schema
        .bitset({ FOO: 1, BAR: 2, QUX: 4 })
        .default(5)
        .role('select')
        .description('选择要启用的功能。'),
      array: Schema
        .array(Schema.union(['FOO', 'BAR', 'QUX']))
        .default(['FOO', 'QUX'])
        .role('select')
        .description('以复选菜单形式呈现。'),
    }).description('复选菜单'),
  ])
---

# Bitset : Stockage binaire

`Schema.bitset()` 以复选框的形式描述了一个整数，通常每一位表达某种特征。它的输出是一个整数，输入可以是一个整数或者一个字符串数组。

如果希望输出的也是字符串数组，可以配合使用 `Schema.array()` 和 `Schema.union()`，并设置 `.role('checkbox')`。

此外，我们还提供了 `.role('select')`，它将以复选菜单的形式呈现。

```ts
const enum Intents {
  FOO = 1,
  BAR = 2,
  QUX = 4,
}

export default Schema.object({
  bitset: Schema.bitset(Intents)
    .default(Intents.FOO | Intents.QUX),
  array: Schema
    .array(Schema.union(['FOO', 'BAR', 'QUX']))
    .default(['FOO', 'QUX'])
    .role('checkbox'),
})
```
