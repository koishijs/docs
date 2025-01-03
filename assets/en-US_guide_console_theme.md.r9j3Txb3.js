import{_ as h,k as t,l as a,B as i,f as e,y as l,m as p,A as k,j as d}from"./chunks/framework.CUOHyZ0k.js";const F=JSON.parse('{"title":"Theme Extension 实验性","description":"","frontmatter":{},"headers":[],"relativePath":"en-US/guide/console/theme.md","filePath":"en-US/guide/console/theme.md"}'),r={name:"en-US/guide/console/theme.md"},B={id:"theme-extension",tabindex:"-1"};function o(g,s,c,y,E,C){const n=k("badge");return d(),t("div",null,[a("h1",B,[s[1]||(s[1]=i("Theme Extension ")),e(n,{type:"warning"},{default:l(()=>s[0]||(s[0]=[i("实验性")])),_:1}),s[2]||(s[2]=i()),s[3]||(s[3]=a("a",{class:"header-anchor",href:"#theme-extension","aria-label":'Permalink to "Theme Extension <badge type="warning">实验性</badge>"'},"​",-1))]),s[4]||(s[4]=p(`<p>Koishi 也允许插件定义控制台主题。让我们先从简单的色彩主题开始。</p><h2 id="色彩主题" tabindex="-1">色彩主题 <a class="header-anchor" href="#色彩主题" aria-label="Permalink to &quot;色彩主题&quot;">​</a></h2><p><a href="https://github.com/koishijs/koishi-plugin-theme-vanilla" target="_blank" rel="noreferrer">theme-vanilla</a> 插件提供了许多色彩主题，你可以参考它的源码来开发自己的主题：</p><div class="language-ts vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki shiki-themes github-light one-dark-pro vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-light-font-style:inherit;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">// 引入定义主题色的 CSS 文件</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">import</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> &#39;./index.scss&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;">ctx</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">theme</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">({</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">  id</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">&#39;coffee-dark&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">  name</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">&#39;Coffee Dark&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">})</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;">ctx</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">theme</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">({</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">  id</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">&#39;coffee-light&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">  name</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">&#39;Coffee Light&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">})</span></span></code></pre></div><p>如你所见，要定义一个色彩主题非常简单，只需要调用 <a href="./../../api/console/context.html#ctx-theme"><code>ctx.theme()</code></a> 即可。其中，<code>id</code> 用于标识主题，<code>name</code> 则会显示在主题选择器中。</p><div class="tip custom-block"><p class="custom-block-title">TIP</p><p>请注意：<code>id</code> 必须以 <code>-dark</code> 或 <code>-light</code> 结尾，否则 Koishi 将无法正确回退 CSS 变量！</p></div><p>接下来让我们看看 <code>index.scss</code> 的内容：</p><div class="language-scss vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">scss</span><pre class="shiki shiki-themes github-light one-dark-pro vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#56B6C2;">:root</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">, </span><span style="--shiki-light:#6F42C1;--shiki-dark:#D19A66;">.theme-root</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;"> {</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#E06C75;">  &amp;</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">[</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D19A66;">theme</span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">coffee-dark</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">] {</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#E06C75;">    --bg1</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;">#231F1E</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">;</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#E06C75;">    --bg2</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;">#262120</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">;</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#E06C75;">    --bg3</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;">#292423</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">;</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#E06C75;">    --bg4</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;">#342A27</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">  }</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#E06C75;">  &amp;</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">[</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D19A66;">theme</span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">coffee-light</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">] {</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#E06C75;">    --bg1</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;">#EEE9E7</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">;</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#E06C75;">    --bg2</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;">#EAE4E1</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">;</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#E06C75;">    --bg3</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;">#E6DFDC</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">;</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#E06C75;">    --bg4</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;">#E3DBD6</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">  }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">}</span></span></code></pre></div><p>Koishi 为主题系统预定义了许多 CSS 变量。只需要在属性选择器中修改这些变量的值，一个色彩主题就大功告成了。</p><h2 id="改变布局" tabindex="-1">改变布局 <a class="header-anchor" href="#改变布局" aria-label="Permalink to &quot;改变布局&quot;">​</a></h2><p>Koishi 同样允许主题改变控制台的布局：</p><div class="language-ts vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki shiki-themes github-light one-dark-pro vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;"> root</span><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;"> from</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> &#39;./root.vue&#39;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;"> layout</span><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;"> from</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> &#39;./layout.vue&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;">ctx</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">theme</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">({</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">  id</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">&#39;windows-light&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">  name</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">&#39;Windows Light&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">  components</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">: { </span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">root</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">, </span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">layout</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;"> },</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">})</span></span></code></pre></div><p>在上面的例子中，<a href="./../../api/console/context.html#ctx-theme"><code>ctx.theme()</code></a> 接受一个额外的 <code>components</code> 选项，用于覆盖默认的布局组件。其中，<code>root</code> 用于定制整个控制台的布局，<code>layout</code> 用于定制 <code>&lt;k-layout&gt;</code> 的实现。</p>`,13))])}const m=h(r,[["render",o]]);export{F as __pageData,m as default};
