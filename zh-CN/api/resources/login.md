# 登录状态 (Login)

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

### login-updated

- **session:** `Session` 会话对象

登录状态更新时触发。
