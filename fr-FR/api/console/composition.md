# API composable

:::tip
本节中所涉及的 API 都在 @koishijs/client 中导出。
:::

## useConfig()

- 返回值: `Ref<any>`

获取用户设置。

## useContext()

- 返回值: [`Context`](./context.md)

获取当前组件所在的插件上下文。

## useMenu(id)

- **id:** `string` 菜单标识符
- 返回值: `(el: HTMLElement, data: any) => void`

获得一个触发上下文菜单的事件监听器。
