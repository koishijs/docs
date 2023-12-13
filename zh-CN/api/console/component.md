# 内置组件

::: tip
参见：[开发 > 控制台 > 客户端开发](../../guide/console/client.md)
:::

## `<k-comment>`

- **props.type:** `'info' | 'success' | 'warning' | 'danger'` 提示类型
- **slots.default:** 提示内容

提示信息组件。

## `<k-empty>`

空白内容组件。

## `<k-form>`

- **props.schema:** `Schema` 配置构型
- **props.modelValue:** `any` 当前配置
- **props.initial:** `any` 初始配置
- **props.disabled:** `boolean?` 是否禁用

配置表单。

## `<k-layout>`

- **props.menu:** `string?` 菜单标识符
- **slots.header:** 标题栏
- **slots.left:** 侧边栏
- **slots.default:** 页面主体

布局组件。

## `<k-slot>`

- **props.name:** `string` 插槽名称

插槽组件。

## `<k-status>`

- **slots.default:** 显示内容

显示在状态栏中的组件。
