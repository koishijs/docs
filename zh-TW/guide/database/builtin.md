# 內建資料結構

<!-- 到目前为止，Koishi 对消息的处理逻辑仍然与数据库服务是分离的。如果仅仅是为了引入统一的数据库 API，并不值得我们把 `ctx.database` 内置为 Koishi 的一部分。我们随后会发现，Koishi 还为中间件和指令开发提供了便捷的数据流管理机制，这才是其内置数据库服务的主要原因。 -->

通常来说，中间件、插件的设计可以让机器人的开发变得更加模块化，但是缺乏统一的数据流管理也带来了额外的问题。如果每个中间件分别从数据库中读取和更新自己所需的字段，那会造成大量重复的请求，导致严重的资源浪费；将所有可能请求的数据都在中间件的一开始就请求完成，也并不会解决问题，因为一条信息的解读可能只需要少数几个字段，而大部分都是不需要的；更严重的是，后一种做法将导致资源单次请求，多次更新，从而产生种种数据安全性问题。

针对这些问题，Koishi 提供了一套完善的数据流管理机制，它能够在保证数据安全的同时，最大化地减少数据库访问次数。在这一节中，我们将会介绍这套机制的使用方法。

## 观察者对象

假设我们正在开发一个抽奖插件，每调用一次 lottery 指令，用户会获得一件物品，并存入用户表的 `inventory` 属性中。下面是这个插件的实现：

```ts{13-14,18-19}
declare function getLottery(): string

// ---cut---
// 定义一个 inventory 字段，用于存放物品列表
declare module 'koishi' {
  interface User {
    inventory: string[]
  }
}

ctx.model.extend('user', {
  inventory: 'list',
})

ctx.command('lottery')
  // 声明所需字段
  .userFields(['inventory'])
  .action(({ session }) => {
    // 这里假设 inventory 是一个字符串，表示抽到的物品
    const item = getLottery()
    // 将抽到的物品存放到 user.items 中
    session.user.inventory.push(item)
    return `恭喜您获得了 ${item}！`
  })
```

我们都知道，写入数据库是一个异步的操作，而上面的代码看起来完全没有异步操作。然而如果你运行这段代码，你会发现用户数据被成功地更新了。这就归功于观察者机制。

`session.user` 是一个 **观察者 (Observer)** 对象，它会检测在其上面做的一切更改并缓存下来。当中间件执行完毕后，Koishi 又会自动将变化的部分进行更新，同时将缓冲区清空。我们因此得以直接在 `session.user` 上进行赋值，而不必手动调用 `ctx.database` 上的方法。

### 声明所需字段

`cmd.userFields()` 方法用于声明所需的用户字段。未声明的字段将不会被加载，也无法直接被修改。这样做的好处是，无论用户表有多少字段，我们都可以只加载所需的字段，从而提高性能。同理我们也有 `cmd.channelFields()` 方法，功能类似。

这两个方法不仅可以接受一个可迭代对象，还可以接受一个回调函数。第一个参数是当前的 `Argv` 对象，第二个参数是 `Set<keyof User>`，可以通过 add / delete 方法来添加或删除字段。因此上面的代码等价于：

```ts
cmd.userFields((argv, fields) => {
  fields.add('inventory')
})
```

### 阻塞式更新

观察者机制不仅可以将多次更新合并成一次以提高程序性能，更能解决数据竞争的问题。如果两条消息在临近的时间点被接收到，如果单纯地使用 get / set 进行处理，可能会发生后一次 get 在前一次 set 之前完成，导致本应获得 2 件物品，但实际只获得了 1 件的问题。而观察者会随时同步同源数据，数据安全得以保证。

当然，如果你确实需要阻塞式地等待数据写入，我们也提供了 `user.$update()` 方法。顺便一提，一旦成功执行了观察者的 `$update()` 方法，之前的缓冲区将会被清空，因此之后不会重复更新数据；对于缓冲区为空的观察者，`$update()` 方法也会直接返回，不会产生任何的数据库访问。这些都是我们优化的几个细节。

你可以在 [这里](../../api/utils/observer.md) 看到完整的观察者 API。

## 进阶用法

### attach 事件

Koishi 内置了四个与观察者相关的事件，分别是：

- `before-attach-channel`：在频道观察者被绑定到会话上之前触发
- `attach-channel`：在频道观察者被绑定到会话上之后触发
- `before-attach-user`：在用户观察者被绑定到会话上之前触发
- `attach-user`：在用户观察者被绑定到会话上之后触发

下面是一个例子，我们在用户对象上实现了一个 `msgCount` 字段，用于存放收到的信息数量：

```ts
// 定义一个 msgCount 字段，用于存放收到的信息数量
declare module 'koishi' {
  interface User {
    msgCount: number
  }
}

ctx.model.extend('user', {
  msgCount: 'integer',
})

ctx.before('attach-user', (session, fields) => {
  fields.add('msgCount')
})

ctx.middleware((session: Session<'msgCount'>, next) => {
  // 这里更新了 msgCount 数据
  session.user.msgCount++
  return next()
})
```

### 手动绑定

如果要绑定的字段无法提前判断，我们也提供了动态补充观察者字段的方法：

```ts
declare const fields: any[]

// ---cut---
// 绑定一个用户观察者，确保 fields 中的字段都被加载
session.observeUser(fields)

// 绑定一个频道观察者，确保 fields 中的字段都被加载
session.observeChannel(fields)
```
