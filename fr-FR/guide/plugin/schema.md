# Schéma de configuration

在上一节中，我们已经了解了插件的本质是一个接受了上下文和配置项的函数。但仅仅是接受任意格式的输入是不够的，我们还需要对配置项进行一些约束，以确保插件能够正常运行。为此，我们开发了 [schemastery](https://github.com/shigma/schemastery) 这个工具，并将它集成到了 Koishi 中。这个工具可以帮助你：

- 验证某个配置项是否合法
- 为可缺省的配置项提供默认值
- 在控制台中通过表单让用户进行在线配置

让我们来看看它是如何工作的。

## Exemples généraux

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

在这个示例中，我们的插件导出了一个 `Config` 类型和一个同名的 `Schema` 对象。前者为我们的插件提供了类型，而后者则生成了对配置项的约束。我们可以看到，这个插件的配置项有两个属性，`foo` 是必需的，而 `bar` 则是可选的。如果你不填写 `foo`，那么插件在启动时就会报错；而如果你不填写 `bar`，那么它将会被赋予默认值 `1`。

## 描述类型信息

除了 `string`, `number`, `boolean` 等类型外，Koishi 同样支持 `array`, `dict`, `object` 等复合类型。你可以组合使用它们来构造出更复杂的配置项。

```ts
Schema.object({
  foo: Schema.array(Schema.string()),
  bar: Schema.dict(Schema.number()),
  baz: Schema.object({
    quz: Schema.boolean(),
  }),
})
```

你可以通过 `Schema` 对象的静态方法来创建这些类型；而对于已经创建的类型，你还可以通过链式调用的方式添加更多信息：

```ts
Schema.number()
  // 限制取值范围
  .min(0).max(100).step(1)
  // 设置默认值
  .default(50)
  // 以滑动条的形式显示
  .role('slider')
  // 设置描述信息
  .description('这是一个介于 0 和 100 之间的整数。')
```

我们能做的还远不止于此。一些高级类型如 `intersect` 可用于将类型的分组显示；而 `union` 则可以创造联合类型。通过恰当地组合它们，你甚至可以构造出上下关联的配置项！

为了帮助你更好地理解这些类型，我们专门编写了在线的 [配置演练场](../../schema/index.md)。所有类型的详细信息和用法示例都可以在这里找到。

## 插件的元属性

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

形如 `name` 和 `Config` 这样的属性，我们称之为插件的元属性。它们需要与插件的入口函数同级导出。例如，你还可以通过导出 `usage` 属性来为插件提供使用方法。这样一来，一个完整的插件就可以写成这样：

```ts
export const name = 'example'
export const usage = '这是一个示例插件。'
export interface Config {}
export const Config: Schema<Config> = Schema.object({})
export function apply(ctx: Context, config: Config) {}
```

类似的属性还有 `reusable`, `using`, `filter` 等等，我们将在接下来的几节中介绍它们的用法。
