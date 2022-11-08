# 安装和配置插件

项目启动成功后，会自动为你打开一个浏览器界面。你可以使用界面中的控制台进行一系列操作，包括修改配置、安装插件、更新插件和添加机器人等。我们将以 echo 插件为例来演示插件的安装与配置。 echo 插件的功能是提供一个 echo 指令，它会将用户的输入原样输出给用户。

## 安装和配置插件

1. 在控制台左侧点击「插件市场」，你将在这里看到所有支持当前版本的插件。这里我们找到 echo 这个插件，点击「添加」按钮，然后点击安装，插件就被加入了当前依赖。

![market](/manual/console/market_light.webp) {.light-only}

![market](/manual/console/market_dark.webp) {.dark-only}

2. 前往「依赖管理」页面，你可以在这里看到依赖列表，你可以在这里更新你的依赖，当状态显示为「可更新」时，点击右侧的「修改」按钮，在弹出的窗口左上角选择你需要的版本，点击右下角的「更新」即可完成更新。

![dependencies](/manual/console/dependencies_light.webp) {.light-only}

![dependencies](/manual/console/dependencies_dark.webp) {.dark-only}

3. 现在前往「插件配置」页面，这里有正在运行和已配置的各种插件，目前 echo 插件还未被配置和运行。点击左侧的「所有插件」，然后点击右上角的「添加插件」，这时左侧会出现「插件选择」的下拉菜单。这里我们选择 echo ，它没有可配置项所以配置页面是空的，不用担心，现在我们点击右边的「启用插件」，这时插件就被配置并启动了。

![settings](/manual/console/settings_light.webp) {.light-only}

![settings](/manual/console/settings_dark.webp) {.dark-only}

4. 在控制台的左边有一个「沙盒」，你可以在沙盒中，模拟与机器人的对话。选择沙盒并点击屏幕上方的「添加用户」来创建一个虚拟用户，这时你就可以在屏幕下方的对话框中输入聊天内容了，按回车键发送。你也可以在屏幕上方的「用户设置」中设定虚拟用户的权限等级，运行 echo 命令需要的最低权限等级为 2 。现在前往沙盒页面，试一试新添加的插件吧！

![sandbox](/manual/console/sandbox_light.webp) {.light-only}

![sandbox](/manual/console/sandbox_dark.webp) {.dark-only}
