# コマンドラインツール

グラフィカルインタフェイスを使わないユーザーに対して、Koishi ランチャーは `koi` というコマンドラインツールを提供します。`koi` は Koishi の作成、管理と実行ができます。

如果你下载得到的文件类似 `koi-xxx.appimage` 的话，直接把下面介绍的 `koi` 替换成这个文件名就可以了。

| コマンド                  | 機能               |
| --------------------- | ---------------- |
| `koi run daemon`      | デーモンを使わずに起動する    |
| `koi daemon start`    | デーモンを起動する        |
| `koi daemon stop`     | デーモンを終了する        |
| `koi daemon kill`     | デーモンを強制終了する      |
| `koi ps`              | 実行状態を確認する        |
| `koi start default`   | 启动实例 `default`   |
| `koi stop default`    | 停止实例 `default`   |
| `koi restart default` | 重启实例 `default`   |
| `koi yarn -n default` | 修复 `default` 的依赖 |
