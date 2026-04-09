---
url: /plugins/console/status.md
---
# 运行状态 (Status)

## 指令：status

* 快捷调用：你的状态，查看状态，运行情况，运行状态

status 指令可以用于查看机器人的运行状态。

### 修改指令输出

可以使用模板语法修改 status 指令的输出。默认的代码实现如下：

```ts
template.set('status', {
  bot: '{{ username }}：{{ code ? `无法连接` : `工作中（${currentRate[0]}/min）` }}',
  output: [
    '{{ bots }}',
    '==========',
    '活跃用户数量：{{ activeUsers }}',
    '活跃群数量：{{ activeGuilds }}',
    'CPU 使用率：{{ (cpu[0] * 100).toFixed() }}% / {{ (cpu[1] * 100).toFixed() }}%',
    '内存使用率：{{ (memory[0] * 100).toFixed() }}% / {{ (memory[1] * 100).toFixed() }}%',
  ].join('\n'),
})
```

## 配置项

### tickInterval

* 类型: `number`
* 默认值: `Time.second * 5`

页面同步 profile 数据的时间。
