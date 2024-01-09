# 通知服务 (Notifier)

## API contexte

### ctx.notifier.create(options?)

- **options:** <code>string | [Options](#options)</code> 通知选项
- 返回值: [`Notifier`](#notifier)

创建一个通知。如果传入的是字符串，则会视为 [`options.content`](#options-content)。

## 通知选项 {#options}

### options.type

- 类型: `'primary' | 'success' | 'warning' | 'danger'`
- 默认值: `'primary'`

通知类型。

### options.content

- 类型: `string`
- 默认值: `''`

通知内容。

## 类：Notifier {#notifier}

### notifier.update(options?)

- **options:** <code>string | [Options](#options)</code> 通知选项

更新此通知。如果传入的是字符串，则会视为 [`options.content`](#options-content)。

### notifier.dispose()

移除此通知。
