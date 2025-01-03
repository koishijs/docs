import{_ as i}from"./chunks/slash.CNtO138b.js";import{_ as a,k as t,m as n,j as h}from"./chunks/framework.CUOHyZ0k.js";const c=JSON.parse('{"title":"平台集成","description":"","frontmatter":{},"headers":[],"relativePath":"de-DE/guide/adapter/integration.md","filePath":"de-DE/guide/adapter/integration.md"}'),l={name:"de-DE/guide/adapter/integration.md"};function k(p,s,e,d,r,o){return h(),t("div",null,s[0]||(s[0]=[n('<h1 id="平台集成" tabindex="-1">平台集成 <a class="header-anchor" href="#平台集成" aria-label="Permalink to &quot;平台集成&quot;">​</a></h1><p>至此，Koishi 的适配器开发已经接近尾声。经过前面的几节内容，我们的适配器已经封装了平台接口，与服务器稳定地进行连接，并能够顺利地接受和发送消息。但除此以外，部分平台还提供了一些额外的能力，允许机器人做得更好。Koishi 当然也要把这些能力集成到机器人中。</p><h2 id="斜线指令" tabindex="-1">斜线指令 <a class="header-anchor" href="#斜线指令" aria-label="Permalink to &quot;斜线指令&quot;">​</a></h2><div class="tip custom-block"><p class="custom-block-title">TIP</p><p>相关章节：<a href="./../basic/command.html">指令开发</a></p></div><p>部分平台为机器人提供了斜线指令功能，用于在聊天框中快速输入指令。在 Discord 中差不多是这个效果：</p><p><img src="'+i+`" alt="slash command"></p><p>适配器可以通过 <code>bot.updateCommands()</code> 方法，将 Koishi 的指令注册为平台的斜线指令：</p><div class="language-ts vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki shiki-themes github-light one-dark-pro vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">class</span><span style="--shiki-light:#6F42C1;--shiki-dark:#E5C07B;"> DiscordBot</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;"> {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">  async</span><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;"> updateCommands</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#E36209;--shiki-light-font-style:inherit;--shiki-dark:#E06C75;--shiki-dark-font-style:italic;">commands</span><span style="--shiki-light:#D73A49;--shiki-dark:#ABB2BF;">:</span><span style="--shiki-light:#6F42C1;--shiki-dark:#E5C07B;"> Universal</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#E5C07B;">Command</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">[]) {</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-light-font-style:inherit;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">    // 这里忽略了部分细节，仅供参考</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">    const</span><span style="--shiki-light:#005CC5;--shiki-dark:#E5C07B;"> updates</span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;"> commands</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">map</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;">Discord</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">encodeCommand</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">)</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">    await</span><span style="--shiki-light:#005CC5;--shiki-dark:#E5C07B;"> this</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;">internal</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">bulkOverwriteGlobalApplicationCommands</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#E5C07B;">this</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">selfId</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">, </span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">updates</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">  }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">}</span></span></code></pre></div><h2 id="用户语言偏好" tabindex="-1">用户语言偏好 <a class="header-anchor" href="#用户语言偏好" aria-label="Permalink to &quot;用户语言偏好&quot;">​</a></h2><div class="tip custom-block"><p class="custom-block-title">TIP</p><p>相关章节：<a href="./../i18n/">多语言支持</a></p></div><p>部分平台本身支持多种语言。在这样的平台中，用户可以自行设置自己的语言偏好。当用户向机器人发送消息时，Koishi 就可以根据用户的语言偏好，做出相应语言的回复。</p><p>而适配器所需要做的，就只有设置 <code>session.locales</code> 属性 (以 Telegram 平台为例)：</p><div class="language-ts vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki shiki-themes github-light one-dark-pro vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">if</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;"> (</span><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;">from</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">language_code</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">) {</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-light-font-style:inherit;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">  // 这里为了简化逻辑，只取语言码的前两位</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;">  session</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">locales</span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;"> [</span><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;">from</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;">language_code</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">slice</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;">0</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;">2</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">)]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">}</span></span></code></pre></div>`,13)]))}const y=a(l,[["render",k]]);export{c as __pageData,y as default};
