import{_ as o,k as t,m as a,j as l}from"./chunks/framework.CUOHyZ0k.js";const u=JSON.parse('{"title":"机器人 (Bot)","description":"","frontmatter":{},"headers":[],"relativePath":"zh-CN/api/core/bot.md","filePath":"zh-CN/api/core/bot.md"}'),r={name:"zh-CN/api/core/bot.md"};function i(s,e,c,d,h,b){return l(),t("div",null,e[0]||(e[0]=[a('<h1 id="机器人" tabindex="-1">机器人 (Bot) <a class="header-anchor" href="#机器人" aria-label="Permalink to &quot;机器人 (Bot)&quot;">​</a></h1><div class="tip custom-block"><p class="custom-block-title">TIP</p><p>参见：<a href="./../../guide/adapter/bot.html">开发 &gt; 跨平台 &gt; 实现机器人</a></p></div><p><strong>机器人 (Bot)</strong> 是适配器的核心，它将不同平台的 API 封装成统一的格式供 Koishi 使用。而不同的适配器也可以自行扩展 Bot 实例上的属性和方法。</p><h2 id="实例属性" tabindex="-1">实例属性 <a class="header-anchor" href="#实例属性" aria-label="Permalink to &quot;实例属性&quot;">​</a></h2><h3 id="bot-adapter" tabindex="-1">bot.adapter <a class="header-anchor" href="#bot-adapter" aria-label="Permalink to &quot;bot.adapter&quot;">​</a></h3><ul><li>类型: <a href="./adapter.html"><code>Adapter</code></a></li></ul><p>当前 <code>Bot</code> 所在的 <a href="./adapter.html">Adapter</a> 实例。</p><h3 id="bot-config" tabindex="-1">bot.config <a class="header-anchor" href="#bot-config" aria-label="Permalink to &quot;bot.config&quot;">​</a></h3><ul><li>类型: <code>object</code></li></ul><p>构造 <code>Bot</code> 实例时所使用的配置项。</p><h3 id="bot-ctx" tabindex="-1">bot.ctx <a class="header-anchor" href="#bot-ctx" aria-label="Permalink to &quot;bot.ctx&quot;">​</a></h3><ul><li>类型: <a href="./context.html"><code>Context</code></a></li></ul><p>当前 <code>Bot</code> 所在的 <a href="./context.html">Context</a> 实例。</p><h3 id="bot-internal" tabindex="-1">bot.internal <a class="header-anchor" href="#bot-internal" aria-label="Permalink to &quot;bot.internal&quot;">​</a></h3><ul><li>类型: <code>object</code></li></ul><p>当前机器人的 <a href="./../../guide/adapter/bot.html#实现内部接口">内部接口</a>。</p><h3 id="bot-platform" tabindex="-1">bot.platform <a class="header-anchor" href="#bot-platform" aria-label="Permalink to &quot;bot.platform&quot;">​</a></h3><ul><li>类型: <code>string</code></li></ul><p>当前 <code>Bot</code> 的 <a href="./../glossary.html#platform">平台名称</a>。</p><h3 id="bot-selfid" tabindex="-1">bot.selfId <a class="header-anchor" href="#bot-selfid" aria-label="Permalink to &quot;bot.selfId&quot;">​</a></h3><ul><li>类型: <code>string</code></li></ul><p>当前 <code>Bot</code> 的平台账号。</p><h3 id="bot-status" tabindex="-1">bot.status <a class="header-anchor" href="#bot-status" aria-label="Permalink to &quot;bot.status&quot;">​</a></h3><ul><li>类型: <a href="./../resources/login.html"><code>Status</code></a></li></ul><p>当前 <code>Bot</code> 的登录状态。</p><h3 id="bot-user" tabindex="-1">bot.user <a class="header-anchor" href="#bot-user" aria-label="Permalink to &quot;bot.user&quot;">​</a></h3><ul><li>类型: <a href="./../resources/user.html"><code>User</code></a></li></ul><p>当前 <code>Bot</code> 的用户信息。</p><h2 id="适配器相关" tabindex="-1">适配器相关 <a class="header-anchor" href="#适配器相关" aria-label="Permalink to &quot;适配器相关&quot;">​</a></h2><h3 id="bot-start" tabindex="-1">bot.start() <a class="header-anchor" href="#bot-start" aria-label="Permalink to &quot;bot.start()&quot;">​</a></h3><ul><li>返回值: <code>Promise&lt;void&gt;</code></li></ul><p>启动机器人。这个方法会在插件被加载时自动被调用，通常你不需要手动调用它。</p><h3 id="bot-stop" tabindex="-1">bot.stop() <a class="header-anchor" href="#bot-stop" aria-label="Permalink to &quot;bot.stop()&quot;">​</a></h3><ul><li>返回值: <code>Promise&lt;void&gt;</code></li></ul><p>停止机器人的运行，但不移除该实例。你可以后续通过 <code>bot.start()</code> 重新启动机器人。</p><p>这个方法会在插件被卸载时自动被调用，通常你不需要手动调用它。</p><h3 id="bot-dispatch" tabindex="-1">bot.dispatch(session) <a class="header-anchor" href="#bot-dispatch" aria-label="Permalink to &quot;bot.dispatch(session)&quot;">​</a></h3><ul><li><strong>session:</strong> <a href="./session.html"><code>Session</code></a> 会话实例</li></ul><p>触发一个会话事件。</p><h3 id="bot-session" tabindex="-1">bot.session(event?) <a class="header-anchor" href="#bot-session" aria-label="Permalink to &quot;bot.session(event?)&quot;">​</a></h3><ul><li><strong>event:</strong> <a href="./session.html#session-event"><code>Event</code></a> 会话数据</li><li>返回值: <a href="./session.html"><code>Session</code></a></li></ul><p>创建一个新的会话实例。</p><h3 id="bot-online" tabindex="-1">bot.online() <a class="header-anchor" href="#bot-online" aria-label="Permalink to &quot;bot.online()&quot;">​</a></h3><p>修改机器人的状态为在线。</p><h3 id="bot-offline" tabindex="-1">bot.offline(error?) <a class="header-anchor" href="#bot-offline" aria-label="Permalink to &quot;bot.offline(error?)&quot;">​</a></h3><ul><li><strong>error:</strong> <code>Error</code> 错误信息</li></ul><p>修改机器人的状态为离线，并记录错误信息。</p><h2 id="通用-api" tabindex="-1">通用 API <a class="header-anchor" href="#通用-api" aria-label="Permalink to &quot;通用 API&quot;">​</a></h2><p>通用 API 由适配器实现。它们会在相应的资源页面中介绍。</p><ul><li><a href="./../resources/message.html#bot-broadcast"><code>bot.broadcast()</code></a></li><li><a href="./../resources/reaction.html#bot-clearreaction"><code>bot.clearReaction()</code></a></li><li><a href="./../resources/channel.html#bot-createchannel"><code>bot.createChannel()</code></a></li><li><a href="./../resources/channel.html#bot-createdirectchannel"><code>bot.createDirectChannel()</code></a></li><li><a href="./../resources/role.html#bot-createguildrole"><code>bot.createGuildRole()</code></a></li><li><a href="./../resources/reaction.html#bot-createreaction"><code>bot.createReaction()</code></a></li><li><a href="./../resources/role.html#bot-deletechannel"><code>bot.deleteChannel()</code></a></li><li><a href="./../resources/role.html#bot-deleteguildrole"><code>bot.deleteGuildRole()</code></a></li><li><a href="./../resources/reaction.html#bot-deletereaction"><code>bot.deleteReaction()</code></a></li><li><a href="./../resources/message.html#bot-deletemessage"><code>bot.deleteMessage()</code></a></li><li><a href="./../resources/message.html#bot-editmessage"><code>bot.editMessage()</code></a></li><li><a href="./../resources/channel.html#bot-getchannel"><code>bot.getChannel()</code></a></li><li><a href="./../resources/channel.html#bot-getchanneliter"><code>bot.getChannelIter()</code></a></li><li><a href="./../resources/channel.html#bot-getchannellist"><code>bot.getChannelList()</code></a></li><li><a href="./../resources/user.html#bot-getfrienditer"><code>bot.getFriendIter()</code></a></li><li><a href="./../resources/user.html#bot-getfriendlist"><code>bot.getFriendList()</code></a></li><li><a href="./../resources/guild.html#bot-getguild"><code>bot.getGuild()</code></a></li><li><a href="./../resources/guild.html#bot-getguilditer"><code>bot.getGuildIter()</code></a></li><li><a href="./../resources/guild.html#bot-getguildlist"><code>bot.getGuildList()</code></a></li><li><a href="./../resources/member.html#bot-getguildmember"><code>bot.getGuildMember()</code></a></li><li><a href="./../resources/member.html#bot-getguildmemberiter"><code>bot.getGuildMemberIter()</code></a></li><li><a href="./../resources/member.html#bot-getguildmemberlist"><code>bot.getGuildMemberList()</code></a></li><li><a href="./../resources/role.html#bot-getguildroleiter"><code>bot.getGuildRoleIter()</code></a></li><li><a href="./../resources/role.html#bot-getguildrolelist"><code>bot.getGuildRoleList()</code></a></li><li><a href="./../resources/login.html#bot-getlogin"><code>bot.getLogin()</code></a></li><li><a href="./../resources/message.html#bot-getmessage"><code>bot.getMessage()</code></a></li><li><a href="./../resources/message.html#bot-getmessageiter"><code>bot.getMessageIter()</code></a></li><li><a href="./../resources/message.html#bot-getmessagelist"><code>bot.getMessageList()</code></a></li><li><a href="./../resources/reaction.html#bot-getreactioniter"><code>bot.getReactionIter()</code></a></li><li><a href="./../resources/reaction.html#bot-getreactionlist"><code>bot.getReactionList()</code></a></li><li><a href="./../resources/user.html#bot-getuser"><code>bot.getUser()</code></a></li><li><a href="./../resources/user.html#bot-handlefriendrequest"><code>bot.handleFriendRequest()</code></a></li><li><a href="./../resources/member.html#bot-handleguildmemberrequest"><code>bot.handleGuildMemberRequest()</code></a></li><li><a href="./../resources/guild.html#bot-handleguildrequest"><code>bot.handleGuildRequest()</code></a></li><li><a href="./../resources/member.html#bot-kickguildmember"><code>bot.kickGuildMember()</code></a></li><li><a href="./../resources/member.html#bot-muteguildmember"><code>bot.muteGuildMember()</code></a></li><li><a href="./../resources/message.html#bot-sendmessage"><code>bot.sendMessage()</code></a></li><li><a href="./../resources/message.html#bot-sendprivatemessage"><code>bot.sendPrivateMessage()</code></a></li><li><a href="./../resources/role.html#bot-setguildmemberrole"><code>bot.setGuildMemberRole()</code></a></li><li><a href="./../resources/role.html#bot-unsetguildmemberrole"><code>bot.unsetGuildMemberRole()</code></a></li><li><a href="./../resources/role.html#bot-updatechannel"><code>bot.updateChannel()</code></a></li><li><a href="./../resources/role.html#bot-updateguildrole"><code>bot.updateGuildRole()</code></a></li></ul>',50)]))}const m=o(r,[["render",i]]);export{u as __pageData,m as default};
