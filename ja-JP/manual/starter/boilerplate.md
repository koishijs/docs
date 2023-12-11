---
prev:
  text: インストーラーを選択
  link: /ja-JP/manual/starter/
next:
  text: プラグインのインストールと設定
  link: /ja-JP/manual/usage/market.html
---

# テンプレートプロジェクトの作成

:::tip
如果想了解其他安装方式，请移步 [选择安装方式](./index.md)。
:::

このセクションでは、最もおすすめの Koishi 開発方法であるテンプレートプロジェクトの作成について紹介します。ゼロから構築すると比べて、テンプレートプロジェクトの利点は以下のとおりです：

- 完全なコンソール機能を付いたプロジェクトであり、各種テンプレートプラグインが簡易に作成できます
- TypeScript を直接にロードできるため、コード補完や型チェックの利便性を存分に享受できます
- プラグインのホットリロードに対応しており、プラグインのコードを変更後、アプリケーションを再起動せずにリアルタイムで反映することが可能です
- 二次開発が可能であり、自分のボットと他の開発者のプラグインとの結合テストができます

もちろん、テンプレートプロジェクトはそのまま本番環境で使用することもできます。操作性がランチャーほど便利ではないかもしれませんが、より自由度が高く、ランチャーではカバーできないシナリオでもスムーズに実行できます。

## Node.js のインストール

Koishi 需要 [Node.js](https://nodejs.org/) (最低 v18，推荐使用 LTS) 运行环境，你需要自己安装它。

### インストーラーのダウンロード

首先我们前往 [Node.js](https://nodejs.org/) 的官方网站：

![home](/manual/nodejs/home-dark.webp) {.dark-only}

![home](/manual/nodejs/home-light.webp) {.light-only}

在这里可以看到两个巨大的按钮，分别对应着 **LTS (长期维护版)** 和 **Current (最新版本)**。より安定したLTSバージョンをおすすめします。ボタンをクリックしてインストーラーをダウンロードしてください。

次に、ダウンロードしたインストーラーを実行し、その指示に従ってインストールを完了させてください。

### パッケージマネージャーのインストール

Node.js 自带名为 [npm](https://www.npmjs.com/) 的包管理器，你可以直接使用它。我们同时也推荐功能更强大的 [yarn](https://classic.yarnpkg.com/) 作为包管理器。インストール方法は非常に簡単で、コマンドラインに次のコマンドを入力するだけです：

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

:::tabs code

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
这个路径不宜过长，且应当避免出现中文或者空格。我们推荐的路径如下：

- Windows：`C:\dev` 或者 `D:\dev` (也不要直接在盘根创建项目，最好是建一层目录)
- 其他操作系统：`~/dev`
  :::

以下のコマンドを入力して Koishi プロジェクトを作成します：

:::tabs code

```npm
npm init koishi@latest
```

```yarn
yarn create koishi
```

:::

指示に従って初期化プロセスを完了してください。

## アプリケーションの起動

上記の操作が正常に完了した場合、アプリケーションはすでに起動状態になり、コンソール画面が表示されています。如果你想要关闭应用，可以在命令行中按下 `Ctrl+C` 组合键。アプリケーションが停止している場合、以下のコマンドを実行して再度起動できます。

:::tabs code

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
- 如果你希望立即开始你的插件开发，请前往 [开发指南](../../guide/index.md)
