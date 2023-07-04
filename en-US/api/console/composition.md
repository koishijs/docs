# Combined API

::: tip
The APIs mentioned in this section are exported in @koishijs/client.
:::

## useConfig()

- Return value: `Ref<any>`

Get user settings.

## useContext()

- Return value: [`Context`](./context.md)

获取当前组件所在的插件上下文。

## useMenu(id)

- **id:** 菜单标识符
- 返回值: `(el: HTMLElement, data: any) => void`

获得一个触发上下文菜单的事件监听器。
