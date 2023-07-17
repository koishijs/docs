# Search Marketplace

There are many plugins in the Koishi marketplace. A set of search query syntax was provided in order to make the searching experience smooth and convinient. 你可以在搜索框中输入形如 `is:preview` 的语法来快速过滤某个类别的插件。

## Search Terms

In addition to special syntax with colon numbers, the search term you enter will be used for querying：

- Plugin name
- Plugin description
- Plugin keywords

## Plugin identification

我们提供了四种插件标识，它们本身也是过滤条件。包括：

- `is:verified`：官方认证 (对钩)
- `is:insecure`：不安全 (叹号)
- `is:preview`：开发中 (扳手)
- `created:>date`：近期新增 (树苗)

此外，还有一写不带标识的过滤条件：

- `is:installed`: installed
- `is:portable`：快速体验
- `updated:>date`: recently updated

上述的过滤条件也可以反向选择，例如 `not:insecure` 或 `created:<date`。在侧边栏中，你可以点击标识名称进行选择，点击第二次反向选择，点击第三次则会取消选择。

## Plugin Categories

We currently offer 14 base categories. They are:

- `category:core`：核心功能
- `category:adapter`：适配器
- `category:storage`：存储服务
- `category:extension`：扩展功能
- `category:console`：控制台
- `category:manage`：管理工具
- `category:preset`：行为预设
- `category:image`：图片服务
- `category:media`：资讯服务
- `category:tool`：实用工具
- `category:ai`：人工智能
- `category:meme`：趣味交互
- `category:game`：娱乐玩法
- `category:gametool`：游戏工具

插件的分类由 Koishi 团队成员负责维护，通常在插件发布后的一周内完成。极少数插件不会属于任何类别。如果你认为你的插件没有被正确分类，可以提交议题进行反馈。

## Sort Plugins

插件市场中的插件会默认根据其评分进行排序。评分是一个 0~5 之间的数值，并在四舍五入后会显示为星星的个数。评分由多个指标加权计算得到，下面列举出了一些常见的指标：

- 插件是否开源
- Mark as insecure/preview
- Downloads of the plugin
- Size of the plugin

除了按照评分排序，你还可以选择其他的排序方式：

- `sort:download`: sorted by download
- `sort:created`: sorted by creation time
- `sort:updated`: sorted by update time

如果要反向排序，可以在后面加上 `-asc`，例如 `sort:created-asc`。在侧边栏中，你可以点击排序方式进行排序，点击第二次反向排序，点击第三次则会取消排序。

## 快速体验

::: warning
快速体验目前仍然是实验性功能，仅在官方文档中的插件市场里可用。
:::

[Koishi Online (k-on!)](https://koishi.online) 是一个在线的 Koishi 运行时。你可以在其中快速体验插件的功能，而无需在本地安装 Koishi。适配了 k-on! 的插件会显示一个闪电按钮，点击即可快速创建一个 k-on! 实例。如果你是插件开发者，可以参考 [这篇文章](../../cookbook/online.md) 来将你的插件部署到 k-on!。
