# 指令系統

在瞭解了控制檯的基本用法後，我們終於可以開始介紹如何與機器人對話了！讓我們從上一節中看到的例子開始：

<chat-panel>
<chat-message nickname="Alice">help</chat-message>
<chat-message nickname="Koishi">
<p>當前可用的指令有：</p>
<p class="indent-1">echo  傳送訊息</p>
<p class="indent-1">help  顯示幫助資訊</p>
<p>輸入“幫助 指令名”檢視特定指令的語法和使用示例。</p>
</chat-message>
</chat-panel>

這裡的輸出與兩個外掛有關：

- help 指令由 [help](../../plugins/common/help.md) 插件提供，它可以显示指令列表或具体指令的帮助信息
- echo 指令由 [echo](../../plugins/common/echo.md) 插件提供，它可以将用户的输入原样返回

一個 Koishi 機器人的絕大部分功能都是透過指令提供給使用者的。當你安裝了更多的外掛後，你也就有了更多的指令可供使用。

## 檢視幫助

help 指令後還可以新增一個引數，用於檢視特定指令的幫助資訊：

<chat-panel>
<chat-message nickname="Alice">help echo</chat-message>
<chat-message nickname="Koishi">
<p>指令：echo &lt;message...></p>
<p>發送消息</p>
<p>可用的選項有：</p>
<p class="indent-1">-e, --escape  傳送轉義訊息</p>
<p class="indent-1">-E, --unescape  傳送反轉義訊息</p>
</chat-message>
</chat-panel>

那麼細心的小夥伴可能會發現，既然 help 本身也是一個指令，那我能不能用來檢視 help 自己的幫助資訊呢？答案是肯定的：

<chat-panel>
<chat-message nickname="Alice">help help</chat-message>
<chat-message nickname="Koishi">
<p>指令：help [command]</p>
<p>顯示幫助信息</p>
<p>可用的選項有：</p>
<p class="indent-1">-a, --authority  顯示許可權設定</p>
<p class="indent-1">-H, --show-hidden  檢視隱藏的選項和指令</p>
</chat-message>
</chat-panel>

## 引數和選項

在上面的用法中，我们接触到了两个新的概念：**参数 (Argument)** 和 **选项 (Option)**。

参数分为必选参数和可选参数，分别用尖括号 `<>` 和方括号 `[]` 表示。一個指令可以有任意多個引數，它們的順序是固定的，使用者必須按照指令定義的順序來輸入引數。必選引數一定出現在可選引數之前。如果使用者輸入的引數數量不足必選引數的個數，那麼外掛通常會給出錯誤提示；如果使用者輸入了額外的引數，那麼會被忽略。

例如，help 指令共有一個引數，它是可選引數，表示要檢視的指令名；echo 指令也有一個引數，它是必選引數，表示要傳送的訊息。讓我們看看如果不填必選引數會怎麼樣：

<chat-panel>
<chat-message nickname="Alice">echo</chat-message>
<chat-message nickname="Koishi">
<p>請輸入要發送的文本。</p>
</chat-message>
</chat-panel>

選項同樣可以控制指令的行為。它通常以 `-` 或 `--` 开头，后面不带空格地跟着一个固定的单词，称为选项名称。選項之間沒有順序要求，但通常建議將選項放在引數之前。讓我們試試看：

<chat-panel>
<chat-message nickname="Alice">echo &lt;image url="https://koishi.chat/logo.png"/&gt;</chat-message>
<chat-message nickname="Koishi">&lt;image url="https://koishi.chat/logo.png"/&gt;</chat-message>
<chat-message nickname="Alice">echo -E &lt;image url="https://koishi.chat/logo.png"/&gt;</chat-message>
<chat-message nickname="Koishi">
<img src="https://koishi.chat/logo.png" width="100"/>
</chat-message>
</chat-panel>

在上面的例子中，我们使用了 `-E` 选项，成功改变了输出的内容。關於這具體是怎麼做到的，我們會在後續的章節中進行介紹。

引數除了可以分為必選和可選外，還可以分為定長和變長。定長引數的中不能出現空白字元，而變長引數則可以。变长参数通过参数名前后的 `...` 来指示，例如 `echo` 指令的参数就是一个变长参数。如果要為定長引數傳入帶有空白字元的內容，可以使用引號將其包裹起來，例如：

<chat-panel>
<chat-message nickname="Alice">help "foo bar"</chat-message>
</chat-panel>

此外，部分選項也可以接受引數。例如，當你安裝了翻譯外掛，你將會獲得如下的幫助資訊：

<chat-panel>
<chat-message nickname="Alice">help translate</chat-message>
<chat-message nickname="Koishi">
<p>指令：translate &lt;text...></p>
<p>文本翻譯</p>
<p>可用的選項有：</p>
<p class="indent-1">-s, --source &lt;lang> 源語言 (預設為自動匹配)</p>
<p class="indent-1">-t, --target &lt;lang> 目標語言 (預設為中文)</p>
</chat-message>
<chat-message nickname="Alice">translate -t ja 你好，世界</chat-message>
<chat-message nickname="Koishi">こんにちは世界</chat-message>
</chat-panel>

在这个例子中，`-s` 和 `-t` 都是带有参数的选项。我们使用 `-t ja` 来指定目标语言为日语，源语言仍然采用了默认行为。

## 觸發字首

然而，如果僅僅透過一個詞就能觸發指令，在群聊環境下非常容易出現誤觸。為了避免這種情況，Koishi 引入了字首觸發的概念。在「全局设置」中，我们提供了名为 `prefix` 和 `nickname` 的配置项。假如将 `prefix` 设置为 `/`，`nickname` 设置为 `四季酱`，则在群聊环境下只有以下信息可以触发指令调用：

```sh
四季醬, echo hello
@四季醬 echo hello
/echo hello
```

換句話說，一個指令能夠被觸發的實際條件為：

- 消息以 `prefix` 开头，后面紧跟着指令调用
- 消息以 `nickname` 开头，后面可以有逗号或空白字符，再后面是指令调用
- 消息以 @机器人 开头 (可以有多个 `@`，但至少一个是机器人账号)，后面是指令调用

對於人數較多或是含有不止一個機器人的群聊，我們強烈建議每一個機器人都配置不同的觸發字首。而在私聊環境下，由於不用擔心誤觸，因此並沒有上面的限制。沒有觸發字首的指令呼叫也能被正常執行。

::: tip
**关于 `prefix` 的几点提示：**

1. `prefix` 是一个列表，默认值为 `['']` 表示无需前缀也能触发；将列表清空会导致所有指令都无法通过 `prefix` 触发 (但仍然可以通过私聊或 `nickname` 或 @机器人 触发)
2. 如果你在 `prefix` 中设置了多个值，例如 `['.', '/', '']`，那么 `.`, `/` 或无前缀都能触发指令；但由于 Koishi 是按顺序匹配各个前缀的，因此空串 `''` 必须写在最后一个
3. 可以为不同的会话设置不同的 `prefix`，具体请参考 [过滤器](./customize.md#过滤器) 一节
   :::

## 子指令

[admin](../../plugins/common/admin.md) 插件提供了名为 user 的指令，现在让我们调用一下：

<chat-panel>
<chat-message nickname="Alice">user</chat-message>
<chat-message nickname="Koishi">
<p>指令：user</p>
<p>使用者管理</p>
<p>可用的子指令有：</p>
<p class="indent-1">authorize  許可權管理</p>
<p class="indent-1">user.locale  語言偏好</p>
</chat-message>
</chat-panel>

這裡出現了一個新的概念：子指令。子指令在调用上与普通的指令并没有区别，但它们将不会显示在 `help` 返回的全局指令列表中，而只会显示在父指令 `user` 的帮助信息中。這樣設計的目的是為了避免指令列表過於冗長，同時也將指令以一種更清晰的方式進行了組織。

在上面的例子中，我们还能发现 Koishi 存在两种不同的子指令：一种是 **层级式**，例如 `authorize`；而另一种则是 **派生式**，例如 `user.locale`。后者跟前者的区别是，它的名称带有父指令的名称，以及一个小数点 `.`。在呼叫時，我們也需要加上這個小數點：

<chat-panel>
<chat-message nickname="Alice">user.locale en</chat-message>
<chat-message nickname="Koishi">User data updated.</chat-message>
</chat-panel>

如果父指令本身没有功能，那么 `user` 和 `user -h` 的效果是一样的。此時，我們也可以使用空格代替小數點進行派生式子指令的呼叫：

<chat-panel>
<chat-message nickname="Alice">user locale zh
</chat-message>
<chat-message nickname="Koishi">使用者數據已修改。</chat-message>
</chat-panel>

熟悉 Git 的使用者可能會發現，這種設計正是借鑑了 Git 的二級指令：當一個指令的功能過於複雜時，我們可以將其拆分為多個子指令，從而使得指令的功能更加清晰。

:::tip
至于 user.locale 是干什么的，想必大家也已经猜出来了。我们留到 [国际化](./customize.md#国际化) 一节再详细介绍。
:::

## 指令管理

開啟控制檯，我們會在活動欄中找到名為「指令管理」的頁面。你可以在這裡檢視當前所有指令的列表，並對指令的行為進行設定。

### 設定別名

點進任意指令的詳情頁，首先就能看到「名稱設定」，這裡展示了指令的全部別名。每個別名都能被用來觸發指令，而第一個別名則會作為預設名稱顯示在幫助中。

你可以在這裡新增或刪除別名，也可以將任意別名設定為預設的顯示名稱。例如，在 `echo` 指令中点击「添加别名」，输入 `复读`，然后点击「设为默认」，这样一来，用户在帮助中看到的就是 `复读` 而不是 `echo` 了。

### 新增子指令

在左側欄中，你可以將任何指令 (派生式指令除外) 拖至其他指令的下方，這將使得前者成為後者的子指令。例如，我们可以将 [`bind`](../../plugins/common/bind.md) 指令设置为 `user` 指令的子指令，因为这属于用户管理的一部分。

點選右上角的加號按鈕，我們可以建立一個新指令。這個新指令自然是沒有行為的，它的主要目的是作為其他指令的父指令，已獲得更好的展示效果。對於透過此方法建立的新指令，我們可以透過點選右上角的垃圾桶按鈕將其移除。

### 許可權管理

在「名稱設定」下方還有更多的配置項，我們可以在這裡進一步配置指令對使用者的訪問許可權。例如，将 echo 指令的 `authority` 设置为 `2`，那么将只有 2 级以上权限的用户才能调用该指令。

我們甚至還可以單獨設定每一個指令選項的許可權等級。例如，我们可以单独给 `-E, --unescape` 选项设置 `authority` 为 3。这样一来，只有 3 级以上权限的用户才能使用 `echo -E` 的功能。

关于用户权限，请参考 [权限管理](./customize.md#权限管理) 一节。
