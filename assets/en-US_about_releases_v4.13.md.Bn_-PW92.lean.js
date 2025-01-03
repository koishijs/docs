import{_ as a,k as i,m as r,j as t}from"./chunks/framework.CUOHyZ0k.js";const g=JSON.parse('{"title":"v4.13 版本介绍","description":"","frontmatter":{},"headers":[],"relativePath":"en-US/about/releases/v4.13.md","filePath":"en-US/about/releases/v4.13.md"}'),l={name:"en-US/about/releases/v4.13.md"};function s(o,e,h,n,k,u){return t(),i("div",null,e[0]||(e[0]=[r('<h1 id="v4-13-版本介绍" tabindex="-1">v4.13 版本介绍 <a class="header-anchor" href="#v4-13-版本介绍" aria-label="Permalink to &quot;v4.13 版本介绍&quot;">​</a></h1><ul><li><a href="https://github.com/koishijs/koishi/issues/1085" target="_blank" rel="noreferrer">Roadmap</a></li><li><a href="https://github.com/koishijs/koishi/releases/tag/4.13.0" target="_blank" rel="noreferrer">v4.13.0</a></li><li><a href="https://github.com/koishijs/koishi/releases/tag/4.13.1" target="_blank" rel="noreferrer">v4.13.1</a></li><li><a href="https://github.com/koishijs/koishi/releases/tag/4.13.2" target="_blank" rel="noreferrer">v4.13.2</a></li><li><a href="https://github.com/koishijs/koishi/releases/tag/4.13.3" target="_blank" rel="noreferrer">v4.13.3</a></li><li><a href="https://github.com/koishijs/koishi/releases/tag/4.13.4" target="_blank" rel="noreferrer">v4.13.4</a></li><li><a href="https://github.com/koishijs/koishi/releases/tag/4.13.5" target="_blank" rel="noreferrer">v4.13.5</a></li><li><a href="https://github.com/koishijs/koishi/releases/tag/4.13.6" target="_blank" rel="noreferrer">v4.13.6</a></li><li><a href="https://github.com/koishijs/koishi/releases/tag/4.13.7" target="_blank" rel="noreferrer">v4.13.7</a></li><li><a href="https://github.com/koishijs/koishi/releases/tag/4.13.8" target="_blank" rel="noreferrer">v4.13.8</a></li><li><a href="https://github.com/koishijs/koishi/releases/tag/4.13.9" target="_blank" rel="noreferrer">v4.13.9</a></li></ul><h2 id="控制台优化" tabindex="-1">控制台优化 <a class="header-anchor" href="#控制台优化" aria-label="Permalink to &quot;控制台优化&quot;">​</a></h2><p>v4.13 版本的主要改动是新增了一批控制台 API：</p><ul><li>引入了主题系统，允许插件定义新的主题</li><li>引入了用户配置 API，并允许插件扩展配置项</li><li>引入了菜单 API，允许插件定义和触发上下文菜单</li><li>支持了配置漫游功能，用户可以在多个客户端同步配置</li></ul><p>伴随着新的 API，已有的控制台插件也迎来了各种优化，这里就不一一列举了。</p><h2 id="插件配置优化" tabindex="-1">插件配置优化 <a class="header-anchor" href="#插件配置优化" aria-label="Permalink to &quot;插件配置优化&quot;">​</a></h2><p>在这个版本中，我们进一步将 @koishijs/plugin-market 拆分为了 market 和 config 两个独立的插件。前者负责插件的安装和更新，后者负责插件的配置。同时，我们支持了插件信息的按需读取，大幅提高了启动速度和插件市场加载速度。</p><p>新版本的 market 和 config 插件也带来了一些新功能：</p><ul><li>支持了启用、停用、重载插件分组</li><li>支持了插件的快速预览功能</li><li>支持了对插件配置项的热重载</li><li>支持了以指令形式安装、卸载、更新插件</li></ul><h2 id="适配器更新" tabindex="-1">适配器更新 <a class="header-anchor" href="#适配器更新" aria-label="Permalink to &quot;适配器更新&quot;">​</a></h2><ul><li>支持了更多标准消息元素</li><li>支持了斜线指令，允许用户快速与机器人交互</li><li>新增了与表态和角色相关的 Bot API</li><li>新增了 matrix 和 line 适配器</li></ul>',12)]))}const b=a(l,[["render",s]]);export{g as __pageData,b as default};
