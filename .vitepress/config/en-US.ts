import { defineLocale } from '@koishijs/vitepress'
import { makeLink } from './utils'

const ecosystemUS = makeLink('Plugins', '/en-US', () => [
  makeLink('Plugin market', '/market/'),
  makeLink('服务类插件导航', '/market/service.md'),
  makeLink('官方插件一览', '/plugins/'),
])

export default defineLocale({
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

      '/en-US/guide/': [
        makeLink('', '/en-US/guide', () => [
          makeLink('Overview', '/'),
        ]),
        makeLink('Getting Started', '/en-US/guide/develop', () => [
          makeLink('Environment Setup', '/setup.md'),
          makeLink('配置文件', '/config.md'),
          makeLink('启动脚本', '/script.md'),
          makeLink('工作区开发', '/workspace.md'),
          makeLink('发布插件', '/publish.md'),
        ]),
        makeLink('Essentials', '/en-US/guide/basic', () => [
          makeLink('指令开发', '/command.md'),
          makeLink('事件系统', '/events.md'),
          makeLink('中间件', '/middleware.md'),
          makeLink('消息元素', '/element.md'),
          makeLink('进阶用法', '/advanced.md'),
        ]),
        makeLink('Modulization', '/en-US/guide/plugin', () => [
          makeLink('认识插件', '/index.md'),
          makeLink('生命周期', '/lifecycle.md'),
          makeLink('会话过滤器', '/selector.md'),
          makeLink('服务与依赖', '/service.md'),
          makeLink('配置模式', '/schema.md'),
        ]),
        makeLink('Database', '/en-US/guide/database', () => [
          makeLink('使用数据库', '/index.md'),
          makeLink('扩展数据模型', '/model.md'),
          makeLink('按需加载和自动更新', '/observer.md'),
          makeLink('编写数据库插件', '/writing.md'),
        ]),
        makeLink('Cross-Platform', '/en-US/guide/adapter', () => [
          makeLink('使用适配器', '/index.md'),
          makeLink('使用机器人', '/bot.md'),
          makeLink('跨平台账号绑定', '/binding.md'),
          makeLink('编写适配器插件', '/writing.md'),
        ]),
        makeLink('Internationalization', '/en-US/guide/i18n', () => [
          makeLink('多语言支持', '/index.md'),
          makeLink('编写翻译文件', '/translation.md'),
          // makeLink('使用预设模板', '/presets.md'),
          makeLink('接入 Crowdin', '/crowdin.md'),
        ]),
        makeLink('控制台开发', '/en-US/guide/console', () => [
          makeLink('使用控制台', '/index.md'),
          makeLink('编写扩展', '/extension.md'),
          makeLink('数据交互', '/data.md'),
        ]),
        makeLink('Dev Tools', '/en-US/guide/testing', () => [
          makeLink('单元测试', '/index.md'),
        ]),
        // makeLink('深入底层', '/en-US/guide/in-depth', () => [
        //   makeLink('模块组织', '/module.md'),
        //   makeLink('消息处理', '/message.md'),
        // ]),
      ],

      '/en-US/api/': [
        makeLink('', '/en-US/api', () => [
          makeLink('Overview', '/'),
          // makeLink('术语表', '/glossary.md'),
        ]),
        makeLink('Core Modules', '/en-US/api/core', () => [
          makeLink('Adapter', '/adapter.md'),
          makeLink('App', '/app.md'),
          makeLink('Bot', '/bot.md'),
          makeLink('Command', '/command.md'),
          makeLink('Context', '/context.md'),
          makeLink('Events', '/events.md'),
          makeLink('Session', '/session.md'),
        ]),
        makeLink('Message Elements', '/en-US/api/message', () => [
          makeLink('语法规范', '/syntax.md'),
          makeLink('标准元素', '/elements.md'),
          makeLink('内置组件', '/components.md'),
          makeLink('渲染 API', '/api.md'),
        ]),
        makeLink('Built-in Services', '/en-US/api/service', () => [
          makeLink('Bots', '/bots.md'),
          makeLink('I18n', '/i18n.md'),
          makeLink('Lifecycle', '/lifecycle.md'),
          makeLink('Registry', '/registry.md'),
          makeLink('Selector', '/selector.md'),
          makeLink('Router', '/router.md'),
          makeLink('HTTP', '/http.md'),
        ]),
        makeLink('Database', '/en-US/api/database', () => [
          makeLink('内置数据结构', '/built-in.md'),
          makeLink('数据库操作 (Database)', '/database.md'),
          makeLink('数据模型 (Model)', '/model.md'),
          makeLink('查询表达式 (Query)', '/query.md'),
          makeLink('求值表达式 (Eval)', '/evaluation.md'),
        ]),
        makeLink('Utilities', '/en-US/api/utils', () => [
          makeLink('Schema', '/schema.md'),
          makeLink('Observer', '/observer.md'),
          makeLink('Logger', '/logger.md'),
          makeLink('Random', '/random.md'),
          makeLink('Miscellaneous', '/misc.md'),
        ]),
      ],

      '/en-US/plugins/': [
        ecosystemUS,
        makeLink('Adapter', '/en-US/plugins/adapter', () => [
          makeLink('Discord', '/discord.md'),
          makeLink('Kook', '/kook.md'),
          makeLink('Lark', '/lark.md'),
          makeLink('Mail', '/mail.md'),
          makeLink('OneBot', '/onebot.md'),
          makeLink('QQGuild', '/qqguild.md'),
          makeLink('Telegram', '/telegram.md'),
        ]),
        makeLink('Database', '/en-US/plugins/database', () => [
          makeLink('Memory', '/memory.md'),
          makeLink('MongoDB', '/mongo.md'),
          makeLink('MySQL', '/mysql.md'),
          makeLink('SQLite', '/sqlite.md'),
        ]),
        makeLink('常用功能', '/en-US/plugins/common', () => [
          makeLink('数据管理 (Admin)', '/admin.md'),
          makeLink('账号绑定 (Bind)', '/bind.md'),
          makeLink('发送广播 (Broadcast)', '/broadcast.md'),
          makeLink('设置昵称 (Callme)', '/callme.md'),
          makeLink('发送消息 (Echo)', '/echo.md'),
          makeLink('查看帮助 (Help)', '/help.md'),
          makeLink('会话信息 (Inspect)', '/inspect.md'),
          makeLink('速率限制 (Rate Limit)', '/rate-limit.md'),
        ]),
        makeLink('控制台功能', '/en-US/plugins/console', () => [
          makeLink('控制台 (Console)', '/index.md'),
          makeLink('数据统计 (Analytics)', '/analytics.md'),
          makeLink('指令管理 (Commands)', '/commands.md'),
          makeLink('数据库操作 (Dataview)', '/dataview.md'),
          makeLink('资源管理器 (Explorer)', '/explorer.md'),
          makeLink('插件依赖图 (Insight)', '/insight.md'),
          makeLink('本地翻译 (Locales)', '/locales.md'),
          makeLink('日志管理 (Logger)', '/logger.md'),
          makeLink('用户登录 (Login)', '/login.md'),
          makeLink('插件管理 (Market)', '/market.md'),
          makeLink('沙箱调试 (Sandbox)', '/sandbox.md'),
          makeLink('运行状态 (Status)', '/status.md'),
        ]),
        makeLink('Dev Tools', '/en-US/plugins/develop', () => [
          makeLink('Hot Module Replacement (HMR)', '/hmr.md'),
          makeLink('Test Utilities (Mock)', '/mock.md'),
        ]),
      ],

      '/en-US/market/': [ecosystemUS],

      '/en-US/about/': [
        makeLink('About', '/en-US/about', () => [
          makeLink('License', '/license.md'),
          makeLink('Contact', '/contact.md'),
          makeLink('Team', '/team.md'),
          makeLink('Resources', '/community.md'),
        ]),
        makeLink('Updates', '/en-US/about', () => [
          makeLink('History', '/history.md'),
          makeLink('Migrating from v3', '/migration.md'),
          makeLink('Migrating within v4', '/upgrade.md'),
          makeLink('Release notes: v4.1', '/releases/v4.1.md'),
          makeLink('Release notes: v4.2', '/releases/v4.2.md'),
          makeLink('Release notes: v4.3', '/releases/v4.3.md'),
          makeLink('Release notes: v4.4', '/releases/v4.4.md'),
          makeLink('Release notes: v4.5', '/releases/v4.5.md'),
          makeLink('Release notes: v4.6', '/releases/v4.6.md'),
          makeLink('Release notes: v4.7', '/releases/v4.7.md'),
          makeLink('Release notes: v4.8', '/releases/v4.8.md'),
          makeLink('Release notes: v4.9', '/releases/v4.9.md'),
          makeLink('Release notes: v4.10', '/releases/v4.10.md'),
          makeLink('Release notes: v4.11', '/releases/v4.11.md'),
        ]),
        makeLink('Contributing', '/en-US/about/contribute', () => [
          makeLink('Infrastructure', '/structure.md'),
          makeLink('Documentation', '/docs.md'),
        ]),
      ],
    },
  },
})
