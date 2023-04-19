# Install and Configure Plugins

::: tip
This section will introduce the use method of "Marketplace", "Plugin Configurations" and "Dependency Management" pages.
:::

When the project is started successfully, a browser interface will be automatically opened. You can use the console in the interface to perform a series of actions, including modifying configurations, installing plugins, updating plugins and adding bots. We will show the installation and configuration of plugins with the "echo" plugin for example. The function of the "echo" plugin is to provide an "echo" command that will export the user's input as an output to the user.

## Install Plugins

::: warning
Koishi does not provide any assurance about the security of unofficial plugins. Do not download plugins from unknown sources at will, as they may cause Koishi unable to run, or even more serious consequences. If you have problems after downloading plugins, you can go to the user group or forum to provide feedback. In addition, some plugins are marked as "unsafe" and install such plugins will not be supported by the official group.
:::

Go to the "Marketplace" page, where you will see all downloadable plugins here. Enter "echo" in the search box to find the plugin we want, click the "Add" button, and then click "Installation" in the popup dialog. Wait for a moment, and the plugin will be installed successfully.

![select-version](/manual/console/select-version.light.webp) {.light-only}

![select-version](/manual/console/select-version.dark.webp) {.dark-only}

## Enable and Disable Plugins

After the plugin is successfully installed, it will not be enabled immediately, and we need to configure it. Go to the "Plugin Configurations" page, where various configured plugins are listed in the left column. Among these, <span class="light-only">black</span><span class="dark-only">white</span>fonts show plugins that are running, while grey fonts show plugins that are not running yet.

![plugins](/manual/console/plugins.light.webp) {.light-only}

![plugins](/manual/console/plugins.dark.webp) {.dark-only}

我们可以看到此时 echo 插件确实并未运行，并且右侧的详情页也一片空白。这说明 echo 插件并没有什么需要配置的地方。我们可以直接点击右上角的「启用插件」，这样 echo 插件就已经处于运行状态了。

要停用 echo 插件同样很简单。点击右上角的「停用插件」，插件变会停止运行。停用插件既不会删除插件的代码，也不会删除插件的配置，你可以随时重新启用它。

## Configure Plugins

::: warning
在配置插件的过程中，请大家记住这个原则：**如果没有必要，那么不要改动任何配置**。Koishi 预装了许多插件，你在插件配置页面中看到的每一个插件都实现了 Koishi 的一部分基础功能。包括我们已经用到的「插件市场」和「插件配置」页面本身也是由预装的 market 插件来提供的。所有的预装插件均已配置完善，你不需要对它们进行任何修改。随意改动插件配置、删除预装插件都可能导致 Koishi 无法正常运行 (甚至错误地添加了某些插件也会导致 Koishi 无法运行)。
:::

虽然 echo 插件没有需要配置的地方，但更复杂的插件则通常会提供各种配置项，允许使用者控制插件的行为。下图展示了 novelai 插件的配置界面。

![settings](/manual/console/settings.light.webp) {.light-only}

![settings](/manual/console/settings.dark.webp) {.dark-only}

在这个界面中，我们可以看到许多配置项。其中你需要注意：

- 必选但尚未填入的配置项会在左侧呈现 <span style="font-weight: bold; color: var(--vp-c-red-light)">红色</span> 的提示条，它们必须被正确填写才能启动插件
- 已修改但未保存的配置项会在左侧呈现 <span style="font-weight: bold; color: var(--vp-c-brand)">紫色</span> 的提示条，它们会在你点击「启用插件」或「保存配置」按钮后保存；如果你想放弃这些改动，可以在配置名称旁的小三角处呼出菜单，选择「撤销更改」来使该配置恢复到上次保存时的状态

## Manage Plugins

### Manage Groups

Koishi 提供了插件分组的机制，允许你将插件放入不同的分组统一管理。一个刚刚创建好的 Koishi 实例已经预先配置了一些分组，而新安装的插件将自动添加到插件列表的底部，不属于任何分组。你可以将在左侧栏中拖动插件，改变插件的排列顺序或移至别的分组内部。

你同样可以创建新的分组。在「全局配置」或任意分组界面中，点击右上角的「创建分组」按钮，你将创建一个新的插件分组。分组可以在左侧栏中点击小三角来控制展开和收起，还可以配置 [过滤器](../usage/filter.md)，你由此得以获得了同时控制一组插件行为的能力。

### Add more Plugins

::: tip
通常情况下，一个插件只能同时运行一份配置。请参考 [维护多份配置](../recipe/multiple.md) 章节。
:::

如果某个已安装的插件并未显示在插件列表中，你也可以手动添加它。在「全局配置」或任意分组界面中，点击右上角的「添加插件」将会弹出对话框。在对话框中点击要添加的插件，即可创建一份未启用的插件配置。

![select-plugin](/manual/console/select-plugin.light.webp) {.light-only}

![select-plugin](/manual/console/select-plugin.dark.webp) {.dark-only}

### Remove Plugin or Group

::: warning
注意：此操作无法被撤销，如果你想要恢复之前的配置，只能再次手动添加。请谨慎操作。
:::

在任何插件的配置界面点击右上角的「删除插件」可删除这份配置。与之类似，在分组的配置界面点击右上角的「删除分组」可删除这个分组。删除分组时，分组内的所有插件也会一并删除。

## Update and Uninstall Plugins

前往「依赖管理」页面，你可以在这里看到依赖列表，你可以在这里更新你的依赖，当状态显示为「可更新」时，点击右侧的「修改」按钮，在弹出的窗口左上角选择你需要的版本，点击右下角的「更新」即可完成更新。

![dependencies](/manual/console/dependencies.light.webp) {.light-only}

![dependencies](/manual/console/dependencies.dark.webp) {.dark-only}
