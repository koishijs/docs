# Install and Configure Plugins

::: tip
This section covers the usage of pages such as "Marketplace", "Plugin Configuration" and "Dependency Management".
:::

When Koishi is booted up successfully, Koishi Console UI would be automatically opened in your browser. Koishi Console agilely provides abilities that you can install / update / uninstall plugins, modify configurations of plugins, and manage bot accounts etc. We will show installing and configuring of plugins with the [echo](../../plugins/common/echo.md) plugin. The "echo" plugin provides an "echo" command that will take the text that user inputs and then send it back in the same context.

## Install Plugins

::: warning
We Koishi team doesn't warrant the availability of third party plugins. Plugins from unknown sources may break Koishi to crash, or have very serious consequences. If you have problems after downloading plugins, you can go to the user group or forum to provide feedback. In addition, some plugins are marked as "unsafe" and install such plugins will not be supported by the official group.
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

## Plugins configurations

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

Koishi provides a function of plugin groups that allows you to place plugins into different groups for unified management. A newly created Koishi instance has already been pre-configured some groups, and newly installed plugins will be automatically added to the bottom of the plugin list without belonging to any group. You can drag plugins in the left column to change the sequence of plugins or move them into another group.

You can also create new groups. In "Global Configuration" or in any group page, click the "Create Group" button in the top right corner, and you will create a new plugin group. The small triangle in the left column can be used to control the expanding and collapsing of the group. You can also configure [filters](../usage/filter.md) that allow you to control the behavior of a group of plugins simultaneously.

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

Go to the "Dependency Management" page. Here you can see a list of dependencies, and you can update them here. When the status shows "Updatable", you can click the "Modify" button on the right, select the version you need in the top left corner of the popup dialog, and click "Update" in the bottom right corner to complete your update.

![dependencies](/manual/console/dependencies.light.webp) {.light-only}

![dependencies](/manual/console/dependencies.dark.webp) {.dark-only}
