# Registry : système des plugins

## 实例属性

以下实例属性都是只读的。

### ctx.scope

- 类型: `State`

当前上下文关联的 State 对象。

## 实例方法

### ctx.plugin(plugin, options?)

- **plugin:** `Plugin` 要安装的插件
- **options:** `any` 要传入插件的参数
- 返回值: `Fork`

当前上下文中安装一个插件。参见 [认识插件](../../guide/plugin/)。

### ctx.using(deps, plugin)

- **deps:** `string[]` 依赖的服务列表
- **plugin:** `Plugin` 要安装的插件
- 返回值: `this`

安装一个存在服务依赖的插件。参见 [服务的依赖关系](../../guide/plugin/service.md#服务的依赖关系)。

### ctx.start()

- 返回值: `Promise<void>`

启动此应用。

### ctx.stop()

- 返回值: `Promise<void>`

停止此应用。

## 类：State

## 类：Runtime
