# 过滤器

:::tip
在学习本节之前，建议先完整阅读 [入门 > 过滤器](../../manual/usage/customize.md#过滤器)。
:::

默认情况下，一个会话事件、中间件或者指令都对所有的会话生效。但如果我们希望这些功能只对部分群聊或者用户生效，我们就需要用到 **过滤器**。

## 属性过滤器

:::warning
请不要滥用这项功能：在源码中直接书写账号或群号会导致隐私泄露，并且其他用户无法使用你的插件。推荐 [在配置文件中使用过滤器](#配置文件中的过滤器)。
:::

让我们先从最简单的会话过滤器开始。**属性过滤器**可以用来快速创建满足特定条件的子上下文：

```ts
ctx.user('112233')                  // 选择来自用户 112233 的会话
ctx.self('112233')                  // 选择发送给机器人 112233 的会话
ctx.guild('445566')                 // 选择来自群组 445566 的会话
ctx.channel('778899')               // 选择来自频道 778899 的会话
ctx.platform('discord')             // 选择来自平台 discord 的会话
```

这种写法也支持链式的调用：

```ts
// 选择来自平台 discord 中用户 112233 的会话
ctx.platform('discord').user('112233')
```

利用上下文，你可以非常方便地对每个环境进行分别配置：

```ts
declare const callback: Middleware
declare const listener: (session: Session) => void
/// ---cut---
// 在所有环境注册中间件
ctx.middleware(callback)

// 注册指令 my-command，仅对机器人 112233 有效
ctx.self('112233').command('my-command')

// 当有人申请加群 445566 时触发 listener
ctx.guild('445566').on('guild-request', listener)

// 安装插件 ./my-plugin，仅限 Telegram 平台使用
ctx.platform('telegram').plugin(require('./my-plugin'))
```

是不是非常方便呢？

## 条件过滤器

如果简单的会话过滤器无法满足你的需求，你也可以给一个上下文添加**条件过滤器**：它传入一个会话对象，并返回一个布尔类型。条件过滤器有三种添加方式：

```ts
// 满足当前上下文条件，且消息内容为“啦啦啦”
ctx.intersect(session => session.content === '啦啦啦')

// 满足当前上下文条件，或消息内容为“啦啦啦”
ctx.union(session => session.content === '啦啦啦')

// 满足当前上下文条件，且消息内容不为“啦啦啦”
ctx.exclude(session => session.content === '啦啦啦')
```

上述方法也可以传入一个上下文作为参数，分别表示两个上下文的交集、并集和差集：

```ts
// 选择来自群组 1122233 和用户 445566 的会话
ctx.guild('112233').intersect(ctx.user('445566'))

// 选择来自群组 1122233 或用户 445566 的会话
ctx.guild('112233').union(ctx.user('445566'))

// 选择来自群组 1122233 的会话，但来自用户 445566 的会话除外
ctx.guild('112233').exclude(ctx.user('445566'))
```

与选择器方法类似，过滤器方法也会返回一个新的上下文，你可以在其上自由的添加监听器、中间件、指令和插件。

## 配置文件中的过滤器

如果你遵循了模块化的开发理念，你的插件应该具有较为独立的功能。那么此时，你的插件内部其实并不需要使用过滤器，而是在插件加载时指定一次即可。在这种情况下，Koishi 提供了直接在配置文件中指定过滤器的方法：

```yaml title=koishi.yml
plugins:
  repeater:
    $filter:
      # 仅在 telegram 平台下 2 个特定频道内注册插件
      $and:
        - $eq:
            - $: platform
            - telegram
        - $in:
            - $: channel
            - - '123456'
              - '456789'
    onRepeat:
      minTimes: 3
      probability: 0.5
```

这相当于

```ts
ctx
  .intersect(app.platform('telegram'))
  .intersect(app.channel('123456', '456789'))
  .plugin(require('koishi-plugin-repeater'), {
    onRepeat: {
      minTimes: 3,
      probability: 0.5,
    },
  })
```

我必须承认这种写法并不是很简便，但事实上它设计出来也不是让你手写的。在控制台的「插件配置」界面我们提供了图形化的过滤器配置，你可以在那里轻松地配置每个插件的会话过滤器。这个图形化界面对插件组也同样有效。

## 隐藏过滤器设置

特别地，如果你的插件不涉及任何会话，不需要设置会话过滤器，你也可以在插件中手动声明 `filter` 属性为 `false` (声明方式参考 [插件的元属性](./schema.md#插件的元属性))：

```ts
// 作为导出整体的函数插件
export const name = 'Foo'
export const filter = false
export function apply(ctx: Context) {}
```

```ts
// 作为默认导出的类插件
export default class Bar {
  static filter = false
  constructor(ctx: Context) {}
}
```

## 定义条件属性

过滤器除了可以控制插件生效的范围，还能控制具体配置项的取值。使用 `Schema.computed()` 创建一个条件属性，它可以在会话满足不同过滤器时取不同的值：

```ts
export interface Config {
  foo: Computed<number>
}

export const Config: Schema<Config> = Schema.object({
  foo: Schema.computed(Number),
})

export function apply(ctx: Context, config: Config) {
  ctx.command('foo').action(({ session }) => {
    // 在会话满足不同过滤器时取不同的值
    const value = session.resolve(config.foo)
  })
}
```
