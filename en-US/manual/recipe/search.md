# Search Marketplace

There are many plugins in the Koishi marketplace. A set of search query syntax was provided in order to make the searching experience smooth and convinient. You can enter the syntax like `is:preview` in the search box to quickly filter plugins for a category.

## Search Terms

In addition to special syntax with colon numbers, the search term you enter will be used for querying：

- Plugin name
- Plugin description
- Plugin keywords

## Plugin identification

We provide four categories of plugin identifiers, which are also filters.Including:

- `is:verified`: Official Verified (tick)
- `is:insecure`: Unsecure (exclamation mark)
- `is:preview`: Developing (wrenk)
- `created:>date`: Recently created (bud)

此外，还有一些不带标识的过滤条件：

- `is:installed`: Installed
- `is:portable`: Portable
- `updated:>date`: Recently updated

The above filters can also be reversely selected, e.g. `not:insecure` or `created:<date`.In the sidebar, you can click on the identifier to select, click twice to reverse the selection, click three times to cancel the selection.

## Plugin Categories

We currently offer 14 base categories. They are:

- `category:core`: Core features
- `category:adapter`: Adapter
- `category:storage`: Storage service
- `category:extension`: Extensions
- `category:console`: Console
- `category:manage`: Management tools
- `category:preset`: Behavior presets
- `category:image`: Image service
- `category:media`: Information service
- `category:tool`: Utils
- `category:ai`: Artificial intelligence
- `category:meme`: Fun interactives
- `category:game`: Games
- `category:gametool`: Game Support

The categories of plugins are maintained by members of the Koishi team, usually within one week after the plugin is published.Very few plugins do not belong to any category.If you think your plugin is not sorted correctly, you can submit an issue for feedback.

## Sort Plugins

Plugins in the marketplace will be sorted by default according to their ratings.Rating is a value between 0 and 5 and will show as stars after rounded.Rating is weighted by multiple indicators, with some common indicators listed below:

- Open-sourced
- Mark as insecure/preview
- Downloads of the plugin
- Size of the plugin

Beside to sort by rating, you can also choose another sorting method:

- `sort:download`: sorted by download
- `sort:created`: sorted by creation time
- `sort:updated`: sorted by update time

If you want to sort reversely, add `-asc` backwards. Such as `sort:creed-asc`.In the sidebar, you can click on the "Sort Type" to sort, click twice to reverse the sequencing, click three times to cancel the sequencing.

## Quick Experience

::: Warning
Quick experience is still experimental. It is only available in the marketplace in official documents.
:::

[Koishi Online (k-on!)](https://koishi.online) is an online Koishi runtime.You can quickly experience the functionality of the plugin without installing Koishi locally.A plugin that can used on k-on! will show a lightning button. Click it to quickly create a k-on! instance.If you are the plugin developer, you can see [this article](../../cookbook/practice/online.md) to deploy your plugin to k-on!.
