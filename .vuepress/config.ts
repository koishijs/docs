import { resolve } from 'path'
import { remove as removeDiacritics } from 'diacritics'
import { readdirSync } from 'fs'
import { viteBundler } from 'vuepress'
import yaml from '@rollup/plugin-yaml'
import theme from './theme'

const communitySidebar = [{
  text: '总览',
  link: '/community/',
}]

const communityFolder = resolve(__dirname, '../community')
const dirents = readdirSync(communityFolder, { withFileTypes: true })
for (const dirent of dirents) {
  if (!dirent.isDirectory() && !dirent.isSymbolicLink()) continue
  try {
    communitySidebar.push(await import(communityFolder + '/' + dirent.name + '/index.js'))
  } catch {}
}

const hash = process.env.GITHUB_SHA
  ? ` (${process.env.GITHUB_SHA.slice(0, 7)})`
  : ''

export default {
  base: '/',
  title: 'Koishi',

  head: [
    ['link', { rel: 'icon', href: `/koishi.png` }],
    ['link', { rel: 'manifest', href: '/manifest.json' }],
    ['meta', { name: 'theme-color', content: '#5546a3' }],
  ],

  markdown: {
    code: false,
    slugify (str) {
      const rControl = /[\u0000-\u001f]/g
      const rSpecial = /[\s~`!@#$%^&*()\-_+=[\]{}|\\;:"'“”‘’<>,.?/]+/g
      return removeDiacritics(str)
        .replace(rControl, '')
        .replace(/\(.+\)(?=\s|$)/, '')
        .replace(rSpecial, '-')
        .replace(/\-{2,}/g, '-')
        .replace(/^\-+|\-+$/g, '')
        .replace(/^(\d)/, '_$1')
        .toLowerCase()
    },
  },

  theme: theme({
    logo: '/koishi.png',
    navbar: [{
      text: 'v4.x' + hash,
      children: [{
        text: 'v3.x',
        link: 'https://koishi.js.org/v3/',
      }, {
        text: 'v1.x',
        link: 'https://koishi.js.org/v1/',
      }],
    }, {
      text: '入门',
      link: '/manual/introduction.md',
      activeMatch: '/manual/',
    }, {
      text: '指南',
      link: '/guide/',
    }, {
      text: 'API',
      link: '/api/',
    }, {
      text: '生态',
      children: ['/market.md', '/plugins/', '/community/'],
    }, {
      text: '更多',
      link: '/about/faq.md',
      activeMatch: '/about/',
    }],

    sidebar: {
      '/manual/': [{
        text: '介绍',
        link: '/manual/introduction.md',
      }, {
        text: '起步',
        children: [
          '/manual/starter/index.md',
          '/manual/starter/boilerplate.md',
          '/manual/starter/direct.md',
          '/manual/starter/desktop.md',
          '/manual/starter/mobile.md',
          '/manual/starter/server.md',
          '/manual/starter/container.md',
        ],
      }, {
        text: '使用控制台',
        children: [
          '/manual/console/index.md',
          '/manual/console/market.md',
          '/manual/console/adapter.md',
          '/manual/console/dataview.md',
          '/manual/console/chat.md',
        ],
      }, {
        text: '命令行工具',
        children: [
          '/manual/cli/index.md',
          '/manual/cli/development.md',
        ],
      }],

      '/guide/': [{
        text: '总览',
        link: '/guide/',
      }, {
        text: '处理交互',
        children: [
          '/guide/message/middleware.md',
          '/guide/message/session.md',
          '/guide/message/segment.md',
        ],
      }, {
        text: '指令系统',
        children: [
          '/guide/command/index.md',
          '/guide/command/execution.md',
          '/guide/command/help.md',
          '/guide/command/more.md',
        ],
      }, {
        text: '模块化',
        children: [
          '/guide/plugin/index.md',
          '/guide/plugin/lifecycle.md',
          '/guide/plugin/schema.md',
          '/guide/plugin/publish.md',
        ],
      }, {
        text: '切面开发',
        children: [
          '/guide/aspect/selector.md',
          '/guide/aspect/events.md',
          '/guide/aspect/service.md',
          '/guide/aspect/mixin.md',
        ],
      }, {
        text: '数据库',
        children: [
          '/guide/database/index.md',
          '/guide/database/model.md',
          '/guide/database/builtin.md',
          '/guide/database/observer.md',
          '/guide/database/writing.md',
        ],
      }, {
        text: '跨平台',
        children: [
          '/guide/adapter/index.md',
          '/guide/adapter/bot.md',
          '/guide/adapter/binding.md',
          '/guide/adapter/writing.md',
        ],
      }, {
        text: '国际化',
        children: [
          '/guide/i18n/index.md',
          '/guide/i18n/translation.md',
          '/guide/i18n/presets.md',
          '/guide/i18n/crowdin.md',
        ],
      }, {
        text: '控制台开发',
        children: [
          '/guide/console/index.md',
          '/guide/console/extension.md',
          '/guide/console/data.md',
        ],
      }, {
        text: '测试工具',
        children: [
          '/guide/testing/sandbox.md',
          '/guide/testing/unit-tests.md',
        ],
      }, {
        text: '深入底层',
        children: [
          '/guide/in-depth/module.md',
          '/guide/in-depth/message.md',
        ],
      }],

      '/api/': [{
        text: '总览',
        link: '/api/',
      // }, {
      //   text: '术语表',
      //   link: '/api/glossary.md',
      }, {
        text: '核心 API',
        children: [
          '/api/core/adapter.md',
          '/api/core/app.md',
          '/api/core/bot.md',
          '/api/core/command.md',
          '/api/core/context.md',
          '/api/core/events.md',
          '/api/core/session.md',
        ],
      }, {
        text: '服务 API',
        children: [
          '/api/service/bots.md',
          '/api/service/i18n.md',
          '/api/service/lifecycle.md',
          '/api/service/registry.md',
          '/api/service/selector.md',
          '/api/service/router.md',
          '/api/service/http.md',
          '/api/service/assets.md',
        ],
      }, {
        text: '数据库 API',
        children: [
          '/api/database/built-in.md',
          '/api/database/database.md',
          '/api/database/model.md',
          '/api/database/query.md',
          '/api/database/evaluation.md',
        ],
      }, {
        text: '其他内置 API',
        children: [
          '/api/utils/segment.md',
          '/api/utils/schema.md',
          '/api/utils/observer.md',
          '/api/utils/logger.md',
          '/api/utils/misc.md',
        ],
      }],

      '/plugins/': [{
        text: '总览',
        link: '/plugins/',
      }, {
        text: '适配器支持',
        children: [
          '/plugins/adapter/discord.md',
          '/plugins/adapter/kook.md',
          '/plugins/adapter/onebot.md',
          '/plugins/adapter/qqguild.md',
          '/plugins/adapter/telegram.md',
        ],
      }, {
        text: '数据库支持',
        children: [
          '/plugins/database/level.md',
          '/plugins/database/memory.md',
          '/plugins/database/mongo.md',
          '/plugins/database/mysql.md',
          '/plugins/database/sqlite.md',
        ],
      }, {
        text: '资源存储支持',
        children: [
          '/plugins/assets/git.md',
          '/plugins/assets/local.md',
          '/plugins/assets/remote.md',
          '/plugins/assets/s3.md',
        ],
      }, {
        text: '常用功能',
        children: [
          '/plugins/common/broadcast.md',
          '/plugins/common/echo.md',
          '/plugins/common/feedback.md',
          '/plugins/common/forward.md',
          '/plugins/common/recall.md',
          '/plugins/common/repeater.md',
          '/plugins/common/respondent.md',
        ],
      }, {
        text: '辅助功能',
        children: [
          '/plugins/accessibility/admin.md',
          '/plugins/accessibility/bind.md',
          '/plugins/accessibility/callme.md',
          '/plugins/accessibility/commands.md',
          '/plugins/accessibility/locales.md',
          '/plugins/accessibility/rate-limit.md',
          '/plugins/accessibility/schedule.md',
          '/plugins/accessibility/sudo.md',
          '/plugins/accessibility/verifier.md',
        ],
      }, {
        text: '控制台功能',
        children: [
          '/plugins/console/index.md',
          '/plugins/console/auth.md',
          '/plugins/console/chat.md',
          '/plugins/console/dataview.md',
          '/plugins/console/insight.md',
          '/plugins/console/logger.md',
          '/plugins/console/market.md',
          '/plugins/console/sandbox.md',
          '/plugins/console/status.md',
        ],
      }, {
        text: '其他官方插件',
        children: [
          '/plugins/other/mock.md',
          '/plugins/other/puppeteer.md',
        ],
      }],

      '/community/': communitySidebar,

      '/about/': [{
        text: '常见问题',
        link: '/about/faq.md',
      }, {
        text: '更新与迁移',
        children: [
          '/about/history.md',
          '/about/migration.md',
          '/about/releases/v4.1.md',
          '/about/releases/v4.2.md',
          '/about/releases/v4.3.md',
          '/about/releases/v4.4.md',
          '/about/releases/v4.5.md',
          '/about/releases/v4.6.md',
        ],
      }, {
        text: '贡献指南',
        children: [
          '/about/contribute/structure.md',
          '/about/contribute/docs.md',
        ],
      }],
    },

    docsRepo: 'koishijs/koishijs.github.io',
    docsBranch: 'docs',
    editLinkText: '帮助我们改善此页面',
    contributors: false,
  }),

  bundler: viteBundler({
    viteOptions: {
      server: {
        fs: {
          strict: false,
        },
      },
      plugins: [
        yaml(),
      ],
      // build: {
      //   // fix for monaco workers
      //   // https://github.com/vitejs/vite/issues/1927#issuecomment-805803918
      //   rollupOptions: {
      //     output: {
      //       inlineDynamicImports: false,
      //       manualChunks: {
      //         tsWorker: ['monaco-editor/esm/vs/language/typescript/ts.worker'],
      //         editorWorker: ['monaco-editor/esm/vs/editor/editor.worker'],
      //       },
      //     },
      //   },
      // },
    },
  }),
}
