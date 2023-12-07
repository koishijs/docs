# 搜索插件市场

Koishi 有着丰富的插件生态。为了让用户更方便地搜索插件，我们提供了一套搜索语法。你可以在搜索框中输入形如 `is:preview` 的语法来快速过滤某个类别的插件。

## 搜索词

除去含有冒号的特殊语法外，你输入的搜索词会被用于查询：

- 插件名称
- 插件描述
- 插件的关键词

## 插件标识

我们提供了四种插件标识，它们本身也是过滤条件。包括：

<div class="plugin-flags-list">

- <k-icon-official />`is:verified`：官方认证
- <k-icon-insecure />`is:insecure`：不安全
- <k-icon-develop />`is:preview`：开发中
- <k-icon-newborn />`created:>date`：近期新增

</div>

<style>
.plugin-flags-list ul {
  list-style-type: none;
  padding-left: 0.5rem;
}
.plugin-flags-list svg {
  transform: translateX(-0.5rem);
  width: 16px;
  height: 16px;
  display: inline-block;
  vertical-align: middle;
}
</style>

此外，还有一写不带标识的过滤条件：

- `is:installed`：已安装
- `is:portable`：快速体验
- `updated:>date`：近期更新

上述的过滤条件也可以反向选择，例如 `not:insecure` 或 `created:<date`。在侧边栏中，你可以点击标识名称进行选择，点击第二次反向选择，点击第三次则会取消选择。

## 插件分类

我们目前提供了 14 个基础分类。它们分别是：

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
- `category:gametool`：游戏辅助

插件的分类由 Koishi 团队成员负责维护，通常在插件发布后的一周内完成。极少数插件不会属于任何类别。如果你认为你的插件没有被正确分类，可以提交议题进行反馈。

## 插件排序

插件市场中的插件会默认根据其评分进行排序。评分是一个 0~5 之间的数值，并在四舍五入后会显示为星星的个数。评分由多个指标加权计算得到，下面列举出了一些常见的指标：

- 插件是否开源
- 插件是否被标记为不安全 / 开发中
- 插件的下载量
- 插件的安装体积

除了按照评分排序，你还可以选择其他的排序方式：

- `sort:download`：按下载量排序
- `sort:created`：按创建时间排序
- `sort:updated`：按更新时间排序

如果要反向排序，可以在后面加上 `-asc`，例如 `sort:created-asc`。在侧边栏中，你可以点击排序方式进行排序，点击第二次反向排序，点击第三次则会取消排序。

## 快速体验

::: warning
快速体验目前仍然是实验性功能，仅在官方文档中的插件市场里可用。
:::

[Koishi Online (k-on!)](https://koishi.online) 是一个在线的 Koishi 运行时。你可以在其中快速体验插件的功能，而无需在本地安装 Koishi。适配了 k-on! 的插件会显示一个闪电按钮，点击即可快速创建一个 k-on! 实例。如果你是插件开发者，可以参考 [这篇文章](../../cookbook/practice/online.md) 来将你的插件部署到 k-on!。
