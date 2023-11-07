# 擴充套件控制檯

::: tip
在学习本章之前，建议先完整阅读 [入门 > 认识控制台](../../manual/usage/market.md#认识控制台)。
:::

## 创建扩展

在插件目录中新建这几个文件：

```diff
└── example
+   ├── client
+   │   ├── index.ts
+   │   ├── page.vue
+   │   └── tsconfig.json
    ├── src
    │   └── index.ts
    ├── package.json
    └── tsconfig.json
```

```ts title=client/index.ts no-extra-header
import { Context } from '@koishijs/client'
import Page from './page.vue'

export default (ctx: Context) => {
  // 此 Context 非彼 Context
  // 我们只是在前端同样实现了一套插件逻辑
  ctx.page({
    name: '页面标题',
    path: '/custom-page',
    component: Page,
  })
}
```

```vue title=client/page.vue
<template>
  <k-layout>
    <k-card>扩展内容</k-card>
  </k-layout>
</template>
```

```json title=client/tsconfig.json
{
  "compilerOptions": {
    "rootDir": ".",
    "module": "esnext",
    "moduleResolution": "node",
    "types": [
      // 这一行的作用是导入相关全局类型
      // 以便于在编辑器中显示更好的代码提示
      "@koishijs/client/global",
    ],
  },
  "include": ["."],
}
```

然后修改插件的 `package.json`，添加以下依赖：

```json title=package.json
{
  "peerDependencies": {
    "@koishijs/plugin-console": "^5.11.0"
  },
  "devDependencies": {
    "@koishijs/client": "^5.11.0"
  }
}
```

接着修改你的入口文件：

```ts title=src/index.ts
import { Context } from 'koishi'
// 此处需要导入 @koishijs/plugin-console 以获取类型
import {} from '@koishijs/plugin-console'
import { resolve } from 'path'

export const name = 'my-plugin'

export function apply(ctx: Context) {
  // 在已有插件逻辑的基础上，添加下面这段
  ctx.inject(['console'], (ctx) => {
    ctx.console.addEntry({
      dev: resolve(__dirname, '../client/index.ts'),
      prod: resolve(__dirname, '../dist'),
    })
  })
}
```

启动应用，并在控制台中配置你的插件。现在你已经可以在网页中看到并调试自己刚刚创建的页面了。
