import{_ as i,k as a,m as e,j as t}from"./chunks/framework.CUOHyZ0k.js";const r=JSON.parse(`{"title":"Computed","description":"","frontmatter":{"layout":"schema","code":"Schema.object({\\nfoo: Schema.computed(Number).description('这是一个属性。'),\\n}).description('配置项')\\n"},"headers":[],"relativePath":"en-US/schema/advanced/computed.md","filePath":"en-US/schema/advanced/computed.md"}`),n={name:"en-US/schema/advanced/computed.md"};function p(h,s,l,d,k,o){return t(),a("div",null,s[0]||(s[0]=[e(`<h1 id="computed" tabindex="-1">Computed <a class="header-anchor" href="#computed" aria-label="Permalink to &quot;Computed&quot;">​</a></h1><div class="tip custom-block"><p class="custom-block-title">TIP</p><p>此类型只能在 Koishi 中使用。</p></div><p><code>Schema.computed()</code> 类型可用于合并多个类型。一种最常见的用法是将配置项分为多组显示。</p><div class="language-ts vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki shiki-themes github-light one-dark-pro vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">export</span><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;"> default</span><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;"> Schema</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">object</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">({</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">  foo</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;">Schema</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">computed</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">Number</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">),</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">}).</span><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">description</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">&#39;配置项&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">)</span></span></code></pre></div>`,4)]))}const m=i(n,[["render",p]]);export{r as __pageData,m as default};
