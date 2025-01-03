import{_ as s,k as a,m as l,j as e}from"./chunks/framework.CUOHyZ0k.js";const c=JSON.parse('{"title":"从 v3 迁移","description":"","frontmatter":{},"headers":[],"relativePath":"zh-TW/about/migration.md","filePath":"zh-TW/about/migration.md"}'),n={name:"zh-TW/about/migration.md"};function t(h,i,p,o,r,k){return e(),a("div",null,i[0]||(i[0]=[l(`<h1 id="从-v3-迁移" tabindex="-1">从 v3 迁移 <a class="header-anchor" href="#从-v3-迁移" aria-label="Permalink to &quot;从 v3 迁移&quot;">​</a></h1><h2 id="包名变更" tabindex="-1">包名变更 <a class="header-anchor" href="#包名变更" aria-label="Permalink to &quot;包名变更&quot;">​</a></h2><div class="tip custom-block"><p class="custom-block-title">重要</p><p>请开发者直接依赖 koishi 而非 @koishijs/core 进行开发。</p></div><ul><li>koishi-core 与 node 解耦后更名为 @koishijs/core</li><li>koishi-utils 与 node 解耦后更名为 @koishijs/utils</li><li>配置文件加载相关功能独立为 @koishijs/loader</li><li>koishi 为上述库加上 node 相关代码的整合</li><li><strong>现存的官方插件都改为 @koishijs/plugin-xxx</strong></li><li><strong>所有官方适配器也调整为插件</strong>，名称与上一条一致</li><li>koishi-test-utils 被拆分为多个部分： <ul><li>数据库测试相关代码移至 @koishijs/database-tests</li><li>测试工具重构后成为 @koishijs/plugin-mock</li></ul></li></ul><h3 id="插件拆分" tabindex="-1">插件拆分 <a class="header-anchor" href="#插件拆分" aria-label="Permalink to &quot;插件拆分&quot;">​</a></h3><p>为了提供更细粒度的插件功能，我们将部分插件拆分为了多个包进行发布。</p><ul><li>从核心拆分出下列插件： <ul><li><a href="./../plugins/common/help.html">@koishijs/plugin-help</a></li><li><a href="https://common.koishi.chat/plugins/rate-limit.html" target="_blank" rel="noreferrer">koishi-plugin-rate-limit</a></li></ul></li><li>koishi-plugin-assets 被拆分为多个插件： <ul><li><a href="https://assets.koishi.chat/plugins/local.html" target="_blank" rel="noreferrer">koishi-plugin-assets-local</a></li><li><a href="https://assets.koishi.chat/plugins/remote.html" target="_blank" rel="noreferrer">koishi-plugin-assets-remote</a></li><li><a href="https://assets.koishi.chat/plugins/smms.html" target="_blank" rel="noreferrer">koishi-plugin-assets-smms</a></li><li>由于这些插件实现了同一个服务，你只需安装其中的一个即可</li></ul></li><li>koishi-plugin-common 被拆分为多个插件： <ul><li><a href="./../plugins/common/admin.html">@koishijs/plugin-admin</a></li><li><a href="./../plugins/common/bind.html">@koishijs/plugin-bind</a></li><li><a href="./../plugins/common/broadcast.html">@koishijs/plugin-broadcast</a></li><li><a href="./../plugins/common/callme.html">@koishijs/plugin-callme</a></li><li><a href="./../plugins/common/echo.html">@koishijs/plugin-echo</a></li><li><a href="https://common.koishi.chat/plugins/feedback.html" target="_blank" rel="noreferrer">koishi-plugin-feedback</a></li><li><a href="https://common.koishi.chat/plugins/forward.html" target="_blank" rel="noreferrer">koishi-plugin-forward</a></li><li><a href="https://common.koishi.chat/plugins/recall.html" target="_blank" rel="noreferrer">koishi-plugin-recall</a></li><li><a href="https://common.koishi.chat/plugins/repeater.html" target="_blank" rel="noreferrer">koishi-plugin-repeater</a></li><li><a href="https://common.koishi.chat/plugins/respondent.html" target="_blank" rel="noreferrer">koishi-plugin-respondent</a></li><li><a href="https://common.koishi.chat/plugins/sudo.html" target="_blank" rel="noreferrer">koishi-plugin-sudo</a></li><li><a href="https://common.koishi.chat/plugins/verifier.html" target="_blank" rel="noreferrer">koishi-plugin-verifier</a></li></ul></li><li>koishi-plugin-webui 被拆分为多个插件： <ul><li>@koishijs/client (构建工具)</li><li><a href="./../plugins/console/">@koishijs/plugin-console</a></li><li><a href="./../plugins/console/analytics.html">@koishijs/plugin-analytics</a></li><li><a href="./../plugins/console/insight.html">@koishijs/plugin-insight</a></li><li><a href="./../plugins/console/status.html">@koishijs/plugin-status</a></li><li>我们还引入了更多控制台插件，请继续阅读下面的介绍</li></ul></li></ul><h3 id="新增的包" tabindex="-1">新增的包 <a class="header-anchor" href="#新增的包" aria-label="Permalink to &quot;新增的包&quot;">​</a></h3><ul><li>开发相关： <ul><li>@koishijs/plugin-hmr：提供插件级别的热重载功能</li></ul></li><li>命令行相关： <ul><li>create-koishi：可结合 npm init 或 yarn create 使用，用于快速搭建项目</li><li>@koishijs/scripts：用于模板项目的命令行工具</li></ul></li><li>适配器相关： <ul><li><a href="./../plugins/adapter/dingtalk.html">@koishijs/plugin-adapter-dingtalk</a>：钉钉适配器</li><li><a href="./../plugins/adapter/lark.html">@koishijs/plugin-adapter-lark</a>：飞书适配器</li><li><a href="./../plugins/adapter/line.html">@koishijs/plugin-adapter-line</a>：LINE 适配器</li><li><a href="./../plugins/adapter/mail.html">@koishijs/plugin-adapter-mail</a>：邮件适配器</li><li><a href="./../plugins/adapter/matrix.html">@koishijs/plugin-adapter-matrix</a>：Matrix 适配器</li><li><a href="./../plugins/adapter/qq.html">@koishijs/plugin-adapter-qq</a>：QQ 适配器</li><li><a href="./../plugins/adapter/slack.html">@koishijs/plugin-adapter-slack</a>：Slack 适配器</li><li><a href="./../plugins/adapter/wechat-official.html">@koishijs/plugin-adapter-wechat-official</a>：微信公众号适配器</li><li><a href="./../plugins/adapter/wecom.html">@koishijs/plugin-adapter-wecom</a>：企业微信适配器</li><li><a href="./../plugins/adapter/whatsapp.html">@koishijs/plugin-adapter-whatsapp</a>：WhatsApp 微信适配器</li></ul></li><li>数据库相关： <ul><li><a href="./../plugins/database/memory.html">@koishijs/plugin-database-memory</a>：基于内存的数据库实现</li><li><a href="./../plugins/database/sqlite.html">@koishijs/plugin-database-sqlite</a>：SQLite 数据库实现</li></ul></li><li>控制台相关 (部分插件也可脱离控制台使用)： <ul><li><a href="./../plugins/console/auth.html">@koishijs/plugin-auth</a>：用户登录</li><li><a href="./../plugins/console/commands.html">@koishijs/plugin-commands</a>：指令管理</li><li><a href="./../plugins/console/config.html">@koishijs/plugin-config</a>：插件配置</li><li><a href="./../plugins/console/logger.html">@koishijs/plugin-logger</a>：日志管理</li><li><a href="./../plugins/console/market.html">@koishijs/plugin-market</a>：插件市场</li><li><a href="./../plugins/console/sandbox.html">@koishijs/plugin-sandbox</a>：沙盒调试</li></ul></li><li>杂项： <ul><li><a href="./../plugins/common/inspect.html">@koishijs/plugin-inspect</a>：会话信息</li></ul></li></ul><h3 id="移除的包" tabindex="-1">移除的包 <a class="header-anchor" href="#移除的包" aria-label="Permalink to &quot;移除的包&quot;">​</a></h3><p>下列包由于使用场景和用途的限制，不再进行官方维护。这些包会继续留在 Koishi 组织中。</p><ul><li><a href="https://github.com/koishijs/koishi-plugin-chess" target="_blank" rel="noreferrer">koishi-plugin-chess</a> (社区维护)</li><li><a href="https://github.com/koishijs/koishi-plugin-image-search" target="_blank" rel="noreferrer">koishi-plugin-image-search</a> (社区维护)</li><li><s><a href="https://github.com/koishijs/koishi-plugin-tomon" target="_blank" rel="noreferrer">koishi-plugin-tomon</a></s> (已归档)</li><li><a href="https://github.com/koishijs/koishi-plugin-tools" target="_blank" rel="noreferrer">koishi-plugin-tools</a> (拆分后由社区维护)</li><li><s><a href="https://github.com/koishijs/koishi-plugin-monitor" target="_blank" rel="noreferrer">koishi-plugin-monitor</a></s> (已归档)</li></ul><h2 id="核心功能变更" tabindex="-1">核心功能变更 <a class="header-anchor" href="#核心功能变更" aria-label="Permalink to &quot;核心功能变更&quot;">​</a></h2><h3 id="概念用词变更" tabindex="-1">概念用词变更 <a class="header-anchor" href="#概念用词变更" aria-label="Permalink to &quot;概念用词变更&quot;">​</a></h3><p>所有涉及「群组」的概念，对应英文单词从 group 更改为 guild。下面是一些例子：</p><div class="language-diff vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">diff</span><pre class="shiki shiki-themes github-light one-dark-pro vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#B31D28;--shiki-dark:#E06C75;">- session.groupId</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#98C379;">+ session.guild.id</span></span>
<span class="line"><span style="--shiki-light:#B31D28;--shiki-dark:#E06C75;">- bot.getGroupMember()</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#98C379;">+ bot.getGuildMember()</span></span>
<span class="line"><span style="--shiki-light:#B31D28;--shiki-dark:#E06C75;">- ctx.on(&#39;group-request&#39;)</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#98C379;">+ ctx.on(&#39;guild-request&#39;)</span></span></code></pre></div><p>这样修改是为了提供更好的兼容性，减轻 group 本身在多种场合使用所带来的二义性。</p><h3 id="插件变更" tabindex="-1">插件变更 <a class="header-anchor" href="#插件变更" aria-label="Permalink to &quot;插件变更&quot;">​</a></h3><ul><li>移除了 before-connect 和 before-disconnect 事件，请直接使用 ready 和 dispose 事件代替</li><li>新增了 <a href="./../api/utils/schema.html">Schema API</a>，用于描述插件的配置项，下面是一个例子：</li></ul><div class="language-ts vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki shiki-themes github-light one-dark-pro vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-light-font-style:inherit;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">// @errors: 2749</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">export</span><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;"> const</span><span style="--shiki-light:#005CC5;--shiki-dark:#E5C07B;"> name</span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;"> =</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> &#39;foo&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">export</span><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;"> const</span><span style="--shiki-light:#005CC5;--shiki-dark:#E5C07B;"> Config</span><span style="--shiki-light:#D73A49;--shiki-dark:#ABB2BF;">:</span><span style="--shiki-light:#6F42C1;--shiki-dark:#E5C07B;"> Schema</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">&lt;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#E5C07B;">Config</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">&gt; </span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;"> Schema</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">object</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">({</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">  bar</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;">Schema</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">string</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">().</span><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">default</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">&#39;baz&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">).</span><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">description</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">&#39;这是一个配置项&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">),</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">})</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">export</span><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;"> function</span><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;"> apply</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#E36209;--shiki-light-font-style:inherit;--shiki-dark:#E06C75;--shiki-dark-font-style:italic;">ctx</span><span style="--shiki-light:#D73A49;--shiki-dark:#ABB2BF;">:</span><span style="--shiki-light:#6F42C1;--shiki-dark:#E5C07B;"> Context</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">, </span><span style="--shiki-light:#E36209;--shiki-light-font-style:inherit;--shiki-dark:#E06C75;--shiki-dark-font-style:italic;">config</span><span style="--shiki-light:#D73A49;--shiki-dark:#ABB2BF;">:</span><span style="--shiki-light:#6F42C1;--shiki-dark:#E5C07B;"> Config</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">) {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;">  config</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">bar</span><span style="--shiki-light:#6A737D;--shiki-light-font-style:inherit;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;"> // string</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">}</span></span></code></pre></div><p>我们强烈建议开发者在 Koishi v4 插件的开发中为自己的每一个公开插件提供 schema 字段，基于下面的两点好处：</p><ol><li>能够在插件被加载前就对插件的配置项进行类型检查，并提供缺省值和更多预处理</li><li>如果你希望自己的插件能够<strong>在插件市场被动态安装</strong>，那 schema 会作为网页控制台中呈现的配置表单</li></ol><h3 id="适配器变更" tabindex="-1">适配器变更 <a class="header-anchor" href="#适配器变更" aria-label="Permalink to &quot;适配器变更&quot;">​</a></h3><p>适配器现在通过插件的形式导入了：</p><div class="language-ts vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">koishi.ts</span><pre class="shiki shiki-themes github-light one-dark-pro vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-light-font-style:inherit;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">// @errors: 2528</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-light-font-style:inherit;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">// before</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">export</span><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;"> default</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;"> {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">  bots</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">: [ </span><span style="--shiki-light:#6A737D;--shiki-light-font-style:inherit;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">/* 机器人配置项 */</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;"> ],</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">  discord</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">: { </span><span style="--shiki-light:#6A737D;--shiki-light-font-style:inherit;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">/* 适配器配置项 */</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;"> },</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-light-font-style:inherit;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">// after</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">export</span><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;"> default</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;"> {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">  plugins</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">: {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">    discord</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">: {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">      bots</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">: [ </span><span style="--shiki-light:#6A737D;--shiki-light-font-style:inherit;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">/* 机器人配置项 */</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;"> ],</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-light-font-style:inherit;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">      /* 适配器配置项 */</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">    },</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">  },</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">}</span></span></code></pre></div><p>同时我们也调整了一些机器人配置项，并支持了一些全新的特性。下面举一些例子：</p><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">koishi.yml</span><pre class="shiki shiki-themes github-light one-dark-pro vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#E06C75;">plugins</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#E06C75;">  onebot</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">:</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-light-font-style:inherit;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">    # 如果只有一个 bot，你仍然可以像 v3 一样直接写在这里，不用专门提供 bots 数组</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#E06C75;">    protocol</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">http</span><span style="--shiki-light:#6A737D;--shiki-light-font-style:inherit;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">      # 相当于过去的 type: &#39;onebot:http&#39;</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#E06C75;">    disabled</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;">true</span><span style="--shiki-light:#6A737D;--shiki-light-font-style:inherit;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">      # 不启动，可以配合网页控制台动态控制运行状态</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#E06C75;">    platform</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">qq</span><span style="--shiki-light:#6A737D;--shiki-light-font-style:inherit;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">        # 此时账户信息将从 user.qq 而非 user.onebot 访问</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-light-font-style:inherit;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">                        # 你还可以对同一个适配器下的多个 bot 实例设置多个不同的平台</span></span></code></pre></div><h3 id="应用变更" tabindex="-1">应用变更 <a class="header-anchor" href="#应用变更" aria-label="Permalink to &quot;应用变更&quot;">​</a></h3><ul><li>调整了 app.bots 接口的部分用法（参见文档）</li><li>新增了 <code>ctx.http</code> 接口，移除了所有的 <code>axiosConfig</code> 配置</li></ul><p>除此以外，如果你使用 @koishijs/cli，那么有一些额外的配置项变更：</p><ul><li>新增 <code>logger</code> 配置项，包含了过去的 <code>logLevel</code> 等一系列配置，同时支持将输出日志写入本地文件</li></ul><h3 id="数据库变更" tabindex="-1">数据库变更 <a class="header-anchor" href="#数据库变更" aria-label="Permalink to &quot;数据库变更&quot;">​</a></h3><ul><li>接口变更 <ul><li>新增了方法 <code>db.set(table, query, updates)</code></li><li><code>db.update()</code> 更名为 <code>db.upsert()</code>，语法不变</li></ul></li><li>数据结构变更 <ul><li>channel 表使用 <code>platform</code>+<code>id</code> 复合主键进行索引，这意味着 <code>channel.id</code> 语义将发生变化，同时新增了 <code>channel.platform</code></li></ul></li><li>全局接口变更 <ul><li>ORM 相关接口现使用 <code>ctx.model</code> 实现</li></ul></li></ul><h3 id="事件变更" tabindex="-1">事件变更 <a class="header-anchor" href="#事件变更" aria-label="Permalink to &quot;事件变更&quot;">​</a></h3><ul><li>connect → ready (原命名依然可用)</li><li>before-connect → ready</li><li>disconnect → dispose (原命名依然可用)</li><li>before-disconnect → dispose</li><li>before-command → command/before-execute (原命名依然可用)</li></ul><h2 id="其他变更" tabindex="-1">其他变更 <a class="header-anchor" href="#其他变更" aria-label="Permalink to &quot;其他变更&quot;">​</a></h2><h3 id="koishijs-core" tabindex="-1">@koishijs/core <a class="header-anchor" href="#koishijs-core" aria-label="Permalink to &quot;@koishijs/core&quot;">​</a></h3><ul><li><code>ctx.all()</code> 更名为 <code>ctx.any()</code>，同时新增了 <code>ctx.never()</code></li><li>移除了 <code>processMessage</code> 配置项，即取消了内置的将中文字符替换为简体字的机制</li><li>废弃了 <code>Command.userFields()</code> 和 <code>Command.channelFields()</code> 方法，请使用对应的事件 <code>command/before-attach-user</code> 和 <code>command/before-attach-channel</code> (注意这里废弃的只是静态方法，实例方法依然可用)</li></ul><h3 id="koishijs-utils" tabindex="-1">@koishijs/utils <a class="header-anchor" href="#koishijs-utils" aria-label="Permalink to &quot;@koishijs/utils&quot;">​</a></h3><ul><li>移除了 <code>Random.uuid()</code> 方法，新增了 <code>Random.id()</code> 方法</li><li>移除了 <code>simplify()</code> 和 <code>traditionalize()</code> 方法，请使用 <a href="https://www.npmjs.com/package/simplify-chinese" target="_blank" rel="noreferrer">simplify-chinese</a> 这个包</li><li>Observer API 改动：所有 <code>_</code> 前缀替换为 <code>$</code> 前缀，例如 <code>session.user.$update()</code></li></ul>`,40)]))}const g=s(n,[["render",t]]);export{c as __pageData,g as default};
