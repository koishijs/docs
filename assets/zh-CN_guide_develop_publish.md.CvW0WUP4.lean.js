import{_ as h,k as p,m as l,f as e,y as a,l as s,B as t,A as k,j as o}from"./chunks/framework.CUOHyZ0k.js";const m=JSON.parse('{"title":"发布插件","description":"","frontmatter":{},"headers":[],"relativePath":"zh-CN/guide/develop/publish.md","filePath":"zh-CN/guide/develop/publish.md"}'),r={name:"zh-CN/guide/develop/publish.md"},d={class:"tip custom-block"};function g(c,i,B,y,u,F){const n=k("tab-select");return o(),p("div",null,[i[9]||(i[9]=l(`<h1 id="发布插件" tabindex="-1">发布插件 <a class="header-anchor" href="#发布插件" aria-label="Permalink to &quot;发布插件&quot;">​</a></h1><p>为了让别人更方便地使用你编写的插件，你需要将其作为一个 npm 包进行发布。只需满足一定的规范，你的插件就能显示在 <a href="./../../market/">插件市场</a> 中，其他人可以通过控制台来安装它。</p><div class="tip custom-block"><p class="custom-block-title">TIP</p><p>本节中介绍的命令行都需要在 <a href="./config.html#应用目录">应用目录</a> 下运行。</p></div><h2 id="准备工作" tabindex="-1">准备工作 <a class="header-anchor" href="#准备工作" aria-label="Permalink to &quot;准备工作&quot;">​</a></h2><p>首先让我们关注插件目录中的 <code>package.json</code> 文件。这个文件非常重要，它包含了要发布插件的一切元信息。</p><div class="language-diff vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">diff</span><pre class="shiki shiki-themes github-light one-dark-pro vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">root</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">├── plugins</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">│   └── example</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">│       ├── src</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">│       │   └── index.ts</span></span>
<span class="line highlighted"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">│       └── package.json        # 你应该修改这里</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">├── koishi.yml</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">└── package.json                # 而不是这里</span></span></code></pre></div><div class="tip custom-block"><p class="custom-block-title">TIP</p><p>请注意 <code>package.json</code> 文件不是唯一的，它在应用目录和每个插件目录都会存在。请确保你修改了正确的文件。</p></div><p>打开上述文件，你会看到它大概长这样：</p><div class="language-json vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">package.json</span><pre class="shiki shiki-themes github-light one-dark-pro vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">{</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#E06C75;">  &quot;name&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">&quot;koishi-plugin-example&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#E06C75;">  &quot;version&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">&quot;1.0.0&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">,</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-light-font-style:inherit;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">  // ……</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">}</span></span></code></pre></div><p>其中最重要的属性有两个：<code>name</code> 是要发布的包名，<code>version</code> 是当前版本号。可以看到，这里的包名相比实际在插件市场中看到的插件名多了一个 <code>koishi-plugin-</code> 的前缀，这使得我们很容易区分 Koishi 插件与其他 npm 包，同时也方便了用户安装和配置插件。</p><div class="tip custom-block"><p class="custom-block-title">TIP</p><p>请注意：包名和版本号都是唯一的：包名不能与其他已经发布的包相同，而同一个包的同一个版本号也只能发布一次。如果出现了包名冲突或版本号冲突，则会在之后的发布流程中出现错误提示。你可以自行根据错误提示更改包名或更新插件版本。</p></div><h2 id="补充更多信息" tabindex="-1">补充更多信息 <a class="header-anchor" href="#补充更多信息" aria-label="Permalink to &quot;补充更多信息&quot;">​</a></h2><p>除了包名和版本号以外，<code>package.json</code> 还包括了插件的依赖、描述、贡献者、许可证、关键词等更多信息。你并不需要一上来就把所有信息都填写完整，因为你可以随后再进行修改。但请别忘了，这些内容也是插件的一部分，修改完成后别忘了 <a href="#更新插件版本">更新版本</a> 并 <a href="#发布插件">再次发布</a>。</p><h3 id="准入条件" tabindex="-1">准入条件 <a class="header-anchor" href="#准入条件" aria-label="Permalink to &quot;准入条件&quot;">​</a></h3><div class="tip custom-block"><p class="custom-block-title">TIP</p><p>使用模板项目创建的插件一定是符合要求的，因此你可以跳过这一节。</p></div><p>要想显示在插件市场中，插件的 <code>package.json</code> 需要满足以下基本要求：</p><ul><li><a href="https://docs.npmjs.com/cli/v8/configuring-npm/package-json#name" target="_blank" rel="noreferrer"><code>name</code></a> 必须符合以下格式之一： <ul><li><code>koishi-plugin-*</code></li><li><code>@bar/koishi-plugin-*</code></li><li><code>@koishijs/plugin-*</code> (官方插件)</li><li>其中 <code>*</code> 是由数字、小写字母和连字符 <code>-</code> 组成的字符串</li></ul></li><li><a href="https://docs.npmjs.com/cli/v10/configuring-npm/package-json#name" target="_blank" rel="noreferrer"><code>name</code></a> 不能与已发布的插件重复或相似</li><li><a href="https://docs.npmjs.com/cli/v10/configuring-npm/package-json#version" target="_blank" rel="noreferrer"><code>version</code></a> 应当符合 <a href="https://semver.org/lang/zh-CN/" target="_blank" rel="noreferrer">语义化版本</a> (通常从 <code>1.0.0</code> 开始)</li><li><a href="https://docs.npmjs.com/cli/v10/configuring-npm/package-json#peerdependencies" target="_blank" rel="noreferrer"><code>peerDependencies</code></a> 必须包含 <code>koishi</code></li><li>不能声明 <a href="https://docs.npmjs.com/cli/v10/configuring-npm/package-json#private" target="_blank" rel="noreferrer"><code>private</code></a> 为 <code>true</code> (否则你的插件无法发布)</li><li>最新版本不能被 <a href="https://docs.npmjs.com/deprecating-and-undeprecating-packages-or-package-versions" target="_blank" rel="noreferrer">弃用</a></li></ul><p>一个符合上述标准的示例：</p><div class="language-json vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">package.json</span><pre class="shiki shiki-themes github-light one-dark-pro vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">{</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#E06C75;">  &quot;name&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">&quot;koishi-plugin-example&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#E06C75;">  &quot;version&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">&quot;1.0.0&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#E06C75;">  &quot;peerDependencies&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">: {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#E06C75;">    &quot;koishi&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">&quot;^4.3.2&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">  }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">}</span></span></code></pre></div><h3 id="添加相关信息" tabindex="-1">添加相关信息 <a class="header-anchor" href="#添加相关信息" aria-label="Permalink to &quot;添加相关信息&quot;">​</a></h3><p>除去上面的基本要求外，<code>package.json</code> 中还有一些字段能帮助显示插件的相关信息。</p><div class="language-json vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">package.json</span><pre class="shiki shiki-themes github-light one-dark-pro vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">{</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#E06C75;">  &quot;name&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">&quot;koishi-plugin-example&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#E06C75;">  &quot;version&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">&quot;1.0.0&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#E06C75;">  &quot;contributors&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">: [                         </span><span style="--shiki-light:#6A737D;--shiki-light-font-style:inherit;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">// 贡献者</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">    &quot;Alice &lt;alice@gmail.com&gt;&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">,</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">    &quot;Bob &lt;bob@gmail.com&gt;&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">  ],</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#E06C75;">  &quot;license&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">&quot;MIT&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">,                         </span><span style="--shiki-light:#6A737D;--shiki-light-font-style:inherit;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">// 许可证</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#E06C75;">  &quot;homepage&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">&quot;https://example.com&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">,        </span><span style="--shiki-light:#6A737D;--shiki-light-font-style:inherit;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">// 主页</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#E06C75;">  &quot;repository&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">: {                           </span><span style="--shiki-light:#6A737D;--shiki-light-font-style:inherit;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">// 源码仓库</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#E06C75;">    &quot;type&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">&quot;git&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#E06C75;">    &quot;url&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">&quot;git+https://github.com/alice/koishi-plugin-example.git&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">  },</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#E06C75;">  &quot;keywords&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">: [</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">&quot;example&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">],                  </span><span style="--shiki-light:#6A737D;--shiki-light-font-style:inherit;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">// 关键词</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#E06C75;">  &quot;peerDependencies&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">: {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#E06C75;">    &quot;koishi&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">&quot;^4.3.2&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">  }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">}</span></span></code></pre></div><ul><li><strong>contributors:</strong> 插件维护者，应该是一个数组，其中的元素通常使用 <code>名字 &lt;邮箱&gt;</code> 的格式</li><li><strong>license:</strong> 插件许可证，你可以在 <a href="https://choosealicense.com/licenses/" target="_blank" rel="noreferrer">这里</a> 了解各种许可证的详细信息</li><li><strong>homepage:</strong> 插件主页，可以是一个网址 (比如你的 GitHub 项目地址)</li><li><strong>repository:</strong> 插件源码仓库，应该是一个对象，其中 <code>type</code> 字段指定仓库类型，<code>url</code> 字段指定仓库地址</li><li><strong>keywords:</strong> 插件关键词，应该是一个字符串数组，会用于插件市场中的搜索功能</li></ul><div class="tip custom-block"><p class="custom-block-title">TIP</p><p><code>package.json</code> 中还有一些字段没有在这里提及，如果你对此感兴趣，可以前往 <a href="https://docs.npmjs.com/files/package.json/" target="_blank" rel="noreferrer">npmjs.com</a> 查看文档。</p></div><h3 id="koishi-字段" tabindex="-1"><code>koishi</code> 字段 <a class="header-anchor" href="#koishi-字段" aria-label="Permalink to &quot;\`koishi\` 字段&quot;">​</a></h3><p>除此以外，我们还提供了一个额外的 <code>koishi</code> 字段，用于指定与 Koishi 相关的信息。</p><div class="language-json vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">package.json</span><pre class="shiki shiki-themes github-light one-dark-pro vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">{</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#E06C75;">  &quot;name&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">&quot;koishi-plugin-dialogue&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#E06C75;">  &quot;version&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">&quot;1.0.0&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#E06C75;">  &quot;peerDependencies&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">: {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#E06C75;">    &quot;koishi&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">&quot;^4.3.2&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">  },</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#E06C75;">  &quot;koishi&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">: {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#E06C75;">    &quot;description&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">: {                        </span><span style="--shiki-light:#6A737D;--shiki-light-font-style:inherit;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">// 不同语言的插件描述</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#E06C75;">      &quot;en&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">&quot;English Description&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#E06C75;">      &quot;zh&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">&quot;中文描述&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">    },</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#E06C75;">    &quot;service&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">: {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#E06C75;">      &quot;required&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">: [</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">&quot;database&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">],             </span><span style="--shiki-light:#6A737D;--shiki-light-font-style:inherit;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">// 必需的服务</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#E06C75;">      &quot;optional&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">: [</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">&quot;assets&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">],               </span><span style="--shiki-light:#6A737D;--shiki-light-font-style:inherit;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">// 可选的服务</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#E06C75;">      &quot;implements&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">: [</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">&quot;dialogue&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">],           </span><span style="--shiki-light:#6A737D;--shiki-light-font-style:inherit;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">// 实现的服务</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">    },</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">  }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">}</span></span></code></pre></div><ul><li><strong>description:</strong> 插件描述，应该是一个对象，其中的键代表语言名，值是对应语言下的描述</li><li><strong>service:</strong> 插件的服务相关信息，详情请参见 <a href="./../plugin/service.html#package-json">服务与依赖</a></li><li><strong>preview:</strong> 配置为 <code>true</code> 可以让插件显示为「开发中」状态</li><li><strong>hidden:</strong> 配置为 <code>true</code> 可以让插件市场中不显示该插件 (通常情况下你不需要这么做)</li></ul><div class="tip custom-block"><p class="custom-block-title">TIP</p><p>此外，还有一些字段与 <a href="./../../cookbook/practice/online.html">Koishi Online</a> 的部署流程相关 (如 <code>browser</code>, <code>exports</code> 等)。由于不影响主线开发，你可以稍后再进行了解。</p></div><h2 id="发布插件-1" tabindex="-1">发布插件 <a class="header-anchor" href="#发布插件-1" aria-label="Permalink to &quot;发布插件&quot;">​</a></h2><p>编辑完上面的清单文件并 <a href="./workspace.html#build">构建源代码</a> 后，你就可以公开发布你的插件了。</p>`,31)),e(n,{class:"code"},{"tab-npm":a(()=>i[0]||(i[0]=[s("div",{class:"language-npm vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"},"npm"),s("pre",{class:"shiki shiki-themes github-light one-dark-pro vp-code",tabindex:"0"},[s("code",null,[s("span",{class:"line"},[s("span",{style:{"--shiki-light":"#6F42C1","--shiki-dark":"#61AFEF"}},"npm"),s("span",{style:{"--shiki-light":"#032F62","--shiki-dark":"#98C379"}}," run"),s("span",{style:{"--shiki-light":"#032F62","--shiki-dark":"#98C379"}}," pub"),s("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#ABB2BF"}}," [...name]")])])])],-1)])),"tab-yarn":a(()=>i[1]||(i[1]=[s("div",{class:"language-yarn vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"},"yarn"),s("pre",{class:"shiki shiki-themes github-light one-dark-pro vp-code",tabindex:"0"},[s("code",null,[s("span",{class:"line"},[s("span",{style:{"--shiki-light":"#6F42C1","--shiki-dark":"#61AFEF"}},"yarn"),s("span",{style:{"--shiki-light":"#032F62","--shiki-dark":"#98C379"}}," pub"),s("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#ABB2BF"}}," [...name]")])])])],-1)])),_:1}),i[10]||(i[10]=l('<ul><li><strong>name:</strong> 要发布的插件列表，缺省时表示全部 (此处 <code>name</code> 不包含 <code>koishi-plugin-</code> 前缀，而是你的工作区目录名)</li></ul><p>这将发布所有版本号发生变动的插件。</p><div class="tip custom-block"><p class="custom-block-title">TIP</p><p>从插件成功发布到进插件市场需要一定的时间 (通常在 15 分钟内)，请耐心等待。</p><p>如果发布时多次失败或者长时间无响应，可以添加 <code>--debug</code> 选项以显示调试信息。</p><div class="language-npm vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">npm</span><pre class="shiki shiki-themes github-light one-dark-pro vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">npm</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> run</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> pub</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;"> [...name] --debug</span></span></code></pre></div><div class="language-yarn vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yarn</span><pre class="shiki shiki-themes github-light one-dark-pro vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">yarn</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> pub</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;"> [...name] --debug</span></span></code></pre></div></div>',3)),s("div",d,[i[5]||(i[5]=l('<p class="custom-block-title">TIP</p><p>如果你配置了国内镜像，你可能会遇到以下的错误提示：</p><div class="language-text vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light one-dark-pro vp-code" tabindex="0"><code><span class="line"><span>No token found and can&#39;t prompt for login when running with --non-interactive.</span></span></code></pre></div><p>此时你需要在发布时使用官方镜像，具体操作如下：</p>',4)),e(n,{class:"code"},{"tab-npm":a(()=>i[2]||(i[2]=[s("div",{class:"language-npm vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"},"npm"),s("pre",{class:"shiki shiki-themes github-light one-dark-pro vp-code",tabindex:"0"},[s("code",null,[s("span",{class:"line"},[s("span",{style:{"--shiki-light":"#6F42C1","--shiki-dark":"#61AFEF"}},"npm"),s("span",{style:{"--shiki-light":"#032F62","--shiki-dark":"#98C379"}}," run"),s("span",{style:{"--shiki-light":"#032F62","--shiki-dark":"#98C379"}}," pub"),s("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#ABB2BF"}}," [...name] -- --registry https://registry.npmjs.org")])])])],-1)])),"tab-yarn":a(()=>i[3]||(i[3]=[s("div",{class:"language-yarn vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"},"yarn"),s("pre",{class:"shiki shiki-themes github-light one-dark-pro vp-code",tabindex:"0"},[s("code",null,[s("span",{class:"line"},[s("span",{style:{"--shiki-light":"#6F42C1","--shiki-dark":"#61AFEF"}},"yarn"),s("span",{style:{"--shiki-light":"#032F62","--shiki-dark":"#98C379"}}," pub"),s("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#ABB2BF"}}," [...name] --registry https://registry.yarnpkg.com")])])])],-1)])),_:1}),i[6]||(i[6]=s("p",null,"对于 Yarn v2 及以上版本，你还可以分别针对发布和安装设置不同的镜像：",-1)),e(n,{class:"code"},{"tab-yarn":a(()=>i[4]||(i[4]=[s("div",{class:"language-yarn vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"},"yarn"),s("pre",{class:"shiki shiki-themes github-light one-dark-pro vp-code",tabindex:"0"},[s("code",null,[s("span",{class:"line"},[s("span",{style:{"--shiki-light":"#6A737D","--shiki-light-font-style":"inherit","--shiki-dark":"#7F848E","--shiki-dark-font-style":"italic"}},"# 安装时使用国内镜像")]),t(`
`),s("span",{class:"line"},[s("span",{style:{"--shiki-light":"#6F42C1","--shiki-dark":"#61AFEF"}},"yarn"),s("span",{style:{"--shiki-light":"#032F62","--shiki-dark":"#98C379"}}," config"),s("span",{style:{"--shiki-light":"#032F62","--shiki-dark":"#98C379"}}," set"),s("span",{style:{"--shiki-light":"#032F62","--shiki-dark":"#98C379"}}," npmRegistryServer"),s("span",{style:{"--shiki-light":"#032F62","--shiki-dark":"#98C379"}}," https://registry.npmmirror.com")]),t(`
`),s("span",{class:"line"},[s("span",{style:{"--shiki-light":"#6A737D","--shiki-light-font-style":"inherit","--shiki-dark":"#7F848E","--shiki-dark-font-style":"italic"}},"# 发布时使用官方镜像")]),t(`
`),s("span",{class:"line"},[s("span",{style:{"--shiki-light":"#6F42C1","--shiki-dark":"#61AFEF"}},"yarn"),s("span",{style:{"--shiki-light":"#032F62","--shiki-dark":"#98C379"}}," config"),s("span",{style:{"--shiki-light":"#032F62","--shiki-dark":"#98C379"}}," set"),s("span",{style:{"--shiki-light":"#032F62","--shiki-dark":"#98C379"}}," npmPublishRegistry"),s("span",{style:{"--shiki-light":"#032F62","--shiki-dark":"#98C379"}}," https://registry.yarnpkg.com")])])])],-1)])),_:1})]),i[11]||(i[11]=s("h2",{id:"更新插件版本",tabindex:"-1"},[t("更新插件版本 "),s("a",{class:"header-anchor",href:"#更新插件版本","aria-label":'Permalink to "更新插件版本"'},"​")],-1)),i[12]||(i[12]=s("p",null,[t("初始创建的插件版本号为 "),s("code",null,"1.0.0"),t("。当你修改过插件后，你需要更新版本号才能重新发布。在应用目录运行下面的命令以更新版本号：")],-1)),e(n,{class:"code"},{"tab-npm":a(()=>i[7]||(i[7]=[s("div",{class:"language-npm vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"},"npm"),s("pre",{class:"shiki shiki-themes github-light one-dark-pro vp-code",tabindex:"0"},[s("code",null,[s("span",{class:"line"},[s("span",{style:{"--shiki-light":"#6F42C1","--shiki-dark":"#61AFEF"}},"npm"),s("span",{style:{"--shiki-light":"#032F62","--shiki-dark":"#98C379"}}," run"),s("span",{style:{"--shiki-light":"#032F62","--shiki-dark":"#98C379"}}," bump"),s("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#ABB2BF"}}," [...name] -- [-1"),s("span",{style:{"--shiki-light":"#D73A49","--shiki-dark":"#ABB2BF"}},"|"),s("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#ABB2BF"}},"-2"),s("span",{style:{"--shiki-light":"#D73A49","--shiki-dark":"#ABB2BF"}},"|"),s("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#ABB2BF"}},"-3"),s("span",{style:{"--shiki-light":"#D73A49","--shiki-dark":"#ABB2BF"}},"|"),s("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#ABB2BF"}},"-p"),s("span",{style:{"--shiki-light":"#D73A49","--shiki-dark":"#ABB2BF"}},"|"),s("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#ABB2BF"}},"-v "),s("span",{style:{"--shiki-light":"#D73A49","--shiki-dark":"#56B6C2"}},"<"),s("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#ABB2BF"}},"ver"),s("span",{style:{"--shiki-light":"#D73A49","--shiki-dark":"#56B6C2"}},">"),s("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#ABB2BF"}},"] [-r]")])])])],-1)])),"tab-yarn":a(()=>i[8]||(i[8]=[s("div",{class:"language-yarn vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"},"yarn"),s("pre",{class:"shiki shiki-themes github-light one-dark-pro vp-code",tabindex:"0"},[s("code",null,[s("span",{class:"line"},[s("span",{style:{"--shiki-light":"#6F42C1","--shiki-dark":"#61AFEF"}},"yarn"),s("span",{style:{"--shiki-light":"#032F62","--shiki-dark":"#98C379"}}," bump"),s("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#ABB2BF"}}," [...name] [-1"),s("span",{style:{"--shiki-light":"#D73A49","--shiki-dark":"#ABB2BF"}},"|"),s("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#ABB2BF"}},"-2"),s("span",{style:{"--shiki-light":"#D73A49","--shiki-dark":"#ABB2BF"}},"|"),s("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#ABB2BF"}},"-3"),s("span",{style:{"--shiki-light":"#D73A49","--shiki-dark":"#ABB2BF"}},"|"),s("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#ABB2BF"}},"-p"),s("span",{style:{"--shiki-light":"#D73A49","--shiki-dark":"#ABB2BF"}},"|"),s("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#ABB2BF"}},"-v "),s("span",{style:{"--shiki-light":"#D73A49","--shiki-dark":"#56B6C2"}},"<"),s("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#ABB2BF"}},"ver"),s("span",{style:{"--shiki-light":"#D73A49","--shiki-dark":"#56B6C2"}},">"),s("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#ABB2BF"}},"] [-r]")])])])],-1)])),_:1}),i[13]||(i[13]=l(`<ul><li><strong>name:</strong> 要更新的插件列表，不能为空</li><li><strong>-1, --major:</strong> 跳到下一个大版本，例如 <code>3.1.4</code> -&gt; <code>4.0.0</code></li><li><strong>-2, --minor:</strong> 跳到下一个中版本，例如 <code>3.1.4</code> -&gt; <code>3.2.0</code></li><li><strong>-3, --patch:</strong> 跳到下一个小版本，例如 <code>3.1.4</code> -&gt; <code>3.1.5</code></li><li><strong>-p, --prerelease:</strong> 跳到下一个预览版本，具体行为如下 <ul><li>如果当前版本是 <code>alpha.x</code>，则跳到 <code>beta.0</code></li><li>如果当前版本是 <code>beta.x</code>，则跳到 <code>rc.0</code></li><li>如果当前版本是 <code>rc.x</code>，则移除 prerelease 部分</li><li>其他情况下，跳到下一个大版本的 <code>alpha.0</code></li></ul></li><li><strong>-v, --version:</strong> 设置具体的版本号</li><li><strong>-r, --recursive:</strong> 递归更新依赖版本</li><li>缺省情况：按照当前版本的最后一位递增</li></ul><p>当进行此操作时，其他相关插件的依赖版本也会同步更新，确保所有工作区内依赖的插件版本一致。进一步，如果你希望更新了依赖版本的插件也同时更新自身的版本，那么可以附加 <code>-r, --recursive</code> 选项。</p><h2 id="deprecate" tabindex="-1">弃用插件 <a class="header-anchor" href="#deprecate" aria-label="Permalink to &quot;弃用插件 {#deprecate}&quot;">​</a></h2><p>如果你不再维护某个插件，或者你希望更换一个名字重新发布，那么你可以弃用该插件。在任意目录运行下面的命令以弃用插件：</p><div class="language-sh vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki shiki-themes github-light one-dark-pro vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">npm</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> deprecate</span><span style="--shiki-light:#D73A49;--shiki-dark:#ABB2BF;"> &lt;</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">full-nam</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">e</span><span style="--shiki-light:#D73A49;--shiki-dark:#ABB2BF;">&gt;</span><span style="--shiki-light:#D73A49;--shiki-dark:#ABB2BF;"> &lt;</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">messag</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">e</span><span style="--shiki-light:#D73A49;--shiki-dark:#ABB2BF;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-light-font-style:inherit;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;"># 例如</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">npm</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> deprecate</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> koishi-plugin-example</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> &quot;this plugin is deprecated&quot;</span></span></code></pre></div><p>请注意这里要写出的是完整的包名，而不是插件的目录名。</p><p>你也可以弃用某个特定版本或版本区间 (默认情况下将弃用所有版本)：</p><div class="language-sh vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki shiki-themes github-light one-dark-pro vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">npm</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> deprecate</span><span style="--shiki-light:#D73A49;--shiki-dark:#ABB2BF;"> &lt;</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">full-nam</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">e</span><span style="--shiki-light:#D73A49;--shiki-dark:#ABB2BF;">&gt;</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">[@</span><span style="--shiki-light:#D73A49;--shiki-dark:#ABB2BF;">&lt;</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">versio</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">n</span><span style="--shiki-light:#D73A49;--shiki-dark:#ABB2BF;">&gt;</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">]</span><span style="--shiki-light:#D73A49;--shiki-dark:#ABB2BF;"> &lt;</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">messag</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">e</span><span style="--shiki-light:#D73A49;--shiki-dark:#ABB2BF;">&gt;</span></span></code></pre></div><p>弃用插件的最新版本后，该插件将不再显示在插件市场中。未来你仍然可以发布新版本，这将使你的插件重新进入插件市场。</p>`,9))])}const A=h(r,[["render",g]]);export{m as __pageData,A as default};
