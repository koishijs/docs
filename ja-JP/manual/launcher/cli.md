# コマンドラインツール

GUI を使用しないユーザー向けに、Koishi ランチャーはコマンドラインツール `koi` を提供しています。このツールを使用して、Koishi アプリの作成、管理、および実行が可能です。

`koi-xxx.appimage` のようなファイルをダウンロードしたなら、以下の `koi` をそのファイル名に置き換えるだけでいいです。

| コマンド                  | 機能                      |
| --------------------- | ----------------------- |
| `koi run daemon`      | デーモンを使わずに起動する           |
| `koi daemon start`    | デーモンを起動する               |
| `koi daemon stop`     | デーモンを終了する               |
| `koi daemon kill`     | デーモンを強制終了する             |
| `koi ps`              | 実行状態を確認する               |
| `koi start default`   | インスタンス `default` を起動する  |
| `koi stop default`    | インスタンス `default` を終了する  |
| `koi restart default` | インスタンス `default` を再起動する |
| `koi yarn -n default` | `default` の依存関係を修正する    |
