# Install and Configure Plugins

::: tip
This section will introduce the usage of "Marketplace", "Plugin Configuration" and "Dependency Management" pages.
:::

When the project is started successfully, a browser interface will be automatically opened. You can use Koishi Console to perform a series of actions, including modifying configurations, installing plugins, updating plugins and adding bots. We will show the installation and configuration of plugins with the "echo" plugin for example. The function of the "echo" plugin is to provide an "echo" command that will export the user's input as an output to the user.

## Install Plugins

::: warning
Koishi does not provide any assurance about the security of unofficial plugins. Do not download plugins from unknown sources at will, as they may cause Koishi to crash, or even more serious consequences. If you have problems after downloading plugins, you can go to the user group or forum to provide feedback. In addition, some plugins are marked as "unsafe" and install such plugins will not be supported by the official group.
:::

Go to the "Marketplace" page, where you will see all downloadable plugins here. Enter "echo" in the search box to find the plugin we want, click the "Add" button, and then click "Installation" in the popup dialog. Wait for a moment, and the plugin will be installed successfully.

![select-version](/manual/console/select-version.light.webp) {.light-only}

![select-version](/manual/console/select-version.dark.webp) {.dark-only}

## Enable and Disable Plugins

After the plugin is successfully installed, it will not be enabled immediately, and we need to configure it. Go to the "Plugin Configuration" page, where various configured plugins are listed in the left column. Among these, <span class="light-only">black</span><span class="dark-only">white</span> fonts show plugins that are running, while gray fonts show plugins that are not running yet.

![plugins](/manual/console/plugins.light.webp) {.light-only}

![plugins](/manual/console/plugins.dark.webp) {.dark-only}

We can see that the "echo" plugin is not running, and the "details" page on the right side is empty. It shows that the "echo" plugin has nothing to configure. We can directly click "Enable Plugin" in the upper right corner, then the "echo" plugin will be already running.

It is also easy to disable the "echo" plugin. Click "Disable Plugin" in the upper right corner, then the plugin will stop running. Disabling a plugin will neither delete the plugin code nor delete the plugin configuration, so you can re-enable it at any time.

## Configure Plugins

::: warning
In configuring plugins, please remember this principle: **Don't change any configuration unless necessary**. Koishi have many built-in plugins. Every plugin you see in the "Plugin Configuration" page implements some of Koishi's basic features. The "Marketplace" and "Plugin Configuration" pages that we are already using are also provided by the "market" plugin preloaded. All built-in plugins are well configured, so you don't need to modify them anymore. Changing the configuration of plugins and removing built-in plugins at will, even if add some plugins wrongly may cause Koishi to crash.
:::

While the "echo" plugin does not require configuration, more complex plugins often provide configurations that allow users to control the behavior of plugins. The picture below shows the configuration page of the "novelai" plugin.

![settings](/manual/console/settings.light.webp) {.light-only}

![settings](/manual/console/settings.dark.webp) {.dark-only}

In this page, we can see many configurations, where you need to take note of:

- Required but unfilled configurations will display a <span style="font-weight: bold; color: var(--vp-c-red-light)">red</span> tooltip on the left, and they must be filled in correctly to enable the plugin.
- Modified but unsaved configurations will display a <span style="font-weight: bold; color: var(--vp-c-brand)">purple</span> tooltip on the left, and they will be saved after you click "Enable Plugin" or "Save Configuration" button. If you want to discard these changes, you can call the menu at the small triangle next to the configuration name, select "Undo Changes" to restore the configuration to the status last saved.

## Manage Plugins

### Manage Groups

Koishi provides a function of plugin groups that allows you to place plugins into different groups for unified management. A newly created Koishi instance has already been pre-configured some groups, and newly installed plugins will be automatically added to the bottom of the plugin list without belonging to any group. 你可以在左侧栏中拖动插件，来改变插件的排列顺序或移至别的分组内部。

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
