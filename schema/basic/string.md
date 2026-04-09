---
url: /schema/basic/string.md
---

# 字符串 (String)

`Schema.string()` 描述了一个字符串，支持多种特殊外观。

* secret：默认情况下不显示输入框中的内容，可点击按钮切换
* link：点击可访问输入框中的链接 (同时输入框也会稍长一些)
* textarea：输入框显示在配置项下侧，为自适应高度的多行文本域
  * 可以通过 `rows` 属性来限制文本域的最小和最大行数
* color：输入框显示为颜色选择器

可以使用 `.pattern()` 限制输入的内容符合某个正则表达式。

```ts
export default Schema.object({
  text: Schema.string(),
  secret: Schema.string().role('secret').default('password'),
  link: Schema.string().role('link').default('https://github.com'),
  area: Schema.string().role('textarea', { rows: [2, 4] }),
  color: Schema.string().role('color'),
  custom: Schema.string().pattern(/^custom$/i),
})
```
