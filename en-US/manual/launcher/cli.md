# Command Line Tools

For users who don't use graphical interfaces, there is a command line tool called `koi` provided by Koishi Launcher can be used to create, manage and launch koishi.

If the name of the file that you downloaded is something like `koi-xxx.appimage`, you could replace the `koi` at the following commands as the name before running the command.

| Command               | Functions                      |
| --------------------- | ------------------------------ |
| `koi run daemon`      | 无守护启动，如果你是在面板服里创建自定义脚本的话就用这条命令 |
| `koi daemon start`    | 启动守护                           |
| `koi daemon stop`     | 停止守护                           |
| `koi daemon kill`     | 强制结束守护                         |
| `koi ps`              | 查看运行状态                         |
| `koi start default`   | 启动实例 `default`                 |
| `koi stop default`    | 停止实例 `default`                 |
| `koi restart default` | 重启实例 `default`                 |
| `koi yarn -n default` | 修复 `default` 的依赖               |
