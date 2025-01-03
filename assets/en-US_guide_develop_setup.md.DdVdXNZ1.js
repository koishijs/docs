import{_ as n,a as r}from"./chunks/home-light.pY_vX2i_.js";import{_ as h}from"./chunks/downloads.LaWCHY0p.js";import{_ as p,k as o,m as k,f as l,y as t,l as s,B as a,A as d,j as g}from"./chunks/framework.CUOHyZ0k.js";const x=JSON.parse('{"title":"Setup Environment","description":"","frontmatter":{},"headers":[],"relativePath":"en-US/guide/develop/setup.md","filePath":"en-US/guide/develop/setup.md"}'),y={name:"en-US/guide/develop/setup.md"};function u(m,i,c,F,b,C){const e=d("tab-select");return g(),o("div",null,[i[20]||(i[20]=k('<h1 id="setup-environment" tabindex="-1">Setup Environment <a class="header-anchor" href="#setup-environment" aria-label="Permalink to &quot;Setup Environment&quot;">​</a></h1><p>本节将介绍推荐的开发环境搭建流程。如果某些软件已经安装完成，可以跳过对应的步骤。</p><h2 id="安装-node-js" tabindex="-1">安装 Node.js <a class="header-anchor" href="#安装-node-js" aria-label="Permalink to &quot;安装 Node.js&quot;">​</a></h2><p>Koishi 需要 <a href="https://nodejs.org/" target="_blank" rel="noreferrer">Node.js</a> (最低 v18，推荐使用 LTS) 运行环境，你需要自己安装它。</p><h3 id="下载安装包" tabindex="-1">下载安装包 <a class="header-anchor" href="#下载安装包" aria-label="Permalink to &quot;下载安装包&quot;">​</a></h3><p>首先我们前往 <a href="https://nodejs.org/" target="_blank" rel="noreferrer">Node.js</a> 的官方网站：</p><p class="dark-only"><img src="'+n+'" alt="home"></p><p class="light-only"><img src="'+r+`" alt="home"></p><p>在这里可以看到两个巨大的按钮，分别对应着 <strong>LTS (长期维护版)</strong> 和 <strong>Current (最新版本)</strong>。我们建议你选择更加稳定的 LTS 版本，点击按钮即可下载安装包。</p><p>随后，运行下载好的安装包，根据提示完成整个安装流程即可。</p><h3 id="安装包管理器" tabindex="-1">安装包管理器 <a class="header-anchor" href="#安装包管理器" aria-label="Permalink to &quot;安装包管理器&quot;">​</a></h3><p>Node.js 自带名为 <a href="https://www.npmjs.com/" target="_blank" rel="noreferrer">npm</a> 的包管理器，你可以直接使用它。我们同时也推荐功能更强大的 <a href="https://classic.yarnpkg.com/" target="_blank" rel="noreferrer">yarn</a> 作为包管理器。它的安装非常简单，只需打开命令行输入下面的命令：</p><div class="language-sh vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki shiki-themes github-light one-dark-pro vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-light-font-style:inherit;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;"># 安装 yarn</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">npm</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> i</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> -g</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> yarn</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-light-font-style:inherit;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;"># 查看版本</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">yarn</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> -v</span></span></code></pre></div><div class="tip custom-block"><p class="custom-block-title">TIP</p><p>部分 Windows 用户可能会发现以下错误 (<a href="https://learn.microsoft.com/zh-cn/powershell/module/microsoft.powershell.core/about/about_execution_policies" target="_blank" rel="noreferrer">参考链接</a>)：</p><div class="language-text vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light one-dark-pro vp-code" tabindex="0"><code><span class="line"><span>yarn：无法加载文件 yarn.ps1，因为在此系统上禁止运行脚本。</span></span></code></pre></div><p>此时请以管理员身份重新运行终端，并输入下面的命令：</p><div class="language-sh vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki shiki-themes github-light one-dark-pro vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">Set-ExecutionPolicy</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> RemoteSigned</span></span></code></pre></div><p>之后就可以正常使用 yarn 了。</p></div><h3 id="配置镜像源" tabindex="-1">配置镜像源 <a class="header-anchor" href="#配置镜像源" aria-label="Permalink to &quot;配置镜像源&quot;">​</a></h3><p>如果你是国内用户，从 npm 或 yarn 上下载依赖可能非常慢。因此，我们推荐你配置一下镜像源，以提升安装速度。</p>`,16)),l(e,{class:"code"},{"tab-npm":t(()=>i[0]||(i[0]=[s("div",{class:"language-npm vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"},"npm"),s("pre",{class:"shiki shiki-themes github-light one-dark-pro vp-code",tabindex:"0"},[s("code",null,[s("span",{class:"line"},[s("span",{style:{"--shiki-light":"#6F42C1","--shiki-dark":"#61AFEF"}},"npm"),s("span",{style:{"--shiki-light":"#032F62","--shiki-dark":"#98C379"}}," config"),s("span",{style:{"--shiki-light":"#032F62","--shiki-dark":"#98C379"}}," set"),s("span",{style:{"--shiki-light":"#032F62","--shiki-dark":"#98C379"}}," registry"),s("span",{style:{"--shiki-light":"#032F62","--shiki-dark":"#98C379"}}," https://registry.npmmirror.com")])])])],-1)])),"tab-yarn":t(()=>i[1]||(i[1]=[s("div",{class:"language-yarn vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"},"yarn"),s("pre",{class:"shiki shiki-themes github-light one-dark-pro vp-code",tabindex:"0"},[s("code",null,[s("span",{class:"line"},[s("span",{style:{"--shiki-light":"#6F42C1","--shiki-dark":"#61AFEF"}},"yarn"),s("span",{style:{"--shiki-light":"#032F62","--shiki-dark":"#98C379"}}," config"),s("span",{style:{"--shiki-light":"#032F62","--shiki-dark":"#98C379"}}," set"),s("span",{style:{"--shiki-light":"#032F62","--shiki-dark":"#98C379"}}," registry"),s("span",{style:{"--shiki-light":"#032F62","--shiki-dark":"#98C379"}}," https://registry.npmmirror.com")]),a(`
`),s("span",{class:"line"}),a(`
`),s("span",{class:"line"},[s("span",{style:{"--shiki-light":"#6A737D","--shiki-light-font-style":"inherit","--shiki-dark":"#7F848E","--shiki-dark-font-style":"italic"}},"### 注册 npm")]),a(`
`),s("span",{class:"line"}),a(`
`),s("span",{class:"line"},[s("span",{style:{"--shiki-light":"#6F42C1","--shiki-dark":"#61AFEF"}},"如果你打算发布插件，你还需要注册一个"),s("span",{style:{"--shiki-light":"#032F62","--shiki-dark":"#98C379"}}," npm"),s("span",{style:{"--shiki-light":"#032F62","--shiki-dark":"#98C379"}}," 账号。这一步非常简单，只需前往这里的"),s("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#ABB2BF"}}," [注册页面]("),s("span",{style:{"--shiki-light":"#6F42C1","--shiki-dark":"#61AFEF"}},"https://www.npmjs.com/signup"),s("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#ABB2BF"}},")。填写你的用户名、邮箱和密码，勾选同意协议，点击注册即可。")]),a(`
`),s("span",{class:"line"}),a(`
`),s("span",{class:"line"},[s("span",{style:{"--shiki-light":"#6F42C1","--shiki-dark":"#61AFEF"}},"注册完成后，你就可以在命令行中使用"),s("span",{style:{"--shiki-light":"#032F62","--shiki-dark":"#98C379"}}," `"),s("span",{style:{"--shiki-light":"#6F42C1","--shiki-dark":"#61AFEF"}},"npm"),s("span",{style:{"--shiki-light":"#032F62","--shiki-dark":"#98C379"}}," login`"),s("span",{style:{"--shiki-light":"#6F42C1","--shiki-dark":"#61AFEF"}}," 来登录你的账号：")]),a(`
`),s("span",{class:"line"}),a(`
`),s("span",{class:"line"},[s("span",{style:{"--shiki-light":"#032F62","--shiki-dark":"#98C379"}},"```"),s("span",{style:{"--shiki-light":"#6F42C1","--shiki-dark":"#61AFEF"}},"sh")]),a(`
`),s("span",{class:"line"},[s("span",{style:{"--shiki-light":"#6F42C1","--shiki-dark":"#61AFEF"}},"npm"),s("span",{style:{"--shiki-light":"#032F62","--shiki-dark":"#98C379"}}," login "),s("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#D19A66"}},"--registry=https://registry.npmjs.org")])])])],-1)])),default:t(()=>[i[2]||(i[2]=s("h2",{id:"版本控制",tabindex:"-1"},[a("版本控制 "),s("a",{class:"header-anchor",href:"#版本控制","aria-label":'Permalink to "版本控制"'},"​")],-1)),i[3]||(i[3]=s("p",null,"我们强烈推荐使用版本控制系统 (VCS) 来管理你的代码。这一方面允许你在任何时候回退到之前的版本，另一方面也能让你与其他开发者协作。",-1)),i[4]||(i[4]=s("h3",{id:"安装-git",tabindex:"-1"},[a("安装 Git "),s("a",{class:"header-anchor",href:"#安装-git","aria-label":'Permalink to "安装 Git"'},"​")],-1)),i[5]||(i[5]=s("p",null,[a("Git 是最普遍使用的版本控制工具。前往 "),s("a",{href:"https://git-scm.com/downloads",target:"_blank",rel:"noreferrer"},"官网"),a("，点击右上角的青色按钮下载安装包。")],-1)),i[6]||(i[6]=s("p",null,[s("img",{src:h,alt:"downloads"})],-1)),i[7]||(i[7]=s("p",null,[a("国内的 Windows 用户也可以选择从 "),s("a",{href:"https://registry.npmmirror.com/binary.html?path=git-for-windows/",target:"_blank",rel:"noreferrer"},"镜像"),a(" 下载。如果不知道下载哪个版本，可以在上面的官网中看到 (比如图中就是 2.39.1)。")],-1)),i[8]||(i[8]=s("p",null,"获取到安装包后，双击运行。安装过程无需手动配置，一直点击下一步即可完成安装。",-1)),i[9]||(i[9]=s("p",null,[a("安装完成后，可以在命令行中输入 "),s("code",null,"git --version"),a(" 来查看版本号，以确认安装成功：")],-1)),i[10]||(i[10]=s("div",{class:"language-sh vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"},"sh"),s("pre",{class:"shiki shiki-themes github-light one-dark-pro vp-code",tabindex:"0"},[s("code",null,[s("span",{class:"line"},[s("span",{style:{"--shiki-light":"#6F42C1","--shiki-dark":"#61AFEF"}},"git"),s("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#D19A66"}}," --version"),s("span",{style:{"--shiki-light":"#6A737D","--shiki-light-font-style":"inherit","--shiki-dark":"#7F848E","--shiki-dark-font-style":"italic"}},"           # git version 2.39.1")])])])],-1)),i[11]||(i[11]=s("p",null,"最后你还需要设置你的姓名和邮箱。它们将会默认作为你创建的插件的作者，也会出现在你的提交记录中：",-1)),i[12]||(i[12]=s("div",{class:"language-sh vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"},"sh"),s("pre",{class:"shiki shiki-themes github-light one-dark-pro vp-code",tabindex:"0"},[s("code",null,[s("span",{class:"line"},[s("span",{style:{"--shiki-light":"#6F42C1","--shiki-dark":"#61AFEF"}},"git"),s("span",{style:{"--shiki-light":"#032F62","--shiki-dark":"#98C379"}}," config"),s("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#D19A66"}}," --global"),s("span",{style:{"--shiki-light":"#032F62","--shiki-dark":"#98C379"}}," user.name"),s("span",{style:{"--shiki-light":"#032F62","--shiki-dark":"#98C379"}},' "Your Name"')]),a(`
`),s("span",{class:"line"},[s("span",{style:{"--shiki-light":"#6F42C1","--shiki-dark":"#61AFEF"}},"git"),s("span",{style:{"--shiki-light":"#032F62","--shiki-dark":"#98C379"}}," config"),s("span",{style:{"--shiki-light":"#032F62","--shiki-dark":"#98C379"}}," –-global"),s("span",{style:{"--shiki-light":"#032F62","--shiki-dark":"#98C379"}}," user.email"),s("span",{style:{"--shiki-light":"#032F62","--shiki-dark":"#98C379"}},' "you@example.com"')])])])],-1)),i[13]||(i[13]=s("h3",{id:"注册-github",tabindex:"-1"},[a("注册 GitHub "),s("a",{class:"header-anchor",href:"#注册-github","aria-label":'Permalink to "注册 GitHub"'},"​")],-1)),i[14]||(i[14]=s("p",null,[a("通常来说我还会建议你注册一个 GitHub 账号。"),s("a",{href:"https://github.com",target:"_blank",rel:"noreferrer"},"GitHub"),a(" 是一个代码托管平台，我们可以在上面创建仓库来存放我们的代码。由于篇幅有限，请在互联网搜索相关的教程，自行完成注册。如果发现无法注册，也不用担心，你仍然可以在本地进行开发。")],-1)),i[15]||(i[15]=s("h2",{id:"安装-koishi",tabindex:"-1"},[a("安装 Koishi "),s("a",{class:"header-anchor",href:"#安装-koishi","aria-label":'Permalink to "安装 Koishi"'},"​")],-1)),i[16]||(i[16]=s("p",null,"Open a command line, cd to the directory that you want to create a Koishi template project.",-1)),i[17]||(i[17]=s("div",{class:"tip custom-block"},[s("p",{class:"custom-block-title"},"TIP"),s("p",null,"The working directory path should not be absurdly long, also it is recommended to use a path that contains ASCII characters only. For example:"),s("ul",null,[s("li",null,[a("Windows："),s("code",null,"C:\\dev"),a(" 或者 "),s("code",null,"D:\\dev"),a(" (也不要直接在盘根创建项目，最好是建一层目录)")]),s("li",null,[a("Other operating systems: "),s("code",null,"~/dev")])])],-1))]),_:1}),i[21]||(i[21]=s("p",null,"Enter the following command to create Koishi template project:",-1)),l(e,{class:"code"},{"tab-npm":t(()=>i[18]||(i[18]=[s("div",{class:"language-npm vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"},"npm"),s("pre",{class:"shiki shiki-themes github-light one-dark-pro vp-code",tabindex:"0"},[s("code",null,[s("span",{class:"line"},[s("span",{style:{"--shiki-light":"#6F42C1","--shiki-dark":"#61AFEF"}},"npm"),s("span",{style:{"--shiki-light":"#032F62","--shiki-dark":"#98C379"}}," init"),s("span",{style:{"--shiki-light":"#032F62","--shiki-dark":"#98C379"}}," koishi@latest")])])])],-1)])),"tab-yarn":t(()=>i[19]||(i[19]=[s("div",{class:"language-yarn vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"},"yarn"),s("pre",{class:"shiki shiki-themes github-light one-dark-pro vp-code",tabindex:"0"},[s("code",null,[s("span",{class:"line"},[s("span",{style:{"--shiki-light":"#6F42C1","--shiki-dark":"#61AFEF"}},"yarn"),s("span",{style:{"--shiki-light":"#032F62","--shiki-dark":"#98C379"}}," create"),s("span",{style:{"--shiki-light":"#032F62","--shiki-dark":"#98C379"}}," koishi")])])])],-1)])),_:1}),i[22]||(i[22]=s("p",null,"Follow the prompts and finalize the initialization process.",-1)),i[23]||(i[23]=s("p",null,[a("If you have successfully finalized the operations above, your application should be already launched, the Koishi Console Web UI should be also opened. 接下来的几节中我们将学习更多的命令行用法，因此我们可以先关闭 Koishi。在命令行中按下 "),s("code",null,"Ctrl+C"),a(" 组合键即可停止 Koishi 的运行。")],-1))])}const E=p(y,[["render",u]]);export{x as __pageData,E as default};
