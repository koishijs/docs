# 本地翻译 (Locales)

::: tip
使用方法请参见 [入门 > 国际化](../../manual/usage/customize.md#本地化文本) 一节。
:::

@koishijs/plugin-locales 允许你在本地覆盖和扩展 Koishi 本体和其他插件的翻译文本。

## 配置项

### root

- 类型: `string`
- 默认值: `'locales'`

存储翻译文件的路径。如果填入相对路径则会被解析为相对于 [baseDir](../../api/core/context.md#ctx-basedir) 的路径。
