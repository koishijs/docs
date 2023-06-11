# 客户端开发

::: warning
此页文档正在施工，部分内容尚未完成。
:::

## 布局组件

为了方便控制台开发，Koishi 也提供了一些组件。其中的一部分你已经在前面的两节中见过了。

`<k-layout>` 创建了一个新的页面布局。你扩展任何页面都需要用到它。这个组件有一些插槽：

- `header`：标题栏的内容
- `left`：左侧栏的内容
- `default`：页面主体的内容

除了添加新页面外，窗口底部的状态栏也可以扩展：

```ts client/index.ts
import Status from './status.vue'

ctx.slot({
  type: 'status-left',
  component: Status,
})
```

```vue client/status.vue
<template>
  <k-status>
    这段文字将会显示在状态栏中。
  </k-status>
</template>
```

在上面的例子中，`<k-status>` 创建了一个状态栏元素。

## 使用插槽

## 动作与菜单

## 用户设置

到此为止，我们所了解的插件配置都是 [直接在插件中声明](../plugin/schema.md)、[存储于配置文件中](../develop/config.md) 的。这在绝大多数情况下都是合理的——机器人管理员决定了插件的具体行为，而这些行为也不应该由用户决定。但实际上还有另一种情况：插件的某些行为可以由用户自由决定。例如机器人所使用的语言、控制台的主题等等。我们将这些配置统称为「用户设置」。

在控制台中，插件配置和用户配置是分离的。插件配置只有机器人的管理员有权查看和修改，而每个用户都可以查看和修改自己的用户配置。插件开发者也应当妥善区分这两种配置，以提高插件的可定制性。使用 `ctx.settings()` 可以在用户设置界面中添加配置表单：

```ts client/index.ts
ctx.settings({
  id: 'appearance',
  schema: Schema.object({
    wallpaper: Schema.object({
      image: Schema.string().description('要使用的背景图片。'),
      opacity: Schema.number().description('前景的透明度。'),
    }).description('壁纸设置'),
  }),
})
```

使用 `useConfig()` 可以在控制台中读取用户设置：

```ts
const config = useConfig()
config.value.wallpaper.image
```
