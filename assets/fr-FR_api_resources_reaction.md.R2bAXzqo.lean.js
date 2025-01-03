import{_ as s,k as d,l as t,B as o,f as i,y as n,m as r,A as l,j as c}from"./chunks/framework.CUOHyZ0k.js";const R=JSON.parse('{"title":"表态 (Reaction) 实验性","description":"","frontmatter":{},"headers":[],"relativePath":"fr-FR/api/resources/reaction.md","filePath":"fr-FR/api/resources/reaction.md"}'),g={name:"fr-FR/api/resources/reaction.md"},m={id:"表态",tabindex:"-1"},I={id:"bot-getreactioniter",tabindex:"-1"};function h(b,e,u,p,f,x){const a=l("badge");return c(),d("div",null,[t("h1",m,[e[1]||(e[1]=o("表态 (Reaction) ")),i(a,{type:"warning"},{default:n(()=>e[0]||(e[0]=[o("实验性")])),_:1}),e[2]||(e[2]=o()),e[3]||(e[3]=t("a",{class:"header-anchor",href:"#表态","aria-label":'Permalink to "表态 (Reaction) <badge type="warning">实验性</badge>"'},"​",-1))]),e[8]||(e[8]=r('<div class="warning custom-block"><p class="custom-block-title">WARNING</p><p>这是一个实验性功能，未来可能发生改动。</p></div><h2 id="api" tabindex="-1">API <a class="header-anchor" href="#api" aria-label="Permalink to &quot;API&quot;">​</a></h2><h3 id="bot-createreaction" tabindex="-1">bot.createReaction(channelId, messageId, emoji) <a class="header-anchor" href="#bot-createreaction" aria-label="Permalink to &quot;bot.createReaction(channelId, messageId, emoji)&quot;">​</a></h3><ul><li><strong>channelId:</strong> <code>string</code> 频道 ID</li><li><strong>messageId:</strong> <code>string</code> 消息 ID</li><li><strong>emoji:</strong> <code>string</code> 表态名称</li><li>返回值: <code>Promise&lt;void&gt;</code></li></ul><p>向特定消息添加表态。</p><h3 id="bot-deletereaction" tabindex="-1">bot.deleteReaction(channelId, messageId, emoji, userId?) <a class="header-anchor" href="#bot-deletereaction" aria-label="Permalink to &quot;bot.deleteReaction(channelId, messageId, emoji, userId?)&quot;">​</a></h3><ul><li><strong>channelId:</strong> <code>string</code> 频道 ID</li><li><strong>messageId:</strong> <code>string</code> 消息 ID</li><li><strong>emoji:</strong> <code>string</code> 表态名称</li><li><strong>userId:</strong> <code>string</code> 用户 ID</li><li>返回值: <code>Promise&lt;void&gt;</code></li></ul><p>从特定消息删除某个用户添加的特定表态。如果没有传入用户 ID 则表示删除自己的表态。</p><h3 id="bot-clearreaction" tabindex="-1">bot.clearReaction(channelId, messageId, emoji?) <a class="header-anchor" href="#bot-clearreaction" aria-label="Permalink to &quot;bot.clearReaction(channelId, messageId, emoji?)&quot;">​</a></h3><ul><li><strong>channelId:</strong> <code>string</code> 频道 ID</li><li><strong>messageId:</strong> <code>string</code> 消息 ID</li><li><strong>emoji:</strong> <code>string</code> 表态名称</li><li>返回值: <code>Promise&lt;void&gt;</code></li></ul><p>从特定消息清除某个特定表态。如果没有传入表态名称则表示清除所有表态。</p><h3 id="bot-getreactionlist" tabindex="-1">bot.getReactionList(channelId, messageId, emoji, next?) <a class="header-anchor" href="#bot-getreactionlist" aria-label="Permalink to &quot;bot.getReactionList(channelId, messageId, emoji, next?)&quot;">​</a></h3><ul><li><strong>channelId:</strong> <code>string</code> 频道 ID</li><li><strong>messageId:</strong> <code>string</code> 消息 ID</li><li><strong>emoji:</strong> <code>string</code> 表态名称</li><li><strong>next:</strong> <code>string</code> 分页令牌</li><li>返回值: <code>Promise&lt;List&lt;User&gt;&gt;</code></li></ul><p>获取添加特定消息的特定表态的用户列表。</p>',14)),t("h3",I,[e[5]||(e[5]=o("bot.getReactionIter(channelId, messageId, emoji) ")),i(a,null,{default:n(()=>e[4]||(e[4]=[o("内置")])),_:1}),e[6]||(e[6]=o()),e[7]||(e[7]=t("a",{class:"header-anchor",href:"#bot-getreactioniter","aria-label":'Permalink to "bot.getReactionIter(channelId, messageId, emoji) <badge>内置</badge>"'},"​",-1))]),e[9]||(e[9]=r('<ul><li><strong>channelId:</strong> <code>string</code> 频道 ID</li><li><strong>messageId:</strong> <code>string</code> 消息 ID</li><li><strong>emoji:</strong> <code>string</code> 表态名称</li><li>返回值: <code>AsyncIterable&lt;User&gt;</code> 异步迭代器</li></ul><p>获取添加特定消息的特定表态的用户的异步迭代器。</p><h2 id="事件" tabindex="-1">事件 <a class="header-anchor" href="#事件" aria-label="Permalink to &quot;事件&quot;">​</a></h2><h3 id="reaction-added" tabindex="-1">reaction-added <a class="header-anchor" href="#reaction-added" aria-label="Permalink to &quot;reaction-added&quot;">​</a></h3><ul><li><strong>session:</strong> <code>Session</code> 会话对象</li><li>触发方式: emit</li></ul><p>添加表态时触发。</p><h3 id="reaction-removed" tabindex="-1">reaction-removed <a class="header-anchor" href="#reaction-removed" aria-label="Permalink to &quot;reaction-removed&quot;">​</a></h3><ul><li><strong>session:</strong> <code>Session</code> 会话对象</li><li>触发方式: emit</li></ul><p>删除表态时触发。</p>',9))])}const j=s(g,[["render",h]]);export{R as __pageData,j as default};
