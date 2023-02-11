import { defineConfig } from '@koishijs/vitepress'

const makeLink = (text: string, link: string) => ({ text, link })

const ecosystem = {
  text: '插件',
  items: [
    makeLink('插件市场', '/market/'),
    makeLink('分类与评分细则', '/market/guidelines.md'),
    makeLink('服务类插件导航', '/market/service.md'),
    makeLink('官方插件一览', '/plugins/'),
  ],
}

export default async () => defineConfig({
  title: 'Koishi',

  head: [
    ['link', { rel: 'icon', href: '/logo.png' }],
    ['link', { rel: 'manifest', href: '/manifest.json' }],
    ['meta', { name: 'theme-color', content: '#5546a3' }],
  ],

  themeConfig: {
    indexName: 'docs',
    logo: '/logo.png',

    nav: [{
      text: '入门',
      link: '/manual/introduction.md',
      activeMatch: '^/manual/',
    }, {
      text: '开发',
      link: '/guide/',
      activeMatch: '^/guide/',
    }, {
      text: 'API',
      link: '/api/',
      activeMatch: '^/api/',
    }, {
      ...ecosystem,
      activeMatch: '^/(plugins|market)/',
    }, {
      text: '更多',
      link: '/about/contact.md',
      activeMatch: '^/about/',
    }],

    sidebar: {
      '/manual/': [{
        items: [
          makeLink('介绍', '/manual/introduction.md'),
        ],
      }, {
        items: [
          makeLink('起步', '/manual/starter/'),
          makeLink('为 Windows 安装', '/manual/starter/windows.md'),
          makeLink('为 macOS 安装', '/manual/starter/macos.md'),
          makeLink('为 Linux 安装', '/manual/starter/linux.md'),
          makeLink('为 Android 安装', '/manual/starter/android.md'),
          makeLink('在容器中使用', '/manual/starter/docker.md'),
          makeLink('创建模板项目', '/manual/starter/boilerplate.md'),
          makeLink('作为依赖调用', '/manual/starter/direct.md'),
        ],
      }, {
        text: '控制台',
        items: [
          makeLink('认识控制台', '/manual/console/index.md'),
          makeLink('安装和配置插件', '/manual/console/market.md'),
          makeLink('接入聊天平台', '/manual/console/adapter.md'),
          makeLink('使用数据库', '/manual/console/dataview.md'),
        ],
      }, {
        text: '配方',
        items: [
          makeLink('服务器部署', '/manual/recipe/server.md'),
        ],
      }],

      '/guide/': [{
        items: [
          makeLink('总览', '/guide/'),
        ],
      }, {
        text: '开发上手',
        items: [
          makeLink('环境搭建', '/guide/develop/setup.md'),
          makeLink('配置文件', '/guide/develop/config.md'),
          makeLink('启动脚本', '/guide/develop/script.md'),
          makeLink('工作区开发', '/guide/develop/workspace.md'),
          makeLink('发布插件', '/guide/develop/publish.md'),
        ],
      }, {
        text: '交互基础',
        items: [
          makeLink('快速上手', '/guide/basic/examples.md'),
          makeLink('事件系统', '/guide/basic/events.md'),
          makeLink('中间件', '/guide/basic/middleware.md'),
          makeLink('消息元素', '/guide/basic/element.md'),
        ],
      }, {
        text: '指令系统',
        items: [
          makeLink('指令系统初探', '/guide/command/index.md'),
          makeLink('指令触发机制', '/guide/command/execution.md'),
          makeLink('查看和编写帮助', '/guide/command/help.md'),
          makeLink('更多功能', '/guide/command/more.md'),
        ],
      }, {
        text: '模块化',
        items: [
          makeLink('认识插件', '/guide/plugin/index.md'),
          makeLink('生命周期', '/guide/plugin/lifecycle.md'),
          makeLink('会话选择器', '/guide/plugin/selector.md'),
          makeLink('服务与依赖', '/guide/plugin/service.md'),
          makeLink('配置模式', '/guide/plugin/schema.md'),
        ],
      }, {
        text: '数据库',
        items: [
          makeLink('使用数据库', '/guide/database/index.md'),
          makeLink('扩展数据模型', '/guide/database/model.md'),
          makeLink('内置用户系统', '/guide/database/builtin.md'),
          makeLink('按需加载和自动更新', '/guide/database/observer.md'),
          makeLink('编写数据库插件', '/guide/database/writing.md'),
        ],
      }, {
        text: '跨平台',
        items: [
          makeLink('使用适配器', '/guide/adapter/index.md'),
          makeLink('使用机器人', '/guide/adapter/bot.md'),
          makeLink('跨平台账号绑定', '/guide/adapter/binding.md'),
          makeLink('编写适配器插件', '/guide/adapter/writing.md'),
        ],
      }, {
        text: '国际化',
        items: [
          makeLink('多语言支持', '/guide/i18n/index.md'),
          makeLink('编写翻译文件', '/guide/i18n/translation.md'),
          makeLink('使用预设模板', '/guide/i18n/presets.md'),
          makeLink('接入 Crowdin', '/guide/i18n/crowdin.md'),
        ],
      }, {
        text: '控制台开发',
        items: [
          makeLink('使用控制台', '/guide/console/index.md'),
          makeLink('编写扩展', '/guide/console/extension.md'),
          makeLink('数据交互', '/guide/console/data.md'),
        ],
      }, {
        text: '测试工具',
        items: [
          makeLink('单元测试', '/guide/testing/index.md'),
        ],
      // }, {
      //   text: '深入底层',
      //   items: [
      //     makeLink('模块组织', '/guide/in-depth/module.md'),
      //     makeLink('消息处理', '/guide/in-depth/message.md'),
      //   ],
      }],

      '/api/': [{
        items: [
          makeLink('总览', '/api/'),
          // makeLink('术语表', '/api/glossary.md'),
        ],
      }, {
        text: '核心模块',
        items: [
          makeLink('适配器 (Adapter)', '/api/core/adapter.md'),
          makeLink('应用 (App)', '/api/core/app.md'),
          makeLink('机器人 (Bot)', '/api/core/bot.md'),
          makeLink('指令 (Command)', '/api/core/command.md'),
          makeLink('上下文 (Context)', '/api/core/context.md'),
          makeLink('事件 (Events)', '/api/core/events.md'),
          makeLink('会话 (Session)', '/api/core/session.md'),
        ],
      }, {
        text: '消息元素',
        items: [
          makeLink('语法规范', '/api/message/syntax.md'),
          makeLink('标准元素', '/api/message/elements.md'),
          makeLink('内置组件', '/api/message/components.md'),
          makeLink('渲染 API', '/api/message/api.md'),
        ],
      }, {
        text: '内置服务',
        items: [
          makeLink('机器人 (Bots)', '/api/service/bots.md'),
          makeLink('国际化 (I18n)', '/api/service/i18n.md'),
          makeLink('事件系统 (Lifecycle)', '/api/service/lifecycle.md'),
          makeLink('插件系统 (Registry)', '/api/service/registry.md'),
          makeLink('选择器 (Selector)', '/api/service/selector.md'),
          makeLink('网络服务 (Router)', '/api/service/router.md'),
          makeLink('网络请求 (HTTP)', '/api/service/http.md'),
        ],
      }, {
        text: '数据库',
        items: [
          makeLink('内置数据结构', '/api/database/built-in.md'),
          makeLink('数据库操作 (Database)', '/api/database/database.md'),
          makeLink('数据模型 (Model)', '/api/database/model.md'),
          makeLink('查询表达式 (Query)', '/api/database/query.md'),
          makeLink('求值表达式 (Eval)', '/api/database/evaluation.md'),
        ],
      }, {
        text: '其他功能',
        items: [
          makeLink('配置模式 (Schema)', '/api/utils/schema.md'),
          makeLink('观察者 (Observer)', '/api/utils/observer.md'),
          makeLink('输出日志 (Logger)', '/api/utils/logger.md'),
          makeLink('随机操作 (Random)', '/api/utils/random.md'),
          makeLink('其他工具 (Misc)', '/api/utils/misc.md'),
        ],
      }, {
        text: '测试工具',
        items: [
          makeLink('模拟环境 (Mock)', '/api/testing/'),
        ],
      }],

      '/plugins/': [ecosystem, {
        text: '适配器支持',
        items: [
          makeLink('适配器：Discord', '/plugins/adapter/discord.md'),
          makeLink('适配器：Feishu', '/plugins/adapter/feishu.md'),
          makeLink('适配器：Kook', '/plugins/adapter/kook.md'),
          makeLink('适配器：OneBot', '/plugins/adapter/onebot.md'),
          makeLink('适配器：QQGuild', '/plugins/adapter/qqguild.md'),
          makeLink('适配器：Telegram', '/plugins/adapter/telegram.md'),
        ],
      }, {
        text: '数据库支持',
        items: [
          makeLink('数据库：Memory', '/plugins/database/memory.md'),
          makeLink('数据库：MongoDB', '/plugins/database/mongo.md'),
          makeLink('数据库：MySQL', '/plugins/database/mysql.md'),
          makeLink('数据库：SQLite', '/plugins/database/sqlite.md'),
        ],
      }, {
        text: '常用功能',
        items: [
          makeLink('发送广播 (Broadcast)', '/plugins/common/broadcast.md'),
          makeLink('发送消息 (Echo)', '/plugins/common/echo.md'),
          makeLink('发送反馈 (Feedback)', '/plugins/common/feedback.md'),
          makeLink('撤回消息 (Recall)', '/plugins/common/recall.md'),
        ],
      }, {
        text: '辅助功能',
        items: [
          makeLink('数据管理 (Admin)', '/plugins/accessibility/admin.md'),
          makeLink('账号绑定 (Bind)', '/plugins/accessibility/bind.md'),
          makeLink('设置昵称 (Callme)', '/plugins/accessibility/callme.md'),
          makeLink('速率限制 (Rate Limit)', '/plugins/accessibility/rate-limit.md'),
          makeLink('计划任务 (Schedule)', '/plugins/accessibility/schedule.md'),
          makeLink('模拟调用 (Sudo)', '/plugins/accessibility/sudo.md'),
          makeLink('处理申请 (Verifier)', '/plugins/accessibility/verifier.md'),
        ],
      }, {
        text: '控制台功能',
        items: [
          makeLink('控制台 (Console)', '/plugins/console/index.md'),
          makeLink('数据统计 (Analytics)', '/plugins/console/analytics.md'),
          makeLink('用户登录 (Auth)', '/plugins/console/auth.md'),
          makeLink('聊天工具 (Chat)', '/plugins/console/chat.md'),
          makeLink('指令管理 (Commands)', '/plugins/console/commands.md'),
          makeLink('数据库操作 (Dataview)', '/plugins/console/dataview.md'),
          makeLink('插件依赖图 (Insight)', '/plugins/console/insight.md'),
          makeLink('本地翻译 (Locales)', '/plugins/console/locales.md'),
          makeLink('日志管理 (Logger)', '/plugins/console/logger.md'),
          makeLink('插件管理 (Market)', '/plugins/console/market.md'),
          makeLink('沙箱调试 (Sandbox)', '/plugins/console/sandbox.md'),
          makeLink('运行状态 (Status)', '/plugins/console/status.md'),
        ],
      }],

      '/market/': [ecosystem],

      '/about/': [{
        text: '关于我们',
        items: [
          makeLink('许可证', '/about/license.md'),
          makeLink('参与讨论', '/about/contact.md'),
          makeLink('团队介绍', '/about/team.md'),
          makeLink('社区资源', '/about/community.md'),
        ],
      }, {
        text: '更新与迁移',
        items: [
          makeLink('发展史', '/about/history.md'),
          makeLink('从 v3 迁移', '/about/migration.md'),
          makeLink('v4.1 版本介绍', '/about/releases/v4.1.md'),
          makeLink('v4.2 版本介绍', '/about/releases/v4.2.md'),
          makeLink('v4.3 版本介绍', '/about/releases/v4.3.md'),
          makeLink('v4.4 版本介绍', '/about/releases/v4.4.md'),
          makeLink('v4.5 版本介绍', '/about/releases/v4.5.md'),
          makeLink('v4.6 版本介绍', '/about/releases/v4.6.md'),
          makeLink('v4.7 版本介绍', '/about/releases/v4.7.md'),
          makeLink('工具链更新', '/about/tool-chain.md'),
        ],
      }, {
        text: '贡献指南',
        items: [
          makeLink('项目结构', '/about/contribute/structure.md'),
          makeLink('文档贡献指南', '/about/contribute/docs.md'),
        ],
      }],
    },

    socialLinks: {
      discord: 'https://discord.com/invite/xfxYwmd284',
      github: 'https://github.com/koishijs/koishi',
    },

    editLink: {
      pattern: 'https://github.com/koishijs/docs/edit/main/:path',
    },
  },
})
