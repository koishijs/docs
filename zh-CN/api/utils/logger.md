# 输出日志 (Logger)

::: tip
本节中的 API 来自 [reggol](https://github.com/shigma/reggol)，并由 Koishi 重新导出。
:::

## 输出等级

**输出等级**控制了所有输出到命令行的内容的重要性。在 Koishi 内置的输出日志中，所有信息被分为了 3 种不同的等级：

1. error, success
2. warning, info
3. debug

当设置输出等级为 x 时，Koishi 只会输出重要性小于等于 x 的信息。当输出等级被设置为 0 时，Koishi 将不产生任何输出；而当输出等级被设置为 3 时，Koishi 产生的全部信息都会被显示在屏幕上 (你还可以通过配置 [`levels`](#options-logger-levels) 的方式影响具体插件的输出)。

默认情况下 Koishi 的输出等级为 2。你可以在配置文件中修改这个值。

## 配置文件选项

### options.logger.levels

- 类型：`number | object`
- 默认值：`{}`

设置输出等级。例如：

```yaml
logger:
  levels:
    # 将 app 命名空间的输出等级设置为 3
    app: 3
```

### options.logger.showTime

- 类型：`string | boolean`
- 默认值：`'yyyy/MM/dd hh:mm:ss'`

输出日志所使用的时间格式。它的基本语法如下：

- yyyy: 四位数年份
- yy: 年份末两位
- MM: 两位数月份
- dd: 两位数日期
- hh: 两位数小时
- mm: 两位数分钟
- ss: 两位数秒
- SSS: 三位数毫秒

如设置为 `false`，则不会输出时间。如设置为 `true`，将视为上述默认值。

### options.logger.showDiff

- 类型：`boolean`
- 默认值：`!config.logger.showTime`

是否标注相邻两次输出的时间差。

## 类：Logger

通常使用 `Logger` 类来进行日志输出。

### new Logger(name)

创建一个新的 Logger 实例。

`name` 参数用于指定命名空间，它将作为输出的前缀，并且可以被过滤。

### logger.error(format, ...param)

### logger.success(format, ...param)

### logger.warn(format, ...param)

### logger.info(format, ...param)

### logger.debug(format, ...param)

- **format:** `any` 格式化字符串
- **param:** `any[]` 要输出的内容

以不同的输出等级输出日志。参数的使用方法与 [`console.log`](https://developer.mozilla.org/zh-CN/docs/Web/API/Console/log) 相同。

::: tip
运行时产生的错误 (如请求失败，数据库访问失败等) 都属于 warning，只有在创建阶段和连接阶段抛出的错误才会通过 error 输出 (参见 [生命周期](../../guide/plugin/lifecycle.md))。
:::
