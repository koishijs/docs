# Outil de ligne de commande

对于不使用图形化界面的用户，Koishi 启动器提供了命令行工具 `koi`，可以用来创建、管理和运行 Koishi。

如果你下载得到的文件类似 `koi-xxx.appimage` 的话，直接把下面介绍的 `koi` 替换成这个文件名就可以了。

| Commande              | Fonction                    |
| --------------------- | --------------------------- |
| `koi run daemon`      | Démarrer sans démon         |
| `koi daemon start`    | Démarrer le démon           |
| `koi daemon stop`     | Arrêter le démon            |
| `koi daemon kill`     | Forcer l'arrêt du démon     |
| `koi ps`              | Vérifier l'état d'exécution |
| `koi start default`   | 启动实例 `default`              |
| `koi stop default`    | 停止实例 `default`              |
| `koi restart default` | 重启实例 `default`              |
| `koi yarn -n default` | 修复 `default` 的依赖            |
