---
layout: schema
code: |
  Schema.object({
  path1: Schema.string().description('假装右边是一个文件选择器。'),
  path2: Schema.string().description('假装右边是一个文件选择器。'),
  }).description('配置项')
---

# Path : Chemin

::: tip
此类型基于 @koishijs/plugin-explorer，仅在加载该插件时可用。未加载该插件时，类型只会表现为普通的字符串 (比如现在就是这样)。
:::

`Schema.path()` 描述了一个路径。如果是相对路径，则会基于 `ctx.baseDir` 进行解析。该配置项会显示成一个能够打开文件选择器的按钮。

支持传入一些额外的选项：

- `allowCreate`：是否允许创建目录和上传文件
- `extensions`：可选的文件的扩展名列表，扩展名全需要以 `.` 开头；特别地其中如果包含 `directory` 则表示可以选择文件夹

```ts
export default Schema.object({
  path1: Schema.path(),
  path2: Schema.path({
    extensions: ['.png', '.jpg', 'directory'],
  }),
})
```
