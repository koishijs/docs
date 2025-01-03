import{_ as e,a as t}from"./chunks/sandbox.dark.Ddk9PuDw.js";import{_ as i,k as o,m as n,j as r}from"./chunks/framework.CUOHyZ0k.js";const g=JSON.parse('{"title":"Conversation","description":"","frontmatter":{},"headers":[],"relativePath":"en-US/manual/usage/adapter.md","filePath":"en-US/manual/usage/adapter.md"}'),l={name:"en-US/manual/usage/adapter.md"};function s(h,a,p,u,c,d){return r(),o("div",null,a[0]||(a[0]=[n('<h1 id="conversation" tabindex="-1">Conversation <a class="header-anchor" href="#conversation" aria-label="Permalink to &quot;Conversation&quot;">​</a></h1><p>After installing Koishi and exploring the marketplace, you must be eager to experience the functionalities of Koishi. Let&#39;s dive into the first conversation with the bots right away!</p><h2 id="simulate-a-conversation-in-the-sandbox" tabindex="-1">Simulate a conversation in the sandbox <a class="header-anchor" href="#simulate-a-conversation-in-the-sandbox" aria-label="Permalink to &quot;Simulate a conversation in the sandbox&quot;">​</a></h2><p>Navigate to the &quot;Sandbox&quot; page in the Console, where we can simulate a conversation with bots.</p><p>首先点击屏幕左上角的「添加用户」来创建一个虚拟用户 (通常第一位虚拟用户的名字会是 Alice)，此时屏幕右侧会出现空白的聊天界面。Click the input box at the bottom of the chat UI, type &quot;help&quot; (without quotes) and then press the Enter key. 你会立即在聊天界面中看到机器人的回复，列出了包括 <code>echo</code> 和 <code>help</code> 在内的所有可用的指令，这便是 <code>help</code> 这个内置指令的功能。</p><p>可以看到，这里的 <code>echo</code> 就是我们刚刚安装的插件，它的功能是将用户的输入原样返回。Let&#39;s try with entering &quot;echo Bonjour&quot;, then press Enter to commit it. You will see the response from bot with &quot;Bonjour&quot;.</p><p class="light-only"><img src="'+e+'" alt="sandbox"></p><p class="dark-only"><img src="'+t+'" alt="sandbox"></p><p>如果想要模拟群聊，我们可以创建更多的用户，并在聊天界面顶部点击切换到「群聊模式」。这样，你就可以通过在左侧栏切换并控制多个虚拟用户与机器人聊天了。如果你要体验的是下棋一类的多人交互插件，这会非常有用。</p><p>Additionally, you could also set the <a href="./../usage/customize.html#权限管理">Authority Level</a> of a user in the &quot;User Settings&quot; page when any commands require it.</p><h2 id="integrating-with-real-chat-platforms" tabindex="-1">Integrating with Real Chat Platforms <a class="header-anchor" href="#integrating-with-real-chat-platforms" aria-label="Permalink to &quot;Integrating with Real Chat Platforms&quot;">​</a></h2><p>Simulate the conversation in the sandbox is far from enough.We need to connect the bot into a real chat platform for it to truly serve us.Koishi uses adapter plugins to support various chat platforms. Below is the list of official adapters:</p><ul><li><a href="./../../plugins/adapter/dingtalk.html">DingTalk</a></li><li><a href="./../../plugins/adapter/discord.html">Discord</a></li><li><a href="./../../plugins/adapter/kook.html">KOOK</a></li><li><a href="./../../plugins/adapter/lark.html">Lark</a></li><li><a href="./../../plugins/adapter/line.html">LINE</a></li><li><a href="./../../plugins/adapter/mail.html">Mail</a></li><li><a href="./../../plugins/adapter/matrix.html">Matrix</a></li><li><a href="./../../plugins/adapter/qq.html">QQ</a></li><li><a href="./../../plugins/adapter/slack.html">Slack</a></li><li><a href="./../../plugins/adapter/telegram.html">Telegram</a></li><li><a href="./../../plugins/adapter/wechat-official.html">WeChat Official</a></li><li><a href="./../../plugins/adapter/wecom.html">WeCom</a></li><li><a href="./../../plugins/adapter/whatsapp.html">WhatsApp</a></li></ul><p>The commonly used adapter plugins are pre-installed in Koishi. You can find them in the plugin configuration under the &quot;Adapter&quot; section.If you don&#39;t see the platform you want, you can also search for and install more adapter plugins in the marketplace.</p><p>A Koishi application could simultaneously connect to multiple bot accounts on multiple chat platforms. Each configuration copy of the corresponding adapter plugin maintains the bot account instance, you could add new configurations of adapter plugin according to <a href="./market.html#添加更多插件">Add More Plugins</a>. Since multiple bots within the same platform share the same user data, switching between them for load balancing is easy.</p><p>There are large differences between the different platforms of ways and difficulty.There are different configuration work that you need to do with different platforms. 这些工作可能包括在平台内注册开发者账号、准备一台部署到公网的服务器等等。你可以在各个适配器插件的文档中找到详细的指引。</p><p>好消息是，Koishi 的大部分功能都不依赖特定的聊天平台。因此在进行准备工作的同时，你完全可以阅读本文档的后续部分，并在沙盒中体验并学习 Koishi 的功能。</p><h2 id="对比沙盒与真实环境" tabindex="-1">对比沙盒与真实环境 <a class="header-anchor" href="#对比沙盒与真实环境" aria-label="Permalink to &quot;对比沙盒与真实环境&quot;">​</a></h2><p>事实上，大多数机器人框架都没有提供沙盒功能，或是倾向于用户在真实环境中进行体验。你可能会有疑惑：为什么 Koishi 要推荐使用沙盒功能呢？因此我们列出了沙盒的几点优势。</p><p>首先，沙盒可以让你快速地了解插件的效果，而不需要在真实环境中进行大量的测试。想象一下，你刚刚安装了一个陌生的插件，你并不知道应该如何使用它，也不知道它的效果是什么。最糟糕的情况下，一旦插件的某些功能触发了机器人的敏感行为，你的真实账号还存在被封禁的风险。而沙盒则可以让你在不用担心这些问题的情况下，快速地了解插件的功能。</p><p>其次，如果你是插件的开发者而非使用者，沙盒功能的意义则更大了：得益于 Koishi 的热重载机制，每次修改插件源码后，你只需要按下保存，即可立即在沙盒中体验修改后的效果。这允许你在任何设备上进行快速的迭代开发，而根本不需要准备真实环境的账号。</p><p>当然，沙盒并不能代替真实的聊天环境，有些插件的效果可能无法在沙盒中体验。因此，我们推荐你在沙盒中体验插件的基础功能，而在真实环境中进行更加深入的测试。</p>',22)]))}const b=i(l,[["render",s]]);export{g as __pageData,b as default};
