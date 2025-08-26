# 編寫測試

如果你是一位成熟的开发者，你一定知道测试的重要性。比起让机器人真正运行起来交给用户去试错，预先编写好的测试具有许多前者所不具有的优点：

- 可以在无网络的情况下运行
- 可以模拟出多用户交互等复杂情况
- 可以在内存中模拟你想要的数据库
- 能够有效避免风控带来的损失
- 便于调试与错误定位

本章将介绍官方插件 `@koishijs/plugin-mock`。你可以用它来快速检验你编写的 Koishi 插件。

:::tip
本节中介绍的样例用到了 [Mocha](https://mochajs.org/) 和 [Chai](https://www.chaijs.com/)。它们都是比较通用的测试库和断言库，但并非绑定 @koishijs/plugin-mock 一同使用。你也可以根据你的喜好选择其他工具，比如 [Jest](https://jestjs.io/) 等等。
:::

## 准备工作

首先在工作区中安装所需的测试工具以及 @koishijs/plugin-mock：

:::tabs code

```npm
npm i mocha chai @koishijs/plugin-mock @types/mocha @types/chai -DW
```

```yarn
yarn add mocha chai @koishijs/plugin-mock @types/mocha @types/chai -DW
```

:::

:::tip
这里的 `-W` 表明直接安装到根工作区。你也可以改成只对一个插件添加这些依赖，不过考虑到你可能会在其他插件中也用到它们，安装到根工作区会更加方便。
:::

接着在插件目录中创建存放测试文件的 `tests` 目录，并在其中新建 `index.spec.ts` 文件：

```diff
└── example
    ├── src
    │   └── index.ts
+   ├── tests
+   │   └── index.spec.ts
    └── package.json
```

这个文件将用于编写测试代码：

```ts title=index.spec.ts no-extra-header
import { Context } from 'koishi'
import mock from '@koishijs/plugin-mock'

const app = new Context()
app.plugin(mock)
```

### 配置测试脚本

TODO

## 模拟会话消息

对于聊天机器人来说最常见的需求是处理用户的消息。为此，我们提供了 **客户端 (Client)** 对象，用于模拟特定频道和用户的输入：

```ts no-extra-header
/// <reference types="mocha" />
// ---cut---
import { Context } from 'koishi'
import mock from '@koishijs/plugin-mock'

const app = new Context()
app.plugin(mock)

// 创建一个 userId 为 123 的私聊客户端
const client = app.mock.client('123')

// 这是一个简单的中间件例子，下面将测试这个中间件
app.middleware(({ content }, next) => {
  if (content === '天王盖地虎') {
    return '宝塔镇河妖'
  } else {
    return next()
  }
})

// 这一句不能少，要等待 app 启动完成
before(() => app.start())
after(() => app.stop())

it('example 1', async () => {
  // 将“天王盖地虎”发送给机器人将会获得“宝塔镇河妖”的回复
  await client.shouldReply('天王盖地虎', '宝塔镇河妖')

  // 将“天王盖地虎”发送给机器人将会获得某些回复
  await client.shouldReply('天王盖地虎')

  // 将“宫廷玉液酒”发送给机器人将不会获得任何回复
  await client.shouldNotReply('宫廷玉液酒')
})
```

## 模拟数据库

@koishijs/plugin-database-memory 是 Koishi 的一个基于内存的数据库实现，非常适合用于编写测试。

```ts no-extra-header
import { Context } from 'koishi'
import mock from '@koishijs/plugin-mock'
import memory from '@koishijs/plugin-database-memory'

const app = new Context()
app.plugin(mock)
app.plugin(memory)

// 这次我们来测试一下这个指令
app.command('foo', { authority: 2 }).action(() => 'bar')

// 创建两个来自不同用户的客户端对象
const client1 = app.mock.client('123')
const client2 = app.mock.client('456')

before(async () => {
  await app.start()

  // 在数据库中初始化两个用户，userId 分别为 123 和 456，权限等级分别为 1 和 2
  // app.mock.initUser() 方法本质上只是 app.database.createUser() 的语法糖
  await app.mock.initUser('123', 1)
  await app.mock.initUser('456', 2)
})

after(() => app.stop())

it('example 2', async () => {
  // 用户 123 尝试调用 foo 指令，但是权限不足
  await client1.shouldReply('foo', '权限不足。')

  // 用户 456 得以正常调用 foo 指令
  await client2.shouldReply('foo', 'bar')
})
```
