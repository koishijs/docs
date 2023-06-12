# Schema

在很多时候，我们会面临一些实用的需求：

- 验证某个配置项是否合法
- 为可缺省的配置项提供默认值
- 在网页控制台中通过表单让用户进行在线配置

为了解决这些需求，我们开发了 [schemastery](https://www.npmjs.com/package/schemastery) 这个库，并将它集成到了 Koishi 中。这一章将介绍如何使用这个库为你的插件声明配置。

## 基本示例

让我们看一个简单的示例。下面的插件将注册一个指令，输出当前插件的配置项。

```ts
import { Context, Schema } from 'koishi'

export const name = 'example'

export interface Config {
  foo: string
  bar?: number
}

export const Config: Schema<Config> = Schema.object({
  foo: Schema.string().required(),
  bar: Schema.number().default(1),
})

export function apply(ctx: Context, config: Config) {
  ctx.command('config').action(() => {
    // 输出当前的配置
    return `foo: ${config.foo}\nbar: ${config.bar}`
  })
}
```

需要注意的是，`Config` 应当是导出的插件的一个属性。因此，如果你使用默认导出，推荐你使用 `namespace` 来声明插件的配置：

```ts
class Example {
  constructor(ctx: Context, config: Example.Config) {
    // 这里是插件实现
  }
}

namespace Example {
  export interface Config {}

  export const Config: Schema<Config> = Schema.object({
    // 这里是配置声明
  })
}

export default Foo
```

## 更多配置类型

有关于更多配置类型，你可以阅读 [schemastery 文档](https://shigma.github.io/schemastery/) 以了解更多。
