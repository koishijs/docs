# Install and Configure Plugins

::: tip
This section covers the usage of pages such as "Marketplace", "Plugin Configuration" and "Dependency Management".
:::

The console interface will open automatically when you install and start Koishi.You can use the console to manage your plugins and configurations.We will show installing and configuring of plugins with the [echo](../../plugins/common/echo.md) plugin. echo 插件注册了一个名为 `echo` 的指令，调用此指令可以将输入原样输出给用户。

## Install Plugins

::: warning
We Koishi team doesn't warrant the availability of third party plugins. Plugins from unknown sources may break Koishi to crash, or have very serious consequences. If you have problems after downloading plugins, you can go to the user group or forum to provide feedback. In addition, some plugins are marked as "unsafe" and install such plugins will not be supported by the official group.
:::

Go to the "Marketplace" page, where you will see all downloadable plugins here. 在搜索框中输入 `echo`，找到我们想要的插件，点击「添加」按钮，然后在弹出的对话框中点击「安装」。Wait for a moment, and the plugin will be installed successfully.

![select-version](/manual/console/select-version.light.webp) {.light-only}

![select-version](/manual/console/select-version.dark.webp) {.dark-only}

## Enable and Disable Plugins

Koishi will not enable the plugin you just installed. You need to manually configure and enable it.Go to the "Plugin Configuration" page, where various configured plugins are listed in the left column. Among these, <span class="light-only">black</span><span class="dark-only">white</span> fonts show plugins that are running, while gray fonts show plugins that are not running yet.

![plugins](/manual/console/plugins.light.webp) {.light-only}

![plugins](/manual/console/plugins.dark.webp) {.dark-only}

我们可以看到此时 echo 插件的名字是灰色的，这表明它并未处于运行状态。echo 插件没有可配置的项目，因此右侧的详情页是空白的。我们可以直接点击右上角的「启用插件」按钮，看到「启用成功」的提示信息，这表明 echo 插件就已经处于运行状态了。

It is also easy to disable the "echo" plugin. 点击右上角的「停用插件」按钮，插件便会停止运行。Disabling a plugin will neither delete the plugin code nor delete the plugin configuration, so you can re-enable it at any time.

## Plugins configurations

::: warning
在配置插件的过程中，请大家记住这个原则：**如无必要，勿动配置**。Koishi 在设计上兼顾了扩展性和实用性，许多基础功能是以预装插件的形式提供的。前面我们已经用到的「插件市场」和「插件配置」页面本身就分别由预装的 market 插件和 config 插件提供。正是因为所有的预装插件均已配置完善，通常情况下你不需要修改预装插件的配置。随意改动插件配置、删除预装插件都可能导致 Koishi 无法正常运行。
:::

While the "echo" plugin does not require configuration, more complex plugins often provide configurations that allow users to control the behavior of plugins. The picture below shows the configuration page of the "novelai" plugin.

![settings](/manual/console/settings.light.webp) {.light-only}

![settings](/manual/console/settings.dark.webp) {.dark-only}

In this page, we can see many configurations, where you need to take note of:

- Required but unfilled configurations will display a <span style="font-weight: bold; color: var(--vp-c-red-light)">red</span> tooltip on the left, and they must be filled in correctly to enable the plugin.
- Modified but unsaved configurations will display a <span style="font-weight: bold; color: var(--vp-c-brand)">purple</span> tooltip on the left, and they will be saved after you click "Enable Plugin" or "Save Configuration" button. If you want to discard these changes, you can call the menu at the small triangle next to the configuration name, select "Undo Changes" to restore the configuration to the status last saved.

## Manage Plugins

### Manage Groups

Koishi 提供了插件分组的机制，分组内可以添加插件，方便同时管理多个插件。

Koishi 在安装时预先配置了一些分组，而新安装的插件会放置在插件列表的底部，这表明它不属于任何分组。插件和分组都可以通过点选并拖拽的方式改变排列顺序或在分组之间移动。相信你也发现了，分组是可以嵌套的。

创建新的分组同样很简单。点击「全局配置」或任意分组名后，点击右上角的「创建分组」按钮可以在此创建一个新的插件分组。新分组的名字是随机生成的，但你可以点击名字修改成你喜欢的名字。分组可以在左侧栏中点击小三角来控制展开和收起。

此外，[过滤器](../usage/filter.md) 机制也可用于分组，便于控制一系列插件的行为。

### Add More Plugins

::: tip
Normally, a plugin can only run one configuration at once. Please refer to the [Maintaining Multiple Configurations](../recipe/multiple.md) section.
:::

If an installed plugin is not shown in the plugin list, you can also add it manually. In "Global Configuration" or in any group page, click the "Add Plugin" button in the top right corner will eject a dialog box. Click on the plugin to be added in the dialog box to create a plugin configuration which is not enabled.

![select-plugin](/manual/console/select-plugin.light.webp) {.light-only}

![select-plugin](/manual/console/select-plugin.dark.webp) {.dark-only}

### Remove Plugin or Group

::: warning
Warning: this action cannot be undone. If you want to restore the previous configuration, you can only manually add it again. Please be careful.
:::

Click Remove Plugin button in the top right corner in the configuration page of any plugin to remove the plugin configuration. Similarly, you can remove a plugin group by clicking "Remove Group" in the top right corner of its configuration page. When removing groups, all plugins in the group will also be deleted.

## Update and Uninstall Plugins

前往「依赖管理」页面，你可以在这里看到依赖列表。依赖可能包括 Koishi 本体，各种插件，以及支持插件运行的软件包等。

当依赖的状态显示为「可更新」时，点击其右侧的「修改」按钮，在弹出的窗口左上角选择你需要的版本，点击右下角的「更新」按钮即可完成更新。

你也可以批量更新多个插件，通过依赖名右侧的下拉菜单选择好所需更改的版本，点击右上角的「应用更改」按钮即可。此外，右上角的「全部更新」按钮可以一键更新所有依赖。

![dependencies](/manual/console/dependencies.light.webp) {.light-only}

![dependencies](/manual/console/dependencies.dark.webp) {.dark-only}
