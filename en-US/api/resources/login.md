# Login

## 类型定义

```ts
interface Login {
  user?: User
  status?: Status
}

enum Status {
  OFFLINE = 0,
  ONLINE = 1,
  CONNECT = 2,
  DISCONNECT = 3,
  RECONECT = 4,
}
```

## API

### bot.getLogin()

- 返回值: `Promise<Login>` 登录信息

获取登录状态。

## 事件

### login-added

- **session:** `Session` 会话对象
- 触发方式: emit

登录被创建时触发。

### login-removed

- **session:** `Session` 会话对象
- 触发方式: emit

登录被移除时触发。

### login-updated

- **session:** `Session` 会话对象
- 触发方式: emit

登录状态更新时触发。
