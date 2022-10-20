import { defineConfig } from 'vitepress'
import highlight from './markdown/highlight'
import fence from './markdown/fence'
import { resolve } from 'path'

const makeLink = (text: string, link: string) => ({ text, link })

export default async () => defineConfig({
  title: 'Koishi',

  head: [
    ['link', { rel: 'icon', href: '/koishi.png' }],
    ['link', { rel: 'manifest', href: '/manifest.json' }],
    ['meta', { name: 'theme-color', content: '#5546a3' }],
  ],

  markdown: {
    highlight: await highlight('one-dark-pro'),
    config(md) {
      md.use(fence)
    },
  },

  themeConfig: {
    logo: '/koishi.png',
    outline: [2, 3],

    nav: [{
      text: '入门',
      link: '/manual/introduction.md',
      activeMatch: '/manual/',
    }, {
      text: '指南',
      link: '/guide/',
      activeMatch: '/guide/',
    }, {
      text: '参考',
      link: '/api/',
      activeMatch: '/api/',
    }],

    sidebar: {
      '/manual/': [{
        items: [
          makeLink('介绍', '/manual/introduction.md'),
        ],
      }, {
        items: [
          makeLink('起步', '/manual/starter/'),
          makeLink('创建模板项目', '/manual/starter/boilerplate.md'),
          makeLink('作为依赖调用', '/manual/starter/direct.md'),
          makeLink('使用启动器', '/manual/starter/desktop.md'),
          makeLink('在手机上运行', '/manual/starter/mobile.md'),
          makeLink('在服务器上安装', '/manual/starter/server.md'),
          makeLink('使用容器', '/manual/starter/container.md'),
        ],
      }, {
        text: '使用控制台',
        items: [
          makeLink('什么是控制台', '/manual/console/index.md'),
          makeLink('安装和配置插件', '/manual/console/market.md'),
          makeLink('接入聊天平台', '/manual/console/adapter.md'),
          makeLink('使用数据库', '/manual/console/dataview.md'),
        ],
      }, {
        text: '命令行工具',
        items: [
          makeLink('使用命令行', '/manual/cli/index.md'),
          makeLink('插件开发', '/manual/cli/development.md'),
        ],
      }],

      '/guide/': [{
        items: [
          makeLink('总览', '/guide/'),
        ],
      }, {
        text: '处理交互',
        items: [
          makeLink('使用中间件', '/guide/message/middleware.md'),
          makeLink('使用会话', '/guide/message/session.md'),
          makeLink('使用消息段', '/guide/message/segment.md'),
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
          makeLink('配置模式', '/guide/plugin/schema.md'),
          makeLink('发布插件', '/guide/plugin/publish.md'),
        ],
      }, {
        text: '切面开发',
        items: [
          makeLink('会话选择器', '/guide/aspect/selector.md'),
          makeLink('事件系统', '/guide/aspect/events.md'),
          makeLink('服务与依赖', '/guide/aspect/service.md'),
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
          makeLink('使用沙箱', '/guide/testing/sandbox.md'),
          makeLink('单元测试', '/guide/testing/unit-tests.md'),
        ],
      }, {
        text: '深入底层',
        items: [
          makeLink('模块组织', '/guide/in-depth/module.md'),
          makeLink('消息处理', '/guide/in-depth/message.md'),
        ],
      }],

      '/api/': [{
        items: [
          makeLink('总览', '/api/'),
          // makeLink('术语表', '/api/glossary.md'),
        ],
      }, {
        text: '核心 API',
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
        text: '服务 API',
        items: [
          makeLink('机器人 (Bots)', '/api/service/bots.md'),
          makeLink('国际化 (I18n)', '/api/service/i18n.md'),
          makeLink('事件系统 (Lifecycle)', '/api/service/lifecycle.md'),
          makeLink('插件系统 (Registry)', '/api/service/registry.md'),
          makeLink('选择器 (Selector)', '/api/service/selector.md'),
          makeLink('网络服务 (Router)', '/api/service/router.md'),
          makeLink('网络请求 (HTTP)', '/api/service/http.md'),
          makeLink('资源存储 (Assets)', '/api/service/assets.md'),
        ],
      }, {
        text: '数据库 API',
        items: [
          makeLink('内置数据结构', '/api/database/built-in.md'),
          makeLink('数据库操作 (Database)', '/api/database/database.md'),
          makeLink('数据模型 (Model)', '/api/database/model.md'),
          makeLink('查询表达式 (Query)', '/api/database/query.md'),
          makeLink('求值表达式 (Eval)', '/api/database/evaluation.md'),
        ],
      }, {
        text: '其他内置 API',
        items: [
          makeLink('消息段 (Segment)', '/api/utils/segment.md'),
          makeLink('配置模式 (Schema)', '/api/utils/schema.md'),
          makeLink('观察者 (Observer)', '/api/utils/observer.md'),
          makeLink('输出日志 (Logger)', '/api/utils/logger.md'),
          makeLink('其他工具 (Misc)', '/api/utils/misc.md'),
        ],
      // }],

      // '/plugins/': [{
      //   text: '总览',
      //   link: '/plugins/',
      // }, {
      //   text: '适配器支持',
      //   items: [
      //     makeLink('', '/plugins/adapter/discord.md'),
      //     makeLink('', '/plugins/adapter/kook.md'),
      //     makeLink('', '/plugins/adapter/onebot.md'),
      //     makeLink('', '/plugins/adapter/qqguild.md'),
      //     makeLink('', '/plugins/adapter/telegram.md'),
      //   ],
      // }, {
      //   text: '数据库支持',
      //   items: [
      //     makeLink('', '/plugins/database/level.md'),
      //     makeLink('', '/plugins/database/memory.md'),
      //     makeLink('', '/plugins/database/mongo.md'),
      //     makeLink('', '/plugins/database/mysql.md'),
      //     makeLink('', '/plugins/database/sqlite.md'),
      //   ],
      // }, {
      //   text: '资源存储支持',
      //   items: [
      //     makeLink('', '/plugins/assets/git.md'),
      //     makeLink('', '/plugins/assets/local.md'),
      //     makeLink('', '/plugins/assets/remote.md'),
      //     makeLink('', '/plugins/assets/s3.md'),
      //   ],
      // }, {
      //   text: '常用功能',
      //   items: [
      //     makeLink('', '/plugins/common/broadcast.md'),
      //     makeLink('', '/plugins/common/echo.md'),
      //     makeLink('', '/plugins/common/feedback.md'),
      //     makeLink('', '/plugins/common/forward.md'),
      //     makeLink('', '/plugins/common/recall.md'),
      //     makeLink('', '/plugins/common/repeater.md'),
      //     makeLink('', '/plugins/common/respondent.md'),
      //   ],
      // }, {
      //   text: '辅助功能',
      //   items: [
      //     makeLink('', '/plugins/accessibility/admin.md'),
      //     makeLink('', '/plugins/accessibility/bind.md'),
      //     makeLink('', '/plugins/accessibility/callme.md'),
      //     makeLink('', '/plugins/accessibility/commands.md'),
      //     makeLink('', '/plugins/accessibility/locales.md'),
      //     makeLink('', '/plugins/accessibility/rate-limit.md'),
      //     makeLink('', '/plugins/accessibility/schedule.md'),
      //     makeLink('', '/plugins/accessibility/sudo.md'),
      //     makeLink('', '/plugins/accessibility/verifier.md'),
      //   ],
      // }, {
      //   text: '控制台功能',
      //   items: [
      //     makeLink('', '/plugins/console/index.md'),
      //     makeLink('', '/plugins/console/auth.md'),
      //     makeLink('', '/plugins/console/chat.md'),
      //     makeLink('', '/plugins/console/dataview.md'),
      //     makeLink('', '/plugins/console/insight.md'),
      //     makeLink('', '/plugins/console/logger.md'),
      //     makeLink('', '/plugins/console/market.md'),
      //     makeLink('', '/plugins/console/sandbox.md'),
      //     makeLink('', '/plugins/console/status.md'),
      //   ],
      // }, {
      //   text: '其他官方插件',
      //   items: [
      //     makeLink('', '/plugins/other/mock.md'),
      //     makeLink('', '/plugins/other/puppeteer.md'),
      //   ],
      // }],

      // '/community/': communitySidebar,

      // '/about/': [{
      //   text: '常见问题',
      //   link: '/about/faq.md',
      // }, {
      //   text: '更新与迁移',
      //   items: [
      //     makeLink('', '/about/history.md'),
      //     makeLink('', '/about/migration.md'),
      //     makeLink('', '/about/releases/v4.1.md'),
      //     makeLink('', '/about/releases/v4.2.md'),
      //     makeLink('', '/about/releases/v4.3.md'),
      //     makeLink('', '/about/releases/v4.4.md'),
      //     makeLink('', '/about/releases/v4.5.md'),
      //     makeLink('', '/about/releases/v4.6.md'),
      //   ],
      // }, {
      //   text: '贡献指南',
      //   items: [
      //     makeLink('', '/about/contribute/structure.md'),
      //     makeLink('', '/about/contribute/docs.md'),
      //   ],
      }],
    },

    socialLinks: [
      { icon: 'discord', link: 'https://discord.com/invite/xfxYwmd284' },
      { icon: 'github', link: 'https://github.com/koishijs/novelai-bot' }
    ],
  
    footer: {
      message: `Released under the MIT License.`,
      copyright: 'Copyright © 2022-present Shigma',
    },

    editLink: {
      pattern: 'https://github.com/koishijs/docs/edit/main/:path',
    },
  },

  vite: {
    resolve: {
      dedupe: ['vue'],
      alias: {
        '@theme-default': 'vitepress/dist/client/theme-default',
      },
    },

    optimizeDeps: {
      include: ['vue'],
    },

    server: {
      fs: {
        strict: false,
      },
    },
  },
})
