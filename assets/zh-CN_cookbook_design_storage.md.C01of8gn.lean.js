import{_ as i,k as a,m as l,j as n}from"./chunks/framework.CUOHyZ0k.js";const c=JSON.parse('{"title":"零占用的存储","description":"","frontmatter":{},"headers":[],"relativePath":"zh-CN/cookbook/design/storage.md","filePath":"zh-CN/cookbook/design/storage.md"}'),t={name:"zh-CN/cookbook/design/storage.md"};function h(p,s,e,k,o,d){return n(),a("div",null,s[0]||(s[0]=[l(`<h1 id="零占用的存储" tabindex="-1">零占用的存储 <a class="header-anchor" href="#零占用的存储" aria-label="Permalink to &quot;零占用的存储&quot;">​</a></h1><div class="tip custom-block"><p class="custom-block-title">TIP</p><p>本文将回答以下问题：</p><ul><li>插件要想持久化数据有哪些途径？</li><li>什么是零占用模式？为什么需要实现零占用？</li></ul></div><p>要为一个插件持久化一些数据，除了使用数据库外，更灵活的方式就是使用本地文件。然而到底应该将文件存放在哪里，就是一个值得深入探讨的问题了。本文将介绍 Koishi 插件开发时推荐遵循的零占用模式，它是一个兼具扩展性、可移植性和健壮性的最佳实践。</p><h2 id="持久化数据的三种途径" tabindex="-1">持久化数据的三种途径 <a class="header-anchor" href="#持久化数据的三种途径" aria-label="Permalink to &quot;持久化数据的三种途径&quot;">​</a></h2><p>要为一个插件持久化一些数据，大致有三种途径：数据库、本地文件和配置项。</p><p>数据库是最常见的数据存储方式。它有着良好的可扩展性，支持高效地查询，并且可以在多个实例间共享数据。事实上，绝大多数有持久化需求的插件都应该使用数据库进行存储。</p><p>本地文件则更加灵活。它可以存储任意类型的数据，且访问速度通常比数据库更快。如果插件存在下载的资源、可执行文件和临时文件，就比较适合使用本地文件进行存储。</p><p>最后，配置项也是一种持久化数据的方式。不过相比前两种方式，配置项既无法存储大规模数据，又受到数据结构的限制。只有当这些数据确实是配置 (即只会被管理员更改) 时，我们才建议使用配置项。关于配置项持久化的例子，可以参考 <a href="./../appendix/commands.html">commands</a> 插件。</p><p>在编写插件时，我们应该根据数据的类型和用途，选择合适的持久化方式。</p><h2 id="关于存储位置的讨论" tabindex="-1">关于存储位置的讨论 <a class="header-anchor" href="#关于存储位置的讨论" aria-label="Permalink to &quot;关于存储位置的讨论&quot;">​</a></h2><p>一旦你决定使用本地文件管理数据，那么下一个问题就是将这些文件存放在哪里。</p><h3 id="应当避免的情况" tabindex="-1">应当避免的情况 <a class="header-anchor" href="#应当避免的情况" aria-label="Permalink to &quot;应当避免的情况&quot;">​</a></h3><p>在我们开始介绍最佳实践之前，首先让我们展示两种你绝对不应该使用的位置。</p><p>第一，<strong>永远不要使用绝对路径</strong>。这件事非常容易理解，只需要考虑一下 win32 和 POSIX 之间的路径差异，你就会知道一旦使用了绝对路径，你的插件就注定无法在不同的机器上正常工作。</p><p>第二，<strong>永远不要使用 (基于插件目录) 的相对路径</strong>。Koishi 的插件实际上就是一个个 npm 包，它们存储于 <code>node_modules</code> 目录下。如果你在插件目录下存放数据，那么当任何插件被更新时，这些数据都可能会丢失。更严重的是，如果你的插件占用了 <code>node_modules</code> 目录下的文件，整个实例将无法安装、卸载、更新任何插件，这种情况下你的插件将被标记为不安全。</p><div class="tip custom-block"><p class="custom-block-title">TIP</p><p>请注意，第二种情况其实包含了一种隐蔽的场景，那就是基于 gyp 的插件。由于 Node.js 自身的缺陷，<code>.node</code> 文件一经加载，就会永久占用该文件。而绝大多数基于 gyp 的包也都会将 <code>.node</code> 文件置于 <code>node_modules</code> 目录下。因此，依赖这些包的插件也会被标记为不安全。</p><p>如果你的插件已经因此被标记为不安全，请尝试排除上述依赖，并使用以下替代方案：</p><ul><li>更换为 JS 原生实现或 WebAssembly 实现的包 (它们不存在占用问题)。</li><li>将 <code>.node</code> 或其他存在占用问题的可执行文件存放于<a href="#global">全局路径</a>下。</li></ul></div><h3 id="零占用的-koishi" tabindex="-1">零占用的 Koishi <a class="header-anchor" href="#零占用的-koishi" aria-label="Permalink to &quot;零占用的 Koishi&quot;">​</a></h3><p>零占用的 Koishi 是指，给定一个正在运行的 Koishi 实例，移除该实例目录下的所有内容，实例应按照预期的方式保持工作。具体而言，实例内的所有模块，包括 Koishi 本体及所有插件，均在设计时对此情况做了考虑，并编写了相应的处理逻辑：</p><ul><li>Koishi 本体在启动时读取了配置文件。在启动后删除该文件，Koishi 保持工作。</li><li>存储大文件的插件在要求时加载、解析大文件并返回结果给用户。删除该文件后，插件无法顺利解析，但插件返回可读的错误文本或输出可读的错误日志，不会造成 Koishi 崩溃。</li><li>外部程序包装插件依赖外部的可执行文件进行工作。可执行文件在运行时无法解除占用，故应当预先被转移至实例目录之外。实例运行时，实例目录内不存在被占用的可执行文件。</li></ul><p>实现了零占用模式的 Koishi 项目将获得以下优点：</p><ul><li><strong>自更新</strong>：可以通过插件更新 Koishi 及其依赖。在更新依赖的整个过程中，Koishi 及所有插件仍保持可用。目前已有 <a href="./../../plugins/console/market.html">market</a> 插件实现了此特性。</li><li><strong>健壮性</strong>：文件暂时无法访问不会导致 Koishi 崩溃。这对实例目录使用网络映射的场景更友好。</li><li><strong>滚动更新</strong>：可以先升级实例目录，然后滚动更新 Koishi。这将极大地提高 Koishi 的可用性。</li></ul><h2 id="最佳实践" tabindex="-1">最佳实践 <a class="header-anchor" href="#最佳实践" aria-label="Permalink to &quot;最佳实践&quot;">​</a></h2><p>在最简单的情况下，只要一个 Koishi 插件不使用实例目录内的任何文件，那么该插件就已自动实现了零占用。如果插件确实需要使用文件，我们提供了两种方案作为最佳实践。</p><h3 id="instance" tabindex="-1">使用实例目录存储持久化数据 <a class="header-anchor" href="#instance" aria-label="Permalink to &quot;使用实例目录存储持久化数据 {#instance}&quot;">​</a></h3><p>在大多数持久化场景下，要存储的数据都是与实例相关、且不会被占用的文件。这种情况下，我们建议将数据存放于实例目录下的特定目录中。根据数据的用途，这个目录可以是：</p><ul><li><code>data</code>：存放数据文件 (可以在不同实例间迁移)。</li><li><code>cache</code>：存放缓存文件 (没有迁移价值的持久化数据)。</li><li><code>temp</code>：存放临时文件 (非持久化数据，下一次启动即会失效)。</li></ul><p>这样做的好处是，当你需要迁移实例时，只需要将 <code>data</code> 目录复制到新的实例目录下即可。</p><p>如果你是插件开发者，可以使用 <a href="./../../api/core/context.html#ctx-basedir"><code>ctx.baseDir</code></a> 获取实例目录。通常你也不应该直接存放在上述路径的顶层，而是为自己的插件创建一个子目录，就像这样：</p><div class="language-ts vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki shiki-themes github-light one-dark-pro vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">import</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> *</span><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;"> as</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;"> fs</span><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;"> from</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> &#39;fs/promises&#39;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">import</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> *</span><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;"> as</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;"> path</span><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;"> from</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> &#39;path&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">export</span><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;"> async</span><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;"> function</span><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;"> apply</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#E36209;--shiki-light-font-style:inherit;--shiki-dark:#E06C75;--shiki-dark-font-style:italic;">ctx</span><span style="--shiki-light:#D73A49;--shiki-dark:#ABB2BF;">:</span><span style="--shiki-light:#6F42C1;--shiki-dark:#E5C07B;"> Context</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">) {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">  const</span><span style="--shiki-light:#005CC5;--shiki-dark:#E5C07B;"> root</span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;"> path</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">join</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;">ctx</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">baseDir</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">, </span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">&#39;data&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">, </span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">&#39;my-plugin&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">)</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">  await</span><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;"> fs</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">mkdir</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">root</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">, { </span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">recursive</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;">true</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;"> })</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-light-font-style:inherit;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">  // 在 root 目录下存储数据</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">}</span></span></code></pre></div><h3 id="global" tabindex="-1">使用全局路径存储可执行文件 <a class="header-anchor" href="#global" aria-label="Permalink to &quot;使用全局路径存储可执行文件 {#global}&quot;">​</a></h3><p>如果你的插件需要依赖特定的可执行文件运行，那么你应该将该文件存放于全局路径下。由于全局路径不是实例目录的一部分，因此它不会破坏零占用模式。这样做的另一个好处是，如果你有多个 Koishi 实例，那么该文件只需要下载一次，就可以在所有实例中使用。</p><div class="tip custom-block"><p class="custom-block-title">TIP</p><p>你可能会问，刚刚还在聊可执行文件，现在怎么牵扯到下载了？</p><p>这是因为绝大多数的可执行文件都不是跨平台的，我们需要根据不同的系统和架构选择不同的文件。而我们显然也不应该在插件中自带所有平台的版本，那样既会拖慢安装速度，也会占用额外的硬盘空间。因此，最佳实践就需要我们自行下载可执行文件了。</p><p>事实上，其他资源类型 (非可执行文件) 如果需要从网络下载，也可以采用下面介绍的办法。</p></div><p>要获取一个通用的全局路径，可以使用 <a href="https://npmjs.com/package/env-paths" target="_blank" rel="noreferrer">env-paths</a> 库：</p><div class="language-ts vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki shiki-themes github-light one-dark-pro vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;"> envPaths</span><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;"> from</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> &#39;env-paths&#39;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">import</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> *</span><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;"> as</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;"> path</span><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;"> from</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> &#39;path&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#E5C07B;"> root</span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;"> path</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">join</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">envPaths</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">&#39;some-binary&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">).</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">data</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">, </span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">version</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">)</span></span></code></pre></div><p>接下来，我们来设计依赖的下载逻辑。通常有两种方案：安装时下载和运行时下载。</p><ul><li>安装时下载：通过配置插件的 <code>postinstall</code> 脚本，在安装时就将依赖下载到本地。 <ul><li>优点：可以在整合包中提供开箱即用的体验 (不用在启动后读条)。</li><li>缺点：增加插件的安装时间，并且在依赖体积较大时显著提高安装失败的概率。</li><li>建议仅对于连同依赖体积不超过 10 MB 的插件使用此方案。</li></ul></li><li>运行时下载：在插件启动后，通过 <code>downloads</code> 服务将依赖下载到本地。 <ul><li>优点：插件安装迅速且稳定；分片和断点续传功能确保在网络不稳定时也能安装成功。</li><li>缺点：第一次启动时需要等待一段时间 (在控制台底部的状态栏显示为进度条)。</li></ul></li></ul><p>如果采用安装时下载的方案，我们首先需要改动 <code>package.json</code> 中的 <code>scripts</code> 字段，添加一个 <code>postinstall</code> 脚本：</p><div class="language-json vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">package.json</span><pre class="shiki shiki-themes github-light one-dark-pro vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">{</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#E06C75;">  &quot;scripts&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">: {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#E06C75;">    &quot;postinstall&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">&quot;node lib/download&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">  }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">}</span></span></code></pre></div><div class="language-ts vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">src/download.ts</span><pre class="shiki shiki-themes github-light one-dark-pro vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">async</span><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;"> function</span><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;"> download</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">() {</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-light-font-style:inherit;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">  // 下载所需的文件到 root 目录下</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">if</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;"> (</span><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;">require</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">main</span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;"> ===</span><span style="--shiki-light:#005CC5;--shiki-dark:#E5C07B;"> module</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">) {</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">  download</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">()</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">}</span></span></code></pre></div><p>在大多数情况下，我们都推荐使用运行时下载的方案。</p><div class="danger custom-block"><p class="custom-block-title">DANGER</p><p>运行时下载的文档尚未编写。</p></div><h2 id="畅想-实例移动与重命名" tabindex="-1">畅想：实例移动与重命名 <a class="header-anchor" href="#畅想-实例移动与重命名" aria-label="Permalink to &quot;畅想：实例移动与重命名&quot;">​</a></h2><p>其实实现了零占用以后，Koishi 还可以实现一个<s>虽然听起来没什么用但是</s>非常酷的功能：实例移动与重命名。具体来说，任何一个 Koishi 实例可以在自身运行时，将实例目录重命名或移动到其他位置，并且在移动后所有插件继续正常工作。</p><p>这要怎么实现呢？很简单，只需把 <code>baseDir</code> 也视为服务即可。由于所有依赖实例目录的插件都会使用 <code>baseDir</code> 获取实例目录，因此只要监听这个路径的变动，并将 <code>ctx.baseDir</code> 设置为新的路径，即可触发这些插件的重启逻辑。整个流程中，零占用模式保证了移动操作的成功性。</p><p>尽管实现起来非常简单，但目前我们并没有实现这个功能。因为我们希望保留这部分的设计空间，以便在未来并入 Cordis 标准库，并借此实现更多的功能。</p>`,45)]))}const g=i(t,[["render",h]]);export{c as __pageData,g as default};
