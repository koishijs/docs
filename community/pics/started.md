---
sidebarDepth: 2
noTwoslash: true
---

# 基本用法

由于 pics 仅仅是一个随机图片的插件框架，并不包含任何图源的实现，因此你必须添加至少一个图源插件才能开始使用。

## 图源插件

下面是一部分社区常用的图源插件，您可以选择喜欢的图源插件来安装。完整的列表详见[社区生态](./community.md#图源)。

- [koishi-plugin-picsource-lolicon](https://npmjs.com/package/koishi-plugin-picsource-lolicon) [Lolicon](https://api.lolicon.app/) 图源。
- [koishi-plugin-picsource-yande](https://npmjs.com/package/koishi-plugin-picsource-yande) [Yandere](https://yande.re/) 及 [Konachan](https://konachan.com) 图源。

## 插件配置

在开始启动之前，你还需要添加一些配置，告诉 pics 插件有哪些图源插件可以使用，以及每个图源插件的配置。对于配置项的详细说明，请参考[配置](./configuration.md)。

下面以 [koishi-plugin-picsource-lolicon](https://npmjs.com/package/koishi-plugin-picsource-lolicon) 和
[koishi-plugin-picsource-yande](https://npmjs.com/package/koishi-plugin-picsource-yande) 为例进行说明。您需要在 koishi.yml 中声明 pics 本身，以及每一个图源。

```yaml title=koishi.yml
plugins:
  pics:
    commandName: pic
  picsource-lolicon: # Lolicon 图源
    name: lolicon
    r18: 2
    tags:
      - anime
      - 动漫
      - 二次元
    description: 'Lolicon API 的图'
    isDefault: true
    weight: 2
  picsource-yande:yande: # Yande 图源
    name: yande
    tags:
      - anime
      - foreign
      - 动漫
      - 二次元
    weight: 1
    isDefault: true
    description: 'Yande 的图'
    endpoint: https://yande.re/post.json
    pageLimit: 200
    useOriginal: true
  picsource-yande:konachan: # Konachan 图源
    name: konachan
    tags:
      - anime
      - foreign
      - 动漫
      - 二次元
    weight: 1
    isDefault: true
    description: 'Konachan 的图'
    endpoint: https://konachan.com/post.json
    pageLimit: 270
    useOriginal: true
```

您或许可以注意到，图源插件均为可重用插件。上例中，picsource-yande 被加载了两次，分别作为 [Yande](https://yande.re) 以及 [Konachan](https://konachan.com) 的图源。这两个网站都是基于 [Danbooru](https://danbooru.donmai.us/) 的图片网站，因此插件本身是一样的。

成功完成插件配置的编写，并启动 Koishi 后，就可以使用指令 `pic` 获取一张随机图片。更多指令的配置可以参阅 [指令](./commands.md) 章节。
