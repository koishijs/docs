# Search Marketplace

Koishi enhances its features through a rich ecosystem of plugins,
and to make it easier for users to find what they need, we provide a set of search filters. You can enter commands like `is:preview` in the search field to filter plugins by category.

## Search Terms

Aside from special syntax with colons, the search terms you enter will be used to query:

- Plugin names
- Plugin descriptions
- Plugin keywords

## Plugin tags

There are 4 kinds of tags for every plugin, these tags can be also used as filters:

<div class="plugin-flags-list">

- <market-icon name="verified" style="color: var(--k-color-success)" />`is:verified`: Official Verified
- <market-icon name="insecure" style="color: var(--k-color-danger)" />`is:insecure`: Insecure
- <market-icon name="preview" style="color: var(--k-color-warning)" />`is:preview`: In Development
- <market-icon name="newborn" style="color: var(--k-color-success)" />`created:>date`: Recently Added

</div>

There are also some filters without specific tags:

<div class="plugin-flags-list">

- <market-icon name="download" />`is:installed`: Installed
- <market-icon name="portable" />`is:portable`: Quick Preview
- <market-icon name="tag" />`updated:>date`: Recently Updated

</div>

These filters can also be used in reverse, such as `not:insecure` or `created:<date`. In the sidebar, you can click on a tag name to select it, click again to reverse the selection, and click a third time to cancel the selection.

## Plugin Categories

There are currently 14 base categories:

<div class="plugin-flags-list">

- <market-icon name="solid:core" />`category:core`: Core Functionalities
- <market-icon name="solid:adapter" />`category:adapter`: Adapters
- <market-icon name="solid:general" />`category:general`: General Services
- <market-icon name="solid:extension" />`category:extension`: Extension Features
- <market-icon name="solid:webui" />`category:webui`: WebUI Plugins
- <market-icon name="solid:manage" />`category:manage`: Management Tools
- <market-icon name="solid:preset" />`category:preset`: Behavior Presets
- <market-icon name="solid:image" />`category:image`: Image Services
- <market-icon name="solid:media" />`category:media`: Media Services
- <market-icon name="solid:tool" />`category:tool`: Utilities
- <market-icon name="solid:life" />`category:life`: Lifestyle Guides
- <market-icon name="solid:ai" />`category:ai`: Artificial Intelligence
- <market-icon name="solid:meme" />`category:meme`: Interactions
- <market-icon name="solid:game" />`category:game`: Entertainment
- <market-icon name="solid:gametool" />`category:gametool`: Games Utilities

</div>

These categories are maintained by the Koishi team and are usually assigned within a week of the plugin's release.A few plugins may not fall into any category. If you believe your plugin has been misclassified, you can submit an issue to us.

## Plugin Sorting

By default, plugins in the market are sorted by their ratings, which range from 0 to 5 and are displayed as stars. The rating is calculated based on several factors, including:

- Whether the plugin is open-source
- Whether the plugin is marked as insecure or in development
- The number of downloads
- The installation size

In addition to sorting by rating, you can choose other sorting methods:

<div class="plugin-flags-list">

- <market-icon name="download" />`sort:download`: Sort by downloads
- <market-icon name="heart-pulse" />`sort:created`: Sort by creation date
- <market-icon name="tag" />`sort:updated`: Sort by recent update

</div>

To sort in reverse order, add `-asc` to the end, like `sort:created-asc`. In the sidebar, you can click a sorting option to apply it, click again to reverse the order, and click a third time to cancel the sort.

## Quick Preview

:::warning
Quick Preview is currently an experimental feature and is only available in the plugin market within the official site.
:::

[Koishi Online (k-on!)](https://koishi.online) is an online runtime for Koishi. It allows you to quickly test out several plugins without installing Koishi locally. A plugin that can used on k-on! will show a lightning button. Click it to quickly create a k-on! instance.如果你是插件开发者，可以参考 [这篇文章](../../cookbook/practice/online.md) 来将你的插件部署到 k-on!。

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
