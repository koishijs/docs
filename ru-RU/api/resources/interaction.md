# 交互 (Interaction) <badge type="warning">实验性</badge>

## 类型定义

```ts
interface Argv {
  name: string
  arguments: string[]
  options: Dict<string>
}

interface Button {
  id: string
}
```

## 事件

### interaction/button

- **session:** `Session` 会话对象
- 触发方式: emit

类型为 `action` 的按钮被点击时触发。

### interaction/command

- **session:** `Session` 会话对象
- 触发方式: emit

调用斜线指令时触发。
