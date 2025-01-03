import{_ as a,k as e,m as t,j as i}from"./chunks/framework.CUOHyZ0k.js";const k=JSON.parse('{"title":"@koishijs/plugin-adapter-kook","description":"","frontmatter":{},"headers":[],"relativePath":"ja-JP/plugins/adapter/kook.md","filePath":"ja-JP/plugins/adapter/kook.md"}'),l={name:"ja-JP/plugins/adapter/kook.md"};function r(n,o,s,p,d,h){return i(),e("div",null,o[0]||(o[0]=[t('<h1 id="koishijs-plugin-adapter-kook" tabindex="-1">@koishijs/plugin-adapter-kook <a class="header-anchor" href="#koishijs-plugin-adapter-kook" aria-label="Permalink to &quot;@koishijs/plugin-adapter-kook&quot;">​</a></h1><h2 id="接入方法" tabindex="-1">接入方法 <a class="header-anchor" href="#接入方法" aria-label="Permalink to &quot;接入方法&quot;">​</a></h2><ol><li>前往 <a href="https://developer.kookapp.cn/" target="_blank" rel="noreferrer">开发者平台</a>，选择「机器人」并点击「新建」</li><li>根据自身需要，在「机器人连接模式」中选择 Webhook 或 WebSocket 中的一种： <ul><li>如果是 Webhook，请记下页面中的 <code>token</code> 和 <code>verify_token</code> (请注意不要泄露)，并作为机器人的配置项，同时让 Koishi 暴露一个 URL，填入下方的 Callback URL 中，启动 Koishi 后点击「机器人上线」</li><li>如果是 WebSocket，则只需记录 <code>token</code> (请注意不要泄露) 并作为机器人的配置项即可，你可以在任何时候启动 Koishi</li></ul></li></ol><h2 id="基础配置项" tabindex="-1">基础配置项 <a class="header-anchor" href="#基础配置项" aria-label="Permalink to &quot;基础配置项&quot;">​</a></h2><h3 id="options-protocol" tabindex="-1">options.protocol <a class="header-anchor" href="#options-protocol" aria-label="Permalink to &quot;options.protocol&quot;">​</a></h3><ul><li>可选值: http, ws</li></ul><p>要使用的协议类型。</p><h3 id="options-token" tabindex="-1">options.token <a class="header-anchor" href="#options-token" aria-label="Permalink to &quot;options.token&quot;">​</a></h3><ul><li>类型: <code>string</code></li></ul><p>机器人账户的令牌。</p><h3 id="options-endpoint" tabindex="-1">options.endpoint <a class="header-anchor" href="#options-endpoint" aria-label="Permalink to &quot;options.endpoint&quot;">​</a></h3><ul><li>类型: <code>string</code></li><li>默认值: <code>&#39;https://www.kookapp.cn/api/v3&#39;</code></li></ul><p>要请求的 API 网址。</p><h3 id="options-attachmode" tabindex="-1">options.attachMode <a class="header-anchor" href="#options-attachmode" aria-label="Permalink to &quot;options.attachMode&quot;">​</a></h3><ul><li>类型: <code>&#39;separate&#39; | &#39;mixed&#39; | &#39;card&#39;</code></li><li>默认值: <code>&#39;separate&#39;</code></li></ul><p>控制当尝试发送含有<a href="./../../api/message/elements.html#资源元素">资源元素</a>的消息时的行为。</p><ul><li><strong>separate:</strong> 每一个资源消息段，以及资源消息段之间的文本都将单独发送一条消息</li><li><strong>mixed:</strong> 当要发送的内容中含有多个资源消息段或资源消息段和文本的混合时，发送卡片消息；否则将单独发送资源消息段</li><li><strong>card:</strong> 当要发送的内容中含有资源消息段，则以卡片消息的形式发送</li></ul><h2 id="http-配置项" tabindex="-1">HTTP 配置项 <a class="header-anchor" href="#http-配置项" aria-label="Permalink to &quot;HTTP 配置项&quot;">​</a></h2><h3 id="options-verifytoken" tabindex="-1">options.verifyToken <a class="header-anchor" href="#options-verifytoken" aria-label="Permalink to &quot;options.verifyToken&quot;">​</a></h3><ul><li>类型: <code>string</code></li></ul><p>机器人账户的验证令牌。</p><h3 id="options-path" tabindex="-1">options.path <a class="header-anchor" href="#options-path" aria-label="Permalink to &quot;options.path&quot;">​</a></h3><ul><li>类型：<code>string</code></li><li>默认值：<code>&#39;/kook&#39;</code></li></ul><p>服务器监听的路径。</p><h2 id="ws-配置项" tabindex="-1">WS 配置项 <a class="header-anchor" href="#ws-配置项" aria-label="Permalink to &quot;WS 配置项&quot;">​</a></h2><p>包括全部的 <a href="./../../api/core/adapter.html#类-adapter-wsclient"><code>WsClient</code></a> 选项。</p>',26)]))}const u=a(l,[["render",r]]);export{k as __pageData,u as default};
