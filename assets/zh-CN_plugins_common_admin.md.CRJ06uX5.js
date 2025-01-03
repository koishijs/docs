import{_ as o,k as d,m as l,l as s,B as a,f as t,y as n,A as r,j as h}from"./chunks/framework.CUOHyZ0k.js";const A=JSON.parse('{"title":"数据管理 (Admin)","description":"","frontmatter":{},"headers":[],"relativePath":"zh-CN/plugins/common/admin.md","filePath":"zh-CN/plugins/common/admin.md"}'),p={name:"zh-CN/plugins/common/admin.md"},c={id:"指令-user-flag",tabindex:"-1"},u={id:"指令-channel-flag",tabindex:"-1"};function k(g,i,m,f,b,y){const e=r("badge");return h(),d("div",null,[i[8]||(i[8]=l(`<h1 id="数据管理" tabindex="-1">数据管理 (Admin) <a class="header-anchor" href="#数据管理" aria-label="Permalink to &quot;数据管理 (Admin)&quot;">​</a></h1><div class="tip custom-block"><p class="custom-block-title">TIP</p><p>要使用本插件，你需要安装数据库支持。</p></div><div class="tip custom-block"><p class="custom-block-title">TIP</p><p>建议配合阅读 <a href="./../../manual/usage/customize.html#权限管理">入门 &gt; 权限管理</a> 章节。</p></div><h2 id="指令-authorize" tabindex="-1">指令：authorize <a class="header-anchor" href="#指令-authorize" aria-label="Permalink to &quot;指令：authorize&quot;">​</a></h2><ul><li>别名：auth</li><li>基本语法：<code>authorize &lt;value&gt; -u &lt;user&gt;</code></li><li>最低权限：4</li></ul><p>authorize 指令用于设置用户的权限等级。该指令 4 级权限才能调用，且需要满足目标用户的权限和要设定的权限都严格小于自己的权限等级，否则无法设置。</p><h3 id="指定用户语法" tabindex="-1">指定用户语法 <a class="header-anchor" href="#指定用户语法" aria-label="Permalink to &quot;指定用户语法&quot;">​</a></h3><p>可以通过三种方式指定用户</p><ul><li><code>@user</code>: 通过直接 @ 人的方式指定（不能是纯文本，需要用各平台的 @ 人方式）</li><li><code>@&lt;userId&gt;</code>: @ 符号后面接用户名（必须是纯文本）</li><li><code>@&lt;platform&gt;:&lt;userId&gt;</code>: @ 符号后指定具体的平台和用户名（必须是纯文本）</li></ul><p>例子</p><div class="language-sh vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki shiki-themes github-light one-dark-pro vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">authorize</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> 3</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> -u</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> @Koishi</span><span style="--shiki-light:#6A737D;--shiki-light-font-style:inherit;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">              # 通过 @ 人的方式</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">authorize</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> 3</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> -u</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> @123456789</span><span style="--shiki-light:#6A737D;--shiki-light-font-style:inherit;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">           # 通过指定用户名方式</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">authorize</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> 3</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> -u</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> @telegram:123456789</span><span style="--shiki-light:#6A737D;--shiki-light-font-style:inherit;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">    # 指定具体的平台和用户名</span></span></code></pre></div><h2 id="指令-assign" tabindex="-1">指令：assign <a class="header-anchor" href="#指令-assign" aria-label="Permalink to &quot;指令：assign&quot;">​</a></h2><ul><li>基本语法：<code>assign [bot]</code></li><li>最低权限：4</li><li>选项： <ul><li><code>-c, --channel</code> 指定目标频道（不在群组内使用时必须指定）</li><li><code>-r, --remove</code> 重置设置</li></ul></li></ul><p>assign 指令可用于设置频道的 <a href="./../../manual/usage/customize.html#受理人机制">受理人</a>。该指令 4 级权限才能调用。</p><p>如果 <code>-c [channel]</code> 缺省，则表示目标频道为当前频道（因此私聊状态下不能缺省）；如果 <code>bot</code> 缺省，则表示当前接收消息的机器人账号。举个例子，如果要设定一个频道 A 的代理者为 B，下面的两种做法是等价的：</p><ol><li>私聊机器人 B，发送 <code>assign -c #A</code></li><li>在频道 A 中发送 <code>assign @B</code>（假设 B 能收到此消息）</li></ol>`,16)),s("h2",c,[i[1]||(i[1]=a("指令：user.flag ")),t(e,{type:"danger"},{default:n(()=>i[0]||(i[0]=[a("废弃")])),_:1}),i[2]||(i[2]=a()),i[3]||(i[3]=s("a",{class:"header-anchor",href:"#指令-user-flag","aria-label":'Permalink to "指令：user.flag <badge type="danger">废弃</badge>"'},"​",-1))]),s("h2",u,[i[5]||(i[5]=a("指令：channel.flag ")),t(e,{type:"danger"},{default:n(()=>i[4]||(i[4]=[a("废弃")])),_:1}),i[6]||(i[6]=a()),i[7]||(i[7]=s("a",{class:"header-anchor",href:"#指令-channel-flag","aria-label":'Permalink to "指令：channel.flag <badge type="danger">废弃</badge>"'},"​",-1))]),i[9]||(i[9]=l("<ul><li>基本语法：<code>xxx.flag [...names]</code></li><li>选项： <ul><li><code>-l, --list</code> 标记列表</li><li><code>-s, --set</code> 添加标记（需要 4 级权限）</li><li><code>-S, --unset</code> 删除标记（需要 4 级权限）</li><li><code>-u, --user [@user]</code> 目标用户（仅限 user.flag 指令，需要 3 级权限）</li><li><code>-c, --channel [#channel]</code> 目标频道（仅限 channel.flag 指令，需要 3 级权限）</li></ul></li></ul><p>这两个指令用于查看和修改用户或频道的状态标签。如果不提供选项，则会显示当前的状态标签。如果使用了 <code>-l</code>，就会列出所有可用的状态标签。如果使用了 <code>-s</code> 或 <code>-S</code>，则会添加 / 删除 <code>names</code> 中的每一个状态标签。</p>",2))])}const x=o(p,[["render",k]]);export{A as __pageData,x as default};
