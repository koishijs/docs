import{_ as l,k as d,m as a,l as t,B as i,f as o,y as r,A as n,j as u}from"./chunks/framework.CUOHyZ0k.js";const x=JSON.parse('{"title":"群组 (Guild)","description":"","frontmatter":{},"headers":[],"relativePath":"zh-TW/api/resources/guild.md","filePath":"zh-TW/api/resources/guild.md"}'),h={name:"zh-TW/api/resources/guild.md"},g={id:"bot-getguilditer",tabindex:"-1"};function p(c,e,k,b,m,q){const s=n("badge");return u(),d("div",null,[e[4]||(e[4]=a(`<h1 id="群组" tabindex="-1">群组 (Guild) <a class="header-anchor" href="#群组" aria-label="Permalink to &quot;群组 (Guild)&quot;">​</a></h1><h2 id="类型定义" tabindex="-1">类型定义 <a class="header-anchor" href="#类型定义" aria-label="Permalink to &quot;类型定义&quot;">​</a></h2><div class="language-ts vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki shiki-themes github-light one-dark-pro vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">export</span><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;"> interface</span><span style="--shiki-light:#6F42C1;--shiki-dark:#E5C07B;"> Guild</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;"> {</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#E06C75;">  id</span><span style="--shiki-light:#D73A49;--shiki-dark:#ABB2BF;">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#E5C07B;"> string</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#E06C75;">  name</span><span style="--shiki-light:#D73A49;--shiki-dark:#ABB2BF;">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#E5C07B;"> string</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">}</span></span></code></pre></div><h2 id="api" tabindex="-1">API <a class="header-anchor" href="#api" aria-label="Permalink to &quot;API&quot;">​</a></h2><h3 id="bot-getguild" tabindex="-1">bot.getGuild(guildId) <a class="header-anchor" href="#bot-getguild" aria-label="Permalink to &quot;bot.getGuild(guildId)&quot;">​</a></h3><ul><li><strong>guildId:</strong> <code>string</code> 群组 ID</li><li>返回值: <code>Promise&lt;Guild&gt;</code> 群组信息</li></ul><p>获取群组信息。</p><h3 id="bot-getguildlist" tabindex="-1">bot.getGuildList(next?) <a class="header-anchor" href="#bot-getguildlist" aria-label="Permalink to &quot;bot.getGuildList(next?)&quot;">​</a></h3><ul><li><strong>next:</strong> <code>string</code> 分页令牌</li><li>返回值: <code>Promise&lt;List&lt;Guild&gt;&gt;</code> 群组列表</li></ul><p>获取机器人加入的群组列表。</p>`,10)),t("h3",g,[e[1]||(e[1]=i("bot.getGuildIter() ")),o(s,null,{default:r(()=>e[0]||(e[0]=[i("内置")])),_:1}),e[2]||(e[2]=i()),e[3]||(e[3]=t("a",{class:"header-anchor",href:"#bot-getguilditer","aria-label":'Permalink to "bot.getGuildIter() <badge>内置</badge>"'},"​",-1))]),e[5]||(e[5]=a('<ul><li>返回值: <code>AsyncIterable&lt;Guild&gt;</code> 异步迭代器</li></ul><p>获取机器人加入的群组列表的异步迭代器。</p><h3 id="bot-handleguildrequest" tabindex="-1">bot.handleGuildRequest(messageId, approve, comment?) <a class="header-anchor" href="#bot-handleguildrequest" aria-label="Permalink to &quot;bot.handleGuildRequest(messageId, approve, comment?)&quot;">​</a></h3><ul><li><strong>messageId:</strong> <code>string</code> 请求 ID</li><li><strong>approve:</strong> <code>boolean</code> 是否通过请求</li><li><strong>comment:</strong> <code>string</code> 备注信息</li><li>返回值: <code>Promise&lt;void&gt;</code></li></ul><p>处理来自群组的邀请。</p><h2 id="事件" tabindex="-1">事件 <a class="header-anchor" href="#事件" aria-label="Permalink to &quot;事件&quot;">​</a></h2><h3 id="guild-added" tabindex="-1">guild-added <a class="header-anchor" href="#guild-added" aria-label="Permalink to &quot;guild-added&quot;">​</a></h3><ul><li><strong>session:</strong> <code>Session</code> 会话对象</li><li>触发方式: emit</li></ul><p>加入群组时触发。</p><h3 id="guild-updated" tabindex="-1">guild-updated <a class="header-anchor" href="#guild-updated" aria-label="Permalink to &quot;guild-updated&quot;">​</a></h3><ul><li><strong>session:</strong> <code>Session</code> 会话对象</li><li>触发方式: emit</li></ul><p>群组信息更新时触发。</p><h3 id="guild-removed" tabindex="-1">guild-removed <a class="header-anchor" href="#guild-removed" aria-label="Permalink to &quot;guild-removed&quot;">​</a></h3><ul><li><strong>session:</strong> <code>Session</code> 会话对象</li><li>触发方式: emit</li></ul><p>群组成员退出群组时触发。</p><h3 id="guild-request" tabindex="-1">guild-request <a class="header-anchor" href="#guild-request" aria-label="Permalink to &quot;guild-request&quot;">​</a></h3><ul><li><strong>session:</strong> <code>Session</code> 会话对象</li><li>触发方式: emit</li></ul><p>接收到新的入群邀请时触发。</p>',18))])}const B=l(h,[["render",p]]);export{x as __pageData,B as default};
