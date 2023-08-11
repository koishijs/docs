---
layout: schema
code: |
  Schema.object({
  foo: Schema.string().disabled().description('这是一个禁用配置项。'),
  bar: Schema.number().hidden(),
  choice: Schema.union([
  Schema.const('foo'),
  Schema.const('bar').disabled(),
  Schema.const('baz').hidden(),
  ]).description('这个选择器中有一个禁用选项和一个隐藏选项。'),
  }).description('配置项')
---

# Désactiver et masquer

`.disable()` 用于禁用某个配置项。禁用的配置项无法被用户编辑。`.hidden()` 用于隐藏某个配置项。隐藏的配置项不会呈现在表单中。但是它们仍然会参与类型检查。

许多应用会同时提供 API 和网页表单，而开发者可能不希望将全部配置项都提供给表单的填写者 (例如复杂的底层配置或者实验性设置)。在这种情况下，禁用或隐藏部分配置项将会是一个好的选择。

```ts
export default Schema.object({
  foo: Schema.string().disabled(),
  bar: Schema.number().hidden(),
  choice: Schema.union([
    Schema.const('foo'),
    Schema.const('bar').disabled(),
    Schema.const('baz').hidden(),
  ]),
})
```
