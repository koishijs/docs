---
sidebarDepth: 2
noTwoslash: true
---

# 指令

pics 插件提供两个指令。其中 pic 指令的名称可以用 commandName 配置项来指定。

## 获取随机图片

```text
pic [...tags:string]
```

从各个图源中随机获取一张随机图片。图源可以用 pic.sources 查询。参数均为可选。

### 选项

- `-t, --tag <tag>` 需要查询的图片标签，逗号分隔。

### 示例

- `pic` 获取一张随机图片。
- `pic yuyuko` 获取一张 yuyuko 标签的图片。
- `pic -s yande` 获取一张 yande 图源的图片。
- `pic -s yande yuyuko saigyouji` 从 yande 图源中获取一张具有 yuyuko 以及 saigyouji 标签的图。

## 查询图源列表

```text
pic.sources [...tags]
```

图源标签可用于图片获取的图源筛选。

### 示例

- `pic.sources` 查询全部的图源。
- `pic.sources pixiv` 查询含有 pixiv 标签的图源。
