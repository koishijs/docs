---
url: /schema/meta/disabled.md
---

# 禁用与隐藏

`.disabled()` 用于禁用某个配置项。禁用的配置项无法被用户编辑。`.hidden()` 用于隐藏某个配置项。隐藏的配置项不会呈现在表单中。但是它们仍然会参与类型检查。

许多应用会同时提供 API 和网页表单，而开发者可能不希望将全部配置项都提供给表单的填写者 (例如复杂的底层配置或者实验性设置)。在这种情况下，禁用或隐藏部分配置项将会是一个不错的选择。

除此以外，我们还提供了 `.deprecated()` 和 `.experimental()` 方法，它们分别用于标记已废弃和实验性的配置项。

```ts
export default Schema.object({
  foo: Schema.number().disabled(),
  bar: Schema.number().hidden(),
  baz: Schema.string().deprecated(),
  qux: Schema.string().experimental(),
  choice: Schema.union([
    Schema.const('foo').disabled(),
    Schema.const('bar').hidden(),
    Schema.const('baz').deprecated(),
    Schema.const('qux').experimental(),
  ]),
})
```
