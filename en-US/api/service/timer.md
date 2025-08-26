# 计时器 (Timer)

## 实例方法

### ctx.setTimeout(callback, delay)

- **callback:** `Function` 回调函数
- **delay:** `number` 延迟时间 (毫秒)
- 返回值: `() => void`

在指定的延迟时间后执行回调函数。返回的函数可以用于取消此计时器。

### ctx.setInterval(callback, delay)

- **callback:** `Function` 回调函数
- **delay:** `number` 延迟时间 (毫秒)
- 返回值: `() => void`

在指定的延迟时间后执行回调函数，然后每隔指定的延迟时间重复执行。返回的函数可以用于取消此计时器。

### ctx.sleep(delay)

- **delay:** `number` 延迟时间 (毫秒)
- 返回值: `Promise<void>`

等待指定的延迟时间。如果在此期间插件被停用，将会抛出一个错误。

### ctx.throttle(callback, delay, noTrailing?)

- **callback:** `F extends (...args: any[]) => void` 回调函数
- **delay:** `number` 延迟时间 (毫秒)
- **noTrailing:** `boolean` 是否禁用尾随调用
- 返回值: `WithDispose<F>`

返回一个函数，该函数在指定的周期内最多执行一次。

具体表现为，此函数被调用后会立即执行，并在接下来的 `delay` 毫秒内忽略所有调用。

默认情况下，如果在最后一次实际执行后的一个延迟周期内再次调用返回的函数，则会在此延迟周期结束时再次执行 (即尾随调用)。将 `noTrailing` 设置为 `true` 可禁用此行为。

返回函数的 `dispose()` 方法可用于取消此计时器。此后所有调用都将被忽略。

### ctx.debounce(callback, delay)

- **callback:** `F extends (...args: any[]) => void` 回调函数
- **delay:** `number` 延迟时间 (毫秒)
- 返回值: `WithDispose<F>`

返回一个函数，该函数会忽略小于指定间隔的所有高频调用。

具体表现为，此函数被调用后，不会立即执行，而是会等待 `delay` 毫秒。如果在此期间再次调用返回的函数，则会重新计时。直到 `delay` 毫秒内没有调用，此函数才会执行。

返回函数的 `dispose()` 方法可用于取消此计时器。此后所有调用都将被忽略。
