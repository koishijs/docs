---
layout: schema
code: |
  Schema.object({
  foo: Schema.boolean().description('*斜体*的属性描述。'),
  bar: Schema.string().description('**粗体**的属性描述。'),
  }).description('配置标题')
---

# 標題與描述

`.description()` 用于设置某个配置项的描述文本。当添加在属性上时会显示在名称下方，当添加在对象上时则会表现为小标题。我们还支持了基本的行内 Markdown 语法。

```ts
export default Schema.object({
  foo: Schema.boolean().description('*斜体*的属性描述。'),
  bar: Schema.string().description('**粗体**的属性描述。'),
}).description('配置标题')
```
