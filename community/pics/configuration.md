---
sidebarDepth: 2
noTwoslash: true
---

# 配置

## 插件配置

- **commandName:** `string` 指令名称。默认 `pic`。
- **useAssets:** `boolean` [Assets](../../api/service/assets.md) 服务可用时，使用 Assets 缓存图片。默认 `true`。
- **useBase64:** `boolean` 使用 Base64 发送图片结果。默认 `false`。

## 图源插件共同配置

图源相关的配置由图源插件自行定义，各个图源的共同配置如下：

- **name:** `string` 图源名称。**必填，**但是部分插件会给定该默认值。
- **tags:** `string[]` 图源标签。
- **weight:** `number` 图源权重，越大优先级越高。
- **description:** `string` 图源的描述。
- **isDefault:** `boolean` 是否默认图源，若设置为 false 或不设置，则需要通过 `-s` 选项指定图源才能调用。
