---
prev:
  text: インストール方法
  link: /ja-JP/manual/starter/
next:
  text: 安装和配置插件
  link: /zh-CN/manual/usage/market.html
---

# テンプレートプロジェクトの作成

::: tip
その他のインストール方法を知りたい場合、[インストール方法](./index.md) に進んでください。
:::

このセクションでは、最もおすすめの Koishi 開発方法であるテンプレートプロジェクトの作成について紹介します。ゼロから構築すると比べて、テンプレートプロジェクトの利点は以下のとおりです：

- 完全なコンソール機能を付いたプロジェクトであり、各種テンプレートプラグインが簡易に作成できます
- TypeScript を直接にロードできるため、コード補完や型チェックの利便性を存分に享受できます
- プラグインのホットリロードに対応しており、プラグインのコードを変更後、アプリケーションを再起動せずにリアルタイムで反映することが可能です
- 二次開発が可能であり、自分のボットと他の開発者のプラグインとの結合テストができます

もちろん、テンプレートプロジェクトはそのまま本番環境で使用することもできます。操作性がランチャーほど便利ではないかもしれませんが、より自由度が高く、ランチャーではカバーできないシナリオでもスムーズに実行できます。

## Node.js のインストール

Koishi 需要 [Node.js](https://nodejs.org/) (最低 v16，推荐使用 LTS) 运行环境，你需要自己安装它。

### インストーラーのダウンロード

まず、 [Node.js](https://nodejs.org/) の公式サイトにアクセスしましょう：

![home](/manual/nodejs/home-dark.webp) {.dark-only}

![home](/manual/nodejs/home-light.webp) {.light-only}

ここには２つの大きなボタンがありますが，それぞれ **LTS(長期サポート版)** と **Current(最新版)** を意味します。より安定したLTSバージョンをおすすめします。ボタンをクリックしてインストーラーをダウンロードしてください。

次に、ダウンロードしたインストーラーを実行し、その指示に従ってインストールを完了させてください。

### パッケージマネージャーのインストール

Node.js には [npm](https://www.npmjs.com/) というパッケージマネージャーが付属しており、直接使用することができます。また、 [yarn](https://classic.yarnpkg.com/) という機能が充実したパッケージマネージャーもおすすめします。インストール方法は非常に簡単で、コマンドラインに次のコマンドを入力するだけです：

```sh
# yarn のインストール
npm i -g yarn

# バージョンの確認
yarn -v
```

::: tip
部分 Windows 用户可能会发现以下错误 ([参考链接](https://learn.microsoft.com/zh-cn/powershell/module/microsoft.powershell.core/about/about_execution_policies))：

```text
yarn：无法加载文件 yarn.ps1，因为在此系统上禁止运行脚本。
```

此时请以管理员身份重新运行终端，并输入下面的命令：

```sh
Set-ExecutionPolicy RemoteSigned
```

之后就可以正常使用 yarn 了。
:::

### ミラーサイトの設定

中国のユーザーの場合、npm や yarn からパッケージのダウンロードが遅い可能性があります。そのため、インストール速度を向上するようにミラーサイトを設定することをおすすめします。

::: tabs code
```npm
npm config set registry https://registry.npmmirror.com
```
```yarn
yarn config set registry https://registry.npmmirror.com
```
:::

## プロジェクトの作成

コマンドラインを開いて Koishi プロジェクトを作成したいディレクトリに移動します。

::: tip
このディレクトリは長くない方が良く、パスには日本語やスペースを避けてください。おすすめのディレクトリは以下のとおりです：

- Windows：`C:\dev` 或者 `D:\dev` (也不要直接在盘根创建项目，最好是建一层目录)
- その他のオペレーティングシステム：`~/dev`
:::

以下のコマンドを入力して Koishi プロジェクトを作成します：

::: tabs code
```npm
npm i -g create-koishi@latest
npm init koishi
```
```yarn
yarn create koishi
```
:::

指示に従って初期化プロセスを完了してください。

## アプリケーションの起動

上記の操作が正常に完了した場合、アプリケーションはすでに起動状態になり、コンソール画面が表示されています。アプリケーションを停止したい場合、コマンドラインで `Ctrl+C` を押します。アプリケーションが停止している場合、以下のコマンドを実行して再度起動できます。

::: tabs code
```npm
npm start
```
```yarn
yarn start
```
:::

## 次のステップ……

おめでとうございます！Koishi の基本的な使い方をマスターしましたね。次のステップ：

- 如果你希望了解 Koishi 的更多功能，请前往 [安装和配置插件](../usage/market.md)
- プラグイン開発をすぐに始めたい場合は、[開発ガイド](../../guide/index.md) に進んでください
