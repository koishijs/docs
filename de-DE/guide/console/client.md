# 客户端开发

## 布局组件

为了方便控制台开发，Koishi 也提供了一些组件。其中的一部分你已经在前面的两节中见过了。

[`<k-layout>`](../../api/console/component.md#k-layout) 创建了一个新的页面布局。你扩展任何页面都需要用到它。这个组件有一些插槽：

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

在上面的例子中，[`<k-status>`](../../api/console/component.md#k-status) 创建了一个状态栏元素。

你甚至还可以直接添加页面元素，例如 [live2d](https://github.com/koishijs/koishi-plugin-live2d) 插件就为控制台添加了一个 live2d 的看板娘：

```ts client/index.ts
import Live2D from './live2d.vue'

ctx.slot({
  type: 'global',
  component: Live2D,
})
```

## 使用插槽

你应该已经注意到了，在上面的两个例子中，我们都使用了 [`ctx.slot()`](../../api/console/context.md#ctx-slot) 来扩展某些元素。这个方法的作用是向控制台的某个区域中注入 Vue 组件。而上面的 `status-left` 和 `global` 则是两个插槽的名称，分别对应了状态栏左侧区域和整个页面区域。

这种注入方式不仅可以作用于控制台本身，也可以作用于其他控制台扩展。例如，当你开发了一个控制台页面，并希望其他插件可以在你的页面中注入一些内容时，你可以这样做：

```vue
<template>
  <k-layout>
    <p>这里是一些文字</p>
    <k-slot name="custom" />
    <p>这里是一些文字</p>
  </k-layout>
</template>
```

这样一来，其他控制台插件就可以通过 `ctx.slot()` 来向你的页面中注入内容了。

一个插槽可以同时被注入多次。你可以为每次插槽注入指定优先级和显示条件：

```ts
ctx.slot({
  type: 'custom',
  component: Foo,
  order: 100,
})

ctx.slot({
  type: 'custom',
  component: Bar,
  order: 200,
  disabled: () => !store.bar,
})
```

`order` 更高的插槽会被优先显示；`disabled` 函数返回 `true` 时，插槽不会被显示。因此在上面的例子中，`Bar` 组件总是显示在 `Foo` 组件的前面，但只有当 `store.bar` 存在时才会显示。

## 用户设置 <badge type="warning">实验性</badge>

到此为止，我们所了解的插件配置都是 [直接在插件中声明](../plugin/schema.md)、[存储于配置文件中](../develop/config.md) 的。这在绝大多数情况下都是合理的——机器人管理员决定了插件的具体行为，而这些行为也不应该由用户决定。但实际上还有另一种情况：插件的某些行为可以由用户自由决定。例如机器人所使用的语言、控制台的主题等等。我们将这些配置统称为「用户设置」。

在控制台中，插件配置和用户配置是分离的。插件配置只有机器人的管理员有权查看和修改，而每个用户都可以查看和修改自己的用户配置。插件开发者也应当妥善区分这两种配置，以提高插件的可定制性。使用 [`ctx.settings()`](../../api/console/context.md#ctx-settings) 可以在用户设置界面中添加配置表单：

```ts client/index.ts
ctx.settings({
  id: 'appearance',
  schema: Schema.object({
    wallpaper: Schema.object({
      image: Schema.string().description('要使用的背景图片。'),
      opacity: Schema.number().description('前景的不透明度。'),
    }).description('壁纸设置'),
  }),
})
```

使用 `useConfig()` 可以在控制台中读取用户设置：

```ts
const config = useConfig()
config.value.wallpaper.image
```

## 动作与菜单 <badge type="warning">实验性</badge>

控制台的许多地方都会用到菜单，其中大家最熟悉的便是每个页面标题栏右侧的菜单按钮。除此以外，部分页面还提供了上下文菜单。想要定义菜单，我们首先需要了解 **动作 (Action)** 这一概念。

控制台中可以执行的任何一个操作都可以视为一个动作。每个动作都有着唯一的标识符，例如 `explorer.save` 表示保存当前文件、`explorer.refresh` 表示刷新文件列表等等。已知动作标识符的情况下，可以通过 [`ctx.menu()`](../../api/console/context.md#ctx-menu) 来描述一个菜单，并在 `<k-layout>` 中引用它：

```ts client/index.ts
ctx.menu('explorer', [{
  id: '.save',
  icon: 'save',
  label: '保存',
}, {
  id: '.refresh',
  icon: 'refresh',
  label: '刷新',
}])
```

```vue page.vue
<template>
  <!-- 在页面中指定菜单 -->
  <k-layout menu="explorer">
    页面内容
  </k-layout>
</template>
```

当然，光有菜单还不够，我们还需要实现上面的动作。这可以通过 [`ctx.action()`](../../api/console/context.md#ctx-action) 来完成：

```vue
<script lang="ts" setup>
import { send, useContext } from '@koishijs/client'

const ctx = useContext()

// 实现菜单动作
ctx.action('explorer.save', {
  disabled: () => content === oldContent,
  action: () => send('explorer/write', filename, content),
})
</script>
```

如果要实现上下文菜单，同样需要首先在入口文件中描述菜单项：

```ts client/index.ts
ctx.menu('entry', [{
  id: '.rename',
  label: '重命名',
}, {
  id: '.remove',
  label: '删除',
}])
```

然后在组件中使用 [`useMenu()`](../../api/console/composition.md#usemenu) 来获取菜单项的点击事件：

```vue
<template>
  <!-- 这里显示了文件列表 -->
  <div v-for="entry in entries">
    <!-- 右击任意文件名会呼出上述菜单 -->
    <div @contextmenu.stop="trigger($event, entry)">{{ entry.filename }}</div>
  </div>
</template>

<script lang="ts" setup>
import { useContext, useMenu } from '@koishijs/client'

const ctx = useContext()
const trigger = useMenu('entry')

// 实现菜单动作
ctx.action('entry.remove', {
  action: ({ entry }) => send('explorer/remove', entry.filename),
})
</script>
```
