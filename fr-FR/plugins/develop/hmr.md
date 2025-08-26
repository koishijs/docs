# @koishijs/plugin-hmr

:::tip
使用方法请参见 [开发 > 开发起步 > 启动脚本](../../guide/develop/script.md#模块热替换) 章节。
:::

## 配置项

### base

- 类型：`string`
- 默认值：`process.cwd()`

用于监听和显示的基础目录。检测到的文件路径会被转换为相对 `base` 的路径输出。

### root

- 类型：`string | string[]`
- 默认值：`['.']`

用于监听的文件或目录列表。支持填写绝对路径或是相对 `base` 的路径。

### ignore

- 类型：`string | string[]`
- 默认值：`['**/node_modules/**', '**/.git/**', '**/logs/**']`

要忽略的文件或目录。支持 [Glob Patterns](https://github.com/micromatch/micromatch) 语法。

### debounce

- 类型：`number`
- 默认值：`100`

延迟触发更新的等待时间。
