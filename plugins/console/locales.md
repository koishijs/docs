# 本地翻译 (Locales)

@koishijs/plugin-locales 允许你在本地覆盖和扩展 Koishi 本体和其他插件的翻译文本。

## 使用方法

向配置文件中添加此插件：

```yaml
# koishi.yml
plugins:
  locales:
```

随后创建一个 `locales` 文件夹，并在其中放置翻译文件：

```yaml
# locales/zh-CN.yml
internal:
  low-authority: 啊哦！你的权限不足呢~
```

如果你想为未支持的语言提供翻译，要做的事几乎完全一致：只需在 `locales` 文件夹中放置对应语言的文件即可。

## 配置项

### root

- 类型: `string`
- 默认值: `'locales'`

存储翻译文件的路径。如果填入相对路径则会被解析为相对于 [baseDir](../../api/core/context.md#ctx-basedir) 的路径。
