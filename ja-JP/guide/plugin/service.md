# サービスと依存性

在之前的章节中，你或许已经意识到了 Koishi 的大部分特性都是围绕上下文进行设计的——即使不同的上下文可以隶属于不同的插件、配置不同的过滤器，但许多功能在不同的上下文中访问的效果是一致的。换言之，应用其实可以被理解成一个容器，搭载了各种各样的功能 (如数据库和适配器等)，而上下文则单纯提供了一个接口来访问它们。这种组织形式被称为 **服务 (Service)**。

对于已经有 IoC / DI 概念的同学来说，服务就是一种类似于 IoC 的实现 (但并非通过 DI 实现)。Service API 通过 TypeScript 特有的 **声明合并 (Declaration Merging)** 机制提供了容器内服务的快速访问。

## 服务的类型

Koishi 中的服务可以分为大致三种类型。对于每一种我都给出了一些例子。

第一种是由 **Koishi 自带的服务**。只要有上下文对象，你就可以随时访问这些服务。

- ctx.model：提供数据模型
- ctx.i18n：提供国际化能力

第二种是由 **Koishi 所定义但并未实现的服务**。你可以选择适当的插件来实现它们。在你安装相应的插件之前，相关的功能是无法访问的。

- ctx.assets：转存资源文件
- ctx.database：封装数据库操作

实现特定服务的插件名通常以服务名作为前缀，例如 assets-local, database-mysql 等等。这并非强制的要求，但我们建议插件开发者也都遵循这个规范，这有助于让使用者对你插件的功能建立一个更明确的认识。

最后一种则是 **由插件定义和实现的服务**。通常情况下你需要声明这些服务作为依赖。关于插件与服务的依赖关系，会在下面具体介绍。

- ctx.console：网页控制台
- ctx.puppeteer：浏览器截图

## 服务的依赖关系

前面从服务提供者的角度提供了解决方案，现在让我们把视角转换到服务的使用者上。假设你正在开发名为 dialogue 的问答系统，并且这个插件依赖多个服务：

- `database`：你使用数据库存储教学内容，离开数据库你的插件将无法运行
- `assets`：你需要使用资源存储服务来做图片转存，离开此服务将可能导致部分图片无法正常显示，但短时间内不会对插件的运行造成影响
- `console`：你为你的插件编写了控制台扩展，当控制台存在时你可以在网页中进行操作，但它并非教学系统的主要功能

那么你应该怎么写呢？先让我们来看一段标准错误答案：

```ts
// 标准错误答案！别抄这个！
export const name = 'dialogue'

export function apply(ctx: Context) {
  // 检查数据库服务是否存在
  if (!ctx.database) return

  ctx.command('dialogue').action((_, content) => {
    // 检查资源存储服务是否存在
    if (ctx.assets) ctx.assets.transform(content)
  })

  // 检查控制台服务是否存在
  if (ctx.console) {
    ctx.console.addEntry('/path/to/dialogue/extension')
  }
}
```

你很快会发现这样写完全无法运行。首先，数据库服务需要等到应用启动完成后才可以访问，换言之即使安装了数据库插件，你也无法立即判断数据库服务是否存在。此外，一旦上述服务所在插件在运行时被重载，由于上面的代码属于 dialogue 插件，因此 if 中代码的副作用将无法被有效清理；而当相应的服务重新被注册时，这部分的代码也不会被重新运行，从而导致一系列难以检测的问题。

### inject 属性

为了解决这种问题，Koishi 为插件声明提供了一个独特的 `inject` 属性：

```ts
export const name = 'dialogue'
export const inject = ['database']

export function apply(ctx: Context) {
  // 你可以立即访问数据库服务
  ctx.database.get('dialogue', {})
}
```

`inject` 可以是一个数组或者对象。这里使用了数组，表示此插件依赖的服务列表。怎么理解这里的依赖关系呢？如果你声明了某个服务作为插件的依赖：

- 直到此服务的值变为 truthy 为止，该插件的函数体不会被加载
- 一旦此服务的值发生变化，该插件将立即回滚 (并非插件停用)
- 如果变化后的值依旧为 truthy，该插件会在回滚完成后被重新加载

对于部分功能依赖某个服务的插件，有两种方式可以实现。第一种情况下，你可以把这部分功能独立为一个子插件。此时，Koishi 提供了一个语法糖 `ctx.inject()`：

```ts
ctx.inject(['console'], (ctx) => {
  ctx.console.addEntry('/path/to/dialogue/extension')
})

// 等价于
ctx.plugin({
  using: ['console'],
  apply: (ctx) => {
    ctx.console.addEntry('/path/to/dialogue/extension')
  },
})
```

::: tip
请注意：这里出现了两个 `ctx` 对象，它们属于不同的插件。在子插件的回调函数内，请务必使用作为参数的 `ctx` 而不是外层的 `ctx`，不然在服务被热重载时可能会引发内存泄漏。
:::

另一种情况是，插件依赖的服务仅仅在运行时判断并使用，并不提供任何副作用。此时可以将 `inject` 声明为一个对象，其含有 `required` 和 `optional` 两个可选的属性，分别表示必需依赖和可选依赖。这样声明的可选依赖同样可以在插件体中直接使用，但插件的生命周期并不会实际依赖该服务。换句话说，插件不会等待该服务加载，也不会因为服务的变化而回滚。

```ts
export const inject = {
  optional: ['assets'],
}

export function apply(ctx: Context) {
  ctx.command('dialogue').action((_, content) => {
    // 检查资源存储服务是否存在
    if (ctx.assets) ctx.assets.transform(content)
  })
}
```

### 最佳实践

在上面的讨论中，我们已经分别介绍了 dialogue 插件所用到的三个服务的声明方式。现在让我们把它们结合起来，看看最佳实践应该是怎样的。请注意不同服务的处理方式之间的区别。

```ts
// 正确答案！抄这个！
export const name = 'dialogue'

// 对于整体依赖的服务，使用 inject 属性声明依赖关系
export const inject = {
  required: ['database'],
  optional: ['assets'],
}

export function apply(ctx: Context) {
  ctx.command('dialogue').action((_, content) => {
    // 对于可选的依赖服务，在运行时检测即可
    if (ctx.assets) ctx.assets.transform(content)
  })

  // 对于部分功能依赖的服务，使用 ctx.inject() 注册为子插件
  ctx.inject(['console'], (ctx) => {
    ctx.console.addEntry('/path/to/dialogue/extension')
  })
}
```


<!-- ## 服务的共享与隔离

在默认情况下，任何上下文中设置的服务都会被同一个应用内的所有上下文共享。这当然非常方便——事实上服务也正是为了这样的需求而设计的，但这意味着你的每种服务只能同时存在一个实例。如果你希望用多个插件实现同一个服务，并分别提供给不同的上下文使用的话，你就要用到服务的隔离功能了。

`ctx.isolate()` 方法接受一个字符串数组，表示要隔离的服务列表，并返回一个新的上下文。新上下文中的上述服务将与外层上下文隔离，但仍然会与新上下文所派生出的子上下文共享。下面是一个简单的例子：

```ts
declare module 'koishi' {
  interface Context {
    foo: Foo
    bar: Foo
  }
}
interface Foo {
  value: number
}
interface Bar {
  value: number
}
// ---cut---
const root = new App()
const ctx1 = root.isolate(['foo'])
const ctx2 = root.isolate(['bar'])

root.foo = { value: 1 }
ctx1.foo                        // undefined
ctx2.foo                        // { value: 1 }

ctx1.bar = { value: 2 }
root.bar                        // { value: 2 }
ctx2.bar                        // undefined
```

在这个例子中，我们创建了两个上下文，分别隔离了 foo 和 bar 服务。作为结果，根上下文中的 foo 服务将只与 `ctx2` 共享，而 bar 服务则只与 `ctx1` 共享。如果我们进一步在 `ctx1` 中实现 foo 服务，我们实际上也就提供了两个 foo 服务的实例。这两个实例互不干扰，并且各自服务于不同的上下文。当一个实例被移除时，也不会影响到另一个实例的作用范围。

### 在配置文件中使用

服务的隔离也可以在配置文件中声明，只需在插件组的配置中添加 `$isolate` 字段即可：

```yaml
plugins:
  admin:
  group:1:
    $isolate:
      - database
    database-mysql:
    github:
  group:2:
    database-mongo:
    dialogue:
```

在上面的例子中，我们定义了两个插件组 1 和 2，前者配置了隔离的 database 环境。因此，github 插件内所访问到的 database 服务将是 `database-mysql` 所提供的，而其他地方 (包括 admin 和 dialogue 插件等) 所访问到的 database 服务则都是 `database-mongo` 所提供的。

::: tip
如果你修改上面的例子，为插件组 2 也设置隔离的 database 环境，那么 koishi 本体也将无法访问到任何 database 服务，这可能并不是你所期望的。
::: -->

## 自定义服务

如果你希望自己插件提供一些接口供其他插件使用，那么最好的办法便是提供自定义服务，就像这样：

```ts
import Console from '@koishijs/plugin-console'
// ---cut---
// 这个表达式定义了一个名为 console 的服务
Context.service('console')

// 假如你在某个上下文设置了这个值，其他的上下文也将拥有此属性
app.guild().console = new Console()
app.private().console instanceof Console // true
```

这种做法的本质原理是修改了 Context 的原型链。

对于 TypeScript 用户，你还需要进行声明合并，以便能够在上下文对象中获得类型提示：

```ts no-extra-header
declare module 'koishi' {
  interface Context {
    console: console
  }
}
```

### 服务的生命周期

相比直接赋值，我们更推荐你从 Service 派生子类来实现自定义服务：

```ts
class Console extends Service {
  constructor(ctx: Context) {
    // 这样写你就不需要手动给 ctx 赋值了
    super(ctx, 'console', true)
  }
}

// 这样定义的好处在于，Console 本身也是一个插件
app.plugin(Console)
```

Service 抽象类的构造函数支持三个参数：

- `ctx`：服务所在的上下文对象
- `name`：服务的名称 (即其在所有上下文中的属性名)
- `immediate`：是否立即注册到所有上下文中 (可选，默认为 `false`)

以及三个可选的抽象方法：

- `start()`：在 `ready` 事件触发时调用
- `stop()`：在 `dispose` 事件触发时调用
- `fork()`：在 `fork` 事件触发时调用

默认情况下，一个自定义服务会先等待 ready 事件触发，然后调用可能存在的 `start()` 方法，最后才会被注册到全体上下文中。这种设计确保了服务在能够被访问的时候就已经是可用的。但如果你的服务不需要等待 ready 事件，那么只需传入第三个参数 `true` 就可以立即将服务注册到所有上下文中。

此外，当注册了服务的插件被卸载时，其注册的服务也会被移除，其他插件不再可以访问到这项服务：

```ts
import Console from '@koishijs/plugin-console'
// ---cut---
app.console                 // falsy
app.plugin(Console)         // 加载插件
app.console                 // truthy
app.dispose(Console)        // 卸载插件
app.console                 // falsy
app.plugin(Console)         // 重新加载插件
app.console                 // truthy
```

### 支持热重载

既然服务的作用是提供接口供其他插件调用，就自然会涉及一个热重载的问题。如果某个插件先调用了服务上的方法，然后被卸载，那么我们就需要处理调用所带来的副作用。让我们来看一段 console 插件的源码：

```ts
interface Console {
  entries: Set<string>
  triggerReload(): void
}
// ---cut---
class Console extends Service {
  // 这个方法的作用是添加入口文件
  addEntry(filename: string) {
    this.entries.add(filename)
    this.triggerReload()

    // 注意这个地方，caller 属性会指向访问此方法的上下文
    // 只需要在这个上下文上监听 dispose 事件，就可以顺利处理副作用了
    this[Context.current]?.on('dispose', () => {
      this.entries.delete(filename)
      this.triggerReload()
    })
  }
}
```

## 在 `package.json` 中声明依赖

如果你打算将插件发布到插件市场，我们建议在插件的 [`package.json`](../develop/publish.md#koishi-字段) 中对其所提供和使用的服务进行声明。这些字段将显示在控制台中插件的详情页中，帮助使用者更好地理解插件的功能。

```json title=package.json
{
  "koishi": {
    "service": {
      "required": ["database"],
      "optional": ["assets", "console"],
      "implements": ["dialogue"]
    }
  }
}
```

在这里，`required` 对应于必需依赖，`optional` 对应于可选依赖，`implements` 对应于提供的服务。如果你的插件没有使用或提供服务，那么对应的字段可以省略。

### 关于 `peerDependencies`

一个很容易混淆的概念是 `package.json` 自带的 `peerDependencies` 字段。这个字段用于声明一个 npm 包的依赖，但声明的依赖需要由用户安装 (或由包管理器自动安装到依赖树顶层)。是不是跟服务的概念非常像？它们之间的区别如下：

1. `peerDependencies` 描述的是 npm 包的运行时行为。如果对应的依赖不存在，那么程序预期无法正常运行 (除非在 `peerDependenciesMeta` 中指明可选性)。而对于 Koishi 插件来说，由于有了 `inject` 机制，即使依赖的服务不存在，程序也不会崩溃。

2. `peerDependencies` 是一对一的关系，即依赖的只能是另一个确定的包。而 Koishi 中的服务则是一对多的关系，即依赖的服务可以被多个插件所提供。

基于以上两点，关于是否要在插件的 `package.json` 中为服务声明 `peerDependencies`，我们可以根据插件从依赖中导入的内容来判断：

#### 情况一：插件仅导入了类型声明

这是绝大部分的情况。在这种情况下，我们无需声明 `peerDependencies`，但建议把依赖加入 `devDependencies` 中。下面将以 puppeteer 插件提供的服务为例介绍：

```ts
// import {} 的意思是，我们只需要类型声明，而不需要导入任何内容
// 在编译后，这个语句会被移除，不会引入任何副作用
import {} from 'koishi-plugin-puppeteer'

// 通过 inject 属性声明依赖，并通过 ctx 来访问服务
export const inject = ['puppeteer']
export function apply(ctx: Context) {
  ctx.puppeteer.render()
}
```

此时插件的 `package.json` 可以这样写：

```json title=package.json
{
  "service": {
    "required": ["puppeteer"]
  },
  "devDependencies": {
    "koishi-plugin-puppeteer": "^2.0.0"
  }
}
```

#### 情况二：插件导入了类型声明以外的内容

一个典型的例子是 console 服务。一些控制台扩展需要从 `@koishijs/plugin-console` 中导入 `DataService` 基类。此时你的代码应该是这样的：

```ts
import { DataService } from '@koishijs/plugin-console'

export class ExamplePlugin extends DataService {
  // ...
}
```

此时你需要同时声明 `peerDependencies` 和 `devDependencies`：

```json
{
  "service": {
    "required": ["console"]
  },
  "peerDependencies": {
    "@koishijs/plugin-console": "^5.13.0"
  },
  "devDependencies": {
    "@koishijs/plugin-console": "^5.13.0"
  }
}
```
