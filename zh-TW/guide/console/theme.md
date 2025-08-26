# 主题开发 <badge type="warning">实验性</badge>

Koishi 也允许插件定义控制台主题。让我们先从简单的色彩主题开始。

## 色彩主题

[theme-vanilla](https://github.com/koishijs/koishi-plugin-theme-vanilla) 插件提供了许多色彩主题，你可以参考它的源码来开发自己的主题：

```ts
// 引入定义主题色的 CSS 文件
import './index.scss'

ctx.theme({
  id: 'coffee-dark',
  name: 'Coffee Dark',
})

ctx.theme({
  id: 'coffee-light',
  name: 'Coffee Light',
})
```

如你所见，要定义一个色彩主题非常简单，只需要调用 [`ctx.theme()`](../../api/console/context.md#ctx-theme) 即可。其中，`id` 用于标识主题，`name` 则会显示在主题选择器中。

:::tip
请注意：`id` 必须以 `-dark` 或 `-light` 结尾，否则 Koishi 将无法正确回退 CSS 变量！
:::

接下来让我们看看 `index.scss` 的内容：

```scss
:root, .theme-root {
  &[theme=coffee-dark] {
    --bg1: #231F1E;
    --bg2: #262120;
    --bg3: #292423;
    --bg4: #342A27;
  }

  &[theme=coffee-light] {
    --bg1: #EEE9E7;
    --bg2: #EAE4E1;
    --bg3: #E6DFDC;
    --bg4: #E3DBD6;
  }
}
```

Koishi 为主题系统预定义了许多 CSS 变量。只需要在属性选择器中修改这些变量的值，一个色彩主题就大功告成了。

## 改变布局

Koishi 同样允许主题改变控制台的布局：

```ts
import root from './root.vue'
import layout from './layout.vue'

ctx.theme({
  id: 'windows-light',
  name: 'Windows Light',
  components: { root, layout },
})
```

在上面的例子中，[`ctx.theme()`](../../api/console/context.md#ctx-theme) 接受一个额外的 `components` 选项，用于覆盖默认的布局组件。其中，`root` 用于定制整个控制台的布局，`layout` 用于定制 `<k-layout>` 的实现。
