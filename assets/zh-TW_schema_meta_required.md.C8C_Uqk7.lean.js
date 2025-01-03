import{_ as i,k as a,m as e,j as t}from"./chunks/framework.CUOHyZ0k.js";const c=JSON.parse(`{"title":"必需與可選","description":"","frontmatter":{"layout":"schema","code":"Schema.object({\\nfoo: Schema.boolean().description('这是一个可选属性。'),\\nbar: Schema.string().required().description('这是一个必需属性。'),\\n}).description('配置项')\\n"},"headers":[],"relativePath":"zh-TW/schema/meta/required.md","filePath":"zh-TW/schema/meta/required.md"}`),n={name:"zh-TW/schema/meta/required.md"};function h(p,s,l,r,k,d){return t(),a("div",null,s[0]||(s[0]=[e(`<h1 id="必需與可選" tabindex="-1">必需與可選 <a class="header-anchor" href="#必需與可選" aria-label="Permalink to &quot;必需與可選&quot;">​</a></h1><p>默认情况下，所有配置项都是可选的。你可以通过 <code>.required()</code> 来声明一个必需的配置项。未配置的必需配置项的左侧会出现红色的提示线。</p><p>请注意：对于字符串等原始类型，空串和未配置是两个不同的概念。你可以通过控件中央的水平线来进行区分。</p><div class="language-ts vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki shiki-themes github-light one-dark-pro vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">export</span><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;"> default</span><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;"> Schema</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">object</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">({</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">  foo</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;">Schema</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">boolean</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">(),</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">  bar</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;">Schema</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">string</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">().</span><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">required</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">(),</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">})</span></span></code></pre></div>`,4)]))}const B=i(n,[["render",h]]);export{c as __pageData,B as default};
