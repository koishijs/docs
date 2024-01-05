# Data Exchange

Koishi 控制台前后端的数据交互基本是通过 WebSocket 实现的。为了适应不同的场景，我们提供了多种数据交互的形式。

## 被动推送

Backend:

```ts title=src/index.ts no-extra-header
import { Context } from 'koishi'
import { resolve } from 'path'
import { DataService } from '@koishijs/plugin-console'

declare module '@koishijs/plugin-console' {
  namespace Console {
    interface Services {
      custom: CustomProvider
    }
  }
}

class CustomProvider extends DataService<string[]> {
  constructor(ctx: Context) {
    super(ctx, 'custom')
  }

  async get() {
    return ['Hello', 'World']
  }
}

export const name = 'my-plugin'
export const inject = ['console']

export function apply(ctx: Context) {
  ctx.plugin(CustomProvider)

  ctx.console.addEntry({
    dev: resolve(__dirname, 'client/index.ts'),
    prod: resolve(__dirname, 'dist'),
  })
}
```

Frontend:

```ts title=client/index.ts no-extra-header
import { Context } from '@koishijs/client'
import Page from './page.vue'

export default (ctx: Context) => {
  ctx.page({
    name: 'Page title',
    path: '/custom-page',
    // available when the `custom` field exist
    fields: ['custom'],
    component: Page,
  })
}
```

```vue client/page.vue
<template>
  <!-- 这里应该有类型支持，并且支持数据响应式变化 -->
  <k-card>{{ store.custom }}</k-card>
</template>

<script>
import { store } from '@koishijs/client'
</script>
```

## 主动获取

Backend:

```ts title=src/index.ts no-extra-header
import { Context } from 'koishi'
import { resolve } from 'path'
import { DataService } from '@koishijs/plugin-console'

declare module '@koishijs/plugin-console' {
  interface Events {
    'get-greeting'(): string[]
  }
}

export const name = 'my-plugin'
export const inject = ['console']

export function apply(ctx: Context) {
  ctx.console.addListener('get-greeting', () => {
    return ['Hello', 'World']
  })

  ctx.console.addEntry({
    dev: resolve(__dirname, 'client/index.ts'),
    prod: resolve(__dirname, 'dist'),
  })
}
```

```vue title=client/page.vue
<template>
  <k-card>{{ greeting }}</k-card>
</template>

<script>
import { send } from '@koishijs/client'
import { ref } from 'vue'

const greeting = ref<string[]>()

send('get-greeting').then(data => {
  greeting.value = data
})
</script>
```

## Permission Management

当你引入了 @koishijs/plugin-auth 插件之后，你可以为你的页面访问和数据交互引入鉴权机制：

```ts
// Only logged user with authority not less than 3 can access this page
ctx.console.addListener('get-greeting', () => {
  return ['Hello', 'World']
}, { authority: 3 })
```

```ts title=client/index.ts
ctx.page({
  name: 'Page title',
  path: '/custom-page',
  // Only logged user with authority not less than 3 can access this page
  authority: 3,
  component: Page,
})
```
