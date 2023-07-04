# 部署到 k-on!

[Koishi Online (k-on!)](https://koishi.online/) 是一个在线的 Koishi 运行时，你可以在这里体验 Koishi 的各种功能。

相比其他 Koishi 运行环境，k-on! 最大的特点在于它不存在后端，直接在浏览器中运行。这意味着你不需要安装或下载任何文件就能使用 Koishi。

## 部署插件

::: tip
阅读本节前请先阅读 [发布插件](../guide/develop/publish.md)。
:::

由于受到浏览器环境的限制，有许多插件无法直接在 k-on! 中运行，因此 k-on! 有着独立的插件市场。要将一个插件部署到 k-on! 中，需要满足以下条件：

- 安全性限制：插件不能被标记为不安全
- 体积限制：插件的安装体积不得超过 5MB，打包体积不得超过 1MB
  - 安装体积：在安装时需要下载的文件总体积 (含依赖库，除去少量白名单依赖)
  - 打包体积：入口文件被打包并缩减后的体积
- 环境限制：不能使用 `child_process` 等在浏览器中无法实现的原生模块和二进制文件
  - 我们对 `fs` 等常用 node 库做了模拟，但不能使用同步 API 如 `fs.readFileSync`
  - 如果插件必须依赖某些二进制文件，可以考虑使用 WebAssembly
- 网络限制：如果插件需要访问网络，所使用到的网络服务必须支持跨域请求
  - 也可以通过允许跨域的第三方服务器来转发请求

如果你的插件满足了以上条件，那么你可以在插件的 `package.json` 中添加以下字段：

```json
{
  "koishi": {
    "browser": true
  }
}
```

接着为你的插件发布一个新版本，该插件随后就可以在 k-on! 中使用了。

## 特殊场景的处理

对于一些特殊的场景，我们也提供了对应的解决方案。

### 环境变量

k-on! 提供了打包时的环境变量，你可以通过它们来判断当前插件是否在 k-on! 中运行。

- `process.env.KOISHI_ENV`：固定为 `browser`
- `process.env.KOISHI_BASE`：对应于插件入口文件的所在网络路径

例如，如果插件的某些配置项在 k-on! 中无效，那么你可以配合 `.hidden()` 使用：

```ts
export const Config = Schema.object({
  foo: Schema.string().default('bar')
    .hidden(process.env.KOISHI_ENV === 'browser'),
})
```

### WebAssembly

如果你的 WebAssembly 模块是以 base64 等格式内联在源码中的，那么你不需要做任何处理。

如果你的 WebAssembly 模块是以相对路径的形式加载的，那么默认情况下它并不会被打包进插件中。你需要在 `package.json` 中添加以下字段，并确保打包后的代码使用了正确的相对路径：

```json
{
  "koishi": {
    "browser": true,
    "exports": {
      "foo.wasm": "./path/to/foo.wasm"
    }
  }
}
```

### 控制台扩展

对于提供控制台扩展的文件，你可以使用以下代码：

```ts
ctx.console.addEntry(process.env.KOISHI_BASE ? [
  process.env.KOISHI_BASE + '/dist/index.js',
  process.env.KOISHI_BASE + '/dist/style.css',
] : {
  dev: resolve(__dirname, '../client/index.ts'),
  prod: resolve(__dirname, '../dist'),
})
```

同时，在插件的 `package.json` 中添加以下字段：

```json
{
  "koishi": {
    "browser": true,
    "public": [
      "dist"
    ]
  }
}
```
