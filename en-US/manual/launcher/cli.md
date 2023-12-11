# command line tool

对于不使用图形化界面的用户，Koishi 启动器提供了命令行工具 `koi`，可以用来创建、管理和运行 Koishi。

如果你下载得到的文件类似 `koi-xxx.appimage` 的话，直接把下面介绍的 `koi` 替换成这个文件名就可以了。

| Command               | 功能                             |
| --------------------- | ------------------------------ |
| `koi run daemon`      | 无守护启动，如果你是在面板服里创建自定义脚本的话就用这条命令 |
| `koi daemon start`    | 启动守护                           |
| `koi daemon stop`     | 停止守护                           |
| `koi daemon kill`     | 强制结束守护                         |
| `koi ps`              | Display the status             |
| `koi start default`   | 启动实例 `default`                 |
| `koi stop default`    | 停止实例 `default`                 |
| `koi restart default` | 重启实例 `default`                 |
| `koi yarn -n default` | 修复 `default` 的依赖               |
