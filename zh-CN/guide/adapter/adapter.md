# 实现适配器

::: danger 注意
此页文档正在施工，其中的内容可能不是最新。
:::

我们已经知道，单独一个 `Bot` 类已经构成一个合法的插件了。不过，这样的插件只具备调用平台 API 的能力，还无法接收消息。这个时候就需要 `Adapter` 类出场了。

## 适配器的类型

适配器需要建立并维护机器人与聊天平台之间的连接。通常来说，根据协议的不同，适配器与机器人可能是一对一的，也可能是一对多的。让我们再看一眼之前介绍过的 `ReplBot` 实例：

```ts
class ReplBot extends Bot {
  constructor(ctx: Context, config: Config) {
    super(ctx, config)
    ctx.plugin(ReplAdapter, this)
  }
}
```

如果我们多次加载上述插件，由于 `Bot` 基类的可重用性，每一次加载都会构造出新的 `ReplBot` 实例。另一方面，`ReplAdapter` 类继承了 `Adapter.Server`，该基类并没有声明 `reusable` 属性，因此不可重用。在多次加载的过程中，多个 `ReplBot` 实例只会对应于同一个 `ReplAdapter` 实例。这便是典型的一对多适配器逻辑。

相比之下，Discord 平台使用 WebSocket 向机器人推送事件。每一个机器人都需要维护一个独立的 WebSocket 连接，因此需要多个 `Adapter` 实例。在这种情况下，我们无需改动上面机器人的代码，只需要将 `DiscordAdapter` 继承的基类变为 `Adapter.Client`。这个基类声明了可重用性，它将实现一个一对一的适配器逻辑。

简单来说就是，在实现适配器时，首先需要协议的类型确定适配器与机器人的对应关系。如果是一对多的就使用 `Adapter.Server` 基类，否则使用 `Adapter.Client`。

