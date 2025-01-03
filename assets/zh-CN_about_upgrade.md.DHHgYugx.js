import{_ as o,k as d,l as e,B as s,f as l,y as t,m as n,A as p,j as h}from"./chunks/framework.CUOHyZ0k.js";const I=JSON.parse('{"title":"从低版本迁移","description":"","frontmatter":{},"headers":[],"relativePath":"zh-CN/about/upgrade.md","filePath":"zh-CN/about/upgrade.md"}'),r={name:"zh-CN/about/upgrade.md"},k={id:"jsx-支持",tabindex:"-1"},g={id:"心跳更新",tabindex:"-1"},u={id:"cli-更新",tabindex:"-1"},B={id:"hmr-更新",tabindex:"-1"},y={id:"插件市场更新",tabindex:"-1"},c={id:"国际化更新",tabindex:"-1"},m={id:"协议更新",tabindex:"-1"},C={id:"协议更新-1",tabindex:"-1"},b={id:"server-插件独立",tabindex:"-1"},A={id:"消息元素更新",tabindex:"-1"},f={id:"http-插件独立",tabindex:"-1"},v={id:"tsconfig-更新",tabindex:"-1"};function E(F,i,D,x,P,j){const a=p("badge");return h(),d("div",null,[i[49]||(i[49]=e("h1",{id:"从低版本迁移",tabindex:"-1"},[s("从低版本迁移 "),e("a",{class:"header-anchor",href:"#从低版本迁移","aria-label":'Permalink to "从低版本迁移"'},"​")],-1)),e("h2",k,[i[1]||(i[1]=s("JSX 支持 ")),l(a,null,{default:t(()=>i[0]||(i[0]=[s("v4.10.3")])),_:1}),i[2]||(i[2]=s()),i[3]||(i[3]=e("a",{class:"header-anchor",href:"#jsx-支持","aria-label":'Permalink to "JSX 支持 <badge>v4.10.3</badge>"'},"​",-1))]),i[50]||(i[50]=n(`<p>在 4.10.3 版本中，我们正式引入了 JSX 支持。这意味着你可以在插件中使用 JSX 语法来构造消息元素了。要实现这一点，你需要对你的项目进行一些配置：</p><ol><li>打开 <code>tsconfig.base.json</code> 文件并加入以下配置：</li></ol><div class="language-json vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki shiki-themes github-light one-dark-pro vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">{</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#E06C75;">  &quot;compilerOptions&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">: {</span></span>
<span class="line highlighted"><span style="--shiki-light:#005CC5;--shiki-dark:#E06C75;">    &quot;jsx&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">&quot;react-jsx&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">,</span></span>
<span class="line highlighted"><span style="--shiki-light:#005CC5;--shiki-dark:#E06C75;">    &quot;jsxImportSource&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">&quot;@satorijs/element&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">  },</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">}</span></span></code></pre></div><ol start="2"><li>将要使用 JSX 的文件后缀名修改为 <code>.tsx</code>。</li></ol>`,4)),e("h2",g,[i[5]||(i[5]=s("心跳更新 ")),l(a,null,{default:t(()=>i[4]||(i[4]=[s("v4.10.4")])),_:1}),i[6]||(i[6]=s()),i[7]||(i[7]=e("a",{class:"header-anchor",href:"#心跳更新","aria-label":'Permalink to "心跳更新 <badge>v4.10.4</badge>"'},"​",-1))]),i[51]||(i[51]=n("<p>在 4.10.4 版本中，我们调整了默认的心跳行为，这可能导致老用户升级时遭遇无限重启问题。可以执行下列操作进行升级：</p><ol><li>先将 market 插件更新到最新版本 (最新版本支持批量更新)</li><li>(非 v4.10.3 用户忽略此步骤) 在控制台中修改全局设置，将 <code>heartbeatInterval</code> 项的值改为 <code>6000</code>，<code>heartbeatTimeout</code> 项的值改为 <code>600000</code>，并点击「重载配置」按钮</li><li>在依赖管理中，通过下拉菜单将全部官方依赖修改为最新版本 (如果有 suggest 和 assets-* 依赖则选择移除)，并点击「应用更改」按钮</li><li>更新完成后重启实例</li><li>在控制台中修改全局设置，将 <code>heartbeatInterval</code> 和 <code>heartbeatTimeout</code> 项的值均改为 <code>0</code>，并点击「重载配置」按钮</li><li>再次重启实例</li><li>如果之前移除了 assets-* 插件，请重新前往插件市场进行安装</li></ol>",2)),e("h2",u,[i[9]||(i[9]=s("CLI 更新 ")),l(a,null,{default:t(()=>i[8]||(i[8]=[s("v4.11.0")])),_:1}),i[10]||(i[10]=s()),i[11]||(i[11]=e("a",{class:"header-anchor",href:"#cli-更新","aria-label":'Permalink to "CLI 更新 <badge>v4.11.0</badge>"'},"​",-1))]),i[52]||(i[52]=e("p",null,"在 4.11.0 版本中我们移除了 @koishijs/cli 包，将其合并到了 koishi 中。这意味着你每次升级时不再需要同时升级两边了。但对于已经安装了 @koishijs/cli 的用户，你需要执行下列操作完成升级：",-1)),i[53]||(i[53]=e("ol",null,[e("li",null,"先完成 4.10.4 版本的更新，确保自己的版本号不小于 4.10.4"),e("li",null,"在依赖管理中，修改 koishi 的版本号到 4.11.0，并移除 @koishijs/cli"),e("li",null,"点击「应用更改」按钮")],-1)),e("h2",B,[i[13]||(i[13]=s("HMR 更新 ")),l(a,null,{default:t(()=>i[12]||(i[12]=[s("v4.12.0")])),_:1}),i[14]||(i[14]=s()),i[15]||(i[15]=e("a",{class:"header-anchor",href:"#hmr-更新","aria-label":'Permalink to "HMR 更新 <badge>v4.12.0</badge>"'},"​",-1))]),i[54]||(i[54]=n('<p>在 4.12.0 版本中，我们将模块热替换相关功能移至专门的插件 @koishijs/plugin-hmr 中。如果你使用了 hmr 插件，你需要执行下列操作完成升级：</p><ol><li>安装最新版本的 @koishijs/plugin-hmr</li><li>修改你的配置文件，加上 <a href="./../guide/develop/script.html#hmr">模块热替换</a> 中提到的部分</li><li>移除 <code>package.json</code> 文件中 <code>scripts.dev</code> 的 <code>--watch</code> 参数</li></ol>',2)),e("h2",y,[i[17]||(i[17]=s("插件市场更新 ")),l(a,null,{default:t(()=>i[16]||(i[16]=[s("v4.13.0")])),_:1}),i[18]||(i[18]=s()),i[19]||(i[19]=e("a",{class:"header-anchor",href:"#插件市场更新","aria-label":'Permalink to "插件市场更新 <badge>v4.13.0</badge>"'},"​",-1))]),i[55]||(i[55]=n(`<p>在 4.13.0 版本中，我们将 @koishijs/plugin-market 插件分拆为了两个插件 market 和 config。其中 market 负责「插件市场」和「依赖管理」页面，而 config 则负责「插件配置」页面。直接将 market 插件更新到 2.0.0 或以上版本的用户会发现自己的「插件配置」页面消失，此时你需要执行下列操作完成升级：</p><ol><li>首先确保你的 market 插件是最新版 (应该是 2.0.0 以上版本)</li><li>打开「插件市场」页面，安装最新版的 config 插件</li><li>打开「资源管理器」页面，找到 <code>koishi.yml</code> 文件，打开并编辑：</li></ol><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light one-dark-pro vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#E06C75;">host</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;">127.0.0.1</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#E06C75;">port</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;">5140</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#E06C75;">maxPort</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;">5149</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#E06C75;">plugins</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">:</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;">  ...</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;">    ...</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#E06C75;">    config</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">: {}         </span><span style="--shiki-light:#6A737D;--shiki-light-font-style:inherit;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;"># 加一行在这里，注意左侧缩进与 market 对齐</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#E06C75;">    market</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">:</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;">      ...</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;">    ...</span></span></code></pre></div><ol start="4"><li>点击右上角的保存按钮</li><li>重新启动 Koishi 实例</li></ol>`,4)),e("h2",c,[i[21]||(i[21]=s("国际化更新 ")),l(a,null,{default:t(()=>i[20]||(i[20]=[s("v4.13.0")])),_:1}),i[22]||(i[22]=s()),i[23]||(i[23]=e("a",{class:"header-anchor",href:"#国际化更新","aria-label":'Permalink to "国际化更新 <badge>v4.13.0</badge>"'},"​",-1))]),i[56]||(i[56]=n("<p>在 4.13.0 版本中，我们也引入了多语言的回退机制。这意味者，所有涉及语言配置的地方都需要从单一的语言字符串修改为数组。具体包括以下几个地方：</p><ul><li>应用配置项 <code>locale</code> → <code>i18n.locales</code></li><li>用户和频道的数据结构 <code>locale</code> → <code>locales</code></li><li>会话对象的属性 <code>locale</code> → <code>locales</code></li></ul><p>用户无需留意这些改动，但开发者如果使用了上述 API 则需要进行迁移。</p>",3)),e("h2",m,[i[25]||(i[25]=s("协议更新 ")),l(a,null,{default:t(()=>i[24]||(i[24]=[s("v4.14.5")])),_:1}),i[26]||(i[26]=s()),i[27]||(i[27]=e("a",{class:"header-anchor",href:"#协议更新","aria-label":'Permalink to "协议更新 <badge>v4.14.5</badge>"'},"​",-1))]),i[57]||(i[57]=n(`<p>在 4.14.5 版本中，我们将协议库 Satori 升级到了 v3 alpha 版本。新版本引入了与分页 API 相关的不兼容更新。具体受影响的 API 如下：</p><ul><li><code>bot.getChannelList()</code></li><li><code>bot.getFriendList()</code></li><li><code>bot.getGuildList()</code></li><li><code>bot.getGuildMemberList()</code></li><li><code>bot.getGuildRoleList()</code></li><li><code>bot.getMessageList()</code></li><li><code>bot.getReactionList()</code></li></ul><p>上述 API 将不再返回 <code>Promise&lt;T[]&gt;</code> 而是返回一个 <code>Promise&lt;List&lt;T&gt;&gt;</code>，包含 <code>data</code> 属性和可选的 <code>next</code> 属性。<code>data</code> 包含了当前页的数据，<code>next</code> 则表示下一页的分页令牌。此外，对于上述每一个 API，我们还额外提供了返回异步迭代器的版本：</p><div class="language-ts vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki shiki-themes github-light one-dark-pro vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">for</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;"> (</span><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#E5C07B;"> item</span><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;"> of</span><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;"> await</span><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;"> bot</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">getChannelList</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">())  </span><span style="--shiki-light:#6A737D;--shiki-light-font-style:inherit;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">// old</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">for</span><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;"> await</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;"> (</span><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#E5C07B;"> item</span><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;"> of</span><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;"> bot</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">getChannelIter</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">())  </span><span style="--shiki-light:#6A737D;--shiki-light-font-style:inherit;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">// new</span></span></code></pre></div>`,4)),e("h2",C,[i[29]||(i[29]=s("协议更新 ")),l(a,null,{default:t(()=>i[28]||(i[28]=[s("v4.15.0")])),_:1}),i[30]||(i[30]=s()),i[31]||(i[31]=e("a",{class:"header-anchor",href:"#协议更新-1","aria-label":'Permalink to "协议更新 <badge>v4.15.0</badge>"'},"​",-1))]),i[58]||(i[58]=n('<p>在 4.15.0 版本中，我们将协议库 Satori 升级到了 v3 正式版本。新版本引入了一系列涉及平台资源不兼容更新。</p><p><a href="./../api/resources/user.html"><code>User</code></a> 类型的 <code>userId</code> 属性改为 <code>id</code>，同理对于 <a href="./../api/resources/channel.html"><code>Channel</code></a>, <a href="./../api/resources/guild.html"><code>Guild</code></a>, <a href="./../api/resources/message.html"><code>Message</code></a> 也是如此。此外，<code>Author</code> 被重构为了 <code>User</code> 和 <code>Member</code> 两个部分。</p><p><a href="./../api/core/session.html"><code>Session</code></a> 引入了 <code>event</code> 属性用于存放所有事件相关的资源。尽管我们在会话中提供了 <a href="./../api/core/session.html#accessor-property">访问器属性</a> 以保证了大部分 API 的向下兼容，但对于没有提供访问器的事件属性，或是在使用 Bot API 的返回值时，你都需要手动修改代码。</p><p><code>Adapter.Server</code> 和 <code>Adapter.Client</code> 两个基类被移除。现在可以直接使用 <a href="./../api/core/adapter.html"><code>Adapter</code></a> 基类，并通过 <code>reusable</code> 属性决定其是否可重用。</p><p><a href="./../api/core/bot.html"><code>Bot</code></a> 将实现 <a href="./../api/resources/login.html"><code>Login</code></a> 资源，因此其上的用户数据将存放在 <code>bot.user</code> 中。此外，<a href="./../api/resources/login.html"><code>status</code></a> 属性由字符串变为数值枚举。</p><p><a href="./../api/message/encoder.html#encoder-results"><code>encoder.results</code></a> 的类型由 <code>string[]</code> 变为 <code>Message[]</code>。</p><p>新增用于创建私聊频道的 <a href="./../api/resources/channel.html"><code>bot.createDirectChannel()</code></a>，因此不再需要实现 <a href="./../api/resources/message.html#bot-sendprivatemessage"><code>bot.sendPrivateMessage()</code></a>。</p>',7)),e("h2",b,[i[33]||(i[33]=s("Server 插件独立 ")),l(a,null,{default:t(()=>i[32]||(i[32]=[s("v4.16.0")])),_:1}),i[34]||(i[34]=s()),i[35]||(i[35]=e("a",{class:"header-anchor",href:"#server-插件独立","aria-label":'Permalink to "Server 插件独立 <badge>v4.16.0</badge>"'},"​",-1))]),i[59]||(i[59]=n('<p>在 4.16.0 版本中，我们将 <code>Server</code> 服务从 Koishi 中分离出来，独立成了 <a href="./../plugins/develop/server.html">@koishijs/plugin-server</a> 插件。Koishi CLI 提供了自动迁移机制，因此任何使用 CLI 启动 Koishi 的用户无需进行任何操作。</p><p>如果你是将 Koishi 作为依赖调用的进阶开发者，你需要执行下列操作完成升级：</p><ol><li>安装最新版本的 <a href="./../plugins/develop/server.html">@koishijs/plugin-server</a> 插件；</li><li>在你的代码中手动导入并加载该插件；</li><li>将你过去的 <code>host</code>, <code>port</code>, <code>maxPort</code>, <code>selfUrl</code> 全局设置移动至 server 插件的配置项。</li></ol>',3)),e("h2",A,[i[37]||(i[37]=s("消息元素更新 ")),l(a,null,{default:t(()=>i[36]||(i[36]=[s("v4.16.4")])),_:1}),i[38]||(i[38]=s()),i[39]||(i[39]=e("a",{class:"header-anchor",href:"#消息元素更新","aria-label":'Permalink to "消息元素更新 <badge>v4.16.4</badge>"'},"​",-1))]),i[60]||(i[60]=n(`<p>在 4.16.4 版本中，我们将 Koishi 内部的消息元素实现与 Satori 协议规范进行了对齐。涉及到以下 API 的变动：</p><ul><li><code>&lt;image&gt;</code> 元素更名为 <code>&lt;img&gt;</code></li><li><code>&lt;img&gt;</code>, <code>&lt;audio&gt;</code>, <code>&lt;video&gt;</code>, <code>&lt;file&gt;</code> 元素的 <code>url</code> 属性改为 <code>src</code></li></ul><p>如果你的插件用到了相关的特性，请参考下面的迁移指南：</p><ul><li>如果你的插件<strong>发送</strong>了上述消息元素，你不需要进行任何修改 <ul><li>官方适配器插件 (和积极维护的社区适配器插件) 都进行了向下兼容</li><li>如果你使用了非官方的适配器并发现升级后无法发送图片，请联系适配器作者进行更新</li></ul></li><li>如果你的插件<strong>接收并解析</strong>了上述消息元素，你可能需要调整你的解析逻辑 <ul><li>要从给定的消息中提取图片，可以使用 <a href="./../api/message/api.html#h-select"><code>h.select()</code></a> 方法</li><li>如果你的指令接受图片作为参数，可以直接使用 <a href="./../guide/basic/command.html#argument-type"><code>image</code></a> 参数类型</li></ul></li></ul><p>对于适配器作者，请参考下面的迁移指南：</p><ul><li>接收侧 (<code>Adapter</code>)：请确保创建的会话中的消息元素均符合最新标准</li><li>发送侧 (<code>MessageEncoder</code>)：请尽量同时支持新旧标准，例如使用以下代码：</li></ul><div class="language-ts vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki shiki-themes github-light one-dark-pro vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">if</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;"> (</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">type</span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;"> ===</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> &#39;image&#39;</span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;"> ||</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;"> type</span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;"> ===</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> &#39;img&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">) {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">  await</span><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;"> sendImage</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;">attrs</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">src</span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;"> ||</span><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;"> attrs</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">url</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">}</span></span></code></pre></div>`,7)),e("h2",f,[i[41]||(i[41]=s("HTTP 插件独立 ")),l(a,null,{default:t(()=>i[40]||(i[40]=[s("v4.17.6")])),_:1}),i[42]||(i[42]=s()),i[43]||(i[43]=e("a",{class:"header-anchor",href:"#http-插件独立","aria-label":'Permalink to "HTTP 插件独立 <badge>v4.17.6</badge>"'},"​",-1))]),i[61]||(i[61]=n('<p>在 4.17.6 版本中，我们将 HTTP 服务从 Koishi 中分离出来，独立成了 <a href="./../plugins/develop/http.html">@koishijs/plugin-http</a> 插件。Koishi CLI 提供了自动迁移机制，因此任何使用 CLI 启动 Koishi 的用户无需进行任何操作。</p><p>如果你是将 Koishi 作为依赖调用的进阶开发者，你需要执行下列操作完成升级：</p><ol><li>安装最新版本的 <a href="./../plugins/develop/http.html">@koishijs/plugin-http</a> 插件；</li><li>(可选，如果你使用网络代理工具) 安装最新版本的 <a href="./../plugins/develop/proxy-agent.html">@koishijs/plugin-proxy-agent</a> 插件；</li><li>在你的代码中手动导入并加载这两个插件；</li><li>将你过去的 <code>request</code> 全局设置移动至 http 插件的配置项；</li><li>(可选) 将你过去的 <code>request.proxyAgent</code> 全局设置移动至 proxy-agent 插件的配置项。</li></ol>',3)),e("h2",v,[i[45]||(i[45]=e("code",null,"tsconfig",-1)),i[46]||(i[46]=s(" 更新 ")),l(a,null,{default:t(()=>i[44]||(i[44]=[s("v4.17.8")])),_:1}),i[47]||(i[47]=s()),i[48]||(i[48]=e("a",{class:"header-anchor",href:"#tsconfig-更新","aria-label":'Permalink to "`tsconfig` 更新 <badge>v4.17.8</badge>"'},"​",-1))]),i[62]||(i[62]=n(`<p>在 4.17.8 版本中，由于部分依赖的更新，我们对推荐的 <code>tsconfig.json</code> 配置进行了调整。如果你的项目使用了 TypeScript，并且在升级后发现无法通过编译，你可以打开 <code>tsconfig.json</code> 文件，并尝试执行下列修改以完成升级：</p><ol><li>将 <code>module</code> 属性改为 <code>esnext</code>；</li><li>将 <code>moduleResolution</code> 属性改为 <code>bundler</code>；</li><li>将 <code>emitDeclarationOnly</code> 属性改为 <code>true</code> (或者添加这个属性)。</li></ol><div class="language-json vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki shiki-themes github-light one-dark-pro vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">{</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#E06C75;">  &quot;compilerOptions&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">: {</span></span>
<span class="line highlighted"><span style="--shiki-light:#005CC5;--shiki-dark:#E06C75;">    &quot;module&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">&quot;esnext&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">,</span></span>
<span class="line highlighted"><span style="--shiki-light:#005CC5;--shiki-dark:#E06C75;">    &quot;moduleResolution&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">&quot;bundler&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">,</span></span>
<span class="line highlighted"><span style="--shiki-light:#005CC5;--shiki-dark:#E06C75;">    &quot;emitDeclarationOnly&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;">true</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">  },</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">}</span></span></code></pre></div><p>注意，如果你的项目中存在多个 <code>tsconfig.json</code> 文件，你需要对每一个文件都进行上述修改 (通过 <code>extends</code> 继承其他文件中配置的除外)。</p>`,4))])}const S=o(r,[["render",E]]);export{I as __pageData,S as default};
