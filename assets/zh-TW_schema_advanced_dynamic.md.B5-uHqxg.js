import{_ as i,k as a,m as t,j as n}from"./chunks/framework.CUOHyZ0k.js";const o=JSON.parse(`{"title":"Dynamic：动态类型","description":"","frontmatter":{"layout":"schema","code":"Schema.object({\\nvalue: Schema.union(['foo', 'bar']).description('选择一个值。'),\\n}).description('配置项')\\n"},"headers":[],"relativePath":"zh-TW/schema/advanced/dynamic.md","filePath":"zh-TW/schema/advanced/dynamic.md"}`),h={name:"zh-TW/schema/advanced/dynamic.md"};function e(l,s,k,p,d,c){return n(),a("div",null,s[0]||(s[0]=[t(`<h1 id="dynamic-动态类型" tabindex="-1">Dynamic：动态类型 <a class="header-anchor" href="#dynamic-动态类型" aria-label="Permalink to &quot;Dynamic：动态类型&quot;">​</a></h1><div class="tip custom-block"><p class="custom-block-title">TIP</p><p>此类型只能在 Koishi 中使用。</p></div><div class="warning custom-block"><p class="custom-block-title">WARNING</p><p>此特性为实验性功能，未来可能会有改动。</p></div><p><code>Schema.dynamic()</code> 用于使用动态类型。例如某个服务需要在运行时才能获取某个配置项的可能取值，而基于此服务的其他插件的配置又需要从这些值中选择一个。这个时候，实现服务的插件可以使用 <code>ctx.schema.set()</code> 来定义动态的类型，使用服务的插件则可以使用 <code>Schema.dynamic()</code> 来引用该类型。</p><div class="language-ts vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki shiki-themes github-light one-dark-pro vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-light-font-style:inherit;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">// 提供服务的插件</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-light-font-style:inherit;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">// getChoices() 返回一个数组，假设为 [&#39;foo&#39;, &#39;bar&#39;]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;">ctx</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;">schema</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">set</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">&#39;choices&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">, </span><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;">Schema</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">union</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">getChoices</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">()))</span></span></code></pre></div><div class="language-ts vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki shiki-themes github-light one-dark-pro vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-light-font-style:inherit;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">// 使用服务的插件</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">export</span><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;"> default</span><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;"> Schema</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">object</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">({</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">  value</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;">Schema</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">dynamic</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">&#39;choices&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">).</span><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">description</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">&#39;选择一个值。&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">),</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">}).</span><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">description</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">&#39;配置项&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">)</span></span></code></pre></div>`,6)]))}const y=i(h,[["render",e]]);export{o as __pageData,y as default};
