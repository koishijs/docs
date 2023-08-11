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

- help 指令由 [help](../../plugins/common/help.md) 外掛提供，它可以顯示指令列表或具體指令的幫助資訊
- echo 指令由 [echo](../../plugins/common/echo.md) 外掛提供，它可以將使用者的輸入原樣返回

一個 Koishi 機器人的絕大部分功能都是透過指令提供給使用者的。當你安裝了更多的外掛後，你也就有了更多的指令可供使用。

## 檢視幫助

help 指令後還可以新增一個引數，用於檢視特定指令的幫助資訊：

<chat-panel>
<chat-message nickname="Alice">help echo</chat-message>
<chat-message nickname="Koishi">
<p>指令：echo &lt;message...></p>
<p>傳送訊息</p>
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
<p>顯示幫助資訊</p>
<p>可用的選項有：</p>
<p class="indent-1">-a, --authority  顯示許可權設定</p>
<p class="indent-1">-H, --show-hidden  檢視隱藏的選項和指令</p>
</chat-message>
</chat-panel>

## 引數和選項

在上面的用法中，我們接觸到了兩個新的概念：**引數 (Argument)** 和 **選項 (Option)**。

引數分為必選引數和可選引數，分別用尖括號 `<>` 和方括號 `[]` 表示。一個指令可以有任意多個引數，它們的順序是固定的，使用者必須按照指令定義的順序來輸入引數。必選引數一定出現在可選引數之前。如果使用者輸入的引數數量不足必選引數的個數，那麼外掛通常會給出錯誤提示；如果使用者輸入了額外的引數，那麼會被忽略。

例如，help 指令共有一個引數，它是可選引數，表示要檢視的指令名；echo 指令也有一個引數，它是必選引數，表示要傳送的訊息。讓我們看看如果不填必選引數會怎麼樣：

<chat-panel>
<chat-message nickname="Alice">echo</chat-message>
<chat-message nickname="Koishi">
<p>請輸入要傳送的文字。</p>
</chat-message>
</chat-panel>

選項同樣可以控制指令的行為。它通常以 `-` 或 `--` 開頭，後面不帶空格地跟著一個固定的單詞，稱為選項名稱。選項之間沒有順序要求，但通常建議將選項放在引數之前。讓我們試試看：

<chat-panel>
<chat-message nickname="Alice">echo &lt;image url="https://koishi.chat/logo.png"/&gt;</chat-message>
<chat-message nickname="Koishi">&lt;image url="https://koishi.chat/logo.png"/&gt;</chat-message>
<chat-message nickname="Alice">echo -E &lt;image url="https://koishi.chat/logo.png"/&gt;</chat-message>
<chat-message nickname="Koishi">
<img src="https://koishi.chat/logo.png" width="100"/>
</chat-message>
</chat-panel>

在上面的例子中，我們使用了 `-E` 選項，成功改變了輸出的內容。關於這具體是怎麼做到的，我們會在後續的章節中進行介紹。

引數除了可以分為必選和可選外，還可以分為定長和變長。定長引數的中不能出現空白字元，而變長引數則可以。變長引數透過引數名前後的 `...` 來指示，例如 `echo` 指令的引數就是一個變長引數。如果要為定長引數傳入帶有空白字元的內容，可以使用引號將其包裹起來，例如：

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

在這個例子中，`-s` 和 `-t` 都是帶有引數的選項。我們使用 `-t ja` 來指定目標語言為日語，源語言仍然採用了預設行為。

## 觸發字首

然而，如果僅僅透過一個詞就能觸發指令，在群聊環境下非常容易出現誤觸。為了避免這種情況，Koishi 引入了字首觸發的概念。在「全域性設定」中，我們提供了名為 `prefix` 和 `nickname` 的配置項。假如將 `prefix` 設定為 `/`，`nickname` 設定為 `四季醬`，則在群聊環境下只有以下資訊可以觸發指令呼叫：

```sh
四季醬, echo hello
@四季醬 echo hello
/echo hello
```

換句話說，一個指令能夠被觸發的實際條件為：

- 訊息以 `prefix` 開頭，後面緊跟著指令呼叫
- 訊息以 `nickname` 開頭，後面可以有逗號或空白字元，再後面是指令呼叫
- 訊息以 @機器人 開頭 (可以有多個 `@`，但至少一個是機器人賬號)，後面是指令呼叫

對於人數較多或是含有不止一個機器人的群聊，我們強烈建議每一個機器人都配置不同的觸發字首。而在私聊環境下，由於不用擔心誤觸，因此並沒有上面的限制。沒有觸發字首的指令呼叫也能被正常執行。

::: tip
**關於 `prefix` 的幾點提示：**

1. `prefix` 是一個列表，預設值為 `['']` 表示無需字首也能觸發；將列表清空會導致所有指令都無法透過 `prefix` 觸發 (但仍然可以透過私聊或 `nickname` 或 @機器人 觸發)
2. 如果你在 `prefix` 中設定了多個值，例如 `['.', '/', '']`，那麼 `.`, `/` 或無字首都能觸發指令；但由於 Koishi 是按順序匹配各個字首的，因此空串 `''` 必須寫在最後一個
3. 可以為不同的會話設定不同的 `prefix`，具體請參考 [過濾器](./filter.md) 一節
:::

## 子指令

[admin](../../plugins/common/admin.md) 外掛提供了名為 user 的指令，現在讓我們呼叫一下：

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

這裡出現了一個新的概念：子指令。子指令在呼叫上與普通的指令並沒有區別，但它們將不會顯示在 `help` 返回的全域性指令列表中，而只會顯示在父指令 `user` 的幫助資訊中。這樣設計的目的是為了避免指令列表過於冗長，同時也將指令以一種更清晰的方式進行了組織。

在上面的例子中，我們還能發現 Koishi 存在兩種不同的子指令：一種是 **層級式**，例如 `authorize`；而另一種則是 **派生式**，例如 `user.locale`。後者跟前者的區別是，它的名稱帶有父指令的名稱，以及一個小數點 `.`。在呼叫時，我們也需要加上這個小數點：

<chat-panel>
<chat-message nickname="Alice">user.locale en</chat-message>
<chat-message nickname="Koishi">User data updated.</chat-message>
</chat-panel>

如果父指令本身沒有功能，那麼 `user` 和 `user -h` 的效果是一樣的。此時，我們也可以使用空格代替小數點進行派生式子指令的呼叫：

<chat-panel>
<chat-message nickname="Alice">user locale zh
</chat-message>
<chat-message nickname="Koishi">使用者資料已修改。</chat-message>
</chat-panel>

熟悉 Git 的使用者可能會發現，這種設計正是借鑑了 Git 的二級指令：當一個指令的功能過於複雜時，我們可以將其拆分為多個子指令，從而使得指令的功能更加清晰。

::: tip
至於 user.locale 是幹什麼的，想必大家也已經猜出來了。我們留到 [國際化](./i18n.md) 一節再詳細介紹。
:::

## 指令管理

開啟控制檯，我們會在活動欄中找到名為「指令管理」的頁面。你可以在這裡檢視當前所有指令的列表，並對指令的行為進行設定。

### 設定別名

點進任意指令的詳情頁，首先就能看到「名稱設定」，這裡展示了指令的全部別名。每個別名都能被用來觸發指令，而第一個別名則會作為預設名稱顯示在幫助中。

你可以在這裡新增或刪除別名，也可以將任意別名設定為預設的顯示名稱。例如，在 `echo` 指令中點選「新增別名」，輸入 `復讀`，然後點選「設為預設」，這樣一來，使用者在幫助中看到的就是 `復讀` 而不是 `echo` 了。

### 新增子指令

在左側欄中，你可以將任何指令 (派生式指令除外) 拖至其他指令的下方，這將使得前者成為後者的子指令。例如，我们可以将 [`bind`](../../plugins/common/bind.md) 指令设置为 `user` 指令的子指令，因为这属于用户管理的一部分。

點選右上角的加號按鈕，我們可以建立一個新指令。這個新指令自然是沒有行為的，它的主要目的是作為其他指令的父指令，已獲得更好的展示效果。對於透過此方法建立的新指令，我們可以透過點選右上角的垃圾桶按鈕將其移除。

### 許可權管理

在「名稱設定」下方還有更多的配置項，我們可以在這裡進一步配置指令對使用者的訪問許可權。例如，將 echo 指令的 `authority` 設定為 `2`，那麼將只有 2 級以上許可權的使用者才能呼叫該指令。

我們甚至還可以單獨設定每一個指令選項的許可權等級。例如，我們可以單獨給 `-E, --unescape` 選項設定 `authority` 為 3。這樣一來，只有 3 級以上許可權的使用者才能使用 `echo -E` 的功能。

關於使用者許可權，請參考 [許可權管理](./permission.md) 一節。
