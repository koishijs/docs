# 可逆的 Koishi

可逆化是 Koishi 的核心设计理念。

## 定义

可逆的 Koishi 是指，对于任何一个 Koishi 实例，任意进行加载和卸载插件操作后，最终行为仅与最终启用的插件相关；与中间是否重复加载过插件、插件之间的加载或卸载顺序都无关。你也可以简单理解为「路径无关」。这里的相关和无关具体包括：

- 任意次加载并卸载一个插件后，内存占用不会增加
- 任意次加载并卸载一个插件后，不会残留对其他插件的影响
- 如果插件之间有依赖关系，依赖的插件会自动在被依赖的插件之后加载，并自动在被依赖的插件之前卸载，即确保插件的生命周期由依赖关系而非加载顺序决定

## 设计动机

实现了「可逆的 Koishi」的项目将会获得以下优点。

### 热重载

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

### 可逆 IO 函数

在函数式编程中有着纯函数的概念——给定相同的输入总是给出相同的输出。然而，现实中的程序往往要与各种各样的副作用打交道。对于这种情况，我们可以对函数进行“纯化”——将它的副作用转化为参数和返回值的一部分即可。考虑下面的函数：

$$
\text{impure}\ f: \text{X}\to\text{Y}
$$

假设它含有副作用，我们把所有可能的副作用用 IO 来表示，则该函数可以被纯化为：

$$
f: \text{IO}\times\text{X}\to\text{IO}\times\text{Y}
$$

此时我们得到的就一个纯函数，它接受 IO 和参数，返回修改过的 IO 和返回值。

如果忽略 $f$ 本身的入参和出参，只考虑副作用，那么 $f$ 就是 IO 到自身的变换。这个变换具有构成幺半群的基本性质：

1. 封闭性：$f\circ g$ 也是 IO 到自身的变换。
2. 结合律：$(f\circ g)\circ h=f\circ (g\circ h)$。
3. 单位元：存在 $\text{id}$，使得 $f\circ\text{id}=\text{id}\circ f=f$。

进一步，我们还希望 $f$ 的副作用是可以回收的。换言之，$f$ 存在逆元，上述变换构成一个群 $\mathfrak{F}$。但仅仅知道函数可逆并不能帮助我们找到它的逆，我们需要在书写这个函数时一并写出它的回收方法。因此我们让这个函数返回一个新的函数，这个函数可用于回收此次调用的副作用：

$$
\begin{array}
\\\text{effect}\ f&:&\text{IO}  &\to&    \text{IO}\times(\text{IO}\to\text{IO})
\\\text{effect}\ f&:&\mathcal{C}&\mapsto&\left(f(\mathcal{C}), f^{-1}\right)
\end{array}
$$

下面是一个例子 (忽略 IO 参数以更符合 JavaScript 的书写习惯)：

```ts
function serverEffect(port: number) {
  const server = createServer().listen(port)
  return () => server.close()
}
```

上面的 `effect` 函数将会创建一个服务器并且监听 `port` 端口。同时，它也会返回一个新的函数，用于取消该端口的监听：

```ts
const dispose = serverEffect(80)    // 监听端口
dispose()                           // 取消监听
```

然而，$\text{effect}\ f$ 不再是 $\mathfrak{F}$ 中的成员了，这并不适合组合多个副作用。为了解决这个问题，我们引入 $\text{collect}$ 和 $\text{restore}$ 两个算子：

$$
\begin{array}
\\\text{collect}&:&\text{IO}\times(\text{IO}\to\text{IO})&\to&\text{IO}
\\\text{restore}&:&\text{IO}&\to&\text{IO}
\end{array}
$$

其中 $\text{collect}$ 用于记录一个副作用，$\text{restore}$ 用于清空所有副作用。相当于上面的代码变成了：

```ts
collect(serverEffect(80))       // 监听端口并记录副作用
collect(serverEffect(443))      // 监听端口并记录副作用
restore()                       // 回收所有副作用
```

现在，我们可以定义

$$
\text{disposable}=\text{collect}\circ\text{effect}
$$

### 插件实现

### 服务实现
