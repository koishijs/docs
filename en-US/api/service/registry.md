# Registry

## Instance Properties

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

### ctx.dispose(plugin?)

- **plugin:** `Plugin` 要移除的插件
- 返回值: `Runtime`

移除插件中所注册的钩子、中间件、指令和子插件等。`plugin` 是默认为当前上下文所在的插件。如果既没有提供 `plugin`，上下文也不是一个插件上下文的话，会抛出一个错误。参见 [卸载插件](../../guide/plugin/#卸载插件)。

## 类：State

## 类：Runtime
