# 加载器 (Loader) <badge type="warning">实验性</badge>

:::warning
这是一个实验性 API，未来可能会发生变化。
:::

:::warning
此服务仅在 CLI (启动器 / 模板项目) 环境下可用，[作为依赖调用](../../manual/starter/direct.md) 的 Koishi 将不具备此服务。
:::

Loader 服务可用于管理 Koishi 实例加载的插件。通常情况下你不需要手动调用此服务，除非你在开发 [config](../../plugins/console/config.md) 或者 [HMR](../../plugins/develop/hmr.md) 这样的底层插件。

## 实例属性

### ctx.loader.envData

- 类型: `object`

一个特殊的对象，可以在环境变量中存储少量数据。可以配合 `ctx.loader.fullReload()` 方法使用，以便在重启后恢复数据。

:::warning
如果你的插件需要持久化大量数据，请使用本地文件或者数据库。
:::

## 实例方法

### ctx.loader.keyFor(plugin)

- **plugin:** `any` 插件导出
- 返回值: `string`

获取插件的短名称。

### ctx.loader.replace(plugin1, plugin2)

- **plugin1:** `any` 插件导出
- **plugin2:** `any` 插件导出

替换插件导出。

### ctx.loader.resolve(name)

- **name:** `string` 插件的短名称

从短名称获取插件。

### ctx.loader.reload(parent, key, config)

- **parent:** `Context` 父级上下文
- **key:** `string` 插件的短名称
- **config:** `object` 插件配置
- 返回值: `Promise<ForkScope>`

启用一个插件。这里的 `key` 对应于 [配置文件](../../guide/develop/config.md) 中的键名。

如果 `key` 已经存在于父级上下文中，则会重载该插件实例；如果 `key` 不存在于父级上下文中，则会创建一个新的插件实例。

### ctx.loader.unload(parent, key)

- **parent:** `Context` 父级上下文
- **key:** `string` 插件的短名称

停用一个插件。这里的 `key` 对应于 [配置文件](../../guide/develop/config.md) 中的键名。

### ctx.loader.fullReload()

重启被守护的 Koishi 进程。
