import{_ as r,k as g,l as i,B as a,f as l,y as t,m as h,A as e,j as o}from"./chunks/framework.CUOHyZ0k.js";const f=JSON.parse('{"title":"消息元素","description":"","frontmatter":{},"headers":[],"relativePath":"fr-FR/guide/basic/element.md","filePath":"fr-FR/guide/basic/element.md"}'),y={name:"fr-FR/guide/basic/element.md"},B={id:"消息组件",tabindex:"-1"};function F(c,s,E,A,C,u){const p=e("tab-select"),n=e("chat-message"),k=e("chat-panel"),d=e("badge");return o(),g("div",null,[s[16]||(s[16]=i("h1",{id:"消息元素",tabindex:"-1"},[a("消息元素 "),i("a",{class:"header-anchor",href:"#消息元素","aria-label":'Permalink to "消息元素"'},"​")],-1)),s[17]||(s[17]=i("p",null,[a("当然，一个聊天平台所能发送或接收的内容往往不只有纯文本。为此，我们引入了 "),i("strong",null,"消息元素 (Element)"),a(" 的概念。")],-1)),s[18]||(s[18]=i("p",null,"消息元素类似于 HTML 元素，它是组成消息的基本单位。一个元素可以表示具有特定语义的内容，如文本、表情、图片、引用、元信息等。Koishi 会将这些元素转换为平台所支持的格式，以便在不同平台之间发送和接收消息。",-1)),s[19]||(s[19]=i("h2",{id:"基本用法",tabindex:"-1"},[a("基本用法 "),i("a",{class:"header-anchor",href:"#基本用法","aria-label":'Permalink to "基本用法"'},"​")],-1)),s[20]||(s[20]=i("p",null,"一个典型的元素包含名称、属性和内容。在 Koishi 中，我们通常使用 JSX 或 API 的方式创建元素。下面是一些例子：",-1)),l(p,{class:"code"},{"title-tsx":t(()=>s[0]||(s[0]=[a("JSX")])),"tab-tsx":t(()=>s[1]||(s[1]=[i("div",{class:"language-tsx vp-adaptive-theme"},[i("button",{title:"Copy Code",class:"copy"}),i("span",{class:"lang"},"JSX"),i("pre",{class:"shiki shiki-themes github-light one-dark-pro vp-code",tabindex:"0"},[i("code",null,[i("span",{class:"line"},[i("span",{style:{"--shiki-light":"#6A737D","--shiki-light-font-style":"inherit","--shiki-dark":"#7F848E","--shiki-dark-font-style":"italic"}},"// 欢迎 @用户名 入群！")]),a(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E5C07B"}},"session"),i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#ABB2BF"}},"."),i("span",{style:{"--shiki-light":"#6F42C1","--shiki-dark":"#61AFEF"}},"send"),i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#ABB2BF"}},"(<>欢迎 <"),i("span",{style:{"--shiki-light":"#22863A","--shiki-dark":"#E06C75"}},"at"),i("span",{style:{"--shiki-light":"#6F42C1","--shiki-light-font-style":"inherit","--shiki-dark":"#D19A66","--shiki-dark-font-style":"italic"}}," id"),i("span",{style:{"--shiki-light":"#D73A49","--shiki-dark":"#56B6C2"}},"="),i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#C678DD"}},"{"),i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E06C75"}},"userId"),i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#C678DD"}},"}"),i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#ABB2BF"}},"/> 入群！</>)")]),a(`
`),i("span",{class:"line"}),a(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-light":"#6A737D","--shiki-light-font-style":"inherit","--shiki-dark":"#7F848E","--shiki-dark-font-style":"italic"}},"// 发送一张 Koishi 图标")]),a(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E5C07B"}},"session"),i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#ABB2BF"}},"."),i("span",{style:{"--shiki-light":"#6F42C1","--shiki-dark":"#61AFEF"}},"send"),i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#ABB2BF"}},"(<"),i("span",{style:{"--shiki-light":"#22863A","--shiki-dark":"#E06C75"}},"image"),i("span",{style:{"--shiki-light":"#6F42C1","--shiki-light-font-style":"inherit","--shiki-dark":"#D19A66","--shiki-dark-font-style":"italic"}}," url"),i("span",{style:{"--shiki-light":"#D73A49","--shiki-dark":"#56B6C2"}},"="),i("span",{style:{"--shiki-light":"#032F62","--shiki-dark":"#98C379"}},'"https://koishi.chat/logo.png"'),i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#ABB2BF"}},"/>)")])])])],-1)])),"title-ts":t(()=>s[2]||(s[2]=[a("API")])),"tab-ts":t(()=>s[3]||(s[3]=[i("div",{class:"language-ts vp-adaptive-theme"},[i("button",{title:"Copy Code",class:"copy"}),i("span",{class:"lang"},"API"),i("pre",{class:"shiki shiki-themes github-light one-dark-pro vp-code",tabindex:"0"},[i("code",null,[i("span",{class:"line"},[i("span",{style:{"--shiki-light":"#6A737D","--shiki-light-font-style":"inherit","--shiki-dark":"#7F848E","--shiki-dark-font-style":"italic"}},"// 欢迎 @用户名 入群！")]),a(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E5C07B"}},"session"),i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#ABB2BF"}},"."),i("span",{style:{"--shiki-light":"#6F42C1","--shiki-dark":"#61AFEF"}},"send"),i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#ABB2BF"}},"("),i("span",{style:{"--shiki-light":"#032F62","--shiki-dark":"#98C379"}},"'欢迎 '"),i("span",{style:{"--shiki-light":"#D73A49","--shiki-dark":"#56B6C2"}}," +"),i("span",{style:{"--shiki-light":"#6F42C1","--shiki-dark":"#61AFEF"}}," h"),i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#ABB2BF"}},"("),i("span",{style:{"--shiki-light":"#032F62","--shiki-dark":"#98C379"}},"'at'"),i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#ABB2BF"}},", { "),i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E06C75"}},"id"),i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#ABB2BF"}},": "),i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E5C07B"}},"session"),i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#ABB2BF"}},"."),i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E06C75"}},"userId"),i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#ABB2BF"}}," }) "),i("span",{style:{"--shiki-light":"#D73A49","--shiki-dark":"#56B6C2"}},"+"),i("span",{style:{"--shiki-light":"#032F62","--shiki-dark":"#98C379"}}," ' 入群！'"),i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#ABB2BF"}},")")]),a(`
`),i("span",{class:"line"}),a(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-light":"#6A737D","--shiki-light-font-style":"inherit","--shiki-dark":"#7F848E","--shiki-dark-font-style":"italic"}},"// 发送一张 Koishi 图标")]),a(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E5C07B"}},"session"),i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#ABB2BF"}},"."),i("span",{style:{"--shiki-light":"#6F42C1","--shiki-dark":"#61AFEF"}},"send"),i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#ABB2BF"}},"("),i("span",{style:{"--shiki-light":"#6F42C1","--shiki-dark":"#61AFEF"}},"h"),i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#ABB2BF"}},"("),i("span",{style:{"--shiki-light":"#032F62","--shiki-dark":"#98C379"}},"'image'"),i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#ABB2BF"}},", { "),i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E06C75"}},"url"),i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#ABB2BF"}},": "),i("span",{style:{"--shiki-light":"#032F62","--shiki-dark":"#98C379"}},"'https://koishi.chat/logo.png'"),i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#ABB2BF"}}," }))")])])])],-1)])),_:1}),s[21]||(s[21]=h(`<p>这两种写法各有优劣，不同人可能会有不同的偏好。但无论哪一种写法都表达了同样的意思。</p><h3 id="使用-jsx" tabindex="-1">使用 JSX <a class="header-anchor" href="#使用-jsx" aria-label="Permalink to &quot;使用 JSX&quot;">​</a></h3><p>学习 JSX 的写法需要你有一定的 HTML 基础 (如果有 React 基础将更好，尽管这不是必需的)。如果你不熟悉 HTML，可以参考 <a href="https://developer.mozilla.org/zh-CN/docs/Glossary/Element" target="_blank" rel="noreferrer">这篇文档</a>。</p><p>如果你已经学习过 HTML 的相关知识，你唯一额外需要了解的事情就是我们使用单花括号 <code>{}</code> 进行插值。你可以在单花括号中使用任何 JavaScript 表达式，它们会在运算完成后成为元素的一部分。此外，我们还为消息元素编写了完整的 <a href="./../../api/message/syntax.html">语法规范</a>，供你参考。</p><h3 id="使用-api" tabindex="-1">使用 API <a class="header-anchor" href="#使用-api" aria-label="Permalink to &quot;使用 API&quot;">​</a></h3><p>对于更喜欢原生 JavaScript 的人，我们也提供了 API 的方式来创建元素。Koishi 提供一个 <code>h</code> 函数，它有着灵活的使用方式：</p><div class="language-ts vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki shiki-themes github-light one-dark-pro vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-light-font-style:inherit;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">// 第一个参数是元素名称 (必选)</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">h</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">&#39;message&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">)</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-light-font-style:inherit;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">// 你可以传入一个由属性构成的对象作为第二个参数</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">h</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">&#39;quote&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">, { </span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">id</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;"> })</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-light-font-style:inherit;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">// 后续参数是元素的内容，可以是字符串或其他元素</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">h</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">&#39;p&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">, {}, </span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">&#39;hello&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">)</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-light-font-style:inherit;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">// 没有属性时二参数可以忽略不写</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">h</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">&#39;p&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">, </span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">&#39;hello&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">, </span><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">h</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">&#39;image&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">, { </span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">url</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;"> }))</span></span></code></pre></div><h3 id="混用两种写法" tabindex="-1">混用两种写法 <a class="header-anchor" href="#混用两种写法" aria-label="Permalink to &quot;混用两种写法&quot;">​</a></h3><p>虽然大部分情况下你可能并不想这么做 (看起来很怪不是吗)，但事实上这两种写法也是可以混用的。例如，你可以在 JSX 中使用 <code>h</code> 函数：</p><div class="language-tsx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">tsx</span><pre class="shiki shiki-themes github-light one-dark-pro vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-light-font-style:inherit;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">// 欢迎 @用户名 入群！</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">&lt;&gt;欢迎 </span><span style="--shiki-light:#24292E;--shiki-dark:#C678DD;">{</span><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">h</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">&#39;at&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">, { </span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">id</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">userId</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;"> })</span><span style="--shiki-light:#24292E;--shiki-dark:#C678DD;">}</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;"> 入群！&lt;/&gt;</span></span></code></pre></div><p>也可以反过来，将由 JSX 创建出的元素传入 <code>h</code> 函数的参数中：</p><div class="language-tsx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">tsx</span><pre class="shiki shiki-themes github-light one-dark-pro vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-light-font-style:inherit;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">// 创建一个仅包含图片的消息</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">h</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">&#39;message&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">, &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#E06C75;">image</span><span style="--shiki-light:#6F42C1;--shiki-light-font-style:inherit;--shiki-dark:#D19A66;--shiki-dark-font-style:italic;"> url</span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">&quot;https://koishi.chat/logo.png&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">/&gt;)</span></span></code></pre></div><h2 id="标准元素" tabindex="-1">标准元素 <a class="header-anchor" href="#标准元素" aria-label="Permalink to &quot;标准元素&quot;">​</a></h2><p>Koishi 提供了一系列标准元素，它们覆盖了绝大部分常见的需求。例如：</p><ul><li><code>at</code>：提及用户</li><li><code>quote</code>：引用回复</li><li><code>image</code>：嵌入图片</li><li><code>message</code>：发送消息</li></ul><p>尽管一个平台不太可能支持所有的行为，但适配器对每一个标准元素都进行了最大程度的适配。例如，对于不支持斜体的平台，我们会将斜体元素转换为普通文本；对于无法同时发送多张图片的平台，我们会将多张图片转换为多条消息分别发送等等。这样一来，开发者便可以在不同平台上使用同一套代码，而不用担心平台差异。</p><p>我们先对比较常用的一些元素进行介绍，你可以稍后在 <a href="./../../api/message/elements.html">这个页面</a> 查看所有的标准元素。</p><h3 id="提及用户和消息" tabindex="-1">提及用户和消息 <a class="header-anchor" href="#提及用户和消息" aria-label="Permalink to &quot;提及用户和消息&quot;">​</a></h3><p>使用 <code>at</code> 元素提及用户：</p><div class="language-html vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki shiki-themes github-light one-dark-pro vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">欢迎 &lt;</span><span style="--shiki-light:#B31D28;--shiki-light-font-style:italic;--shiki-dark:#E06C75;--shiki-dark-font-style:inherit;">at</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D19A66;"> id</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">{userId}</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">/&gt; 入群！</span></span></code></pre></div>`,20)),l(k,null,{default:t(()=>[l(n,{nickname:"Koishi"},{default:t(()=>s[4]||(s[4]=[a("欢迎 @用户名 入群！")])),_:1})]),_:1}),s[22]||(s[22]=h('<p>使用 <code>quote</code> 元素引用回复：</p><div class="language-html vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki shiki-themes github-light one-dark-pro vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">&lt;</span><span style="--shiki-light:#B31D28;--shiki-light-font-style:italic;--shiki-dark:#E06C75;--shiki-dark-font-style:inherit;">quote</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D19A66;"> id</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">{messageId}</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">/&gt; 你说得对</span></span></code></pre></div>',2)),l(k,null,{default:t(()=>[l(n,{nickname:"Koishi"},{default:t(()=>s[5]||(s[5]=[i("blockquote",null,"原消息文本",-1),a(" 你说得对 ")])),_:1})]),_:1}),s[23]||(s[23]=h('<h3 id="嵌入图片和其他资源" tabindex="-1">嵌入图片和其他资源 <a class="header-anchor" href="#嵌入图片和其他资源" aria-label="Permalink to &quot;嵌入图片和其他资源&quot;">​</a></h3><p>使用 <code>image</code>, <code>audio</code>, <code>video</code> 和 <code>file</code> 元素嵌入图片、音频、视频和文件，它们的用法是类似的。这里以图片为例：</p><div class="language-html vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki shiki-themes github-light one-dark-pro vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">&lt;</span><span style="--shiki-light:#B31D28;--shiki-light-font-style:italic;--shiki-dark:#E06C75;--shiki-dark-font-style:inherit;">image</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D19A66;"> url</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">&quot;https://koishi.chat/logo.png&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">/&gt;</span></span></code></pre></div>',3)),l(k,null,{default:t(()=>[l(n,{nickname:"Koishi"},{default:t(()=>s[6]||(s[6]=[i("img",{src:"https://koishi.chat/logo.png",alt:"Koishi Logo",style:{"max-width":"100px"}},null,-1)])),_:1})]),_:1}),s[24]||(s[24]=h(`<p>上面是对于网络图片的用法，如果你想发送本地图片，可以使用 <code>file:</code> URL：</p><div class="language-tsx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">tsx</span><pre class="shiki shiki-themes github-light one-dark-pro vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;"> { </span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">pathToFileURL</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;"> } </span><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">from</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> &#39;url&#39;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;"> { </span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">resolve</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;"> } </span><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">from</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> &#39;path&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-light-font-style:inherit;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">// 发送相对路径下的 logo.png</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;">h</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">image</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">pathToFileURL</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">resolve</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">__dirname</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">, </span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">&#39;logo.png&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">)).</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">href</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">)</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-light-font-style:inherit;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">// 等价于下面的写法</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">&lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#E06C75;">image</span><span style="--shiki-light:#6F42C1;--shiki-light-font-style:inherit;--shiki-dark:#D19A66;--shiki-dark-font-style:italic;"> url</span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#C678DD;">{</span><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">pathToFileURL</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">resolve</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">__dirname</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">, </span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">&#39;logo.png&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">)).</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">href</span><span style="--shiki-light:#24292E;--shiki-dark:#C678DD;">}</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">/&gt;</span></span></code></pre></div><p>如果图片以二进制数据的形式存在于内存中，你也可以直接通过 <code>h.image()</code> 构造 <code>data:</code> URL：</p><div class="language-tsx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">tsx</span><pre class="shiki shiki-themes github-light one-dark-pro vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-light-font-style:inherit;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">// 这里的二参数是图片的 MIME 类型</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;">h</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">image</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">buffer</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">, </span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">&#39;image/png&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">)</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-light-font-style:inherit;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">// 等价于下面的写法</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">&lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#E06C75;">image</span><span style="--shiki-light:#6F42C1;--shiki-light-font-style:inherit;--shiki-dark:#D19A66;--shiki-dark-font-style:italic;"> url</span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#C678DD;">{</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">&#39;data:image/png;base64,&#39;</span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;"> +</span><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;"> buffer</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">toString</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">&#39;base64&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">)</span><span style="--shiki-light:#24292E;--shiki-dark:#C678DD;">}</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">/&gt;</span></span></code></pre></div>`,4)),i("h2",B,[s[8]||(s[8]=a("消息组件 ")),l(d,{type:"warning"},{default:t(()=>s[7]||(s[7]=[a("实验性")])),_:1}),s[9]||(s[9]=a()),s[10]||(s[10]=i("a",{class:"header-anchor",href:"#消息组件","aria-label":'Permalink to "消息组件 <badge type="warning">实验性</badge>"'},"​",-1))]),s[25]||(s[25]=h('<p><strong>消息组件 (Component)</strong> 是一种对消息元素的扩展和封装。它允许你创建可重用的定制元素，并在渲染时引入自定义逻辑。例如，<code>&lt;execute&gt;</code> 组件会将其中的内容作为指令执行，并将执行结果替换该元素：</p><div class="language-html vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki shiki-themes github-light one-dark-pro vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">这是执行结果：&lt;</span><span style="--shiki-light:#B31D28;--shiki-light-font-style:italic;--shiki-dark:#E06C75;--shiki-dark-font-style:inherit;">execute</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">&gt;echo hello&lt;/</span><span style="--shiki-light:#B31D28;--shiki-light-font-style:italic;--shiki-dark:#E06C75;--shiki-dark-font-style:inherit;">execute</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">&gt;</span></span></code></pre></div>',2)),l(k,null,{default:t(()=>[l(n,{nickname:"Koishi"},{default:t(()=>s[11]||(s[11]=[a("这是执行结果：hello")])),_:1})]),_:1}),s[26]||(s[26]=h(`<p>如你所见，你可以像使用普通的消息元素一样使用消息组件。唯一的区别是消息组件不由适配器实现，而是由 Koishi 直接处理。与之相对的，某些消息组件只有在特定的会话环境下才能使用 (例如在 <code>ctx.broadcast()</code> 中传入 <code>&lt;execute&gt;</code> 是无意义的，也会抛出错误)。</p><p>Koishi 已经内置了一系列消息组件，包括：</p><ul><li><code>&lt;execute&gt;</code>：执行指令</li><li><code>&lt;prompt&gt;</code>：等待输入</li><li><code>&lt;i18n&gt;</code>：国际化</li><li><code>&lt;random&gt;</code>：随机选择</li></ul><p>你可以在 <a href="./../../api/message/components.html">这个页面</a> 了解每个组件的详细用法和适用范围。</p><h3 id="定义消息组件" tabindex="-1">定义消息组件 <a class="header-anchor" href="#定义消息组件" aria-label="Permalink to &quot;定义消息组件&quot;">​</a></h3><p>一个消息组件本质上是一个函数，它接受三个参数：</p><ul><li><strong>attrs:</strong> 元素的属性</li><li><strong>children:</strong> 子元素列表</li><li><strong>session:</strong> 当前会话</li></ul><p>例如，下面的代码就定义了一个简单的消息组件：</p><div class="language-ts vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki shiki-themes github-light one-dark-pro vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-light-font-style:inherit;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">// 请注意函数名必须以大写字母开头</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">function</span><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;"> Custom</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#E36209;--shiki-light-font-style:inherit;--shiki-dark:#E06C75;--shiki-dark-font-style:italic;">attrs</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">, </span><span style="--shiki-light:#E36209;--shiki-light-font-style:inherit;--shiki-dark:#E06C75;--shiki-dark-font-style:italic;">children</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">, </span><span style="--shiki-light:#E36209;--shiki-light-font-style:inherit;--shiki-dark:#E06C75;--shiki-dark-font-style:italic;">session</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">) {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">  return</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> &#39;自定义内容&#39;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">}</span></span></code></pre></div><p>你可以直接在渲染时使用这个组件：</p>`,10)),l(p,{class:"code"},{"title-tsx":t(()=>s[12]||(s[12]=[a("JSX")])),"tab-tsx":t(()=>s[13]||(s[13]=[i("div",{class:"language-tsx vp-adaptive-theme"},[i("button",{title:"Copy Code",class:"copy"}),i("span",{class:"lang"},"JSX"),i("pre",{class:"shiki shiki-themes github-light one-dark-pro vp-code",tabindex:"0"},[i("code",null,[i("span",{class:"line"},[i("span",{style:{"--shiki-light":"#6A737D","--shiki-light-font-style":"inherit","--shiki-dark":"#7F848E","--shiki-dark-font-style":"italic"}},"// 请注意这里的大写字母")]),a(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E5C07B"}},"session"),i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#ABB2BF"}},"."),i("span",{style:{"--shiki-light":"#6F42C1","--shiki-dark":"#61AFEF"}},"send"),i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#ABB2BF"}},"(<"),i("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#E5C07B"}},"Custom"),i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#ABB2BF"}},"/>)")])])])],-1)])),"title-ts":t(()=>s[14]||(s[14]=[a("API")])),"tab-ts":t(()=>s[15]||(s[15]=[i("div",{class:"language-ts vp-adaptive-theme"},[i("button",{title:"Copy Code",class:"copy"}),i("span",{class:"lang"},"API"),i("pre",{class:"shiki shiki-themes github-light one-dark-pro vp-code",tabindex:"0"},[i("code",null,[i("span",{class:"line"},[i("span",{style:{"--shiki-light":"#6A737D","--shiki-light-font-style":"inherit","--shiki-dark":"#7F848E","--shiki-dark-font-style":"italic"}},"// 请注意这里的大写字母")]),a(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E5C07B"}},"session"),i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#ABB2BF"}},"."),i("span",{style:{"--shiki-light":"#6F42C1","--shiki-dark":"#61AFEF"}},"send"),i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#ABB2BF"}},"("),i("span",{style:{"--shiki-light":"#6F42C1","--shiki-dark":"#61AFEF"}},"h"),i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#ABB2BF"}},"("),i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E06C75"}},"Custom"),i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#ABB2BF"}},"))")])])])],-1)])),_:1}),s[27]||(s[27]=h(`<h3 id="注册全局组件" tabindex="-1">注册全局组件 <a class="header-anchor" href="#注册全局组件" aria-label="Permalink to &quot;注册全局组件&quot;">​</a></h3><p>上面的写法只能在当前文件中使用，并且必须以大写字母开头。如果想要更自然的写法，并将组件提供给其他插件使用，只需使用 <code>ctx.component()</code> 将它注册为一个全局组件：</p><div class="language-ts vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki shiki-themes github-light one-dark-pro vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;">ctx</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">component</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">&#39;custom&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">, (</span><span style="--shiki-light:#E36209;--shiki-light-font-style:inherit;--shiki-dark:#E06C75;--shiki-dark-font-style:italic;">attrs</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">, </span><span style="--shiki-light:#E36209;--shiki-light-font-style:inherit;--shiki-dark:#E06C75;--shiki-dark-font-style:italic;">children</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">, </span><span style="--shiki-light:#E36209;--shiki-light-font-style:inherit;--shiki-dark:#E06C75;--shiki-dark-font-style:italic;">session</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">=&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;"> {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">  return</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> &#39;自定义内容&#39;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">})</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-light-font-style:inherit;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">// 现在你可以在任何地方使用小写的 &lt;custom/&gt; 了</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;">session</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">send</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">(&lt;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#E5C07B;">custom</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">/&gt;)</span></span></code></pre></div>`,3))])}const b=r(y,[["render",F]]);export{f as __pageData,b as default};
