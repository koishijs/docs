import{_ as s,k as a,m as e,j as l}from"./chunks/framework.CUOHyZ0k.js";const k=JSON.parse('{"title":"发送消息 (Echo)","description":"","frontmatter":{},"headers":[],"relativePath":"zh-CN/plugins/common/echo.md","filePath":"zh-CN/plugins/common/echo.md"}'),t={name:"zh-CN/plugins/common/echo.md"};function o(h,i,n,c,p,r){return l(),a("div",null,i[0]||(i[0]=[e(`<h1 id="发送消息" tabindex="-1">发送消息 (Echo) <a class="header-anchor" href="#发送消息" aria-label="Permalink to &quot;发送消息 (Echo)&quot;">​</a></h1><h2 id="指令-echo" tabindex="-1">指令：echo <a class="header-anchor" href="#指令-echo" aria-label="Permalink to &quot;指令：echo&quot;">​</a></h2><ul><li>基本语法：<code>echo &lt;message&gt;</code></li><li>最低权限：2</li><li>选项： <ul><li><code>-e, --escape</code> 发送转义消息 (需要 3 级权限)</li><li><code>-E, --unescape</code> 发送反转义消息 (需要 3 级权限)</li><li><code>-u, --user [user]</code> 发送到用户 (需要 3 级权限)</li><li><code>-c, --channel [channel]</code> 发送到频道 (需要 3 级权限)</li><li><code>-g, --guild [guild]</code> 指定群组编号 (需要 3 级权限)</li></ul></li></ul><p>你可以使用 echo 指令发送消息到特定的上下文：</p><div class="language-sh vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki shiki-themes github-light one-dark-pro vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#56B6C2;">echo</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> foo</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> bar</span><span style="--shiki-light:#6A737D;--shiki-light-font-style:inherit;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">              # 向当前上下文发送 foo bar</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#56B6C2;">echo</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> -u</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> @foo</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> foo</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> bar</span><span style="--shiki-light:#6A737D;--shiki-light-font-style:inherit;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">      # 向用户 foo 私聊发送 foo bar</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#56B6C2;">echo</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> -c</span><span style="--shiki-light:#6A737D;--shiki-light-font-style:inherit;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;"> #bar foo bar      # 向频道 bar 发送 foo bar</span></span></code></pre></div><div class="tip custom-block"><p class="custom-block-title">TIP</p><p>echo 指令的 message 参数是一个 <a href="./../../manual/usage/command.html#参数和选项">变长参数</a>，因此你应该把所有的选项写到消息前面，否则会被认为是消息的一部分。</p></div>`,6)]))}const g=s(t,[["render",o]]);export{k as __pageData,g as default};
