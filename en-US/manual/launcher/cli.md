# Command Line Tools

For users who don't use graphical interfaces, there is a command line tool called `koi` provided by Koishi Launcher can be used to create, manage and launch koishi.

If the name of the file that you downloaded is something like `koi-xxx.appimage`, you could replace the `koi` at the following commands as the name before running the command.

| Command               | Function                             |
| --------------------- | ------------------------------------ |
| `koi run daemon`      | Launch Koishi without a daemon       |
| `koi daemon start`    | Launch the daemon                    |
| `koi daemon stop`     | Terminate the daemon                 |
| `koi daemon kill`     | Force kill the daemon                |
| `koi ps`              | Display the status                   |
| `koi start default`   | Launch the instance `default`        |
| `koi stop default`    | Terminate the instance `default`     |
| `koi restart default` | Reboot the instance `default`        |
| `koi yarn -n default` | Repair the dependencies of `default` |
