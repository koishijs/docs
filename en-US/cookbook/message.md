# 消息处理

我们已经熟悉了 Koishi 的一些基本概念，比如事件、中间件和指令等，那么他们的关系是什么呢？上面的生命周期图也同样告诉了我们答案：**中间件由内置监听器管理，而指令由内置中间件管理**。没错，当 message 事件被发送到各个上下文的监听器上时，绑定在 App 上的内置监听器将会将这个事件逐一交由中间件进行处理。全部处理完成后会触发一个 after-middleware 事件。

因为我们通常不需要直接监听 message 事件 (使用中间件往往是更好的实现)，after-middleware 事件的触发通常意味着你对一条消息的处理已经完成。我们的测试插件 @koishijs/plugin-mock 就是基于这种逻辑实现了它的会话 API。

### 内置消息监听器

1. message 事件触发，进入中间件处理流程
2. 根据上下文从中间件池中筛选出要执行的中间件序列
3. 逐一执行中间件：
    - 内置中间件是理论上第一个注册的中间件 (下接 [内置中间件](#内置中间件))
    - 通过 `ctx.middleware(cb, true)` 注册的中间件会插在队列的更前面
    - 临时中间件会直接插在当前序列的尾端，并不会影响中间件池本身
    - 如果执行中遇到错误或未调用 `next` 函数，会停止后续中间件的执行
4. 触发 [middleware](../api/core/events.md#事件：middleware) 事件
5. 更新当前用户和群的缓冲数据 (参见 [按需加载与自动更新](../guide/database/builtin.md#按需加载与自动更新))

### 内置中间件

1. 从前缀中匹配 at 机器人，nickname 或 prefix
2. 预处理消息内容，生成 [`session.parsed`](../api/core/session.md#session-parsed)
3. 触发 [before-parse](../api/core/events.md#事件：before-parse) 事件，尝试解析消息内容 ([快捷匹配](../guide/basic/command.md#快捷匹配) 的解析也在此处完成)
4. 如果数据库存在：
    - 触发 [before-attach-channel](../api/core/events.md#事件：before-attach-channel) 事件
    - 获取频道数据并存储于 [`session.channel`](../api/core/session.md#session-channel)
    - 根据 flags, assignee 等字段判断是否应该处理该信息，如果不应该则直接返回
    - 触发 [attach-channel](../api/core/events.md#事件：attach-channel) 事件 (用户可以在其中同步地更新群数据，或中止执行后续操作)
    - 触发 [before-attach-user](../api/core/events.md#事件：before-attach-user) 事件
    - 获取用户数据并存储于 [`session.user`](../api/core/session.md#session-user)
    - 根据 flags 等字段判断是否应该处理该信息，如果不应该则直接返回
    - 触发 [attach-user](../api/core/events.md#事件：attach-user) 事件 (用户可以在其中同步地更新群和用户数据，或中止执行后续操作)
5. 如果解析出指令：执行该指令 (下接 [指令执行流程](#指令执行流程))
6. 尝试解析出候选指令，如果成功则显示候选项 (参见 [模糊匹配](../manual/recipe/execution.md#模糊匹配))

在以上过程中，无论是解析指令还是出发内置的 before-attach-* 钩子都可能用到 [parse](../api/core/events.md#事件：parse) 事件。

### 指令执行流程

1. 如果解析过程中存在错误 (如非法参数等)，直接返回错误信息
2. 逐一调用 check 回调函数，直到返回值不为 `undefined`
3. 触发 [before-command](../api/core/events.md#事件：before-command) 事件：
    - 如果是 -h, --help 则直接显示帮助信息 (参见 [查看帮助](../manual/usage/command.md#查看帮助))
    - 根据配置检查用户权限和调用记录
4. 逐一调用 action 回调函数，直到返回值不为 `undefined`
5. 触发 [command](../api/core/events.md#事件：command) 事件

