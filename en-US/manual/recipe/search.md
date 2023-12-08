# Search Marketplace

There are many plugins in the Koishi marketplace. A set of search query syntax was provided in order to make the searching experience smooth and convinient. You can enter the syntax like `is:preview` in the search box to quickly filter plugins for a category.

## Search Terms

In addition to special syntax with colon numbers, the search term you enter will be used for querying：

- Plugin name
- Plugin description
- Plugin keywords

## Plugin identification

We provide four categories of plugin identifiers, which are also filters.Including:

<div class="plugin-flags-list">

- <market-icon name="verified" style="color: var(--k-color-success)" />`is:verified`：官方认证
- <market-icon name="insecure" style="color: var(--k-color-danger)" />`is:insecure`：不安全
- <market-icon name="preview" style="color: var(--k-color-warning)" />`is:preview`：开发中
- <market-icon name="newborn" style="color: var(--k-color-success)" />`created:>date`：近期新增

</div>

此外，还有一些不带标识的过滤条件：

<div class="plugin-flags-list">

- <market-icon name="download" />`is:installed`：已安装
- <market-icon name="portable" />`is:portable`：快速体验
- <market-icon name="tag" />`updated:>date`：近期更新

</div>

The above filters can also be reversely selected, e.g. `not:insecure` or `created:


<date`.In the sidebar, you can click on the identifier to select, click twice to reverse the selection, click three times to cancel the selection.

## Plugin Categories

We currently offer 14 base categories. They are:

<div class="plugin-flags-list">

- <market-icon name="solid:core" />`category:core`：核心功能
- <market-icon name="solid:adapter" />`category:adapter`：适配器
- <market-icon name="solid:storage" />`category:storage`：存储服务
- <market-icon name="solid:extension" />`category:extension`：扩展功能
- <market-icon name="solid:console" />`category:console`：控制台
- <market-icon name="solid:manage" />`category:manage`：管理工具
- <market-icon name="solid:preset" />`category:preset`：行为预设
- <market-icon name="solid:image" />`category:image`：图片服务
- <market-icon name="solid:media" />`category:media`：资讯服务
- <market-icon name="solid:tool" />`category:tool`：实用工具
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

If you want to sort reversely, add `-asc` backwards. Such as `sort:creed-asc`.In the sidebar, you can click on the "Sort Type" to sort, click twice to reverse the sequencing, click three times to cancel the sequencing.

## Quick Experience

::: Warning
Quick experience is still experimental. It is only available in the marketplace in official documents.
:::

[Koishi Online (k-on!)](https://koishi.online) is an online Koishi runtime.You can quickly experience the functionality of the plugin without installing Koishi locally.A plugin that can used on k-on! will show a lightning button. Click it to quickly create a k-on! instance.If you are the plugin developer, you can see [this article](../../cookbook/practice/online.md) to deploy your plugin to k-on!.

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
