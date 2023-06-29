# 安装和配置插件

::: tip
本节将介绍「插件市场」「插件配置」和「依赖管理」页面的使用方法。
:::

当你成功安装并启动 Koishi 后，控制台界面会自动打开。你可以使用控制台修改配置、管理插件、添加机器人帐号、修改机器人行为。我们将以 [echo](../../plugins/common/echo.md) 插件为例来演示插件的安装与配置。echo 插件注册了一个名为 `echo` 的指令，调用此指令可以将输入原样输出给用户。

## 安装插件

::: warning
Koishi 不对非官方插件的安全性做任何保证。如果你不熟悉插件的运作方式，请不要随意下载和安装来源不明的插件，否则可能导致 Koishi 无法运行，或泄漏个人信息，甚至更严重的后果。如果你下载插件后遇到了问题，可以通过[用户群](../../about/contact.html#%E7%94%A8%E6%88%B7%E7%BE%A4)或[论坛](https://forum.koishi.xyz/)反馈。此外，部分插件带有「不安全」标识，用户群不会对安装此类插件后导致的问题提供支援，详见[用户群不支持的事项](https://forum.koishi.xyz/t/topic/308)。
:::

前往「插件市场」页面，你将在这里看到所有可下载的插件。在搜索框中输入 `echo`，找到我们想要的插件，点击「添加」按钮，然后在弹出的对话框中点击「安装」。等待片刻，插件就已经安装成功了。

![select-version](/manual/console/select-version.light.webp) {.light-only}

![select-version](/manual/console/select-version.dark.webp) {.dark-only}

## 启用和停用插件

Koishi 不会自动启用刚刚安装的插件，你需要手动配置并启用。前往「插件配置」页面，左侧栏中列出了已配置的各种插件。其中<span class="light-only">黑色</span><span class="dark-only">白色</span>字体显示的是正在运行的插件，而灰色字体则对应尚未运行的插件。

![plugins](/manual/console/plugins.light.webp) {.light-only}

![plugins](/manual/console/plugins.dark.webp) {.dark-only}

我们可以看到此时 echo 插件的名字是灰色的，这表明它并未处于运行状态。echo 插件没有可配置的项目，因此右侧的详情页是空白的。我们可以直接点击右上角的「启用插件」按钮，看到「启用成功」的提示信息，这表明 echo 插件就已经处于运行状态了。

要停用 echo 插件同样很简单。点击右上角的「停用插件」按钮，插件便会停止运行。停用插件既不会删除插件的代码，也不会删除插件的配置，你可以随时重新启用它。

## 配置插件

::: warning
在配置插件的过程中，请大家记住这个原则：**如无必要，勿动配置**。Koishi 在设计上兼顾了扩展性和实用性，许多基础功能是以插件的形式提供的，因此你可以看到 Koishi 预装了许多插件。前面我们已经用到的「插件市场」和「插件配置」页面本身也分别由预装的 market 插件和 config 插件提供。正是因为所有的预装插件均已配置完善，通常情况下你不需要修改预装插件的配置。随意改动插件配置、删除预装插件都可能导致 Koishi 无法正常运行。
:::

虽然 echo 插件没有需要配置的地方，但更复杂的插件则通常会提供各种配置项，允许使用者控制插件的行为。下图展示了 novelai 插件的配置界面。

![settings](/manual/console/settings.light.webp) {.light-only}

![settings](/manual/console/settings.dark.webp) {.dark-only}

在这个界面中，我们可以看到许多配置项。其中你需要注意：

- 必选但尚未填入的配置项会在左侧呈现 <span style="font-weight: bold; color: var(--vp-c-red-light)">红色</span> 的提示条，正确填写才能启动插件。
- 已修改但未保存的配置项会在左侧呈现 <span style="font-weight: bold; color: var(--vp-c-brand)">紫色</span> 的提示条，点击「启用插件」或「保存配置」按钮后会保存配置；如果你想撤销这些改动，可以在配置名称旁的小三角处呼出菜单，选择「撤销更改」使该配置恢复到上次保存时的状态。

## 管理插件

### 分组管理

Koishi 提供了插件分组的机制，分组内可以添加插件甚至嵌套分组，配合 [过滤器](../usage/filter.md) 机制可以方便地控制多个插件的行为。

Koishi 在安装时预先配置了一些分组，而新安装的插件会放置在插件列表的底部，这表明它不属于任何分组。点选并拖拽插件可以改变插件的排列顺序或移动到分组中，分组本身也支持拖拽和嵌套。

你同样可以创建新的分组。点击「全局配置」或任意分组名后，点击右上角的「创建分组」按钮可以创建一个新的插件分组。新分组的名字是随机生成的，但你可以点击名字修改成浅显易懂的词组。分组可以在左侧栏中点击小三角来控制展开和收起。

### 添加更多插件

::: tip
通常情况下，一个插件只能同时运行一份配置。请参考 [维护多份配置](../recipe/multiple.md) 章节。
:::

如果某个已安装的插件并未显示在插件列表中，你也可以手动添加它。在「全局配置」或任意分组界面中，点击右上角的「添加插件」将会弹出对话框。在对话框中点击要添加的插件，即可创建一份未启用的插件配置。

![select-plugin](/manual/console/select-plugin.light.webp) {.light-only}

![select-plugin](/manual/console/select-plugin.dark.webp) {.dark-only}

### 删除插件或分组

::: warning
注意：此操作无法被撤销，如果你想要恢复之前的配置，只能再次手动添加。请谨慎操作。
:::

在任何插件的配置界面点击右上角的「删除插件」可删除这份配置。与之类似，在分组的配置界面点击右上角的「删除分组」可删除这个分组。删除分组时，分组内的所有插件也会一并删除。

## 更新和卸载插件

前往「依赖管理」页面，你可以在这里看到依赖列表。依赖可能包括 Koishi 本体，已安装的各种插件，以及支持插件运行的软件包等。

可更新依赖的状态会显示为「可更新」，此时点击其右侧的「修改」按钮，在弹出的窗口左上角选择你需要的版本，点击右下角的「更新」按钮即可完成更新。

![dependencies](/manual/console/dependencies.light.webp) {.light-only}

![dependencies](/manual/console/dependencies.dark.webp) {.dark-only}
