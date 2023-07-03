# コマンドラインツール

グラフィックインターフェース以外に、Koishi デスクトップは Koishi の作成、管理と実行ができるコマンドラインツール `koi` も提供しています。

`koi-xxx.appimage` のようなファイルをダウンロードしましたら、以下のコマンドの `koi` の部分をファイル名に読み替えてください。

| コマンド                  | 機能                     |
| --------------------- | ---------------------- |
| `koi run daemon`      | デーモンを使わずに起動する          |
| `koi daemon start`    | デーモンを起動する              |
| `koi daemon stop`     | デーモンを終了する              |
| `koi daemon kill`     | デーモンを強制終了する            |
| `koi ps`              | 実行状態を確認する              |
| `koi start default`   | `default` インスタンスを起動する  |
| `koi stop default`    | `default` インスタンスを終了する  |
| `koi restart default` | `default` インスタンスを再起動する |
| `koi yarn -n default` | `default` のパッケージを修復する  |
