# @koishijs/plugin-assets-git

## 配置项

### github.user

- 类型: `string`
- 必选参数

GitHub 用户名。

### github.repo

- 类型: `string`
- 必选参数

GitHub 仓库名。

### github.token

- 类型: `string`
- 必选参数

GitHub 访问令牌。

### git.baseDir

- 类型: `string`
- 必选参数

本地仓库的路径。

### tempDir

- 类型: `string`

临时目录的路径。

### flushInterval

- 类型: `number`
- 默认值: `3000`

同步间隔，单位为毫秒。

### maxBranchSize

- 类型: `number`
- 默认值: `5 * 1024 * 1024`

单个分支的最大体积，单位为字节。
