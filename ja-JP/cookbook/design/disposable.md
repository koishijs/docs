# 可逆的 Koishi

可逆化是 Koishi 的核心设计理念。

## 定义

可逆的 Koishi 是指，对于任何一个 Koishi 实例，任意进行加载和卸载插件操作后，最终行为仅与最终启用的插件相关；与中间是否重复加载过插件、插件之间的加载或卸载顺序都无关。你也可以简单理解为「路径无关」。这里的相关和无关具体包括：

- 任意次加载并卸载一个插件后，内存占用不会增加
- 任意次加载并卸载一个插件后，不会残留对其他插件的影响
- 如果插件之间有依赖关系，依赖的插件会自动在被依赖的插件之后加载，并自动在被依赖的插件之前卸载，即确保插件的生命周期由依赖关系而非加载顺序决定

## 设计动机

实现了「可逆的 Koishi」的项目将会获得以下优点。

### ホットリロード

由于插件的副作用会在卸载时回收，Koishi 的所有插件都将可以在运行时加载、卸载和重载。这显著降低了用户的开发和更新成本，并大幅提高了 Koishi 应用的 SLA。

### 异步加载

由于插件的加载顺序由依赖关系决定，因此插件的代码可以被异步地加载，而不需要担心加载顺序对可用性的影响。这将显著提高 Koishi 的启动速度。

### 可追踪

可逆性意味着由 Koishi 插件注册的指令和中间件、监听的事件、提供的本地化、扩展的页面、抛出的错误都可以被明确地追踪来源。这有利于在大型项目中快速定位问题。

## 生态现状

目前的 Koishi 生态普遍依赖此模式。

### 依赖服务的插件

Koishi 存在大量依赖服务的插件。任何插件可以声明自身依赖某些服务，由 Koishi 确保插件只在服务加载完成后加载，并在卸载开始前卸载。

### @koishijs/plugin-config

@koishijs/plugin-config 提供了「插件管理」页面，允许用户在运行时启用、停用、修改插件配置，而不用重启 Koishi。这些功能直接与 Cordis 的底层 API 交互，确保了所有操作的可逆性。

### @koishijs/plugin-hmr

@koishijs/plugin-hmr 允许用户在开发过程中直接通过保存源文件来按需重载插件源码和配置。这是非常少见的后端 HMR (Hot Module Replacement，模块热替换) 实现。

### @koishijs/client

Koishi 的控制台前端由 @koishijs/client 提供，这个包同样依赖了 Cordis。这意味着 Koishi 的前端插件也是可重载的。此两者共同确保了 Koishi 控制台插件的可逆性。

## 实现原理

### 可逆 IO 变换

函数式编程中有着纯函数的概念——给定相同的输入总是给出相同的输出。然而，现实中的程序往往要与各种各样的副作用打交道。对于这种情况，我们可以对函数进行“纯化”——将它的副作用转化为参数和返回值的一部分即可。考虑下面的函数：

$$ f_\text{imp}: \text{X}\to\text{Y} $$

假设它含有副作用，我们把所有可能的副作用用 IO 来表示，则该函数可以被纯化为：

$$ f: \text{IO}\times\text{X}\to\text{IO}\times\text{Y} $$

此时我们得到的就一个纯函数，它接受 IO 和参数，返回修改过的 IO 和返回值。

如果忽略 $f$ 本身的入参和出参，只考虑副作用，那么可以定义函数空间 $\mathfrak{F}=\text{IO}\to\text{IO}$。其中的任何一个函数 $f: \mathfrak{F}$ 都是 IO 到自身的变换，不难看出它们在函数结合 $\circ$ 下构成幺半群：

1. 封闭性：$f\circ g$ 也是 IO 到自身的变换。
2. 结合律：$(f\circ g)\circ h=f\circ (g\circ h)$。
3. 单位元：存在 $\text{id}$，使得 $f\circ\text{id}=\text{id}\circ f=f$。

进一步，我们还希望 $f$ 的副作用是可以回收的。换言之，我们额外要求 $f$ 存在逆元 $f^{-1}$，此时 $\mathfrak{F}$ 就构成一个群。但仅仅知道函数可逆并不能帮助我们找到它的逆，我们需要在书写这个函数时一并写出它的回收方法。因此我们引入 $\text{effect}$ 函子，使这个函数返回一个新的函数，这个函数可用于回收此次调用的副作用：

$$ \begin{array} \\\text{effect}&:&\mathfrak{F}&\to&    \text{IO}  &\to&    \text{IO}\times\mathfrak{F} \\\text{effect}&:&f           &\mapsto&\mathcal{C}&\mapsto&\left(f(\mathcal{C}), f^{-1}\right) \end{array} $$

下面是一个例子 (暂时忽略 IO 参数)：

```ts
// effect(server.listen)
function serve(port: number) {
  const server = createServer().listen(port)
  return () => server.close()
}
```

上面的 `serve()` 函数将会创建一个服务器并且监听 `port` 端口。同时，调用该函数也会返回一个新的函数，用于取消该端口的监听。

然而，$\text{effect}\ f$ 不再是 $\mathfrak{F}$ 中的成员了，这并不适合组合多个副作用。为了解决这个问题，我们引入 $\text{collect}$ 和 $\text{restore}$ 两个变换：

$$ \begin{array} \\\text{collect}&:&\text{IO}\times\mathfrak{F}&\to&\text{IO} \\\text{restore}&:&\text{IO}                  &\to&\text{IO} \end{array} $$

其中 `collect()` 用于记录一个副作用，`restore()` 用于清空所有副作用。它们大致这样使用：

```ts
collect(serve(80))              // 监听端口 80 并记录副作用
collect(serve(443))             // 监听端口 443 并记录副作用
restore()                       // 回收所有副作用
```

最后，我们可以定义可逆性 (disposable) 函子

$$ \begin{array} \\\text{disposable}&:&\mathfrak{F}&\to&    \mathfrak{F} \\\text{disposable}&:&f           &\mapsto&\text{collect}\circ\left(\text{effect}\ f\right) \end{array} $$

它的作用是将任何可逆函数 $f$ 变换成能够自动记录副作用的版本。

### 上下文对象

在上面的示例中，我们并没有显式地写出 IO 参数和返回值。可以认为 IO 变换存在于 `collect` 等全局函数的闭包中。这种设计广泛存在于各种组合式框架 (如 React)，但它并不适合插件化和规模化的场景。

首先，所有插件都使用相同的全局函数，意味着不同插件的副作用完全无法区分，因此只能重启整个应用而无法细粒度地控制具体的插件；其次，这种设计意味着全局函数并不纯，因此一旦项目中出现了多例的依赖，整套系统的可靠性就会完全失效！

引入显式 IO 变换会降低应用的可读性，忽略显式 IO 变换又存在上述缺陷。那么有没有办法在不增加心智负担的同时编写可靠的插件呢？Cordis 通过上下文对象给出了完美的解决方案。

上下文对象是一个插件中唯一的可变部分，它同时担任了 IO 参数和返回值的角色。在上面的示例中引入上下文对象，就得到了熟悉的 Koishi 插件：

```ts
function serve(ctx: Context, config: Config) {
  const server = createServer().listen(config.port)
  ctx.on('dispose', () => server.close())
}
```

相应地，我们使用 `ctx.plugin()` 来加载插件 (相当于将可逆化函子作用于上述函数)：

```ts
ctx.plugin(serve, { port: 80 })
```

当一个插件被加载时，将会从当前上下文对象上派生出一个新的上下文实例。子级上下文将管理插件内的全部副作用，而插件整体将作为一个副作用被父级上下文收集。

除了 `ctx.plugin()` 外，上下文对象上还有许多 API，它们几乎都是某个函数的可逆化版本。例如 `ctx.on()` 是添加监听器的可逆化，`ctx.command()` 是注册指令的可逆化。这样一来，开发者只需要调用 `ctx` 上的方法，就可以确保插件的作用是可逆的。

这种设计同时解决了上述两个缺陷，并且完全不会带来额外的心智负担。在大多数的插件场景下，开发者甚至完全不需要手动监听 `dispose` 事件，就能编写出可逆的插件。

### 资源安全
