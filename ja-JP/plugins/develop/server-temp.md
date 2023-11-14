# @koishijs/plugin-server-temp

@koishijs/plugin-server-temp 实现了一个临时文件服务。

## 配置项

### config.path

- 类型: `string`
- 默认值: `'/temp'`

服务器监听的路径。

### config.maxAge

- 类型: `number`
- 默认值: `Time.minute * 5`

文件的最大有效时间。
