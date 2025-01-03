import{_ as s,k as t,m as i,j as e}from"./chunks/framework.CUOHyZ0k.js";const m=JSON.parse('{"title":"发送广播 (Broadcast)","description":"","frontmatter":{},"headers":[],"relativePath":"zh-CN/plugins/common/broadcast.md","filePath":"zh-CN/plugins/common/broadcast.md"}'),o={name:"zh-CN/plugins/common/broadcast.md"};function l(c,a,d,r,n,p){return e(),t("div",null,a[0]||(a[0]=[i('<h1 id="发送广播" tabindex="-1">发送广播 (Broadcast) <a class="header-anchor" href="#发送广播" aria-label="Permalink to &quot;发送广播 (Broadcast)&quot;">​</a></h1><div class="tip custom-block"><p class="custom-block-title">TIP</p><p>要使用本插件，你需要安装数据库支持。</p></div><h2 id="指令-broadcast" tabindex="-1">指令：broadcast <a class="header-anchor" href="#指令-broadcast" aria-label="Permalink to &quot;指令：broadcast&quot;">​</a></h2><ul><li>基本语法：<code>broadcast &lt;message&gt;</code></li><li>最低权限：4</li><li>选项： <ul><li><code>-o, --only</code> 仅向当前账号负责的群进行广播</li><li><code>-f, --forced</code> 无视 silent 标签进行广播</li></ul></li></ul><p>broadcast 指令用于按照 <a href="./../../manual/usage/customize.html#受理人机制">受理人</a> 向所有机器人所负责的频道发送一段文本（默认情况下有 silent 标签的群不发送）。你可以这样调用它：</p><div class="language-sh vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki shiki-themes github-light one-dark-pro vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">broadcast</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> foo</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> bar</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> baz</span><span style="--shiki-light:#6A737D;--shiki-light-font-style:inherit;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">     # 向所有频道发送 foo bar baz</span></span></code></pre></div><p>当一个机器人账号同时向多个频道发送广播消息时，为了避免风控，Koishi 会给每条消息发送后添加一段延迟，可以通过 <a href="./../../api/core/app.html#options-delay"><code>delay.broadcast</code></a> 进行配置。</p><div class="tip custom-block"><p class="custom-block-title">TIP</p><p>broadcast 指令的 message 参数是一个 <a href="./../../manual/usage/command.html#参数和选项">变长参数</a>，因此你应该把所有的选项写到消息前面，否则会被认为是消息的一部分。</p></div>',8)]))}const k=s(o,[["render",l]]);export{m as __pageData,k as default};
