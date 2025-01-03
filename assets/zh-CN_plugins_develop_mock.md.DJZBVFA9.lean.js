import{_ as o,k as t,m as i,j as a}from"./chunks/framework.CUOHyZ0k.js";const k=JSON.parse('{"title":"@koishijs/plugin-mock","description":"","frontmatter":{},"headers":[],"relativePath":"zh-CN/plugins/develop/mock.md","filePath":"zh-CN/plugins/develop/mock.md"}'),l={name:"zh-CN/plugins/develop/mock.md"};function n(c,e,r,s,d,h){return a(),t("div",null,e[0]||(e[0]=[i('<h1 id="koishijs-plugin-mock" tabindex="-1">@koishijs/plugin-mock <a class="header-anchor" href="#koishijs-plugin-mock" aria-label="Permalink to &quot;@koishijs/plugin-mock&quot;">​</a></h1><div class="tip custom-block"><p class="custom-block-title">TIP</p><p>使用方法请参见 <a href="./../../cookbook/practice/testing.html">开发 &gt; 单元测试</a> 章节。</p></div><p>@koishijs/plugin-mock 包含了被 Koishi 使用的测试工具。它提供了一个名为 <code>mock</code> 的服务，可用于模拟事件上报、网络请求等等。</p><h2 id="类-mock" tabindex="-1">类：Mock <a class="header-anchor" href="#类-mock" aria-label="Permalink to &quot;类：Mock&quot;">​</a></h2><h3 id="mock-webhook" tabindex="-1">mock.webhook <a class="header-anchor" href="#mock-webhook" aria-label="Permalink to &quot;mock.webhook&quot;">​</a></h3><ul><li>类型: <a href="#类-webhook"><code>Webhook</code></a></li></ul><p>用于模拟网络请求。</p><h3 id="mock-client" tabindex="-1">mock.client(userId, channelId?) <a class="header-anchor" href="#mock-client" aria-label="Permalink to &quot;mock.client(userId, channelId?)&quot;">​</a></h3><ul><li><strong>userId:</strong> <code>string</code> 用户 ID</li><li><strong>channelId:</strong> <code>string</code> 频道 ID</li><li>返回值: <a href="#类-client"><code>Client</code></a></li></ul><p>创建一个客户端。</p><h3 id="mock-receive" tabindex="-1">mock.receive(event) <a class="header-anchor" href="#mock-receive" aria-label="Permalink to &quot;mock.receive(event)&quot;">​</a></h3><ul><li><strong>event:</strong> <a href="./../../api/core/session.html#session-event"><code>Event</code></a> 事件体</li><li>返回值: <code>string</code></li></ul><p>触发会话事件。</p><h3 id="mock-inituser" tabindex="-1">mock.initUser(id, authority?, data?) <a class="header-anchor" href="#mock-inituser" aria-label="Permalink to &quot;mock.initUser(id, authority?, data?)&quot;">​</a></h3><ul><li><strong>id:</strong> <code>string</code> 用户 ID</li><li><strong>authority:</strong> <code>number</code> 权限等级</li><li><strong>data:</strong> <code>Partial&lt;User&gt;</code> 其他用户数据</li></ul><p>在数据库中初始化一个用户。等价于 <code>database.create(&#39;user&#39;, { mock: id, authority, ...data })</code>。</p><h3 id="mock-initchannel" tabindex="-1">mock.initChannel(id, assignee?, data?) <a class="header-anchor" href="#mock-initchannel" aria-label="Permalink to &quot;mock.initChannel(id, assignee?, data?)&quot;">​</a></h3><ul><li><strong>id:</strong> <code>string</code> 频道 ID</li><li><strong>assignee:</strong> <code>string</code> 频道代理人</li><li><strong>data:</strong> <code>Partial&lt;Channel&gt;</code> 其他频道数据</li></ul><p>在数据库中初始化一个频道。等价于 <code>database.create(&#39;channel&#39;, { platform: &#39;mock&#39;, id, assignee, ...data })</code>。</p><h2 id="类-client" tabindex="-1">类：Client <a class="header-anchor" href="#类-client" aria-label="Permalink to &quot;类：Client&quot;">​</a></h2><p><strong>客户端 (Client)</strong> 是对发往同一上下文的多次消息的一个抽象。它使用 <code>mock.client()</code> 方法创建，并借助 <code>mock.receive()</code> 实现其功能。</p><div class="warning custom-block"><p class="custom-block-title">WARNING</p><p>这个类下的大部分方法的返回都基于 <a href="./../../api/core/session.html#session-send">session.send</a> 方法和 <a href="./../../api/core/events.html#事件-middleware"><code>middleware</code></a> 事件。在提供了极大方便的同时，会话也存在一些限制。如果你的插件存在以下几种特殊情况之一：</p><ul><li>使用了异步的 message 事件监听器</li><li>中间件和指令中可能存在未阻塞的异步操作</li><li>直接调用 Bot API 而非 session.send</li></ul><p>这个类的方法可能会返回预料之外的结果。当然，如果要测试这些特殊情况，我们也有其他的解决方案。</p></div><h3 id="client-receive" tabindex="-1">client.receive(content) <a class="header-anchor" href="#client-receive" aria-label="Permalink to &quot;client.receive(content)&quot;">​</a></h3><ul><li><strong>content:</strong> <code>string</code> 要发送的信息</li><li>返回值: <code>Promise&lt;string[]&gt;</code> 收到的回复列表</li></ul><p>模拟发送一条消息。</p><h3 id="client-shouldreply" tabindex="-1">client.shouldReply(content, reply?) <a class="header-anchor" href="#client-shouldreply" aria-label="Permalink to &quot;client.shouldReply(content, reply?)&quot;">​</a></h3><ul><li><strong>content:</strong> <code>string</code> 要发送给机器人的信息</li><li><strong>reply:</strong> <code>string | RegExp | (string | RegExp)[]</code> 应有的回复，如果略去则不会进行比较</li><li>返回值: <code>Promise&lt;void&gt;</code></li></ul><p>断言某条信息应存在某些回复。</p><h3 id="client-shouldnotreply" tabindex="-1">client.shouldNotReply(content) <a class="header-anchor" href="#client-shouldnotreply" aria-label="Permalink to &quot;client.shouldNotReply(content)&quot;">​</a></h3><ul><li><strong>content:</strong> <code>string</code> 要发送给机器人的信息</li><li>返回值: <code>Promise&lt;void&gt;</code></li></ul><p>断言某条信息不应存在任何回复。</p><h2 id="类-webhook" tabindex="-1">类：Webhook <a class="header-anchor" href="#类-webhook" aria-label="Permalink to &quot;类：Webhook&quot;">​</a></h2><p><strong>网络钩子 (Webhook)</strong> 可用于模拟到 Koishi 服务器的网络请求。</p><h3 id="webhook-get" tabindex="-1">webhook.get(path, headers?) <a class="header-anchor" href="#webhook-get" aria-label="Permalink to &quot;webhook.get(path, headers?)&quot;">​</a></h3><ul><li><strong>path:</strong> <code>string</code> 请求路径</li><li><strong>headers:</strong> <code>object</code> 请求头</li></ul><p>模拟 GET 请求。</p><h3 id="webhook-post" tabindex="-1">webhook.post(path, body, headers?) <a class="header-anchor" href="#webhook-post" aria-label="Permalink to &quot;webhook.post(path, body, headers?)&quot;">​</a></h3><ul><li><strong>path:</strong> <code>string</code> 请求路径</li><li><strong>body:</strong> <code>string</code> 请求正文</li><li><strong>headers:</strong> <code>object</code> 请求头</li></ul><p>模拟 POST 请求。</p>',39)]))}const u=o(l,[["render",n]]);export{k as __pageData,u as default};
