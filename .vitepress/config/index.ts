import { defineConfig } from '@koishijs/vitepress'
import { makeLink } from './utils'

const ecosystemCN = {
  text: '插件',
  items: [
    makeLink('插件市场', '/zh-CN/market/'),
    makeLink('服务类插件导航', '/zh-CN/market/service.md'),
    makeLink('官方插件一览', '/zh-CN/plugins/'),
  ],
}

const ecosystemUS = {
  text: 'Plugins',
  items: [
    makeLink('Plugin market', '/en-US/market/'),
    makeLink('服务类插件导航', '/en-US/market/service.md'),
    makeLink('官方插件一览', '/en-US/plugins/'),
  ],
}

export default async () => defineConfig({
  title: 'Koishi',
  description: '创建跨平台、可扩展、高性能的机器人',

  head: [
    ['link', { rel: 'icon', href: '/logo.png' }],
    ['link', { rel: 'manifest', href: '/manifest.json' }],
    ['meta', { name: 'theme-color', content: '#5546a3' }],
  ],

  locales: {
    'zh-CN': {
      label: '中文 (简体)',
      lang: 'zh-CN',
      themeConfig: {
        nav: [{
          text: '入门',
          link: '/zh-CN/manual/introduction.md',
          activeMatch: '^/zh-CN/manual/',
        }, {
          text: '开发',
          link: '/zh-CN/guide/',
          activeMatch: '^/zh-CN/guide/',
        }, {
          text: 'API',
          link: '/zh-CN/api/',
          activeMatch: '^/zh-CN/api/',
        }, {
          ...ecosystemCN,
          activeMatch: '^/zh-CN/(plugins|market)/',
        }, {
          text: '更多',
          link: '/zh-CN/about/contact.md',
          activeMatch: '^/zh-CN/about/',
        }],
    
        sidebar: {
          '/zh-CN/manual/': [
            makeLink('', '/zh-CN/manual', () => [
              makeLink('介绍', '/introduction.md'),
            ]),
            makeLink('', '/zh-CN/manual/starter', () => [
              makeLink('起步', '/'),
              makeLink('为 Windows 安装', '/windows.md'),
              makeLink('为 macOS 安装', '/macos.md'),
              makeLink('为 Linux 安装', '/linux.md'),
              makeLink('为 Android 安装', '/android.md'),
              makeLink('在容器中使用', '/docker.md'),
              makeLink('创建模板项目', '/boilerplate.md'),
              makeLink('作为依赖调用', '/direct.md'),
            ]),
            makeLink('控制台', '/zh-CN/manual/console', () => [
              makeLink('认识控制台', '/index.md'),
              makeLink('安装和配置插件', '/market.md'),
              makeLink('在沙盒中聊天', '/sandbox.md'),
              makeLink('接入聊天平台', '/adapter.md'),
            ]),
            makeLink('使用', '/zh-CN/manual/usage', () => [
              makeLink('指令系统', '/command.md'),
              makeLink('跨平台', '/platform.md'),
              makeLink('权限管理', '/permission.md'),
              makeLink('过滤器', '/filter.md'),
              makeLink('国际化', '/i18n.md'),
            ]),
            makeLink('配方', '/zh-CN/manual/recipe', () => [
              makeLink('指令进阶技巧', '/execution.md'),
              makeLink('访问数据库', '/dataview.md'),
              makeLink('维护多份配置', '/multiple.md'),
              makeLink('搜索插件市场', '/search.md'),
              makeLink('公网部署', '/server.md'),
            ]),
            makeLink('启动器', '/zh-CN/manual/launcher', () => [
              makeLink('系统要求', '/system.md'),
              makeLink('命令行工具', '/cli.md'),
            ]),
          ],
    
          '/zh-CN/guide/': [
            makeLink('', '/zh-CN/guide', () => [
              makeLink('总览', '/'),
            ]),
            makeLink('开发上手', '/zh-CN/guide/develop', () => [
              makeLink('环境搭建', '/setup.md'),
              makeLink('配置文件', '/config.md'),
              makeLink('启动脚本', '/script.md'),
              makeLink('工作区开发', '/workspace.md'),
              makeLink('发布插件', '/publish.md'),
            ]),
            makeLink('交互基础', '/zh-CN/guide/basic', () => [
              makeLink('指令开发', '/command.md'),
              makeLink('事件系统', '/events.md'),
              makeLink('中间件', '/middleware.md'),
              makeLink('消息元素', '/element.md'),
              makeLink('进阶用法', '/advanced.md'),
            ]),
            makeLink('模块化', '/zh-CN/guide/plugin', () => [
              makeLink('认识插件', '/'),
              makeLink('生命周期', '/lifecycle.md'),
              makeLink('会话过滤器', '/selector.md'),
              makeLink('服务与依赖', '/service.md'),
              makeLink('配置模式', '/schema.md'),
            ]),
            makeLink('数据库', '/zh-CN/guide/database', () => [
              makeLink('使用数据库', '/'),
              makeLink('扩展数据模型', '/model.md'),
              makeLink('按需加载和自动更新', '/observer.md'),
              makeLink('编写数据库插件', '/writing.md'),
            ]),
            makeLink('跨平台', '/zh-CN/guide/adapter', () => [
              makeLink('使用适配器', '/index.md'),
              makeLink('使用机器人', '/bot.md'),
              makeLink('跨平台账号绑定', '/binding.md'),
              makeLink('编写适配器插件', '/writing.md'),
            ]),
            makeLink('国际化', '/zh-CN/guide/i18n', () => [
              makeLink('多语言支持', '/index.md'),
              makeLink('编写翻译文件', '/translation.md'),
              // makeLink('使用预设模板', '/presets.md'),
              makeLink('接入 Crowdin', '/crowdin.md'),
            ]),
            makeLink('控制台开发', '/zh-CN/guide/console', () => [
              makeLink('使用控制台', '/index.md'),
              makeLink('编写扩展', '/extension.md'),
              makeLink('数据交互', '/data.md'),
            ]),
            makeLink('测试工具', '/zh-CN/guide/testing', () => [
              makeLink('单元测试', '/index.md'),
            ]),
            // makeLink('深入底层', '/zh-CN/guide/in-depth', () => [
            //   makeLink('模块组织', '/module.md'),
            //   makeLink('消息处理', '/message.md'),
            // ]),
          ],
    
          '/zh-CN/api/': [{
            items: [
              makeLink('总览', '/zh-CN/api/'),
              // makeLink('术语表', '/zh-CN/api/glossary.md'),
            ],
          }, {
            text: '核心模块',
            items: [
              makeLink('适配器 (Adapter)', '/zh-CN/api/core/adapter.md'),
              makeLink('应用 (App)', '/zh-CN/api/core/app.md'),
              makeLink('机器人 (Bot)', '/zh-CN/api/core/bot.md'),
              makeLink('指令 (Command)', '/zh-CN/api/core/command.md'),
              makeLink('上下文 (Context)', '/zh-CN/api/core/context.md'),
              makeLink('事件 (Events)', '/zh-CN/api/core/events.md'),
              makeLink('会话 (Session)', '/zh-CN/api/core/session.md'),
            ],
          }, {
            text: '消息元素',
            items: [
              makeLink('语法规范', '/zh-CN/api/message/syntax.md'),
              makeLink('标准元素', '/zh-CN/api/message/elements.md'),
              makeLink('内置组件', '/zh-CN/api/message/components.md'),
              makeLink('渲染 API', '/zh-CN/api/message/api.md'),
            ],
          }, {
            text: '内置服务',
            items: [
              makeLink('机器人 (Bots)', '/zh-CN/api/service/bots.md'),
              makeLink('国际化 (I18n)', '/zh-CN/api/service/i18n.md'),
              makeLink('事件系统 (Lifecycle)', '/zh-CN/api/service/lifecycle.md'),
              makeLink('插件系统 (Registry)', '/zh-CN/api/service/registry.md'),
              makeLink('选择器 (Selector)', '/zh-CN/api/service/selector.md'),
              makeLink('网络服务 (Router)', '/zh-CN/api/service/router.md'),
              makeLink('网络请求 (HTTP)', '/zh-CN/api/service/http.md'),
            ],
          }, {
            text: '数据库',
            items: [
              makeLink('内置数据结构', '/zh-CN/api/database/built-in.md'),
              makeLink('数据库操作 (Database)', '/zh-CN/api/database/database.md'),
              makeLink('数据模型 (Model)', '/zh-CN/api/database/model.md'),
              makeLink('查询表达式 (Query)', '/zh-CN/api/database/query.md'),
              makeLink('求值表达式 (Eval)', '/zh-CN/api/database/evaluation.md'),
            ],
          }, {
            text: '其他功能',
            items: [
              makeLink('配置模式 (Schema)', '/zh-CN/api/utils/schema.md'),
              makeLink('观察者 (Observer)', '/zh-CN/api/utils/observer.md'),
              makeLink('输出日志 (Logger)', '/zh-CN/api/utils/logger.md'),
              makeLink('随机操作 (Random)', '/zh-CN/api/utils/random.md'),
              makeLink('其他工具 (Misc)', '/zh-CN/api/utils/misc.md'),
            ],
          }],
    
          '/zh-CN/plugins/': [ecosystemCN, {
            text: '适配器支持',
            items: [
              makeLink('适配器：Discord', '/zh-CN/plugins/adapter/discord.md'),
              makeLink('适配器：Kook', '/zh-CN/plugins/adapter/kook.md'),
              makeLink('适配器：Lark', '/zh-CN/plugins/adapter/lark.md'),
              makeLink('适配器：OneBot', '/zh-CN/plugins/adapter/onebot.md'),
              makeLink('适配器：QQGuild', '/zh-CN/plugins/adapter/qqguild.md'),
              makeLink('适配器：Telegram', '/zh-CN/plugins/adapter/telegram.md'),
            ],
          }, {
            text: '数据库支持',
            items: [
              makeLink('数据库：Memory', '/zh-CN/plugins/database/memory.md'),
              makeLink('数据库：MongoDB', '/zh-CN/plugins/database/mongo.md'),
              makeLink('数据库：MySQL', '/zh-CN/plugins/database/mysql.md'),
              makeLink('数据库：SQLite', '/zh-CN/plugins/database/sqlite.md'),
            ],
          }, {
            text: '常用功能',
            items: [
              makeLink('数据管理 (Admin)', '/zh-CN/plugins/common/admin.md'),
              makeLink('账号绑定 (Bind)', '/zh-CN/plugins/common/bind.md'),
              makeLink('发送广播 (Broadcast)', '/zh-CN/plugins/common/broadcast.md'),
              makeLink('设置昵称 (Callme)', '/zh-CN/plugins/common/callme.md'),
              makeLink('发送消息 (Echo)', '/zh-CN/plugins/common/echo.md'),
              makeLink('查看帮助 (Help)', '/zh-CN/plugins/common/help.md'),
              makeLink('会话信息 (Inspect)', '/zh-CN/plugins/common/inspect.md'),
              makeLink('速率限制 (Rate Limit)', '/zh-CN/plugins/common/rate-limit.md'),
            ],
          }, {
            text: '控制台功能',
            items: [
              makeLink('控制台 (Console)', '/zh-CN/plugins/console/index.md'),
              makeLink('数据统计 (Analytics)', '/zh-CN/plugins/console/analytics.md'),
              makeLink('指令管理 (Commands)', '/zh-CN/plugins/console/commands.md'),
              makeLink('数据库操作 (Dataview)', '/zh-CN/plugins/console/dataview.md'),
              makeLink('资源管理器 (Explorer)', '/zh-CN/plugins/console/explorer.md'),
              makeLink('插件依赖图 (Insight)', '/zh-CN/plugins/console/insight.md'),
              makeLink('本地翻译 (Locales)', '/zh-CN/plugins/console/locales.md'),
              makeLink('日志管理 (Logger)', '/zh-CN/plugins/console/logger.md'),
              makeLink('用户登录 (Login)', '/zh-CN/plugins/console/login.md'),
              makeLink('插件管理 (Market)', '/zh-CN/plugins/console/market.md'),
              makeLink('沙箱调试 (Sandbox)', '/zh-CN/plugins/console/sandbox.md'),
              makeLink('运行状态 (Status)', '/zh-CN/plugins/console/status.md'),
            ],
          }, {
            text: '开发工具',
            items: [
              makeLink('模块热替换 (HMR)', '/zh-CN/plugins/develop/hmr.md'),
              makeLink('测试工具 (Mock)', '/zh-CN/plugins/develop/mock.md'),
            ],
          }],
    
          '/zh-CN/market/': [ecosystemCN],
    
          '/zh-CN/about/': [{
            text: '关于我们',
            items: [
              makeLink('许可证', '/zh-CN/about/license.md'),
              makeLink('参与讨论', '/zh-CN/about/contact.md'),
              makeLink('团队介绍', '/zh-CN/about/team.md'),
              makeLink('社区资源', '/zh-CN/about/community.md'),
            ],
          }, {
            text: '更新与迁移',
            items: [
              makeLink('发展史', '/zh-CN/about/history.md'),
              makeLink('从 v3 迁移', '/zh-CN/about/migration.md'),
              makeLink('版本内迁移', '/zh-CN/about/upgrade.md'),
              makeLink('v4.1 版本介绍', '/zh-CN/about/releases/v4.1.md'),
              makeLink('v4.2 版本介绍', '/zh-CN/about/releases/v4.2.md'),
              makeLink('v4.3 版本介绍', '/zh-CN/about/releases/v4.3.md'),
              makeLink('v4.4 版本介绍', '/zh-CN/about/releases/v4.4.md'),
              makeLink('v4.5 版本介绍', '/zh-CN/about/releases/v4.5.md'),
              makeLink('v4.6 版本介绍', '/zh-CN/about/releases/v4.6.md'),
              makeLink('v4.7 版本介绍', '/zh-CN/about/releases/v4.7.md'),
              makeLink('v4.8 版本介绍', '/zh-CN/about/releases/v4.8.md'),
              makeLink('v4.9 版本介绍', '/zh-CN/about/releases/v4.9.md'),
              makeLink('v4.10 版本介绍', '/zh-CN/about/releases/v4.10.md'),
              makeLink('v4.11 版本介绍', '/zh-CN/about/releases/v4.11.md'),
            ],
          }, {
            text: '贡献指南',
            items: [
              makeLink('项目结构', '/zh-CN/about/contribute/structure.md'),
              makeLink('文档贡献指南', '/zh-CN/about/contribute/docs.md'),
            ],
          }],
        },
      },
    },

    'en-US': {
      label: 'English',
      lang: 'en-US',
      themeConfig: {
        nav: [{
          text: 'Manual',
          link: '/en-US/manual/introduction.md',
          activeMatch: '^/en-US/manual/',
        }, {
          text: 'Develop',
          link: '/en-US/guide/',
          activeMatch: '^/en-US/guide/',
        }, {
          text: 'API',
          link: '/en-US/api/',
          activeMatch: '^/en-US/api/',
        }, {
          ...ecosystemUS,
          activeMatch: '^/en-US/(plugins|market)/',
        }, {
          text: 'About',
          link: '/en-US/about/contact.md',
          activeMatch: '^/en-US/about/',
        }],
    
        sidebar: {
          '/en-US/manual/': [
            makeLink('', '/en-US/manual', () => [
              makeLink('Introduction', '/introduction.md'),
            ]),
            makeLink('', '/en-US/manual/starter', () => [
              makeLink('Getting Started', '/'),
              makeLink('为 Windows 安装', '/windows.md'),
              makeLink('为 macOS 安装', '/macos.md'),
              makeLink('为 Linux 安装', '/linux.md'),
              makeLink('为 Android 安装', '/android.md'),
              makeLink('在容器中使用', '/docker.md'),
              makeLink('创建模板项目', '/boilerplate.md'),
              makeLink('作为依赖调用', '/direct.md'),
            ]),
            makeLink('Console', '/en-US/manual/console', () => [
              makeLink('认识控制台', '/index.md'),
              makeLink('安装和配置插件', '/market.md'),
              makeLink('在沙盒中聊天', '/sandbox.md'),
              makeLink('接入聊天平台', '/adapter.md'),
            ]),
            makeLink('Usage', '/en-US/manual/usage', () => [
              makeLink('Command', '/command.md'),
              makeLink('Cross-Platform', '/platform.md'),
              makeLink('Permission', '/permission.md'),
              makeLink('Filter', '/filter.md'),
              makeLink('Internationalization', '/i18n.md'),
            ]),
            makeLink('Recipe', '/en-US/manual/recipe', () => [
              makeLink('指令进阶技巧', '/execution.md'),
              makeLink('访问数据库', '/dataview.md'),
              makeLink('维护多份配置', '/multiple.md'),
              makeLink('搜索插件市场', '/search.md'),
              makeLink('公网部署', '/server.md'),
            ]),
            makeLink('Launcher', '/en-US/manual/launcher', () => [
              makeLink('System Requirements', '/system.md'),
              makeLink('CLI', '/cli.md'),
            ]),
          ],
    
          '/en-US/guide/': [{
            items: [
              makeLink('Overview', '/en-US/guide/'),
            ],
          }, {
            text: 'Getting Started',
            items: [
              makeLink('Environment Setup', '/en-US/guide/develop/setup.md'),
              makeLink('配置文件', '/en-US/guide/develop/config.md'),
              makeLink('启动脚本', '/en-US/guide/develop/script.md'),
              makeLink('工作区开发', '/en-US/guide/develop/workspace.md'),
              makeLink('发布插件', '/en-US/guide/develop/publish.md'),
            ],
          }, {
            text: 'Essentials',
            items: [
              makeLink('指令开发', '/en-US/guide/basic/command.md'),
              makeLink('事件系统', '/en-US/guide/basic/events.md'),
              makeLink('中间件', '/en-US/guide/basic/middleware.md'),
              makeLink('消息元素', '/en-US/guide/basic/element.md'),
              makeLink('进阶用法', '/en-US/guide/basic/advanced.md'),
            ],
          }, {
            text: 'Modulization',
            items: [
              makeLink('认识插件', '/en-US/guide/plugin/index.md'),
              makeLink('生命周期', '/en-US/guide/plugin/lifecycle.md'),
              makeLink('会话过滤器', '/en-US/guide/plugin/selector.md'),
              makeLink('服务与依赖', '/en-US/guide/plugin/service.md'),
              makeLink('配置模式', '/en-US/guide/plugin/schema.md'),
            ],
          }, {
            text: 'Database',
            items: [
              makeLink('使用数据库', '/en-US/guide/database/index.md'),
              makeLink('扩展数据模型', '/en-US/guide/database/model.md'),
              makeLink('按需加载和自动更新', '/en-US/guide/database/observer.md'),
              makeLink('编写数据库插件', '/en-US/guide/database/writing.md'),
            ],
          }, {
            text: 'Cross-Platform',
            items: [
              makeLink('使用适配器', '/en-US/guide/adapter/index.md'),
              makeLink('使用机器人', '/en-US/guide/adapter/bot.md'),
              makeLink('跨平台账号绑定', '/en-US/guide/adapter/binding.md'),
              makeLink('编写适配器插件', '/en-US/guide/adapter/writing.md'),
            ],
          }, {
            text: 'Internationalization',
            items: [
              makeLink('多语言支持', '/en-US/guide/i18n/index.md'),
              makeLink('编写翻译文件', '/en-US/guide/i18n/translation.md'),
              // makeLink('使用预设模板', '/en-US/guide/i18n/presets.md'),
              makeLink('接入 Crowdin', '/en-US/guide/i18n/crowdin.md'),
            ],
          }, {
            text: '控制台开发',
            items: [
              makeLink('使用控制台', '/en-US/guide/console/index.md'),
              makeLink('编写扩展', '/en-US/guide/console/extension.md'),
              makeLink('数据交互', '/en-US/guide/console/data.md'),
            ],
          }, {
            text: 'Dev Tools',
            items: [
              makeLink('单元测试', '/en-US/guide/testing/index.md'),
            ],
          // }, {
          //   text: '深入底层',
          //   items: [
          //     makeLink('模块组织', '/en-US/guide/in-depth/module.md'),
          //     makeLink('消息处理', '/en-US/guide/in-depth/message.md'),
          //   ],
          }],
    
          '/en-US/api/': [{
            items: [
              makeLink('Overview', '/en-US/api/'),
              // makeLink('术语表', '/en-US/api/glossary.md'),
            ],
          }, {
            text: 'Core Modules',
            items: [
              makeLink('适配器 (Adapter)', '/en-US/api/core/adapter.md'),
              makeLink('应用 (App)', '/en-US/api/core/app.md'),
              makeLink('机器人 (Bot)', '/en-US/api/core/bot.md'),
              makeLink('指令 (Command)', '/en-US/api/core/command.md'),
              makeLink('上下文 (Context)', '/en-US/api/core/context.md'),
              makeLink('事件 (Events)', '/en-US/api/core/events.md'),
              makeLink('会话 (Session)', '/en-US/api/core/session.md'),
            ],
          }, {
            text: 'Message Elements',
            items: [
              makeLink('语法规范', '/en-US/api/message/syntax.md'),
              makeLink('标准元素', '/en-US/api/message/elements.md'),
              makeLink('内置组件', '/en-US/api/message/components.md'),
              makeLink('渲染 API', '/en-US/api/message/api.md'),
            ],
          }, {
            text: 'Built-in Services',
            items: [
              makeLink('机器人 (Bots)', '/en-US/api/service/bots.md'),
              makeLink('国际化 (I18n)', '/en-US/api/service/i18n.md'),
              makeLink('事件系统 (Lifecycle)', '/en-US/api/service/lifecycle.md'),
              makeLink('插件系统 (Registry)', '/en-US/api/service/registry.md'),
              makeLink('选择器 (Selector)', '/en-US/api/service/selector.md'),
              makeLink('网络服务 (Router)', '/en-US/api/service/router.md'),
              makeLink('网络请求 (HTTP)', '/en-US/api/service/http.md'),
            ],
          }, {
            text: 'Database',
            items: [
              makeLink('内置数据结构', '/en-US/api/database/built-in.md'),
              makeLink('数据库操作 (Database)', '/en-US/api/database/database.md'),
              makeLink('数据模型 (Model)', '/en-US/api/database/model.md'),
              makeLink('查询表达式 (Query)', '/en-US/api/database/query.md'),
              makeLink('求值表达式 (Eval)', '/en-US/api/database/evaluation.md'),
            ],
          }, {
            text: 'Miscaellaneous',
            items: [
              makeLink('配置模式 (Schema)', '/en-US/api/utils/schema.md'),
              makeLink('观察者 (Observer)', '/en-US/api/utils/observer.md'),
              makeLink('输出日志 (Logger)', '/en-US/api/utils/logger.md'),
              makeLink('随机操作 (Random)', '/en-US/api/utils/random.md'),
              makeLink('其他工具 (Misc)', '/en-US/api/utils/misc.md'),
            ],
          }],
    
          '/en-US/plugins/': [ecosystemUS, {
            text: 'Adapter',
            items: [
              makeLink('适配器：Discord', '/en-US/plugins/adapter/discord.md'),
              makeLink('适配器：Kook', '/en-US/plugins/adapter/kook.md'),
              makeLink('适配器：Lark', '/en-US/plugins/adapter/lark.md'),
              makeLink('适配器：OneBot', '/en-US/plugins/adapter/onebot.md'),
              makeLink('适配器：QQGuild', '/en-US/plugins/adapter/qqguild.md'),
              makeLink('适配器：Telegram', '/en-US/plugins/adapter/telegram.md'),
            ],
          }, {
            text: 'Database',
            items: [
              makeLink('数据库：Memory', '/en-US/plugins/database/memory.md'),
              makeLink('数据库：MongoDB', '/en-US/plugins/database/mongo.md'),
              makeLink('数据库：MySQL', '/en-US/plugins/database/mysql.md'),
              makeLink('数据库：SQLite', '/en-US/plugins/database/sqlite.md'),
            ],
          }, {
            text: '常用功能',
            items: [
              makeLink('数据管理 (Admin)', '/en-US/plugins/common/admin.md'),
              makeLink('账号绑定 (Bind)', '/en-US/plugins/common/bind.md'),
              makeLink('发送广播 (Broadcast)', '/en-US/plugins/common/broadcast.md'),
              makeLink('设置昵称 (Callme)', '/en-US/plugins/common/callme.md'),
              makeLink('发送消息 (Echo)', '/en-US/plugins/common/echo.md'),
              makeLink('查看帮助 (Help)', '/en-US/plugins/common/help.md'),
              makeLink('会话信息 (Inspect)', '/en-US/plugins/common/inspect.md'),
              makeLink('速率限制 (Rate Limit)', '/en-US/plugins/common/rate-limit.md'),
            ],
          }, {
            text: '控制台功能',
            items: [
              makeLink('控制台 (Console)', '/en-US/plugins/console/index.md'),
              makeLink('数据统计 (Analytics)', '/en-US/plugins/console/analytics.md'),
              makeLink('指令管理 (Commands)', '/en-US/plugins/console/commands.md'),
              makeLink('数据库操作 (Dataview)', '/en-US/plugins/console/dataview.md'),
              makeLink('资源管理器 (Explorer)', '/en-US/plugins/console/explorer.md'),
              makeLink('插件依赖图 (Insight)', '/en-US/plugins/console/insight.md'),
              makeLink('本地翻译 (Locales)', '/en-US/plugins/console/locales.md'),
              makeLink('日志管理 (Logger)', '/en-US/plugins/console/logger.md'),
              makeLink('用户登录 (Login)', '/en-US/plugins/console/login.md'),
              makeLink('插件管理 (Market)', '/en-US/plugins/console/market.md'),
              makeLink('沙箱调试 (Sandbox)', '/en-US/plugins/console/sandbox.md'),
              makeLink('运行状态 (Status)', '/en-US/plugins/console/status.md'),
            ],
          }, {
            text: 'Dev Tools',
            items: [
              makeLink('Hot Module Replacement (HMR)', '/en-US/plugins/develop/hmr.md'),
              makeLink('Test Utilities (Mock)', '/en-US/plugins/develop/mock.md'),
            ],
          }],
    
          '/en-US/market/': [ecosystemUS],
    
          '/en-US/about/': [{
            text: 'About',
            items: [
              makeLink('License', '/en-US/about/license.md'),
              makeLink('Contact', '/en-US/about/contact.md'),
              makeLink('Team', '/en-US/about/team.md'),
              makeLink('Resources', '/en-US/about/community.md'),
            ],
          }, {
            text: 'Updates',
            items: [
              makeLink('History', '/en-US/about/history.md'),
              makeLink('Migrating from v3', '/en-US/about/migration.md'),
              makeLink('Migrating within v4', '/en-US/about/upgrade.md'),
              makeLink('Release notes: v4.1', '/en-US/about/releases/v4.1.md'),
              makeLink('Release notes: v4.2', '/en-US/about/releases/v4.2.md'),
              makeLink('Release notes: v4.3', '/en-US/about/releases/v4.3.md'),
              makeLink('Release notes: v4.4', '/en-US/about/releases/v4.4.md'),
              makeLink('Release notes: v4.5', '/en-US/about/releases/v4.5.md'),
              makeLink('Release notes: v4.6', '/en-US/about/releases/v4.6.md'),
              makeLink('Release notes: v4.7', '/en-US/about/releases/v4.7.md'),
              makeLink('Release notes: v4.8', '/en-US/about/releases/v4.8.md'),
              makeLink('Release notes: v4.9', '/en-US/about/releases/v4.9.md'),
              makeLink('Release notes: v4.10', '/en-US/about/releases/v4.10.md'),
              makeLink('Release notes: v4.11', '/en-US/about/releases/v4.11.md'),
            ],
          }, {
            text: 'Contributing',
            items: [
              makeLink('Infrastructure', '/en-US/about/contribute/structure.md'),
              makeLink('Documentation', '/en-US/about/contribute/docs.md'),
            ],
          }],
        },
      },
    },
  },

  themeConfig: {
    indexName: 'docs',
    logo: '/logo.png',

    socialLinks: {
      github: 'https://github.com/koishijs/koishi',
    },

    editLink: {
      pattern: 'https://github.com/koishijs/docs/edit/main/:path',
    },
  },

  vite: {
    optimizeDeps: {
      include: ['xss'],
    },
  },
})
