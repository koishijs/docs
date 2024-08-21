# Search Marketplace

There are many plugins in the Koishi marketplace.
A set of search query syntax was provided in order to make the searching experience smooth and convenient.
You can filter a certain category of plugins by using the filter syntax like `is:preview`.

## Search Terms

In addition to special syntax with colon numbers, the search term you enter will be used for querying：

- Plugin name
- Plugin description
- Plugin keywords

## Plugin identification

We provide four categories of plugin identifiers, which are also filters.Including:

<div class="plugin-flags-list">

- <market-icon name="verified" style="color: var(--k-color-success)" />`is:verified`: Official Verified
- <market-icon name="insecure" style="color: var(--k-color-danger)" />`is:insecure`: Insecure
- <market-icon name="preview" style="color: var(--k-color-warning)" />`is:preview`: In Development
- <market-icon name="newborn" style="color: var(--k-color-success)" />`created:>date`: Recently Added

</div>

Also, there are some filters without icons:

<div class="plugin-flags-list">

- <market-icon name="download" />`is:installed`: Installed
- <market-icon name="portable" />`is:portable`: Quick Preview
- <market-icon name="tag" />`updated:>date`: Recently Updated

</div>

You can also use the opposite condition for these filters, such as `not:insecure` or `created:<date`. In the sidebar, you can click on the identifier to select, click twice to reverse the selection, click three times to cancel the selection.

## Plugin Categories

There are currently 14 categories of plugins:

<div class="plugin-flags-list">

- <market-icon name="solid:core" />`category:core`: Core Features
- <market-icon name="solid:adapter" />`category:adapter`: Adapters
- <market-icon name="solid:general" />`category:general`: Storage Services
- <market-icon name="solid:extension" />`category:extension`: Extension Features
- <market-icon name="solid:webui" />`category:webui`: WebUI Plugins
- <market-icon name="solid:manage" />`category:manage`：管理工具
- <market-icon name="solid:preset" />`category:preset`：行为预设
- <market-icon name="solid:image" />`category:image`：图片服务
- <market-icon name="solid:media" />`category:media`：资讯服务
- <market-icon name="solid:tool" />`category:tool`：实用工具
- <market-icon name="solid:life" />`category:life`：生活指南
- <market-icon name="solid:ai" />`category:ai`：人工智能
- <market-icon name="solid:meme" />`category:meme`：趣味交互
- <market-icon name="solid:game" />`category:game`：娱乐玩法
- <market-icon name="solid:gametool" />`category:gametool`：游戏辅助

</div>

The categories of plugins are maintained by members of the Koishi team, usually within one week after the plugin is published.Very few plugins do not belong to any category.If you think your plugin is not sorted correctly, you can submit an issue for feedback.

## Sort Plugins

Plugins in the marketplace will be sorted by default according to their ratings.Rating is a value between 0 and 5 and will show as stars after rounded.Rating is weighted by multiple indicators, with some common indicators listed below:

- Open-sourced
- Mark as insecure/preview
- Downloads of the plugin
- Size of the plugin

Beside to sort by rating, you can also choose another sorting method:

<div class="plugin-flags-list">

- <market-icon name="download" />`sort:download`：按下载量排序
- <market-icon name="heart-pulse" />`sort:created`：按创建时间排序
- <market-icon name="tag" />`sort:updated`：按更新时间排序

</div>

如果要反向排序，可以在后面加上 `-asc`，例如 `sort:created-asc`。In the sidebar, you can click on the "Sort Type" to sort, click twice to reverse the sequencing, click three times to cancel the sequencing.

## Instant Preview

:::warning
快速体验目前仍然是实验性功能，仅在官方文档中的插件市场里可用。
:::

[Koishi Online (k-on!)](https://koishi.online) 是一个在线的 Koishi 运行时。You can quickly experience the functionality of the plugin without installing Koishi locally.A plugin that can used on k-on! will show a lightning button. Click it to quickly create a k-on! instance.如果你是插件开发者，可以参考 [这篇文章](../../cookbook/practice/online.md) 来将你的插件部署到 k-on!。

<script lang="ts" setup>
import { MarketIcon } from '@koishijs/market'
</script>

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
