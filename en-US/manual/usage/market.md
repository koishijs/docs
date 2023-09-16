- - -
prev: text: 选择安装方式 link: /en-US/manual/starter/
- - -

# Install and Configure Plugins

::: tip
This section covers the usage of pages such as "Marketplace", "Plugin Configuration" and "Dependency Management".
:::

As the key feature, 控制台是一个对用户友好的图形界面，封装了 Koishi 的绝大多数功能：

- Running status monitoring and statistics
- Plugins configurations
- Plugin installation, updating and uninstallation
- Management of commands, database and locale text
- Chat simulation
- Log management

本节中我们将以 [echo](../../plugins/common/echo.md) 插件为例来演示插件的安装与配置。The echo plugin registered a command named `echo`. Use this command can output the input to the user originally.

## About Koishi Console

在你成功安装了模板项目或启动器后，控制台将自动打开。

In the left section of the Console UI, you can see a sidebar that is used to toggle the interfaces on the right section. The dashboard page would be shown by default. There is also a status bar which is used to show the running status of bots at the bottom when you are using a PC or a tablet.

![home](/manual/console/home.light.webp) {.light-only}

![home](/manual/console/home.dark.webp) {.dark-only}

在之后的几节里，我们会逐一介绍各界面的功能和使用。

## Install Plugins

::: warning
We Koishi team doesn't warrant the availability of third party plugins. Plugins from unknown sources may break Koishi to crash, or have very serious consequences. If you have problems after downloading plugins, you can go to the user group or forum to provide feedback. In addition, some plugins are marked as "unsafe" and install such plugins will not be supported by the official group.
:::

Go to the "Marketplace" page, where you will see all downloadable plugins here. Enter `echo` in the search box to find the plugin we want, click the "Add" button, and then click "Installation" in the popup dialog.Wait for a moment, and the plugin will be installed successfully.

![select-version](/manual/console/select-version.light.webp) {.light-only}

![select-version](/manual/console/select-version.dark.webp) {.dark-only}

## Enable and Disable Plugins

Koishi will not enable the plugin you just installed. You need to manually configure and enable it.Go to the "Plugin Configuration" page, where various configured plugins are listed in the left column. Among these, <span class="light-only">black</span><span class="dark-only">white</span> fonts show plugins that are running, while gray fonts show plugins that are not running yet.

![plugins](/manual/console/plugins.light.webp) {.light-only}

![plugins](/manual/console/plugins.dark.webp) {.dark-only}

We can see that the name of the echo plugin is grey, indicating that it is not running.The echo plugin does not have any configurable items, so the details page on the right side is empty.We can directly click on the "Enable Plugin" button in the upper right corner and see the "Enable success" reminder that the echo plugin is already running.

It is also easy to disable the "echo" plugin. Click the "Disable Plugin" button in the upper right corner, then the plugin will stop running.Disabling a plugin will neither delete the plugin code nor delete the plugin configuration, so you can re-enable it at any time.

## Plugins configurations

::: warning
When configuring plugins, please remember this principle: **Don't change any configuration unless necessary**.Koishi 在设计上兼顾了扩展性和实用性，许多基础功能是以预装插件的形式提供的。The "Marketplace" and "Plugin Configuration" pages that we are already using are also provided by the "market" plugin and the "config" plugin preloaded.It is because all preloaded plugins are well configured, so you do not usually need to modify the preloaded plugins' configuration.Changing the preloaded plugins' configuration or delete the preloaded plugins may cause Koishi to run improperly.
:::

While the "echo" plugin does not require configuration, more complex plugins often provide configurations that allow users to control the behavior of plugins. The picture below shows the configuration page of the "novelai" plugin.

![settings](/manual/console/settings.light.webp) {.light-only}

![settings](/manual/console/settings.dark.webp) {.dark-only}

In this page, we can see many configurations, where you need to take note of:

- Required but unfilled configurations will display a <span style="font-weight: bold; color: var(--vp-c-red-light)">red</span> tooltip on the left, and they must be filled in correctly to enable the plugin.
- Modified but unsaved configurations will display a <span style="font-weight: bold; color: var(--vp-c-brand)">purple</span> tooltip on the left, and they will be saved after you click "Enable Plugin" or "Save Configuration" button. If you want to discard these changes, you can call the menu at the small triangle next to the configuration name, select "Undo Changes" to restore the configuration to the status last saved.

## Manage Plugins

### Manage Groups

Koishi provides a mechanism to group the plugins. You can add plugins into the groups to manage them at a time.

Koishi pre-configured some groups during the installation, while newly installed plugins will be placed at the bottom of the plugin list, indicating that it does not belong to any group.Both plugins and groups can change the order or move between groups by clicking and dragging.Believe you also find that the groups can be nested.

Creating a new group is also simple.In "Global Configuration" or in any group page, click the "Create Group" button in the top right corner to create a new group.The name of the new group is randomly generated, but you can change it by clicking on the name to the name you like.The groups can unfold and fold by clicking on the small triangle in the left bar.

此外，[过滤器](../usage/customize.md#过滤器) 机制也可用于分组，便于控制一系列插件的行为。

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

Go to the "Dependency Management" page. You can see the dependency list here.Dependencies may include Koishi properties, various plugins, and packages that support plugins to run, etc.

当依赖的状态显示为「可更新」时，点击其右侧的「修改」按钮，在弹出的窗口左上角选择你需要的版本，点击右下角的「更新」按钮即可完成更新。

You can also update multiple plugins. Select the version you need by relying on the dropdown menu on the right side of the dependency name. Then press the "Apply changes" button in the upper right corner.In addition, the "Update All" button in the top right corner can update all dependencies versions once(you still need to click "Apply" button).

![dependencies](/manual/console/dependencies.light.webp) {.light-only}

![dependencies](/manual/console/dependencies.dark.webp) {.dark-only}
